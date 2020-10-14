import React, { Component, useState  } from 'react';
import { useHistory } from "react-router-dom";
import Logo from '../../Logo/logo.png';
import { loginUser, facbookLogin } from '../../config/Firebase/index';

const Login = () =>{
    const history = useHistory();
    const[email , setEmail] = useState();
    const[password , setPassword] = useState();
    const[massage, setMassage] = useState();
    const onLogin = async () =>{
        try{
            await loginUser(email, password)
            history.push('/home')
        }catch(e){
            setMassage(e.message)     
        }
 }
    return(
        <React.Fragment>
            <div className="nav-bar">
                <div className="menu-left">
                    <img src={Logo} />
                </div>
                <div className="menu-right">
                    <ul>
                        <li
                           onClick={() => history.push('/signup')}
                        >
                           Sign Up
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="main-login">

                <p>{massage}</p>
                <br />
                <input 
                    type="email" 
                    placeholder="Email"
                    onChange={event => setEmail(event.target.value)}
                />
                <br />
                <br />
                <input 
                    type="password" 
                    placeholder="Password"
                    onChange={event => setPassword(event.target.value)}
                />
                <br />
                <br />
                <button 
                    onClick={onLogin}
                >
                    Login Account
                </button>
                <br />
                <br />
                <button 
                    onClick={facbookLogin}
                    className="fblogin-btn"
                >
                    Login Account With Facebook
                </button>
            </div>
        </React.Fragment>
    )
}
export default Login;