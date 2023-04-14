const {Appointment} = require("../models/Appointment.model");
const mongoose = require("mongoose");
const {UserInfo} = require("../models/Info.model");
const ObjectId = mongoose.Types.ObjectId;

module.exports.getAppointment = async (req, res) => {
    let query;
    let appointment;
    if (req?.params?.id) {
        query = {_id: ObjectId(req.params.id)}
        appointment = await Appointment.findOne(query)
    } else {
        query = {
            [req.user.role]: ObjectId(req.user._id),
        }
        if (req?.body?.date?.start) {
            query.date = {$gte: req.body.date.start};
        }
        if (req?.body?.date?.end) {
            query.date = {...query.date, $lt: req.body.date.end};
        }
        appointment = await Appointment.find(query)
    }

    return res.status(200).json(appointment);
}

module.exports.updateAppointment = async (req, res) => {
    const patient = ObjectId(req.user.role === "patient" ? req.user._id : req.body.opponent);
    const doctor = ObjectId(req.user.role === "doctor" ? req.user._id : req.body.opponent);
    const date = req.body.date
    const query = {
        $and: [
            {
                $or: [
                    {patient},
                    {doctor}
                ]
            },
            {
                date: req.body.date
            }
        ]
    }
    const app = await Appointment.findOne(query)
    if (app) {
        return res.status(200).json({acknowledged: false, date: "busy", item: app._id});
    }
    const appointment = await Appointment.findByIdAndUpdate({_id: ObjectId(req.params.id)}, {patient,doctor,date }, {returnDocument: "after"})
    return res.status(200).json(appointment);
}

module.exports.addAppointment = async (req, res) => {
    const patient = ObjectId(req.user.role === "patient" ? req.user._id : req.body.opponent);
    const doctor = ObjectId(req.user.role === "doctor" ? req.user._id : req.body.opponent);
    const query = {
        $and: [
            {
                $or: [
                    {patient},
                    {doctor}
                ]
            },
            {
                date: req.body.date
            }
        ]
    }
    const app = await Appointment.findOne(query)
    if (!app) {
        const newApp = await Appointment.collection.insertOne({patient, doctor, date: new Date(req.body.date)})
        return res.status(200).json(newApp);
    }
    return res.status(200).json({acknowledged: false, date: "busy", item: app._id});
}

module.exports.deleteAppointment = async (req, res) => {
    const appointment = await Appointment.findByIdAndDelete({_id: ObjectId(req.params.id)})
    return res.status(200).json(appointment);
}