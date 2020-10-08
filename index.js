const insertionSort = (array) => {
  let nextArray = [...array]
  function swap(array, i, j) {
    let tmp = array[i]
    array[i] = array[j]
    array[j] = tmp
  }
  let counter = 1
	for (let i = 1; i < nextArray.length; i++) {
		let idx = i
		while (nextArray[idx] < nextArray[idx-1] && idx > 0) {
      swap(nextArray, idx-1, idx)
      let newArray = [...nextArray]
      setTimeout(() => draw(newArray), counter * 100)
      counter++
			idx--
		}
	}
	return nextArray
}

const bubbleSort = (array) => {
  let nextArray = [...array]
  let counter = 1
  for (let i = 0; i < nextArray.length; i++) {
    for (let j = 0; j < nextArray.length - 1; j++) {
      if (nextArray[j] > nextArray[j + 1]) {
        let tmp = nextArray[j + 1]
        nextArray[j + 1] = nextArray[j]
        nextArray[j] = tmp
        let newArray = [...nextArray]
        setTimeout(() => draw(newArray), counter * 100)
        counter++
      }
    }
  }
  return nextArray
}

const mergeSort = (array) => {
  const merge = (arr1, arr2) => {
    let output = []
    let p1 = 0
    let p2 = 0
    while (p1 < arr1.length && p2 < arr2.length) {
      if (arr1[p1] < arr2[p2]) {
        output.push(arr1[p1])
        p1++
      } else {
        output.push(arr2[p2])
        p2++
      }
    }
    while (p1 < arr1.length) {
      output.push(arr1[p1])
      p1++
    }
    while (p2 < arr2.length) {
      output.push(arr2[p2])
      p2++
    }
    return output
  }
  if (array.length < 2) return array
	let half = Math.floor(array.length / 2)
	let l1 = mergeSort(array.slice(0, half))
  let l2 = mergeSort(array.slice(half, array.length - 1))
	return merge(l1, l2)
}



const draw = (array) => {
  let sortingDiv = document.getElementById("sorting-div")
  sortingDiv.innerHTML = ""
  sortingDiv.style.height = 100
  sortingDiv.style.width = 200

  for(let i = 0; i < array.length; i++) {
    let bar = document.createElement('div')
    bar.classList.add("bar")
    bar.style.height = array[i] * 10 + "px"
    sortingDiv.appendChild(bar)
  }
  //d3???
  // let svgHeight= 200, svgWidth = 500, barSpacing = 5
  // let totalBarWidth = (svgWidth/array.length)
  // let barWidth = totalBarWidth - barSpacing

  // let svgContainer = d3.select('svg')
  //             .append('svg')
  //             .attr("width", svgWidth)
  //             .attr("height", svgHeight)

  // svgContainer.innerHTML = ""

  // let scale = d3.scaleLinear()
  //             .domain([0,d3.max(array)])
  //             .range([0,svgHeight])

  // let barChart = svgContainer.selectAll('rect')
  //     .data(array)
  //     .enter()
  //     .append('rect')
  //     .attr('y', d => svgHeight - scale(d))
  //     .attr('height', d => scale(d))
  //     .attr('width', barWidth)
  //     .attr('transform', (d,i) => {
  //       let translate = [totalBarWidth * i + 1, 0];
  //           return `translate(${translate})`;
  //       }
  //     );
}

const sortingVisualizer = () => {
  let dataset = [12,4,2,5,22,9,7,11,11,6,29]
  let inputDiv = document.getElementById('input-div')
  let form = document.createElement('form')

  let input = document.createElement('input')
  input.id = "input"
  input.style.height = 10
  input.style.width = 40

  let button = document.createElement('button')
  button.style.width = 40
  button.innerHTML = "Add to array"



  let bubbleSortButton = document.createElement('button')
  bubbleSortButton.innerHTML = "Bubble Sort"
  bubbleSortButton.style.width = 55 + "px"
  bubbleSortButton.onclick = () => bubbleSort(dataset)

  let mergeSortButton = document.createElement('button')
  mergeSortButton.innerHTML = "Merge Sort"
  mergeSortButton.style.width = 55 + "px"
  mergeSortButton.onclick = () => mergeSort(dataset)

  let insertionSortButton = document.createElement('button')
  insertionSortButton.innerHTML = "Insertion Sort"
  insertionSortButton.style.width = 55 + "px"
  insertionSortButton.onclick = () => insertionSort(dataset)

  let arrayIntro = document.createElement('p')
  arrayIntro.innerHTML = "Numbers to be sorted"

  let arrayParagraph = document.createElement('p')
  arrayParagraph.innerHTML = ""

  form.appendChild(input)
  form.appendChild(button)
  inputDiv.appendChild(form)
  inputDiv.appendChild(arrayIntro)
  inputDiv.appendChild(arrayParagraph)
  inputDiv.appendChild(bubbleSortButton)
  inputDiv.appendChild(mergeSortButton)
  inputDiv.appendChild(insertionSortButton)

  form.onsubmit = (event) => {
    event.preventDefault()
    dataset.push(Number(event.target.input.value))
    arrayParagraph.innerHTML += ` ${event.target.input.value}`
    event.target.input = ""
    console.log(dataset)
    draw(dataset)
  }
}

sortingVisualizer()
