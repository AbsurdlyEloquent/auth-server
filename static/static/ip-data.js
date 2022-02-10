const ipRadioAuto = document.getElementById('dhcp')
const ipRadioMan = document.getElementById('ip-manual')

let addrInput = document.getElementById('address')
let subnetInput = document.getElementById('subnet')
let gatewayInput = document.getElementById('gateway')
let ipSubmit = document.getElementById('ip-submit')

const ipInputHandler = (e) => {
  if (ipRadioMan.checked) {
    addrInput.disabled = false
    subnetInput.disabled = false
    gatewayInput.disabled = false
    ipSubmit.disabled = false
    ipSubmit.classList.remove('disabled')
  } else {
    addrInput.disabled = true
    subnetInput.disabled = true
    gatewayInput.disabled = true
    ipSubmit.disabled = true
    ipSubmit.classList.add('disabled')
  }
}

ipRadioAuto.addEventListener('click', ipInputHandler)
ipRadioMan.addEventListener('click',ipInputHandler)

const portRadioAuto = document.getElementById('auto')
const portRadioMan = document.getElementById('port-manual')

let inboundInput = document.getElementById('inbound')
let outboundInput = document.getElementById('outbound')
let portSubmit = document.getElementById('port-submit')

const portInputHandler = (e) => {
  if (portRadioMan.checked) {
    inboundInput.disabled = false
    outboundInput.disabled = false
    portSubmit.disabled = false
    portSubmit.classList.remove('disabled')
  } else {
    inboundInput.disabled = true
    outboundInput.disabled = true
    portSubmit.disabled = true
    portSubmit.classList.add('disabled')
  }
}

portRadioAuto.addEventListener('click', portInputHandler)
portRadioMan.addEventListener('click',portInputHandler)
