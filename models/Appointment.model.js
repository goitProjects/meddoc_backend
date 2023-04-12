const {Schema, model} = require("mongoose");
const mongoose = require("mongoose");

const AppointmentSchema = new Schema(
    {
        patient: mongoose.Types.ObjectId,
        doctor:  mongoose.Types.ObjectId,
        date: Date,
    }
);

const Appointment = model("Appointment", AppointmentSchema);
module.exports = {
    Appointment
};