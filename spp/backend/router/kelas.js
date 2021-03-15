// memanggil library
const { urlencoded } = require('express')
const express = require('express')
const app = express()
const md5 = require('md5')

// memanggil model
const kelas = require('../models/index').kelas

// use app
app.use(express.urlencoded({ extended:true }))

// GET
app.get('/', async (req,res) =>{
    kelas.findAll({
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
        nama_kelas: req.body.nama_kelas,
        kompetensi_keahlian: req.body.kompetensi_keahlian
    }
    kelas.create(data)
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
    let param = { id_kelas: req.body.id_kelas }
    let data = {
        nama_kelas: req.body.nama_kelas,
        kompetensi_keahlian: req.body.kompetensi_keahlian
    }
    kelas.update(data,{where:param})
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
app.delete('/:id_kelas', async (req, res) => {
    let param = { id_kelas: req.params.id_kelas }
    kelas.destroy({where:param})
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



