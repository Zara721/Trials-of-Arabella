class Choice {
    constructor({ text, choice1, choice2, linkColor, nextScene1, nextScene2, povCharacter, onComplete }) {
      this.text = text;
      this.choice1 = choice1;
      this.choice2 = choice2;
      this.linkColor = linkColor;
      this.nextScene1 = nextScene1;
      this.nextScene2 = nextScene2;
      this.onComplete = onComplete;
      this.povCharacter = povCharacter;
      this.element = null;

      this.storyState = window.storyState;
    }
  
    createElement() {
      this.element = document.createElement("div");
      this.element.classList.add("Choice");
    
      this.element.innerHTML = `
        <p class="Choice_text">${this.text}</p>
        <span class="Choice_link" style="color: ${this.linkColor}; cursor: pointer;">${this.choice1}</span>
        <span class="Choice_link" style="color: ${this.linkColor}; cursor: pointer;">${this.choice2}</span>
      `;
    
      this.element.querySelector(".Choice_text").style.color = "white"; // Set the regular text color to white
      this.element.querySelectorAll(".Choice_link").forEach(link => {
        link.style.color = this.linkColor;
      });
    
      this.element.querySelectorAll(".Choice_link").forEach(link => {
        link.addEventListener("click", () => {
          if (link.textContent === this.choice1) {
            this.storyState.updateStoryBranch(this.nextScene1, this.povCharacter);
          } else if (link.textContent === this.choice2) {
            this.storyState.updateStoryBranch(this.nextScene2, this.povCharacter);
          }
          this.done();
        });
      });
    
      // Add the 'show' class to trigger the fade-in effect
      requestAnimationFrame(() => {
        this.element.classList.add('show');
      });
    }
    
    done() {
      // Remove the 'show' class to trigger the fade-out effect
      this.element.classList.remove('show');
    
      // Wait for the fade-out effect to finish before removing the element
      setTimeout(() => {
        this.element.remove();
        this.onComplete();
      }, 500);
    }
    
  
    init(container) {
      this.createElement();
      container.appendChild(this.element);
    }
  }
  
