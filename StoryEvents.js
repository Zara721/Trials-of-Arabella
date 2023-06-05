class StoryEvent{
    constructor({event}) {
        this.event = event;
    }

    narrative(resolve) {
        const narrative =  new Narrative({
          text: this.event.text,
          link: this.event.link,
          linkColor: this.event.linkColor,
          onComplete: () => resolve()
        })
        narrative.init(document.querySelector(".game-container"))
    }

    choice(resolve) {
        const choice =  new Choice({
          text: this.event.text,
          choice1: this.event.choice1,
          choice2: this.event.choice2,
          linkColor: this.event.linkColor,
          nextScene1: this.event.nextScene1,
          nextScene2: this.event.nextScene2,
          povCharacter: this.event.povCharacter,
          onComplete: () => resolve()
        })
        choice.init(document.querySelector(".game-container"))
    }

    scene(resolve) {
      const scene = new Scene({
        backgroundScr: this.event.backgroundScr,
        characterSrc: this.event.characterSrc,
        onComplete: () => resolve()
      });
      scene.init(document.querySelector(".game-container"));
    }    

    sceneChange(resolve) {
      utils.emitEvent("SceneChange");
      resolve()
    }

    ending(resolve) {
      const ending = new Ending({
        endingImgSrc: this.event.endingImgSrc,
        endingTextContent: this.event.endingTextContent,
        character: this.event.character,
        trait: this.event.trait,
        onComplete: () => resolve()
      });
      ending.init(document.querySelector(".game-container"));
    }    

    init() {
        return new Promise(resolve => {
          this[this.event.type](resolve)
        })
    }
}