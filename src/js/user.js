window.addEventListener('click', event => {
    
    if (event.target.closest('.confirm')) {
        const conf = confirm('Are you sure?');
        if (!conf) {
            event.preventDefault();
        }
    } else if (event.target.closest('.delete')) {
        const conf = confirm('Are you sure?');
        if (!conf) {
            event.preventDefault();
        }
    }
});