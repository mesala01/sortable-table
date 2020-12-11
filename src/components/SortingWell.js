import React from 'react'
import {regularSort, selectionSort, insertionSort, mergeSort, quickSort} from '../middleware/algorithms.js'
import {renderNodes,filterNull} from '../middleware/helpers.js';
import $ from "jquery"

const SortingWell = ({tableHeaders,columnSummary}) =>{
	let sorters = [];
    const allowDrop = (ev) => {
		ev.preventDefault();
		ev.stopPropagation();
	}

	const showModal = (colName,summary, time)=>{
		$(".mean").text(summary.mean);
		$(".max").text(summary.max);
		$(".min").text(summary.min);
		$(".runtime").text(time);
		$("#staticBackdrop").modal("show")
	}

	function getSort(){
		const sortAlgo = document.querySelector("#sort_selector").children;
		const sortAlgoArr = Array.from(sortAlgo);
		let sorter = ""
		sortAlgoArr.forEach((algoBtn) =>{
			if(algoBtn.classList.contains("active")){
				sorter = algoBtn.children[0].value;
			}
		});
		return sorter;
	}
	

    
    const drop = (ev) => {
		// get the sorter name
		var transferData = ev.dataTransfer.getData("text");
		const dragBtn = document.getElementById(transferData);
		const clonedBtn = document.getElementById(`${transferData}-cloned`); // get the dragged header
		ev.currentTarget.appendChild(dragBtn);
		clonedBtn.style.display = "block";
		sorters.length = 0;
		ev.currentTarget.childNodes.forEach((item) => {
			sorters.push(item.innerText);// add headers to the sorters list
		})
		sorters.reverse();
		const sorterIndex = tableHeaders.indexOf(sorters[0]);//get the latest header dropped into to the sorter div
		const itemsNotNull = filterNull(sorterIndex);
        const start = performance.now();
		switch(getSort()){
			case "regular":
				console.profile("regularSort");
				const regularArr = regularSort(itemsNotNull, sorterIndex);
				renderNodes(regularArr, sorters, columnSummary);
				console.profileEnd("regularSort");
				break;
			case "selection":
				console.profile("selectionSort");
				const selectionArr = selectionSort(itemsNotNull, sorterIndex);
				renderNodes(selectionArr,sorters,columnSummary);
				console.profileEnd("selectionSort");
				break;
			case "merge":
				console.profile("mergeSort");
				const mergeArr = mergeSort(itemsNotNull, tableHeaders, sorters);
				renderNodes(mergeArr,sorters, columnSummary);
				console.profileEnd("mergeSort");
				break;
			case "insertion":
				console.profile("insertionSort");
				const insertionArr = insertionSort(itemsNotNull, sorterIndex);
				renderNodes(insertionArr, sorters, columnSummary);
				console.profileEnd("insertionSort");
				break;
			case "quick":
				console.profile("quickSort");
				const quickArr = quickSort(itemsNotNull, 1, itemsNotNull.length-1, sorterIndex);
				renderNodes(quickArr, sorters, columnSummary);
				console.profileEnd("quickSort");
				break; 
			default:
				console.profile("regularSort");
				const defaultArr = regularSort(itemsNotNull, sorterIndex);
				renderNodes(defaultArr, sorters, columnSummary);
				console.profileEnd("regularSort");
		}
		const end = performance.now();
		let time = end - start; //in milliseconds
		const data= columnSummary[sorters[0]]
		showModal(sorters[0],data,time)
		
    }

    return(
        <>
        <label className="sortWellLabel ">Drag and drop headers to area below to sort:</label>
        <div className = "border bg-light p-3 sortWell" onDragOver={allowDrop} onDrop={drop} >  
        </div>
        </>
    )
}

export default SortingWell;