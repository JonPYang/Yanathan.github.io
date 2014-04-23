var drawCount = 5, buyCount = 1, actionCount = 1, moneyCount = 0;
var copper = {name:'copper', cardType:'money', money:1, cost:0, remainingCards:30}, silver = {name:'silver', cardType:'money', money:2, cost:3, remainingCards:12}, gold = {name:'gold', cardType:'money', money:3, cost:6, remainingCards:12};
var estate = {name:'estate', cardType:'victoryCard', cost:2, victoryPoints:1, remainingCards:8};
var chapel = {name:'chapel', cardType:'action', cost:2, remainingCards:8};
var moat = {cardType:'actionReaction', draw:2, cost:2};
var bureaucrat = {cardType:'actionAttack', cost:4};
var village = {name:'Village', cardType:'action', cost:3, draw:1, actions:2, remainingCards:8}, woodcutter = {name:'Woodcutter', cardType:'action', cost:3, money:2, buy:1, remainingCards:8}, festival = {name:'Festival', cardType:'action', cost:5, actions:2, buy:2, money:2, remainingCards:8};
var buyableCards = [copper, silver, gold, village, woodcutter, festival];
var playerDeck = [copper,copper,copper,copper,copper,copper,copper,estate,estate,estate], hand = [], discardPile = [];
var cardId = 0;

$(document).ready(function(){        });

function newGame(){
    $("#gameInitializer").hide();
    $("#gameBoard").append('<p id="deckTest">Deck:</p><p id="discardPile">Discard Pile:</p><p id="moneyCountId">Money: <span id="displayMoney"></span></p><p id="actionCountId">Actions: <span id="displayActions"></span></p><p id="buysCountId">Buys: <span id="displayBuys"></span></p>');
    $("#gameBoard").append('<input type="button" onclick="newTurn()" value="New turn"><input type="button" onclick="buyList(buyableCards)" value="Buy Cards">');
    $("#gameBoard").append('<p id="playableHand">Hand: </p>');
    $("#gameBoard").append('<p id="buyableCardsList">Buyable Cards:</p>');
    shuffle(playerDeck);
    newTurn();
}

function onCardPress(cardId){
    var card = $("#"+cardId).data(cardId.toString());
    if(card.cardType === 'money') {
        moneyCount += card.money;
        discard("fromHand", cardId);
        document.getElementById("report").innerHTML="";
    } else if(card.cardType === 'action') {
        if(actionCount > 0){
            actionCount -= 1;
            if(card.money > 0){
                moneyCount += card.money;
            }
            if(card.actions > 0){
                actionCount += card.actions;
            }
            if(card.buy > 0){
                buyCount += card.buy;
            }
            if(card.draw > 0){
                for(var i = 0; i < card.draw; i++) {
                    if(playerDeck.length == 0){
                        reDeck(discardPile);
                    }
                    add(playerDeck[0]);
                }
            }
            if(card.hasAction){
                card.hasAction;
            }
            discard("fromHand", cardId);
            document.getElementById("report").innerHTML="";
        } else {
            document.getElementById("report").innerHTML="Not enough action to play action card.";
        }
    }
    updateAll();
}

function newTurn() {
    if(hand.length > 0) {
        var handSearch = $('#playableHand input');
        $.each(handSearch, function(i, value){
            discard("fromHand",value.id);
            });
        
    }
    if (playerDeck.length >= drawCount) {
        for(var i = 0; i < drawCount && playerDeck.length !== 0; i++) {
            add(playerDeck[0]);  
        }
    } else {
        reDeck(discardPile);
        for(var i = 0; i < drawCount && playerDeck.length !== 0; i++) {
            add(playerDeck[0]);  
        }
    }
    $("#buyableCardsList").children().remove();
    buyCount = 1;
    moneyCount = 0;
    actionCount = 1;
    document.getElementById("report").innerHTML="";
    updateAll();
}

function reDeck(discardPile){
    if(discardPile) {
        shuffle(discardPile);
        playerDeck = playerDeck.concat(discardPile.splice(0));
    }
    return playerDeck;
}

function discard(whereFrom, cardId){
    if(whereFrom === "fromHand"){
        card = $("#"+cardId).data(cardId.toString());
        if (hand.indexOf(card) > -1) {
            discardPile.push(hand[hand.indexOf(card)]);
            hand.splice(hand.indexOf(card), 1);
            $("#"+cardId).remove();
        } else document.getElementById("errorCatch").innerHTML="ERROR, CARD NOT FOUND IN HAND WHILE TRYING TO DISCARD";
    } else if(whereFrom === "fromBuy"){
        if(cardId === 'cancel'){
            $("#buyableCardsList").children().remove();
            buyCount++;
            updateAll();
        } else if(card) {
            discardPile.push(card);
            $("#buyableCardsList").children().remove();
            updateAll();
        } else document.getElementById("errorCatch").innerHTML="ERROR, NO CARD PASSED TO DISCARDFROMBUY";  
        
    } else document.getElementById("errorCatch").innerHTML="ERROR, DO NOT KNOW WHERE CARD IS COMING FROM?";
    updateAll();
}

function add(card){
    if(playerDeck.indexOf(card) > -1) {
        hand.unshift(card);
        playerDeck.splice(playerDeck.indexOf(card), 1);
        displayHand(card);
    }
    else document.getElementById("errorCatch").innerHTML="ERROR ADDING CARD, COULD NOT REMOVE FROM PLAYERDECK";
}

function displayHand(card){
    cardId++;
    $("#playableHand").append("<input id='"+cardId+"'>");
    $("#"+cardId).attr("type","button").attr("value",card.name).attr("onclick","onCardPress("+cardId+")");
    $("#"+cardId).data(cardId.toString(), card);
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
            $("#"+cardId).attr({"type":"button", "value":card.name + " " + card.remainingCards, "onclick":"buy("+cardId.toString()+")"});
            $("#"+cardId).data(cardId.toString(), card);
        }
        $("#buyableCardsList").append("<input id=cancel>");
        $("#cancel").attr({"type":"button", "value":"cancel", "onclick":"buy('cancel')"});
        //$("#cancel").attr("type", "button").attr("value","cancel").attr("onclick","buy('cancel')"); old style
        buyCount--;
    }
    updateAll();
}

function buy(cardId){
    if(cardId === 'cancel'){
        discard("fromBuy", cardId);
        updateAll(); 
    }
    else {
        card = $("#"+cardId).data(cardId.toString());
        if ((moneyCount - card.cost) >= 0 && (card.remainingCards > 0)){
            moneyCount -= card.cost;
            card.remainingCards -= 1;
            discard("fromBuy");
            updateAll(); 
        }
    }
}

function shuffle(deck) {
    var m = deck.length, t, i;
    while(m) {
        i = Math.floor(Math.random() * m--);
        t = deck[m];
        deck[m] = deck[i];
        deck[i] = t;
        }
    deckReader();
    discardReader();
    return deck;
}

