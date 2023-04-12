const {Schema, model} = require("mongoose");
const mongoose = require("mongoose");

const UserInfoSchema = new Schema(
    {
        owner: mongoose.Types.ObjectId,
        coast: Number,
        about: String,
        specialization: String,
        category: String,
        gender: String,
        birthday: Date,
        userImgUrl: String
    }
);

UserInfoSchema.methods.toWeb = function () {
    let json = this.toJSON();
    json.id = this._id; //this is for the front end
    return json;
};

const UserInfo = model("userInfos", UserInfoSchema);
module.exports = {
    UserInfo
};