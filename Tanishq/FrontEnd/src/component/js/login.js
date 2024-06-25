// const { response } = require("express");

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

   
    const loginData = {
        userName: document.getElementById('userName').value,
        password: document.getElementById('userPassword').value
    };

    console.log('Sending login data:', loginData);
    fetch('http://localhost:4500/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        
        console.log('Response:', data);
        if (data.success) {
            alert("suceess");
            localStorage.setItem('accessToken', data.data.accessToken);
            window.location.href = './home.html';
        } else {
            alert("faild");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred while registering. Please try again later.';
    });
});