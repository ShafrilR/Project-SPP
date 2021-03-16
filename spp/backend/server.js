const express = require('express')
const app = express()

app.listen(8000,()=>{
    console.log("Gasss!");
})

//memanggil router
let spp = require("./router/spp")
let kelas = require("./router/kelas")
let petugas = require("./router/petugas")
let siswa = require("./router/siswa")
let pembayaran = require("./router/pembayaran")
let auth = require('./router/auth')

// use
app.use("/spp",spp)
app.use("/kelas",kelas)
app.use("/petugas",petugas)
app.use("/siswa",siswa)
app.use("/pembayaran",pembayaran)
app.use('/auth', auth)