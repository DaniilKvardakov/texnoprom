import axios from "axios";
import mask from '../import/maskedinput';
import $ from "jquery";


export class Form {
    constructor(selector = ".js-form") {
        this.selector = selector;
        this.element = document.querySelector(this.selector);


        this.email = this.element.querySelector('#email');
        this.firstName = this.element.querySelector('#firstName');
        this.lastName = this.element.querySelector('#lastName');
        this.patronymic = this.element.querySelector('#patronymic');
        this.phone = this.element.querySelector('#phone');
        this.themeOfMessage = this.element.querySelector('#theme');
        this.message = this.element.querySelector('#message');
        this.file = this.element.querySelector('#file');
        this.error = this.element.querySelector('#error')
        this.isReadyForUpload = true;


        this.sendAjaxButton = this.element.querySelector('.js-form-send');

        this.userInfo = {};
        this.init();
        
    }
    init() {
        this.fillUserInfo();
        this.addPhoneMask();
        this.onClick();
    }
    onClick() {
        this.sendAjaxButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.collectData();
            this.sendAjax();
        })
    }
    fillUserInfo() {
        if(this.email !== null) this.userInfo["email"] = null;
        if(this.firstName !== null) this.userInfo["firstName"] = null;
        if(this.lastName !== null) this.userInfo["lastName"] = null;
        if(this.patronymic !== null) this.userInfo["patronymic"] = null;
        if(this.phone !== null) this.userInfo["phone"] = null;
        if(this.themeOfMessage !== null) this.userInfo["themeOfMessage"] = null;
        if(this.message !== null) this.userInfo["message"] = null;
        if(this.file !== null) this.userInfo["file"] = null;
    }
    collectData() {
        for(let item in this.userInfo) {
            this.userInfo[item] = this[item].value
        }
    }
    validate() {
        this.validateEmail();
        this.validatePhone();
        this.validateText(["firstName", "lastName", "patronymic", "themeOfMessage", "message"]);
        this.validateFile();
        this.isReadyForUpload = true;
        for(let item in this.userInfo) {
            console.log(this.userInfo[item] === null && item !== "file")
            if(this.userInfo[item] === null && item !== "file") {
                this.isReadyForUpload = false 
            }
        }
        console.log(this.userInfo);
    }
    validateEmail() {
        let regexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let formItem = this.email.parentNode;
        if(this.userInfo["email"] === undefined) {
            return false;
        }
        if(!this.userInfo["email"].match(regexp) || this.phone.length < 2) {
            this.userInfo["email"] = null;
            formItem.classList.add('invalid')
        } else {
            formItem.classList.remove('invalid')
        }
    }
    
    validatePhone() {
        let regexp = /^([0-9_\-\+\.\(\)\s])+$/;
        let formItem = this.phone.parentNode;
        if(this.userInfo["phone"] === undefined) {
            return false;
        }
        if(!this.userInfo["phone"].match(regexp) || this.phone.length < 4) {
            this.userInfo["phone"] = null;
            formItem.classList.add('invalid')
        } else {
            formItem.classList.remove('invalid')
        }
    }
    validateText(properties) {
        let regexp = /^[a-zA-ZА-ЯЁа-яё]+$/;

        for(let item of properties) {
            let formItem = this[item].parentNode;
            if(this.userInfo[item] === undefined) {
                continue;
            }
            if(!this.userInfo[item].match(regexp) || this[item].length < 2 ) {
                this.userInfo[item] = null;
                formItem.classList.add('invalid')
            } else {
                formItem.classList.remove('invalid')
            }
        }
    }
    validateFile() {
        let formData = new FormData();
        let formItem = this["file"].parentNode.parentNode;
        let fileList = this.file.files;
        let nameArr = [];
        let totalSize = 0;
        let sizeLimit = 20;
        
        for(let item of fileList) {
            let mb = (item.size / 1024) / 1024;
            totalSize =+ mb;
            formData.append("files", item)
            nameArr.push(item.name);
        }

        
        if(totalSize > sizeLimit || fileList.length > 20) {
            this.userInfo["file"] = null;
            formItem.classList.add('invalid')
        } else {
            this.userInfo["file"] = formData;
            formItem.classList.remove('invalid');
            if(!!fileList.length) {
                formItem.querySelector('.form__item-text').querySelector('p').textContent = nameArr.join(' ');
            }
        }

        console.log(formData.getAll("files"));
    }
    addPhoneMask() {
        $(`${this.selector} #phone`).mask("+7 (999) 999-9999");
    }
    sendAjax() {
        this.error.classList.remove('active');
        this.validate();
        if(!this.isReadyForUpload) {
            return false;
        }
        axios.post('../ajax/form.php', {
            userInfo: this.userInfo
          })
          .then((response) => {
              this.element.parentNode.innerHTML = `<h2 class="pink">Ваша заявка успешно отправлена!</h2>`
          })
          .catch((response) => {
            this.error.classList.add('active');
          });
    }
} 