const express =require('express');
const router =express.Router();
const sequelize =require('sequelize');
const db = require('../Config/Databases');
const User = require('../Models/User')
const jwt =require('jsonwebtoken');
const {Op}=sequelize; 
// const bcrypt =require('bcrypt')
const cors =require('cors');
const bodyparser=require('body-parser');
router.use(cors());

process.env.SECRET_KEY='secrets'
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({
    extended: true
  }));


  
router.get('/',(req,res)=>{
let filter ={};
let {q} =req.query
if (q){
    filter={
        where:{
            name:{
                [Op.like]:`${q}%`
            }
        }
    }
}

User.findAll(filter)
.then(user=>{
    res.json(user)
}
)
.catch(err=>console.log(err))
}
);


 router.post('/add',(req,res)=>{
     const data={
         name:req.body.name,
         email:req.body.email,
         description:req.body.description,
         designation:req.body.designation,
         password:req.body.password

     }
 
    User.findOne({
        where:{
           email: req.body.email
        }
    })
    .then(user=>{
        if(!user){
            User.create(data)
            .then(user=>{
                let token =jwt.sign(user.dataValues,process.env.SECRET_KEY,{
                    expiresIn:1440
                })
                res.json({token:token})
            }).catch(err=>res.send(err))
        }
        else{
            res.json({err:"Email already exists"});
        }
        
    })
    .catch(err=>{
        res.send(err)
    })
 });




router.post('/login',(req,res)=>{
    User.findOne({
        where:{
           email: req.body.email
        }
    })
    .then(user=>{
        if(req.body.password==user.password){
            let token =jwt.sign(user.dataValues,process.env.SECRET_KEY,{
                expiresIn:1440
            })
            res.json({token:token})
        }
        else{
            res.send("user doesnot exist");
        }
})
.catch(err=>{
    res.send('error'+ err)
})
})


router.get('/profile',(req,res)=>{
    var decode =jwt.verify(req.header['authorization'],process.env.SECRET_KEY)

    findOne({
        where:{
            id:decode.id
        }
    }).then(user=>{
        if(user){
            res.json(user)
        }
        else{
            res.json('user didnt exist');
        }
    }).catch(err=>{
        res.json(err)
    })
})




// router.get('/user/:id',(req,res)=>{
//     let {id}=req.params;
//     console.log('jkdjfk')
//     User.findByPk(id)
//     .then(user=>{
       
//         // res.render('user',
//         // //  user
//         // )
//     }
    
//     )
// });



module.exports=router;