const { UserInfo } = require("../models/Info.model");
const { User } = require("../models/User.model");
const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

module.exports.getInfo = async (req, res) => {
  let user = req.user;
  let owner = user._id;

  if (req?.params?.id) {
    owner = req?.params?.id;
    user = await User.findById(owner, { _id: 0, owner: 0, __v:0, password:0}).lean();
  }

  const userInfo = await UserInfo.findOne(
    { owner: ObjectId(owner) },
    { _id: 0, owner: 0, __v:0, password:0}
  ).lean();
  return res.status(200).json({ ...user, ...userInfo });
};

module.exports.getRoleAll = async (req, res) => {
  const type = req?.params?.role;
  // const users = await User.find({ role: type }, { _id: 0, owner: 0, __v:0, password:0 }).lean();
  const users = await User.aggregate([
    {
      $match: {
        role: type,
      },
    },
    {
      $lookup: {
        from: "userinfos",
        localField: "_id",
        foreignField: "owner",
        as: "user_info",
      },
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$user_info", 0 ] }, "$$ROOT" ] } }
   },
   { $project: { user_info: 0,  __v:0, password:0, accessToken:0, refreshToken:0} }
  ]);
  return res.status(200).json(users);
};

module.exports.updateInfo = async (req, res) => {
  if (req?.file?.path) {
    req.body.userImgUrl = req.file.path;
  }
  let info = await UserInfo.findOne({ owner: ObjectId(req.user._id) }).lean();
  if (info) {
    info = await UserInfo.findOneAndUpdate(
      { owner: req.user._id },
      { ...req.body },
      { returnDocument: "after" }
    );
  } else {
    info = await UserInfo.create({
      owner: req.user._id,
      ...req.body,
    });
  }
  const {_id, name, phone, role} = req.user;
  const {coast, about, specialization, category, gender, birthday, userImgUrl, rating}= info
  return res.status(200).json({_id, name, phone, role, coast, about, specialization, category, gender, birthday, userImgUrl, rating});
};

module.exports.deleteInfo = async (req, res) => {
  console.log("deleteInfo: ", req.user);
  const info = await Info.findByIdAndDelete({ _id: req.params.id });
  return res.status(200).json(info);
};

module.exports.updateRating = async (req, res) => {
  let info = await UserInfo.findOne({ owner: ObjectId(req.user._id) }).lean();
  if (info) {
    info = await UserInfo.findOneAndUpdate(
      { owner: req.user._id },
      { $push: { rating: req.body.rating } },
      { returnDocument: "after" }
    );
  } else {
    info = await UserInfo.create({
      owner: req.user._id,
      rating: [req.body.rating],
    });
  }
  const {_id, name, phone, role} = req.user;
  const {coast, about, specialization, category, gender, birthday, userImgUrl, rating}= info
  return res.status(200).json({_id, name, phone, role, coast, about, specialization, category, gender, birthday, userImgUrl, rating});
};

