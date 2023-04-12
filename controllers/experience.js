const {Experience} = require("../models/Experience.model");

module.exports.getExperience = async (req, res) => {
    console.log("getExperience: ",req.user);
    if (req?.params?.id) {
        req.user._id = req.params.id
    }
    const experience = await Experience.find({owner: req.user._id})
    return res.status(200).json(experience);
}

module.exports.updateExperience = async (req, res) => {
    const experience = await Experience.findByIdAndUpdate({_id: req.params.id},{ ...req.body }, {returnDocument: "after"})
    return res.status(200).json(experience);
}

module.exports.addExperience = async (req, res) => {
    const experience = await Experience.create({ owner: req.user, ...req.body} )
    return res.status(200).json(experience);
}

module.exports.deleteExperience = async (req, res) => {
    const experience = await Experience.findByIdAndDelete({_id: req.params.id})
    return res.status(200).json(experience);
}