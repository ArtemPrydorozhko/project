import './searchPrepare';

const form = document.querySelector('.lot-details-price-form');

form.addEventListener('submit', event => {
    event.preventDefault();

    document.querySelector('input[name="username"]').value = localStorage.getItem('username');
    document.querySelector('input[name="password"]').value = localStorage.getItem('password');

    form.submit();
});