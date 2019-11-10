const mongoose = require("mongoose");
const phone = require('phone');

const Rare = mongoose.model('Rare',{
    name:{
      type:String,
      required:true,
      trim:true,
    },
    number:{
      type:Number,
      required:true,
      trim:true,
      validate(value){
          const i = phone(value.toString(),'IND');
          if(!i[0]){
              throw new Error("you have entered wrong phone number");
          }
      }
    },
    phoneBrand:{
      type:String,
      required:true,
      trim:true,    
    },
    phoneModel:{
        type:String,
        required:true,
        trim:true,
    },
    phoneColor:{
        type:String,
        required:true,
        trim:true,
    },
    phoneDefects:{
        type:String,
        required:true,
        trim:true,
    }
})

module.exports = Rare;