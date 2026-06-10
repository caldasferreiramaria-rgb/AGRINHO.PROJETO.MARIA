const cartas = [
    '🤖', '🤖',
    '📡', '📡',
    '🚜', '🚜',
    '🌾', '🌾',
    '🔬', '🔬',
    '💧', '💧'
];

let cartasEmbaralhadas = [];
let cartaVirada = null;
let cartasAcertadas = [];
let travarJogo = false;

function embaralharCartas() {
    return cartas.sort(() => Math.random() - 0.5);
}

function criarTabuleiro() {
    const tabuleiro = document.getElementById('tabuleiro');
    tabuleiro.innerHTML = '';
    cartasAcertadas = [];
    cartaVirada = null;
    travarJogo = false;

    cartasEmbaralhadas = embaralharCartas();

    cartasEmbaralhadas.forEach((simbolo, indice) => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.indice = indice;
        carta.dataset.simbolo = simbolo;
        
        carta.addEventListener('click', () => virarCarta(carta));
        
        tabuleiro.appendChild(carta);
    });
}

function virarCarta(carta) {
    const indice = carta.dataset.indice;

    if (travarJogo || carta.classList.contains('virada') || carta.classList.contains('acertada')) {
        return;
    }

    carta.classList.add('virada');
    carta.textContent = carta.dataset.simbolo;

    if (!cartaVirada) {
        cartaVirada = carta;
    } else {
        travarJogo = true;
        verificarPar(carta);
    }
}

function verificarPar(segundaCarta) {
    if (cartaVirada.dataset.simbolo === segundaCarta.dataset.simbolo) {
        cartaVirada.classList.add('acertada');
        segundaCarta.classList.add('acertada');
        cartasAcertadas.push(cartaVirada, segundaCarta);
        
        cartaVirada = null;
        travarJogo = false;

        if (cartasAcertadas.length === cartas.length) {
            setTimeout(() => {
                alert('🎉 PARABÉNS MARIA! Você completou o jogo! 🚜💚');
            }, 500);
        }
    } else {
        setTimeout(() => {
            cartaVirada.classList.remove('virada');
            segundaCarta.classList.remove('virada');
            cartaVirada.textContent = '';
            segundaCarta.textContent = '';
            
            cartaVirada = null;
            travarJogo = false;
        }, 1000);
    }
}

document.getElementById('reiniciar').addEventListener('click', criarTabuleiro);

criarTabuleiro();