const scrollButton = document.createElement("button");
scrollButton.innerHTML = "↑";
document.body.appendChild(scrollButton);
Object.assign(scrollButton.style, {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "50px",
    height: "50px",
    border: "none",
    borderRadius: "50%",
    backgroundColor: "#1a3a6b",
    color: "#f8f6f1",
    fontSize: "1.5rem",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
    transition: "all 0.3s ease",
    zIndex: "1000",
    opacity: "0",
    visibility: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0",
    lineHeight: "1"
});
scrollButton.addEventListener("mouseover", () => {
    scrollButton.style.transform = "translateY(-4px)";
});
scrollButton.addEventListener("mouseout", () => {
    scrollButton.style.transform = "translateY(0)";
});
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollButton.style.opacity = "1";
        scrollButton.style.visibility = "visible";
    } else {
        scrollButton.style.opacity = "0";
        scrollButton.style.visibility = "hidden";
    }
});
scrollButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// --- Dark Mode Dugme --- Koristen Ai alat za uljepsavanje buttona za dark mode
const darkModeBtn = document.createElement("button");
darkModeBtn.innerHTML = "🌙";
document.body.appendChild(darkModeBtn);

Object.assign(darkModeBtn.style, {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    width: "50px",
    height: "50px",
    border: "none",
    borderRadius: "50%",
    backgroundColor: "#0d1b3e",
    color: "#f8f6f1",
    fontSize: "1.5rem",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
    transition: "all 0.3s ease",
    zIndex: "1000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0",
    lineHeight: "1"
});

// Hover efekat
darkModeBtn.addEventListener("mouseover", () => {
    darkModeBtn.style.transform = "scale(1.1)";
});
darkModeBtn.addEventListener("mouseout", () => {
    darkModeBtn.style.transform = "scale(1)";
});

// Provjera da li je dark mode vec bio ukljucen
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeBtn.innerHTML = "☀️";
    darkModeBtn.style.backgroundColor = "#f8f6f1";
    darkModeBtn.style.color = "#050a14";
}

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
        darkModeBtn.innerHTML = "☀️";
        darkModeBtn.style.backgroundColor = "#f8f6f1";
        darkModeBtn.style.color = "#050a14";
    } else {
        localStorage.setItem("darkMode", "disabled");
        darkModeBtn.innerHTML = "🌙";
        darkModeBtn.style.backgroundColor = "#0d1b3e";
        darkModeBtn.style.color = "#f8f6f1";
    }
});

// --- Filtriranje Destinacija ---

const destinacije = [
    { ime: "Prokoško jezero", tip: "priroda", trajanje: "jednodnevni", opis: "Prelijepo planinsko jezero na planini Vranici, idealno za odmor u prirodi." },
    { ime: "Sarajevo Baščaršija", tip: "gradovi", trajanje: "jednodnevni", opis: "Srce Sarajeva. Posjetite Sebilj i uživajte u tradicionalnoj bosanskoj kafi i hrani." },
    { ime: "Nacionalni park Una", tip: "priroda", trajanje: "vikend", opis: "Netaknuta priroda rijeke Une sa prelijepim vodopadima poput Štrbačkog buka." },
    { ime: "Mostar i Blagaj", tip: "gradovi", trajanje: "vikend", opis: "Stari most u Mostaru i derviška tekija na vrelu Bune pružaju nezaboravan vikend." },
    { ime: "Hutovo Blato", tip: "priroda", trajanje: "jednodnevni", opis: "Park prirode poznat po raznolikom ptičjem svijetu i fotosafariju na čamcima." },
    { ime: "Tvrđava Kastel", tip: "gradovi", trajanje: "jednodnevni", opis: "Najstariji historijski spomenik u Banjoj Luci, savršen za poslijepodnevnu šetnju." },
    { ime: "Nacionalni park Sutjeska", tip: "priroda", trajanje: "vikend", opis: "Posjetite prašumu Perućicu i planinu Maglić u najstarijem nacionalnom parku." }
];

let odabraniTip = 'sve';
let odabranoTrajanje = 'sve';

function prikaziKartice() {
    const kontejner = document.getElementById("mjesto-za-kartice");
    if (!kontejner) return;

    kontejner.innerHTML = "";

    const filtrirane = destinacije.filter(dest => {
        const odgovaraTip = (odabraniTip === 'sve' || dest.tip === odabraniTip);
        const odgovaraTrajanje = (odabranoTrajanje === 'sve' || dest.trajanje === odabranoTrajanje);
        return odgovaraTip && odgovaraTrajanje;
    });

    if (filtrirane.length === 0) {
        kontejner.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: var(--tekst-sivi); font-size: 1.1rem; padding: 2rem;'>Nema rezultata za odabrane filtere.</p>";
        return;
    }

    filtrirane.forEach(dest => {
        const article = document.createElement("article");
        article.className = "kartica";
        article.innerHTML = `
            <h3>${dest.ime}</h3>
            <p>${dest.opis}</p>
        `;
        kontejner.appendChild(article);
    });
}

window.postaviTip = function (tip) {
    odabraniTip = tip;
    prikaziKartice();

    // Ažuriraj aktivno dugme za tip
    const tipDugmici = document.querySelectorAll('.bocni-meni button:not([onclick*="Trajanje"])');
    tipDugmici.forEach(btn => {
        if (btn.getAttribute("onclick").includes(tip)) {
            btn.classList.add("aktivan");
        } else {
            btn.classList.remove("aktivan");
        }
    });
};

window.postaviTrajanje = function (trajanje) {
    odabranoTrajanje = trajanje;
    prikaziKartice();

    // Ažuriraj aktivno dugme za trajanje
    const trajanjeDugmici = document.querySelectorAll('.bocni-meni button[onclick*="Trajanje"]');
    trajanjeDugmici.forEach(btn => {
        if (btn.getAttribute("onclick").includes(trajanje)) {
            btn.classList.add("aktivan");
        } else {
            btn.classList.remove("aktivan");
        }
    });
};

// Inicijalno prikazivanje po ucitavanju stranice
window.addEventListener("DOMContentLoaded", () => {
    postaviTip('sve');
});

// --- Smooth Scroll za Bookmark navigaciju (JS implementacija) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            e.preventDefault();
            const headerOffset = 130;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            // Skrolanje pomocu JavaScripta
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});
