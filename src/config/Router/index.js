import React from "react";
import {
  BrowserRouter as Router, //alias (nickname)
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from '../../components/Login/index';
import Home from '../../components/Home/index';
import Signup from '../../components/Signup/index';
import Company from '../../components/Company/index';
import CompanyDetails from '../../components/CompanyDetails/index';
import CompanyList from '../../components/CompanyList/index';

const MainRouter = ({isLoggedIn, isLoading}) =>{
    if (isLoading) return <img width="150" src='https://cdn.lowgif.com/small/ee5eaba393614b5e-pehliseedhi-suitable-candidate-suitable-job.gif' />
    console.log('window.location.pathname***', window.location.pathname)
    const currentPath = window.location.pathname.length === 1 ? '/home' : window.location.pathname
    return (
    <Router>
        <div>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Redirect to={currentPath} /> : <Login />}
                </Route>
                <Route path="/home">
                    {AuthChecker(isLoggedIn, <Home />)}
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route path="/company">
                    {AuthChecker(isLoggedIn, <Company />)}
                </Route>
                <Route path="/companylist">
                    {AuthChecker(isLoggedIn, <CompanyList />)}
                </Route>
                <Route path="/companydetails/:transactionsId">
                    {AuthChecker(isLoggedIn, <CompanyDetails />)}
                </Route>
            </Switch>
        </div>
    </Router>
    );
  }
export default MainRouter;

const AuthChecker = (isLoggedIn, component) =>{
    return isLoggedIn ? component : <Redirect to='/' />
}