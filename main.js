var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        var cards = JSON.parse(xhttp.responseText);
        var portraits = cards.filter(card => (card.type === "HERO" && card.set === "CORE"));
        var sortedPortraits = portraits.sort((a,b) => a.cardClass.localeCompare(b.cardClass));
        var classLinks = document.querySelectorAll(".link--class");
        classLinks.forEach((link, index) => link.innerHTML = `<img class="link--class__img" src = "https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${sortedPortraits[index].id}.png"></img>`);
    };
}
xhttp.open("GET", "Cards.json", true);
xhttp.send();