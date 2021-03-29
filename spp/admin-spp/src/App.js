import React from 'react'
import { Switch, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Kelas from "./pages/Kelas"
import Petugas from "./pages/Petugas"
import Siswa from "./pages/Siswa"
import Pembayaran from "./pages/Pembayaran"
export default class App extends React.Component{
  render(){
    return(
      <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/kelas" component={Kelas}/>
          <Route path="/petugas" component={Petugas}/>
          <Route path="/siswa" component={Siswa}/>
          <Route path="/pembayaran" component={Pembayaran}/>
      </Switch>
    )
  }
}