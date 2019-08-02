let slideIndex = 0;
const items = document.getElementsByClassName('slider-item');

document.querySelector('.slider-controll-prev').addEventListener('click', prevSlide);
document.querySelector('.slider-controll-next').addEventListener('click', nextSlide);

showSlide(slideIndex);

function nextSlide() {
    slideIndex++;
    showSlide();
}

function prevSlide() {
    slideIndex--;
    showSlide();
}

function showSlide() {
    
    if (slideIndex < 0) {
        slideIndex = items.length - 1;
    } else if (slideIndex >= items.length) {
        slideIndex = 0;
    }

    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('slider-active');
    }

    items[slideIndex].classList.add('slider-active');
}