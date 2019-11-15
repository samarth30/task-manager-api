const express = require('express');
const userRouter = require('./routers/user.js');
const taskRouter = require('./routers/task.js');
const rareRouter = require('./routers/rare.js');

require("./db/mongoose.js");

const app = express();
const port = process.env.PORT || 3000;

// app.use((req,res,next)=>{
//     res.status(501).send("the server is under maintainence");
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(rareRouter);

app.listen(port,()=>{
    console.log("server is up on the port " + port);
})

const bcrypt = require('bcryptjs');
// const Myfunction = async () =>{
//      const password = "samarth30";
//      const hashedPassword = await bcrypt.hash(password,8);

//      console.log(password);
//      console.log(hashedPassword);

//      const isMatch = await bcrypt.compare(password,hashedPassword);
//      console.log(isMatch);
// }
