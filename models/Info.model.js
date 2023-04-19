const {Schema, model} = require("mongoose");
const mongoose = require("mongoose");

const UserInfoSchema = new Schema(
    {
        owner: { type: mongoose.Types.ObjectId,
            ref: "user"
        },
        coast: {type: Number, default: 0},
        about: {type:String, default: ""},
        specialization: {type:String, default: ""},
        category: {type:String, default: ""},
        gender: {type:String, default: ""},
        birthday: {type:String, default: '00.00.0000'},
        userImgUrl: {type:String, default: ""},
        rating: {type:[
            Number
        ], default: []},
        
    }
);

UserInfoSchema.methods.toWeb = function () {
    let json = this.toJSON();
    json.id = this._id; //this is for the front end
    return json;
};

const UserInfo = model("userInfo", UserInfoSchema);
module.exports = {
    UserInfo
};