  function newGame(){
    $("#gameInitializer").hide());
  }
  
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

