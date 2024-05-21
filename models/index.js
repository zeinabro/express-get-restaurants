const Restaurant = require('./Restaurant')
const Item = require('./Item');
const Menu = require('./Menu');

Restaurant.hasMany(Menu)
Menu.belongsTo(Restaurant)

Menu.belongsToMany(Item,{through: "MenusItems"})
Item.belongsToMany(Menu,{through: "MenusItems"})

module.exports = {Restaurant,Item,Menu};