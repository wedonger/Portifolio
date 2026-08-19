 // ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- Mobile menu toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a:not(.nav-cta)');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navAnchors.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
});

// ---- Intersection Observer for fade-in animations ----
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate skill bars inside the element
            entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                const width = getComputedStyle(bar).getPropertyValue('--fill-width');
                bar.style.width = width;
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
});

// terminal
const input = document.getElementById("cmdInput");
const output = document.getElementById("output");
var nomeUsuario = "Mathias";

document.getElementById("terminal").addEventListener("click", () => {
    input.focus();
});

input.addEventListener("keydown", function(e){
    if(e.key === "Enter"){

        const command = input.value;

        output.innerHTML += `
            <div>C:\\Users\\${nomeUsuario}>${command}</div>
        `;

        executarComando(command);

        input.value = "";

        document.getElementById("terminal").scrollTop =
            document.getElementById("terminal").scrollHeight;
    }

});

function executarComando(comando){
    const partes = comando.toLowerCase().split("-");

    const cmd = partes[0].trim();
    const args = partes.slice(1).map(arg => arg.trim());

    switch(cmd){
        case "lista":
            output.innerHTML += `<div>Comandos disponíveis:</div>`;
            output.innerHTML += `<div>lista</div>`;
            output.innerHTML += `<div>sobre</div>`;
            output.innerHTML += `<div>limpar</div>`;
            output.innerHTML += `<div>trocanome -novoNome</div>`;
            output.innerHTML += `<div>cores -listar || cores -set -cor</div>`;
            output.innerHTML += `<div>tocar -link</div>`;
            output.innerHTML += `<div>E mais vários outros codigos secretos... Boa sorte.</div>`;
            break;

        case "sobre":
            output.innerHTML += `<div>Mathias é um se humano que adora música, jogos, programação, bike, animes etc... Nasceu na cidade pacata de Tuparendi, e atualmente mora em Três de maio (temq completar mais)</div>`;
            break;

        case "limpar":
            output.innerHTML = "";
            break;

        case "trocanome":
            if(!args[0])
            {
                output.innerHTML += "Nenhum nome foi informado, exemplo: trocanome -galao"
                return;
            }
            nomeUsuario = args[0];
            output.innerHTML += `<div>C:\\Users\\${nomeUsuario}></div>`;
            break;

        case "tocar":
            output.innerHTML += `Solta a batida`;
            const audio = new Audio();
            audio.src = args[0];
            audio.play();
            break;

        case "cores":
            if(args[0] == "listar") {
                output.innerHTML += `<div style="color:#00FFFF;">00FFFF</div>`;
                output.innerHTML += `<div style="color:#49FF49;">49FF49</div>`;
                output.innerHTML += `<div style="color:#4AA3FF;">4AA3FF</div>`;
                output.innerHTML += `<div style="color:#FFD700;">FFD700</div>`;
                output.innerHTML += `<div style="color:#FF8C00;">FF8C00</div>`;
                output.innerHTML += `<div style="color:#C77DFF;">C77DFF</div>`;
                output.innerHTML += `<div>pode colocar qualquer cor, apenas informe o codigo hex</div>`;
                break;
            }
            else if(args[0] == "set") {
                let hexValido = /^[0-9A-Fa-f]{6}$/.test(args[1]);
                if (!hexValido) {
                    output.innerHTML += `<div style="color:#F00;">O hex: '${args[1]}' é inválido</div>`;
                    break;
                }
                document.documentElement.style.setProperty(
                    "--terminal-color",
                    '#' + args[1]
                );
                break;
            }
            output.innerHTML += "Argumentos inválidos! (-listar ou -set -codigoHexDaCor exemplo: cores -set -00FFFF)";
            break;
        //secretos (não veja!)
        case "secret":
            nomeUsuario = '🤓';
            output.innerHTML += `Você sabe o que está fazendo ne?`;
            break;

        case "rickroll":
            output.innerHTML += `Você pediu por isso.`;
            window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1";
            break;

        default:
            output.innerHTML += `<div>'${cmd}' não é reconhecido como um comando.</div>`;
    }

}

const image = document.getElementById("profileImage");
const divClicavel = document.getElementById("divFoto");
const mensagemFoto = document.getElementById("msgFoto");

const fotos = [
    {
        src: "imgs/perfil1.jpg",
        texto: "Não gostei dessa foto."
    },
    {
        src: "imgs/perfil2.jpg",
        texto: "Também não..."
    },
    {
        src: "imgs/perfil3.jpg",
        texto: "Quase lá."
    },
    {
        src: "imgs/perfil4.jpg",
        texto: "Agora sim!"
    }
];

let fotoAtual = 0;

divClicavel.addEventListener("click", () => {
    fotoAtual = (fotoAtual + 1) % fotos.length;
    image.src = fotos[fotoAtual].src;
    mensagemFoto.innerText = fotos[fotoAtual].texto;
});

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// ============================================================
// RETRO → MODERN LOADING TRANSITION
// ============================================================

(function() {
    const overlay = document.getElementById('retroOverlay');
    const loadingTransition = document.getElementById('loadingTransition');
    const loadingBarFill = document.getElementById('loadingBarFill');
    const loadingBarGlow = document.getElementById('loadingBarGlow');
    const loadingPercentage = document.getElementById('loadingPercentage');
    const loadingStatus = document.getElementById('loadingStatus');
    const loadingYear = document.getElementById('loadingYear');
    const loadingParticles = document.getElementById('loadingParticles');

    if (!overlay) return;

    // Check if already visited this session
    const hasVisited = sessionStorage.getItem('retro-intro-done');
    if (hasVisited) {
        overlay.classList.add('hidden');
        return;
    }

    // Prevent scrolling while overlay is showing
    document.body.style.overflow = 'hidden';

    // Wait 4 seconds on the retro page, then start loading
    const retroDuration = 4000;

    setTimeout(() => {
        startLoadingTransition();
    }, retroDuration);

    function startLoadingTransition() {
        loadingTransition.classList.add('active');

        const statusMessages = [
            { pct: 0,  msg: "Inicializando upgrade...", year: "2006" },
            { pct: 5,  msg: "Removendo <marquee> tags...", year: "2007" },
            { pct: 10, msg: "Desinstalando Comic Sans MS...", year: "2007" },
            { pct: 15, msg: "Matando Internet Explorer 6...", year: "2008" },
            { pct: 20, msg: "Migrando tabelas para CSS Grid...", year: "2009" },
            { pct: 28, msg: "Instalando border-radius...", year: "2010" },
            { pct: 35, msg: "Descobrindo responsive design...", year: "2012" },
            { pct: 42, msg: "Aprendendo Flexbox...", year: "2014" },
            { pct: 50, msg: "Substituindo GIFs por SVGs...", year: "2015" },
            { pct: 58, msg: "Implementando CSS Variables...", year: "2017" },
            { pct: 65, msg: "Ativando dark mode...", year: "2019" },
            { pct: 72, msg: "Adicionando glassmorphism...", year: "2020" },
            { pct: 80, msg: "Aplicando Inter font-family...", year: "2022" },
            { pct: 88, msg: "Renderizando gradientes...", year: "2024" },
            { pct: 94, msg: "Polindo micro-animações...", year: "2025" },
            { pct: 100, msg: "✓ Upgrade completo!", year: "2026" },
        ];

        let currentStep = 0;
        let currentPct = 0;
        const totalDuration = 5500; // total ms for the bar
        const stepDuration = totalDuration / statusMessages.length;

        function animateStep() {
            if (currentStep >= statusMessages.length) {
                // Done — transition to modern
                setTimeout(() => {
                    finishTransition();
                }, 600);
                return;
            }

            const target = statusMessages[currentStep];
            const startPct = currentPct;
            const endPct = target.pct;
            const animMs = stepDuration * 0.8;
            const startTime = performance.now();

            function tick(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / animMs, 1);
                // Ease out quad
                const eased = 1 - (1 - progress) * (1 - progress);
                const pct = Math.round(startPct + (endPct - startPct) * eased);

                loadingBarFill.style.width = pct + '%';
                loadingBarGlow.style.width = pct + '%';
                loadingPercentage.textContent = pct + '%';

                if (progress < 1) {
                    requestAnimationFrame(tick);
                }
            }

            requestAnimationFrame(tick);

            loadingStatus.textContent = target.msg;
            loadingYear.textContent = target.year;
            currentPct = endPct;

            // Spawn a particle
            spawnParticle();

            currentStep++;
            setTimeout(animateStep, stepDuration);
        }

        // Start after a brief beat
        setTimeout(animateStep, 400);
    }

    function spawnParticle() {
        const particle = document.createElement('div');
        particle.className = 'loading-particle';
        particle.style.left = (Math.random() * 100) + '%';
        particle.style.top = (50 + Math.random() * 30) + '%';
        particle.style.background = Math.random() > 0.5 ? '#6c5ce7' : '#00cec9';
        particle.style.animationDuration = (1 + Math.random() * 1.5) + 's';
        loadingParticles.appendChild(particle);
        setTimeout(() => particle.remove(), 3000);
    }

    function finishTransition() {
        // First hide the retro page behind the loading screen
        const retroPage = overlay.querySelector('.retro-page');
        retroPage.style.display = 'none';

        // Then fade out the loading transition
        loadingTransition.classList.add('fade-out');

        setTimeout(() => {
            // Fade out the entire overlay
            overlay.classList.add('hiding');
            document.body.style.overflow = '';

            setTimeout(() => {
                overlay.classList.add('hidden');
                sessionStorage.setItem('retro-intro-done', '1');
            }, 800);
        }, 600);
    }
})();