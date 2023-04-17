const {Colleague} = require("../models/Colleague.model");
const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
module.exports.getColleague = async (req, res) => {
    console.log("getColleague: ",req?.params?.id);
    console.log("getColleague: ",req.user._id);
    if (req?.params?.id) {
        req.user._id = req.params.id
    }
    const colleague = await Colleague.find({owner: ObjectId(req.user._id)})
    return res.status(200).json(colleague);
}

module.exports.updateColleague = async (req, res) => {
    console.log("updateColleague: ",req.params.id);
    const colleague = await Colleague.findByIdAndUpdate({_id: req.params.id},{ colleague: ObjectId(req.body.colleague) }, {returnDocument: "after"})
    return res.status(200).json(colleague);
}

module.exports.addColleague = async (req, res) => {
    console.log("addColleague: ",req.user);
    const colleague = await Colleague.create({...req.body } )
    return res.status(200).json(colleague);
}

module.exports.deleteColleague = async (req, res) => {
    console.log("deleteColleague: ",req.user);
    const colleague = await Colleague.findByIdAndDelete({_id: req.params.id})
    return res.status(200).json(colleague);
}