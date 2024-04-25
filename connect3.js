const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/project").then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
});

const contactschema=new mongoose.Schema({
name:{
    type:String,
    required:true,
    trim:true

},

email:{
    type:String,
    required:true,
    trim:true
},
message:{
    type:String,
    required:true,
    trim:true
}

});

const contactUs=mongoose.model("ContactUs",contactschema);
module.exports=contactUs;