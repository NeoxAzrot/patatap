/***************************************************************************
*
*	@name: Patatap - animation
*	@description: One display animation for every key enter
*	@author: Sami Lafrance - contact@samilafrance.com
*	@website: https://www.samilafrance.com
*	@version: 1.0.0
*
*	@copyright Copyright ©2020 - All rights reserved
*
***************************************************************************/


// Enter name -----

const getName = () => {
  const span = document.getElementById('name')
  //const name = prompt('Quel est votre prénom ?')
  //span.textContent = name
  span.textContent = "Sami"
}

// Key pressed - alphabet -----

const key = document.getElementById('key')
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const keyShow = (x) => {
  x.classList.toggle('fade')
}

const keyHide = (x) => {
  x.remove()
}

let intervalRunning = false;

// Function random number -----

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

// Function for key input -----

window.addEventListener('keydown', (event) => {
  const keyLow = event.key.toLowerCase()
  if(!alphabet.includes(keyLow)) return

  let elt = document.createElement('p')
  elt.innerHTML = keyLow
  key.appendChild(elt)
  keyShow(elt)
  setTimeout(function() { keyHide(elt); }, 800)

  playSound(keyLow)
  keyPressed.push(keyLow)
})

// Function animation alphabet -----

const alphabetAnimation = () => {
  let alphabetIndex = getRandomIntInclusive(0, alphabet.length - 1)

  let elt = document.createElement('p')
  elt.innerHTML = alphabet[alphabetIndex]
  key.appendChild(elt)
  keyShow(elt)
  setTimeout( () => { keyHide(elt) }, 800)

  playSound(alphabet[alphabetIndex])
}

// Function playSound -----

const playSound = (key) => {
  const url = `sounds/${key}.mp3`
  const audio = new Audio(url)

  audio.play()

  audio.addEventListener('ended', () => {
    const index = keyPressed.indexOf(key)
    keyPressed.splice(index, 1)
  })
}

// Function loadPage -----

const loadSounds = () => {
  const soundsUrl = []
  // Fill the soundsUrl's array
  alphabet.forEach(i => {
    soundsUrl.push(`sounds/${i}.mp3`)
  })

  const spanNumber = document.getElementById('number')
  let numberOfSoundsLoaded = 0

  for (let i = 0; i < soundsUrl.length; i++) {
    const audio = new Audio(soundsUrl[i])

    audio.addEventListener('canplaythrough', (event) => {
      numberOfSoundsLoaded++
      spanNumber.textContent = numberOfSoundsLoaded

      if(numberOfSoundsLoaded == 26) {
        const loader = document.getElementById('loader')
        loader.classList.add('fadeOut')
        setTimeout( () => { loader.classList.add('hide') }, 400)
        getName()
        //const intervalAlphabet = setInterval(alphabetAnimation, 150)
      }
    })
  }
}

loadSounds()

const width = window.innerWidth
const height = window.innerHeight
let keyPressed = []

function setup() {
  const canvas = createCanvas(width, height)
  canvas.parent('canvasContainer')
}

function draw() {
  clear()
  background('rgba(0, 0, 0, 0)')

  if(keyPressed.includes('a')) shapeA()
  if(keyPressed.includes('b')) shapeB()
}

const shapeA = () => {
  fill('#ff0000')
  ellipse(width / 2, height / 2, 200)
}

const shapeB = () => {
  fill('#00ff00')
  ellipse(width / 3, height / 3, 20)
}
