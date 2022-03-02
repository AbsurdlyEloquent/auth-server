const ipRadioAuto = document.getElementById('dhcp')
const ipRadioMan = document.getElementById('ip-manual')

let addrInput = document.getElementById('address')
let subnetInput = document.getElementById('subnet')
let gatewayInput = document.getElementById('gateway')
let ipSubmit = document.getElementById('ip-submit')

const portRadioAuto = document.getElementById('auto')
const portRadioMan = document.getElementById('port-manual')

let inboundInput = document.getElementById('inbound')
let outboundInput = document.getElementById('outbound')
let portSubmit = document.getElementById('port-submit')

fetch('/ip-data/json')
  .then(res => res.json())
  .then(data => {
    addrInput.value = data.address
    subnetInput.value = data.netmask
    gatewayInput.value = data.gateway
    inboundInput.value = data.inbound
    outboundInput.value = data.outbound
  })

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

ipSubmit.addEventListener('click', (e) => {
  fetch('/ip-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: "ip",
      address: addrInput.value,
      netmask: subnetInput.value,
      gateway: gatewayInput.value
    }),
  })
})

portSubmit.addEventListener('click', (e) => {
  fetch('/ip-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: "port",
      inbound: inboundInput.value,
      outbound: outboundInput.value
    }),
  })
})
