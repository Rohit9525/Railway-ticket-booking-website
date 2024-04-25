const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/project").then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
});

const signupschema=new mongoose.Schema({
fn:{
    type:String,
    required:true,
    trim:true

},
ln:{
    type:String,
    required:true,
    trim:true
},
mobile:{
    type:Number,
    required:true,
    trim:true
},
gender:{
    type:String,
    required:true,
    trim:true
},
country:{
    type:String,
    required:true,
    trim:true
},
email:{
    type:String,
    required:true,
    trim:true,
    unique:true
},
password:{
    type:String,
    required:true,
    trim:true
}

})

const signup=mongoose.model("signup",signupschema);
module.exports=signup;