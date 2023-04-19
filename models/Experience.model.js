const {Schema, model} = require("mongoose");
const mongoose = require("mongoose");

const ExperienceSchema = new Schema(
    {
        owner: { type: mongoose.Types.ObjectId,
            ref: "user"
        },
        ImgUrl: String,
        title: String,
        description: String,
        start: Date,
        end: Date,

    })

const Experience = model("experience", ExperienceSchema);
module.exports = {
    Experience
};