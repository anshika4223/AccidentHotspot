const mongoose=require("mongoose");
const AccLoc=require("../models/accident");
const initData=require("./data");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/routeShield');
}

main().then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});

const initDB= async()=>{
    await AccLoc.insertMany(initData.data);
    console.log("data was initialised");
}

initDB();