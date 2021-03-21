const fullMenu = document.querySelector(".nav--full");
const hamburger = document.querySelector(".hamburger");
fullMenu.style.display = "none";

hamburger.addEventListener('click', e => {
  e.preventDefault();
  
  fullMenu.style.display = 'flex';
})