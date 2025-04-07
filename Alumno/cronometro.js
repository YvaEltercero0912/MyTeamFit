let intervalo;
let modo = "ejercicio"; // ejercicio, descanso, transicion
let tiempoRestante = 0;
let rondaActual = 0;
let totalRondas = 0;

const beep3 = document.getElementById("beep3");
const cambio = document.getElementById("cambio");

const tiempoEl = document.getElementById("tiempo");
const estadoEl = document.getElementById("estado");
const rondaEl = document.getElementById("ronda");

const inputEjercicio = document.getElementById("ejercicio");
const inputDescanso = document.getElementById("descanso");
const inputTransicion = document.getElementById("transicion");
const inputRondas = document.getElementById("rondas");

const btnIniciar = document.getElementById("iniciar");
const btnReiniciar = document.getElementById("reiniciar");

function mostrarTiempo(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = segundos % 60;
  tiempoEl.textContent = `${min.toString().padStart(2, "0")}:${seg.toString().padStart(2, "0")}`;
}

function cambiarModo(nuevoModo) {
  modo = nuevoModo;
  cambio.play();

  if (modo === "ejercicio") {
    estadoEl.textContent = "💪 Ejercicio";
    tiempoRestante = parseInt(inputEjercicio.value);
  } else if (modo === "descanso") {
    estadoEl.textContent = "😌 Descanso";
    tiempoRestante = parseInt(inputDescanso.value);
  } else if (modo === "transicion") {
    estadoEl.textContent = "🔄 Transición";
    tiempoRestante = parseInt(inputTransicion.value);
  }

  mostrarTiempo(tiempoRestante);
}

function iniciarTabata() {
  totalRondas = parseInt(inputRondas.value);
  rondaActual = 1;
  rondaEl.textContent = rondaActual;
  cambiarModo("ejercicio");

  intervalo = setInterval(() => {
    tiempoRestante--;

    if (tiempoRestante === 3) beep3.play();
    if (tiempoRestante <= 0) {
      if (modo === "ejercicio") {
        cambiarModo("descanso");
      } else if (modo === "descanso") {
        if (rondaActual < totalRondas) {
          rondaActual++;
          rondaEl.textContent = rondaActual;
          cambiarModo("transicion");
        } else {
          estadoEl.textContent = "✅ ¡Tabata completo!";
          clearInterval(intervalo);
          return;
        }
      } else if (modo === "transicion") {
        cambiarModo("ejercicio");
      }
    }

    mostrarTiempo(tiempoRestante);
  }, 1000);
}

btnIniciar.addEventListener("click", () => {
  if (!intervalo) iniciarTabata();
});

btnReiniciar.addEventListener("click", () => {
  clearInterval(intervalo);
  intervalo = null;
  rondaActual = 0;
  estadoEl.textContent = "Preparado";
  tiempoEl.textContent = "00:00";
  rondaEl.textContent = "0";
});
