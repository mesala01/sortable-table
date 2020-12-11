
const renderNodes =(arr, sorters,columnSummary) =>{
    const  tableElement = document.querySelector('.table');
    const reverse = document.getElementById("reverse").checked;
    if(reverse){
        arr.reverse()
    }
    arr.forEach((row) => {
        const tds = row.childNodes;
        const tdsArr = Array.from(tds)
        tdsArr.forEach((td) =>{
            const classListArr = Array.from(td.classList);
            sorters.forEach((sorter) => {
                const sorterVal = sorter.toLowerCase().replace(/-/g, '').replace(/ /g, '_');
                if(classListArr.includes(sorterVal)){
                    const tdVal = parseFloat(td.textContent);
                    heatMapColor(td, tdVal, sorter,columnSummary);
                }
            })
        })
        tableElement.insertBefore(row, tableElement.childNodes[1])
    })
}

// reverse the sorted data in table
const reverseNodes =(arr, sorters,columnSummary) =>{
    const  tableElement = document.querySelector('.table');
    arr.forEach((row) => {
        const tds = row.childNodes;
        const tdsArr = Array.from(tds)
        tdsArr.forEach((td) =>{
            const classListArr = Array.from(td.classList);
            sorters.forEach((sorter) => {
                const sorterVal = sorter.toLowerCase().replace(/-/g, '').replace(/ /g, '_');
                if(classListArr.includes(sorterVal)){
                    const tdVal = parseFloat(td.textContent);
                    heatMapColor(td, tdVal, sorter,columnSummary); // color the values in the table
                }
            })
        })
        tableElement.insertBefore(row, tableElement.childNodes[1])

    })
}


function reverseCol(columnSummary, tableHeaders){
        const sortWell = document.querySelector(".sortWell")
        const sortValues =[]
        //Get the header values from the sort input
		sortWell.childNodes.forEach((item) => {
			sortValues.push(item.innerText);// add headers to the sorters list
		})
        if(sortValues.length){
            const sorterIndex = tableHeaders.indexOf(sortValues[0]);//get the latest header dropped into to the sorter div
            const itemsNotNull = filterNull(sorterIndex);
            console.log(itemsNotNull)
            
            reverseNodes(itemsNotNull,sortValues, columnSummary);
}}


function heatMapColor(ele, val, key, columnSummary){
    let color = '';
    const currentColumn = columnSummary[key],
    red = "rgb(230, 16, 16)",
    orange = "rgb(232, 135, 16)",
    green = "rgb(109, 153, 28)",
    blue = "rgb(33, 56, 191)",
    yellow= "rgb(237, 204, 14)";
    if(val <= currentColumn.min && val <= currentColumn.first){
        color = red;
    }
    else if(val > currentColumn.first && val <= currentColumn.mean){
        color = orange
    }
    else if(val > currentColumn.mean && val <= currentColumn.third){
        color = blue;
    }
    else if(val > currentColumn.third && val <= currentColumn.max){
        color = green;
    }
    else{
        color = yellow;
    }
    ele.style.backgroundColor = color;
    ele.classList.add("selected");
}


function minMaxMean(items) {
    let summary = {},
        minVal = null,
        maxVal = null,
        meanVal = null,
        firstQuartile = null,
        thirdQuartile = null;
    const headers = Object.keys(items[0]);
    headers.forEach((header) => {
        let tempArr = [];
        items.forEach((item, i) => {
            if(item[header] !== null){
                tempArr.push(item[header]);
                if(i === items.length - 1){
                    tempArr.sort((a, b) => a < b ? -1 : (a > b) ? 1 : 0 );
                    minVal = Math.min(...tempArr);
                    maxVal = Math.max(...tempArr);
                    meanVal = tempArr[Math.floor(tempArr.length/2)];
                    firstQuartile = tempArr[Math.floor(tempArr.length/4)];
                    thirdQuartile = tempArr[Math.floor((tempArr.length/4)*3)];
                }
            }
        })
        summary[header] = {
            values: tempArr,
            min: minVal,
            max: maxVal,
            mean: meanVal,
            first: firstQuartile,
            third: thirdQuartile
        }
    });
    return summary
}


function filterNull(sorterIndex){
    const  tableElement = document.querySelector('.table');
    const items = Array.from(tableElement.childNodes);
    return items.filter((row) => {
        const rowTD = Array.from(row.childNodes); 
        return rowTD[sorterIndex].textContent; 
    })
}

module.exports = {minMaxMean, heatMapColor, renderNodes, filterNull, reverseNodes, reverseCol}