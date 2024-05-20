const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async(req,res)=>{
    const restaurants = await Restaurant.findAll();
    res.json(restaurants)
})

app.get("/restaurants/:id", async(req,res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    res.json(restaurant)
})

app.use(express.json())
app.use(express.urlencoded())

app.post("/restaurant", async(req,res) => {
    const data = req.body
    const newRestaurant = await Restaurant.create({
        name: data.name,
        location: data.location,
        cuisine: data.cuisine
    }) 
    res.json(newRestaurant)
})

app.put("/restaurant/:id", async(req,res) => {
    let restaurant = await Restaurant.findByPk(req.params.id)
    const data = req.body
    restaurant = await restaurant.update({
        name: data.name,
        location: data.location,
        cuisine: data.cuisine
    })
    res.json(restaurant)
})

module.exports = app;