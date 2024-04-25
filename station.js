const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/project")
.then(()=>{
    console.log("connected");
})
.catch((err)=>{
console.log(err);
});

const stationsch=mongoose.Schema({
    from:{
        type:String,
        trim:true,
        required:true
    },
    to:{
        type:String,
        trim:true,
        required:true,
    },
    date:{
        type:String,
        trim:true,
        required:true
    },
    tName:{
        type:String,
        trim:true
    },
    time:{
        type:String,
        trim:true
    },
    available:{
        type:Number,
        trim:true
    }
});

const station=mongoose.model("station",stationsch);
module.exports=station;