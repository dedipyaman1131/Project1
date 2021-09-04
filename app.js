const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const app = express();
const mongoose =  require('mongoose');
var nodemailer = require('nodemailer')
mongoose.connect("mongodb://localhost:27017/eCommerceDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
}).then(()=>{
    console.log(`Connected to DB successfully`)
}).catch(()=>{
    console.log('did not connect')
});

app.use(bodyParser.urlencoded({ extended: false }))
const { name } = require("ejs")
app.set('view engine','ejs');
app.use(express.static('public'));
// app.use(express.json())
const eCommerceSchema = new mongoose.Schema({
  
  email: {
    type: String,
    required:true,
    unique : true
    

  },
 name: {
    type: String,
    required:true,
    unique:true
   
  
  } ,
  password: {
    type: String,
    required:true
    
    
    
  
  },
 
    
  
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
     const email =  req.body.email;
     const name = req.body.name;
     
     console.log(email)



     const registerPeople = new registered ({ 
      email: email,
      name : name,
      password : password
    });
 
 registerPeople.save();
 
    res.send({ msg: "ok" , code:1})
    
}



catch(err){
    
    console.log("error occured", err)
    res.send({ msg: "not ok" , code:0})

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


app.listen(3000,()=>{
    console.log("server is running on port 3000")
})