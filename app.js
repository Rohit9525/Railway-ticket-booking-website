const express=require('express');
const app=express();
const signup=require("./connect");
const body1=require("body-parser");
const encoded=body1.urlencoded({extended:false});
const station=require("./station");
const contactUs=require("./connect3");

app.listen(3000,()=>{
    console.log("server started");
})

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index2.html");
});

app.get("/index",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});
app.get("/signup",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
});

app.post("/aftersignup",encoded,async(req,res)=>{
    const person=await signup(req.body);
    person.save().then(()=>{
        res.redirect("/logingateway");
    }).catch((err)=>{
        console.log(err);
    })
});

app.get("/logingateway",(req,res)=>{
    res.sendFile(__dirname+"/logingateway.html");
});

app.get("/signin",(req,res)=>{
    res.sendFile(__dirname+"/signin.html");
});


app.post("/aftersignin",encoded,async(req,res)=>{
    const uname=req.body.uname;
    const pass=req.body.pass;
    await signup.findOne({fn:uname,password:pass}).then((person)=>{
        if(person){
            res.sendFile(__dirname+"/index.html");
         }
         else{
             res.sendFile(__dirname+"/signin2.html");
         }
    }).catch(err=>{
        console.log(err);
    })
    
  

});

app.get("/logingateway",(req,res)=>{
    res.sendFile(__dirname+"/logingateway.html");
});

app.post("/availability",encoded,async(req,res)=>{
const from1=req.body.from;
const to1=req.body.to;
const date1=req.body.date;

try{
    const train= await station.findOne({from:from1,to:to1});
if(train){
res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Train Details</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: center;
            color: #333;
        }
        .train-details {
            margin-bottom: 20px;
        }
        .train-details p {
            margin: 5px 0;
        }
        .book-now-btn {
            display: block;
            width: 100%;
            background-color: #ffc400;
            color: #fff;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            text-align: center;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .book-now-btn:hover {
            background-color: #ffc400cd;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Train Details</h1>
    <div class="train-details">
        <p><strong>Train Name:</strong> ${train.tName}</p>
        <p><strong>From:</strong> ${train.from}</p>
        <p><strong>To:</strong> ${train.to}</p>
        <p><strong>Date:</strong> ${date1}</p>
        <p><strong>Time:</strong> ${train.time}</p>
        <p><strong>Available Seats:</strong> ${train.available}</p>
    </div>
    <button class="book-now-btn" onclick="location.href='http://127.0.0.1:3000/ticket'">Book Now</button>
</div>

</body>
</html>

`);
}
else{
    res.sendFile(__dirname+"/noResults.html");
}
}catch(err){
console.log(err);
}
})

app.get("/contact",(req,res)=>{
    res.sendFile(__dirname+"/contactUs.html");
})

app.post("/contactUs",encoded,async(req,res)=>{
    const response=await contactUs(req.body);
    response.save().then(()=>{
        res.redirect("/contactUs2");
    }).catch((err)=>{
        console.log(err);
    })
});

app.get("/contactUs2",(req,res)=>{
    res.sendFile(__dirname+"/contactUs2.html");
})

app.get("/services",(req,res)=>{
    res.sendFile(__dirname+"/services.html");
})

app.get("/book",(req,res)=>{
    res.sendFile(__dirname+"/bookTicket.html");
})
app.get("/ticket",(req,res)=>{
    res.sendFile(__dirname+"/ui.html");
})

app.get("/aboutUs",(req,res)=>{
    res.sendFile(__dirname+"/aboutUs.html");
})

