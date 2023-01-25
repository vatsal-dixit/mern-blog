const { User } = require("./models");
const jwt = require("jsonwebtoken");


const register = async(req,res) => {
    const { username, password }  = req.body;
    const isExist = await User.findOne({username : username});
    if(isExist){
        return res.json({status : "User already exists"});
    }
    if(password.length < 8){
        return res.json({status : "Password must contain at least 8 characters"})
    }
    let _user = new User(req.body);
    _user = await _user.save();
    _user.encrptd_passwd = undefined;
    _user.salt = undefined;
    return res.json({status : "User created", _user});
}

const commonLogin = async(req,res,next) => {
    const { username, password } = req.body;
    const isUser = await User.findOne({username : username});
    if(!isUser){
        return res.json({status : "User not found"});
    }
    if(!isUser.authenticate(password)){
        return res.json({status : "Passwords do not match"});
    }
    
    
    let token = jwt.sign({_id: isUser._id}, isUser.salt);
    isUser.encrptd_passwd = undefined;
    isUser.salt = undefined;
    req.body.token = token;
    req.body.user = isUser;
    next();
}

const login = async(req,res) => {
    return res.json({status : "login successful", data : req.body});
}
const reset = async(req,res) => {
    let user = await User.findOne({username : req.body.username});
    user.password = req.body.new_password;
    user = await user.save();
    return res.json({status: "Password reset"});
}

module.exports = { register,commonLogin, login,reset };