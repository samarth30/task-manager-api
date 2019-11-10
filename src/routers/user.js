const express = require("express");
const User = require("../models/user.js");
const router = new express.Router();
const {sendWelcomeEmail} = require('../emails/account.js');
const bodyParser = require('body-parser')
const auth = require('../middleware/auth.js');

router.use(bodyParser.json());
var urlencodedTrue = bodyParser.urlencoded({ extended: true });
router.use(urlencodedTrue);

router.post('/users', async (req,res)=>{
    const user = new User(req.body);
     
    try{
     await user.save();

     const token = await user.generateAuthToken();
     
     sendWelcomeEmail(user.email,user.name);   
     res.status(201).send({user,token});
    }catch(e){
     res.status(400).send(e);
    }
})

router.post('/users/login',async (req,res)=>{
    try{
    const user = await User.findByCredentials(req.body.email,req.body.password);
    
    const token = await user.generateAuthToken();
  
    res.send({user,token});

    }catch(e){
    res.status(400).send();
    }
})

router.post('/users/logout',auth ,async (req,res)=>{
    
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        })
        await req.user.save();

        res.send()
    }catch(e){
        res.status(500).send();
    }
})


router.post('/users/logoutAll',auth,async (req,res)=>{
    try{
    req.user.tokens = [];
    await req.user.save();

    res.send();
    }catch(e){
        res.status(500).send();
    }

})

router.get('/users/me', auth ,async (req,res)=>{
 
    try{
    res.send(req.user);
    }catch(e){
        res.status(400).send();
    }
    // try{
    //     const users = await User.find({});
    //     res.send(users);
    // }catch(e){
    //     res.status(500).send()
    // }

})

router.get('/users/:id', async (req,res)=>{
    const _id = req.params.id;

    try{
     const user = await User.findById(_id);
     if(!user){
         return res.status(404).send();
     }
     res.send(user);
    }catch(e){
      res.status(500).send();
    }

})

router.patch('/users/:id',async (req,res)=>{
    var updates = Object.keys(req.body);
    const allowedUpdates = ["name","email","password","age"];
    const isValidOperation =  updates.every((update)=>{
         return allowedUpdates.includes(update);
    });

    if(!isValidOperation){
    return res.status(400).send({error:"invalid updates"});
    }
    
    try{
        const user = User.findById(req.params.body);
        
        updates.forEach(()=> user[update] = req.body[update]);
        // const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true , runValidators:true});
        await user.save(); 
        if(!user){
            res.status(404).send()
        }
        res.send(user);
    }catch(e){
        res.status(400).send();
    }
})

router.delete('/users/:id',async (req,res)=>{
     try{
      const user = await User.findByIdAndDelete(req.params.id);
      if(!user){
          res.status(404).send();
      }
      res.send(user);
     }catch(e){
      res.status(500).send();
     }
})

module.exports = router;