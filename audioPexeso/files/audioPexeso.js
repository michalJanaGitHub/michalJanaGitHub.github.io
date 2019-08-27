/*
* All the main logic of the app
*/ //xxx

let app = {};
let fn = {};

// Basic settings
app.set = {};
app.set.minNumberOfSounds = 1;
app.set.maxNumberOfSounds = 25;
app.set.defNumberOfSounds = 18;
app.set.defPlayersList = ['Pat', 'Mat', 'Snowflake'];
app.set.defLanguage = 'ENG';
app.usedSoundsArray = [];
app.cardToSoundArray = [];
app.audioElements = {};

window.onload = () => {
  app.init();
};

/*
* Creating the interface;
*/

app.init = async function () {
  await app.getSettingsFromLocalStorage();
  await app.translateToPreferredLanguage(app.preferredLanguage);
  await app.bindObjectsAndEvents();
  await app.startNewGame();

};

// Translate to preferred language
app.translateToPreferredLanguage = async function (language) {
  for (let key in app.langDictionary) {
    let translation = '';
    for (let lng in app.langDictionary[key]) {
      if (lng === language) {
        translation = app.langDictionary[key][lng];
        document.body.innerHTML = document.body.innerHTML.replace(key, translation);
        document.head.innerHTML = document.head.innerHTML.replace(key, translation);
      }
    }
  }
};

// Binds to button clicks etc
app.bindObjectsAndEvents = async function () {
  app.audioControl1 = document.querySelector('#audioControl1');
  app.audioControl1Source = document.querySelector('#audioControl1 source');
  app.audioElementsContainer = document.querySelector('#audioElementsContainer');

  document.getElementById("btnNewGame").addEventListener('click', app.startNewGame);
  document.getElementById("btnSettings").addEventListener('click', app.changeSettings);
  document.getElementById("btnLangs").addEventListener('click', app.translateClick);
};

// Load settings or default values
app.getSettingsFromLocalStorage = async function () {
  let p;
  p = localStorage.getItem('players');
  app.players = (p !== null) ? p.split(',') : app.set.defPlayersList;
  p = localStorage.getItem('noOfSounds');
  app.noOfSounds = (p !== null) ? p : app.set.defNumberOfSounds;
  if (app.noOfSounds > app.maxNumberOfSounds) app.noOfSounds = app.maxNumberOfSounds;
  p = localStorage.getItem('preferredLanguage');
  app.preferredLanguage = (p !== null) ? p : app.set.defLanguage;
};

// Save settings to browser's local storage
app.saveSettingsToLocalStorage = async function () {
  localStorage.setItem('players', app.players.join(','));
  localStorage.setItem('noOfSounds', app.noOfSounds);
  localStorage.setItem('preferredLanguage', app.preferredLanguage);

};

// After clicking on button change settings
app.changeSettings = function () {
  let min = app.set.minNumberOfSounds;
  let max = app.set.maxNumberOfSounds;
  let promptText = app.langDictionary['#LNG_PleaseEnterNoOfCards'][app.preferredLanguage];
  promptText = promptText.replace('min', min);
  promptText = promptText.replace('max', max);

  let noOfSounds = prompt(
    promptText,
    app.noOfSounds
  );

  if (!(noOfSounds >= min && noOfSounds <= max)) {
    let promptText = app.langDictionary['#LNG_InvalidNoOCards'][app.preferredLanguage];
    promptText = promptText.replace('min', min);
    promptText = promptText.replace('max', max);
    alert(promptText);
    return;
  }

  promptText = app.langDictionary['#LNG_PleaseEnterListOfPlayers'][app.preferredLanguage];
  let playersList = prompt(promptText, app.players.join(','));

  if (playersList.trim().length === 0) {
    alert("Wrong entry");
    return;
  }

  app.noOfSounds = noOfSounds;
  app.players = playersList.replace(/, /g, ',').trim().split(',');
  app.saveSettingsToLocalStorage();
  app.startNewGame();
};

// Writes list of players to the left sidebar
app.createScoreBoard = async function () {
  let scoreListDiv = document.getElementById('scoreBoardDiv');
  fn.removeChildren(scoreListDiv);

  let table = document.createElement("table");
  table.setAttribute('id', 'scoreBoardTable');
  let p = app.scoreList;
  let i = 0;
  for (let player of p) {
    let tableRow = table.insertRow();
    if (i === app.playerOnMoveId) tableRow.setAttribute('class', 'playerOnMove');
    let cell = tableRow.insertCell();
    cell.innerHTML = player[0];
    cell = tableRow.insertCell();
    cell.innerHTML = player[1];
    i++;
  }

  scoreListDiv.appendChild(table);
};

// Creates a two dimensional array from app.players
app.createScoreList = async function () {
  app.scoreList = [];
  for (let player of app.players) {
    app.scoreList.push([player, 0]);
  }
  app.scoreList = fn.shuffleArray(app.scoreList);
};

// Returns score list sorted by score
app.scoreListByScore = async function () {
  return app.scoreList.sort((a, b) => { return b[1] - a[1]; });
};

// Creates board with cards
app.createBoard = function (n) {

  let soundBoardDiv = document.querySelector('#soundBoardDiv');
  fn.removeChildren(soundBoardDiv);

  let table = document.createElement("table");
  table.setAttribute('id', 'soundBoard');

  let k = 0;
  let x = Math.floor(Math.sqrt(n));
  if (x !== Math.sqrt(n)) x = x + 1;

  for (let i = 0; i < x; i++) {
    let tableRow = table.insertRow();
    for (let j = 0; j < x; j++) {
      k++;
      let cell = tableRow.insertCell();
      let butt = document.createElement("input");
      butt.setAttribute('type', 'button');
      butt.setAttribute('id', k);
      butt.setAttribute('value', k);
      butt.addEventListener('click', app.cardClick, false);
      cell.appendChild(butt);
      // cell.setAttribute('id', k);
      // cell.innerHTML = k;
      cell.addEventListener('click', app.cardClick, false);
      if (k === n) break;
    }
    if (k === n) break;
  }
  soundBoardDiv.appendChild(table);
};

app.translateClick = function () {
  app.preferredLanguage = this.value;
  app.saveSettingsToLocalStorage();
  location.reload(false);
};

/*
* Play game
*/

// starts a new game
app.startNewGame = async function () {
  app.playerOnMoveId = 0;
  app.noOfPlayers = app.players.length;
  app.firstCardIndex = '';
  app.disableCardClick = false;
  await app.createBoard(app.noOfSounds * 2);
  await app.assignSoundsToCards();
  await app.createScoreList();
  await app.createScoreBoard();
};

// Assigns each sound to two random cards
app.assignSoundsToCards = function () {
  app.usedSoundsArray = fn.shuffleArray(app.soundList).slice(0, app.noOfSounds);

  //load all sounds first sot that one doesnt get this error at first click
  for (let sound of app.usedSoundsArray) { 
    let x = './sounds/' + sound;
    let snd = new Audio();
    snd.src = x;
    snd.load();
}

  let dubSoundsArray = fn.shuffleArray(app.usedSoundsArray.concat(app.usedSoundsArray));
  let i = 0;
  for (let sound of dubSoundsArray) {
    i++;
    app.cardToSoundArray[i] = sound;
  }
};

// After clicking on a card
app.cardClick = async function () {
  if (app.disableCardClick) return;
  app.disableCardClick = true;
  let cardIndex = this.id;
  await app.playChosenCardSound(cardIndex);

  // First trial
  if (app.firstCardIndex === '')
    app.firstCardIndex = cardIndex;
  // Second trial
  else {
    // If the same sound twice
    if (app.cardToSoundArray[cardIndex] === app.cardToSoundArray[app.firstCardIndex] && cardIndex !== app.firstCardIndex) {
      document.getElementById(cardIndex).style.display = 'none';
      document.getElementById(cardIndex).parentNode.style.borderColor = '#d4d4d6';
      document.getElementById(cardIndex).parentNode.style.borderStyle = 'dashed';

      document.getElementById(cardIndex).removeEventListener('click', app.cardClick);
      document.getElementById(app.firstCardIndex).style.display = 'none';
      document.getElementById(app.firstCardIndex).parentNode.style.borderColor = '#d4d4d6';
      document.getElementById(app.firstCardIndex).parentNode.style.borderStyle = 'dashed';

      document.getElementById(app.firstCardIndex).removeEventListener('click', app.cardClick);
      app.scoreList[app.playerOnMoveId][1] += 1;
    }
    else {
      if (app.playerOnMoveId === app.noOfPlayers - 1) app.playerOnMoveId = 0;
      else app.playerOnMoveId += 1;
    }
    app.createScoreBoard();
    app.firstCardIndex = '';
  }
  app.disableCardClick = false;
};

app.playChosenCardSound = async function (cardIndex) {
  let sound = app.cardToSoundArray[cardIndex];
  let err;
  let x = './sounds/' + sound;
  let snd = new Audio();
  snd.src = x;
  snd.load();
  await fn.delay(300);

  let duration;

  duration = snd.duration * 1000;
  if (duration > 5000) duration = 5000;

  snd.play();
  await fn.delay(duration + 50);
  snd.pause();
  snd.currentTime = 0;

  if (duration < 1000) {
    await fn.delay(400);
    snd.play();
  }
};


/*
* General purpose functions
*
*/

fn.removeChildren = function (element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

fn.shuffleArray = function (array) {
  array.sort(() => Math.random() - 0.5);
  return array;
};

// no promisified setTimeout() function
fn.delay = function (ms) {
  var ctr, rej, p = new Promise(function (resolve, reject) {
    ctr = setTimeout(resolve, ms);
    rej = reject;
  });
  p.cancel = function () { clearTimeout(ctr); rej(Error("Cancelled")); };
  return p;
};

/*
* lists and dictionaries
*
*/

app.soundList = [
  'Anhinga-SoundBible.com-430373648.mp3',
  'audio_hero_s-cow-moo.mp3',
  'BBC_horse walking on tarmac.wav',
  'BBC_twin metal squeek.wav',
  'BBC_wolves howl.wav',
  'BBC_woman screeming.wav',
  'Cartoon Enlarge.wav',
  'Cartoon Slip.wav',
  'cartoon-birds-2_daniel-simion.mp3',
  'Crickets-SoundBible.com-1506135086.mp3',
  'Crowd Laugh 5.wav',
  'dixie-horn_daniel-simion.mp3',
  'funny-voices-daniel_simon.mp3',
  'Hoot Owl-SoundBible.com-1079595190.mp3',
  'NFF-clock-ticking.wav',
  'NFF-eggs-popping.wav',
  'NFF-vinyl-scratch-02.wav',
  'NFF-wind-gust.wav',
  'Pew_Pew-DKnight556-1379997159.mp3',
  'poker-chips-daniel_simon.mp3',
  'Sad Trombone 2.wav',
  'tspt_squealing_pig_03_088.mp3',
  'Water Drop Low-SoundBible.com-1501529809.mp3',
  'Waterfall-SoundBible.com-1597727655.mp3',
  'Yelling Yee Ha.wav'
];

app.langDictionary = {
  "#LNG_New game": {
    "ENG": "New game",
    "CZ": "Nová hra"
  },
  "#LNG_Start new game": {
    "ENG": "Start new game",
    "CZ": "Začít novou hru"
  },
  "#LNG_Sett.": {
    "ENG": "Sett.",
    "CZ": "Nast."
  },
  "#LNG_Open dialog with game parameters": {
    "ENG": "Open dialog with game parameters",
    "CZ": "Otevře dialog s parametry hry"
  },
  "#LNG_Change language to Czech": {
    "ENG": "Change language to Czech",
    "CZ": "Změnit jazy na Anglický"
  },
  "#LNG_Score": {
    "ENG": "Score",
    "CZ": "Skóre"
  },
  "#LNG_CZ": {
    "ENG": "CZ",
    "CZ": "ENG"
  },
  "#LNG_Audio memory game": {
    "ENG": "Audio memory game",
    "CZ": "Pexeso nejen pro nevidomé"
  },
  "#LNG_PleaseEnterNoOfCards": {
      "ENG": "Please enter number of pairs of cards (between min and max)",
      "CZ": "Prosím zadejte počet dvojic karet (mezi min a max)"
  },
  "#LNG_PleaseEnterListOfPlayers": {
    "ENG": "Please enter list of players divided  by commas",
    "CZ": "Prosím zadejte seznam hráčů oddělený čárkami"
  },
  "#LNG_InvalidNoOCards": {
    "ENG": "Number of cards must be between min and max",
    "CZ": "Počet karet musí být mezi min a max"
  }
};