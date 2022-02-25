"use strict";

let jeu = document.querySelector("#jeu");

let usePlasma = document.querySelector("#usePlasma");
let useEnnergie = document.querySelector("#useEnnergie");
let useBouclier = document.querySelector("#useBouclier");
let useChasseur = document.querySelector("#useChasseur");

let pvAllier = document.querySelector("#aVie div");
let pvEnnemie = document.querySelector("#eVie div");
let nbpvAllier = document.querySelector("#aVie h2");
let nbpvEnnemie = document.querySelector("#eVie h2");
let amiral = document.querySelector("#message p");
let final = document.querySelector("h1");
let vAllier = document.querySelector("#vAllier");
let vEnnemie = document.querySelector("#vEnnemie");
let chasseur1 = document.querySelector("#chasseur1");
let chasseur2 = document.querySelector("#chasseur2");
let chasseur3 = document.querySelector("#chasseur3");
let chasseur4 = document.querySelector("#chasseur4");
let chasseurRestant = document.querySelector("#chasseurRestant");

let piuAllier = document.querySelector("#piuAllierD");
let piuEnnemie = document.querySelector("#piuEnnemieD");
let piuAllierEvent = document.querySelector("#piuAllierA");
let piuEnnemieEvent = document.querySelector("#piuEnnemieA");
let piuChasseur1 = document.querySelector("#piuChasseur1");
let piuChasseur2 = document.querySelector("#piuChasseur2");
let piuChasseur3 = document.querySelector("#piuChasseur3");
let piuChasseur4 = document.querySelector("#piuChasseur4");

let boumEnnemie = document.querySelector("#boumEnnemie");
let boumAllier = document.querySelector("#boumAllier");
let boumEnnemieC1 = document.querySelector("#boumEnnemieC1");
let boumEnnemieC2 = document.querySelector("#boumEnnemieC2");
let boumEnnemiec3 = document.querySelector("#boumEnnemieC3");
let boumEnnemiec4 = document.querySelector("#boumEnnemieC4");

let bouclier = document.querySelector("#bouclier")

let ennergie = document.querySelector("#ennergie");
let stun = document.querySelector("#stun");

let destructionEnnemie = document.querySelector("#destructionEnnemie");
let destructionAllier = document.querySelector("#destructionAllier");
let boum1 = document.querySelector("#boum1");
let boum2 = document.querySelector("#boum2");
let boum3 = document.querySelector("#boum3");
let boum4 = document.querySelector("#boum4");
let boum5 = document.querySelector("#boum5");
let boum6 = document.querySelector("#boum6");
let boum7 = document.querySelector("#boum7");
let boum8 = document.querySelector("#boum8");
let boum9 = document.querySelector("#boum9");
let boum10 = document.querySelector("#boum10");
let boum11 = document.querySelector("#boum11");
let boum12 = document.querySelector("#boum12");
let boum13 = document.querySelector("#boum13");
let boum14 = document.querySelector("#boum14");

//-----------M--------------//

let gagne = false;
let perdu = false;

let allier = {
    pv: 250,
    plasma: false,
    energie: false,
    bouclier: false,
    countBouclier: 0,
    chasseur: 10,
    boum: false,
}

let ennemie = {
    pv: 250,
    piu: false,
    stun: false,
    countStun: 0,
    boum: false,
    boumC: false,
    disableBoum: false
}

let chasseur = {
    tire: false,
    c1: false,
    c2: false,
    c3: false,
    c4: false
}

let messages = {
    debut: "Ennemie en approche. J'attend vos instructions mon commandant.",
    Plasmas: "Armer les canons Plasma. Feu !",
    bouclier: "Activation du bouclier !",
    chasseur: "Faites sortir un chasseur du hangar !",
    ennergie: "Preparez le rayon a ennergie ! Attention, Feu !",
    dammageEnnemie: "Ils ont l'aire d'avoir subit de gros dommages !",
    rate: "nous avons manqué notre cible !",
    ennergieEnnemie: "Voila qui devrait les ralentir un moment !",
    ennemieCantPlay: "Il semblerais que l'ennemie est encore sous l'emprise du rayon à Ennergie.",
    attacEnnemie: "L'ennemie nous attaque, accrochez vous !",
    dammageAllier: "La coque de notre vaisseau à été endommager.",
    damageBouclier: "Le bouclier a absorbé la totalité des dégats.",
    perdu: "Adieu mon commandant, ce fut un honneur d'etre dans votre équipage.",
    gagne: "Nous avons réussi, le vaisseau ennemie est détruit !"
}

let message = messages.debut;


//---------------C------------//
function enable() {
    usePlasma.disabled = false;
    if (allier.bouclier === false) {
        useBouclier.disabled = false;
    }
    if (allier.countBouclier != 0) {
        allier.countBouclier -= 1;
    } else if (allier.countBouclier === 0) {
        allier.bouclier = false;
    }
    if (allier.chasseur === 0) {
        useChasseur.disabled = true;
    } else if (chasseur.c1 === true && chasseur.c2 === true && chasseur.c3 === true && chasseur.c4 === true) {
        useChasseur.disabled = true;
    } else {
        useChasseur.disabled = false;
    }
    if (ennemie.stun === false && ennemie.countStun === 0) {
        useEnnergie.disabled = false;
    } else {
        ennemie.countStun -= 1;
    }
}

function disable() {
    usePlasma.disabled = true;
    useBouclier.disabled = true;
    useChasseur.disabled = true;
    useEnnergie.disabled = true;
}

function tourEnnemie() {
    if (ennemie.countStun === 0) {
        ennemie.stun = false;
        ennemie.piu = true;
        message = messages.attacEnnemie;
    } else {
        message = messages.ennemieCantPlay;
        enable();
    }
}

function degaChasseur(lequel) {
    if (lequel === true) {
        ennemie.pv -= Math.trunc((Math.random() * 7) + 3);
        if (ennemie.pv <= 0) {
            ennemie.pv = 0;
        }
    }

}

usePlasma.addEventListener("click", function() {
    disable();
    message = messages.Plasmas;
    allier.plasma = true;
    chasseur.tire = true;
});

useEnnergie.addEventListener("click", function() {
    disable();
    message = messages.ennergie;
    allier.energie = true;
});

useBouclier.addEventListener("click", function() {
    disable();
    message = messages.bouclier;
    allier.bouclier = true;
    allier.countBouclier = 1;
    chasseur.tire = true;
});

useChasseur.addEventListener("click", function() {
    disable();
    message = messages.chasseur;
    if (chasseur.c1 === false) {
        chasseur.c1 = true;
    } else if (chasseur.c2 === false) {
        chasseur.c2 = true;
    } else if (chasseur.c3 === false) {
        chasseur.c3 = true;
    } else if (chasseur.c4 === false) {
        chasseur.c4 = true;
    }
    allier.chasseur -= 1;
});

piuAllierEvent.addEventListener("animationend", function() {
    allier.plasma = false;
    chasseur.tire = false;
    let j = Math.random();
    if (j >= 0.9) {
        message = messages.rate;
    } else {
        ennemie.pv -= Math.trunc((Math.random() * 10) + 100);
        message = messages.dammageEnnemie;
    }
    degaChasseur(chasseur.c1);
    degaChasseur(chasseur.c2);
    degaChasseur(chasseur.c3);
    degaChasseur(chasseur.c4);
    if (ennemie.pv <= 0) {
        ennemie.pv = 0;
    }
    ennemie.boum = true;
    ennemie.boumC = true;
});

boumEnnemie.addEventListener("animationend", function() {
    ennemie.boum = false;
    ennemie.boumC = false;
    ennemie.disableBoum = false;
    if (ennemie.pv === 0) {
        ennemie.piu = false;
        message = messages.gagne;
        gagne = true;
    } else {
        tourEnnemie();
    }
});

piuEnnemieEvent.addEventListener("animationend", function() {
    ennemie.piu = false;
    if (allier.bouclier === false) {
        message = messages.dammageAllier;
        allier.pv -= Math.trunc((Math.random() * 20) + 50);
        if (allier.pv <= 0) {
            allier.pv = 0;
        }
    } else {
        let i = Math.random();
        if (i <= 0.6) {
            message = messages.damageBouclier;
        } else {
            if (chasseur.c1 === true) {
                chasseur.c1 = false;
            } else if (chasseur.c2 === true && chasseur.c1 === false) {
                chasseur.c2 = false;
            } else if (chasseur.c3 === true && chasseur.c2 === false) {
                chasseur.c3 = false;
            } else if (chasseur.c4 === true && chasseur.c3 === false) {
                chasseur.c4 = false;
            } else {
                message = messages.damageBouclier;
            }
        }
    }
    allier.boum = true;
});

boumAllier.addEventListener("animationend", function() {
    allier.boum = false;
    if (allier.pv === 0) {
        message = messages.perdu;
        perdu = true;
    } else {
        enable();
    }
});

ennergie.addEventListener("animationend", function() {
    allier.energie = false;
    let j = Math.random();
    if (j >= 0.8) {
        message = messages.rate;
        ennemie.piu = true;
        ennemie.countStun = 1;
    } else {
        ennemie.stun = true;
        ennemie.countStun = 2;
        message = messages.ennergieEnnemie;
        enable();
    }
});

bouclier.addEventListener("animationend", function() {
    chasseur.tire = false;
    if (ennemie.pv <= 0) {
        ennemie.pv = 0;
    }
    if (chasseur.c1 === true || chasseur.c2 === true || chasseur.c3 === true || chasseur.c4 === true) {
        ennemie.boum = true;
        ennemie.boumC = true;
        ennemie.disableBoum = true;
        degaChasseur(chasseur.c1);
        degaChasseur(chasseur.c2);
        degaChasseur(chasseur.c3);
        degaChasseur(chasseur.c4);
    } else {
        tourEnnemie();
    }

});

chasseur1.addEventListener("animationend", function() {
    tourEnnemie();
});
chasseur2.addEventListener("animationend", function() {
    tourEnnemie();
});
chasseur3.addEventListener("animationend", function() {
    tourEnnemie();
});
chasseur4.addEventListener("animationend", function() {
    tourEnnemie();
});


//----------------V---------//


function verifieAffiche(bolean, element) {
    if (bolean === true) {
        element.style.display = "block";
    } else if (bolean === false) {
        element.style.display = "none";
    }
}

function verifieAfficheDouble(bolean1, bolean2, element) {
    if (bolean1 === true && bolean2 === true) {
        element.style.display = "block";
    } else if (bolean2 === false) {
        element.style.display = "none";
    }
}

setInterval(function() {

    pvAllier.style.width = allier.pv + "px";
    nbpvAllier.textContent = allier.pv;
    pvEnnemie.style.width = ennemie.pv + "px";
    nbpvEnnemie.textContent = ennemie.pv;
    amiral.textContent = message;
    chasseurRestant.textContent = allier.chasseur;

    verifieAffiche(allier.plasma, piuAllier);
    verifieAffiche(ennemie.piu, piuEnnemie);
    verifieAffiche(allier.boum, boumAllier);
    verifieAffiche(chasseur.c1, chasseur1);
    verifieAffiche(chasseur.c2, chasseur2);
    verifieAffiche(chasseur.c3, chasseur3);
    verifieAffiche(chasseur.c4, chasseur4);
    verifieAffiche(allier.bouclier, bouclier);
    verifieAffiche(allier.energie, ennergie);
    verifieAffiche(ennemie.stun, stun);

    verifieAfficheDouble(chasseur.c1, chasseur.tire, piuChasseur1);
    verifieAfficheDouble(chasseur.c2, chasseur.tire, piuChasseur2);
    verifieAfficheDouble(chasseur.c3, chasseur.tire, piuChasseur3);
    verifieAfficheDouble(chasseur.c4, chasseur.tire, piuChasseur4);
    verifieAfficheDouble(chasseur.c1, ennemie.boum, boumEnnemieC1);
    verifieAfficheDouble(chasseur.c2, ennemie.boum, boumEnnemieC2);
    verifieAfficheDouble(chasseur.c3, ennemie.boum, boumEnnemieC3);
    verifieAfficheDouble(chasseur.c4, ennemie.boum, boumEnnemieC4);

    if (ennemie.boum === true && ennemie.disableBoum === true) {
        boumEnnemie.style.display = "block";
        boumEnnemie.style.visibility = "hidden";
    } else if (ennemie.boum === true) {
        boumEnnemie.style.display = "block";
    } else if (ennemie.boum === false) {
        boumEnnemie.style.display = "none";
    }

    if (allier.boum === false) {
        boumAllier.style.left = "130px"
    }
    if (allier.boum === true && allier.bouclier === true) {
        boumAllier.style.left = "160px"
    }

    if (allier.energie === true) {
        jeu.className = "backEnnergie";
    } else if (allier.energie === false) {
        jeu.className = "";
    }


    if (gagne === true) {
        final.textContent = "You Win";
        final.style.display = "block";
        destructionEnnemie.style.display = "block";
        boum6.style.display = "block";
        vEnnemie.className = "disparition";
        setTimeout(function() {
            boum7.style.display = "block";
        }, 800);
        setTimeout(function() {
            boum8.style.display = "block";
        }, 700);
        setTimeout(function() {
            boum9.style.display = "block";
        }, 100);
        setTimeout(function() {
            boum10.style.display = "block";
        }, 300);
        setTimeout(function() {
            boum11.style.display = "block";
        }, 600);
        setTimeout(function() {
            boum12.style.display = "block";
        }, 200);
        setTimeout(function() {
            boum13.style.display = "block";
        }, 400);
        setTimeout(function() {
            boum14.style.display = "block";
        }, 500);
    } else if (perdu === true) {
        final.textContent = "Game Over";
        final.style.display = "block";
        destructionAllier.style.display = "block";
        boum1.style.display = "block";
        vAllier.className = "disparition";
        setTimeout(function() {
            boum2.style.display = "block";
        }, 800);
        setTimeout(function() {
            boum3.style.display = "block";
        }, 400);
        setTimeout(function() {
            boum4.style.display = "block";
        }, 200);
        setTimeout(function() {
            boum5.style.display = "block";
        }, 600);

    }

}, 1);