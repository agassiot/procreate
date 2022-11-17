const sequelize = require('../config/connection');
const { User, Tree }= require('../models');

const userData = require('./userData.json');
const treeData = require('./treeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

   await Tree.bulkCreate(treeData,{
     individualHooks: true,
     returning: true,
     });

  process.exit(0);
};

seedDatabase();
