const {Schema, model} = require("mongoose");
const mongoose = require("mongoose");

const AnalyzeSchema = new Schema(
    {
        owner:  { type: mongoose.Types.ObjectId,
            ref: "user"
        },
        doctor:  { type: mongoose.Types.ObjectId,
            ref: "user"
        },
        description: String,
        result: String,
        preview: String,
        anamnesis: String, 
        date: String,       
        dateStart: Date,
        dateEnd: Date,
    }
);

const Analyze = model("analyze", AnalyzeSchema);
module.exports = {
    Analyze
};