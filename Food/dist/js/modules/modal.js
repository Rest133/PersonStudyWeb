function modal() {
    //Modal
    const modalElement = document.querySelector('.modal')

    function toggleModal() {
        modalElement.classList.toggle('hide');
        document.body.style.overflow = '';
    }

    document.body.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.hasAttribute('data-modal')) {
            toggleModal();
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimerId);
        }
        if (target && target.hasAttribute('data-close') || target && target === modalElement) {
            toggleModal();
            document.body.style.overflow = '';
        }
    })

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && !modalElement.classList.contains('hide')) {
            toggleModal();
        }
    })

    const modalTimerId = setTimeout(toggleModal, 10000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            toggleModal();
            document.body.style.overflow = 'hidden';
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);

}

module.exports = modal;