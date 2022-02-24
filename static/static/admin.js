const createSubmit = document.getElementById('create-submit')

createSubmit.addEventListener('click', (e)=>{
  const username = document.getElementById('username').value
  const password = document.getElementById('user-pwd').value
  const confirmPassword = document.getElementById('repeat-pwd').value
  const admin = document.getElementById('admin').checked
  const form = document.getElementById('account-create-form')
  fetch('/users/signup', {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({username: username, password: password, confirmPassword:confirmPassword, admin: admin})
  })
  .then(response => response.json())
  .then(data => {
    const message = document.getElementById('message-create')
    if (data.error) {
      message.style.color = 'red'
      message.style['user-select'] = 'auto';
      message.style.display = 'block'
      message.innerText = data.message
    } else {
      message.style.color = 'green'
      message.style['user-select'] = 'auto';
      message.style.display = 'inline'
      message.innerHTML = '&#10003 User Registered'
      form.reset()
    }
  })
})
