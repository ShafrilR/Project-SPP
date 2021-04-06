import React from "react"
import Navbar from "../components/Navbar"
import BayarList from "../components/BayarList"
import axios from "axios"
import { base_url } from "../config.js"
import $ from "jquery"

export default class Pembayaran extends React.Component{
    constructor(){
        super()
        let date = new Date()
        this.state = {
            spp: [],
            pembayaran: [],
            siswa: [],
            petugas: [],
            token: "",
            action: "",
            nama: "",
            nam_petugas: "",
            id_pembayaran: "",
            id_petugas: "",
            nisn: "",
            tgl_bayar: date,
            bulan_dibayar: "",
            jumlah_bayar: "",
            id_spp: "",
            tahun: "",
            nominal: ""
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

    getBayar = () => {
        let url = base_url + "/pembayaran"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({pembayaran: response.data})
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
    

    // getSiswa = () => {
    //     let url = base_url + "/siswa"
    //     axios.get(url, this.headerConfig())
    //     .then(response=> {
    //         this.setState({siswa: response.data})
    //     })
    //     .catch(error => {
    //         if (error.response) {
    //             if(error.response.status) {
    //                 window.alert(error.response.data.message)
    //                 this.props.history.push("/login")
    //             }
    //         }else{
    //             console.log(error);
    //         }
    //     })
    // }

    // getPetugas = () => {
    //     let url = base_url + "/petugas"
    //     axios.get(url, this.headerConfig())
    //     .then(response=> {
    //         this.setState({petugas: response.data})
    //     })
    //     .catch(error => {
    //         if (error.response) {
    //             if(error.response.status) {
    //                 window.alert(error.response.data.message)
    //                 this.props.history.push("/login")
    //             }
    //         }else{
    //             console.log(error);
    //         }
    //     })
    // }

    getSpp = () => {
        let url = base_url + "/spp"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({spp: response.data})
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
        this.getSpp()
        this.getBayar()
        // this.getSiswa()
        // this.getPetugas()
    }

    AddP = () => {
        $("#modal_bayar").modal("show")
        this.setState({
            action: "insert",
            id_pembayaran: 0,
            id_petugas: "",
            nisn: "",
            tgl_bayar: "",
            bulan_dibayar: "",
            tahun_dibayar: "",
            id_spp: "",
            jumlah_bayar: ""
        })
    }

    Add = () => {
        $("#modal_spp").modal("show")
        this.setState({
            action: "insert",
            id_spp: 0,
            tahun: "",
            nominal: ""
        })
    }

    Edit = selectedItem => {
        $("#modal_spp").modal("show")
        this.setState({
            action: "update",
            id_spp: selectedItem.id_spp,
            tahun: selectedItem.tahun,
            nominal: selectedItem.nominal
        })
    }

    saveBayar = event => {
        event.preventDefault()
        let form = {
            id_pembayaran: this.state.id_pembayaran,
            id_petugas: this.state.id_petugas,
            nisn: this.state.nisn,
            tgl_bayar: this.state.tgl_bayar,
            bulan_dibayar: this.state.bulan_dibayar,
            tahun_dibayar: this.state.tahun_dibayar,
            id_spp: this.state.id_spp,
            jumlah_bayar: this.state.jumlah_bayar
        }
      

        let url = base_url + "/pembayaran"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getBayar()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getBayar()
            })
            .catch(error => console.log(error))
        }
        $("#modal_bayar").modal("hide")
    }

    saveSpp = event => {
        event.preventDefault()
        let form = {
            id_spp: this.state.id_spp,
            tahun: this.state.tahun,
            nominal: this.state.nominal
        }
      

        let url = base_url + "/spp"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSpp()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSpp()
            })
            .catch(error => console.log(error))
        }
        $("#modal_spp").modal("hide")
    }

    dropSpp = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/spp/" + selectedItem.id_spp
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSpp()
            })
            .catch(error => console.log(error))
        }
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-dark mt-2">Daftar SPP</h3>
                    <div className="row">
                    <table className="table table-bordered table-hover text-center">
                        <thead>
                            <tr>
                                <th>ID SPP</th>
                                <th>Tahun</th>
                                <th>Nominal</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        { this.state.spp.map( item => (
                            <tbody>
                                <tr>
                                    <td>{item.id_spp}</td>
                                    <td>{item.tahun}</td>
                                    <td>{item.nominal}</td>
                                    <td>
                                        <div class="btn-group btn-group-toggle">
                                            <label class="btn btn-primary" onClick={() => this.Edit(item)} >
                                                Edit
                                            </label>
                                            <label class="btn btn-danger" onClick={() => this.dropSpp(item)}>
                                                Delete
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        )) }
                    </table>
                    </div>
                    <button className="btn btn-dark" onClick={() => this.Add()}>
                        Tambah SPP
                   </button>
                   <br></br>
                   <br></br>
                   <br></br>
                   <br></br>

                   <h3 className="text-bold text-dark mt-2">Data Pembayaran SPP</h3>
                   { this.state.pembayaran.map(item => (
                        <BayarList
                        key =  {item.id_pembayaran}
                        id_pembayaran = {item.id_pembayaran}
                        id_petugas = {item.id_petugas}
                        nisn= {item.nisn}
                        tgl_bayar = {item.tgl_bayar}
                        bulan_dibayar = {item.bulan_dibayar}
                        tahun_dibayar = {item.tahun_dibayar}
                        id_spp = {item.id_spp}
                        jumlah_bayar = {item.jumlah_bayar}
                         />
                    )) }
                    <br></br>
                    <button className="btn btn-dark" onClick={() => this.AddP()}>
                        Bayar SPP
                   </button>
                   <br></br>
                   <br></br>
                </div>

                {/* modal bayar */}
                <div className="modal fade" id="modal_bayar">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header">
                                 <h4>Form Pembayaran SPP</h4>
                             </div>
                             <div className="modal-body">
                                 <form onSubmit={ev => this.saveBayar(ev)}>
                                     ID Petugas
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.id_petugas}
                                     onChange={ev => this.setState({id_petugas: ev.target.value})}
                                     required
                                     />
                                     NISN
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.nisn}
                                     onChange={ev => this.setState({nisn: ev.target.value})}
                                     required
                                     />
                                     Bulan 
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.bulan_dibayar}
                                     onChange={ev => this.setState({bulan_dibayar: ev.target.value})}
                                     required
                                     />
                                     Tahun
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.tahun_dibayar}
                                     onChange={ev => this.setState({tahun_dibayar: ev.target.value})}
                                     required
                                     />
                                     ID SPP
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.id_spp}
                                     onChange={ev => this.setState({id_spp: ev.target.value})}
                                     required placeholder= "2 - 5"
                                     />
                                     Jumlah Bayar
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.jumlah_bayar}
                                     onChange={ev => this.setState({jumlah_bayar: ev.target.value})}
                                     required
                                     />
                                    <button type="submit" className="btn btn-block btn-dark">
                                        Simpan
                                    </button>
                                 </form>
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* modalspp */}
                <div className="modal fade" id="modal_spp">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header">
                                 <h4>Form SPP</h4>
                             </div>
                             <div className="modal-body">
                                 <form onSubmit={ev => this.saveSpp(ev)}>
                                     Tahun
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.tahun}
                                     onChange={ev => this.setState({tahun: ev.target.value})}
                                     required
                                     />
                                     Nominal
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.nominal}
                                     onChange={ev => this.setState({nominal: ev.target.value})}
                                     required
                                     />
                                    <button type="submit" className="btn btn-block btn-dark">
                                        Simpan
                                    </button>
                                 </form>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
        )
    }
}