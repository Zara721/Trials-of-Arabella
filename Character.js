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
            "up": ["y", -1],
            "down": ["y", 1],
          };

        this.bounds = {
          top: 380,  //rever revers
          bottom: 280,
          left: 10,
          right: 920,
        };

        window.addEventListener("keydown", (event) => {
          if (event.key === "ArrowRight") {
            this.direction = "right";
            this.isMoving = true;
          } else if (event.key === "ArrowLeft") {
            this.direction = "left";
            this.isMoving = true;
          } else if (event.key === "ArrowUp") {
            this.direction = "up";
            this.isMoving = true;
          } else if (event.key === "ArrowDown") {
            this.direction = "down";
            this.isMoving = true;
          }
        });
    
        window.addEventListener("keyup", (event) => {
          if (
            event.key === "ArrowRight" ||
            event.key === "ArrowLeft" ||
            event.key === "ArrowUp" ||
            event.key === "ArrowDown"
          ) {
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
        // Log current direction and position
        console.log(`Current direction: ${this.direction}`);
        console.log(`Current position: (${this.x}, ${this.y})`);
    
        const [property, change] = this.directionUpdate[this.direction];
        const newPropertyValue = this[property] + change * this.speed;
    
        // Check if new position is outside of bounds
        if (property === "y" && (newPropertyValue < this.bounds.bottom || newPropertyValue > this.bounds.top)) {
          console.log("New position is outside of bounds!");
          return;
        } else if (property === "x" && (newPropertyValue < this.bounds.left || newPropertyValue > this.bounds.right)) {
          console.log("New position is outside of bounds!");
          return;
        }
    
        // Update character's position
        this[property] = newPropertyValue;
      } 
    }
    

    updateSprite() {
      if (this.direction === "right" || this.direction === "left") {
        this.sprite.setAnimation("idle-" + this.direction);
      }
    }
}