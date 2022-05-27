import Swiper from 'swiper';
import { Slider } from '../../../js/classes/Slider';
import { Tab } from '../../../js/classes/Tab';



export class gallerySlider extends Slider {
    constructor(selector = ".js-modal-gallery-slider") {
        super(selector);
    }
    bindOptions() {
        super.bindOptions({
            speed: 600,
            slidesPerView: 1,
            loop: true,
            spaceBetween: 20,
            navigation: {
                nextEl: `${this.buttonNext}`,
                prevEl: `${this.buttonPrev}`,
            },
        })
    }
}

export class galleryTabs extends  Tab {
    constructor(selector = ".js-modal-gallery-tab") {
        super(selector);
    }
    openTab(item) {
        this.closeAllTabs();
        let tabId = item.dataset.tab;
        let slidersItems = document.querySelectorAll(".modal-gallery__list");
        let currentSlider = slidersItems[tabId]
        currentSlider.classList.add('active')
        item.classList.add('active');
    }
    closeTab(item, event) {    
        item.preventDefault
    }
    closeAllTabs() {
        let slidersItems = document.querySelectorAll(".modal-gallery__list");
        slidersItems.forEach(item => {
            item.classList.remove('active');
        })
        this.elements.forEach(item => {
            item.classList.remove('active');
        })
    }
}