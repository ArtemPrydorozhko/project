import './../scss/main.scss';

const filter = document.querySelector('.offer-filter');

document.querySelector('.filterBtn').addEventListener('click',(event) => {
    filter.classList.toggle('filter-show');
});
