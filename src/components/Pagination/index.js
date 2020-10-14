import React, { useState, useEffect } from 'react';

const Pagination = ({showperpage, onChangepagination, total}) =>{
    const [counter, setcounter] = useState(1);
    
    useEffect(() =>{
        const value = showperpage * counter
        onChangepagination(value-showperpage, value)
    }, [counter])

    const onButtonClick = (type) =>{
        if(type === "prev"){
            if(counter === 1){
                setcounter(1)
            }
            else{
                setcounter(counter-1)
            }
        }
        else if(type === "next"){
            if(Math.ceil(total/showperpage) === counter){
                setcounter(counter)
            }
            else{
                setcounter(counter + 1)
            }
        }
    }
    return(
        <React.Fragment>
            <div className="pag">
                    <button 
                        className="prev" 
                        onClick={() => onButtonClick("prev")}
                    >
                        Previous
                    </button>
                    <button 
                        className="next" 
                        onClick={() => onButtonClick("next")}
                    >
                        Next
                    </button>
            </div>
        </React.Fragment>
    )
}
export default Pagination;