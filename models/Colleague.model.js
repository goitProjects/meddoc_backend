const {Schema, model} = require("mongoose");
const mongoose = require("mongoose");

const ColleagueSchema = new Schema(
    {
        owner: { type: mongoose.Types.ObjectId,
            ref: "user"
        },
        colleague: mongoose.Types.ObjectId,
    }
);

const Colleague = model("colleagues", ColleagueSchema);
module.exports = {
    Colleague
};