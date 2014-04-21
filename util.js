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
    $("#gameBoard").append('<p id="deckTest">Deck:</p><p id="discardPile">Discard Pile:</p><p id="moneyCountId">Money: <span id="displayMoney"></span></p><p id="actionCountId">Actions: <span id="displayActions"></span></p><p id="buysCountId">Buys: <span id="displayBuys"></span></p>');
    $("#gameBoard").append('<input type="button" onclick="newTurn()" value="New turn"><input type="button" onclick="buyList()" value="Buy Cards">');
    
}
