import React, {Component} from 'react';
import ReactDOM from "react-dom";

import MobilePay from "./MobilePay";
import CreditCard from "./CreditCard"
import Login from "./Login";
import Transaction from "./Transaction"

import 'bootstrap/dist/css/bootstrap.min.css';
import './common.css'


class TrainList extends Component {

    constructor(props){
        super(props);
        this.state= {
            username:this.props.username,
            email:this.props.email,
            train :[],
            total : "",
            tickets: '',
            discount: ''
            }
    }

    CalculateTotal = (event) =>{
        event.preventDefault(event)


        const trainId = this.refs.trainId.value;
        const tickets = this.refs.tickets.value;
        const nic =this.refs.nic.value;

        if( trainId ==='' ||tickets==='' || nic ===''){
            alert("One or more feilds are not filled")
        }else {
            fetch('http://localhost:5000/train/' + trainId + "/" + tickets +"/" + nic , {
                method : "GET",
                headers: {'Content-Type': 'application/json'}
            }).then( req => {
                return req.json()
            }).then(data => {
                console.log(data.total)
                this.setState({total : data.total, tickets : data.tickets, discount : data.discount})
                alert(`${data.status} \n The discount is ${data.discount} \n Payable amount is ${data.total}
                \n NOTE : The final total is fetched in the total box, Select the payment method`)
                console.log(this.state.total)
            })

        this.updateTable();




        }
    }

    updateTable = ()=>{
        fetch('http://localhost:5000/train').then(req => {
            return req.json()
        }).then( data =>{
            this.setState({train: data})
        } )
    }


   async componentDidMount() {
        const url = "http://localhost:5000/train"
        const response = await fetch(url)
       const data = await response.json();
            this.setState({train: data, total : 0.00})
       console.log(this.state.train)

    }

    MobilePay = (event) =>{
        event.preventDefault()
        ReactDOM.render(<MobilePay  total={this.state.total} email={ this.state.email} username = {this.state.username} tickets = {this.state.tickets} discount=  {this.state.discount}/>, document.getElementById("root"))
    }
    CreditCard = (event) => {
        event.preventDefault()
        ReactDOM.render(<CreditCard  total={this.state.total} email={ this.state.email} username ={this.state.username} tickets = {this.state.tickets} discount=  {this.state.discount} />, document.getElementById("root"))

    }
    logout = (e) =>{
        e.preventDefault()
        ReactDOM.render(<Login/>, document.getElementById('root'));

    }

    toHistory = (e) =>{
        e.preventDefault()
        ReactDOM.render(<Transaction username ={this.state.username} email = {this.state.email}  />, document.getElementById('root'));

    }


    render() {
        return (
            <div>
                <div className="header">
                    <h1>Welcome  {this.state.username} </h1>
                    <h3>Select the trainId and the Number of Tickets Required</h3>
                    <h3>Enter Your NIC number to get the government officer discount</h3>
                    <p> <button onClick={this.toHistory} className="btn btn-light">Transaction History</button> {"     "}
                        <button onClick={this.logout} className="btn btn-light"> Logout </button>
                    </p>
                </div>

                <table className="table table-bordered tableAlign">
                    <thead>
                    <tr className="boldHead">
                        <td>TrainId</td>
                        <td>Source</td>
                        <td>Destination</td>
                        <td>Departure Time</td>
                        <td>Date</td>
                        <td>Available Seats</td>
                        <td>Price</td>

                    </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.train.map( (train) =>{
                            return [
                                <tr>
                                    <td className="">{train.trainId}</td>
                                    <td>{train.source}</td>
                                    <td>{train.destination}</td>
                                    <td>{train.time}</td>
                                    <td>{train.date}</td>
                                    <td>{train.capacity}</td>
                                    <td>{train.price}</td>

                                </tr>
                            ]
                        })
                    }

                    </tbody>

                </table>
                <form>
                    <table className="center" cellPadding="5px">
                        <tr>
                            <td><label>TrainID :</label> </td>
                            <td><input className="form-control" ref="trainId"/></td>
                            <td><label>Tickets : </label> </td>
                            <td><input className="form-control" ref="tickets"/></td>
                            <td><label>NIC :</label>  </td>
                            <td><input className="form-control" ref ="nic"/></td>

                        </tr>

                        <tr>
                            <td><button onClick={this.CalculateTotal} className="btn btn-light"> Calculate </button></td>
                        </tr>

                    </table>
                   <table className="center" cellPadding="5px" cellSpacing="10px">
                       <tr>
                           <td colSpan="2" >Total :</td>
                           <td colSpan="3" ><input className="form-control" disabled={true} value={this.state.total} /></td>
                           <td colSpan="4" ><button onClick={this.MobilePay} className="btn btn-light"> Mobile Pay </button> </td>
                           <td colSpan="5" ><button onClick={this.CreditCard} className="btn btn-light"> Credit Card </button></td>
                       </tr>
                   </table>

                </form>
            </div>
        );
    }
}

export default TrainList;