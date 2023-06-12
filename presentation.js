document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    let slideIndex = 0;
  
    function showSlide(index) {
      for (let slide of slides) {
        slide.classList.remove("active");
      }
      slides[index].classList.add("active");
    }
  
    function nextSlide() {
      slideIndex++;
      if (slideIndex >= slides.length) {
        slideIndex = 0;
      }
      showSlide(slideIndex);
    }
  
    function prevSlide() {
      slideIndex--;
      if (slideIndex < 0) {
        slideIndex = slides.length - 1;
      }
      showSlide(slideIndex);
    }
  
    // Show the first slide
    showSlide(slideIndex);
  
    // Add event listeners to the buttons
    prevButton.addEventListener("click", prevSlide);
    nextButton.addEventListener("click", nextSlide);
  });
  