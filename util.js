var drawCount = 5, buyCount = 1, actionCount = 1, moneyCount = 0;
var copper = {name:'copper', cardType:'money', money:1, cost:0, remainingCards:30}, silver = {name:'silver', cardType:'money', money:2, cost:3, remainingCards:12}, gold = {name:'gold', cardType:'money', money:3, cost:6, remainingCards:12};
var estate = {name:'estate', cardType:'victoryCard', money:0, cost:2, victoryPoints:1, remainingCards: 8}
var chapel = {name:'chapel', cardType:'action', cost:2, remainingCards:8};
var moat = {cardType:'actionReaction', card:2, cost:2};
var bureaucrat = {cardType:'actionAttack', cost:4};
var village = {cardType:'action', cost:3, card:1, actions:2};
var buyableCards = [copper, silver, gold, chapel]
var playerDeck = [copper,copper,copper,copper,copper,copper,copper,estate,estate,estate], hand = [], discardPile = [];
var cardId = 0;

$(document).ready(function(){
    

});
    function newGame(){
    $("#gameInitializer").hide();
    $("#gameBoard").append('<p id="deckTest">Deck:</p><p id="discardPile">Discard Pile:</p><p id="moneyCountId">Money: <span id="displayMoney"></span></p><p id="actionCountId">Actions: <span id="displayActions"></span></p><p id="buysCountId">Buys: <span id="displayBuys"></span></p>');
    $("#gameBoard").append('<input type="button" onclick="newTurn()" value="New turn"><input type="button" onclick="buyList(buyableCards)" value="Buy Cards">');
    $("#gameBoard").append('<p id="playableHand">Hand: </p>');
    $("#gameBoard").append('<p id="buyableCardsList">Buyable Cards:</p>');
}


function newTurn() {
    while(hand.length > 0) {
        discard(hand[0]);
    }
    if (playerDeck.length >= drawCount) {
        for(var i in playerDeck){
            add(playerDeck[i]);
        }
        displayHand(hand);
        
    } 
    //else {
    //    reDeck(discardPile);
    //    add(playerDeck);
    //}
    //removeBuyableCards();
    buyCount = 1;
    moneyCount = 0;
    updateAll();
}

function discardFromHand(cardId){
    card = $("#"+cardId).data(cardId.toString());
    if (hand.indexOf(card) > -1) {
        discardPile.push(hand[hand.indexOf(card)]);
        hand.splice(hand.indexOf(card), 1);
        $("#"+cardId).remove();
    }
    updateAll();
}

function add(card){
        if(card)
            hand.unshift(card);
}

function displayHand(cards){
     for(var i in cards){
         cardId++;
         var card = cards[i];
         $("#playableHand").append("<input id='"+cardId+"'>");
         $("#"+cardId).attr("type","button").attr("value",card.name).attr("onclick","onCardPress("+cardId+")");
         $("#"+cardId).data(cardId.toString(), card);
     }
}

function onCardPress(cardId){
    card = $("#"+cardId).data(cardId.toString());
    if(card.cardType === 'money') {
        moneyCount += card.money;
        discardFromHand(cardId);
    }
       updateAll();

}

function updateAll(){
    document.getElementById("displayMoney").innerHTML=moneyCount;
    document.getElementById("displayActions").innerHTML=actionCount;
    document.getElementById("displayBuys").innerHTML=buyCount;
    deckReader();
    discardReader();
}

function deckReader(){
        var deckReader = [];    
    for (var i in playerDeck){
            deckReader.push(playerDeck[i].name);
        }
        document.getElementById("deckTest").innerHTML="Deck: " + deckReader;
}

function discardReader(){
    var discardReader = [];
    for (var i in discardPile){
        discardReader.push(discardPile[i].name);
    }
    document.getElementById("discardPile").innerHTML="Discard Pile: " + discardReader;
}

function buyList(buyableCards){
    //var buyableCardArray = listOfBuyableCards()
    if(buyCount>=1) {
        for (var i in buyableCards) {
            var card = buyableCards[i];
            cardId++;
            $("#buyableCardsList").append("<input id='"+cardId+"'>");
            $("#"+cardId).attr("type","button").attr("value",card.name).attr("onclick","onCardPress("+cardId+")");
            $("#"+cardId).data(cardId.toString(), card);
        }
        $("#buyableCardsList").append("<input id=cancel");
        $("#cancel").attr("type", "button").attr("value","cancel").attr("onclick","cancel()");
        buyCount--;
    }
    /*
    if(buyCount >= 1){
        for (var i in buyableCards) {
            var currentCard = buyableCards[i];
            var buyable = document.createElement("input");
            buyable.card = currentCard;
            buyable.setAttribute("type", "button");
            buyable.setAttribute("name", "PurchasableCards");
            buyable.value = currentCard.name + " " + currentCard.remainingCards;
            buyable.Id = currentCard.name;
            buyable.setAttribute("onclick", "buy(this.card)");
            document.getElementById("buyableCards").appendChild(buyable);
        }
                var cancel = document.createElement("input");
        cancel.setAttribute("type", "button");
        cancel.setAttribute("name", "cancel");
        cancel.value = "Cancel";
        cancel.Id = "cancel";
        cancel.setAttribute("onclick", "buy('cancel')");
        document.getElementById("buyableCards").appendChild(cancel);
        buyCount--;
        updateAll();
    }
    */
}


