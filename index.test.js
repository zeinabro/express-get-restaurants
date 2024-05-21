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

    test("creates new restaurant with valid name", async() => {
        const res = await request(app).post("/restaurants").send({
            name:"Zeinab's Restaurant",
            location:"London",
            cuisine:"Lebanese"
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toBe("Zeinab's Restaurant")
    })

    test("does not create restaurant with invalid values", async() => {
        const res = await request(app).post("/restaurants").send({
            name:"Zeinab's Super Very Long Too Long Restaurant",
            location:" ",
            cuisine:" "
        })
        expect(res.statusCode).toBe(400)
        expect(res.body.error[0]).toEqual(
            {
                "type": "field",
                "value": "Zeinab's Super Very Long Too Long Restaurant",
                "msg": "Invalid value",
                "path": "name",
                "location": "body"
            }
        )
        expect(res.body.error[1]).toEqual(
            {
                "type": "field",
                "value": "",
                "msg": "Invalid value",
                "path": "location",
                "location": "body"
            },
        )
        expect(res.body.error[2]).toEqual(
            {
                "type": "field",
                "value": "",
                "msg": "Invalid value",
                "path": "cuisine",
                "location": "body"
            }
        )
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