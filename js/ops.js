const sections = $('section');
const display = $('.maincontent');
const sideMenu = $('.fixed-menu');
const menuItems = sideMenu.find('.fixed-menu__item');

sections.first().addClass('active');

let inScroll = false;

const countSectionPosition = sectionEq => {
  const position = sectionEq * -100;
  if (isNaN(position)) {
    return 0;
  }
  return position;
};

const changeMenuTheme = (sectionEq) => {
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr('data-sidemenu-theme');

  if (menuTheme == 'white') {
    sideMenu.addClass('fixed-menu--white');
  } else {
    sideMenu.removeClass('fixed-menu--white');
  }
};

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = (sectionEq) => {
  if (inScroll == false) {
    inScroll = true;
    const position = countSectionPosition(sectionEq);

    changeMenuTheme(sectionEq);

    display.css({
    transform: `translateY(${position}%)`
  });
  }
  resetActiveClassForItem(sections, sectionEq, 'active' );

  const transitionOver = 1000;
  const mouseInertiaOver = 300;


  setTimeout(() => {
    inScroll = false;
    resetActiveClassForItem(menuItems, sectionEq, 'fixed-menu__item--active');
  }, transitionOver + mouseInertiaOver);
}

const scrollViewport = direction => {
  const activeSection = sections.filter('.active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === "next" && nextSection.length) {
    performTransition(nextSection.index())
  } if (direction === "prev" && prevSection.length) {
    performTransition(prevSection.index())
  }
}

$(window).on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;

  if(deltaY > 0) {
    scrollViewport("next");
  } if (deltaY < 0) {
    scrollViewport("prev");
  }
});

$(window).on('keydown', e => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName == 'input' || tagName == 'textarea';

  if (userTypingInInputs) return;
    switch (e.keyCode) {
      case 40:
        scrollViewport("next");
        break;
      case 38:
        scrollViewport("prev");
        break;
    }

});

$("[data-scroll-to]").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section=${target}]`);

  performTransition(reqSection.index());
});

$("body").swipe( {
  swipe:function(event, direction, ) {
    alert(direction); 
  }
})