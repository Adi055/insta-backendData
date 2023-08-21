const express=require("express");
const { PostModel } = require("../Model/postModel");
const { authInsta } = require("../Middleware/auth");


const postRouter=express.Router();

postRouter.post("/add",authInsta,async(req,res)=>{
try {
    const post=new PostModel(req.body);
    await post.save()
    res.send({"msg":"new post has been added"})
} catch (error) {
    res.send({"error":error})
}
})

postRouter.get("/",authInsta,async(req,res)=>{
try {
    const post =await PostModel.find({userID:req.body.userID})
    res.send(post)
} catch (error) {
    res.send({"error":error})
}
})

postRouter.get("/top",(req,res)=>{

})

postRouter.patch("/update/:id",authInsta,async(req,res)=>{
const {id}=req.params;
const post=await PostModel.findOne({_id:id})
try {
    if(req.body.userID!==post.userID){
        res.send("you are not authorized")
    }
    else{
        await PostModel.findByIdAndUpdate({_id:id},req.body);
        res.send("you are updated")
    }
} catch (error) {
    res.send({"error":error})
}
})

postRouter.delete("/delete/:id",authInsta,async(req,res)=>{
    const {id}=req.params;
    const post=await PostModel.findOne({_id:id})
    try {
        if(req.body.userID!==post.userID){
            res.send("you are not authorized")
        }
        else{
            await PostModel.findByIdAndDelete({_id:id});
            res.send("expected id has been deleted")
        }
    } catch (error) {
        res.send({"error":error})
    }
})

module.exports={
    postRouter
}
