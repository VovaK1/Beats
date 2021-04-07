const colorTitle = $('.color__title-wrapper');

const mesureWidth = item => {
let reqItemWidth = 0;
const screenWidth = $(window).width();
const container = item.closest('.colors__list');
const titlesBlocks = container.find('.color__title-wrapper');
const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

const textContainer = $('.color__content-block');
const paddingLeft = parseInt(textContainer.css('padding-left'));
const paddingRight = parseInt(textContainer.css('padding-right'));

const isMobile = window.matchMedia("(max-width: 768px)").matches;
if(isMobile) {
  reqItemWidth = screenWidth - titlesWidth;
} else {
  reqItemWidth = 500;
}

return {
  container: reqItemWidth,
  textContainer: reqItemWidth - paddingLeft - paddingRight 
}
};

const closeColors = container => {
  const items = container.find('.color');
  const content = container.find('.color__content')

  content.width(0);
  items.removeClass('active');
}

const openColor = item => {
const hiddenContent = item.find('.color__content');
const textBlock = item.find('.color__content-block');

const reqWidth = mesureWidth(item);
hiddenContent.width(reqWidth.container);
textBlock.width(reqWidth.textContainer);
item.addClass('active');
}

$(colorTitle).on('click', e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest('.color');
  const container = item.closest('.colors__list');
  const itemOpened = item.hasClass('active');

  if(itemOpened) {
    closeColors(container);
  } else {
    closeColors(container);
    openColor(item);
  }
});

$('.color__close').on('click', e => {
  e.preventDefault();

  closeColors($('.colors__list'));
})