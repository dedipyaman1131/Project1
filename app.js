const express = require('express');
const bodyParser = require('body-parser');
const {check , validtionResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const app = express();
const mongoose =  require('mongoose');
var nodemailer = require('nodemailer')
mongoose.connect("mongodb://localhost:27017/eCommerceDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
}).then(()=>{
    console.log(`connection succesfull`)
}).catch(()=>{
    console.log('did not connect')
});

app.use(bodyParser.urlencoded({ extended: false }))
const { name } = require("ejs")
app.set('view engine','ejs');
app.use(express.static('public'));
// app.use(express.json())
const eCommerceSchema = new mongoose.Schema({
  
  Email: {
    type: String,
    required:true
    

  },
 Name: {
    type: String,
    required:true
   
  
  } ,
  Password: {
    type: String,
    required:true
    
    
    
  
  },
   ConfirmPassword: {
    type: String,
    required:true
   }
    
  
});

//creating collections


const registered = mongoose.model("Regpeople",eCommerceSchema);

app.get('/', (req, res) => {
    res.render('login', {bodyPara: 'how are you'});
  });

  app.get("/signup",(req,res)=>{
    res.render("signup")
  })
app.get("/home",(req,res)=>{
  res.render("home")
})


  app.post("/signup", async(req,res)=>{
    try{

     const  password =  req.body.password
     const confirmPassword = req.body.confirmPassword
     const email =  req.body.email;
     console.log(email)

      check('name')

    //  if(!password || !confirmPassword || !email || !name){
    //    res.send({code:0})
    //  }else
    
     if(password === confirmPassword){

     const registerPeople = new registered ({ 
      Email: req.body.email,
      Name : req.body.address,
      Password : req.body.password,
      ConfirmPassword: req.body.confirmPassword,
    

    });
 
  

// const recvr = req.body.email			
// var transporter = nodemailer.createTransport({
// service: 'gmail',
// auth: {
//   user: 'dedipyaman18@gmail.com',
//   pass: '1108393857'
// }
// });

// var mailOptions = {
// from: 'dedipyaman18@gmail.com',
// to: recvr,
// subject: 'Sending Email using Node.js',
// text: 'hello dada... mail ki gelo???'
// };

// transporter.sendMail(mailOptions, function(error, info){
// if (error) {
//   console.log(error);
// } else {
//   console.log('Email sent: ' + info.response);
// }
// });
 registerPeople.save();
    // res.redirect("/home")

    
    res.send({ msg: "ok" , code:1})
    
  }

  
  else{
  
  //  res.redirect("/signup")
  res.send({ msg: "not ok" , code:0})
   
  } 
}



catch(err){
    
    console.log("error occured")
  }

  })

   app.post("/", async(req,res)=>{

    try{
     const email = req.body.email;
     const password = req.body.password;
     console.log(email,password);
      
    //  const userEmail = await registered.findOne({Email:email});
     const user = await registered.findOne({Email:email})

     if(user == null) {
       res.send({ msg: 'Email/Password does not exist', code: 0})
     } else {
      let bPassword = user.Password;
      let bEmail = user.Email;
      console.log(bPassword);
      console.log(bEmail)

      if( bPassword === password){
      res.send({code:1}) ;
       
      } else{
       
          res.send({ msg: "Please check ur email/password" , code: 0});
       }

     }

       
   
    
   
     
    
      
      // if( userPassword.Email === email){
      
      //   res.status(201).render("home",{newPage: "to the home page"});
       
      // } else{
       
      //     res.send("invalid details")
       
      // }
    }catch(err){
      console.log("Error occurred", err);
    }


   });

   app.post("/home",(req,res)=>{
     const getInput = req.body.input;
     if(getInput === "hi"){
       res.render("login")
     }
   })
  

   // webtoken part 

  //  const createToken = async()=>{
  //    const token =  await jwt.sign({_id:"610b5195777c8e3e54367e8f"},"helloimdedipyamanbanerjeeabiggnerwebdeveloper", {expiresIn: "10 seconds"})
  //      console.log(token)
  //    const userVer = await jwt.verify(token , "helloimdedipyamanbanerjeeabiggnerwebdeveloper")
  //    console.log(userVer)
  //   }

  //   createToken()


app.listen(process.env.PORT || 3000,()=>{
    console.log("server is running")
})