var urlParams = new URLSearchParams(window.location.search);
var keys = urlParams.keys();
var classNameSpan = document.getElementById("hsclassname");
var className = urlParams.get('hsclassname');
classNameSpan.innerText =  className[0].toUpperCase() + className.substring(1);

// var cardList = document.querySelectorAll(".link--card");
// console.log(cardList)
// for (let card_link of cardList){
//     console.log(card_link);
//     card_link.innerHTML = '<img src = "https://art.hearthstonejson.com/v1/render/latest/enUS/256x/AT_001.png"></img>'
// }

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        var cards = JSON.parse(xhttp.responseText);
        var sortedCards = cards.sort((a,b) => a.cost - b.cost);
        var classCards =  sortedCards.filter(card => card.cardClass === className.toUpperCase())
        var p1Cards = classCards.slice(0,8);
        var cardList = document.querySelectorAll(".link--card")
        cardList.forEach((card_link, index) => {
            card_link.innerHTML = `<img class="link--card--img" src = "https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${p1Cards[index].id}.png"></img>`
        });
        // for (card_link of cardList){
        //     card_link.innerHTML = '<img src = "https://art.hearthstonejson.com/v1/render/latest/enUS/256x/AT_001.png"></img>'
        // }
    }
};
xhttp.open("GET", "Cards.json", true);
xhttp.send();