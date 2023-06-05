class Character {
    constructor(config) {
        this.scene = config.scene;
        this.x = config.x || 70;
        this.y = config.y || 350;
        this.direction = config.direction || "right";
    }
}