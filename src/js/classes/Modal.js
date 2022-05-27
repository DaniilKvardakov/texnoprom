import axios from "axios";
import $ from 'jquery';
import mask from '../import/maskedinput';


export class Modal {
    constructor(
        selector = '.js-modal') {
        this.selector = selector;
        this.modal = document.querySelector(`.${this.selector}`);
        this.modalInner = document.querySelector(`.${this.selector}-inner`);
        // this.mask = document.querySelector(`.${this.selector}-mask`);
        this.selectorAjaxButton = document.querySelector(`.${this.selector}-button`);
        this.selectorOpenButton = document.querySelectorAll(`.${this.selector}-open`);
        this.selectorCloseButton = document.querySelectorAll(`.${this.selector}-close`);
        this.inputs = document.querySelectorAll(`.${this.selector}-input`);
        this.selectorClose = document.querySelector(`.${this.selector}-close`);
        this.init();
        this.userInfo = {
            name: '',
            phone: '',
            flatId: 0
        }

    }
    init() {
        this.onBlur();
        this.onChange();
        this.onClick();
        this.masked();
    }
    onClick() {
        this.selectorOpenButton.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                this.openModal();
            })
        })
        this.selectorCloseButton.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                this.closeModal();
            })
        })
        this.modal.addEventListener('click', (e) => {
            this.closeModal();
        })
        this.modalInner.addEventListener('click', (e) => {
            e.stopPropagation();
        })
       
        if (!!this.selectorAjaxButton) {
            this.selectorAjaxButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.userInfo.phone = $(`.${this.selector}-phone`).val();
                this.sendAjax();
            })
        }

    }
    onBlur() {
        this.inputs.forEach(item => {
            item.addEventListener('blur', (event) => {
                const value = event.target.value;
                if (event.target.classList.contains(`${this.selector}-name`)) {
                    this.userInfo.name = value;
                }

                if (event.target.classList.contains(`${this.selector}-phone`)) {
                    if (!!/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value)) {
                        this.fixTitle(event.target);
                        this.userInfo.phone = value;
                    } else {
                        this.dropTitle(event.target);
                    }
                }

                if (event.target.classList.contains(`${this.selector}-name`)) {
                    if (value.length > 0) {
                        this.fixTitle(event.target);
                    } else {
                        this.dropTitle(event.target);
                    }
                }
                this.selectorAjaxButton.disabled = false;
            })
        })
    }

    onChange() {
        this.inputs.forEach(item => {
            item.addEventListener('change', (event) => {
                const value = event.target.value;
                if (event.target.classList.contains(`${this.selector}-name`)) {
                    this.userInfo.name = value;
                }

                if (event.target.classList.contains(`${this.selector}-phone`)) {
                    if (!!/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value)) {
                        this.fixTitle(event.target);
                        this.userInfo.phone = value;
                    } else {
                        this.dropTitle(event.target);
                    }
                }

                if (event.target.classList.contains(`${this.selector}-name`)) {
                    if (value.length > 0) {
                        this.fixTitle(event.target);
                    } else {
                        this.dropTitle(event.target);
                    }
                }
                this.selectorAjaxButton.disabled = false;
            })
        })
    }
    fixTitle(item) {
        const input = item;
        input.classList.add('filled');
    }
    dropTitle(item) {
        const input = item;
        input.classList.remove('filled');
    }
    openModal() {
        this.modal.classList.add('active');
        document.body.classList.add('active-modal');
        // this.mask.classList.add('active')
    }
    closeModal() {
        this.modal.classList.remove('active');
        document.body.classList.remove('active-modal');
        // this.mask.classList.remove('active')
    }

    masked() {
        $(`.${this.selector}-phone`).mask("+7 (999) 999-9999");
    }
    sendAjax() {
        event.preventDefault();
        this.validate();

        const phoneError = document.querySelector(`.${this.selector}-phone-error`);
        const nameError = document.querySelector(`.${this.selector}-name-error`);
        const urlPage = window.location.href;
        console.log(this.userInfo);
        if (this.userInfo.name === '') {
            nameError.classList.add('active');

        } else {
            nameError.classList.remove('active');
        }
        if (this.userInfo.phone === '') {
            phoneError.classList.add('active');

        } else {
            phoneError.classList.remove('active');
        }
        if (this.userInfo.phone === '' || this.userInfo.name === '') {
            this.selectorAjaxButton.disabled = true;
            return false;
        }
        nameError.classList.remove('active');
        phoneError.classList.remove('active');


        console.log(
            this.userInfo.name,
            this.userInfo.phone,
            this.userInfo.flatId)

        axios.post("/ajax/form_processing.php", {
                BX_METHOD: "ajax",
                name: this.userInfo.name,
                phone: this.userInfo.phone,
                flatId: this.userInfo.flat,
                urlPage: urlPage,
            })
            .then((response) => {
                this.selectorAjaxButton.disabled = true;
                const modalContentInner = document.querySelector(`.${this.selector}-content-inner`);
                modalContentInner.innerHTML = `<h2 class="black">Ваша заявка успешно отправлена</h2><p>В&nbsp;ближайшее время наш специалист свяжется с&nbsp;вами</p>`
            })
            .catch((error) => {
                this.selectorAjaxButton.disabled = true;
                const errorResultWrapper = document.querySelector(`.${this.selector}-error-result`);
                errorResultWrapper.classList.add('active');
                errorResultWrapper.innerText = 'Возникла ошибка при отправке. Попробуйте еще раз.';
            });
    }




    validate() {
        let regPhone = /^([0-9_\-\+\.\(\)\s])+$/;

        console.log(this.userInfo.phone)
        if (
            this.userInfo.phone === '' ||
            this.userInfo.phone.length < 4 ||
            !regPhone.test(this.userInfo.phone) ||
            this.userInfo.phone.replace(/\s+/g, ' ').trim() == '') {
            this.userInfo.phone = '';
        }
        if (
            this.userInfo.name == '' ||
            this.userInfo.name.length < 2 ||
            this.userInfo.name.replace(/\s+/g, ' ').trim() == ''
        ) {

            this.userInfo.name = '';

        }
    }
}



// Open/close Modal - Done
// Validation 
// Ajax send/response