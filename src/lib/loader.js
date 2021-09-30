const loader = document.getElementById('loader');

function showLoader()  { // Displays the loader element
    loader.classList.add('active');
}

function hideLoader()  { // Hides the loader element after a small delay
    setTimeout(() => {
        loader.classList.remove('active');
    }, 500)
}

export { showLoader, hideLoader }
