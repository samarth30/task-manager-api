const express = require("express");
const Rare = require("../models/rare.js");
const router = new express.Router();
const bodyParser = require('body-parser')


router.use(bodyParser.json());
var urlencodedTrue = bodyParser.urlencoded({ extended: true });
router.use(urlencodedTrue);

router.post('/rare',async (req,res)=>{
    const customer = new Rare(req.body);
    console.log(req.body);
    try{
      await customer.save();
      res.status(200).send({created:true});
    }catch(e){
      res.status(400).send({created:false});
    }
})

router.get('/rare',async(req,res)=>{
    
    try{
     const customers = await Rare.find({});
      res.send(customers);
    }catch(e){
      res.status(500).send();
    }
})

router.post('/rare/delete',async (req,res)=>{
  try{

   const customer = await Rare.findByIdAndDelete(req.body.id);

   if(!customer){
       res.status(404).send({error : "no user"});
   }
   res.send({deleted : true});
  }catch(e){
   res.status(500).send({deleted : false});
  }
})

module.exports = router;