import Swiper, {Navigation, Pagination, Autoplay, EffectFade} from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay, EffectFade]);

export class Slider {
    constructor(selector = '.js-slider', options = {}) {
        this.selector = document.querySelectorAll(selector);
        this.selectorText = selector;
        this.options = options;
        this.buttonNext= `${this.selectorText}-next`;
        this.buttonPrev= `${this.selectorText}-prev`;
        this.instances = [];
        this.init()
    }
    
    init() {
        this.bindOptions({});
        this.selector.forEach(item => {
            new Swiper(item, this.options)
        })
    }

    bindOptions(options) {
        const defaultOptions = {
            slidesPerView: 'auto'
        }
        this.options = { ...this.options, ...defaultOptions, ...options}
    }
    
    syncSliders(slider1, slider2) {
        if(document.querySelector(slider1) == undefined || 
           document.querySelector(slider2) == undefined) {
            return false;
        }
        const slider1Slide = document.querySelector(slider1).swiper;
        const slider2Slide = document.querySelector(slider2).swiper;
        const slider2Items = document.querySelectorAll(`${slider2}-item`);


        let currentSlide1 = slider1Slide.realIndex;
        let currentSlide2 = slider2Slide.realIndex;


        slider2Items.forEach(item => {
            item.addEventListener('click', (e) => {
                if(item.classList.contains('swiper-slide-duplicate-prev') || 
                item.classList.contains('swiper-slide-prev')
                ) {
                    slider2Slide.slidePrev()
                }
                if(item.classList.contains('swiper-slide-duplicate-next') || 
                item.classList.contains('swiper-slide-next')
                ) {
                    slider2Slide.slideNext()
                }
            })
        }); 

        slider1Slide.on('slideChange', function() {
            currentSlide1 = slider1Slide.realIndex;
            slider2Slide.slideToLoop(currentSlide1)
        });

        slider2Slide.on('slideChange', function() {
            currentSlide2 = slider2Slide.realIndex;
            slider1Slide.slideToLoop(currentSlide2)
        });

    }
}