(function () {
    // Pavements
    function creatingGround(){
        const windowElement = document.createElement('div')
        windowElement.classList.add('window')

        const groundFloor = document.createElement('div')
        groundFloor.classList.add('groundFloor')
        groundFloor.setAttribute('floor','t')
        groundFloor.appendChild(windowElement)

        return groundFloor;

    }

    function creatingFloor(floorNumb) {
        const door = document.createElement('div')
        door.classList.add('door')

        const floor = document.createElement('div')
        floor.classList.add('floor')
        floor.setAttribute('floor',floorNumb)
        floor.appendChild(door)

        return floor;

    }

    function creatingPavement() {
        const elementFloor = document.querySelectorAll('[floors]')
        elementFloor.forEach(el => {
            const manyFloor = +el.getAttribute('floors')
            for(let i = manyFloor; i > 0; i--) {
                el.appendChild(creatingFloor(i))
            }
            el.appendChild(creatingGround())
        })

    }

    creatingPavement()


    // Lift

    function startToMoveTheLift() {
        const lift = document.querySelector('.lift')
        lift.setAttribute('moving',' ')
    }
    function endToMoveTheLift() {
        const lift = document.querySelector('.lift')
        lift.removeAttribute('moving')
    }
    function movingLift() {
        const lift = document.querySelector('.lift')
        return lift.hasAttribute('moving')
    }

    function getSizeOfLift() {
        const ground = document.querySelector('[floor="t"]')
        return ground.offsetHeight
    }

    function creatingLift() {
        const pit = document.querySelector('.pit')

        const lift = document.createElement('div')
        lift.classList.add('lift')
        lift.style.height = getSizeOfLift()+'px'
        lift.style.bottom = 0

        pit.appendChild(lift)

    }

    function getPosition() {
        const lift = document.querySelector('.lift')
        return parseFloat(lift.style.bottom) || 0;
    }

    function updateDisplay(text) {
        const display = document.querySelector('.display')
        display.innerHTML = text
    }

    function addHighligthFloor(liftMovingTo) {
        const botton = document.querySelector(`[liftMovingTo="${liftMovingTo}"]`)
        botton.classList.add('highlight')
    }
    function removeHighligthFloor(liftMovingTo) {
        const botton = document.querySelector(`[liftMovingTo="${liftMovingTo}"]`)
        botton.classList.remove('highlight')
    }

    function moveLiftTo(floor) {

        if(movingLift()) return

        startToMoveTheLift()
        addHighligthFloor(floor)
        const number = floor === 't'? 0 : +floor
        const lift = document.querySelector('.lift')
        // lift.style.bottom = number * getSizeOfLift() + 'px';

        const initialPosition = getPosition()
        const finalPosition = number * getSizeOfLift() 
        
        const goingUp = finalPosition > initialPosition;

        updateDisplay(goingUp ? 'Lift going up' : 'Lift going down')

        let timer = setInterval(() => {
            const newPosition = getPosition() + (goingUp ? 10 : -10)
            const ended = goingUp ? newPosition >= finalPosition : newPosition <= finalPosition
            lift.style.bottom = (ended ? finalPosition : newPosition) + 'px'

            if(ended) {
                clearInterval(timer)
                updateDisplay(floor === 't'? 'Ground Floor' : `${floor} Floor`)
                endToMoveTheLift()
                removeHighligthFloor(floor)
            }
            
        },30)
    }

    function displayToMoveLift() {
        const bottons = document.querySelectorAll('[liftMovingTo]')
        bottons.forEach (botton => {
            const movingLift = botton.getAttribute('liftMovingTo')
            botton.onclick = function () {
                moveLiftTo(movingLift)


            }
        })

    }

    creatingLift()
    displayToMoveLift()


})()

// console.log(`string number is ${number}`)
// console.log(`getPosition() value is ${getPosition()}`)
// console.log(`getSizeOfLift() value is ${getSizeOfLift()}`)
// console.log(`lift.style.bottom value is ${lift.style.bottom}`)