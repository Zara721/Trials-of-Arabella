class Scene {
  constructor({ backgroundScr, characterSrc, extraSrc, onComplete }) {
    this.background = new Image();
    this.background.src = backgroundScr;

    const containsCave = this.background.src.includes("cave");
    this.cave = containsCave;

    this.extraSrc = extraSrc;

    this.imagesLoaded = 0;

    this.background.onload = () => {
      this.imagesLoaded++;
      this.tryDraw();
    };

    this.onComplete = onComplete;

    this.container = document.querySelector(".game-container");
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.container.appendChild(this.canvas);
    this.canvas.width = 1024;
    this.canvas.height = 576;

    this.continueButton = null;

    // Create a new Character object and pass in characterSrc
    this.character = new Character({ scene: this, src: characterSrc });
  }

  tryDraw() {
    if (this.imagesLoaded === 1) {
      this.draw();
    }
  }

  draw() {
    this.ctx.drawImage(this.background, 0, 0);

    if (this.extraSrc) {
      const extraImage = new Image();
      extraImage.src = this.extraSrc;
      this.ctx.drawImage(extraImage, 120, 300, 96, 192);
    }

    this.character.sprite.draw(this.ctx);
  }

  createContinueButton() {
    this.continueButton = document.createElement("button");
  
    this.continueButton.textContent = "Continue";
    this.continueButton.classList.add("continueButton");
  
    this.continueButton.style.position = "absolute";
    this.continueButton.style.bottom = "10px";
    this.continueButton.style.right = "10px";
  
    this.continueButton.addEventListener("click", () => {
      this.onComplete();
      this.canvas.remove();
      this.continueButton.remove();
      this.removeInstructionBox();
    });
  
    this.container.appendChild(this.continueButton);
  }
  
  removeInstructionBox() {
    const box = document.querySelector(".instruction-box");
    if (box) {
      box.remove();
    }
  }

  containsCave() {
    const containsCave = this.backgroundSrc.includes("cave");
    return containsCave;
  }
  
  init(container) {
    this.container = container;
  
    // Add a div element for the black box and the text
    const box = document.createElement("div");
    box.classList.add("instruction-box");
    box.textContent = "Use the Arrow Key to Move";
    this.container.appendChild(box);
  
    // Position the box in the center of the canvas
    box.style.top = `${this.canvas.height / 2 - box.offsetHeight / 2}px`;
    box.style.left = `${this.canvas.width / 2 - box.offsetWidth / 2}px`;
  
    this.draw();
    this.createContinueButton();
  
    setInterval(() => {
      // Call the update method of the Character instance
      this.character.update();
      this.draw();
    }, 1000 / 60);
  
    setTimeout(() => {
      this.onComplete();
      this.continueButton.remove();
      this.canvas.remove();
      this.removeInstructionBox();
    }, 20000);
  }  
  
}


