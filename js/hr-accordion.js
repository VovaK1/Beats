const color = $('.color');

const openItem = item => {
  item.addClass('color--active');
};

const closeItem = item => {
  item.removeClass('color--active');
}

$(color).hover(function () {
    // over
    openItem($(this));
  }, function () {
    // out
    closeItem($(this));
  }
);