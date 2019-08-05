import './../scss/main.scss';
import './searchPrepare';
import axios from 'axios';

const filter = document.querySelector('.offer-filter');
const offerLots = document.querySelector('.offer-lots');

let lots;

// adding event listeners ===========================================================
document.querySelector('.filterBtn').addEventListener('click', (event) => {
    filter.classList.toggle('filter-show');
});

offerLots.addEventListener('click', ({target}) => {
    const btn = target.closest('.offer-lots-pages-wrapper button');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        clearLots();
        renderLots(lots.data, goToPage);
    }
});

window.onload = getLots;

async function getLots() {
    const href = window.location.href;
    const url = new URL(href);
    const search = url.searchParams.get("search");
    const category = url.searchParams.get("category");
    const searchStorage = localStorage.getItem('search');
    try {
        if (search) {
            lots = await axios.get(`/lotSearch/${search}`);
            console.log(lots.data);
            renderLots(lots.data);
        } else if (searchStorage) {
            let url = window.location.href.split('?');
            window.location.href = url[0] + '?search=' + searchStorage;
            lots = await axios.get(`/lotSearch/${searchStorage}`);
            console.log(lots.data);
            renderLots(lots.data);
        } else if (category){
            lots = await axios.get(`/lotCategory/${category}`);
            console.log(lots.data);
            renderLots(lots.data);
        } else {
            lots = await axios.get(`/lot`);
            console.log(lots.data);
            renderLots(lots.data);
        }
    } catch (error) {
        console.error(error);
    }

    if (searchStorage) {
        localStorage.removeItem('search');
    }
}


// render page =============================================================================

function renderLots(data, page = 1, lotsPerPage = 10) {
    const pages = Math.ceil(data.length / lotsPerPage);
    const lots = data.slice((page - 1) * lotsPerPage, lotsPerPage * page);
    lots.forEach(renderLot);

    renderButtons(page, pages);
}

function renderLot(data) {
    const markup = `
    <div class="offer-lots-item">
        <div class="offer-lots-item-picture">
            <a href="/lot/${data._id}"><img src="${data.image}" alt="${data.title}" ></a>
        </div>
        <div class="offer-lots-item-description">
            <div class="offer-lots-item-description-title">
                <a href="/lot/${data._id}">${data.title}</a>
            </div>
            <div class="offer-lots-item-description-info">
                seller: ${data.seller}
            </div>
            <div class="offer-lots-item-description-price">
                <span>Current price:
                <span class="offer-lots-item-description-price-value">$${data.currentPrice}</span></span>
                <a href="/lot/${data._id}" class="offer-lots-item-description-btn">Details</a>
            </div>
        </div>
    </div>`;

    offerLots.insertAdjacentHTML('afterbegin', markup);
}

function renderButtons(page, pages) {
    let button = '';
    let maxButton = createButton(page, 'max', pages);

    if (page === 1 && pages > 1) {
        button = `
            ${createButton(page, 'current')} of
            ${maxButton}
            ${createButton(page, 'next')}`;
    } else if (page === pages && pages > 1) {
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'current')} of
            ${maxButton}`;
    } else if (page < pages) {
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'current')} of
            ${maxButton}
            ${createButton(page, 'next')}`;
    }
    const markup = `
    <div class="offer-lots-pages">
        <div class="offer-lots-pages-wrapper">
            ${button}
        </div>
    </div>`;

    offerLots.insertAdjacentHTML('beforeend', markup);
}
// <button class="offer-lots-pages-prev">prev</button>
// <button class="offer-lots-pages-current">1</button> from 
// <button class="offer-lots-pages-max">5</button> 
// <button class="offer-lots-pages-next">next</button>
function createButton(page, type, pages) {
    let markup;
    if (type == 'next' || type === 'prev') {
        markup = `
        <button class="offer-lots-pages-${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
            Page ${type === 'prev' ? page - 1 : page + 1}
        </button>`;
    } else {
        markup = `
        <button class="offer-lots-pages-${type}" data-goto=${type === 'current' ? page : pages}>
            ${type === 'current' ? page : pages}
        </button>`;
    }
    return markup;
}

function clearLots() {
    offerLots.innerHTML = '';
}