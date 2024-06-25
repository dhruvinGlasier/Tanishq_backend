// const { response } = require("express");

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

   
    const formData = {
        email: document.getElementById('userEmail').value,
        userName: document.getElementById('userName').value,
        password: document.getElementById('userPassword').value
    };

    
    fetch('http://localhost:4500/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        
        console.log('Response:', data);
        if (data.success) {
            document.getElementById('message').textContent = 'User registered successfully!';
        } else {
            document.getElementById('message').textContent = 'Registration failed. Please try again.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred while registering. Please try again later.';
    });
});