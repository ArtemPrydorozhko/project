const form = document.querySelector('.createLot-form');

window.onload = function() {
    if (!(localStorage.getItem('username') && localStorage.getItem('password'))) {
        const url = new URL(location.href);
        location.href = url.origin + '/login.html';
    }
}

form.addEventListener('submit', event => {
    document.querySelector('input[name="username"]').value = localStorage.getItem('username');
});