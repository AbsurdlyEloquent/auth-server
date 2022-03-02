const oldPassword = document.getElementById('old-pwd')
const newPassword = document.getElementById('new-pwd')
const repeatPassword = document.getElementById('repeat-new-pwd')
const pwdSubmit = document.getElementById('reset-submit')

pwdSubmit.addEventListener('click', (e)=> {
  fetch('/users/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
      repeatPassword: repeatPassword.value
    }),
  })
})
