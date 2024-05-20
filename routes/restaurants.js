const express = require("express")
const router = express.Router()
const Restaurant = require("../models/index")
const {check, validationResult} = require("express-validator")

router.get("/", async(req,res)=>{
    const restaurants = await Restaurant.findAll();
    res.json(restaurants)
})

router.get("/:id", async(req,res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    res.json(restaurant)
})

router.use(express.json())
router.use(express.urlencoded())

router.post("/", async(req,res) => {
    const data = req.body
    const newRestaurant = await Restaurant.create({
        name: data.name,
        location: data.location,
        cuisine: data.cuisine
    }) 
    res.json(newRestaurant)
})

router.put("/:id", async(req,res) => {
    let restaurant = await Restaurant.findByPk(req.params.id)
    const data = req.body
    restaurant = await restaurant.update({
        name: data.name,
        location: data.location,
        cuisine: data.cuisine
    })
    res.json(restaurant)
})

router.delete("/:id", async(req,res) => {
    await Restaurant.destroy({
        where: {
            id: req.params.id
        }
    })
    res.send("Restaurant successfully deleted")
})

module.exports = router
