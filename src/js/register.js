import axios from 'axios';

const username = document.getElementById('username');
const password = document.getElementById('password');
const form = document.querySelector(".auth-form");
const error = document.querySelector('.auth-error');

async function checkData() {
    const url = new URL(location.href);
    try {
        const result = await axios.get(`${url.origin}/userRegister?u=${username.value}`);
        if (!result.data) {
            if (!error.classList.contains('auth-error-show')) {
                error.classList.add('auth-error-show');
            }
            return false;
        }
        return true;
    } catch (err) {
        console.log(err);
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    (async function () {
        if (await checkData()) {
            const url = form.getAttribute('action');
            form.setAttribute('action', `${url}?u=${username.value}&p=${password.value}`);
            localStorage.setItem('username', username.value);
            localStorage.setItem('password', password.value);
            form.submit();
        }
    })();
});
