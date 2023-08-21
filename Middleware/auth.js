const jwt =require("jsonwebtoken");

const authInsta=(req,res,next)=>{
const token=req.headers.authorization?.split(" ")[1];
console.log("hh",token);

if(token){
const decoded=jwt.verify(token,"insta");
if(decoded){
    req.body.userID=decoded.userID;
    req.body.user=decoded.user;
    next()
}
else{
    res.send({"msg":"Please login"})
}
}
else{
    res.send({"msg":"Please login"})
}

}

module.exports={
    authInsta
}