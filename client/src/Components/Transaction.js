import React, {Component} from 'react';
import ReactDOM from "react-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './common.css'

import Login from "./Login";
import TrainList from './trainList';



class Transaction extends Component {

    constructor (props) {
        super(props);
        this.state = {
            username : this.props.username,
            email : this.props.email,
            transaction : []
        }
    }

    logout = (e) =>{
        e.preventDefault()
        ReactDOM.render(<Login/>, document.getElementById('root'));

    }

    train = (event) => {
        event.preventDefault()
        ReactDOM.render(<TrainList  username={ this.state.username} email = {this.state.email}  />, document.getElementById('root'));
    }

    async componentDidMount() {
        const url = "http://localhost:5000/mobilePay/" + this.state.username
        const response = await fetch(url)
        const data = await response.json();
        this.setState({transaction: data})
        console.log(this.state.transaction)

    }


    render() {
        return (
            <div>


                <div className="header">
                    <h1>Welcome  {this.state.username} </h1>
                    <h3>Following are the transactions you have made using this portal </h3>

                </div>


                <table className="table table-bordered tableAlign">
                    <thead>
                    <tr className="boldHead">
                        <td>Transaction Id</td>
                        <td>Tickets</td>
                        <td>Discount</td>
                        <td>Total</td>
                        <td>Transaction Date</td>

                    </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.transaction.map( (transaction) =>{
                            return [
                                <tr>
                                    <td >{transaction.transId}</td>
                                    <td>{transaction.tickets}</td>
                                    <td>{transaction.discount}</td>
                                    <td>{transaction.total}</td>
                                    <td>{transaction.Date}</td>


                                </tr>
                            ]
                        })
                    }

                    </tbody>

                </table>

                <table className="center" cellPadding="5px" cellSpacing="10px">
                    <tr>
                       <td colSpan="4" ><button onClick={this.train} className="btn btn-light"> Redirect to Train List </button> </td>
                        <td colSpan="5" ><button onClick={this.logout} className="btn btn-light"> Logout </button></td>
                    </tr>
                </table>


            </div>
        );
    }
}

export default Transaction;