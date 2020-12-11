// regularSort
function regularSort(arr, sorterIndex){
    arr.sort((a, b) => {
        const rowA = Array.from(a.childNodes);
        const rowB = Array.from(b.childNodes);
        const x = parseFloat(rowA[sorterIndex].textContent);
        const y = parseFloat(rowB[sorterIndex].textContent);
        return x < y ? -1 : (x > y) ? 1 : 0;
    });
    
    return arr;
}

// bubbleSort 
const bubbleSort = (arr, sorterIndex) =>{
		let swapped;
		do{
			swapped = false;
			for(let i = 0; i < arr.length; i++){
				const j = i + 1;
				if(arr[i] && arr[j]){
					const rowA = Array.from(arr[i].childNodes);
					const rowB = Array.from(arr[j].childNodes);
					const x = parseFloat(rowA[sorterIndex].textContent);
					const y = parseFloat(rowB[sorterIndex].textContent);
					if(x > y){
						var temp = arr[i];
						arr[i] = arr[j];
						arr[j] = temp;
						swapped = true;
					}
				}
			}
        }while(swapped)
		return arr
    }
    


const selectionSort = (arr, sorterIndex) =>{
    for(let i= 0; i< arr.length; i++){
        const rowA = Array.from(arr[i].childNodes);
		const valueA = parseFloat(rowA[sorterIndex].textContent);
        let minIndex = i;
        for(let j = i+1; j < arr.length; j++){
            const rowB = Array.from(arr[j].childNodes);
			const valueB = parseFloat(rowB[sorterIndex].textContent);
            if(valueB < valueA){
                minIndex = j
            }
        }
        if(i!== minIndex){
            let temp = arr[i]
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;  
        }
    
    }
    return arr;
}


// Insertion sort 
const insertionSort = (arr, sorterIndex) =>{ 
		for(let i = 1; i < arr.length; i++){
			const rowB = Array.from(arr[i].childNodes);
			const valueB = parseFloat(rowB[sorterIndex].textContent);
			const currentKey = arr[i];
			let j;
			for(j = i- 1; j >= 0; j--){
				const rowA = Array.from(arr[j].childNodes);
				const valueA = parseFloat(rowA[sorterIndex].textContent);
				if(valueA <= valueB){
					break;
				}else{
					arr[j + 1] = arr[j]
				}
			}
			arr[j + 1] = currentKey;
		}
		return arr; 
}

// Quick Sort algorithm
const quickSort = (arr, left, right,sorterIndex) =>{
    if(right <= left){
        return
    }else{
        const pivot = partition(arr,left,right, sorterIndex);
        quickSort(arr, left, pivot-1, sorterIndex);
        quickSort(arr, pivot + 1, right, sorterIndex);
    }
    return arr

}

const partition = (arr,left, right, sorterIndex) =>{
    const rowPivot = Array.from(arr[left].childNodes);
    const pivot = parseFloat(rowPivot[sorterIndex].textContent);
    let leftIndex = left + 1;
    let rightIndex = right ;
    
    while(true){
        while(leftIndex <= rightIndex &&  parseFloat(Array.from(arr[leftIndex].childNodes)[sorterIndex].textContent) <= pivot){
            leftIndex +=1
        }
        while(rightIndex >= leftIndex &&  parseFloat(Array.from(arr[rightIndex].childNodes)[sorterIndex].textContent) >= pivot){
            rightIndex -=1

        }
        if(rightIndex <= leftIndex){
            break;
        }
        let temp1 = arr[leftIndex]
        arr[leftIndex] = arr[rightIndex]
        arr[rightIndex] = temp1 
        
    }
    let temp2 = arr[left]
    arr[left] = arr[rightIndex]
    arr[rightIndex] = temp2 
    return rightIndex 
}



 //Merge sort algorithm
const mergeSort = (arr, tableHeaders, tableSorters) => {
    if(arr.length <= 1){
        return arr;
    }
    const middle = Math.floor(arr.length / 2),
    tleft = arr.slice(0, middle),
    tright = arr.slice(middle);
    
    return merge(
        mergeSort(tleft,tableHeaders, tableSorters),
        mergeSort(tright,tableHeaders, tableSorters),
        tableHeaders,
        tableSorters
    )
}

function merge (left, right, headers, sorters) {
    let results = [],
    indexLeft = 0,
    indexRight = 0;
    const sorterIndex = headers.indexOf(sorters[0]);
    while(indexLeft < left.length & indexRight < right.length){
        const rowA = Array.from(left[indexLeft].childNodes);
        const rowB = Array.from(right[indexRight].childNodes);
        const x = parseFloat(rowA[sorterIndex].textContent);
        const y = parseFloat(rowB[sorterIndex].textContent);
        if(x < y){
            results.push(left[indexLeft]);
            indexLeft++;
        }else{
            results.push(right[indexRight]);
            indexRight++;
        }
    }
    return results.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
}



module.exports = {regularSort, bubbleSort, insertionSort,mergeSort, selectionSort,quickSort};