(function(){
    const form = document.getElementById('searchForm');
    form.addEventListener('submit', event => {
        event.preventDefault();
        let search = document.querySelector('.search-input').value;
        localStorage.setItem("search", search);
        form.submit();
    });
})();