const mongoose=require('mongoose');
const Schema=mongoose.Schema
const UserSchema=new Schema({
    firstname:{
        type:String,
        required:true
    },
     email:{
        type:String,
        required:true
     },
     password:{
         type:String,
         required:true
     },
     isadmin:{
        type:Boolean,
        default:false,
        required:false
     }
});

module.exports=mongoose.model("user",UserSchema)