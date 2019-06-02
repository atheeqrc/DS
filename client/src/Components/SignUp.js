import React, {Component} from 'react';
import ReactDOM from "react-dom";

import  Login from './Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import './common.css'

class SignUp extends Component {

    constructor(props) {
        super(props);
    }

    signup = (event)=> {

        event.preventDefault();
        const firstname = this.refs.firstName.value;
        const lastname = this.refs.lastName.value;
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        const email = this.refs.email.value;
        const address = this.refs.address.value;

        if(firstname ==='' || lastname ==='' ||username ==='' ||password ==='' ||email ==='' ||address ==='' ){
            alert("One or more fields arent filled")
        }else {
            console.log("1")
           fetch ( 'http://localhost:5000/user/' + username, {
               method : 'GET',
               headers: {'Content-Type': 'application/json'}
           } ).then( res => {
               return res.json();
           }).then(data => {
               const user = JSON.stringify(data);
               console.log(user);
               console.log("2")
               if (user != '[]'){
                   console.log("3")
                   alert( "Username is already in use")
               } else {
                   const data = {"firstName" : firstname,
                                "lastName" : lastname,
                                "username" : username,
                                "password" : password,
                                "email" : email,
                                "address": address}
                    console.log(data);
                   fetch("http://localhost:5000/user",{
                       method: 'POST',
                       body:JSON.stringify(data),
                       headers: {'Content-Type': 'application/json'}
                   } ).then(res => {
                       return res.json()
                   }).then(data => {
                       alert("Successfully Registered");
                       ReactDOM.render(<Login/>, document.getElementById("root") )
                   }).catch(err => console.log(err))


               }
           } ).catch(err => console.log(err))
        }

        console.log("4")

    }

    login = (event) => {

        ReactDOM.render(<Login/>, document.getElementById('root'));
    }

    render() {
        return (
            <div className="mt-5 " >
               <b><h2 className="topDiv">Sign Up</h2></b>   <br/>
                <form className="center"   >
                <table cellPadding="10px">


                <tbody>
                        <tr>
                            <td> First Name :  </td>
                            <td> <input  className="form-control"  placeholder= "First Name" type="text" ref="firstName"/></td>

                        </tr>
                        <tr>
                            <td> Last Name :  </td>
                            <td> <input className="form-control"  placeholder= "Last Name" type="text" ref="lastName"/></td>

                        </tr>
                        <tr>
                            <td> Username :  </td>
                            <td> <input className="form-control"  placeholder= "Username" type="text" ref="username"/></td>

                        </tr>
                        <tr>
                            <td> Password :  </td>
                            <td> <input className="form-control"  placeholder= "Password" type="password" ref="password"/></td>

                        </tr>
                        <tr>
                            <td> Email :  </td>
                            <td> <input className="form-control"  placeholder= "Email" type="email" ref="email"/></td>

                        </tr>
                        <tr>
                            <td> Address :  </td>
                            <td> <input className="form-control"  placeholder= "Address" type="text" ref="address"/></td>

                        </tr>

                        <tr>
                            <td> <button type="reset" className="btn btn-light" > Reset</button>  </td>
                            <td> <button onClick={this.signup} type="submit" className="btn btn-light" > Register</button> </td>
                        </tr>
                        <tr>
                            <td></td>

                                <td><button onClick={this.login} className="btn btn-light centerPad" > Direct to Login Page</button></td>

                        </tr>
                </tbody>
                </table>

                </form>

                <br/><br/><br/>
            </div>
        );
    }
}

export default SignUp;