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
    })

})