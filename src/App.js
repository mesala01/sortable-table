import { useEffect, useState } from 'react';
import Header from './components/Header.js';
import SortingWell from './components/SortingWell';
import TableElement from './components/TableElement.js';
import './css/style.css';
import {minMaxMean} from './middleware/helpers.js'

function App() {
  const url = "./factbook.json";
	const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [columnSummary, setColumnSummary] = useState({})
  
  useEffect(()=>{
		fetch(url) 
			.then((response)=> {
				if (response.ok) {
					return response.json();
				}else{
					throw new Error('something went wrong!')
				}
			})
			.then((results) => {
				setData(results);
        setOriginalData(results);
        setColumnSummary(minMaxMean(results));
        // ES5 Object.keys
        setHeaders(Object.keys(results[0]));    
        
			})
			.catch((err) => {
					console.log(err);
      });},[])
      
      
  
  return (
    <div className="App">
        <Header tableHeaders={headers} columnSummary= {columnSummary} />
        <SortingWell tableHeaders={headers} columnSummary= {columnSummary}/>
        <TableElement tableData = {data} tableHeaders = {headers} />

    </div>
  );
}

export default App;
