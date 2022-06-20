let today;
let date;
let time;
let dateTime;

function getTime() {
  setInterval(() => {
    today = new Date();
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    time = today.toLocaleTimeString();
    dateTime = date + " " + time;
    document.getElementById("dateTimeStamp").innerHTML = dateTime;
  }, 1000);
}
getTime();

let randomQuote;
let randomQuoteAuthor;
async function getRandomQuote() {
  await fetch("https://goquotes-api.herokuapp.com/api/v1/random?count=1")
    .then(function (response) {
      return response.json();
    })
    .then(async function (data) {
      document.getElementById("quote").innerHTML = data.quotes[0].text;
      document.getElementById("author").innerHTML =
        "- " + data.quotes[0].author;
    })
    .catch(function (err) {
      console.warn("Something went wrong.", err);
    });
}
getRandomQuote();

function inputTextChange() {
  translateCaeser();
  translateRot13();
  translateVigenere();
}

function translateCaeser() {
  let rotation = document.getElementById("caeserRotation").value;
  let text = document.getElementById("cipherText").value;

  let newString = "";
  if (document.getElementById("caeserEncodeSwitch").checked) {
    newString = encodeCaeser(text, rotation);
  } else {
    newString = decodeCaeser(text, rotation);
  }
  document.getElementById("caeserText").innerHTML = newString;
}

function translateRot13() {
  let text = document.getElementById("cipherText").value;
  let newString = "";
  if (document.getElementById("rot13EncodeSwitch").checked) {
    newString = encodeCaeser(text, 13);
  } else {
    newString = decodeCaeser(text, 13);
  }
  document.getElementById("rot13Text").innerHTML = newString;
}

function translateVigenere() {
  let keyword = document.getElementById("vigenereKeyword").value.toUpperCase();
  let text = document.getElementById("cipherText").value;
  let newString = "";
  if (keyword) {
    if (document.getElementById("vigenereEncodeSwitch").checked) {
      newString = encodeVigenere(text, keyword);
    } else {
      newString = decodeVigenere(text, keyword);
    }
  }
  document.getElementById("vigenereText").innerHTML = newString;
}

const alphabetArray = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

function cipher(letter, rotation) {
  let newLetter = "";
  let capitalLetter = letter.toUpperCase();

  if (alphabetArray.includes(capitalLetter)) {
    let index = (alphabetArray.indexOf(capitalLetter) + +rotation) % 26;
    newLetter =
      letter === capitalLetter
        ? alphabetArray[index]
        : alphabetArray[index].toLowerCase();
  } else {
    newLetter = capitalLetter;
  }
  return newLetter;
}

function decipher(letter, rotation) {
  let newLetter = "";
  let capitalLetter = letter.toUpperCase();

  if (alphabetArray.includes(capitalLetter)) {
    let index = ((alphabetArray.indexOf(capitalLetter) - +rotation) +26) % 26;
    newLetter =
      letter === capitalLetter
        ? alphabetArray[index]
        : alphabetArray[index].toLowerCase();
  } else {
    newLetter = letter;
  }
  return newLetter;
}

function encodeCaeser(text, rotation) {
  let newString = "";

  for (let letter of text) {
    let newLetter = cipher(letter, rotation);
    newString += newLetter;
  }
  return newString;
}

function decodeCaeser(text, rotation) {
  let newString = "";

  for (let letter of text) {
    let newLetter = decipher(letter, rotation);
    newString += newLetter;
  }
  return newString;
}

function encodeVigenere(text, keyword) {
  let newString = "";
  let keywordIndex = 0;

  for (let letter of text) {
    let rotation = alphabetArray.indexOf(keyword[keywordIndex]);
    let newLetter = cipher(letter, rotation);
    keywordIndex = (keywordIndex + 1) % keyword.length;
    newString += newLetter;
  }
  return newString;
}

function decodeVigenere(text, keyword) {
  let newString = "";
  let keywordIndex = 0;

  for (let letter of text) {
    let rotation = alphabetArray.indexOf(keyword[keywordIndex]);
    let newLetter = decipher(letter, rotation);
    keywordIndex = (keywordIndex + 1) % keyword.length;
    newString += newLetter;
  }
  return newString;
}
