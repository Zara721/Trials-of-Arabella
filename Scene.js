class Scene {
  constructor({ backgroundScr, characterSrc, onComplete }) {
    this.background = new Image();
    this.background.src = backgroundScr;

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
    });
    this.container.appendChild(this.continueButton);
  }

  init(container) {
    this.container = container;
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
    }, 20000);
  }
}

  