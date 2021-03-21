const fullMenu = document.querySelector(".nav--full");
const hamburger = document.querySelector(".hamburger");


hamburger.addEventListener('click', e => {
  e.preventDefault();

  if (fullMenu.classList.contains('nav--full__active')) {
    fullMenu.classList.remove('nav--full__active');
    hamburger.classList.remove('hamburger__active');
  } else {
  fullMenu.classList.add('nav--full__active');
  hamburger.classList.add('hamburger__active');
  }
})