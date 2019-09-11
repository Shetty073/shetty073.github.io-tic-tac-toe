// @author: Ashish Shetty

const winPositions = {
    "place00": [["place00", "place01", "place02"], ["place00", "place10", "place20"], ["place00", "place11", "place22"]],
    "place01": [["place00", "place01", "place02"], ["place01", "place11", "place21"]],
    "place02": [["place00", "place01", "place02"], ["place02", "place11", "place20"], ["place02", "place12", "place22"]],
    "place10": [["place00", "place10", "place20"], ["place10", "place11", "place12"]],
    "place11": [["place01", "place11", "place21"], ["place10", "place11", "place12"], ["place00", "place11", "place22"], ["place02", "place11", "place20"]],
    "place12": [["place02", "place12", "place22"], ["place10", "place11", "place12"]],
    "place20": [["place00", "place10", "place20"], ["place02", "place11", "place20"], ["place20", "place21", "place22"]],
    "place21": [["place20", "place21", "place22"], ["place01", "place11", "place21"]],
    "place22": [["place02", "place12", "place22"], ["place00", "place11", "place22"], ["place20", "place21", "place22"]]
};

let gameData = {
    humanplayer: '',
    aiplayer: '',
    wins: 0,
    totalgamesplayed: 0
};

let ply = 0; // 0=human player's turn and 1=computer player's turn

document.getElementById("x-button").addEventListener("click",function() { player('x', 'o') }, false);
document.getElementById("o-button").addEventListener("click",function() { player('o', 'x') }, false);
document.getElementById("reset-button").addEventListener("click", resetBoard);

function player(human, ai) {
    if (gameData.humanplayer === '') {
        gameData.humanplayer = human;
        gameData.aiplayer = ai;
    } else {
        window.alert("In order to change player you must first 'reset' the board");
        return;
    }
    if (gameData.humanplayer === 'x') {
        ply = 0;
        startGame();
    } else {
        ply = 1;
        // Timout set to make the computers moves feel natural
        setTimeout( function () { AImove(); },800);
        startGame();
    }
}

function resetBoard() {
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            document.getElementById("place"+String(i)+String(j)).innerHTML = '';
        }
    }

    // Timout set to make the computers moves feel natural
    setTimeout(function () { checkCurrentPlayer();} , 800);
    // gameData.humanplayer = '';
    // gameData.wins = '';
    // gameData.totalgamesplayed = '';
}

function checkCurrentPlayer() {
    if (gameData.humanplayer === 'x') {
        ply = 0;
    } else {
        ply = 1;
        // Timout set to make the computers moves feel natural
        setTimeout( function () { AImove(); },800);
    }
}

function getEmptyPool() {
    let emptyLocPool = [];
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            if (document.getElementById("place"+String(i)+String(j)).innerHTML === '') {
                emptyLocPool.push("place"+String(i)+String(j));
            }
        }
    }
    // Now lets randomize our pool list
    let currentIndex = emptyLocPool.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = emptyLocPool[currentIndex];
        emptyLocPool[currentIndex] = emptyLocPool[randomIndex];
        emptyLocPool[randomIndex] = temporaryValue;
    }
    return emptyLocPool;
}

function checkWin(player, place) {
    let possibleWinPositions = winPositions[place];
    for (let x of possibleWinPositions) {
        if (((document.getElementById(x[0]).innerHTML) === (document.getElementById(x[1]).innerHTML)) && ((document.getElementById(x[0]).innerHTML) === (document.getElementById(x[2]).innerHTML))) {
            // first swap humanplayer symbol with computer player symbol i.i is human is X next turn (after a win/loss/tie) he will be O
            let temp = gameData.humanplayer;
            gameData.humanplayer = gameData.aiplayer;
            gameData.aiplayer = temp;
            // now lets return the result of the check
            return true;
        }
    }
}

function playerMove(place) {
    if (ply === 0) {
        let loc = document.getElementById(place);
        if (loc.innerHTML !== '') {
            // console.log(loc.innerHTML);
        } else {
            loc.innerHTML = gameData.humanplayer;
        }
        if (checkWin("You", place)) {
            setTimeout(function() { alert("Congratulations! You have won\nThe board will now reset"); }, 500);
            gameData.wins += 1;
            setTimeout(function () { resetBoard(); }, 1000);
        } else {
            ply = 1;
            // Timout set to make the computers moves feel natural
            setTimeout( function () { AImove(); },800);
            // AImove();
        }
    } else {
        setTimeout(function() { alert("Sorry computer player's turn.."); }, 300);
    }
}

function AImove() {
    if (ply === 1) {
        // TODO: add intelligent AI logic

        // Dumb AI
        // Computer will place symbol on a random empty space
        // Will implement MinMax algo AI later
        let emptyLocPool = getEmptyPool();
        if (emptyLocPool.length === 0) {
            setTimeout(function() { alert("It is a tie!"); }, 500);
            setTimeout(function () { resetBoard(); }, 1000);
        } else {
            let location = document.getElementById(emptyLocPool[0]);
            location.innerHTML = gameData.aiplayer;
            if (checkWin("Computer", emptyLocPool[0])) {
                setTimeout(function() { alert("Computer won!\nThe board will now reset"); }, 500);
                setTimeout(function () { resetBoard(); }, 1000);
            }
        }
        ply = 0;
    }
}

function startGame() {
    gameData.totalgamesplayed += 1;
    document.getElementById("place00").addEventListener("click", function() { playerMove("place00") }, false);
    document.getElementById("place01").addEventListener("click", function() { playerMove("place01") }, false);
    document.getElementById("place02").addEventListener("click", function() { playerMove("place02") }, false);
    document.getElementById("place10").addEventListener("click", function() { playerMove("place10") }, false);
    document.getElementById("place11").addEventListener("click", function() { playerMove("place11") }, false);
    document.getElementById("place12").addEventListener("click", function() { playerMove("place12") }, false);
    document.getElementById("place20").addEventListener("click", function() { playerMove("place20") }, false);
    document.getElementById("place21").addEventListener("click", function() { playerMove("place21") }, false);
    document.getElementById("place22").addEventListener("click", function() { playerMove("place22") }, false);
}

