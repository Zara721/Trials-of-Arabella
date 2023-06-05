class Ending {
    constructor({ endingImgSrc, endingTextContent, character, trait, onComplete }) {
      this.endingImgSrc = endingImgSrc;
      this.endingTextContent = endingTextContent;
      this.character = character;
      this.trait = trait;
      this.onComplete = onComplete;
    }
  
    draw() {
      const container = document.createElement("div");
      container.className = "endingContainer";
    
      const image = document.createElement("img");
      image.className = "endingImg";
      image.src = this.endingImgSrc;
      container.appendChild(image);
    
      const text = document.createElement("p");
      text.className = "endingText";
      text.textContent = this.endingTextContent;
      container.appendChild(text);
    
      const resetButton = document.createElement("button");
      resetButton.textContent = "Reset the Story";
      resetButton.className = "resetButton";
      container.appendChild(resetButton);
    
      resetButton.addEventListener("click", () => {
        this.resetStory();
      });
      resetButton.addEventListener("mouseover", () => {
        resetButton.classList.add("hover");
      });
      resetButton.addEventListener("mouseout", () => {
        resetButton.classList.remove("hover");
      });
    
      this.container = container;
    
      // Add the 'show' class to trigger the fade-in effect
      requestAnimationFrame(() => {
        this.container.classList.add('show');
        window.storyState.unlockTrait(this.trait, this.character);
        window.storyState.achieveEnding(this.endingTextContent);
      });
    }
    
    resetStory() {
      // Remove the 'show' class to trigger the fade-out effect
      this.container.classList.remove('show');
    
      // Wait for the fade-out effect to finish before removing the element
      setTimeout(() => {
        this.onComplete();
        utils.emitEvent("ResetStory");
        this.container.remove();
      }, 300);
    }
    
  
    init(container) {
      this.draw();
      container.appendChild(this.container);
    }
  }
  
  