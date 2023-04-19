const {Schema, model} = require("mongoose");
const mongoose = require("mongoose");

const AppointmentSchema = new Schema(
    {
        patient: { type: mongoose.Types.ObjectId,
            ref: "user"
        },
        doctor:  { type: mongoose.Types.ObjectId,
            ref: "user"
        },
        date: Date,
    }
);

const Appointment = model("appointment", AppointmentSchema);
module.exports = {
    Appointment
};