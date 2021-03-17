import React from "react"
import { render } from "react-dom"
import Navbar from "../components/Navbar"

export default class Home extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(

            <div>
                <Navbar />
                <h1>Kelas</h1>
            </div>
        )
    }
}