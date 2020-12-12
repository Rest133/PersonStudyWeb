import forms from "./forms";


function toggleModal(modalElement) {
    modalElement.classList.toggle('hide');
    document.body.style.overflow = '';
}

const modalTimerId = setTimeout(toggleModal, 10000);

function modal(modalSelector) {
    const modalElement = document.querySelector(modalSelector);

    document.body.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.hasAttribute('data-modal')) {
            toggleModal(modalElement);
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimerId);
        }
        if (target && target.hasAttribute('data-close') || target && target === modalElement) {
            toggleModal(modalElement);
            document.body.style.overflow = '';
        }
    })

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && !modalElement.classList.contains('hide')) {
            toggleModal(modalElement);
        }
    })


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            toggleModal(modalElement);
            document.body.style.overflow = 'hidden';
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);

}

export default modal;

export {toggleModal};