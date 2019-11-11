const mongoose = require("mongoose");


const task = mongoose.model("tasks",{
    description:{
       type:String,
       required:true,
       trim:true
    },
    completed:{
       type:Boolean,
       required:true,
       trim:true
    },
    owner:{
       type: mongoose.Schema.Types.ObjectId,
       required:true,
       ref:'User'
    }
 })
 
 module.exports = task;