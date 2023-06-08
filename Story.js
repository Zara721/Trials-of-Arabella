class Story {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
    
        this.introMusic = new Sound("sounds/intro.mp3");
        this.heroineSoundtrack = new Sound("sounds/arabella.mp3");
        this.countSoundtrack = new Sound("sounds/count.mp3");
        this.princeSoundtrack = new Sound("sounds/prince.mp3");
    
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
          this.heroineSoundtrack.stop();
          this.countSoundtrack.stop();
          this.princeSoundtrack.stop();
    
          //play intro music
          this.introMusic.play();
        });
    
        document.addEventListener("HeroineJam", () => {
          //stop playing intro music
          this.introMusic.stop();
          this.countSoundtrack.stop();
          this.princeSoundtrack.stop();
    
          //play heroine music
          this.heroineSoundtrack.play();
        });
    
        document.addEventListener("CountJam", () => {
          //stop playing intro music
          this.introMusic.stop();
          this.heroineSoundtrack.stop();
          this.princeSoundtrack.stop();
    
          //play count music
          this.countSoundtrack.play();
        });
    
        document.addEventListener("PrinceJam", () => {
          //stop playing intro music
          this.introMusic.stop();
          this.heroineSoundtrack.stop();
          this.countSoundtrack.stop();
    
          //play prince music
          this.princeSoundtrack.play();
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