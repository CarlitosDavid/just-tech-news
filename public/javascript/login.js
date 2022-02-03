async function signupFromHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if(username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username, 
                email,
                password,
            }),
            header: { 'Content-Type': 'application/json' }
        });
        console.log(response);
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

// Async/await acts as "syntactic sugar" for our code, 
// much like ES6 classes, and help make our Promises more readable