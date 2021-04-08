$(document).ready( e => {
  const slider = $('.products__list').bxSlider({
    pager: false,
    controls: false
  });

  $('.products__slider-arrow--prev').click(e => {
    e.preventDefault();

    slider.goToPrevSlide();
  })
  $('.products__slider-arrow--next').click(e => {
    e.preventDefault();

    slider.goToNextSlide();
  })
 })
