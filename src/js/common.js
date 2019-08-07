import './../scss/main.scss';

if (localStorage.getItem('username') && localStorage.getItem('password')) {
    const unauthorized = document.getElementsByClassName('unauthorized');
    const authorized = document.getElementsByClassName('authorized');

    for (let i = 0; i < unauthorized.length; i++) {
        unauthorized[i].classList.add('hidden');
    }
    for (let i = 0; i < authorized.length; i++) {
        authorized[i].classList.remove('hidden');
    }
}

window.addEventListener('click', event => {
    const { target } = event;
    const url = new URL(location.href);

    if (target.closest('.my-account-a')) {
        event.preventDefault();
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        location.href = `${url.origin}/user?u=${username}&p=${password}`;
    } else if (target.closest('.logout-a')) {
        event.preventDefault();
        localStorage.clear();
        location.href = `${url.origin}/`;
    }
});
