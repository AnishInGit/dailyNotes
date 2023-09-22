const express=require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');   //to set a validation ,(it's taken from website)
const router=express.Router();
const bcrypt = require('bcryptjs');  // It's used for pasword security perpose
const fetchuser=require('../middleware/fetchuser')
const Jwt_SECRET="Anishisagoodb$oy";
const jwt = require('jsonwebtoken');

// ROUTE 1: create a user using POST "/api/auth/createuser"   ,Dosen't require login 

router.post('/createuser',[
   body('name','Enter a Valid Name').isLength({ min: 3 }),
   body('email','Enter a Valid email').isEmail(),
   body('password','Enter a valid Password (Minimum 5 charecters)').isLength({ min: 5 }),

],async (req,res)=>{
   let success=false;
   //If there are errors, return bad request and the errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

   try {
   let user=await User.findOne({email:req.body.email})
   if(user){
      return res.status(400).json({success,error:"This Email alrealy Used"})
   }

  const salt = await bcrypt.genSaltSync(10);
  const secretPass= await bcrypt.hash(req.body.password,salt)
   //create a new user
   user=await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secretPass,
    })
    const data={
              user:{
               id:user.id
              }
    }
   const authToken = jwt.sign(data,Jwt_SECRET);
   success=true;
res.json({success,authToken})

} catch (error) {
      console.error(error.message);
      res.status(500).send(success,"Some Error Occured");
}
})

// ROUTE 2: Authenticate a user using POST "/api/auth/createuser"   ,Dosen't require login
router.post('/login',[
   body('email','Wrong email').isEmail(),
   body('password','Wrong Password').isLength({ min: 5 }),

],async (req,res)=>{
   //If there are errors, return bad request and the errors
   let success=false;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
   const {email,password}=req.body;
   try {
         let user = await User.findOne({email})
         if(!user){
            return res.status(400).json({success,error:"Please enter correct details"})
         }
      const passwordCompare= await bcrypt.compare(password,user.password);
      if(!passwordCompare){
         success=false;
         return res.status(400).json({success,error:"Please enter correct details"})
      }
      const data={
         user:{
          id:user.id
         }
}
const authToken = jwt.sign(data,Jwt_SECRET);
success=true;
res.json({success ,authToken})

   } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
   }

})



// ROUTE 3: Get loggedin user details using: POST "/api/auth/getuser"   .Login required

router.post('/getuser',fetchuser,async (req,res)=>{
  
   try {
      userId=req.user.id;
      const user = await User.findById(userId).select("-password")  //select all except password
      res.send(user)
            
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
   }

})


 
module.exports=router;
