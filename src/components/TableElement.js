import React, { useEffect } from 'react'
import Modal from './Modal';
const TableElement = ({tableData, tableHeaders}) =>{

    function dragstart(ev) {
		ev.dataTransfer.setData("text", ev.currentTarget.id);
		var clonedBtn = ev.target.cloneNode(true);
		clonedBtn.id = `${clonedBtn.id}-cloned`
		clonedBtn.disabled = true;
		clonedBtn.style.display = "none";
		ev.currentTarget.parentNode.appendChild(clonedBtn)
    }

    useEffect(()=>{
        document.querySelector(".table").innerHTML ="";
        const  tableEle = document.querySelector('.table');
        function createHeader(){
            const trEle = document.createElement("TR");
            tableHeaders.forEach((key, i) => {
                const thEle = document.createElement("TH"),
                btnEle = document.createElement("BUTTON");
                btnEle.className = 'btn btn-default ml-2'
                btnEle.innerText = key;
                // ES6 template literals
                btnEle.id = `sorter-${i}`;
                btnEle.draggable = true;
                btnEle.addEventListener("dragstart", dragstart);
                if(i === 0){
                    btnEle.draggable = false;
                    thEle.className = "fixed";
                }else{
                    thEle.className = "pushRight";
                    btnEle.draggable = true;
                    btnEle.addEventListener("dragstart", dragstart);           
                }
                thEle.appendChild(btnEle);
                trEle.appendChild(thEle);           
            })
            tableEle.appendChild(trEle);
        }

        function createTableBody(){	
            tableData.slice(0,1001).forEach((row) => {
                const trEle = document.createElement("TR")
                Object.entries(row).forEach((entry, i) => {
                    const key = entry[0],
                    val = entry[1],
                    tdEle = document.createElement("TD");
                    tdEle.innerText = val;
                    const iEle = document.createElement("i");
                    iEle.className = "fas mainIcon";
                    tdEle.appendChild(iEle)
                    if(i === 0){
                        tdEle.className = "fixed dataNames";
                    }else{
                        tdEle.className = "pushRight " + key.toLowerCase().replace(/-/g, '').replace(/ /g, '_');
                    }
                    trEle.appendChild(tdEle);
                })
                tableEle.appendChild(trEle)
            })
        }
        createHeader()
        createTableBody()
       
    }, [tableData, tableHeaders])

    return(
        <>
        <div className="tableContainer table-responsive">
            <table className="table">
            </table>
        </div>
        <Modal/>

        </>

    )
}
export default TableElement;