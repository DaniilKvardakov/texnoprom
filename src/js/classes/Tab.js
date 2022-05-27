export class Tab {
    constructor(selector = ".js-tab", video) {
        this.selector = selector;
        this.elements = document.querySelectorAll(`${this.selector}`);
        this.elementsInner = document.querySelectorAll(`${this.selector}-inner`);
        this.video = video;
        this.init();
    }
    init() {
        this.onClick();
    }
    onClick() {
        console.log(this.elements)
        this.elements.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                console.log(item)
                if(item.classList.contains('active')) {
                    this.closeTab(item);
                } else {
                    this.closeAllTabs();
                    this.openTab(item)
                }
            })
        })
        if(!!this.elements) {
            this.elementsInner.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                })
            })
        }
    }
    openTab(item) {
        item.classList.add('active');
    }
    closeTab(item) {
        item.classList.remove('active');
    }
    closeAllTabs() {
        this.elements.forEach(item => {
            item.classList.remove('active');
        })
    }
}