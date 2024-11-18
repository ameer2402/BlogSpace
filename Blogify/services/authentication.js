const jwt=require("jsonwebtoken");
const secret="@Pappu786";

function generateToken(user){
   const payload={
      _id:user._id,
       name:user.name,
       email:user.email,
       profileImage:user.profileImage,
   }
   return jwt.sign(payload,secret);
}

function validateToken(token){
   return jwt.verify(token,secret);
}

module.exports={
    generateToken,
    validateToken,
}