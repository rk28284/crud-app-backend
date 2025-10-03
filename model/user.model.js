const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    avatar:String

})

const userModel=mongoose.model("users",UserSchema)

module.exports=userModel