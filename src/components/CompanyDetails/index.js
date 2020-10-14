import React, {useState, useEffect} from 'react';
import Logo from '../../Logo/logo.png';
import { useHistory, useParams } from "react-router-dom";
import { get_specific_data } from '../../config/Firebase/index';
import { firebase } from '../../config/Firebase';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

const CompanyDetails = () =>{
    const[getList, setGetList] = useState();
    const history = useHistory();
    const goToHome = () =>{
        history.push('/home');
    }
    const {transactionsId} = useParams();
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () =>{
        const result = await get_specific_data(transactionsId)
        setGetList(result.data())
    }
    const addToken = () =>{
        const details = {...getList}
        details.remainingToken = Number(details.remainingToken + 1)
        if(details.remainingToken !=0){
           firebase.firestore().collection('Companies List')
           .doc(transactionsId)
           .update({
                remainingToken : details.remainingToken
            })
            const id = setInterval(() => {
                tokenNotification()
            }, 10000);
            const tokenNotification = () =>{
                  clearInterval(id)
                    store.addNotification({
                        title: "Token Upcoming!",
                        message: "10 minutes of the upcoming token",
                        type: "info",
                        insert: "top",
                        container: "top-left",
                        showIcon: true,
                        animationIn: ["animate__fadeIn"],
                        animationOut: ["animate__fadeOut"],
                        dismiss: {
                          duration: 9000,
                          showIcon: true,
                          timingFunction: 'ease-out',
                          delay: 0,
                          onScreen: true
                        },
                        width: 350
                      });
            }
        }
            setGetList(details)
    }
    return(
        <React.Fragment>
            <div className="nav-bar">
                <div className="menu-left">
                    <img src={Logo} />
                </div>
                <div className="menu-right">
                    <ul>
                        <li></li>
                    </ul>
                </div>
            </div>
            <br />
            <div className="main-heading">
                <h1>Companies Details</h1>
            </div>
            <br />
            <br />
            {getList && 
                <div className="comp-details">
                    <h1>{getList.companyName}</h1>
                    <h6 className="h6-btn-1"><h5>Timings</h5>{getList.timings}</h6>
                    <h6 className="h6-btn-2"><h5>Address</h5>{getList.address}</h6>
                    <h6 className="h6-btn-3"><h5>Since</h5> {getList.since}</h6>
                    <h6 className="h6-btn-4"><h5>Total Token</h5> {getList.totalToken}</h6>
                    <h6 className="h6-btn-5"><h5>Remaining Token</h5> {getList.remainingToken}</h6>
                    <br />
                    <button className="token-reast" onClick={addToken}>Buy Token</button>
                </div>     
            }
            <ReactNotification />
            <div className="goback-button">
                <button onClick={goToHome}>Go To Home</button>
            </div>
        </React.Fragment>
     )
}
export default CompanyDetails;