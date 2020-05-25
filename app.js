const express = require("express");
const bodyParser = require("body-parser");
const  ejs =require("ejs");
const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/contact', {useNewUrlParser: true, useUnifiedTopology: true});

const contactSchema=new mongoose.Schema({
  firstName:String,
  lastName:String,
  email:String,
  contact:String,
  address:String
});

const Contact=mongoose.model("Contact",contactSchema);
const contactt=new Contact({
firstName:"Shivaram",
lastName:"M",
email:"asdah",
contact:"7878787878",
address:"balaji street"
});
contactt.save();

let firstName=[];
let lastName=[];
let email=[];
let contact=[];
let address=[];

const app=express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));



app.get("/",function(req,res){


res.render("home.ejs");
});
app.get("/card",function(req,res){
Contact.find({},function(err,found){
  // console.log(found);
  res.render("card",{foundItems:found})


})

});
app.post("/",function(req,res){
  const data = new Contact({
    firstName:(req.body.firstName==""?"----":req.body.firstName),
    lastName:(req.body.lastName==""?"----":req.body.lastName),
    email:(req.body.email==""?"----":req.body.email),
    contact:(req.body.contact==""?"----":req.body.contact),
    address:(req.body.address==""?"----":req.body.address)
  });
  data.save();
  // firstName.push(req.body.firstName==""?"----":req.body.firstName);
  // lastName.push(req.body.lastName==""?"----":req.body.lastName);
  // email.push(req.body.email==""?"----":req.body.email);
  // contact.push(req.body.contact==""?"----":req.body.contact);
  // address.push(req.body.address==""?"----":req.body.address);

    res.redirect("card");


});



app.listen("3000",function(){
console.log("its happening");


});
