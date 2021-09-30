function scrollToTop()  { // Scrolls to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollIntoView(element)  { // Scrolls an element to the middle of the screen
    setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: "center" });
    }, 100)
}


export { scrollToTop, scrollIntoView }
