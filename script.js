const palabras = ["javascript", "programacion", "html", "css", "desarrollo", "php", "python", "sql", "ruby", "django", "react", "angular", "flask", "fastapi"];
let palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
let palabraDescubierta = Array(palabraSecreta.length).fill("_");
let intentos = 6;
let letrasPresionadas = []; 
let juegoTerminado = false; 

function mostrarPalabra() {
    document.getElementById("palabra").textContent = palabraDescubierta.join(" ");
}

function actualizarIntentos() {
    document.getElementById("num-intentos").textContent = intentos;
}

function verificarLetra(letra) {
    if (!juegoTerminado && !letrasPresionadas.includes(letra)) { 
        letrasPresionadas.push(letra); 

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
                juegoTerminado = true;
            }
        } else {
            intentos--;
            if (intentos === 0) {
                document.getElementById("resultado").textContent = "¡Perdiste! La palabra era: " + palabraSecreta;
                document.getElementById("reiniciar").style.display = "block";
                document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);
                juegoTerminado = true;
            }
        }
    }

    mostrarPalabra();
    actualizarIntentos();
}

function reiniciarJuego() {
    palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
    palabraDescubierta = Array(palabraSecreta.length).fill("_");
    intentos = 6;
    letrasPresionadas = []; 
    juegoTerminado = false; 
    mostrarPalabra();
    actualizarIntentos();
    document.getElementById("resultado").textContent = "";
    document.getElementById("reiniciar").style.display = "none";
    inicializarTeclado();

    const botonReinicio = document.getElementById("reiniciar");
    const horca = document.getElementById("horca");
    horca.parentNode.insertBefore(botonReinicio, horca.nextSibling);
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

function verificarLetra(letra) {
    if (!juegoTerminado && !letrasPresionadas.includes(letra)) { 
        letrasPresionadas.push(letra); 

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
                juegoTerminado = true;
            }
        } else {
            intentos--;
            if (intentos === 0) {
                document.getElementById("resultado").textContent = "¡Perdiste! La palabra era: " + palabraSecreta;
                document.getElementById("reiniciar").style.display = "block";
                document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);
                juegoTerminado = true;
            }
        }
    }

    mostrarPalabra();
    actualizarIntentos();

    const boton = document.querySelector(`.tecla:nth-child(${letra.charCodeAt(0) - 96})`);
    if (boton) {
        boton.disabled = true;
        boton.style.backgroundColor = "#7c7c7c"; 
        boton.style.color = "#ffffff"
    }
}


function inicializarJuego() {
    mostrarPalabra();
    actualizarIntentos();
    inicializarTeclado();

    document.addEventListener("keydown", function(event) {
        if (!juegoTerminado) {
            const teclaPresionada = event.key.toLowerCase();
            if (/^[a-zñ]$/.test(teclaPresionada)) {
                verificarLetra(teclaPresionada);
                const boton = document.querySelector(`.tecla:nth-child(${teclaPresionada.charCodeAt(0) - 96})`);
                if (boton) {
                    boton.disabled = true;
                }
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", inicializarJuego);
