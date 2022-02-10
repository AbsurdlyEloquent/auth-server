const userGreeting = document.getElementById('user-greeting')
let username = sessionStorage.getItem('username')

userGreeting.innerText = username
