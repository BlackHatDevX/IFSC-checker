const express=require("express")
const app=express()
const bodyParser=require("body-parser");
const https=require("https");
const ejs=require("ejs")
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));


// --------------STATIC FILES---------------
app.use(express.static("public"))


// ------------------GET-------------------
app.get("/",function(req,res){
    res.render("home")
})


// ------------------POST--------------------------
app.post("/",function(req,res){
    let ifsc = req.body.ifsc
    let url ="https://ifsc.razorpay.com/"+ifsc;
    https.get(url,function(response){
        let check=response.statusCode;
        console.log(check);
        response.on("data",function(data){
            console.log(check);
            let bankData=JSON.parse(data)
            let bankName=bankData.BANK
            let bankState=bankData.STATE
            let bankCity=bankData.CITY
            let bankAddress=bankData.ADDRESS
            res.render("results",{responseCode:check,webBankName:bankName,webBankAddress:bankAddress,webBankState:bankState,webBankCity:bankCity})
        
        })
    })
})



// -----------------LISTEN------------------------
app.listen(process.env.PORT || 3000,function(){
    console.log("Listening at port 3000");
})