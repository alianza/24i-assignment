function scrollToTop()  {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToBottom()  {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function scrollIntoView(element)  {
    setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: "center" });
    }, 100)
}


export { scrollToTop, scrollToBottom, scrollIntoView }
