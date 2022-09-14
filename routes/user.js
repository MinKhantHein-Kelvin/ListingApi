const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require ("jsonwebtoken");

//User Register
router.post("/register",async (req,res)=>{

  //Email Exist
   const emailExist = await User.findOne({
      email : req.body.email
   });

  //Hash Password
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hashSync(req.body.password, salt)

  //Create User
  const userRegister= new User({
    name : req.body.name,
    email : req.body.email,
    password : hashPassword
  });
  try {
    if (emailExist) {
      return res.json({success : false, message : "Email Already Exist!"})
    }
    await userRegister.save();
    res.json({success : true , message : 'User Register Successful'});
  } catch (error) {
    res.json({success : false , message : "Couldn't save user!"})
  }
});

 //User Login
router.post("/login",async (req,res)=>{
  //checking email in db
  const user = await User.findOne({email : req.body.email});
  if(!user) return res.json({success : false , message:"Invalid Email!"});

  //Checking Password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.json({success : false, message : "Invalid Password!"});

  //create and assign a token
  const token = jwt.sign({_id : user._id}, process.env.Token_Secret);
  res.header("auth-token", token).json({success : true ,token : token});

})

module.exports = router;


