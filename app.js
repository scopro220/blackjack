const playerHand = document.querySelectorAll(".player");
const dealerHand = document.querySelector(".dealer");
const startGame = document.querySelector(".shuffle-btn");
const hitBtn = document.querySelectorAll(".hit");
const stayBtn = document.querySelectorAll(".stay");
const doubleBtn = document.querySelectorAll(".double");
const activePlayerHand = document.querySelectorAll(".player-hand-container");
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
const playerCount = 4;
let newCard;
let dealerHiddenCard;
let newDownCard;
let playerOneScore = 0;
let playerTwoScore = 0;
let playerThreeScore = 0;
let playerFourScore = 0;
let dealerScore = 0;

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
      console.log(activeDeck);
    }
    let dealtCard = activeDeck.shift();
    newCard = document.createElement("img");
    newCard.setAttribute("class", "card");
    newCard.setAttribute("src", `cards/${dealtCard}.svg`);
    newCard.setAttribute("style", "margin-top: 10px;");
    if (dealerHand.childElementCount > 0) {
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
      dealerHand.appendChild(newDownCard);
    } else {
      dealerHand.appendChild(newCard);
    }
    console.log(activeDeck);
  }
  dealerHiddenCard = newCard;
  activePlayerHand[3].setAttribute("id", "active");
  const allBtns = document.querySelector("#active").children[2].children;
  for (let i = 0; i < allBtns.length; i++) {
    allBtns[i].disabled = false;
  }
  getPlayerValue();
  if (blackJackDealer()) {
    blackJackDealer();
  } else {
    playerBlackJackCheck();
  }
}

function removeCards() {
  const mainMessage = document.querySelector(".main-message");
  const playerMessage = document.querySelectorAll(".player-blackjack-message");
  for (let i = 0; i < playerHand.length; i++) {
    if (playerHand[i].children.length > 0) {
      for (let j = playerHand[i].children.length - 1; j >= 0; j--) {
        playerHand[i].removeChild(playerHand[i].children[j]);
      }
    }
  }
  if (dealerHand.children.length > 0) {
    for (let j = dealerHand.children.length - 1; j >= 0; j--) {
      dealerHand.removeChild(dealerHand.children[j]);
    }
  }
  newCard = undefined;
  newDownCard = undefined;
  dealerHiddenCard = undefined;
  for (let i = activePlayerHand.length - 1; i > 0; i--) {
    activePlayerHand[i].removeAttribute("id");
  }
  playerOneScore = 0;
  playerTwoScore = 0;
  playerThreeScore = 0;
  playerFourScore = 0;
  dealerScore = 0;
  mainMessage.textContent = "";
  playerMessage[3].textContent = "";
  playerMessage[2].textContent = "";
  playerMessage[1].textContent = "";
  playerMessage[0].textContent = "";
  deckOfCardsIsLow();
}

function unhideDealerDownCard() {
  dealerHand.removeChild(newDownCard);
  dealerHand.appendChild(dealerHiddenCard);
}

function deckOfCardsIsLow() {
  if (activeDeck.length < 25) {
    activeDeck = [];
    setActiveDeck();
    document.querySelector(".main-message").textContent = "Shuffling...";
    setTimeout(() => {
      document.querySelector(".main-message").textContent = "";
    }, 3000);
  }
}

function getPlayerValue() {
  const allCards = document.querySelector("#active").children[0].children[0];
  let cardValue = 0;
  for (let i = 0; i < allCards.children.length; i++) {
    let start = allCards.children[i].getAttribute("src").indexOf("/");
    let end = allCards.children[i].getAttribute("src").indexOf(".");
    let card = allCards.children[i]
      .getAttribute("src")
      .slice(start + 1, end - 1);
    if (card === "K" || card === "Q" || card === "J" || card === "T") {
      cardValue += 10;
    } else if (card === "A") {
      cardValue;
    } else {
      cardValue += parseInt(card);
    }
    if (cardValue > 21) {
      cardValue = "bust";
      return cardValue;
    }
  }
  console.log(cardValue);
  return cardValue;
}

function dealerTotal() {
  let cardValue = 0;
  let start = dealerHand.children[0].getAttribute("src").indexOf("/");
  let end = dealerHand.children[0].getAttribute("src").indexOf(".");
  let card = dealerHand.children[0]
    .getAttribute("src")
    .slice(start + 1, end - 1);
  if (card === "K" || card === "Q" || card === "J" || card === "T") {
    cardValue += 10;
  } else if (card === "A") {
    cardValue += 11;
  } else {
    cardValue += parseInt(card);
  }
  start = dealerHiddenCard.getAttribute("src").indexOf("/");
  end = dealerHiddenCard.getAttribute("src").indexOf(".");
  card = dealerHiddenCard.getAttribute("src").slice(start + 1, end - 1);
  if (card === "K" || card === "Q" || card === "J" || card === "T") {
    cardValue += 10;
  } else if (card === "A") {
    cardValue += 11;
  } else {
    cardValue += parseInt(card);
  }
  dealerScore = cardValue;
  return dealerScore;
}

function hitPlayer() {
  const allCards = document.querySelector("#active").children[0].children[0];
  const dealtCard = activeDeck.shift();
  newCard = document.createElement("img");
  newCard.setAttribute("class", "card");
  newCard.setAttribute("src", `cards/${dealtCard}.svg`);
  newCard.setAttribute("style", "margin-top: 10px; margin-left: -65px;");
  allCards.appendChild(newCard);
  getPlayerValue();
  if (getPlayerValue() === "bust") {
    if (playerOneScore === 0) {
      playerOneScore = getPlayerValue();
    } else if (playerTwoScore === 0) {
      playerTwoScore = getPlayerValue();
    } else if (playerThreeScore === 0) {
      playerThreeScore = getPlayerValue();
    } else if (playerFourScore === 0) {
      playerFourScore = getPlayerValue();
    }
    activePlayerSelect();
  }
}

function playerStay() {
  const allBtns = document.querySelector("#active").children[2].children;
  for (let i = 0; i < allBtns.length; i++) {
    allBtns[i].disabled = true;
  }
  if (playerOneScore === 0) {
    playerOneScore = getPlayerValue();
  } else if (playerTwoScore === 0) {
    playerTwoScore = getPlayerValue();
  } else if (playerThreeScore === 0) {
    playerThreeScore = getPlayerValue();
  } else if (playerFourScore === 0) {
    playerFourScore = getPlayerValue();
  }
  activePlayerSelect();
}

function activePlayerSelect() {
  const active = document.querySelector("#active");
  if (activePlayerHand[3].getAttribute("id") === "active") {
    active.removeAttribute("id");
    activePlayerHand[2].setAttribute("id", "active");
    for (let i = 0; i < activePlayerHand[2].children[2].children.length; i++) {
      activePlayerHand[2].children[2].children[i].disabled = false;
    }
  } else if (activePlayerHand[2].getAttribute("id") === "active") {
    active.removeAttribute("id");
    activePlayerHand[1].setAttribute("id", "active");
    for (let i = 0; i < activePlayerHand[1].children[2].children.length; i++) {
      activePlayerHand[1].children[2].children[i].disabled = false;
    }
  } else if (activePlayerHand[1].getAttribute("id") === "active") {
    active.removeAttribute("id");
    activePlayerHand[0].setAttribute("id", "active");
    for (let i = 0; i < activePlayerHand[0].children[2].children.length; i++) {
      activePlayerHand[0].children[2].children[i].disabled = false;
    }
  } else if (activePlayerHand[0].getAttribute("id") === "active") {
    active.removeAttribute("id");
    unhideDealerDownCard();
  }
}

function blackJackDealer() {
  const mainMessage = document.querySelector(".main-message");
  if (dealerTotal() === 21 && dealerHand.children.length === 2) {
    unhideDealerDownCard();
    mainMessage.textContent = "Dealer has BlackJack!!";
    document.querySelector("#active").removeAttribute("id");
  }
}

function playerBlackJack() {
  const playerMessage = document.querySelectorAll(".player-blackjack-message");
  if (playerOneScore === 21) {
    playerMessage[3].textContent = "BlackJack You Won!";
  }
  if (playerTwoScore === 21) {
    playerMessage[2].textContent = "BlackJack You Won!";
  }
  if (playerThreeScore === 21) {
    playerMessage[1].textContent = "BlackJack You Won!";
  }
  if (playerFourScore === 21) {
    playerMessage[0].textContent = "BlackJack You Won!";
  }
}

function dealerHit() {
  const mainMessage = document.querySelector(".main-message");

  if (
    playerOneScore !== "bust" ||
    playerOTwoScore !== "bust" ||
    playerThreeScore !== "bust" ||
    playerFourScore !== "bust"
  ) {
    if (dealerScore < 17) {
      const dealtCard = activeDeck.shift();
      newCard = document.createElement("img");
      newCard.setAttribute("class", "card");
      newCard.setAttribute("src", `cards/${dealtCard}.svg`);
      newCard.setAttribute("style", "margin-top: 10px; margin-left: -65px;");
      dealerHand.appendChild(newCard);
      let start = dealerHand.children[dealerHand.children.length - 1]
        .getAttribute("src")
        .indexOf("/");
      let end = dealerHand.children[dealerHand.children.length - 1]
        .getAttribute("src")
        .indexOf(".");
      let card = dealerHand.children[dealerHand.children.length - 1]
        .getAttribute("src")
        .slice(start + 1, end - 1);
      if (card === "K" || card === "Q" || card === "J" || card === "T") {
        dealerScore += 10;
      } else if (card === "A") {
        dealerScore;
      } else {
        dealerScore += parseInt(card);
      }
      if (dealerScore > 21) {
        mainMessage.textContent = "Dealer Busted!!";
        setTimeout(() => {
          mainMessage.textContent = "";
          removeCards();
        }, 3000);
      }
    }
  }
}

function compareScoresToDealer() {
  return;
}

hitBtn.forEach((element) => {
  element.addEventListener("click", hitPlayer);
});

stayBtn.forEach((element) => {
  element.addEventListener("click", playerStay);
});

startGame.addEventListener("click", setActiveDeck);
dealCardsBtn.addEventListener("click", dealCards);

function playerBlackJackCheck() {
  for (let i = 0; i < playerHand.length; i++) {
    let cardValue = 0;
    for (let j = 0; j < playerHand[i].children.length; j++) {
      let start = playerHand[i].children[j].getAttribute("src").indexOf("/");
      let end = playerHand[i].children[j].getAttribute("src").indexOf(".");
      let card = playerHand[i].children[j]
        .getAttribute("src")
        .slice(start + 1, end - 1);
      if (card === "K" || card === "Q" || card === "J" || card === "T") {
        cardValue += 10;
      } else if (card === "A") {
        cardValue += 11;
      } else {
        cardValue += parseInt(card);
      }
      console.log(card);
    }
    if (i === 0) {
      playerFourScore = cardValue;
      console.log(playerFourScore);
    }
    if (i === 1) {
      playerThreeScore = cardValue;
      console.log(playerThreeScore);
    }
    if (i === 2) {
      playerTwoScore = cardValue;
      console.log(playerTwoScore);
    }
    if (i === 3) {
      playerOneScore = cardValue;
      console.log(playerOneScore);
    }
  }
  playerBlackJack();
}
