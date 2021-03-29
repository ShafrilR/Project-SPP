const express = require("express")
const app = express()
const jwt = require("jsonwebtoken") // npm install jsonwebtoken
const md5 = require("md5")
app.use(express.json())

// model petugas dan siswa
const petugas = require("../models/index").petugas
// const siswa = require("../models/index").siswa
app.use(express.urlencoded({extended: true}))

// auth petugas
app.post("/loginpetugas", async (req, res) => {
    let parameter = {
        username: req.body.username,
        password: md5(req.body.password),
        level: 'petugas'
    }

    let result = await petugas.findOne({where: parameter})
    if(result === null){
        // invalid username or password
        res.json({
            message: "Invalid Username or Password"
        })
    }else{
        // login success
        // generate token using jwt
        // jwt->header, payload, secretKey
        let jwtHeader = {
            algorithm: "HS256",
            expiresIn: "1h"
        }

        let payload = {data: result}
        let secretKey = "LoginPetugas"

        let token = jwt.sign(payload, secretKey, jwtHeader)
        res.json({
            data: result,
            token: token
        })
    }
}) 

// auth petugas
app.post("/loginadmin", async (req, res) => {
    let parameter = {
        username: req.body.username,
        password: md5(req.body.password),
        level: 'admin'
    }

    let result = await petugas.findOne({where: parameter})
    if(result === null){
        // invalid username or password
        res.json({
            message: "Invalid Username or Password",
            logged: false
        })
    }else{
        // login success
        // generate token using jwt
        // jwt->header, payload, secretKey
        let jwtHeader = {
            algorithm: "HS256",
            expiresIn: "1h"
        }

        let payload = {data: result}
        let secretKey = "LoginPetugas"

        let token = jwt.sign(payload, secretKey, jwtHeader)
        res.json({
            data: result,
            token: token,
            logged: true
        })
    }
})

module.exports = app