const bcrypt=require("bcrypt");
const {Schema,model}=require("mongoose");
const {generateToken}=require("../services/authentication");

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
       type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profileImage:{
        type:String,
        default:`/profileImages/default_profile.jpg`,
    },

},{timestamps:true});

userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified("password")) return next();
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
    next();
});

userSchema.static("matchPasswordandGenerateToken", async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found");
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(user.password);
    console.log(password);
    console.log(isMatch);
    if (!isMatch) throw new Error("Password is incorrect");
    const token = generateToken(user);
    return token;
});

const User=model("user",userSchema);
module.exports=User;
