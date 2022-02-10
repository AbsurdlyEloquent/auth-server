const idsRadioAuto = document.getElementById('ids-default')
const idsRadioMan = document.getElementById('ids-manual')

let idsStartInput = document.getElementById('ids-start-date')
let idsEndInput = document.getElementById('ids-end-date')

const idsInputHandler = (e) => {
  if (idsRadioMan.checked) {
    idsStartInput.disabled = false
    idsEndInput.disabled = false
  } else {
    idsStartInput.disabled = true
    idsEndInput.disabled = true
  }
}

idsRadioAuto.addEventListener('click', idsInputHandler)
idsRadioMan.addEventListener('click', idsInputHandler)

const bndRadioAuto = document.getElementById('bnd-default')
const bndRadioMan = document.getElementById('bnd-manual')

let bndStartInput = document.getElementById('bnd-start-date')
let bndEndInput = document.getElementById('bnd-end-date')

const bndInputHandler = (e) => {
  if (bndRadioMan.checked) {
    bndStartInput.disabled = false
    bndEndInput.disabled = false
  } else {
    bndStartInput.disabled = true
    bndEndInput.disabled = true
  }
}

bndRadioAuto.addEventListener('click', bndInputHandler)
bndRadioMan.addEventListener('click', bndInputHandler)
