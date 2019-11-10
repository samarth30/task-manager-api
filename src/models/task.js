const mongoose = require("mongoose");


const task = mongoose.model("tasks",{
    description:{
       type:String
    },
    completed:{
       type:Boolean
    }
 })
 
 module.exports = task;