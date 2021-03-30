import React from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { base_url } from "../config.js"


export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            petugasName: null,
            dataKelas: 0,
            dataSiswa: 0,
            dataPetugas: 0,
            dataSPP: 0,
            dataTransaksi: 0
            
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getPetugas = () => {
        let petugas = JSON.parse(localStorage.getItem('petugas'))
        this.setState({petugasName: petugas.nama_petugas})
    }

    getKelas = () => {
        let url = base_url + "/kelas"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({dataKelas: response.data.length})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }

    getSpp = () => {
        let url = base_url + "/spp"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({dataSPP: response.data.length})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }

    getSiswa = () => {
        let url = base_url + "/siswa"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({dataSiswa: response.data.length})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }

    getTransaksi = () => {
        let url = base_url + "/pembayaran"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({dataTransaksi: response.data.length})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }

    getPetugasS = () => {
        let url = base_url + "/petugas"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({dataPetugas: response.data.length})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }

    componentDidMount(){
        this.getPetugas()
        this.getKelas()
        this.getSiswa()
        this.getSpp()
        this.getTransaksi()
        this.getPetugasS()
    }

    render(){
        return(
            <div>
                <div>
                <Navbar />
                <div className="container mt-2">
                    <h3 className="my-2">
                        <strong>Welcome back, {this.state.petugasName}</strong>
                    </h3>
                    <div className="row">
                        {/* petugas count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-secondary">
                                    <h4 className="text-white">
                                        <strong>Data Petugas</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.dataPetugas}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* kelas count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-dark">
                                    <h4 className="text-white">
                                        <strong>Data Kelas</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.dataKelas}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* siswa count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-secondary">
                                    <h4 className="text-white">
                                        <strong>Data Siswa</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.dataSiswa}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* spp count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-dark">
                                    <h4 className="text-white">
                                        <strong>Data SPP</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.dataSPP}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* transaksi count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-secondary">
                                    <h4 className="text-white">
                                        <strong>Data Transaksi</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.dataTransaksi}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        )
    }
}