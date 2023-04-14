const {Experience} = require("../models/Experience.model");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
module.exports.getExperience = async (req, res) => {
    let  experience;
    if (req?.params?.id) {
        req.user._id = req.params.id;
         experience = await Experience.findOne({_id: req.user._id})
    } else {
        experience = await Experience.find({owner: req.user._id})
    }

    return res.status(200).json(experience);
}

module.exports.updateExperience = async (req, res) => {
    console.log("req.params: ",req.params)
    console.log("req.body: ",req.body)
    const experience = await Experience.findByIdAndUpdate({_id: ObjectId(req.params._id)},{ ...req.body }, {returnDocument: "after"})
    return res.status(200).json(experience);
}

module.exports.addExperience = async (req, res) => {
    const experience = await Experience.create({ owner: req.user._id, ...req.body} )
    return res.status(200).json(experience);
}

module.exports.deleteExperience = async (req, res) => {
    const experience = await Experience.findByIdAndDelete({_id: req.params.id})
    return res.status(200).json(experience);
}