const createSubmit = document.getElementById('create-submit')

createSubmit.addEventListener('click', (e)=>{
  const username = document.getElementById('username').value
  const password = document.getElementById('user-pwd').value
  const admin = document.getElementById('admin').checked
  console.log(JSON.stringify({username:username, password:password, admin:admin}))
  fetch('/create', {
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
    body: JSON.stringify({username: username, password: password, admin: admin})
  })
  .then((res)=>{console.log(res)})
  .catch((err)=>{console.error(err)})
})
