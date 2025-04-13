let currentIndex = 0;

  function showSlide(index) {
    const slide = document.querySelector('.carousel-slide');
    const totalSlides = document.querySelectorAll('.carousel-slide img').length;
    if (index >= totalSlides) currentIndex = 0;
    else if (index < 0) currentIndex = totalSlides - 1;
    else currentIndex = index;

    const offset = -currentIndex * 100;
    slide.style.transform = `translateX(${offset}%)`;
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  // Auto-play cada 5 segundos
  setInterval(nextSlide, 5000);
