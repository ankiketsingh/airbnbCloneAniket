const mongoose=require("mongoose");
const Schema= mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose").default;

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }
});


// console.log("Plugin value:", passportLocalMongoose);
// console.log("Plugin type:", typeof passportLocalMongoose);


userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);
module.exports=User;