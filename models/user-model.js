const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/multer");


const userSchema=mongoose.Schema({
    username:String,
    image:String,
    email:String,
    profilePic:{
        type:String,
        default:""
 
    }
})

module.exports= mongoose.model("user",userSchema)