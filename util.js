<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
$(document).ready(function(){
  $("p").click(function(){
    $(this).hide();
  });
});

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
