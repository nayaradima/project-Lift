// Creating lanes of the street using JS 
(function(){
    // Function executed in order to hide the window. on the web page

    function creatingLanes() {
        const elementWithLane = document.querySelectorAll('[lane]')
        elementWithLane.forEach(el => {
         // Converting String el into number
        const manyLanes = +el.getAttribute('lane')
        for (let index = 0; index < manyLanes; index++) {
            const lane = document.createElement('div')
            lane.classList.add('lane')
            el.appendChild(lane)
        }
    })

    } 
    creatingLanes()
})()




