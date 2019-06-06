var urlParams = new URLSearchParams(window.location.search);
var keys = urlParams.keys();
var classNameSpan = document.getElementById("hsclassname");
var className = urlParams.get('hsclassname');
classNameSpan.innerText =  className[0].toUpperCase() + className.substring(1);
var deck = document.querySelector(".side--deck");


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
                addCardToDeck(deck, cardLink.id);
            });
        })
        function addCardToDeck(myDeck, cardID){
            cardinDecks = myDeck.innerHTML;
            //add id to an empty array, check count of current id in array before adding it to deck
            deck.innerHTML = cardinDecks + `<li><img src = "https://art.hearthstonejson.com/v1/tiles/${cardID}.png"></img></li>`;
        };
    };
};
xhttp.open("GET", "Cards.json", true);
xhttp.send();

