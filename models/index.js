const User = require('./User');
const Tree = require("./Tree")

//User.belongsToMany(Tree, { as: 'Trees', foreignKey: 'owner_id', through: 'Tree' });
Tree.belongsTo(User, {
      foreign_key: 'user_id',
});

User.hasMany(Tree, {
      foreignKey: 'user_id',
})




module.exports = { User, Tree};

