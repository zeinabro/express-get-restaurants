const Restaurant = require('./Restaurant')
const Model = require("./Menu");
const Item = require('./Item');
const Menu = require('./Menu');

Restaurant.hasMany(Menu)
Menu.belongsTo(Restaurant)

Menu.belongsToMany(Item)
Item.belongsToMany(Menu)

module.exports = {Restaurant,Model,Item};