
export class Scroll {
    constructor(selector = 'a[href^="#"]') {
        this.selector = document.querySelectorAll(selector);
        this.init();
    }
    init() {
        this.onClick();
    }
    onClick() {
        console.log(this.selector);
        this.selector.forEach(item => {
            item.addEventListener('click', (e) => {
                console.log('clicked')
                e.preventDefault();
                const id = item.getAttribute('href');
                document.querySelector(id).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            })
        })
    }
 }