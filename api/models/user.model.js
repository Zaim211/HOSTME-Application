const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  name: {type:String, unique:true, required:true},
  email: {type:String, unique:true, required:true},
  password: {type:String, unique:true, required:true},
  profilePicture: {type:[String], default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", required:false},
}, {timestamps:true});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
