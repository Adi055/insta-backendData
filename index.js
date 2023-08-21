const express=require("express");
const { connection } = require("./db");
const { instaRouter } = require("./Routes/userRoutes");
const { BlackModel } = require("./Model/blacklist");
const { postRouter } = require("./Routes/postRoutes");
const cors=require("cors");

const app=express();
app.use(cors());
app.use(express.json())
app.use("/users",instaRouter)
app.use("/posts",postRouter)

app.get("/logout",async(req,res)=>{
    const token=req.headers.authorization;
try {
    const user=new BlackModel(token);
    await user.save();
    res.send("user has been logged out")
} catch (error) {
    res.send({"error":error})
}
})

app.listen(8000,async()=>{
    try {
        await connection
        console.log("server running at 8000");
        console.log("connected to the db");
    } catch (error) {
        console.log(error);
    }

})