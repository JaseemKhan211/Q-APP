import React from 'react';
import Logo from '../../Logo/logo.png';
import { useHistory } from "react-router-dom";

const Home = () =>{
    
    const history = useHistory();
    const onCompanyForm = () =>{
        history.push('/company')
    }
    const onCompanyList = () =>{
        history.push('/companylist')
    } 

    return(
        <React.Fragment>
            <div className="nav-bar">
                <div className="menu-left">
                    <img src={Logo} />
                </div>
                <div className="menu-right">
                    <ul>
                        <li>
                            
                        </li>
                    </ul>
                </div>
            </div>
            <br />
            <br />
            <div className="main-heading">
                <h1>Home</h1>
            </div>
            <div 
                className="main-div" 
            >
                <br />
            <button 
                className="btn-1"
                onClick={onCompanyForm}
            >
                Are you a company ? 
            </button>
            <button 
                className="btn-2"
                onClick={onCompanyList}
            >
                Normal User 
            </button>
            </div>
    </React.Fragment>
    )
}
export default Home;