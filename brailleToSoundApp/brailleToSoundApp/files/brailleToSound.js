/*
 * All the main logic of the app
 *
 */

let app = {};
app.playSoundPaused = [];
app.defSett = {};
app.defSett.delayBtwSounds = 0;
app.defSett.delayBtwTriples = 750;
app.defSett.delayBtwChars = 1250;
app.defSett.delayBtwWords = 2000;
app.defSett.translationTableZoom = 0.2;


window.onload = () => {
  app.init();
};

// Init
app.init = async function () {
  await app.bindObjects();
  await app.bindEvents();
  await app.getSettingsFromLocalStorage();
  app.assignValuesToSettingsInputs();
  app.triggerInputEvent();
};

function to(promise) {
  return promise.then(data => {
    return [null, data];
  })
    .catch(err => [err]);
}

// no promisified setTimeout() function
function delay(ms) {
  var ctr, rej, p = new Promise(function (resolve, reject) {
    ctr = setTimeout(resolve, ms);
    rej = reject;
  });
  p.cancel = function () { clearTimeout(ctr); rej(Error("Cancelled")); };
  return p;
}

// Shows/hides an element
function toggleElement(el, display = "block") {
  if (el.style.display === "none") {
    el.style.display = display;
  } else {
    el.style.display = "none";

  }
}

function autoGrow(element) {
  element.style.height = "5px";
  element.style.height = (element.scrollHeight) + "px";
}

// converts braille binary string to an array which is later converted into a table
function convertTextToTableArray(txt) {
  txt = txt.toString().replace(/ /g, '');

  let newArray = [[], [], []];
  let r3Count = 1;
  let bitCount = 0;

  for (let i = 0; i < txt.length; i += 3) {

    if (txt.substring(i + 2, i + 3) === 'l') {
      newArray.push([]);
      newArray.push([]);
      newArray.push([]);
      r3Count++;
      continue;
    }
    if (txt.substring(i + 2, i + 3) === 'n') continue;
    newArray[r3Count * 3 - 3].push([parseInt(txt.substring(i, i + 1), 10), bitCount++]);
    newArray[r3Count * 3 - 2].push([parseInt(txt.substring(i + 1, i + 2), 10), bitCount++]);
    newArray[r3Count * 3 - 1].push([parseInt(txt.substring(i + 2, i + 3), 10), bitCount++]);
  }
  return newArray;
}

// converts the array to an html table
function convertArrayToTable(arr) {
  // DRAW HTML TABLE
  let table = document.createElement("table");
  table.setAttribute('id', 'brailleTranslationTable');
  let rowCount = 0;

  for (let arrayRow of arr) {
    let tableRow = table.insertRow();
    let rowBitCount = 0;
    for (let bit of arrayRow) {
      let cell = tableRow.insertCell();
      cell.setAttribute('id', bit[1]);
      cell.innerHTML = '.';
      rowBitCount++;
      if (bit[0] !== 1) cell.setAttribute('class', "colorTransparent");
      if (rowBitCount % 2 === 0) {
        cell = tableRow.insertCell();
        cell.innerHTML = '.';
        cell.setAttribute('class', "colorTransparent");
      }
    }
    rowCount++;
    if (rowCount % 3 === 0) {
      table.insertRow();
    }
  }
  return table;
}

app.triggerInputEvent = function () {
  // triggering input event in the original text area so that the braille translation appears
  let event = new Event('input', {
    'bubbles': true,
    'cancelable': true
  });
  document.getElementById("originalText").dispatchEvent(event);
};

app.playDotSound = async function () {
  app.dotSoundAudioControl.play();
  await delay(app.dotSoundAudioControl.duration * 1000 + 50);
  app.noDotSoundAudioControl.pause();
  app.noDotSoundAudioControl.currentTime = 0;
};

app.playNoDotSound = async function () {
  app.noDotSoundAudioControl.play();
  await delay(app.noDotSoundAudioControl.duration * 1000 + 50);
  app.noDotSoundAudioControl.pause();
  app.noDotSoundAudioControl.currentTime = 0;
};

// Translates text into braille
app.translateText = function (txt) {
  let finalTxt = '';
  let char = '';
  let charTr = '';
  let prevChar = '';
  let txtArr = txt.toUpperCase().split('');

  while (txtArr.length > 0) {
    char = txtArr.splice(0, 1);

    // replacing diacritics
    if (mapDiacritics[char]) {
      char = mapDiacritics[char];
    }

    // character is not a number
    if (!brailleMapNumbers[char]) {
      if (brailleMapNumbers[prevChar]) finalTxt += brailleMapSpecial.numberEnd + ' ';
      charTr = brailleMapLetters[char];
      if (!charTr) charTr = brailleMapSpecial[char];
      if (char.toString().match(/\n/)) charTr = 'nnnlll';
      if (!charTr) charTr = "001010" + ' ';  // asterisk replacing all unknown characters
      finalTxt += charTr + ' ';
    }
    // is a number
    else {
      if (!brailleMapNumbers[prevChar]) finalTxt += brailleMapSpecial.number + ' ';
      finalTxt += brailleMapNumbers[char] + ' ';
    }
    prevChar = char;
  }

  finalTxt = finalTxt.substring(0, finalTxt.length - 1);
  return finalTxt;
};

// plays text from app.remainingTextToPlay variable
app.playText = async function () {
  app.dotSoundAudioControl.load();
  app.noDotSoundAudioControl.load();
  await delay(500);
  let position = app.playSoundPaused[1];
  while (app.remainingTextToPlay.length > 0) {
    if (app.playSoundPaused[0] || app.playSoundStopped) {
      app.playSoundPaused[1] = position;
      break;
    }
    let char = app.remainingTextToPlay.substring(0, 6);
    if (char === '000000' || char === 'nnnlll') await delay(app.delayBtwWords);
    else {
      await app.playCharacter(char, position);
      await delay(app.delayBtwChars);
    }
    app.remainingTextToPlay = app.remainingTextToPlay.substring(6, 99999999999);
    if (char !== 'nnnlll') position += 6;
  }
};

// plays one character of 6 bits
app.playCharacter = async function (char, position) {
  // console.log(position);
  for (let i = 0; i < 6; i++) {
    let bit = char.substring(i, i + 1);
    if (bit === "1") {
      document.getElementById(position + i).style.color = 'green';
      await app.playDotSound();
    }
    else await app.playNoDotSound();

    if (i === 2) await delay(app.delayBtwTriples);
    else await delay(app.delayBtwSounds);
  }
};

app.playAudio = async function () {
  app.playSoundStopped = false;
  app.playSoundPaused[0] = false;
  app.playSoundPaused[1] = 0;
  await app.playText();
};

app.bindObjects = async function () {
  // Identifying important controls and binding them to variables
  app.originalTextInput = document.getElementById("originalText");
  app.binaryTranslation = document.getElementById("binaryTranslation");

  app.btnToggleBrailleTranslation = document.getElementById("btnToggleBrailleTranslation");
  app.brailleTranslationDiv = document.getElementById("brailleTranslationDiv");
  app.btnZoomIn = document.getElementById("btnZoomIn");
  app.btnZoomOut = document.getElementById("btnZoomOut");

  app.dotSoundInput = document.querySelector('#dotSoundInput');
  app.dotSoundAudioControl = document.querySelector('#dotSoundAudioControl');
  app.dotSoundAudioControlSource = document.querySelector('#dotSoundAudioControl source');

  app.noDotSoundInput = document.querySelector('#noDotSoundInput');
  app.noDotSoundAudioControl = document.querySelector('#noDotSoundAudioControl');
  app.noDotSoundAudioControlSource = document.querySelector('#noDotSoundAudioControl source');

  app.delayBtwSoundsInput = document.querySelector('#delayBtwSounds');
  app.delayBtwTriplesInput = document.querySelector('#delayBtwTriples');
  app.delayBtwCharsInput = document.querySelector('#delayBtwChars');
  app.delayBtwWordsInput = document.querySelector('#delayBtwWords');

  app.settingsDiv = document.querySelector('#settingsDiv');
  app.btnToggleSettings = document.querySelector('#btnToggleSettings');
  app.soundControlsDiv = document.querySelector('#soundControlsDiv');
  app.btnToggleSoundControls = document.querySelector('#btnToggleSoundControls');
};

// Binding events to controls
app.bindEvents = async function () {
  document.getElementById("originalText").addEventListener(
    "input", async () => {
      let translatedText = app.translateText(app.originalTextInput.value);
      app.remainingTextToPlay = translatedText.toString().replace(/ /g, '');

      let newArr = convertTextToTableArray(translatedText);
      let brailleTranslationDiv = document.getElementById("brailleTranslationDiv");
      while (brailleTranslationDiv.firstChild) {
        brailleTranslationDiv.removeChild(brailleTranslationDiv.firstChild);
      }
      let table = convertArrayToTable(newArr);
      table.setAttribute('id', 'brailleTranslationTable');

      brailleTranslationDiv.appendChild(table);
      table.style.zoom = app.translationTableZoom;
    }
  );

  document.getElementById("btnPlayAudio").addEventListener(
    "click", () => {
      app.triggerInputEvent();
      app.playAudio();
    }
  );
  document.getElementById("btnPauseAudio").addEventListener(
    "click", async () => {
      if (app.playSoundPaused[0] === false) app.playSoundPaused[0] = true;
      else {
        app.playSoundPaused[0] = false;
        await app.updateSettingsValues();
        await app.playText();
      }
    }
  );
  document.getElementById("btnStopAudio").addEventListener(
    "click", () => {
      app.playSoundStopped = true;
      app.remainingTextToPlay = '';
    }
  );
  app.btnZoomIn.addEventListener(
    "click", () => {
      app.translationTableZoom = app.translationTableZoom * 1.1;
      app.saveSettingsToLocalStorage();
      document.getElementById("brailleTranslationTable").style.zoom = app.translationTableZoom;
    }
  );
  app.btnZoomOut.addEventListener(
    "click", () => {
      app.translationTableZoom = app.translationTableZoom * 0.9;
      app.saveSettingsToLocalStorage();
      document.getElementById("brailleTranslationTable").style.zoom = app.translationTableZoom;
    }
  );

  app.btnToggleBrailleTranslation.addEventListener(
    "click", () => {
      toggleElement(app.brailleTranslationDiv);
      toggleElement(app.btnZoomIn.parentNode);
      if (app.btnToggleBrailleTranslation.getAttribute('aria-pressed') === 'false')
        app.btnToggleBrailleTranslation.setAttribute('aria-pressed', 'true');
      else app.btnToggleBrailleTranslation.setAttribute('aria-pressed', 'false');
    }
  );

  app.soundControlsDiv.style.display = 'none';
  app.btnToggleSoundControls.addEventListener(
    "click", () => {
      toggleElement(app.soundControlsDiv);
      if (app.btnToggleSoundControls.getAttribute('aria-pressed') === 'false' )
        app.btnToggleSoundControls.setAttribute('aria-pressed', 'true');
      else app.btnToggleSoundControls.setAttribute('aria-pressed', 'false');
    }
  );
  app.settingsDiv.style.display = 'none'; // for some reason when doing the css the click only worked for the second time
  app.btnToggleSettings.addEventListener(
      "click", () => {
      toggleElement(app.settingsDiv);
      if (app.btnToggleSettings.getAttribute('aria-pressed') === 'false' )
        app.btnToggleSettings.setAttribute('aria-pressed', 'true');
      else app.btnToggleSettings.setAttribute('aria-pressed', 'false');
    } 
  );
  app.dotSoundInput.addEventListener(
    "change", () => {
      let fileName = app.dotSoundInput.value;
      fileName = fileName.replace(/^.*[\\\/]/, '');
      app.dotSoundAudioControlSource.setAttribute('src', './sounds/' + fileName);
      app.dotSoundAudioControl.load();
    }
  );
  app.noDotSoundInput.addEventListener(
    "change", () => {
      let fileName = app.noDotSoundInput.value.replace(/^.*[\\\/]/, '');
      app.noDotSoundFileName = filename;
      app.saveSettingsToLocalStorage();
      app.noDotSoundAudioControlSource.setAttribute('src', './sounds/' + fileName);
      app.noDotSoundAudioControl.load();
    }
  );
  app.delayBtwSoundsInput.addEventListener('change', app.updateSettingsValues);
  app.delayBtwTriplesInput.addEventListener('change', app.updateSettingsValues);
  app.delayBtwCharsInput.addEventListener('change', app.updateSettingsValues);
  app.delayBtwWordsInput.addEventListener('change', app.updateSettingsValues);

};

app.updateSettingsValues = function () {
  app.dotSoundFileName = app.dotSoundInput.value.replace(/^.*[\\\/]/, '');
  app.noDotSoundFileName = app.noDotSoundInput.value.replace(/^.*[\\\/]/, '');

  app.delayBtwSounds = app.delayBtwSoundsInput.value;
  app.delayBtwTriples = app.delayBtwTriplesInput.value;
  app.delayBtwChars = app.delayBtwCharsInput.value;
  app.delayBtwWords = app.delayBtwWordsInput.value;

  app.saveSettingsToLocalStorage();
};

app.assignValuesToSettingsInputs = function () {
  app.delayBtwSoundsInput.value = app.delayBtwSounds;
  app.delayBtwTriplesInput.value = app.delayBtwTriples;
  app.delayBtwCharsInput.value = app.delayBtwChars;
  app.delayBtwWordsInput.value = app.delayBtwWords;
};

app.getSettingsFromLocalStorage = function () {
  app.dotSoundFileName = localStorage.getItem('dotSoundFileName');
  app.noDotSoundFileName = localStorage.getItem('noDotSoundFileName');
  app.delayBtwSounds = localStorage.getItem('delayBtwSounds');
  app.delayBtwTriples = localStorage.getItem('delayBtwTriples');
  app.delayBtwChars = localStorage.getItem('delayBtwChars');
  app.delayBtwWords = localStorage.getItem('delayBtwWords');
  app.translationTableZoom = localStorage.getItem('translationTableZoom');

  // Default values
  if (app.dotSoundFileName === null)
    app.dotSoundFileName = 'ftus_instrument_drum_small_gamelan_hit_stick_single_001_477.mp3';
  if (app.noDotSoundFileName === null)
    app.noDotSoundFileName = 'ftus_musical_instrument_ching_gamelan_single_hit_001_529.mp3';
  if (app.delayBtwSounds === null) app.delayBtwSounds = app.deffSet.delayBtwSounds;

  if (app.delayBtwTriples === null) app.delayBtwTriples = app.deffSet.delayBtwTriples;
  if (app.delayBtwChars === null) app.delayBtwChars = app.deffSet.delayBtwChars;
  if (app.delayBtwWords === null) app.delayBtwWords = app.deffSet.delayBtwWords;
  if (app.translationTableZoom === null) app.translationTableZoom = app.deffSet.translationTableZoom;
};

app.saveSettingsToLocalStorage = function () {
  localStorage.setItem('dotSoundFileName', app.dotSoundFileName);
  localStorage.setItem('noDotSoundFileName', app.noDotSoundFileName);

  localStorage.setItem('delayBtwSounds', app.delayBtwSounds);
  localStorage.setItem('delayBtwTriples', app.delayBtwTriples);
  localStorage.setItem('delayBtwChars', app.delayBtwChars);
  localStorage.setItem('delayBtwWords', app.delayBtwWords);
  localStorage.setItem('translationTableZoom', app.translationTableZoom);
};

/*
 * Dictionaries:
 *
 */

const mapDiacritics = {
  "Á": "A",
  "É": "E",
  "Ě": "E",
  "Í": "I",
  "Ý": "Y",
  "Ó": "O",
  "Ů": "U",
  "Ú": "U",
  "Ž": "Z",
  "Š": "S",
  "Č": "C",
  "Ř": "R",
  "Ď": "D",
  "Ť": "T",
  "Ň": "N",
};

const brailleMapNumbers = {
  "1": "100000",
  "2": "110000",
  "3": "100100",
  "4": "100110",
  "5": "100010",
  "6": "110100",
  "7": "110110",
  "8": "110010",
  "9": "010100",
  "0": "010110",
};

const brailleMapLetters = {
  "A": "100000",
  "B": "110000",
  "C": "100100",
  "D": "100110",
  "E": "100010",
  "F": "110100",
  "G": "110110",
  "H": "110010",
  "I": "010100",
  "J": "010110",
  "K": "101000",
  "L": "111000",
  "M": "101100",
  "N": "101110",
  "O": "101010",
  "P": "111100",
  "Q": "111110",
  "R": "111010",
  "S": "011100",
  "T": "011110",
  "U": "101001",
  "V": "111001",
  "W": "111011",
  "X": "101101",
  "Y": "101111",
  "Z": "101011",
};

const brailleMapSpecial = {
  ".": "001000",
  ",": "010000",
  "!": "011010",
  "?": "010001",
  ":": "010010",
  ";": "011011",
  "(": "011001",
  ")": "001011",
  "+": "010011",
  "-": "001001",
  "=": "011011",
  "<": "110001",
  ">": "001110",
  '"': "011011",
  "*": "001010",
  "/": "110111",
  "|": "000111",
  " ": "000000",  // space
  "'": "000100",
  "number": "001111",
  "numberEnd": "011000"
};