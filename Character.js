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
                this.direction = "right";
                this.isMoving = true;
            } else if (event.key === "ArrowLeft") {
                this.direction = "left";
                this.isMoving = true;
            }
          });
          
          window.addEventListener("keyup", (event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              this.isMoving = false;
            }
          });

          this.speed = 2; 
          this.isMoving = false; 
    }

    update() {
        this.updatePosition();
        this.updateSprite();
    }

    updatePosition() {
        if (this.isMoving) {
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change * this.speed;
        }
    }

    updateSprite() {
        this.sprite.setAnimation("idle-" + this.direction);
    }
}