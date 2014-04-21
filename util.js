$(document).ready(function(){
    

function newTurn() {
    while(hand.length > 0) {
        discard(hand[0]);
    }
    if (playerDeck.length >= drawCount) {
        add(playerDeck);
    } 
    else {
        reDeck(discardPile);
        add(playerDeck);
    }
    removeBuyableCards();
    buyCount = 1;
    moneyCount = 0;
    updateAll();
}

});

function newGame(){
    $("#gameInitializer").hide();
    $("#gameBoard").append('<p id="deckTest">Deck:</p>');
    $("#gameBoard").append('<p id="discardPile">Discard Pile:</p>');
    $("#gameBoard").append('<p id="moneyCountId">Money: <span id="displayMoney"></span></p>');
    $("#gameBoard").append('<p id="actionCountId">Actions: <span id="displayActions"></span></p>');
    $("#gameBoard").append('<p id="buysCountId">Buys: <span id="displayBuys"></span></p>');
}
