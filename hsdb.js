var urlParams = new URLSearchParams(window.location.search);
var keys = urlParams.keys();
var classNameSpan = document.getElementById("hsclassname");
var className = urlParams.get('hsclassname');
classNameSpan.innerText =  className[0].toUpperCase() + className.substring(1);
var deckList = document.querySelector(".list--deck");
var deckArray = [];
class deckCard{
    constructor(cost, id, name, cardCount){
        this.cost = cost;
        this.id = id;
        this.name = name;
        this.cardCount = cardCount;
    }
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        var cards = JSON.parse(xhttp.responseText);
        var playableCards = cards.filter(card => !(card.type === "HERO" && (card.set === "HERO_SKINS" || card.set === "CORE")));
        var standardSets = ["CORE", "EXPERT1", "GILNEAS", "BOOMSDAY", "TROLL", "DALARAN"]
        var standardCards = playableCards.filter(card => (standardSets.indexOf(card.set) > -1));
        var sortedCards = standardCards.sort((a,b) => a.cost - b.cost || a.name.localeCompare(b.name));
        var classCards =  sortedCards.filter(card => card.cardClass === className.toUpperCase());
        var neutralCards =  sortedCards.filter(card => card.cardClass === "NEUTRAL");
        var pagecards = classCards.concat(neutralCards);
        var cardList = document.querySelector(".list--cards");
        listInnerHtml = "";
        for (card of pagecards){
            listInnerHtml += `<li class="list--cards__card"><a href="#" class="link--card" id="${card.id}"><img class="link--card--img" src = "https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${card.id}.png"></img></a></li>`
        };
        cardList.innerHTML = listInnerHtml;
        var linkCards = document.querySelectorAll(".link--card");
        linkCards.forEach(function(cardLink){
            cardLink.addEventListener("click", function(){
                addCardToDeckArr(deckArray, cardLink.id);
            });
            cardLink.addEventListener("contextmenu", function(e){
                e.preventDefault();
                removeCardFromDeckArr(deckArray, cardLink.id);
                return false;
            }, false);
        });
        function addCardToDeckArr(deckArray, cardID){
            totalCardsInDeck = deckArray
                .map(card => card.cardCount)
                .reduce((total, val) => total + val, 1);
            if(totalCardsInDeck <= 30){
                var currentCard = pagecards.filter(card => card.id === cardID)[0];
                if(deckArray.length === 0){
                    deckArray.push(new deckCard(currentCard.cost, currentCard.id, currentCard.name, 1));
                }
                else{
                    var deckIDs = deckArray.map(dcard => dcard.id);
                    if(deckIDs.includes(cardID) === false){
                        deckArray.push(new deckCard(currentCard.cost, currentCard.id, currentCard.name, 1));
                    }
                    else{
                        deckArray.forEach(function(dCard){
                            if(dCard.id === cardID){
                                if(dCard.cardCount < 2){
                                    dCard.cardCount += 1;
                                }
                            }
                        });
                    }
                }
                generateDeck(deckArray);
            }
        };
        function removeCardFromDeckArr(deckArray, cardID){
            deckArray.forEach(function(dCard, index){
                if(dCard.id === cardID){
                    if(dCard.cardCount === 2){
                        dCard.cardCount = 1;
                    }
                    else{
                        deckArray.splice(index, 1);
                    }
                }
            });
            generateDeck(deckArray);
        }
    };
};
xhttp.open("GET", "Cards.json", true);
xhttp.send();

function generateDeck(deckArray){
    var currList = "";
    var sortedDeck = deckArray.sort((a,b) => a.cost - b.cost || a.name.localeCompare(b.name));
    for (dCard of sortedDeck){
        currList += `<li class="list--deck__card">${dCard.cost}    ${dCard.name}    x${dCard.cardCount}</li>`
        // currList += `<div class="list--deck__card--cost">${dCard.cost}</div><div class="list--deck__card--name">${dCard.name}</div><div class="list--deck__card--count">x${dCard.cardCount}</div>`
    };
    deckList.innerHTML = currList;
}