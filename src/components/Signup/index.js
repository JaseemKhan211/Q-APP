import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Logo from '../../Logo/logo.png';
import { registerUser } from '../../config/Firebase/index';


const Signup = () =>{
    const history = useHistory();
    
    const[email , setEmail] = useState();
    const[password , setPassword] = useState();
    const[massage, setMassage] = useState();

    const onRegister = async () =>{
           try{
                await registerUser(email, password)
                history.push('/')
        }catch(error){
            setMassage(error.message)     
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
                           onClick={() => history.push('/')}
                        >
                           Login
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
                    onClick={onRegister}
                >
                    Sign Up Account
                </button>
               
            </div>
        
        </React.Fragment>
    )
}
export default Signup;