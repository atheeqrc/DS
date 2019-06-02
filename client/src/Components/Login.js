import React, {Component} from 'react';
import ReactDOM from "react-dom";

import SignUp from "./SignUp";
import TrainList from "./trainList";

import 'bootstrap/dist/css/bootstrap.min.css';
import './common.css'



class Login extends Component {
    constructor(props) {
        super(props);
    }

    login = (event)=> {
        event.preventDefault(event)

        const username = this.refs.username.value;
        const password = this.refs.password.value;

        if (username ==='' ||password ===''){
            alert("one or more fields are empty")
        }else {
            fetch("http://localhost:5000/user/" + username + "/"+password, {
                method : "GET",
                headers: {'Content-Type': 'application/json'}
            }).then(req => {
                return  req.json();
            }).then(data => {
                let user = JSON.stringify(data);
                if(user =='[]'){
                    alert( "Incorrect username or password")
                } else {
                    let username_session
                    let email_session
                    for (let user of data ){
                      username_session = user.username.toString()
                        email_session = user.email.toString();
                    }
                    console.log(username_session)
                    ReactDOM.render(<TrainList username = {username_session} email = {email_session} />,document.getElementById("root"));
                }
            }).catch(err => console.log(err))
        }

    }

    signup = ()=> {
        ReactDOM.render(<SignUp/>, document.getElementById('root'));
    }

    render() {
        return (
            <div className="mt-5 backdiv" >
                <b><h2  className="topDiv" >Login</h2></b>   <br/>
                <form className="center"   >
                    <table cellPadding="10px">


                        <tbody>

                        <tr>
                            <td> Username :  </td>
                            <td> <input className="form-control"  placeholder= "Username" type="text" ref="username"/></td>

                        </tr>
                        <tr>
                            <td> Password :  </td>
                            <td> <input className="form-control"  placeholder= "Password" type="password" ref="password"/></td>

                        </tr>

                        <tr>
                            <td> <button type="reset" className="btn btn-light" > Reset</button>  </td>
                            <td> <button onClick={this.login} type="Login" className="btn btn-light" > Login</button> </td>
                        </tr>
                        <tr>
                            <td></td>



                        </tr>
                        </tbody>
                    </table>
                </form>
                <button onClick={this.signup} style={{marginLeft : 560, }} className="btn btn-light centerPad"> Direct to SignUp Page</button>
                <br/><br/><br/>
            </div>
        );
    }
}

export default Login;