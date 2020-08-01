const playerHand = document.querySelectorAll(".player");
const dealerHand = document.querySelectorAll(".dealer");
const startGame = document.querySelector(".shuffle-btn");
const hitBtn = document.querySelectorAll(".hit");
const stayBtn = document.querySelectorAll(".stay");
const doubleBtn = document.querySelectorAll(".double");
const dealCardsBtn = document.querySelector(".deal-cards-btn");
const totalCardsOnTable = document.querySelectorAll("img");
const numberOfDecks = 1;
let deck = [
  "2H",
  "2S",
  "2D",
  "2C",
  "3H",
  "3S",
  "3D",
  "3C",
  "4H",
  "4S",
  "4D",
  "4C",
  "5H",
  "5S",
  "5D",
  "5C",
  "6H",
  "6S",
  "6D",
  "6C",
  "7H",
  "7S",
  "7D",
  "7C",
  "8H",
  "8S",
  "8D",
  "8C",
  "9H",
  "9S",
  "9D",
  "9C",
  "TH",
  "TS",
  "TD",
  "TC",
  "JH",
  "JS",
  "JD",
  "JC",
  "QH",
  "QS",
  "QD",
  "QC",
  "KH",
  "KS",
  "KD",
  "KC",
  "AH",
  "AS",
  "AD",
  "AC",
];
const hideCard = "BLUE_BACK";
let activeDeck = [];
let playerCount = 4;
let newCard;
let newDownCard;

function setActiveDeck() {
  for (let i = 0; i < numberOfDecks; i++) {
    activeDeck.push(deck);
  }
  activeDeck = activeDeck.flat();
  shuffleArray(activeDeck);
  return activeDeck;
}

// Durstenfeld shuffle algorithm
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function dealCards() {
  for (let i = 0; i < 2; i++) {
    for (j = playerHand.length - 1; j >= 0; j -= 1) {
      let dealtCard = activeDeck.shift();
      newCard = document.createElement("img");
      newCard.setAttribute("class", "card");
      newCard.setAttribute("src", `cards/${dealtCard}.svg`);
      newCard.setAttribute("style", "margin-top: 10px;");
      if (playerHand[j].childElementCount > 0) {
        newCard.setAttribute("style", "margin-top: 10px; margin-left: -65px;");
      }
      playerHand[j].appendChild(newCard);
    }
    for (j = dealerHand.length - 1; j > 0; j -= 1) {
      let dealtCard = activeDeck.shift();
      newCard = document.createElement("img");
      newCard.setAttribute("class", "card");
      newCard.setAttribute("src", `cards/${dealtCard}.svg`);
      newCard.setAttribute("style", "margin-top: 10px;");
      if (dealerHand[j].childElementCount > 0) {
        newCard.setAttribute("style", "margin-top: 10px; margin-left: -65px;");
      }
      if (i === 1) {
        newDownCard = document.createElement("img");
        newDownCard.setAttribute("class", "card");
        newDownCard.setAttribute("src", `cards/${hideCard}.svg`);
        newDownCard.setAttribute(
          "style",
          "margin-top: 10px; margin-left: -65px;"
        );
        dealerHand[j].appendChild(newDownCard);
      } else {
        dealerHand[j].appendChild(newCard);
      }
    }
  }
  getValueofCardNonAce();
}

function removeCards() {
  for (let i = 0; i < playerHand.length; i++) {
    if (playerHand[i].children.length > 0) {
      for (let j = playerHand[i].children.length - 1; j >= 0; j--) {
        playerHand[i].removeChild(playerHand[i].children[j]);
      }
    }
  }
  for (let i = 0; i < dealerHand.length; i++) {
    if (dealerHand[i].children.length > 0) {
      for (let j = dealerHand[i].children.length - 1; j >= 0; j--) {
        dealerHand[i].removeChild(dealerHand[i].children[j]);
      }
    }
  }
  newCard = undefined;
  newDownCard = undefined;
}

function unhideDealerDownCard() {
  dealerHand[1].removeChild(newDownCard);
  dealerHand[1].appendChild(newCard);
}

function deckOfCardsIsLow() {
  if (activeDeck.length < 25) {
    activeDeck = [];
    setActiveDeck();
  }
}

let playerOneScore = 0;
let playerTwoScore = 0;
let playerThreeScore = 0;
let playerFourScore = 0;
let dealerScore = 0;
let total = 0;

function getValueofCardNonAce() {
  let cardValue = 0;
  for (let i = 0; i < playerHand[3].children.length; i++) {
    let start = playerHand[3].children[i].getAttribute("src").indexOf("/");
    let end = playerHand[3].children[i].getAttribute("src").indexOf(".");
    let card = playerHand[3].children[i]
      .getAttribute("src")
      .slice(start + 1, end - 1);
    if (card === "K" || card === "Q" || card === "J" || card === "T") {
      cardValue += 10;
    } else if (card === "A") {
      cardValue;
    } else {
      cardValue += parseInt(card);
    }
    if (checkTotalGreaterThanTwentyOne(cardValue)) {
      cardValue = "bust";
      console.log(cardValue);
      return cardValue;
    }
  }
  console.log(cardValue);
  return cardValue;
}

function checkTotalGreaterThanTwentyOne(val) {
  if (val > 21) {
    return true;
  }
}

function hitPlayer() {
  let dealtCard = activeDeck.shift();
  newCard = document.createElement("img");
  newCard.setAttribute("class", "card");
  newCard.setAttribute("src", `cards/${dealtCard}.svg`);
  newCard.setAttribute("style", "margin-top: 10px; margin-left: -65px;");
  playerHand[3].appendChild(newCard);
  getValueofCardNonAce();
  bustPlayer();
}

function playerStay() {
  // move to next player
}

function bustPlayer() {
  if (getValueofCardNonAce() === "bust") {
    hitBtn[3].disabled = true;
    stayBtn[3].disabled = true;
    doubleBtn[3].disabled = true;
  }
}

startGame.addEventListener("click", setActiveDeck);
dealCardsBtn.addEventListener("click", dealCards);
hitBtn[3].addEventListener("click", hitPlayer);
