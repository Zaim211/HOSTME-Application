const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
<<<<<<< HEAD
  name: {type:String, unique:true, required:true},
  email: {type:String, unique:true, required:true},
  password: {type:String, unique:true, required:true},
  profilePicture: {type:[String], default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", required:false},
}, {timestamps:true});
=======
  name: String,
  email: { type:String, unique:true },
  password: String,
});
>>>>>>> 0d5fc0fd964f1d33889a7bab2fe174d4620a73c7

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
