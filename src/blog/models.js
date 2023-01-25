const { model ,Schema} = require("mongoose");
const { User } = require("../auth/models");


const blogSchema = new Schema({
    title: String,
    desc: String,
    user_id:{
        type: Schema.Types.ObjectId,
        ref: User,
        required : true
    }
},{timestamps:true});


const Blog = model("Blog", blogSchema);

module.exports = { Blog };
