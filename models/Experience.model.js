const {Schema, model} = require("mongoose");
const mongoose = require("mongoose");

const ExperienceSchema = new Schema(
    {
        owner: mongoose.Types.ObjectId,
        ImgUrl: String,
        title: String,
        description: String,
        start: Date,
        end: Date,

    })

const Experience = model("Experience", ExperienceSchema);
module.exports = {
    Experience
};