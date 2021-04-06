import React from "react"
import axios from "axios"
import { base_url } from "../config";

export default class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            nis: "",
            nama: "",
            message: "",
            logged: true
        }

    }

    Login = event => {
        event.preventDefault()
        let sendData = {
            nis: this.state.nis,
            nama: this.state.nama
        }

        let url = base_url + "/auth/loginsiswa"
        

        axios.post(url, sendData)
        .then(response => {
            this.setState({logged: response.data.logged})
            if (this.state.logged) {
                let siswa = response.data.data
                let token = response.data.token
                localStorage.setItem("siswa", JSON.stringify(siswa))
                localStorage.setItem("token", token)
                this.props.history.push("/")
            } else {
                this.setState({message: response.data.message})
            }
        })
        .catch(error => console.log(error))
    }

    render(){
        return(
            <div className="container d-flex h-100 justify-content-center align-items-center">
                <div className="col-sm-6 card my-5">
                    <div className="card-header bg-danger text-white text-center">
                        <h4>Telkom Schools Malang</h4>
                        <strong className="text-dark">Login siswa</strong>
                    </div>
                    <div className="card-body">
                        { !this.state.logged ? 
                        (
                            <div className="alert alert-danger mt-1">
                                { this.state.message }
                            </div>
                        ) : null }
                        <form onSubmit={ev => this.Login(ev)}>
                            <input type="text" className="form-control mb-1" value={this.state.nis}
                            onChange={ev => this.setState({nis: ev.target.value})} placeholder="NIS"/>
                            <input type="text" className="form-control mb-1" value={this.state.nama}
                            onChange={ev => this.setState({nama: ev.target.value})}
                            autoComplete="false" placeholder="Nama" />

                            <button className="btn btn-block btn-dark mb-1" type="submit">
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}