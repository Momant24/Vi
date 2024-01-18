
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
document.getElementById("visQuizSpillKnapp").addEventListener("click", function() {
    document.getElementById("quizSpillContainer").style.display = "block";
    visQuizSporsmaal();
});

let quizSporsmaalOgSvar = {
    sporsmaal: "Hva er hovedstaden i Norge?",
    svar: ["Oslo", "Bergen", "Trondheim"],
    korrektSvar: "Oslo"
};

function visQuizSporsmaal() {
    document.getElementById("quizSporsmaal").textContent = quizSporsmaalOgSvar.sporsmaal;
    document.getElementById("svar1").textContent = quizSporsmaalOgSvar.svar[0];
    document.getElementById("svar2").textContent = quizSporsmaalOgSvar.svar[1];
    document.getElementById("svar3").textContent = quizSporsmaalOgSvar.svar[2];
}

document.getElementById("svar1").addEventListener("click", function() {
    sjekkSvar(quizSporsmaalOgSvar.svar[0]);
});
document.getElementById("svar2").addEventListener("click", function() {
    sjekkSvar(quizSporsmaalOgSvar.svar[1]);
});
document.getElementById("svar3").addEventListener("click", function() {
    sjekkSvar(quizSporsmaalOgSvar.svar[2]);
});

function sjekkSvar(valgtSvar) {
    if (valgtSvar === quizSporsmaalOgSvar.korrektSvar) {
        document.getElementById("quizResultat").textContent = "Riktig!";
    } else {
        document.getElementById("quizResultat").textContent = "Feil. Riktig svar er " + quizSporsmaalOgSvar.korrektSvar;
    }
}
document.getElementById("visGjetteOrdSpillKnapp").addEventListener("click", function() {
    document.getElementById("gjetteOrdSpillContainer").style.display = "block";
    startGjetteOrdSpill();
});

let valgtOrd;
let visningsOrd;

function startGjetteOrdSpill() {
    const ordListe = ["apple", "banana", "orange"];
    valgtOrd = ordListe[Math.floor(Math.random() * ordListe.length)];
    visningsOrd = "_".repeat(valgtOrd.length);
    document.getElementById("ordDisplay").textContent = visningsOrd;
    document.getElementById("gjetteOrdResultat").textContent = "";
}

document.getElementById("gjettBokstavKnapp").addEventListener("click", function() {
    const bokstav = document.getElementById("bokstavInput").value.toLowerCase();
    if (bokstav && bokstav.length === 1) {
        gjettBokstav(bokstav);
    }
    document.getElementById("bokstavInput").value = ""; // Tømmer input-feltet
});

function gjettBokstav(bokstav) {
    let oppdatertVisning = "";
    let riktigGjettet = false;

    for (let i = 0; i < valgtOrd.length; i++) {
        if (valgtOrd[i] === bokstav) {
            oppdatertVisning += bokstav;
            riktigGjettet = true;
        } else {
            oppdatertVisning += visningsOrd[i];
        }
    }

    visningsOrd = oppdatertVisning;
    document.getElementById("ordDisplay").textContent = visningsOrd;

    if (!visningsOrd.includes("_")) {
        document.getElementById("gjetteOrdResultat").textContent = "Gratulerer! Du gjettet ordet!";
    } else if (!riktigGjettet) {
        document.getElementById("gjetteOrdResultat").textContent = "Feil, prøv igjen.";
    }
}
document.getElementById("visOrdPuslespillKnapp").addEventListener("click", function() {
    document.getElementById("ordPuslespillContainer").style.display = "block";
    startOrdPuslespill();
});

const ordListe = ["apple", "banana", "cherry", "grape", "orange", "strawberry", "watermelon"];

function startOrdPuslespill() {
    const puslespillRute = document.getElementById("puslespillRute");
    puslespillRute.innerHTML = "";

    // Velg et tilfeldig ord fra listen
    const tilfeldigOrd = ordListe[Math.floor(Math.random() * ordListe.length)];

    // Del ordet opp i bokstaver
    const bokstaver = tilfeldigOrd.split("");

    // Lag en rute for hvert brev i ordet
    for (const bokstav of bokstaver) {
        const rute = document.createElement("div");
        rute.classList.add("puslespillRute");
        rute.textContent = bokstav;
        puslespillRute.appendChild(rute);
    }
}

document.getElementById("nyttPuslespillKnapp").addEventListener("click", startOrdPuslespill);
document.getElementById("visKryssordKnapp").addEventListener("click", function() {
    document.getElementById("kryssordSpillContainer").style.display = "block";
    startKryssordSpill();
});

const kryssordData = {
    dimensjoner: { rader: 8, kolonner: 8 },
    ord: [
        { retning: "vannrett", rad: 0, kolonne: 0, svar: "elefant", hint: "Stor dyreart" },
        { retning: "vannrett", rad: 2, kolonne: 3, svar: "sjokolade", hint: "Søt godbit" },
        { retning: "vannrett", rad: 4, kolonne: 2, svar: "sykkel", hint: "Tohjulig kjøretøy" },
        { retning: "vannrett", rad: 6, kolonne: 0, svar: "fotball", hint: "Lagsport" },
        { retning: "lodrett", rad: 0, kolonne: 2, svar: "blomst", hint: "Naturens skjønnhet" },
        { retning: "lodrett", rad: 0, kolonne: 5, svar: "bokstav", hint: "Den minste enheten i språket" },
        { retning: "lodrett", rad: 3, kolonne: 7, svar: "musikk", hint: "Lyd i harmoni" },
        { retning: "lodrett", rad: 5, kolonne: 4, svar: "regnbue", hint: "Syv farger på himmelen" }
    ]
};

function startKryssordSpill() {
    const kryssordBrett = document.getElementById("kryssordBrett");
    kryssordBrett.innerHTML = "";

    for (let rad = 0; rad < kryssordData.dimensjoner.rader; rad++) {
        const radDiv = document.createElement("div");
        radDiv.classList.add("kryssordRad");

        for (let kolonne = 0; kolonne < kryssordData.dimensjoner.kolonner; kolonne++) {
            const kolonneDiv = document.createElement("div");
            kolonneDiv.classList.add("kryssordKolonne");

            // Finn ut om dette ruten skal ha en celle eller ikke
            const celle = kryssordData.ord.find(ordInfo => (
                (ordInfo.retning === "vannrett" && ordInfo.rad === rad && kolonne >= ordInfo.kolonne && kolonne < ordInfo.kolonne + ordInfo.svar.length) ||
                (ordInfo.retning === "lodrett" && kolonne === ordInfo.kolonne && rad >= ordInfo.rad && rad < ordInfo.rad + ordInfo.svar.length)
            ));

            if (celle) {
                kolonneDiv.classList.add("kryssordCelle");
                kolonneDiv.dataset.ordIndex = kryssordData.ord.indexOf(celle);
                kolonneDiv.dataset.ordRetning = celle.retning;
                kolonneDiv.dataset.ordLengde = celle.svar.length;
            }

            radDiv.appendChild(kolonneDiv);
        }

        kryssordBrett.appendChild(radDiv);
    }

    // Legg til hintene
    const hintDiv = document.createElement("div");
    hintDiv.id = "kryssordHint";
    kryssordData.ord.forEach(ordInfo => {
        const hint = document.createElement("p");
        hint.textContent = `${ordInfo.retning}: ${ordInfo.hint} (${ordInfo.svar.length} bokstaver)`;
        hintDiv.appendChild(hint);
    });

    kryssordSpillLyttere();
    kryssordBrett.appendChild(hintDiv);
}

function kryssordSpillLyttere() {
    const kryssordCeller = document.querySelectorAll(".kryssordCelle");
    kryssordCeller.forEach(celle => {
        celle.addEventListener("click", () => {
            const ordIndex = parseInt(celle.dataset.ordIndex);
            const ordRetning = celle.dataset.ordRetning;
            const ordLengde = parseInt(celle.dataset.ordLengde);

            const svar = prompt(`Skriv inn ${ordLengde} bokstaver for ordet: ${kryssordData.ord[ordIndex].hint}`);
            if (svar) {
                const riktigSvar = kryssordData.ord[ordIndex].svar.toLowerCase();
                if (svar.toLowerCase() === riktigSvar) {
                    // Riktig svar
                    celle.classList.add("kryssordRiktigSvar");
                    celle.textContent = riktigSvar;
                    celle.removeEventListener("click", null);
                }
            }
        });
    });
}
document.getElementById("visTallGjetningKnapp").addEventListener("click", function() {
    document.getElementById("tallGjetningSpillContainer").style.display = "block";
    startTallGjetningSpill();
});

let riktigTall;

function startTallGjetningSpill() {
    genererNyttRiktigTall(); // Legg til denne linjen for å generere et nytt riktig tall ved oppstart
    document.getElementById("tallGjetningResultat").textContent = "";
    
    document.getElementById("sjekkTallKnapp").addEventListener("click", sjekkTallGjetning);
}

function genererNyttRiktigTall() {
    riktigTall = Math.floor(Math.random() * 100) + 1;
}

function sjekkTallGjetning() {
    const brukerTall = parseInt(document.getElementById("tallInput").value);
    
    if (isNaN(brukerTall)) {
        document.getElementById("tallGjetningResultat").textContent = "Skriv inn et gyldig tall.";
    } else {
        if (brukerTall === riktigTall) {
            document.getElementById("tallGjetningResultat").textContent = "Gratulerer! Du gjettet riktig tall.";
            genererNyttRiktigTall(); // Legg til denne linjen for å generere et nytt riktig tall etter riktig gjetning
        } else if (brukerTall < riktigTall) {
            document.getElementById("tallGjetningResultat").textContent = "Tallet er større. Prøv igjen.";
        } else {
            document.getElementById("tallGjetningResultat").textContent = "Tallet er mindre. Prøv igjen.";
        }
    }
}
let antallKlikk = 0;

document.addEventListener("DOMContentLoaded", () => {
    const mål = document.getElementById("mål");
    const antallKlikkElement = document.getElementById("antallKlikk");

    mål.addEventListener("click", () => {
        antallKlikk++;
        antallKlikkElement.textContent = antallKlikk;

        flyttMål();
    });
});

function flyttMål() {
    const brett = document.getElementById("spillBrett");
    const mål = document.getElementById("mål");

    const maxX = brett.clientWidth - mål.clientWidth;
    const maxY = brett.clientHeight - mål.clientHeight;

    const nyX = Math.floor(Math.random() * maxX);
    const nyY = Math.floor(Math.random() * maxY);

    mål.style.left = nyX + "px";
    mål.style.top = nyY + "px";
}
// Liste over mulige bilder
const bilder = [
    'bilder/Jacob.png',
    'bilder/Trump.jpg',
    'bilder/Tux.png',
    // Legg til flere bilder her
];

// Velg et tilfeldig bilde fra listen
const tilfeldigBilde = bilder[Math.floor(Math.random() * bilder.length)];

// Sett bildet som kilde for img-elementet
document.getElementById('skjultBilde').src = tilfeldigBilde;

document.getElementById('visGjettDetSkjulteBildeKnapp').addEventListener('click', function() {
    document.getElementById('gjettDetSkjulteBildeContainer').style.display = 'block';
});

document.getElementById('sjekkGjettKnapp1').addEventListener('click', function() {
    const brukerSvar1 = document.getElementById('gjettInput1').value.toLowerCase();

    console.log("User input:", brukerSvar1);

    if (brukerSvar1 === "jakob" || brukerSvar1 === "tux" || brukerSvar1 === "trump" ) {
        document.getElementById('gjettResultat1').textContent = 'Riktig svar!';
    } else {
        document.getElementById('gjettResultat1').textContent = 'Feil svar. Prøv igjen.';
    }
    
    
});