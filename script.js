const palabras = ["javascript", "programacion", "html", "css", "desarrollo"];
let palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
let palabraDescubierta = Array(palabraSecreta.length).fill("_");
let intentos = 6;

function mostrarPalabra() {
    document.getElementById("palabra").textContent = palabraDescubierta.join(" ");
}

function actualizarIntentos() {
    document.getElementById("num-intentos").textContent = intentos;
}

function verificarLetra(letra) {
    if (palabraSecreta.includes(letra)) {
        for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
                palabraDescubierta[i] = letra;
            }
        }
        if (!palabraDescubierta.includes("_")) {
            document.getElementById("resultado").textContent = "¡Ganaste!";
            document.getElementById("reiniciar").style.display = "block";
            document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);
        }
    } else {
        intentos--;
        if (intentos === 0) {
            document.getElementById("resultado").textContent = "¡Perdiste! La palabra era: " + palabraSecreta;
            document.getElementById("reiniciar").style.display = "block";
            document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);
        }
    }
    mostrarPalabra();
    actualizarIntentos();
}

function reiniciarJuego() {
    palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
    palabraDescubierta = Array(palabraSecreta.length).fill("_");
    intentos = 6;
    mostrarPalabra();
    actualizarIntentos();
    document.getElementById("resultado").textContent = "";
    document.getElementById("reiniciar").style.display = "none";
    inicializarTeclado();
}

function inicializarTeclado() {
    const teclado = document.getElementById("teclado");
    teclado.innerHTML = '';
    for (let letra of "abcdefghijklmnopqrstuvwxyz") {
        const boton = document.createElement("button");
        boton.textContent = letra;
        boton.classList.add("tecla");
        boton.addEventListener("click", function() {
            verificarLetra(letra);
            this.disabled = true;
        });
        teclado.appendChild(boton);
    }
}

function inicializarJuego() {
    mostrarPalabra();
    actualizarIntentos();
    inicializarTeclado();
}

document.addEventListener("DOMContentLoaded", inicializarJuego);
