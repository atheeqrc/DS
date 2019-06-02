import React, {Component} from 'react';
import ReactDOM from "react-dom";

import Transaction from "./Transaction"

import 'bootstrap/dist/css/bootstrap.min.css';
import './common.css';

class MobilePay extends Component {

    constructor(props){
        super(props);
        this.state = {
            total : this.props.total,
            email: this.props.email,
            username :this.props.username,
            discount :this.props.discount,
            tickets:this.props.tickets
        }
    }

    payment= (e)=> {
        e.preventDefault()

        const username  = this.state.username;
        const phoneNumber = this.refs.phone.value;
        const pin = this.refs.pin.value;
        const total = this.state.total;
        const email = this.state.email;


        if (phoneNumber === "" || pin ===""){
            alert ("One or more fields are empty")
        } else {
            const data = {
                "username" : username,
                "phoneNumber": phoneNumber,
                "pin": pin,
                "total": total,
                "email": email
            }
            console.log(data)

            fetch("http://localhost:5000/mobilePay", {
                method : "POST",
                body:JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            }).then(res =>{
                return res.json()
            }). then( data  => {
                alert ("Mobile Payement Made Successfully \n Check your email for payment confirmation \nPress okay to check transaction History ")

                const transData = {
                    "username": this.state.username,
                    "tickets" : this.state.tickets,
                    "discount": this.state.discount,
                    "total" : this.state.total
                }

                console.log(transData)

                fetch('http://localhost:5000/user/transaction' , {
                    method : "POST",
                    body:JSON.stringify(transData),
                    headers: {'Content-Type': 'application/json'}
                }).then( res => {
                    return res.json()
                }).then( data => {
                    console.log( data + " Transaction added")
                }).catch (err => {
                        console.log( err)
                } )


                ReactDOM.render(<Transaction username = {this.state.username} email ={this.state.email}/>,document.getElementById("root") );
            }).catch(err => console.log(err))
        }

    }


    render() {
        return (
            <div>
                <div className="header">
                    <h1>Welcome  {this.state.username} for MobilePay </h1>
                    <h3>Fill the fields listed below</h3>

                </div>
            <form className="center">
                <table cellPadding="8px">
                    <tbody>
                    <tr>
                        <td style={{textAlign : "left"}}> <label > Username : </label></td>
                        <td><input className="form-control" disabled={true} value={this.state.username} /></td>
                    </tr>
                    <tr>
                        <td style={{textAlign : "left"}}><label>Phone Number :</label></td>
                        <td><input  className="form-control"  placeholder= "Phone Number" type="number" ref="phone"/></td>
                    </tr>
                    <tr>
                        <td style={{textAlign : "left"}}><label>Pin :</label></td>
                        <td><input  className="form-control"  placeholder= "pin" type="number" ref="pin"/></td>
                    </tr>
                    <tr>
                        <td style={{textAlign : "left"}}><label>Total :</label></td>
                        <td><input className="form-control" disabled={true} value={this.state.total} /></td>
                    </tr>
                    <tr>
                        <td style={{textAlign : "left"}}><label>Email :</label></td>
                        <td ><input className="form-control" disabled={true} value={this.state.email} /></td>
                    </tr>
                    <tr>
                        <td> <button type="reset" className="btn btn-light" > Reset</button>  </td>
                        <td> <button onClick={this.payment} type="submit" className="btn btn-light" > Make Payment</button> </td>
                    </tr>
                    </tbody>
                </table>
            </form>

            </div>
        );
    }
}

export default MobilePay;