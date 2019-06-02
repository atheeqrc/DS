import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import SignUp from './Components/SignUp'


import  Login from './Components/Login'

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<SignUp/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
