const express =require('express');
const bodyparser =require('body-parser');
const path =require('path');

const cors =require('cors');

//test Db
const db=require('./Config/Databases');

db.authenticate()
.then(()=>console.log("connected"))
.catch(err => console.log("error"));
const PORT =process.env.PORT||5000;
const app =express();


app.use(cors());
// app.use(bodyparser.json());

// app.use(
//   
// )
const User = require('./routes/user')

app.use('/user',User);

// app.get('/',(req,res)=>res.send('test'));
// app.get('/user',require('./routes/user'));
// app.get('/add',require('./routes/user'));
// app.use('/user/:id',require('./routes/user'));

app.listen(PORT,console.log(`server started at ${PORT}`));