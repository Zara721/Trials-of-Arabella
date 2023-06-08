class Story {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");

        this.introMusic = "sounds/intro.mp3";
        this.heroineSoundtrack = "sounds/arabella.mp3";
        this.countSoundtrack = "sounds/count.mp3";
        this.princeSoundtrack = "sounds/prince.mp3";

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

          document.addEventListener("IntroJam", () => {
            //stop playing any ongoing music
            //play intro music
          });

          document.addEventListener("HeroineJam", () => {
            //stop playing intro music
            //play heroine music
          });

          document.addEventListener("CountJam", () => {
            //stop playing intro music
            //play count music
          });

          document.addEventListener("princeJam", () => {
            //stop playing intro music
            //play prince music
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