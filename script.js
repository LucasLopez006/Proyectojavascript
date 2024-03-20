const palabras = ["javascript", "programacion", "html", "css", "desarrollo", "php", "python", "sql", "ruby", "django", "react", "angular", "flask", "fastapi", "java", "rust", "perl", "swift"];
let palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
let palabraDescubierta = Array(palabraSecreta.length).fill("_");
let intentos = 6;
let letrasPresionadas = []; 
let juegoTerminado = false; 

function mostrarPalabra() {
    document.getElementById("palabra").textContent = palabraDescubierta.join(" ");
}

function actualizarIntentos() {
    const numIntentosElement = document.getElementById("num-intentos");
    numIntentosElement.textContent = intentos;
    
    const colores = ["#FF0000", "#FF6000", "#FFA201", "#FFFF00", "#86b124", "#4EA93B"];
    numIntentosElement.style.color = colores[Math.max(0, intentos - 1)];
}

function verificarLetra(letra) {
    if (!juegoTerminado && !letrasPresionadas.includes(letra)) { 
        letrasPresionadas.push(letra); 

        const encontradas = palabraSecreta.split('').map((char, index) => char === letra ? index : -1).filter(index => index !== -1);

        if (encontradas.length > 0) {
            encontradas.forEach(index => palabraDescubierta[index] = letra);

            if (!palabraDescubierta.includes("_")) {
                document.getElementById("resultado").textContent = "¡Ganaste!";
                document.getElementById("resultado").style.color = "#3c8d2c";
                document.getElementById("reiniciar").style.display = "block";
                document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);
                juegoTerminado = true;
            }
        } else {
            intentos--;
            if (intentos === 0) {
                document.getElementById("resultado").textContent = "¡Perdiste! La palabra era: " + palabraSecreta;
                document.getElementById("resultado").style.color = "#9b111e";
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
