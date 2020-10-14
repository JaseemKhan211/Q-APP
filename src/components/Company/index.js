import React, {useState, useEffect} from 'react';
import Logo from '../../Logo/logo.png';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import {Companies_list_data_add , Companies_list_data_get} from '../../config/Firebase/index';
import { useHistory, useParams } from "react-router-dom";
import Pagination from '../../components/Pagination';


const Company = () =>{
    const [show, setShow] = useState(false);
    const[companyName, setCompanyName] = useState();
    const[since, setSince] = useState();
    const[timings, setTimings] = useState();
    const[address, setAddress] = useState();
    const [companiesList, setCompaniesList] = useState([])
    const[table, setTable] = useState(false);
    const [remainingToken, setRemainingToken] = useState()
    const [totalToken, setTotalToken] = useState()
    const [search, setSearch] = useState('')
    const [showperpage, setShowPerPage] = useState(8)
    const [pagination, setPagination] = useState({
        start: 0,
        end: showperpage
    })
    const onChangepagination = (start, end) =>{
        setPagination({start:start, end:end})
    }
     
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () =>{
        const result = await Companies_list_data_get()
        // console.log(result)
        const transactions = []
        result.forEach(doc =>{
            const data = doc.data()
            console.log('data=======',doc.id)
            transactions.push({ ...data, transactionsId: doc.id })
        }) 
        console.log(transactions)
        setCompaniesList(transactions);
        setTable(true);
    }
    const addCompaniesList = () =>{
        Companies_list_data_add(companyName, since, timings, address, totalToken, remainingToken)
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const history = useHistory();
    const goToHome = () =>{
        history.push('/home');
    }

    const searchFilter = companiesList.filter(companiesList =>{
        return companiesList.companyName.toLocaleLowerCase().includes(search.toLocaleLowerCase())    
    })
    // const {transactionsId} = useParams();
    // const deleteUser = (item) =>{
    //     const newList = [...companiesList]
    //     newList.splice(item)
    //     setCompaniesList(newList)
    // } 
  
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
                <h1>Companies List</h1>
            </div>
            <Pagination 
                showperpage={showperpage} 
                onChangepagination={onChangepagination}
                total={searchFilter.length}
            />
            <div className="comp-search-bar">
                <form>
                    <input 
                        type="text" 
                        name="" 
                        placeholder="Search company name" 
                        onChange={e => setSearch(e.target.value)}
                    />
                    <input 
                        type="submit" 
                        name="" 
                        value="Search" 
                    />
                </form>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className="container">
                <div className="row">
                <Table className="col-xs-7 table-bordered table-striped table-condensed table-fixed">
                <thead>
                    <tr>
                        <th className="col">#</th>
                        <th className="col">Company Name</th> 
                        <th className="col">Action</th> 
                    </tr>
                </thead>
                <tbody>
                {
                    table &&
                    searchFilter.slice(pagination.start, pagination.end).map((item, index) =>{
                        // console.log('=========',companiesList)
                        return(
                            <tr>
                                <td className="col">{index + 1}</td>
                                <td className="col">{item.companyName}</td>
                                <td className="col">
                                    <button  onClick={() => history.push(`/companydetails/${item.transactionsId}`)}>Show Details</button>
                                    {/* <button onClick={() => deleteUser(transactionsId)}>delete</button> */}
                                </td>    
                            </tr>
                        )
                    })
                }
                </tbody>
                </Table>
                </div>
            </div>
            <div className="goback-btn">
                <button onClick={goToHome}>Go To Home</button>
            </div>

            <Button variant="primary" onClick={handleShow}>
                <div className="action">
                    <span>+</span>
                </div>
            </Button>
            <Modal 
                show={show} 
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Company Form</Modal.Title>
                </Modal.Header>
                <Modal.Body className="container-2">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control 
                            type="company_name" 
                            placeholder="Enter Your Company Name" 
                            onChange={event => setCompanyName(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Since</Form.Label>
                        <Form.Control 
                            type="since" 
                            placeholder="Enter Your Since" 
                            onChange={event => setSince(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Timing</Form.Label>
                        <Form.Control 
                            type="Address" 
                            placeholder="Enter Timing" 
                            onChange={event => setTimings(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Address</Form.Label>
                        <Form.Control 
                            type="Address" 
                            placeholder="Enter Address" 
                            onChange={event => setAddress(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Total Token</Form.Label>
                        <Form.Control 
                            type="Address" 
                            placeholder="Enter Total Token" 
                            onChange={event => setTotalToken(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Token</Form.Label>
                        <Form.Control 
                            type="Address" 
                            placeholder="Enter Token" 
                            onChange={event => setRemainingToken(event.target.value)}
                        />
                    </Form.Group>
               </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant="secondary" 
                    onClick={handleClose}
                >
                    Close
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleClose}
                    onClick={addCompaniesList}
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        </React.Fragment>
    )
}
export default Company;