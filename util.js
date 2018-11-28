var drawCount = 5, buyCount = 1, actionCount = 1, moneyCount = 0;
var copper = {name:'Copper', cardType:'money', money:1, cost:0, remainingCards:30}, silver = {name:'Silver', cardType:'money', money:2, cost:3, remainingCards:12}, gold = {name:'Gold', cardType:'money', money:3, cost:6, remainingCards:12};
var estate = {name:'Estate', cardType:'victoryCard', cost:2, victoryPoints:1, remainingCards:8}, duchy = {name:'Douchy', cardType:'victoryCard', cost:5, victoryPoints:3, remainingCards:8}, province = {name:'Province', cardType:'victoryCard', cost:8, victoryPoints:7, remainingCards:8};
var chapel = {name:'Chapel', cardType:'action', cost:2, remainingCards:8, hasAction:'true'}; var moat = {cardType:'actionReaction', draw:2, cost:2}; var bureaucrat = {cardType:'actionAttack', cost:4};
var cardsDepleted = 0;
var village = {name:'Village', cardType:'action', cost:3, draw:1, actions:2, remainingCards:8}, woodcutter = {name:'Woodcutter', cardType:'action', cost:3, money:2, buy:1, remainingCards:8}, festival = {name:'Festival', cardType:'action', cost:5, actions:2, buy:2, money:2, remainingCards:8};
var buyableCards = [copper, silver, gold, village, woodcutter, festival, estate, duchy, province, chapel];
var playerDeck = [copper,copper,copper,copper,copper,copper,copper,estate,estate,estate], hand = [], discardPile = [];
var cardId = 0;
var isBuyListUp = false;

$(document).ready(function(){        });

function newGame(){
    $("#gameInitializer").hide();
	$("#gameBoard").append('<div id=otherPlayers></div><div id=playerBoard></div>');
	$("#playerBoard").append('<div id=playerSide></div><div id=buyableCardsList></div>');
    $("#playerSide").append('<p id="deckTest">Deck:</p><p id="discardPile">Discard Pile:</p><p id="moneyCountId">Money: <span id="displayMoney"></span></p><p id="actionCountId">Actions: <span id="displayActions"></span></p><p id="buysCountId">Buys: <span id="displayBuys"></span></p><p id="choiceLine"><input type="button" onclick="newTurn()" value="New turn"><input type="button" onclick="buyList(buyableCards)" value="Buy Cards"></p><p id="playableHand">Hand: </p><p id="trashList"></p>');
    playerDeck = [copper,copper,copper,copper,copper,copper,copper,estate,estate,estate], hand = [], discardPile = [];
    cardsDepleted = 0;
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
        discard("fromHand", cardId);
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
                    add(playerDeck[0], false);
                }
            }
            if(card.hasAction){
                chapelaction();
            }

            document.getElementById("report").innerHTML="";
        } else {
            document.getElementById("report").innerHTML="Not enough action to play action card.";
        }
    }
    updateAll();
}

function newTurn() {
	var isNewHand = true;
    if(hand.length > 0) {
        var handSearch = $('#playableHand input');
        $.each(handSearch, function(i, value){
            discard("fromHand",value.id);
            });
    }
    if (playerDeck.length >= drawCount) {
        for(var i = 0; i < drawCount && playerDeck.length !== 0; i++) {
            add(playerDeck[0], isNewHand);
	    isNewHand = false;
        }
    } else {
        reDeck(discardPile);
        for(var i = 0; i < drawCount && playerDeck.length !== 0; i++) {
            add(playerDeck[0], isNewHand);
	    isNewHand = false;
        }
    }
    $("#buyableCardsList").children().remove();
	$("#trashList").children().remove();
    isBuyListUp = false;
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

function add(card, isNewHand){
    if(playerDeck.indexOf(card) > -1) {
        hand.unshift(card);
        playerDeck.splice(playerDeck.indexOf(card), 1);
        displayHand(card, isNewHand);
    }
    else document.getElementById("errorCatch").innerHTML="ERROR ADDING CARD, COULD NOT REMOVE FROM PLAYERDECK";
}

function displayHand(card, isNewHand){
    if(isNewHand){
	cardId = 0;
    } else {
	cardId++;
    }
    $("#playableHand").append("<input id='"+cardId+"'>");
    $("#"+cardId).attr({"type":"button","value":card.name,"onclick":"onCardPress("+cardId+")"});
    $("#"+cardId).data(cardId.toString(), card);
	classDefiner(card.cardType, cardId);
}

function updateAll(){
    document.getElementById("HMoney").innerHTML=moneyCount;
    document.getElementById("displayActions").innerHTML=actionCount;
    document.getElementById("displayBuys").innerHTML=buyCount;
    deckReader();
    discardReader();
}

function deckReader(){
    //var deckReader = [];    
    //for (var i in playerDeck){
    //    deckReader.push(playerDeck[i].name);
    //}
    //document.getElementById("deckTest").innerHTML="Deck: " + deckReader;
	document.getElementById("deckTest").innerHTML="Number of cards in Deck Pile: " + playerDeck.length.toString();
}

function discardReader(){
    //var discardReader = [];
    //for (var i in discardPile){
    //    discardReader.push(discardPile[i].name);
    //}
    document.getElementById("discardPile").innerHTML="Number of Cards in Discard Pile: " + discardPile.length.toString();
}

function buyList(buyableCards){
    //var buyableCardArray = listOfBuyableCards()
    if(buyCount>=1) {
        if(isBuyListUp == false){
            isBuyListUp = true;
            for (var i in buyableCards) {
                var card = buyableCards[i];
                cardId++;
                $("#buyableCardsList").append("<input id='"+cardId+"'>");
                $("#"+cardId).attr({"type":"button", "value":card.name + " |Cost:" + card.cost + "| Remaining:" + card.remainingCards, "onclick":"buy("+cardId.toString()+")"});
                $("#"+cardId).data(cardId.toString(), card);
				classDefiner(card.cardType, cardId);
            }
            $("#buyableCardsList").append("<input id=cancel>");
            $("#cancel").attr({"type":"button", "value":"cancel", "onclick":"buy('cancel')"});
        //$("#cancel").attr("type", "button").attr("value","cancel").attr("onclick","buy('cancel')"); old style
		
            buyCount--;
        }
    }
    updateAll();
}

function classDefiner(cardType, cardId){
	switch(cardType) {
		case 'action':
				$("#"+cardId).attr("class", "actionCard");
				break;
		default:
			$("#"+cardId).attr("class", "errornotfound");
			break;
		case 'money':
			$("#"+cardId).attr("class", "moneyCard");
			break;
		case 'victoryCard':
			$("#"+cardId).attr("class", "victoryCard");
			break;
		case 'last':
			$("#"+cardId).attr("class", "errorlast");
			break;
			}
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
            if(card.remainingCards === 0) {
                cardsDepleted += 1;
            }
            discard("fromBuy");
        }
        if(cardsDepleted >= 3 || province.remainingCards === 0) {
            endGame();
        }
    }
    isBuyListUp = false;
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

function chapelaction() {
for(var i in hand){
	    cardId++;
		$("#trashList").append("<input id='"+cardId+"'> <label>"+hand[i].name+"</label>");
		$("#"+cardId).attr({"type":"checkbox","value":hand[i].name,"name":"trashValues"});
		}
	$("#trashList").append("<input id='confirm' type='button' value='confirm' onClick=trashFromHand()>")
		
		//        if (hand.indexOf(card) > -1) {
        //    discardPile.push(hand[hand.indexOf(card)]);
        //    hand.splice(hand.indexOf(card), 1);
        //    $("#"+cardId).remove();
        //} else document.getElementById("errorCatch").innerHTML="ERROR, CARD NOT FOUND IN HAND WHILE TRYING TO DISCARD";
}

function trashFromHand() {
    $(":checked").each(
		function(){
		var index = valueChecker(this.value);
		if(index === -1)
			console.log("card not found in hand");
		else{
			console.log(index);
			hand.splice(index, 1);
		}
	});
	$("#playableHand").children().remove();
	for(var j in hand) {
		displayHand(hand[j], false);
	}
	$("#trashList").children().remove();	
}

function valueChecker(value){
	var index = -1;
	for(var i in hand){
		if(hand[i].name == value){
			return i;
		}		
	}
	return index;
}

function endGame(){
    $("#playerBoard").children().remove();
    $("#gameInitializer").show();
    $("#victoryText").text("YOU WIN CARL. WAY TO GO. I DON'T KNOW HOW MANY VICTORY POINTS YOU HAVE CAUSE I AM LAZY CODING RIGHT NOW");
}
