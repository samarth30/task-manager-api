const mongoose = require("mongoose");
const mongodbdatabase = "mongodb+srv://taskapp:ajayrenu30@cluster0-makaa.mongodb.net/task-manager-api?retryWrites=true&w=majority"
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
   useNewUrlParser:true,
   useUnifiedTopology:true,
  useCreateIndex:true,
  useFindAndModify:true
})

// "mongodb://127.0.0.1:27017/task-manager-api"
