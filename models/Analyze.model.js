const {Schema, model} = require("mongoose");
const mongoose = require("mongoose");

const AnalyzeSchema = new Schema(
    {
        owner:  mongoose.Types.ObjectId,
        doctor:  mongoose.Types.ObjectId,
        description: String,
        result: String,
        preview: String,
        anamnesis: String, 
        date: String,       
        dateStart: Date,
        dateEnd: Date,
    }
);

const Analyze = model("Analyze", AnalyzeSchema);
module.exports = {
    Analyze
};