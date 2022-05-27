import { Tab } from "../classes/Tab";
import { Form } from "../classes/Form";
import {gallerySlider} from "../../blocks/components/modal-gallery/modal-gallery"
import {galleryTabs} from "../../blocks/components/modal-gallery/modal-gallery"
import {videoSlider} from "../../blocks/components/modal-video/modal-video"
import { Modal } from "../classes/Modal";
import { Scroll } from "../classes/Scroll";

import {videoTabs} from "../../blocks/components/modal-video/modal-video"
import {videoTabSlider} from "../../blocks/components/modal-video/modal-video"




document.addEventListener("DOMContentLoaded", () => {
    new Scroll();
    new Tab(".js-tab");
    new Form(".js-form");
    
    new Modal("js-modal-gallery");
    new gallerySlider(".js-modal-gallery-slider");
    new galleryTabs(".js-modal-gallery-tab");
    
    new Modal("js-modal-video");
    const video = new videoSlider(".js-modal-video-slider");
    new videoTabs(".js-modal-video-tab", video);
    new videoTabSlider();
})

