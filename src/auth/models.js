const mongoose = require("mongoose");
const uuid = require("uuid");
const CryptoJS = require("crypto-js")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        trim: true
    },
    name:String,
    encrptd_passwd:String,
    salt:String,
    email:String
},
{
    timestamps:true
})

userSchema.methods = {
    securePassword : function(plainPassword){
        return CryptoJS.SHA256(plainPassword, this.salt).toString();
    },

    authenticate : function(password){
        return this.encrptd_passwd === this.securePassword(password);
    }
}

userSchema.virtual("password").set(function(plainPassword){
    this.salt = uuid.v4();
    this.encrptd_passwd = this.securePassword(plainPassword);
})



const User = mongoose.model("User",userSchema);

module.exports = { User };