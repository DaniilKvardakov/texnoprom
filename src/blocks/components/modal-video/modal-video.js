import Swiper from 'swiper';
import { Slider } from '../../../js/classes/Slider';
import { Tab } from '../../../js/classes/Tab';



export class videoSlider extends Slider {
    constructor(selector = ".js-modal-video-slider") {
        super(selector);
    }
    bindOptions() {
        super.bindOptions({
            speed: 600,
            slidesPerView: 1,
            // loop: true,
            spaceBetween: 20,
            navigation: {
                nextEl: `${this.buttonNext}`,
                prevEl: `${this.buttonPrev}`,
            },
        }) 
    }
}

export class videoTabSlider extends Slider {
    constructor(selector = ".js-modal-video-tab-slider") {
        super(selector);
    }
    bindOptions() {
        super.bindOptions({
            speed: 600,
            slidesPerView: 4,
            // loop: true,
            spaceBetween: 20,
            navigation: {
                nextEl: `${this.buttonNext}`,
                prevEl: `${this.buttonPrev}`,
            },
        }) 
    }
}


export class videoTabs extends  Tab {
    constructor(selector, video) {
        super(selector,video);
    }
    openTab(item) {
        console.log(item);
        this.closeAllTabs();
        let tabId = item.dataset.tab;
        let videoSlide = document.querySelectorAll('.js-modal-video-slider-item')[tabId];
        item.classList.add('active');
        // videoSlide.classList.add('active');

        console.log(this.video.selector[0].swiper.slideTo(tabId));
        // this.video.swiper.slideTo(tabId);
        
    }
    closeTab(item, event)   {    
    }
    closeAllTabs() {
        let videoSlides = document.querySelectorAll('.js-modal-video-slider-item');
        console.log(this.elements);
        this.elements.forEach(item => {
            item.classList.remove('active');
        })
        videoSlides.forEach(item => {
            item.classList.remove('active')
        })
    
    }
    
}


// export const videoSliders = new videoSlider(".js-modal-video-slider");
// export const videoTab = new videoTabs(".js-modal-video-tab", videoSliders); 

