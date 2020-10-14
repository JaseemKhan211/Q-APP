import React, {useState, useEffect} from 'react';
import Logo from '../../Logo/logo.png';
import { Table } from 'react-bootstrap';
import {Companies_list_data_get} from '../../config/Firebase/index';
import { useHistory } from "react-router-dom";
import Pagination from '../../components/Pagination';

const CompanyList = () =>{
    const [ companiesList, setCompaniesList ] = useState([])
    const[table, setTable] = useState(false);
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

    const history = useHistory();
    const searchFilter = companiesList.filter(companiesList =>{
        return companiesList.companyName.toLocaleLowerCase().includes(search.toLocaleLowerCase())    
    })
    const goToHome = () =>{
        history.push('/home');
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
                                <td className="col"> {index + 1} </td>
                                <td className="col"> {item.companyName} </td>
                                <td className="col">
                                    <button  onClick={() => history.push(`/companydetails/${item.transactionsId}`)}>Show Details</button>
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
        </React.Fragment>
    ) 

}
export default CompanyList;