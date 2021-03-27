//hamburger

const fullMenu = document.querySelector(".nav--full");
const hamburger = document.querySelector(".hamburger");
const body = document.querySelector('body');


hamburger.addEventListener('click', e => {
  e.preventDefault();

  if (fullMenu.classList.contains('nav--full__active')) {
    fullMenu.classList.remove('nav--full__active');
    hamburger.classList.remove('hamburger__active');
    body.classList.remove('body__scroll');
  } else {
  fullMenu.classList.add('nav--full__active');
  hamburger.classList.add('hamburger__active');
  body  .classList.add('body__scroll');
  }
})

//accordion

const openItem = item => {
  const container = item.closest('.team__member');
  const contentBlock = container.find('.team__member-content');
  const textBlock = contentBlock.find('.team__member-content-block');
  const reqHeight = textBlock.height();


  container.addClass('active');
  contentBlock.height(reqHeight);
};

const closeEveryItem = container => {
  const items = container.find('.team__member-content');
  const itemsContainer = container.find('.team__member');

  itemsContainer.removeClass('active');
  items.height(0);
};

$('.team__member-name').on('click', e => {
  const $this = $(e.currentTarget);
  const container = $this.closest('.team__list');
  const itemContainer = $this.closest('.team__member');

  if (itemContainer.hasClass('active')) {
    closeEveryItem(container);
  } else {
    closeEveryItem(container);
    openItem($this);
  }
})

