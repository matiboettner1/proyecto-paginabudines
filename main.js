const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');

let currentIndex = 0;

function showSlide(index) {
  if (index < 0) {
    currentIndex = slides.length - 1;
  } else if (index >= slides.length) {
    currentIndex = 0;
  }

  const offset = -currentIndex * 100;
  carousel.style.transform = `translateX(${offset}%)`;
}

setInterval(() => {
  currentIndex++;
  showSlide(currentIndex);
}, 3000);

showSlide(currentIndex);