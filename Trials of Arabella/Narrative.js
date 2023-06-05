class Narrative {
    constructor({ text, link, linkColor, onComplete }) {
      this.text = text;
      this.link = link;
      this.linkColor = linkColor;
      this.onComplete = onComplete;
      this.element = null;
    }
  
    createElement() {
      this.element = document.createElement("div");
      this.element.classList.add("Narrative");
    
      this.element.innerHTML = `
        <p class="Narrative_text">${this.text}</p>
        <span class="Narrative_link" style="color: ${this.linkColor}; cursor: pointer;">${this.link}</span>
      `;
    
      this.element.style.backgroundColor = "black"; // Set the background color to black
      this.element.querySelector(".Narrative_text").style.color = "white"; // Set the regular text color to white
      this.element.querySelector(".Narrative_link").style.color = this.linkColor; // Set the link text color
    
      this.element.querySelector(".Narrative_link").addEventListener("click", () => {
        this.done();
      });
    
      // Add the 'show' class to trigger the fade-in effect
      requestAnimationFrame(() => {
        this.element.classList.add('show');
      });
    }
    
    async done() {
      // Remove the 'show' class to trigger the fade-out effect
      this.element.classList.remove('show');
      
      // Wait for the fade-out effect to finish before removing the element
      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 500);
      });
    
      await this.element.remove();
      this.onComplete();
    }
    
  
    init(container) {
      this.createElement();
      container.appendChild(this.element);
    }    
  }
  