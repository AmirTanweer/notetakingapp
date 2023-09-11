const express=require('express')
const User=require('../models/User')
const router=express.Router();
const {body,validationResult}=require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET="hellothis$s$ecret"
//create a User using: POST "/api/auth/createuser". Doesn't require Auth
router.post('/createuser',[
    body('name',"Name must be atleast 3 character").isLength({min:3}),
    body('email',"Enter a valid email").isEmail(),
    body('password',"Password must be atleast 5 characters").isLength({min:5})

], async (req,res)=>{
   

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
   
    try{

        //check whether the user with this email exist already
        let user=await User.findOne({email:req.body.email})
   if(user){
    return res.status(400).json({error:"Sorry a user with this email already exists"})
   }

   const salt=await bcrypt.genSalt(10)
   const secPass= await bcrypt.hash(req.body.password,salt) 
   //create a new user
   user =await User.create({
       name:req.body.name,
       password:secPass,
       email:req.body.email,
    })
    const data={
        user:{
            id:user.id
        }
    }
   const authToken=jwt.sign(data,JWT_SECRET)
   console.log(authToken)
    res.json({authToken})
    
}
catch(error){
    console.error(error.message);
    res.status(500).send("some Error occured")
}
    
})
module.exports=router