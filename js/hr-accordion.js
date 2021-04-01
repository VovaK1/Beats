const colorTitle = $('.color__title-wrapper');

const mesureWidth = () => {
  return 500;
}

const openColor = item => {
const hiddenContent = item.find('.color__content');

const reqWidth = mesureWidth();
hiddenContent.width(reqWidth);
}

$(colorTitle).on('click', e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest('.color');

  openColor(item);
})