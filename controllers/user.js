const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const {JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY, ACCESS_TOKEN_EXPIRES_IN} = process.env;

const {
    User,
    joiLoginSchema,
    joiRegisterSchema,
} = require("../models/User.model.js");

require("dotenv").config();
module.exports.updateInfo = async (req, res) => {
    console.log(new Date())
    const data = req.body;
    const user = await User.findById(req.user, {userInfo: 1})

    let new_userInfo = {user, ...data}
    new_userInfo = await User.findByIdAndUpdate(req.user, {"user.userInfo": {...new_userInfo}})
    res.status(200).json(new_userInfo);
}
module.exports.updateExperience = async (req, res) => {

    if (req?.query?.id) {
        const exp = User.findById(req.user, {'userInfo.experience': 1});
    }

    res.status(200).json({})
}


module.exports.userRegister = (req, res, next) => {

    try {
        const {error} = joiRegisterSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        const {name, password, phone, role} = req.body;
        User.findOne({phone}).then((user) => {
            if (user) {
                return res.status(409).json({
                    success: false,
                    message: `User with phone ${phone} already exist`,
                });
            }
            const newUser = new User({
                name,
                phone,
                role
            });
            newUser.setPassword(password);

            newUser.save().then((user) => {
                const {
                    _id,
                    name,
                    phone,
                    role
                } = user;
                const payload = {
                    id: _id,
                };
                const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET_KEY, {
                    expiresIn: "20h",
                });
                const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, {
                    expiresIn: "30d",
                });

                const userData = {
                    name,
                    phone,
                    role,
                    data: {
                        accessToken,
                        refreshToken,
                    },
                };

                res.status(201).json({
                    success: true,
                    message: "Successfully created new user. You can Login",
                    user: userData,
                });
            });
        });
    } catch (error) {
        next(error);
    }
};

// Login User and get him Token for access to some route action
module.exports.userLogin = async (req, res, next) => {
    try {
        const {error} = joiLoginSchema.validate(req.body);

        if (error) {
            res.status(409).json({
                success: false,
                message: error.message,
            });
        }
        const {phone, password} = req.body;
        const user = await User.findOne({phone});

        if (!user || !user.comparePassword(password)) {
            res.status(401).json({
                success: false,
                message: "Password is wrong",
            });
        }
        const payload = {
            id: user._id,
        };
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET_KEY, {
            expiresIn: "20d",
        });
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, {
            expiresIn: "30d",
        });

        const {
            _id,
            name,
            role
        } = user;

        return res.json({
            id: String(_id),
            name,
            phone,
            role,
            data: {
                accessToken,
                refreshToken,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Update User data
module.exports.userUpdate = (req, res) => {
    const updateData = req.body;
    const id = req.user._id;

    const sendError = () => {
        res.status(401);
        res.json({
            status: "error",
            text: "there is no such user",
        });
    };

    const sendResponse = (newUser) => {
        if (!newUser) {
            return sendError();
        }

        res.json({
            status: "success",
            user: newUser,
        });
    };

    const data = req.file
        ? {userImgUrl: req.file.path, ...updateData}
        : {...updateData};

    User.findByIdAndUpdate(id, data, {new: true}).then((result) => {
        sendResponse(result);
    });
};

module.exports.refreshTokens = async (req, res) => {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader) {
        const reqRefreshToken = authorizationHeader.replace("Bearer ", "");
        try {
            const {id} = jwt.verify(reqRefreshToken, JWT_ACCESS_SECRET_KEY);

            const user = await User.findById(id);

            if (!user) {
                throw new createError.NotFound("Invalid user");
            }

            const accessToken = jwt.sign({id: user._id}, JWT_ACCESS_SECRET_KEY, {
                expiresIn: "20h",
            });
            const refreshToken = jwt.sign(
                {
                    id: user._id,
                },
                JWT_REFRESH_SECRET_KEY,
                {expiresIn: "30d"}
            );
            return res.json({
                status: "success",
                data: {
                    accessToken,
                    refreshToken,
                },
            });
        } catch (err) {
            return res.status(401).json({message: "Not authorized"});

        }
    }
    return res.status(401).json({message: "No token provided"});
};

// Logout User
module.exports.userLogout = (req, res) => {
    res.status(200).json({
        message: "User successfully logout",
    });
};
