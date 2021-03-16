// memanggil library
const { urlencoded } = require('express')
const express = require('express')
const app = express()
const md5 = require('md5')

// memanggil model
const spp = require('../models/index').spp

// memanggil verifyPetugas agar bisa digunakan
const verifyPetugas = require('./verifyPetugas')

// use app
app.use(express.urlencoded({ extended:true }))

// GET
app.get('/', verifyPetugas, async (req,res) =>{
    spp.findAll({
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
app.post('/', verifyPetugas, async (req, res) => {
    let data = {
        tahun: req.body.tahun,
        nominal: req.body.nominal
    }
    spp.create(data)
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
app.put('/', verifyPetugas, async (req, res) => {
    let param = { id_spp: req.body.id_spp }
    let data = {
        tahun: req.body.tahun,
        nominal: req.body.nominal
    }
    spp.update(data,{where:param})
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
app.delete('/:id_spp', verifyPetugas, async (req, res) => {
    let param = { id_spp: req.params.id_spp }
    spp.destroy({where:param})
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



