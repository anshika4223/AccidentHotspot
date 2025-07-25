const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const locationSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    count:{
        type:Number,
        required:true,
    },
    lat:{
        type:Number,
        required:true,
    },
    lon:{
        type:Number,
        required:true,
    }
});

const AccLoc=mongoose.model("AccLoc",locationSchema);
module.exports=AccLoc;
