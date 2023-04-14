const {UserInfo} = require("../models/Info.model");
const {User} = require("../models/User.model");
const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

module.exports.getRoleAll = async (req, res) => {
    const type=req?.params?.role;
       const users = await User.find({role: type},{_id:1}).lean();

    return res.status(200).json(users);
};
module.exports.getInfo = async (req, res) => {

    let  user  =req.user
    let owner = user._id;

    if (req?.params?.id){
        owner = req?.params?.id
        user = await User.findById(owner).lean();
    }

    const userInfo = await UserInfo.findOne({owner: ObjectId(owner)},{_id:0,owner:0}).lean();
    return res.status(200).json({...user, ...userInfo});
};

module.exports.updateInfo = async (req, res) => {

    if (req?.file?.path) {
        req.body.userImgUrl = req.file.path;
    }
    let info = await UserInfo.findOne({owner: ObjectId(req.user._id)}).lean()
    // console.log("info: ",info)
    if (info) {
         info = await UserInfo.findOneAndUpdate({owner: ObjectId(req.user._id)}, {...req.body}, {returnDocument: "after"})
    } else {
        info = await UserInfo.collection.insertOne({owner:ObjectId(req.user._id),...req.body })
    }
    return res.status(200).json(info);
}

module.exports.deleteInfo = async (req, res) => {
    console.log("deleteInfo: ",req.user);
    const info = await Info.findByIdAndDelete({_id: req.params.id})
    return res.status(200).json(info);
}