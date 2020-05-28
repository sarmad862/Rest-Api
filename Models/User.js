const sequelize =require('sequelize');
const db = require('../Config/Databases');


const User =db.define('users',{
    id:{
        type:sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:sequelize.STRING
    },
    email:{
        type:sequelize.STRING
    },
    description:{
        type:sequelize.STRING
    },
    designation:{
        type:sequelize.STRING
    },
    password:{
        type:sequelize.STRING
    }
    
}
, {
    timestamps: false
})


module.exports = User;