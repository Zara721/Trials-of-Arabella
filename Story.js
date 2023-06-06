class Story {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");

        this.storyBranches = new StoryBranches({ povCharacter: null, traits: {} });
        document.addEventListener("ResetStory", () => {
            const povScreen = new PovScreen(
                document.querySelector(".game-container"),
                window.storyState.characterTraits,
                window.storyState.unlockedTraits,
                this.storyBranches
              );
              povScreen.render();
          });
    }

    startGameLoop() {
        const loop = () => {
        
            this.ctx.imageSmoothingEnabled = false;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
        
        }
        loop();
    }

    async init() {
        const container = document.querySelector(".game-container");

         // Create and initialize the TitleScreen
         this.titleScreen = new TitleScreen();
         await this.titleScreen.init(container);
 
         // Remove the TitleScreen
         this.titleScreen.close();

        // Character Pov screen
        const povScreen = new PovScreen(
            container,
            window.storyState.characterTraits,
            window.storyState.unlockedTraits,
            this.storyBranches
        );
        povScreen.render();

        //Kick off the game
        this.startGameLoop();
    }
}