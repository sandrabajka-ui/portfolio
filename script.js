// =========================================
// 1. OBSŁUGA MENU MOBILNEGO (Hamburger)
// =========================================
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');

if (burger && navLinks) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
    });

    // Zamykanie menu po kliknięciu w link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
        });
    });
}

// =========================================
// 2. PŁYNNE PRZEWIJANIE (Smooth Scroll)
// =========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Ignoruj linki do kopiowania
        if (this.classList.contains('copy-trigger')) return;

        const targetId = this.getAttribute('href');
        if (targetId === "#") return;

        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            e.preventDefault();
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =========================================
// 3. FUNKCJA KOPIOWANIA (E-mail i Inne)
// =========================================
function copyText(element) {
    const textToCopy = element.getAttribute('data-copy') || element.innerText.trim();
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        const tooltip = element.querySelector('.tooltip');
        
        if (tooltip) {
            // Zabezpieczenie przed wielokrotnym klikaniem
            if (tooltip.innerText === "SKOPIOWANO!") return;

            // Jeśli dymek był pusty w HTML, ustawiamy mu bazowy tekst
            const originalText = tooltip.innerText || "Kliknij, aby skopiować";
            
            tooltip.innerText = "SKOPIOWANO!";
            tooltip.style.color = "#d94f2e"; 
            tooltip.style.fontWeight = "bold";
            
            setTimeout(() => {
                tooltip.innerText = originalText;
                tooltip.style.color = ""; 
                tooltip.style.fontWeight = "";
            }, 2000);
        }
    }).catch(err => {
        console.error('Błąd kopiowania:', err);
    });
}