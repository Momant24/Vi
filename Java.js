document.getElementById("fargeEndreKnapp").addEventListener("click", function() {
    document.body.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
});

document.getElementById("tekstEndreKnapp").addEventListener("click", function() {
    document.getElementById("fargeEndreKnapp").textContent = "Farge Endret!";
});

let poeng = 0;
document.getElementById("spillKnapp").addEventListener("click", function() {
    document.getElementById("spillContainer").style.display = "block";
});

document.getElementById("poengKnapp").addEventListener("click", function() {
    poeng++;
    document.getElementById("poeng").textContent = poeng;
});
