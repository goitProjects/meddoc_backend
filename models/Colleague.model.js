const {Schema, model} = require("mongoose");
const mongoose = require("mongoose");

const ColleagueSchema = new Schema(
    {
        owner: mongoose.Types.ObjectId,
        colleague: mongoose.Types.ObjectId,
    }
);

const Colleague = model("AColleague", ColleagueSchema);
module.exports = {
    Colleague
};