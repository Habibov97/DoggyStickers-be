const { Sequelize } = require('sequelize');
const config = require('./index');

const sequelize = new Sequelize(config.databaseURL);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database has been connected successfully');
  })
  .catch((err) => {
    console.log('Cannot connect to database', err);
  });

sequelize.sync({ alter: true });

module.exports = sequelize;
