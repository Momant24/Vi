// Endre bakgrunnsfarge
document.getElementById("fargeEndreKnapp").addEventListener("click", function() {
    document.body.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
});

// Endre tekst
let overskriftTekster = ["Velkommen til Den Morsomme Nettsiden!", "Er du klar for moro?", "Moro starter her!", "Nettsiden blir mer spennende!", "Ha det gøy!"];
document.getElementById("tekstEndreKnapp").addEventListener("click", function() {
    let tilfeldigIndex = Math.floor(Math.random() * overskriftTekster.length);
    document.querySelector('h1').textContent = overskriftTekster[tilfeldigIndex];
});

// Enkelt poengbasert spill
let poeng = 0;
document.getElementById("spillKnapp").addEventListener("click", function() {
    document.getElementById("spillContainer").style.display = "block";
});

document.getElementById("poengKnapp").addEventListener("click", function() {
    poeng++;
    document.getElementById("poeng").textContent = poeng;
});

// Memory-spill
let kortArray = ['🍏', '🍏', '🍎', '🍎', '🍐', '🍐', '🍊', '🍊', '🍋', '🍋', '🍌', '🍌'];
let kortValgt = [];
let kortValgtId = [];

document.getElementById("startMemorySpill").addEventListener("click", startMemorySpill);

function startMemorySpill() {
    kortArray.sort(() => 0.5 - Math.random());

    const brett = document.getElementById("memorySpillBrett");
    brett.innerHTML = '';
    kortArray.forEach((kort, index) => {
        const kortElement = document.createElement('div');
        kortElement.setAttribute('data-id', index);
        kortElement.addEventListener('click', vendKort);
        // Style kortene
        kortElement.style.width = '100px';
        kortElement.style.height = '100px';
        kortElement.style.backgroundColor = 'lightblue';
        kortElement.style.margin = '10px';
        kortElement.style.display = 'inline-block';
        brett.appendChild(kortElement);
    });

    kortValgt = [];
    kortValgtId = [];
}

function vendKort() {
    const valgtKort = this;
    const kortId = valgtKort.getAttribute('data-id');
    if (!kortValgtId.includes(kortId)) {
        kortValgt.push(kortArray[kortId]);
        kortValgtId.push(kortId);
        valgtKort.textContent = kortArray[kortId];

        if (kortValgt.length === 2) {
            setTimeout(sjekkForMatch, 500);
        }
    }
}

function sjekkForMatch() {
    const kort = document.querySelectorAll('#memorySpillBrett div');
    const valg1 = kortValgtId[0];
    const valg2 = kortValgtId[1];

    if (kortValgt[0] === kortValgt[1] && valg1 !== valg2) {
        alert('Du fant en match!');
        kort[valg1].style.visibility = 'hidden';
        kort[valg2].style.visibility = 'hidden';
    } else {
        kort[valg1].textContent = '';
        kort[valg2].textContent = '';
    }

    kortValgt = [];
    kortValgtId = [];
}

// Gjette-spill
document.getElementById("gjettKnapp").addEventListener("click", gjennomforGjett);

function gjennomforGjett() {
    const tilfeldigTall = Math.floor(Math.random() * 10) + 1;
    const brukerGjett = parseInt(document.getElementById("gjettInput").value);
    const resultat = document.getElementById("gjetteResultat");

    if (brukerGjett === tilfeldigTall) {
        resultat.textContent = "Riktig! Du gjettet tallet!";
    } else {
        resultat.textContent = "Feil, prøv igjen. Det riktige tallet var " + tilfeldigTall;
    }
}

// Vis spill-knapper
document.getElementById("visMemorySpillKnapp").addEventListener("click", function() {
    document.getElementById("memorySpillContainer").style.display = "block";
});

document.getElementById("visGjetteSpillKnapp").addEventListener("click", function() {
    document.getElementById("gjetteSpillContainer").style.display = "block";
});
document.getElementById("visHigherLowerSpillKnapp").addEventListener("click", function() {
    document.getElementById("higherLowerSpillContainer").style.display = "block";
    document.getElementById("naavaerendeTall").textContent = Math.floor(Math.random() * 10) + 1;
});

document.getElementById("higherButton").addEventListener("click", function() {
    gjettOmHoyereEllerLavere(true);
});

document.getElementById("lowerButton").addEventListener("click", function() {
    gjettOmHoyereEllerLavere(false);
});

function gjettOmHoyereEllerLavere(gjettHoyere) {
    const naavaerendeTall = parseInt(document.getElementById("naavaerendeTall").textContent, 10);
    const nyttTall = Math.floor(Math.random() * 10) + 1;
    const riktig = (gjettHoyere && nyttTall > naavaerendeTall) || (!gjettHoyere && nyttTall < naavaerendeTall);

    document.getElementById("naavaerendeTall").textContent = nyttTall;
    document.getElementById("higherLowerResultat").textContent = riktig ? "Riktig!" : "Feil! Nytt tall: " + nyttTall;
}
document.getElementById("visRockPaperScissorsKnapp").addEventListener("click", function() {
    document.getElementById("rockPaperScissorsContainer").style.display = "block";
});

document.getElementById("rockButton").addEventListener("click", function() {
    spilleRockPaperScissors("Stein");
});
document.getElementById("paperButton").addEventListener("click", function() {
    spilleRockPaperScissors("Papir");
});
document.getElementById("scissorsButton").addEventListener("click", function() {
    spilleRockPaperScissors("Saks");
});

function spilleRockPaperScissors(spillerValg) {
    const valg = ["Stein", "Papir", "Saks"];
    const datamaskinValg = valg[Math.floor(Math.random() * valg.length)];
    
    if (spillerValg === datamaskinValg) {
        document.getElementById("rockPaperScissorsResultat").textContent = "Uavgjort! Begge valgte " + spillerValg;
    } else if ((spillerValg === "Stein" && datamaskinValg === "Saks") ||
               (spillerValg === "Papir" && datamaskinValg === "Stein") ||
               (spillerValg === "Saks" && datamaskinValg === "Papir")) {
        document.getElementById("rockPaperScissorsResultat").textContent = "Du vinner! " + spillerValg + " slår " + datamaskinValg;
    } else {
        document.getElementById("rockPaperScissorsResultat").textContent = "Du taper! " + datamaskinValg + " slår " + spillerValg;
    }
}
