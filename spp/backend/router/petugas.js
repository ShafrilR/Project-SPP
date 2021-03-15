// memanggil library
const { urlencoded } = require('express')
const express = require('express')
const app = express()
const md5 = require('md5')

// memanggil model
const petugas = require('../models/index').petugas

// use app
app.use(express.urlencoded({ extended:true }))

// GET
app.get('/', async (req,res) =>{
    petugas.findAll({
        include: [{all:true, nested: true}]
    })
    .then(result=>{
        res.json(result)
    })
    .catch(error =>{
        res.json({
            message: error.message
        })
    })
})

// POST
app.post('/', async (req, res) => {
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        nama_petugas: req.body.nama_petugas,
        level: req.body.level
    }
    petugas.create(data)
    .then(result => {
        res.json({
            message: 'Data inserted',
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// PUT
app.put('/', async (req, res) => {
    let param = { id_petugas: req.body.id_petugas }
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        nama_petugas: req.body.nama_petugas,
        level: req.body.level
    }
    petugas.update(data,{where:param})
    .then(result => {
        res.json({
            message: 'Data Updated',
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// DELETE
app.delete('/:id_petugas', async (req, res) => {
    let param = { id_petugas: req.params.id_petugas }
    petugas.destroy({where:param})
    .then(result => {
        res.json({
            message: 'Data Destroyed',
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

module.exports = app



