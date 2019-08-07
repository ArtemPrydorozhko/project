import './searchPrepare';
import axios from 'axios';

const filter = document.querySelector('.offer-filter');
const offerLots = document.querySelector('.offer-lots');


let lots;

// adding event listeners ===========================================================
document.querySelector('.filterBtn').addEventListener('click', (event) => {
    filter.classList.toggle('filter-show');
});

document.getElementById('offer-header-sort').addEventListener('change', event => {
    const url = new URL(window.location.href);
    url.searchParams.set('sort', event.target.value);
    window.location.href = url.href;
});

document.querySelector('.offer-filter').addEventListener('click', event => {
    if (event.target.closest('.price-btn')) {
        const from = document.querySelector('.price-from').value;
        const to = document.querySelector('.price-to').value;
        const url = new URL(window.location.href);

        if (from) {
            url.searchParams.set('fmin', from);
        } else {
            url.searchParams.delete('fmin');
        }
        if (to) {
            url.searchParams.set('fmax', to);
        } else {
            url.searchParams.delete('fmax');
        }

        if (from && to && from > to)
            return; 
        
        window.location.href = url.href;
    }
});

offerLots.addEventListener('click', ({ target }) => {
    const btn = target.closest('.offer-lots-pages-wrapper button');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        clearLots();
        renderLots(lots.data, goToPage);
    }
});

window.onload = getLots;

async function getLots() {
    const url = new URL(window.location.href);
    const requestUrl = url.href.split('?')[0];

    const searchStorage = sessionStorage.getItem('search');
    if (searchStorage) {
        sessionStorage.removeItem('search');
        window.location.href = requestUrl + '?search=' + searchStorage;
    }

    const search = url.searchParams.get("search");
    const category = url.searchParams.get("category");
    const sort = url.searchParams.get("sort");
    const fmin = url.searchParams.get("fmin");
    const fmax = url.searchParams.get("fmax");


    let request = '';

    if (search) {
        request += '?search=' + search;
    } else if (category) {
        request += '?category=' + category;
        const a = document.createElement('a');
        a.setAttribute('href', `/offer.html?category=${category}`);
        a.textContent = category;
        document.querySelector('.offer-header-breadcrums');
    }

    if (sort) {
        request += (!request ? '?sort=' : '&sort=') + sort;
        document.querySelector(`#offer-header-sort option[value="${sort}"`).setAttribute('selected', 'selected');
    }
    if (fmin) {
        request += (!request ? '?fmin=' : '&fmin=') + fmin;
        document.querySelector('.price-from').value = fmin
    }
    if (fmax) {
        request += (!request ? '?fmax=' : '&fmax=') + fmax;
        document.querySelector('.price-to').value = fmax
    }
    console.log(request);

    try {
        lots = await axios.get(url.origin +'/lot' + request);
        console.log(lots)
        if (lots.data.length)
            renderLots(lots.data);
    } catch (error) {
        console.error(error);
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
                <a href="/lot/${data._id}">${checkTitle(data.title)}</a>
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

    offerLots.insertAdjacentHTML('beforeend', markup);
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

function checkTitle(title) {
    if (title.length > 50) {
        return title.substring(0, 50);
    } else {
        return title;
    }
}