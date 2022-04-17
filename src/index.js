import './styles/styles.less'
import './styles/styles.css'
import slide1 from './assets/img/slide1.svg'
import slide2 from './assets/img/slide2.svg'
import slide3 from './assets/img/slide3.svg'
import Swiper, {Autoplay, Navigation, Pagination} from 'swiper'
import 'swiper/swiper-bundle.css'

Swiper.use([Autoplay, Navigation, Pagination]);
const swiper = new Swiper('.swiper', {

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    loop: true,
    speed: 500,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    }
})