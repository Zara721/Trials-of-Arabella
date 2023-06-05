class PovScreen {
    constructor(element, initialTraits, unlockedTraits, storyBranches) {
        this.element = element;
        this.element.classList.add("pov-screen");
        this.initialTraits = initialTraits;
        this.unlockedTraits = unlockedTraits;
        this.checkboxes = [];

        this.storyState = window.storyState;
        this.storyBranches = storyBranches;
    }
    
    generateTraitCheckboxes(character) {
        return this.unlockedTraits[character]
            .map((trait) => {
            const isChecked = this.storyState.characterTraits[character] === trait;
            return `<label class="trait-label"><input type="radio" name="${character}" class="trait-radio" value="${trait}"${isChecked ? ' checked' : ''}><span>${trait}</span></label>`;
            })
            .join('');
    }

    selectCharacter(povCharacter) {
      // Remove the PovScreen and the "pov-screen" class
      this.element.innerHTML = '';
      this.element.classList.remove('pov-screen');
  
      const otherCharacters = ['prince', 'heroine', 'count'].filter(character => character !== povCharacter);
      console.log(otherCharacters)

      this.storyBranches.reset({
        povCharacter,
        traits: {
          [otherCharacters[0]]: window.storyState.characterTraits[otherCharacters[0]],
          [otherCharacters[1]]: window.storyState.characterTraits[otherCharacters[1]],
        },
      });
  
      this.storyBranches.startStory();
    }
      
    render() {
        this.element.innerHTML = `
        <div class="endings-counter"></div>
        <h1 class="pov-text">You are <br> <span class="pov-character-name">. . .</span></h1>
        <div class="character-images">
          <img src="images/characters/leonor_prince.png" alt="Prince" class="character-image" data-character="prince">
          <img src="images/characters/arabella_heroine.png" alt="Heroine" class="character-image" data-character="heroine">
          <img src="images/characters/alano_count.png" alt="Count" class="character-image" data-character="count">
        </div>
        <div class="traits">
            <div class="traits traits-prince" data-character="prince">
            ${this.generateTraitCheckboxes('prince')}
            </div>
            <div class="traits traits-heroine" data-character="heroine">
                ${this.generateTraitCheckboxes('heroine')}
            </div>
            <div class="traits traits-count" data-character="count">
                ${this.generateTraitCheckboxes('count')}
            </div>      
        </div>
      `;
  
      this.characterImages = this.element.querySelectorAll(".character-image");
      this.traitRadios = this.element.querySelectorAll(".trait-radio");

      const endingsCounter = this.element.querySelector('.endings-counter');
      const achievedEndingsCount = this.storyState.achievedEndings.length;
      const totalEndingsCount = this.storyState.endings.length;
      endingsCounter.textContent = `${achievedEndingsCount}/${totalEndingsCount} Endings Achieved`;


        this.traitRadios.forEach((radio) => {
        radio.addEventListener("change", (event) => {
            const targetRadio = event.target;
            const characterContainer = targetRadio.closest(".traits");
            const character = characterContainer.dataset.character;
            const trait = targetRadio.value;

            this.storyState.updateCharacterTrait(character, trait);
        });
        });

      this.characterImages.forEach((image) => {
        image.addEventListener("mouseover", (event) => {
          const character = event.target.dataset.character;
          const characterName = character === "heroine" ? "the heroine" : character === "prince" ? "the prince" : "the count";
          const povCharacterNameElement = this.element.querySelector('.pov-character-name');
          povCharacterNameElement.style.opacity = 0;
          setTimeout(() => {
            povCharacterNameElement.textContent = characterName;
            povCharacterNameElement.style.opacity = 1;
          }, 200);
        });
      
        image.addEventListener("mouseout", (event) => {
          const povCharacterNameElement = this.element.querySelector('.pov-character-name');
          povCharacterNameElement.style.opacity = 0;
          setTimeout(() => {
            povCharacterNameElement.textContent = ". . .";
            povCharacterNameElement.style.opacity = 1;
          }, 200);
        });

        image.addEventListener('click', (event) => {
          const povCharacter = event.target.dataset.character;
          this.selectCharacter(povCharacter);
        });
      
      });
      
    }
  }
  