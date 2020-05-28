
const Sequelize = require('sequelize');
// Option 1: Passing parameters separately
module.exports = new Sequelize('sample', 'root', '123456', {
  host: 'localhost',
  dialect:  'mariadb' ,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

