let numberCards = 0;
let cardImg1, cardImg2, card1, card2, betCard, hidden, deck, checkDeck;
let cardCheckA, cardCheckB, searchCharA, searchCharB, indexA, indexB, indexHidden;
let sameCard, playerChoice = null;
let sameCardIndexesA;
let sameCardIndexesB;
var startingAmount = 1000;
let playerTurn = 0;
let betMoney;
let WorL;
let currentPotMoney;
let playerWin = [0, 0, 0, 0]; // Player balances
let playerLose = [0, 0, 0, 0];
let raceCount;
let startingPot = true;
let folded;
let ele; 
let Timer;
let race;
let dares = [];
let genere;
let genOrMade = 1;
let GameOver = false;
const generatedDares1 = [
    "Compliment Everyone: Give each player a genuine but funny compliment.",
    "Funny Face: Make a funny face and hold it for a full minute.",
    "Silly Dance: Perform a silly dance in front of everyone for one minute.",
    "Weird Walk: Walk around the room in a strange and funny way.",
    "Speak in a Foreign Accent: Speak in a foreign accent chosen by the other players for the next three rounds.",
    "Sing a Song: Sing a popular song out loud with exaggerated expressions.",
    "Imitate Someone: Imitate another player or a well-known celebrity for two minutes.",
    "Wear Clothes Backwards: Wear your shirt and pants backwards for the next three rounds.",
    "Share an Embarrassing Story: Tell the group an embarrassing story about yourself.",
    "Sing in Public: If playing in a public place, sing a song loudly in front of strangers (ensure this is done in a respectful and safe manner)."
];

const intaractiveDealer = [
    "Dealer: Fold?", 
    "Dealer: Careful there you might get a DARE", 
    "Dealer: Its Worth the risk!, Maybe hehe", 
    "Dealer: You got this", 
    "Dealer: I guess Someone's in trouble",
    "Dealer: You better take the dare!", 
    "Dealer: I think maybe you should fold?</br>nahh you got this", 
    "Dealer: When will i get a girlfrie~ </br> Umh ah Anyways you should BET!!",
    "Dealer: if Only I was real</br> I could ask you out for a date", 
    "Dealer: You like Jazz?", 
    "Dealer: Hmmm what will you do?", 
    "Dealer: Go on then!", 
    "Dealer: ahh you dont have the guts do you?", 
    "Dealer: Guess I can have some fun at least!", 
    "Dealer: better not fold!", 
    "Dealer: I am the table", 
    "Dealer: Meow~ umh Sorry I saw a cat", 
    "Dealer: You are one step away from getting a dare, maybe bet?", 
    "Dealer: Don't fold", 
    "Dealer: Show them you are a beast, BET!"
];

window.onload = function() {
    buildDeck();
    shuffleDeck();  
}

function shuffleAndPickRandom(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    const randomIndex = Math.floor(Math.random() * array.length);
    
    return array[randomIndex];
}


function timer() {
    document.getElementById('timer').style.display = "block";
    ele = document.getElementById('timer');
    let sec = 20;
    Timer = setInterval(() => {
        ele.innerHTML = sec;
        sec--;

        const randomDealerMessage = shuffleAndPickRandom(intaractiveDealer);

        if (sec % 5 == 0) {
            document.getElementById('messageDealer').innerHTML = randomDealerMessage;
        }

        if (sec < 0) {
            clearInterval(Timer);
            ele.innerHTML = "Run out of time";
            hideCard();
            drawButtonAbled();
            buttonsDisappear();
        }
    }, 1000);
}

function dareMake() {
    document.getElementById('messageDealer').innerHTML = "Dealer: Please decide and input the dares below:</br>Its gonna be exciting !!!";
    document.getElementById('numRacenDares').style.display = "block";
    document.getElementById('submit').style.display = "block";
    buttonsDisappear();
}


function buildDeck() {
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const types = ["C", "D", "H", "S"];
    deck = [];
    checkDeck = [];

    for (let n = 0; n < 5; n++) {
        for (let value of values) {
            for (let type of types) {
                deck.push(`${value}-${type}`);
            }
        }
    }

    console.log(deck);

    for (let n = 0; n < 5; n++) {
    for (let value of values) {
        for (let type of types) {
            checkDeck.push(`${value}-${type}`);
        }
    }
}
    console.log(checkDeck);
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    console.log(deck);
}

function submitInfo() {

    if (genere === 1) {
        hideInputsAndLabels();
        players();
        distributeCards();
        buttonsAppear();
        document.getElementById('dares-list').style.display = "none";
        document.getElementById('submit').style.display = "none";
        raceCount = 5;
        genOrMade = 1
    }
    else {
    for (let i = 0; i < 10; i++) {
        let dareValue = document.getElementById('dare' + (i + 1)).value;
            if (dareValue.trim() === "") {
                alert("Please fill out all the dare fields.");
                return;
            }   
            dares.push(dareValue);
        }
        console.log(dares);
        raceCount = 5;
        genOrMade = 2;

        document.getElementById("submit").style.display = "none";

        hideInputsAndLabels();
        players();
        distributeCards();
        buttonsAppear();
    }
    genere = 0;
}

function genDare() {
    document.getElementById('dares-list').style.display = "block";
    document.getElementById('messageDealer').innerHTML = "Dealer: Here are the generated dares Play Now</br>Its gonna be exciting !!!";
    document.getElementById('submit').style.display = "block";
    buttonsDisappear();
    const daresList = document.getElementById('dares-list');
    daresList.innerHTML = '';

    generatedDares1.forEach(function (dare, index) {
    const dareNumber = index + 1;
    const dareText = `Dare ${dareNumber}: ${dare}`;
    const dareElement = document.createElement('h3');
    dareElement.textContent = dareText;
    daresList.append(dareElement);
});
    genere = 1;

}

function hideInputsAndLabels() {
    const inputs = document.querySelectorAll('#numRacenDares input');
    const labels = document.querySelectorAll('#numRacenDares label');

    inputs.forEach(input => {
        input.style.display = 'none';
    });

    labels.forEach(label => {
        label.style.display = 'none';
    });
}


function players() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById("player" + i).innerHTML = "Player " + i;
    }
}

function distributeCards() {
    numberCards++;
    timer();
    playerTurns();

    cardImg1 = document.createElement("img");
    cardImg1.id = "card" + numberCards;
    let cardA = deck.pop();
    cardCheckA = cardA;
    cardImg1.src = "./DeckOFCards/BACK.png";
    document.getElementById("Cards").append(cardImg1);

    numberCards++;

    betCard = document.createElement("img");
    betCard.id = "hiddenCard";
    betCard.style.display = "none";
    document.getElementById("Cards").append(betCard);

    cardImg2 = document.createElement("img");
    cardImg2.id = "card" + numberCards;
    let cardB = deck.pop();
    cardCheckB = cardB;
    cardImg2.src = "./DeckOFCards/BACK.png";
    document.getElementById("Cards").append(cardImg2);

    console.log(cardCheckA, cardCheckB);

    if (numberCards == 8) {
        numberCards = 0;
    }

    seeCard(cardImg1, cardA);
    seeCard(cardImg2, cardB);
}

function playersTurn(AddOrMinus) {
    if (AddOrMinus === 1) {
        playerWin[playerTurn - 1] += 1; // Add score for the previous player
    } else if (AddOrMinus === 2) {
        playerLose[playerTurn - 1] += 1; // No score change for the previous player

        if(playerLose[playerTurn - 1] > 9) {
            playerLose[playerTurn - 1] = 9;
        }
    }

    console.log(`Win: \nPlayer 1: ${playerWin[0]} \nPlayer 2: ${playerWin[1]}\nPlayer 3: ${playerWin[2]}\nPlayer 4: ${playerWin[3]}`);

    console.log(`Lose: \nPlayer 1: ${playerLose[0]} \nPlayer 2: ${playerLose[1]}\nPlayer 3: ${playerLose[2]}\nPlayer 4: ${playerLose[3]}`);

    for(let i = 0; i < 4; i++) {
        if (raceCount == playerWin[i]) {
            showPopup(`Player ${i + 1} Won the game\nPlayer 1: ${playerWin[0]} \nPlayer 2: ${playerWin[1]}\nPlayer 3: ${playerWin[2]}\nPlayer 4: ${playerWin[3]}`);
            GameOver = true;
        }
    }
}

function gameOver() {
    let gameContain = document.getElementById('game-container');
    gameContain.innerHTML = '';
    
    document.getElementById('thatsGame').innerHTML = "Game Over";
    document.getElementById('playerDisp1').innerHTML = `Player 1 Win: ${playerWin[0]}\nLost: ${playerLose[0]}`;
    document.getElementById('playerDisp2').innerHTML = `Player 2 Win: ${playerWin[1]}\nLost: ${playerLose[1]}`;
    document.getElementById('playerDisp3').innerHTML = `Player 3 Win: ${playerWin[2]}\nLost: ${playerLose[2]}`;
    document.getElementById('playerDisp4').innerHTML = `Player 4 Win: ${playerWin[3]}\nLost: ${playerLose[3]}`;
    document.getElementById('Dares').innerHTML = "Dares";

    for(let i = 0; i < 4; i++) {
        if(raceCount == playerWin[i]) {
            document.getElementById(`playerDare${i + 1}`).innerHTML = `Player ${i + 1} Won</br>Exempted to the dares`;
        }
        else if (playerWin[i] !== raceCount) {
            if(genOrMade == 1) {
                document.getElementById(`playerDare${i + 1}`).innerHTML = `Player ${i + 1} Lose</br>Dare: ${generatedDares1[playerLose[i]]}`;
            }
            else if (genOrMade == 2) {
                document.getElementById(`playerDare${i + 1}`).innerHTML = `Player ${i + 1} Lose</br>Dare: ${dares[playerLose[i]]}`;
            }
            
        }
        
    }
}

let previousPlayer = null;

function playerTurns() {
    playerTurn++;
    if (playerTurn > 4) {
        playerTurn = 1;
    }

    console.log("Player" + playerTurn + " Turn");
    document.getElementById('turnOfPlayers').innerHTML = "Player " + playerTurn + " Turn";

    if (previousPlayer !== null) {
        document.getElementById(`player${previousPlayer}`).style.color = "black";
    }

    document.getElementById(`player${playerTurn}`).style.color = "lightblue";

    previousPlayer = playerTurn;
}

function draw() {
    hideCard();
    distributeCards();
    buttonsAppear();
}

function drawButtonDisabled() {
    document.getElementById('draw').style.display = "none";
}

function drawButtonAbled() {
    document.getElementById('draw').style.display = "block";
}

function seeCard(cardImg, cardValue) {
    let i = 2;

    cardImg.addEventListener("click", function() {
        cardImg.src = (i % 2 == 0) ? `./DeckOFCards/${cardValue}.png` : "./DeckOFCards/BACK.png";
        i++;
    });
}

function buttonsAppear() {
    document.getElementById('fold').style.display = "block";
    document.getElementById('bet').style.display = "block";
    drawButtonDisabled();
}

function buttonsDisappear() {
    document.getElementById('fold').style.display = "none";
    document.getElementById('bet').style.display = "none";
    document.getElementById('higher').style.display = "none";
    document.getElementById('lower').style.display = "none";
    document.getElementById("submitBet").style.display = "none";
    document.getElementById('makeDare').style.display = "none";
    document.getElementById('generateDares').style.display = "none";
}

function hideCard() {
    document.getElementById('Cards').innerHTML = "";
}

function fold() {
    hideCard();
    drawButtonAbled();
    buttonsDisappear();
    clearInterval(Timer);
    ele.innerHTML = "Folded";
}

function bet() {
    buttonsDisappear();
    document.getElementById("submitBet").style.display = "block";
    clearInterval(Timer)
    ele.innerHTML = "";
}

function betSubmit() {
    searchCharA = cardCheckA[0];
    searchCharB = cardCheckB[0];

    sameCard = searchCharA === searchCharB;

    console.log(sameCard);

    if (sameCard) {
        buttonsAppearForHighLow();
    } else {
        showCard();
        buttonsDisappear();
    }
}

function showCard() {
    betCard.style.display = "block";
    betCard.src = "./DeckOFCards/BACK.png";
    hidden = deck.pop();
    console.log(hidden);
    checkHidden = hidden;

    betCard.addEventListener("click", function() {
        betCard.src = `./DeckOFCards/${hidden}.png`;

        if (playerChoice !== null) {
            HighOrLower(playerChoice);
        } else {
            WinOrLose();
        }

        playerChoice = null; // this line of code caused me 4 days of suffering
        drawButtonAbled();

    }, { once: true });
}

function WinOrLose() {
    sameCardIndexesA = [];
    sameCardIndexesB = [];
    for (let i = 0; i < checkDeck.length; i++) {
        if (checkDeck[i].includes(searchCharA)) {
            sameCardIndexesA.push(i);
        }
        if (checkDeck[i].includes(searchCharB)) {
            sameCardIndexesB.push(i);
        }
    }
    console.log("sameCardIndexesA:", sameCardIndexesA);
    console.log("sameCardIndexesB:", sameCardIndexesB);

    indexA = checkDeck.indexOf(cardCheckA);
    indexB = checkDeck.indexOf(cardCheckB);
    indexHidden = checkDeck.indexOf(checkHidden);

    console.log("indexA:", indexA, "indexB:", indexB, "indexHidden:", indexHidden);

    if (indexA > indexB) [indexA, indexB] = [indexB, indexA];

    if (sameCardIndexesA.includes(indexHidden) || sameCardIndexesB.includes(indexHidden)) {
        showPopup("You Lose ");
        WorL = 2;
        playersTurn(WorL);
    } else if (indexHidden > indexA && indexHidden < indexB) {
        showPopup("You Win ");
        WorL = 1;
        playersTurn(WorL);
    } else {
        showPopup("You Lose ");
        WorL = 2;
        playersTurn(WorL);
    }
}

function HighOrLower(HighOrLow) {
    indexA = checkDeck.indexOf(cardCheckA);
    indexHidden = checkDeck.indexOf(checkHidden);

    let valueOrder = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let valueA = cardCheckA.split('-')[0];
    let valueHidden = checkHidden.split('-')[0];

    let indexValueA = valueOrder.indexOf(valueA);
    let indexValueHidden = valueOrder.indexOf(valueHidden);

    console.log("HighOrLow:", HighOrLow);
    console.log("valueA:", valueA, "valueHidden:", valueHidden);
    console.log("indexValueA:", indexValueA, "indexValueHidden:", indexValueHidden);

    if (HighOrLow == 1) { // higher
        if (indexValueHidden == indexValueA || indexValueHidden < indexValueA) {
            showPopup("You Lose ");
            WorL = 2;
            playersTurn(WorL);
        } else if (indexValueHidden > indexValueA) {
            showPopup("You Win ");
            WorL = 1;
            playersTurn(WorL);
        }
    } else { // lower
        if (indexValueHidden == indexValueA || indexValueHidden > indexValueA) {
            showPopup("You Lose \n");
            WorL = 2;
            playersTurn(WorL);
        } else if (indexValueHidden < indexValueA) {
            showPopup("You Win ");
            WorL = 1;
            playersTurn(WorL);
        }
    }
    buttonsDisappear();
}    

function higher() {
    playerChoice = 1;
    showCard();
}   

function lower() {
    playerChoice = 2;
    showCard();
}

function buttonsAppearForHighLow() {
    buttonsDisappear();
    document.getElementById('higher').style.display = "block";
    document.getElementById('lower').style.display = "block";
}

function showPopup(message) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    popupMessage.innerText = message;
    popup.style.display = 'flex';
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
    if (GameOver === true) {
        gameOver();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    for (let i = 1; i <= 10; i++) {
        const inputField = document.getElementById(`dare${i}`);


    function togglePlaceholderBg() {
      if (inputField.value === "") {
        inputField.classList.add("placeholder-bg");
      } else {
        inputField.classList.add("placeholder-bg");
      }
    }

    // Initial check
    togglePlaceholderBg();

    // Add event listeners
    inputField.addEventListener("input", togglePlaceholderBg);
    inputField.addEventListener("focus", togglePlaceholderBg);
    inputField.addEventListener("blur", togglePlaceholderBg);
}
  });