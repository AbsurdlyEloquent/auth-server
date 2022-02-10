
      // post password to /auth
      const submit = document.getElementById('submit')

      submit.addEventListener('click', function(event) {
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        sessionStorage.setItem('username', username)
        fetch('/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username, password: password }),
        })
          .then((response) => {
            // check for auth failure for rejected credentials
            if (response.status === 401) return false;

            // check for auth failure for other reasons
            if (response.status !== 200) return false;

            // auth okay
            return response.json();
          })
          .then((data) => {
             console.log("data", data);

            if (data.success === true) {
              // auth success, cookie should be set
              window.location.href = '/';
              return;
            }

            // auth failure, give feedback to user
            const message = document.getElementById('error')
            message.style.color = 'red'
            message.style['user-select'] = 'auto';
          });
      })
