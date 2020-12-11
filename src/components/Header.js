import React from 'react'
import {reverseCol} from '../middleware/helpers.js';


const Header = ({columnSummary, tableHeaders})=>{
    const reset = ()=>{
        window.location.reload()
    }

    const handleReverse = ()=>{
        reverseCol(columnSummary,tableHeaders);
    }
    

    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand text-info" href="/"><b>AlgoSorter</b> </a>

            <div className="collapse navbar-collapse" id="navbarToggler">
                <div className="navbar-nav ml-auto mt-2 mt-lg-0 btn-group btn-group-toggle" data-toggle="buttons" id="sort_selector">
                    <label className="btn btn-secondary mr-2 active">
                        <input type="radio" name="options" id="regular_sort" value="regular" autoComplete="off" checked readOnly/> Regular Sort
                    </label>

                    <label className="btn btn-secondary mr-2 ">
                        <input type="radio" name="options" id="selection_sort" value="selection" autoComplete="off"/> Selection Sort
                    </label>
                    <label className="btn btn-secondary mr-2 ">
                        <input type="radio" name="options" id="insertion_sort" value="insertion" autoComplete="off"/> Insertion Sort
                    </label>
                    
                    <label className="btn btn-secondary mr-2 ">
                        <input type="radio" name="options" id="merge_sort" value="merge" autoComplete="off"/> Merge Sort
                    </label>
                    
                    <label className="btn btn-secondary mr-2 ">
                        <input type="radio" name="options" id="quick_sort" value="quick" autoComplete="off"/> Quick Sort
                    </label>
                </div>
                
            </div>
        </nav>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="  d-flex ml-auto">
                <button className="btn btn-link mr-4" id="reset" onClick={reset}>Reset</button>
                <div className="mr-2 align-self-center">Reverse
                </div>
                <label className="switch">  
                    <input type="checkbox" id="reverse" onChange = {handleReverse}/>
                    <span className="slider round"></span>
                </label>	
            </div>
        </nav>

        <div className="colors">
			<span className="badge" style={{color:"white", background:"rgb(230, 16, 16)"}}>less than/equal to min</span>
			<span className="badge" style={{color:"white", background:"rgb(232, 135, 16)"}}>less than/equal to mean</span>
			<span className="badge" style={{color:"white", background:"rgb(33, 56, 191)"}}>great than mean</span>
			<span className="badge" style={{color:"white", background:"rgb(109, 153, 28)"}}>less than/equal to max</span>
            <span className="badge" style={{color:"white", background:"rgb(237, 204, 14)"}}>other</span>

		</div>
        </>


    )
}

export default Header;