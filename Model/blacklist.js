const mongoose=require("mongoose");

const blackSchema=mongoose.Schema({
token:String,

},{
    versionKey:false
})

const BlackModel=mongoose.model("token",blackSchema);

module.exports={
    BlackModel
}