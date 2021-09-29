const loader = document.getElementById('loader');

function showLoader()  {
    loader.classList.add('active');
}

function hideLoader()  {
    setTimeout(() => {
        loader.classList.remove('active');
    }, 500)
}

export { showLoader, hideLoader }
