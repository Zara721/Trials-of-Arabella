class Character {
    constructor(config) {
        this.scene = config.scene;
        this.x = config.x || 70;
        this.y = config.y || 350;
        this.direction = config.direction || "right";

        this.sprite = new Sprite ({
            character: this,
            src: config.src || "images/characters/Emery.png",
          });

        this.movingProgressRemaining = 0;
        this.directionUpdate = {
            "right": ["x", 1],
            "left": ["x", -1],
          };

        window.addEventListener("keydown", (event) => {
            if (event.key === "ArrowRight") {
              if (this.movingProgressRemaining <= 0) {
                this.movingProgressRemaining = 16;
                this.direction = "right";
              }
            } else if (event.key === "ArrowLeft") {
              if (this.movingProgressRemaining <= 0) {
                this.movingProgressRemaining = 16;
                this.direction = "left";
              }
            }
          });
          
    }

    update() {
        this.updatePosition();
        this.updateSprite();
    }

    updatePosition() {
        if (this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction];
            this[property] += change;
            this.movingProgressRemaining -= 1
        }
    }

    updateSprite() {
        this.sprite.setAnimation("idle-" + this.direction);
    }
}