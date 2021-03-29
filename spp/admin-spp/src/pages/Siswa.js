import React from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { base_url } from "../config.js"
import $ from "jquery"

export default class Siswa extends React.Component{
    constructor(){
        super()
        this.state = {
            siswa: [],
            token: "",
            action: "",
            nisn: "",
            nis: "",
            nama: "",
            id_kelas: "",
            alamat: "",
            no_telp: "",
            id_spp: ""
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

    getSiswa = () => {
        let url = base_url + "/siswa"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({siswa: response.data})
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
        this.getSiswa()
    }

    Add = () => {
        $("#modal_siswa").modal("show")
        this.setState({
            action: "insert",
            nisn: 0,
            nis: "",
            nama: "",
            id_kelas: "",
            alamat: "",
            no_telp: "",
            id_spp: ""
        })
    }

    Edit = selectedItem => {
        $("#modal_siswa").modal("show")
        this.setState({
            action: "update",
            nisn: selectedItem.nisn,
            nis: selectedItem.nis,
            nama: selectedItem.nama,
            id_kelas: selectedItem.id_kelas,
            alamat: selectedItem.alamat,
            no_telp: selectedItem.no_telp,
            id_spp: selectedItem.id_spp
        })
    }

    saveSiswa = event => {
        event.preventDefault()
        $("#modal_siswa").modal("hide")
        let form = {
            nis: this.state.nis,
            nama: this.state.nama,
            id_kelas: this.state.id_kelas,
            alamat: this.state.alamat,
            no_telp: this.state.no_telp,
            id_spp: this.state.id_spp
        }

        let url = base_url + "/siswa"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSiswa()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSiswa()
            })
            .catch(error => console.log(error))
        }
    }

    dropSiswa = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/siswa/" + selectedItem.nisn
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSiswa()
            })
            .catch(error => console.log(error))
        }
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-dark mt-2">Daftar Siswa</h3>
                    <div className="row">
                    <table className="table table-bordered table-hover text-center">
                        <thead>
                            <tr>
                                <th>NISN</th>
                                <th>NIS</th>
                                <th>Nama</th>
                                <th>ID Kelas</th>
                                <th>Alamat</th>
                                <th>No Telp</th>
                                <th>ID SPP</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        { this.state.siswa.map( item => (
                            <tbody>
                                <tr>
                                    <td>{item.nisn}</td>
                                    <td>{item.nis}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.id_kelas}</td>
                                    <td>{item.alamat}</td>
                                    <td>{item.no_telp}</td>
                                    <td>{item.id_spp}</td>
                                    <td>
                                        <div class="btn-group btn-group-toggle">
                                            <label class="btn btn-primary" onClick={() => this.Edit(item)} >
                                                Edit
                                            </label>
                                            <label class="btn btn-danger" onClick={() => this.dropSiswa(item)}>
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
                        Tambah Siswa
                   </button>
                   <br></br>
                   <br></br>
                </div>

                {/* modal siswa */}
                <div className="modal fade" id="modal_siswa">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header">
                                 <h4>Form Siswa</h4>
                             </div>
                             <div className="modal-body">
                                 <form onSubmit={ev => this.saveSiswa(ev)}>
                                     NIS
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.nis}
                                     onChange={ev => this.setState({nis: ev.target.value})}
                                     required
                                     />
                                     Nama
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.nama}
                                     onChange={ev => this.setState({nama: ev.target.value})}
                                     required
                                     />
                                     ID Kelas
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.id_kelas}
                                     onChange={ev => this.setState({id_kelas: ev.target.value})}
                                     required placeholder="1 - 9"
                                     />
                                     Alamat
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.alamat}
                                     onChange={ev => this.setState({alamat: ev.target.value})}
                                     required
                                     />
                                     No Telp
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.no_telp}
                                     onChange={ev => this.setState({no_telp: ev.target.value})}
                                     required
                                     />
                                     ID SPP
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.id_spp}
                                     onChange={ev => this.setState({id_spp: ev.target.value})}
                                     required placeholder="2-5"
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