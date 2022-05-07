  // core version + navigation, pagination modules:
  // import Swiper, { Navigation, Pagination } from 'swiper';

  console.log('ok');

  const swiper = new Swiper('.swiper', {
    // // Optional parameters
    // direction: 'vertical',
    // loop: true,
  
    // // If we need pagination
    // pagination: {
    //   el: '.swiper-pagination',
    // },
  
    // // Navigation arrows
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
  
    // // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    },
  );

  let itemSwiper = new Swiper('.history_sliderlist', {});