  // core version + navigation, pagination modules:
  // import Swiper, { Navigation, Pagination } from 'swiper';

  console.log('ok');

  const swiper = new Swiper('.mySwiper', {
    pagination: {
      el: ".swiper-pagination",
    },
   });

  let itemSwiper = new Swiper('.history_sliderlist', {});