const express = require("express");
const Task = require("../models/task.js");
const router = new express.Router();
const {sendtasks} = require("../emails/account.js");

router.post('/tasks', async (req,res)=>{
    const task = new Task(req.body)
    try{
      const tasks = await task.save();
      sendtasks(task.description);
      res.status(201).send(tasks); 
    }catch(e){
      res.status(400).send(e);
    }
})

router.get('/tasks',async (req,res)=>{
    
    try{
        const tasks =await Task.find({});
        res.status(201).send(tasks);
    }catch(e){
        res.status(500).send();
    }
    
})

router.get('/tasks/:id',async (req,res)=>{
    const _id = req.params.id;

    try{
        const task = await Task.findById(_id);
        if(!task){
            res.status(401).send();
        }
        res.send(task);
    }catch(e){
        res.status(500).send();
    }
})

router.patch('/tasks/:id',async (req,res)=>{
    const update = Object.keys(req.body);
    const allowedUpdates = ["description","completed"];
    const isValidOperation = update.every((update)=>{
        return allowedUpdates.includes(update);
    })

    if(!isValidOperation){
        res.status(400).send({error:"Invalid operation"});
    }
    try{

        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        if(!task){
            res.status(404).send();
        }
        res.send(task);
    }catch(e){
        res.status(400).send()
    }

})

router.delete('/tasks/:id',async (req,res)=>{
    try{
     const task = await Task.findByIdAndDelete(req.params.id);
     if(!task){
         res.status(404).send();
     }
     res.send(task);
    }catch(e){
     res.status(500).send();
    }
})

module.exports = router;