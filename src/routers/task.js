const express = require("express");
const Task = require("../models/task.js");
const router = new express.Router();
const auth = require('../middleware/auth.js');

const bodyParser = require('body-parser')

router.use(bodyParser.json());
var urlencodedTrue = bodyParser.urlencoded({ extended: true });
router.use(urlencodedTrue);

router.post('/tasks', auth,async (req,res)=>{

    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    try{
      const tasks = await task.save();

      res.status(201).send(tasks); 
    }catch(e){
      res.status(400).send(e);
    }
})

router.get('/tasks',auth,async (req,res)=>{
    const match = {};
    const sort = {};

    if(req.query.sortBy){
      const parts = req.query.sortBy.split(":");
      sort[parts[0]] = parts[1] === 'desc' ? -1:1;
    }

    if(req.query.completed){
        match.completed = req.query.completed === 'true';
    }
    
    try{
        // const tasks =await Task.find({owner: req.user._id});
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.status(201).send(req.user.tasks);
    }catch(e){
        res.status(500).send();
    }
    
})

router.get('/tasks/:id',auth,async (req,res)=>{
    const _id = req.params.id;

    try{
        // const task = await Task.findById(_id);
        const task = await Task.findOne({_id,owner: req.user._id});

        if(!task){
            res.status(401).send();
        }
        res.send(task);
    }catch(e){
        res.status(500).send();
    }
})

router.patch('/tasks/:id',auth,async (req,res)=>{
    const update = Object.keys(req.body);
    const allowedUpdates = ["description","completed"];
    const isValidOperation = update.every((update)=>{
        return allowedUpdates.includes(update);
    })

    if(!isValidOperation){
        res.status(400).send({error:"Invalid operation"});
    }
    try{

        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});
        if(!task){
            res.status(404).send();
        }
        res.send(task);
    }catch(e){
        res.status(400).send()
    }

})

router.delete('/tasks/:id',auth,async (req,res)=>{
    try{
     const task = await Task.findByIdAndDelete({_id: req.params.id, owner: req.user._id});
     
     if(!task){
         res.status(404).send();
     }
     res.send(task);
    }catch(e){
     res.status(500).send();
    }
})

module.exports = router;