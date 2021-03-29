import React from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { base_url } from "../config.js"
import $ from "jquery"

export default class Petugas extends React.Component{
    constructor(){
        super()
        this.state = {
            petugas: [],
            token: "",
            action: "",
            id_petugas: "",
            nama_petugas: "",
            level: "",
            username: "",
            password: "",
            fillPassword: true
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
        let url = base_url + "/petugas"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({petugas: response.data})
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
    }

    Add = () => {
        $("#modal_petugas").modal("show")
        this.setState({
            action: "insert",
            id_petugas: 0,
            nama_petugas: "",
            level: "",
            username: "",
            password: ""
        })
    }

    Edit = selectedItem => {
        $("#modal_petugas").modal("show")
        this.setState({
            action: "update",
            id_petugas: selectedItem.id_petugas,
            nama_petugas: selectedItem.nama_petugas,
            level: selectedItem.level,
            username: selectedItem.username,
            password: selectedItem.password
        })
    }

    savePetugas = event => {
        event.preventDefault()
        $("#modal_petugas").modal("hide")
        let form = {
            id_petugas: this.state.id_petugas,
            nama_petugas: this.state.nama_petugas,
            level: this.state.level,
            username: this.state.username,
            password: this.state.password
        }

        let url = base_url + "/petugas"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPetugas()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPetugas()
            })
            .catch(error => console.log(error))
        }
    }

    dropPetugas = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/petugas/" + selectedItem.id_petugas
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPetugas()
            })
            .catch(error => console.log(error))
        }
    }


    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-dark mt-2">Daftar Petugas</h3>
                    <div className="row">
                    <table className="table table-bordered table-hover text-center">
                        <thead>
                            <tr>
                                <th>Nama Petugas</th>
                                <th>Username</th>
                                <th>Level</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        { this.state.petugas.map( item => (
                            <tbody>
                                <tr>
                                    <td>{item.nama_petugas}</td>
                                    <td>{item.username}</td>
                                    <td>{item.level}</td>
                                    <td>
                                        <div class="btn-group btn-group-toggle">
                                            <label class="btn btn-primary" onClick={() => this.Edit(item)} >
                                                Edit
                                            </label>
                                            <label class="btn btn-danger" onClick={() => this.dropPetugas(item)}>
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
                        Tambah Petugas
                   </button>
                   <br></br>
                </div>

                {/* modal petugas  */}
                <div className="modal fade" id="modal_petugas">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header">
                                 <h4>Form Petugas</h4>
                             </div>
                             <div className="modal-body">
                                 <form onSubmit={ev => this.savePetugas(ev)}>
                                     Nama Petugas
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.nama_petugas}
                                     onChange={ev => this.setState({nama_petugas: ev.target.value})}
                                     required
                                     />
                                     Level
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.level}
                                     onChange={ev => this.setState({level: ev.target.value})}
                                     required placeholder="admin or petugas"
                                     />
                                     Username
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.username}
                                     onChange={ev => this.setState({username: ev.target.value})}
                                     required
                                     />
                                     Password
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.password}
                                     onChange={ev => this.setState({password: ev.target.value})}
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