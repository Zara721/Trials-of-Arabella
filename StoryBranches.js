class StoryBranches {
  constructor(config) {
    this.traits = config.traits;
    this.povCharacter = config.povCharacter;

    document.addEventListener("SceneChange", this.handleSceneChange);
  }

  handleSceneChange = () => {
    this.storyBranch = window.storyState.storyBranch;
    this.povCharacter = window.storyState.povCharacter;
    const events = window.StoryBranches[this.povCharacter][this.storyBranch];
    this.startStoryLine(events);
  };

  getStoryEvents() {
    const { povCharacter, traits } = this;
    const otherCharacters = Object.keys(traits);
    const storyKey = `${traits[otherCharacters[0]]}_${traits[otherCharacters[1]]}`;

    // Add console logs to print povCharacter and storyKey
    console.log("povCharacter:", povCharacter);
    console.log("storyKey:", storyKey);

    return window.StoryBranches[povCharacter][storyKey];
  }

  startStory() {
    const events = this.getStoryEvents();
    this.startStoryLine(events);
  }

  async startStoryLine(events) {
    // Loop of async events that awaits for each event to occur
    for (let i = 0; i < events.length; i++) {
      const eventHandler = new StoryEvent({
        event: events[i],
      });
      await eventHandler.init();
    }
  }

  reset(config) {
    this.traits = config.traits;
    this.povCharacter = config.povCharacter;
  }
}

  

window.StoryBranches = {
    heroine: {
      "scheming_unmoved": [
        {type: "narrative", text: "Arabella gazed at her belongings. Her eyes were brimming with hope for a new life alongside her beloved, Alano. <br> Though her parents' opposition weighed heavily on her heart, she remained confident in their eventual understanding. <br>",
         link: "Stifling her remaining hesitation, she left her bedroom behind.",
         linkColor: "#FC9CC7"},
        {type: "scene", backgroundScr: "images/scenes/arabellaRoom_heroine.png",
         characterSrc: "images/characters/arabella_heroine.png"},
        {type: "narrative", text: "'My darling one, you are young and lovely, <br> But inexperienced, and though you think <br> The world is at your feet, <br> It can rise up and tread on you.' <br> <br> As Arabella rode the horse to Eastborne, her father's parting words echoed in her ears.<br>",
         link: "Seeking comfort and warmth, she leaned her head against Alano's chest.",
         linkColor: "#FC9CC7"},
         {type: "narrative", text: "As the sun dipped below the horizon, Arabella felt a knot in her stomach. <br> She placed her hand gently on Alano's shoulder, “May we take a break on the sidewalk.”<br>",
         link: "Alano's worried face was the last thing she saw before everything faded to black.",
         linkColor: "#FC9CC7"},
         {type: "choice", text: "Arabella woke up alone. <br>", 
         choice1: "Squinting her eyes, she could discern a beachside town on the horizon.", 
         choice2: "Examining the ground, she noticed a trail of haphazard footsteps.", linkColor: "#FC9CC7",
         povCharacter: "heroine", nextScene1: "explore", nextScene2: "track"},
         {type: "sceneChange"},
      ],
      "explore": [
        {type: "narrative", text: "Arabella stumbled into the seaside town, weighed down by the heavy air and dreary weather, her mind grappled with the realization that she had been deceived. <br> Having mindlessly secured a room in an inn, she longed to collapse onto the bed and forget her troubles. <br>",
         link: "But her musings were interrupted by a sudden knock at the door.",
         linkColor: "#FC9CC7"},
        {type: "scene", backgroundScr: "images/scenes/attic_heroine.png", 
         characterSrc: "images/characters/arabella_heroine.png"},
        {type: "narrative", text: "Arabella saw a young man in tidy robes gracefully enter the room. <br> 'M'lady, I have heard of your affliction, and as a doctor, I may possess the means to cure your ailment,' he spoke with a gentle tone. <br>",
        link: "If her illness was indeed caused by heartbreak, she could already sense a glimmer of relief washing over her.",
        linkColor: "#FC9CC7"},
        {type: "narrative", text: "Arabella spends her days recovering under the doctors care. <br> One windy sunlit day in spring, the doctor asks her if she'll marry him. <br>",
        link: "She says yes.",
        linkColor: "#FC9CC7"},
        {type: "ending", endingImgSrc: "images/endings/marriage_ring.png", endingTextContent: "Ending: Ignorance is Bliss", character: "heroine", trait: "lovesick"}
      ],
      "track": [
        {type: "narrative", text: "As Arabella followed the trail, the ground beneath her feet grew increasingly rugged and treacherous. <br>",
         link: "She gritted her teeth, gathered her petticoat, and made her way further into the unknown.",
         linkColor: "#FC9CC7"},
        {type: "scene", backgroundScr: "images/scenes/cave_heroine.png", 
         characterSrc: "images/characters/arabella_heroine.png"},
         //change ending image to two graves
         //add clafying narrative for her death
        {type: "ending", endingImgSrc: "images/endings/grave.png", endingTextContent: "Ending: Sadly Ever After", character: "heroine", trait: "devout"}
      ],
      "scheming_enamoured": [
        {type: "narrative", text: "Arabella gazed at her belongings. Her eyes were brimming with hope for a new life alongside her beloved, Alano. <br> Though her parents' opposition weighed heavily on her heart, she remained confident in their eventual understanding. <br>",
         link: "Stifling her remaining hesitation, she left her bedroom behind.",
         linkColor: "#FC9CC7"},
        {type: "scene", backgroundScr: "images/scenes/arabellaRoom_heroine.png",
         characterSrc: "images/characters/arabella_heroine.png"},
        {type: "narrative", text: "'My darling one, you are young and lovely, <br> But inexperienced, and though you think <br> The world is at your feet, <br> It can rise up and tread on you.' <br> <br> As Arabella rode the horse to Eastborne, her father's parting words echoed in her ears.<br>",
         link: "Seeking comfort and warmth, she leaned her head against Alano's chest.",
         linkColor: "#FC9CC7"},
         {type: "narrative", text: "As the sun dipped below the horizon, Arabella felt a knot in her stomach. <br> She placed her hand gently on Alano's shoulder, “May we take a break on the sidewalk.”<br>",
         link: "Alano's worried face was the last thing she saw before everything faded to black.",
         linkColor: "#FC9CC7"},
        // ... events for Heroine when Prince is scheming and Count is enamoured
        {type: "choice", text: "As Arabella gradually opened her eyes, she observed Alano pacing back and forth with a furrowed brow. <br> Adjusting her petticoat, she rose to greet him. <br>", 
         choice1: "Sensing a slight dizziness and noticing Alano's restlessness, Arabella felt it necessary to find a place to rest.", 
         choice2: "Setting aside her weariness, Arabella gently inquired about what was weighing on Alano's mind.", linkColor: "#FC9CC7",
         povCharacter: "heroine", nextScene1: "rest", nextScene2: "inquiry"},
         {type: "sceneChange"},
      ],
      "rest": [
        {type: "narrative", text: "Arabella tugged on Alano's sleeve and gestured towards the seaside town in the distance. 'Shall we take a break before continuing our trek to Eastborne?' <br>",
        link: "Alano agreed.",
        linkColor: "#FC9CC7"},
        {type: "narrative", text: "Arabella and Alano were about to enter a nearby inn when a man clothed in armour came to greet them. <br> The man took Alano aside, and the two seemed to have a heated discussion. <br> After a few minutes, Alano returned to Arabella's side, reassuring her and urging her to secure a room in the inn. <br>",
        link: "Arabella spent the night alone.",
        linkColor: "#FC9CC7"},
        {type: "scene", backgroundScr: "images/scenes/attic_heroine.png",
         characterSrc: "images/characters/arabella_heroine.png"},
        {type: "narrative", text: "In the early hours, Arabella roused from her slumber, her mind plagued with concerns for Alano's wellbeing. <br> With trembling steps, she made her way towards the door, her heart heavy with worry. <br>",
        link: "But before her hand could grasp the doorknob, Arabella was overcome by a sudden bout of cold sweats, forcing her back into bed.",
        linkColor: "#FC9CC7"},
        {type: "narrative", text: "In the early hours, Arabella roused from her slumber, her mind plagued with concerns for Alano's wellbeing. <br> With trembling steps, she made her way towards the door, her heart heavy with worry. <br>",
        link: "Six days later, Arabella took her final breath.",
        linkColor: "#FC9CC7"},
        //change endingImgScr to somthing to do with sickness or just use the grave again
        {type: "ending", endingImgSrc: "images/endings/grave.png", endingTextContent: "Ending: Silent Goodbye", character: "heroine", trait: "devout"}
      ],
      "inquiry": [
        {type: "choice", text: "Alano's brow furrowed. Arabella could feel his hesitancy and reached out to grasp his hand. <br> Her concern seemed to overpower his worriers, and in a hushed tone, Alano explained his predicament.  <br> He needed a rare flower known as Verania to heal his sick mother but was worried that should he leave, Arabella’s health would continue to deteriorate.  <br>", 
         choice1: "Arabella reassured him, expressing her belief in her resilience.", 
         choice2: "Arabella felt confident enough to accompany him on his quest for healing flowers.", linkColor: "#FC9CC7",
         povCharacter: "heroine", nextScene1: "selfCare", nextScene2: "goWithAlano"},
         {type: "sceneChange"},
      ],
      "selfCare": [
        {type: "narrative", text: "Arabella's lone figure cast a long shadow as she watched Alano depart to get the fabled Verania flower. <br>",
        link: "Growing anxious as the sun descended below the horizon, Arabella reluctantly made her way to the nearest town and secured a modest room in the garret.",
        linkColor: "#FC9CC7"},
        {type: "narrative", text: "Arabella dedicated her days to meticulously charting the boat route to Eastborne and preparing for Alano's return. <br> Although her sickness worsened, the prospect of a future alongside Alano gave her strength. <br>",
        link: "Arabella lay waiting for him by the window...",
        linkColor: "#FC9CC7"},
        //make a clock
        {type: "ending", endingImgSrc: "images/endings/clock.png", endingTextContent: "Ending: Waiting Game", character: "heroine", trait: "devout"}

      ],
      "goWithAlano": [
        {type: "narrative", text: "Alano took the lead in exploring the surrounding flora; occasionally, he stopped to mark down notes in his journal. <br>",
        link: "Seeing that he was preoccupied, Arabella made herself comfortable on a nearby tree.",
        linkColor: "#FC9CC7"},
        {type: "narrative", text: "As dusk drew near, the evening chill made Arabella shiver. <br> Alano happened to note her discomfort and suggested that they find a place to stay for the night. <br>",
        link: "Arabella gladly obliged.",
        linkColor: "#FC9CC7"},
        //Try to add the Count to this scene
        {type: "scene", backgroundScr: "images/scenes/attic_heroine.png",
         characterSrc: "images/characters/arabella_heroine.png"},
         {type: "narrative", text: "As the days slipped by, Arabella's body grew weaker, and Alano's search yielded little progress. <br> Bound to the confines of the bed, Arabella spent most of her waking hours in a foggy haze. <br> Six days later, as Arabella took her final breath, Alano knelt by her bedside. <br>",
         link: "Arabella had passed away.",
         linkColor: "#FC9CC7"},
         //change to grave
        {type: "ending", endingImgSrc: "images/endings/grave.png", endingTextContent: "Ending: Tragic Farewell", character: "heroine", trait: "devout"}
      ],
      "soft-hearted_unmoved": [
        {type: "narrative", text: "Arabella gazed at her belongings. Her eyes were brimming with hope for a new life alongside her beloved, Alano. <br> Though her parents' opposition weighed heavily on her heart, she remained confident in their eventual understanding. <br>",
         link: "Stifling her remaining hesitation, she left her bedroom behind.",
         linkColor: "#FC9CC7"},
        {type: "scene", backgroundScr: "images/scenes/arabellaRoom_heroine.png",
         characterSrc: "images/characters/arabella_heroine.png"},
        {type: "narrative", text: "'My darling one, you are young and lovely, <br> But inexperienced, and though you think <br> The world is at your feet, <br> It can rise up and tread on you.' <br> <br> As Arabella rode the horse to Eastborne, her father's parting words echoed in her ears.<br>",
         link: "Seeking comfort and warmth, she leaned her head against Alano's chest.",
         linkColor: "#FC9CC7"},
         {type: "narrative", text: "As the sun dipped below the horizon, Arabella felt a knot in her stomach. <br> She placed her hand gently on Alano's shoulder, “May we take a break on the sidewalk.”<br>",
         link: "Alano's worried face was the last thing she saw before everything faded to black.",
         linkColor: "#FC9CC7"},
        // ... events for Heroine when Prince is soft-hearted and Count is unmoved
        {type: "narrative", text: "Arabella woke to the clattering of a wooden carriage. <br> Beside her, a young man adorned in modest robes introduced himself as Leo, a wandering doctor. <br>",
         link: "Leo explained that he saw her unconscious on the sidewalk. ",
         linkColor: "#FC9CC7"},
         {type: "narrative", text: "As the carriage drew closer to the seaside town, Arabella casually conversed with Leo. <br>",
         link: "With his company, the weight of Alano's abandonment on the sandy shore seemed to fade from Arabella's mind.",
         linkColor: "#FC9CC7"},
         {type: "narrative", text: "Upon arriving in the town, Leo kindly extended an offer for Arabella to stay in his guesthouse. <br> However, Arabella politely declined the offer and opted to book a room in a nearby inn. <br>",
         link: "Arabella and Leo continued to maintain contact.",
         linkColor: "#FC9CC7"},
         {type: "scene", backgroundScr: "images/scenes/attic_heroine.png",
         characterSrc: "images/characters/arabella_heroine.png"},
         {type: "narrative", text: "As time passed, Arabella's affection for Leo deepened, and she began envisioning a future together. <br> One day, during Leo's visit to complete her treatment, Arabella gathered her courage and asked, 'Would you be interested in meeting my parents?' <br>",
         link: "To her delight, Leo said yes.",
         linkColor: "#FC9CC7"},
        {type: "ending", endingImgSrc: "images/endings/marriage_ring.png", endingTextContent: "Ending: My medicinal prince", character: "heroine", trait: "lovesick"}
      ],
      "soft-hearted_enamoured": [
        {type: "narrative", text: "Arabella gazed at her belongings. Her eyes were brimming with hope for a new life alongside her beloved, Alano. <br> Though her parents' opposition weighed heavily on her heart, she remained confident in their eventual understanding. <br>",
         link: "Stifling her remaining hesitation, she left her bedroom behind.",
         linkColor: "#FC9CC7"},
        {type: "scene", backgroundScr: "images/scenes/arabellaRoom_heroine.png",
         characterSrc: "images/characters/arabella_heroine.png"},
        {type: "narrative", text: "'My darling one, you are young and lovely, <br> But inexperienced, and though you think <br> The world is at your feet, <br> It can rise up and tread on you.' <br> <br> As Arabella rode the horse to Eastborne, her father's parting words echoed in her ears.<br>",
         link: "Seeking comfort and warmth, she leaned her head against Alano's chest.",
         linkColor: "#FC9CC7"},
         {type: "narrative", text: "As the sun dipped below the horizon, Arabella felt a knot in her stomach. <br> She placed her hand gently on Alano's shoulder, “May we take a break on the sidewalk.”<br>",
         link: "Alano's worried face was the last thing she saw before everything faded to black.",
         linkColor: "#FC9CC7"},
        // ... events for Heroine when Prince is soft-hearted and Count is enamoured
        {type: "narrative", text: "Arabella awoke to a cool sensation on her forehead; Alano had taken care of her with a damp towel. <br>",
        link: "As their eyes locked, Alano's smile reassured her, and he suggested they find respite in a nearby town, allowing her time to recover fully.",
        linkColor: "#FC9CC7"},
        {type: "narrative", text: "Arabella and Alano secured a garret in a charming inn. <br> Bathed in the warm glow of a flickering candle, they meticulously charted the boat route to Alano's hometown of Eastborne.  <br>",
        link: "As they immersed themselves in each other's company, the darkness of the night seemed to fade away, replaced by the radiance of their shared warmth.",
        linkColor: "#FC9CC7"},
        //make candle
        {type: "ending", endingImgSrc: "images/endings/candle.png", endingTextContent: "Ending: Kindled Dreams", character: "heroine", trait: "devout"}
      ],
    },
    prince: {
      "lovesick_unmoved": [
        {type: "narrative", text: "Prince Leonor's guard, Lucien, entered his study with urgent news - a remaining lineage of the royal line had been found. <br> Contemplating his status as an illegitimate prince, Leonor realized that his secret could not remain hidden indefinitely. <br>",
        link: "Prince Leonor instructed Lucien to conduct a more thorough investigation.",
        linkColor: "#A2D4EF"},
        {type: "scene", backgroundScr: "images/scenes/arabellaRoom_prince.png",
         characterSrc: "images/characters/guard_prince.png"},
        {type: "narrative", text: "Further investigation led Lucien to Arabella's estate, where he discovered and perused her private diary. <br> Returning to Prince Leonor, Lucien revealed Arabella's intention to elope with a foreign count. <br>",
        link: "Stirred by the instability of his position, Prince Leonor devised a plan to marry Arabella and secure his claim to the throne.",
        linkColor: "#A2D4EF"},
        {type: "narrative", text: "Dispatching Lucien to investigate the count, the guard uncovered the count's relentless pursuit of the elusive flower of Verania, spending vast sums of money in the process. With this knowledge, Prince Leonor sought to leverage the flower to convince Count Alano to leave Arabella. <br>",
        link: "Prince Leonor and Lucien shadowed the couple, waiting for the opportune moment to intervene.",
        linkColor: "#A2D4EF"},
        {type: "narrative", text: "Witnessing Arabella's collapse, Prince Leonor, accompanied by Lucien, approached Count Alano, ready to negotiate. <br> Prince Leonor divulged his extensive knowledge of the flower of Verania's whereabouts in the surrounding areas, accompanied by a solemn warning that its fleeting blooming season would conclude tomorrow at the stroke of midnight. <br>",
        link: "The count, after a brief moment of contemplation, made a decisive turn as if to depart.",
        linkColor: "#A2D4EF"},
        {type: "narrative", text: "However, he abruptly halted, fixing his gaze upon Prince Leonor, 'Can you assure me of her safety?' <br> Prince Leonor responded with his trademark smile, 'Certainly, I am a gentleman, and I'll even heal her while I'm at it.' <br>",
        link: "A sigh of relief escaped Prince Leonor as he observed the count embarking on his journey toward the cavern that held the fabled flower.",
        linkColor: "#A2D4EF"},
        {type: "choice", text: "", 
         choice1: "Prince Leonor resumed his role as the silent shadow, accompanied by Lucien, ready to watch over the unfolding events.", 
         choice2: "Prince Leonor rubbed his temples and chose to disguise himself as a passing good Samaritan.", linkColor: "#A2D4EF",
         povCharacter: "prince", nextScene1: "inShadows", nextScene2: "fakeSamaritan"},
         {type: "sceneChange"},
      ],
      "inShadows": [

      ],
      "fakeSamaritan": [

      ],
      "lovesick_enamoured": [

      ],  
      "devout_unmoved": [

      ],  
      "devout_enamoured": [

      ],  
    },
    count: {
      "scheming_lovesick": [
        {type: "narrative", text: "Alano purchased a horse from a nearby stable, carefully counting his few coins. <br> As a foreign Count, he had learned the importance of frugality. <br>",
        link: "Most of his expenses were dedicated to hiring adventurers to seek information about the elusive flower of Verania.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "The longer he stayed in Pachandale, the more Alano's hope of finding the fabled Verania flower to heal his ailing mother dwindled. <br> Yet, the thought of returning to his homeland with his lover, Arabella, offered him some solace. <br>",
        link: "Alano rode his stallion to Arabella's estate, patiently awaiting her arrival.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "Under the warm noon sun, Alano spotted Arabella hurrying out through the estate's front gate. <br> He gently pulled the horse's reins, guiding it toward her. <br> Arabella nestled against his chest, and Alano thought he had made the right choice bringing her on this journey. <br>",
        link: "Together, they set off into the distance.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "The jolting of the horse seemed to take a toll on Arabella, prompting Alano to secure the reins to a nearby tree and continue on foot. <br>As the evening began to settle in, Alano felt Arabella hand on his shoulder, 'May we take a break on the sidewalk.' <br>",
        link: "Before Alano could gather his thoughts, Arabella collapsed into his arms, unconscious.",
        linkColor: "#C4A2EF"},
        {type: "choice", text: "A young man in lavish attire, accompanied by a robust figure clad in armor, approached Alano and the frail Arabella. <br> He revealed that the elusive flower of Verania, which Alano sought desperately to heal his ailing mother, could be found within an offshore cavern. <br> Crucially, he added that the flower's blooming season would end by midnight the next day. <br>", 
         choice1: "Hope for his mother's recovery made Alano steadfast in his decision.", 
         choice2: "Alano's gaze couldn't bear to part with the vulnerable Arabella.", linkColor: "#C4A2EF",
         povCharacter: "count", nextScene1: "chooseFlower_lovesick", nextScene2: "chooseLover_lovesick"},
         {type: "sceneChange"},
      ],
      "chooseFlower_lovesick": [
        {type: "narrative", text: "Alano embarked on his journey towards the cavern, but before he ventured further, he cast a glance at the enigmatic young man, 'Can you assure me of her safety?' <br> 'Certainly, I <i> am </i> a gentleman, and I'll even heal her while I'm at it.' <br>",
        link: "With those words to ease his heart, Alano resolutely continued his path, delving deeper into the unknown.",
        linkColor: "#C4A2EF"},
        {type: "scene", backgroundScr: "images/scenes/cave_count.png", 
         characterSrc: "images/characters/alano_count.png"},
        {type: "narrative", text: "The cavern exuded a damp and earthy scent, with each drip and howl reverberating through the walls. <br> With a firm grip on the rough map he had received, Alano compelled himself to navigate deeper into the intricate cave system. <br>",
        link: "And there, at the very heart of the cave, his eyes caught sight of Verania's unmistakable purple glow.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "As he trembling hand reached out towards its petals, Alano felt a sharp and searing pain in his chest. <br> His body convulsed, and he collapsed onto the ground, his eyes fixed on the cherished flower before him. <br> As his consciousness faded, Alano could barely discern a faint voice uttering, '...sorry... but just to be sure.' <br>",
        link: "With his final breath, Alano succumbed to the darkness.",
        linkColor: "#C4A2EF"},
        {type: "ending", endingImgSrc: "images/endings/grave.png", endingTextContent: "Ending: So close, yet so far", character: "count", trait: "unmoved"}
      ],
      "chooseLover_lovesick": [
        {type: "narrative", text: "Despite the uneasiness gnawing at him, Alano pushed aside his concerns and focused on tending to the ailing Arabella. <br> However, his restlessness grew evident as he paced back and forth, unable to shake off his worries. <br>",
        link: "As Arabella stirred awake, she noticed Alano's inner turmoil and suggested they seek refuge in a nearby town.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "Upon reaching the inn, the armored man who had been trailing the young man stepped forward, gesturing towards Alano. <br> Alano braced himself, prepared for confrontation. <br>",
        link: "To his astonishment, the armored man revealed that his lord was a skilled doctor who could heal Arabella's affliction. ",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "Alano realized that his love for Arabella outweighed his pursuit of the elusive flower. <br>",
        link: "With newfound hope, he agreed to meet the traveling doctor, willing to take the risk for Arabella.",
        linkColor: "#C4A2EF"},
        {type: "scene", backgroundScr: "images/scenes/beach_count.png", 
        characterSrc: "images/characters/alano_count.png"},
        {type: "narrative", text: "The traveling doctor promised to heal Arabella on the condition that Alano signs a blood contract, forever severing his connection with her. <br> Alano's heart resisted such a sacrifice, and he adamantly refused the offer. <br>",
        link: "Undeterred, the doctor emphasized that he was the only man in Pachandale who could heal her.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "Reluctantly, Alano decided to stay a few days and engage in negotiations. <br> After intense deliberations, Alano begrudgingly signed the blood contract. <br> However, he insisted on a single request—to bid Arabella farewell before his departure. <br>",
        link: "With ghosts in their hearts, the group returned to the inn.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "But as they entered her room, their hearts dropped. <br>",
        link: "Arabella lifeless body before them.",
        linkColor: "#C4A2EF"},
        {type: "ending", endingImgSrc: "images/endings/grave.png", endingTextContent: "Ending: Shattered Dreams", character: "count", trait: "enamoured"}
      ],
      "scheming_devout": [
        {type: "narrative", text: "Alano purchased a horse from a nearby stable, carefully counting his few coins. <br> As a foreign Count, he had learned the importance of frugality. <br>",
        link: "Most of his expenses were dedicated to hiring adventurers to seek information about the elusive flower of Verania.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "The longer he stayed in Pachandale, the more Alano's hope of finding the fabled Verania flower to heal his ailing mother dwindled. <br> Yet, the thought of returning to his homeland with his lover, Arabella, offered him some solace. <br>",
        link: "Alano rode his stallion to Arabella's estate, patiently awaiting her arrival.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "Under the warm noon sun, Alano spotted Arabella hurrying out through the estate's front gate. <br> He gently pulled the horse's reins, guiding it toward her. <br> Arabella nestled against his chest, and Alano thought he had made the right choice bringing her on this journey. <br>",
        link: "Together, they set off into the distance.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "The jolting of the horse seemed to take a toll on Arabella, prompting Alano to secure the reins to a nearby tree and continue on foot. <br>As the evening began to settle in, Alano felt Arabella hand on his shoulder, 'May we take a break on the sidewalk.' <br>",
        link: "Before Alano could gather his thoughts, Arabella collapsed into his arms, unconscious.",
        linkColor: "#C4A2EF"},
        {type: "choice", text: "A young man in lavish attire, accompanied by a robust figure clad in armor, approached Alano and the frail Arabella. <br> He revealed that the elusive flower of Verania, which Alano sought desperately to heal his ailing mother, could be found within an offshore cavern. <br> Crucially, he added that the flower's blooming season would end by midnight the next day. <br>", 
         choice1: "Hope for his mother's recovery made Alano steadfast in his decision.", 
         choice2: "Alano's gaze couldn't bear to part with the vulnerable Arabella.", linkColor: "#C4A2EF",
         povCharacter: "count", nextScene1: "chooseFlower_devout", nextScene2: "chooseLover_devout"},
         {type: "sceneChange"},
         // ... unique events for the configuration
      ],
      "chooseFlower_devout": [
        {type: "narrative", text: "Alano embarked on his journey towards the cavern, but before he ventured further, he cast a glance at the enigmatic young man, 'Can you assure me of her safety?' <br> 'Certainly, I <i> am </i> a gentleman, and I'll even heal her while I'm at it.' <br>",
        link: "With those words to ease his heart, Alano resolutely continued his path, delving deeper into the unknown.",
        linkColor: "#C4A2EF"},
         // ... unique events for the configuration
        {type: "scene", backgroundScr: "images/scenes/cave_count.png", 
        characterSrc: "images/characters/alano_count.png"},
        {type: "narrative", text: "As the Count ventured deeper into the cave, his senses heightened, and he became acutely aware of footsteps echoing behind him. <br> Alano suspected that the young man had sent someone to trail him. <br>",
        link: "Determined to outwit his pursuer, he deliberately chose convoluted paths, which led him deeper into the cavern.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "The Count's eyes fell upon a sturdy stalactite, its jagged edges serving as a potential weapon of defense. <br> Gripping it tightly, he steeled himself for an impending encounter. <br>",
        link: "Suddenly, a blood-curdling scream pierced the air - it resembled Arabella's voice.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "Shock and adrenaline coursed through Alano's veins as he abandoned caution and sprinted through the cavern. <br>",
        link: "His heart pounding in his chest, he stumbled upon a devastating sight—Arabella's lifeless body, impaled by a vicious sword.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "Driven by a mixture of rage and grief, the Count set upon tracking down the perpetrator. <br> Tracing the faint trails of blood, the traces led him to a concealed assailant lying in wait. <br>",
        link: "Seizing the opportunity, Alano launched a fierce ambush, overpowering the armed adversary in a desperate struggle",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "Alano mustered his remaining strength and dragged himself toward the Verania flower. <br> With trembling hands and faltering breath, he forced the bud into his mouth. <br>",
        link: "Exhausted and on the brink of unconsciousness, he collapsed, leaving his fate up to chance.",
        linkColor: "#C4A2EF"},
        {type: "ending", endingImgSrc: "images/endings/flower.png", endingTextContent: "Ending: Into the unknown", character: "count", trait: "unmoved"}

      ],
      "chooseLover_devout": [
        {type: "narrative", text: "Despite the uneasiness gnawing at him, Alano pushed aside his concerns and focused on tending to the ailing Arabella. <br> However, his restlessness grew evident as he paced back and forth, unable to shake off his worries. <br> As Arabella stirred awake, she tugged on Alano's sleeve and gestured towards the seaside town in the distance. 'Shall we take a break before continuing our trek to Eastborne?' <br>",
        link: "Alano agreed.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "As they drew near, Arabella's gentle voice broke the silence; her concern etched across her face. <br> Seemingly sensing Alano's unease, she reached out and clasped his hand. <br>",
        link: "Alano opened up and explained his need for the rare Verania flower, the only hope for his ailing mother's recovery, and his worry that his absence would worsen Arabella's already fragile health.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "Arabella reassured him she would be fine and insisted on accompanying him to search for the elusive flowers. <br>",
        link: "Together, they traversed the landscape, seeking the healing blooms.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "The day turned to night, and the search yielded little results. <br> As the sun descended, casting long shadows upon their weary figures, Alano decided to call off the search for the day. <br>",
        link: "Weary and disheartened, they made their way back to a humble inn.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "As the days passed, Arabella's fragile body grew weaker, her vitality waning with every breath. <br> Six agonizing days later, surrounded by Alano's unwavering presence, Arabella succumbed to her illness. <br>",
        link: "With a pale and weary visage, Alano held her lifeless form; his heart ached with a profound sense of loss and regret.",
        linkColor: "#C4A2EF"},
        {type: "ending", endingImgSrc: "images/endings/grave.png", endingTextContent: "Ending: Unfortunate Demise", character: "count", trait: "enamoured"}
      ],
      "soft-hearted_lovesick": [
        {type: "narrative", text: "Alano purchased a horse from a nearby stable, carefully counting his few coins. <br> As a foreign Count, he had learned the importance of frugality. <br>",
        link: "Most of his expenses were dedicated to hiring adventurers to seek information about the elusive flower of Verania.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "The longer he stayed in Pachandale, the more Alano's hope of finding the fabled Verania flower to heal his ailing mother dwindled. <br> Yet, the thought of returning to his homeland with his lover, Arabella, offered him some solace. <br>",
        link: "Alano rode his stallion to Arabella's estate, patiently awaiting her arrival.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "Under the warm noon sun, Alano spotted Arabella hurrying out through the estate's front gate. <br> He gently pulled the horse's reins, guiding it toward her. <br> Arabella nestled against his chest, and Alano thought he had made the right choice bringing her on this journey. <br>",
        link: "Together, they set off into the distance.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "The jolting of the horse seemed to take a toll on Arabella, prompting Alano to secure the reins to a nearby tree and continue on foot. <br>As the evening began to settle in, Alano felt Arabella hand on his shoulder, 'May we take a break on the sidewalk.' <br>",
        link: "Before Alano could gather his thoughts, Arabella collapsed into his arms, unconscious.",
        linkColor: "#C4A2EF"},
        {type: "choice", text: "A young man in lavish attire approached Alano and the frail Arabella. <br> He revealed that the elusive flower of Verania, which Alano sought desperately to heal his ailing mother, could be found within an offshore cavern. <br> Crucially, he added that the flower's blooming season would end by midnight the next day. <br>", 
        choice1: "Hope for his mother's recovery made Alano steadfast in his decision.", 
        choice2: "Alano's gaze couldn't bear to part with the vulnerable Arabella.", linkColor: "#C4A2EF",
        povCharacter: "count", nextScene1: "chooseFlower_SHlovesick", nextScene2: "chooseLover_SHlovesick"},
        {type: "sceneChange"},
      ],
      "chooseFlower_SHlovesick": [
        {type: "narrative", text: "With a heavy heart, Alano turned away from Arabella, preparing to depart. <br> At that moment, the young man's disdainful scoff pierced the air, 'So that's all your love is worth…' <br>",
        link: "Tightening his knuckles, Alano steeled his resolve and headed toward the cavern.",
        linkColor: "#C4A2EF"},
        {type: "scene", backgroundScr: "images/scenes/cave_count.png", 
        characterSrc: "images/characters/alano_count.png"},
        {type: "narrative", text: "The air inside the cavern was heavy, filled with an eerie stillness that mirrored Alano's unease.  <br>",
        link: "Step by step, he treaded through the dimly lit passages, questioning the reliability of the map he had been given.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "Eventually, Alano reached the sacred flower of Verania. <br> Alano's hand trembled as he carefully uprooted the precious plant, cradling it in his palm. <br>",
        link: "With great care, he placed it inside a cedar box.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "Securing the box within the inner lining of his robes, Alano emerged from the cave. <br>",
        link: "The sun's rays illuminated his path as he set off on the journey back to his hometown of Eastborne.",
        linkColor: "#C4A2EF"},
        {type: "ending", endingImgSrc: "images/endings/flower.png", endingTextContent: "Ending: New Beginnings", character: "count", trait: "unmoved"}
      ],
      "chooseLover_SHlovesick": [
        {type: "narrative", text: "Grateful for the man's valuable information, Alano expressed his sincere appreciation and accepted the offered map. <br>",
        link: "Rather than chasing elusive fantasies, he focused on the present moment, tending to the ailing Arabella.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "As Arabella stirred from her slumber, Alano gently proposed seeking refuge in the neighbouring town, allowing her the necessary time and space to recover.<br>",
        link: "Together, they spent the night mapping out boat routes that would lead them to Alano's hometown.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "Overcome with concern for Arabella's fragile health, Alano confided in her about the mythical Verania flower that held the potential to heal her sickness. <br> Yet, Arabella, holding onto his sleeve, pleaded with him not to leave her alone, at least not on this particular night. <br> ",
        link: "Alano's heart ached with helplessness as he tenderly caressed her forehead, silently vowing to stay by her side for the time being.",
        linkColor: "#C4A2EF"},
        {type: "ending", endingImgSrc: "images/endings/candle.png", endingTextContent: "Ending: Sinking ship", character: "count", trait: "enamoured"}
      ],
      "soft-hearted_devout": [
        {type: "narrative", text: "Alano purchased a horse from a nearby stable, carefully counting his few coins. <br> As a foreign Count, he had learned the importance of frugality. <br>",
        link: "Most of his expenses were dedicated to hiring adventurers to seek information about the elusive flower of Verania.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "The longer he stayed in Pachandale, the more Alano's hope of finding the fabled Verania flower to heal his ailing mother dwindled. <br> Yet, the thought of returning to his homeland with his lover, Arabella, offered him some solace. <br>",
        link: "Alano rode his stallion to Arabella's estate, patiently awaiting her arrival.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "Under the warm noon sun, Alano spotted Arabella hurrying out through the estate's front gate. <br> He gently pulled the horse's reins, guiding it toward her. <br> Arabella nestled against his chest, and Alano thought he had made the right choice bringing her on this journey. <br>",
        link: "Together, they set off into the distance.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "The jolting of the horse seemed to take a toll on Arabella, prompting Alano to secure the reins to a nearby tree and continue on foot. <br>As the evening began to settle in, Alano felt Arabella hand on his shoulder, 'May we take a break on the sidewalk.' <br>",
        link: "Before Alano could gather his thoughts, Arabella collapsed into his arms, unconscious.",
        linkColor: "#C4A2EF"},
        {type: "choice", text: "A young man in lavish attire approached Alano and the frail Arabella. <br> He revealed that the elusive flower of Verania, which Alano sought desperately to heal his ailing mother, could be found within an offshore cavern. <br> Crucially, he added that the flower's blooming season would end by midnight the next day. <br>", 
        choice1: "Hope for his mother's recovery made Alano steadfast in his decision.", 
        choice2: "Alano's gaze couldn't bear to part with the vulnerable Arabella.", linkColor: "#C4A2EF",
        povCharacter: "count", nextScene1: "chooseFlower_SHdevout", nextScene2: "chooseLover_SHdevout"},
        {type: "sceneChange"},
      ],
      "chooseFlower_SHdevout": [
        {type: "narrative", text: "With a heavy heart, Alano turned away from Arabella, preparing to depart. <br> At that moment, the young man's disdainful scoff pierced the air, 'So that's all your love is worth…' <br>",
        link: "Tightening his knuckles, Alano steeled his resolve and headed toward the cavern.",
        linkColor: "#C4A2EF"},
        {type: "scene", backgroundScr: "images/scenes/cave_count.png", 
        characterSrc: "images/characters/alano_count.png"},
        {type: "narrative", text: "As Alano ventured deeper into the cave, a sense of heaviness filled the air, weighing on his chest. <br> His footsteps echoed in the dreary atmosphere, and a lingering unease made him wary of being followed. <br>",
        link: "Alano ended up finding a stalactite that could give him a sense of security.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "To his surprise, as he circled back, he encountered the sound of footsteps approaching. <br> His heart skipped a beat, only to find that his 'stalker' was none other than Arabella. <br> Her presence both relieved and unsettled him, as she confronted him about leaving her alone with a stranger. <br>",
        link: "Alano offered his sincere apologies, emphasizing the flower of Verania. However, Arabella, in no mood to accept his reasoning, stormed off in frustration.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "Though his mood was dampened by the encounter, Alano remained resolute in his purpose. <br>",
        link: "He gathered the precious Verania flower he had sought and embarked on his journey back to his motherland, carrying the weight of his choices and the hope of healing his ailing mother.",
        linkColor: "#C4A2EF"},
        {type: "ending", endingImgSrc: "images/endings/flower.png", endingTextContent: "Ending: A Distant Homecoming", character: "count", trait: "unmoved"}
      ],
      "chooseLover_SHdevout": [
        {type: "narrative", text: "Alano thanked the man for his valuable information and sincerely accepted the map. <br> Instead of pursuing elusive hopes and dreams, Alano focused on cherishing the present moment and caring for the ailing Arabella. <br>",
        link: "When she finally awakened from her slumber, Alano lovingly proposed seeking refuge in the nearby town, allowing Arabella the necessary time to regain her strength.",
        linkColor: "#C4A2EF"},
        {type: "narrative", text: "As the night enveloped them, they immersed themselves in mapping out boat routes to Alano's hometown. <br>",
        link: "Bathed in the gentle glow of candlelight, the darkness of the night seemed to dissolve, giving way to the radiant warmth they found in each other's company.",
        linkColor: "#C4A2EF"},
        {type: "ending", endingImgSrc: "images/endings/candle.png", endingTextContent: "Ending: Kindled Dreams", character: "count", trait: "enamoured"}

      ],
    },
  };
  