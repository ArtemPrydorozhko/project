import './searchPrepare';

const form = document.querySelector('.lot-details-price-form');

window.onload = function() {
    const seller = document.querySelector('.lot-details-seller span').textContent;
    if (seller === localStorage.getItem('username')) {
        document.querySelector('.lot-details-price-form').classList.toggle('hidden');
    }
}

form.addEventListener('submit', event => {
    event.preventDefault();

    document.querySelector('input[name="username"]').value = localStorage.getItem('username');
    document.querySelector('input[name="password"]').value = localStorage.getItem('password');

    form.submit();
});