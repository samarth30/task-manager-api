const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
   {
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
   },{
      timestamps:true
   }
)
const task = mongoose.model("tasks",taskSchema);
 
 module.exports = task;