const request = require('supertest')
const server = require('../api/server')
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../auth/config')
const db = require("../database/dbConfig")
let token = ""


describe('test register', function () {
    beforeEach(async () => {
        await db("meals").truncate()
        await db("pets").truncate()
        await db("users").truncate()
    })
    it('works', function () {
        return request(server).post('/api/auth/register')
            .send({
                "username": "bruce",
                "password": "pass",
                "phone": "8172638373",
                 })
            .then(res => {
                expect(res.status).toBe(201);

            })
    })
})



describe('test login', function () {

    it('works', function () {
        return request(server).post('/api/auth/login')
            .send({
                username: 'bruce',
                password: 'pass',
                phone: "8172638373"
            })
            .then(res => {

                token = JSON.parse(res.text).token
                expect(res.status).toBe(200)

            })
    })
    it('works', function () {
        let isValid = false
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (!err) {
                isValid = true
                decoded = decodedToken
                console.log(decoded)
            }
        })
        expect(isValid).toBe(true)
    })
})


describe('test get to /pets', function () {
    it('works', function () {
        return request(server).post('/api/pets/')
        .set("authorization", token)
            .send({
                "petName": "Bob",
                "petScore": "8",
                "petImgSet": "shark"
                 })
            .then(res => {
                expect(res.status).toBe(201);

            })
    })
    it('works', function () {
        return request(server).get('/api/pets/')
            .set('authorization', token)
            .then(res => {


                expect(res.status).toBe(200)

            })
    })
})

describe("get to /pets/:petId", () => {
    it("works", () => {
        return request(server).get("/api/pets/1")
            .set("authorization", token)
            .then(res => {
                expect(res.status).toBe(200)
            })
    })
})

describe(" /api/pets/:petId/meals", () => {
    it("pets", () => {
        return request(server).post("/api/pets/1/meals")
            .set("authorization", token)
            .send({
                mealType: "dinner",
                fruitsVeg: "3",
                protein: "4",
                grains: "2",
                sweets: "8",
                mealScore: "1"
            })
            .then(res => {
                expect(res.status).toBe(201)
            })
    })
    it("gets", () => {
        return request(server).get("/api/pets/1/meals/1")
            .set("authorization", token)
            .then(res => {
                expect(res.status).toBe(200)
            })
    })
    it("pet put", () => {
        return request(server).put("/api/pets/1")
            .set("authorization", token)
            .send({
                "petName": "Bob",
                "petScore": "5",
                "petImgSet": "shark"
            })
            .then(res => {
                expect(res.status).toBe(200)
            })
    })
    it("meal put", () => {
        return request(server).put("/api/pets/1/meals/1")
            .set("authorization", token)
            .send({
                mealType: "dinner",
                fruitsVeg: "3",
                protein: "4",
                grains: "3",
                sweets: "8",
                mealScore: "2"
            })
            .then(res => {
                expect(res.status).toBe(200)
            })
    })
})



describe(" can delete to all endpoints", () => {
    it("can delete meal", () => {
        return request(server).delete("/api/pets/1/meals/1")
            .set("authorization", token)
            .then(res => {
                expect(res.status).toBe(200)
            })
    })
    it("can delete pet", () => {
        return request(server).delete("/api/pets/1")
            .set("authorization", token)
            .then(res => {
                expect(res.status).toBe(200)
            })
    })
 
})