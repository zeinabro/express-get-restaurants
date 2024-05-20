const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const supertest = require("supertest")
const app = require("./src/app")
const { describe, expect, test } = require("@jest/globals")
const {seedRestaurant} = require("./seedData")

describe("./restaurants endpoint", ()=>{
    test("get all restaurants", async() => {
        const res = await request(app).get("/restaurants")
        expect(res.statusCode).toBe(200)
        expect(res.body[1].name).toEqual(seedRestaurant[1].name)
        expect(res.body.length).toBe(3)
    })

    test("get restaurant by id", async() => {
        const res = await request(app).get("/restaurants/2")
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toBe(seedRestaurant[1].name)
    })

    test("creates new restaurant", async() => {
        const res = await request(app).post("/restaurants").send({
            name:"Zeinab's Restaurant",
            location:"London",
            cuisine:"Lebanese"
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toBe("Zeinab's Restaurant")
    })

    test("updates restaurant by id", async() => {
        const res = await request(app).put("/restaurants/3").send({
            name:"Zeinab's new restaurant",
            location:"London",
            cuisine:"Lebanese"
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toBe("Zeinab's new restaurant")
    })

    test("delete restaurant by id", async() => {
        const res = await request(app).delete("/restaurants/3")
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe("Restaurant successfully deleted")
    })
})