class StoryState {
    constructor() {
        this.characterTraits = {
            heroine: "lovesick", //traits: responsible, devout, lovesick
            prince: "scheming", //traits: scheming, soft-hearted
            count: "unmoved", //traits: unmoved, enamoured
        };
        this.unlockedTraits = {
            heroine: ["lovesick","responsible", "devout"], //,"responsible", "devout"
            prince: ["scheming", "soft-hearted"], //, "soft-hearted"
            count: ["unmoved", "enamoured"], //, "enamoured"
        }
        this.storyBranch;
        this.povCharacter;
        this.achievedEndings = [];
        this.endings = [
          //Heroine endings
          "Ending: Ignorance is Bliss", "Ending: Sadly Ever After", 
          "Ending: Silent Goodbye", "Ending: Tragic Farewell", "Ending: Waiting Game",
          "Ending: Kindled Dreams", "Ending: My medicinal prince",
          //Prince endings
          "Ending: Lady's Man", "Ending: Dagger behind a Smile",
          //Count endings
          "Ending: So close, yet so far", "Ending: Shattered Dreams", "Ending: Into the unknown",
          "Ending: Unfortunate Demise", "Ending: New Beginnings", "Ending: A Distant Homecoming"
        ];
    }

    updateCharacterTrait(character, trait) {
        if (this.characterTraits.hasOwnProperty(character)) {
          this.characterTraits[character] = trait;
        } else {
          console.error(`Character "${character}" not found in characterTraits.`);
        }
      }
    
    updateStoryBranch(storyBranch, povCharacter) {
       this.storyBranch = storyBranch;
       this.povCharacter = povCharacter;
    }

    unlockTrait(trait, character) {
      if (!this.unlockedTraits[character]) {
        this.unlockedTraits[character] = [];
      }
  
      if (!this.unlockedTraits[character].includes(trait)) {
        this.unlockedTraits[character].push(trait);
      }
    }
  
    hasUnlockedTrait(trait, character) {
      return this.unlockedTraits[character] && this.unlockedTraits[character].includes(trait);
    }

    achieveEnding(endingTextContent) {
      if (!this.achievedEndings.includes(endingTextContent)) {
        this.numEndingsAchieved++;
        this.achievedEndings.push(endingTextContent);
      }
    }
      
}
window.storyState = new StoryState();
