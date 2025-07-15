const materias = {
  "Matemáticas discreta": ["Cálculo diferencial"],
  "Resolución de problemas Matemáticas": ["Física General"],
  "Competencias Digitales": [
    "Hardware y redes de computadores",
    "Didáctica de la Tecnología en Educación Básica y Media",
    "Tendencia y desarrollo tecnología"
  ],
  "Inglés I": ["Inglés II"],
  "Lectura crítica y Argumentación": ["Producción textual"],
  "Cálculo diferencial": [
    "Cálculo integral",
    "Fundamentos de algoritmia y programación",
    "Estadística"
  ],
  "Física general": ["Electricidad y electrónica"],
  "Historia de la educación y La pedagogía": ["Enfoques pedagógicos y desarrollo curricular"],
  "Cálculo integral": ["Álgebra lineal"],
  "Didáctica de la tecnología en educación básica y Media": ["Didáctica de la tecnología para la inclusión y la diversidad"],
  "Inglés II": ["Inglés III"],
  "Fundamentos del algoritmo mi programación": ["Lenguaje de programación"],
  "Inglés III": ["Inglés IV"],
  "Práctica pedagógica investigativa uno": ["Práctica pedagógica investigativa II"],
  "Electricidad y electrónica básica": ["Educación en tecnología"],
  "Lenguaje de programación": [
    "Fundamentos de base de datos",
    "Electiva I",
    "Robótica educativa"
  ],
  "Inglés IV": ["Inglés V"],
  "Enfoques pedagógicos y desarrollo curricular": ["Evaluación del aprendizaje"],
  "Álgebra lineal": ["Modelo y animación 3D"],
  "Evaluación del aprendizaje": ["Políticas y gestión educativa"],
  "Inglés V": ["Inglés VI"],
  "Práctica pedagógica investigativa II": ["Práctica pedagógica investigativa III"],
  "Tendencias y desarrollo en tecnología": ["Recursos y ambientes educativos digitales"],
  "Robótica educativa": ["Técnicas de la Inteligencia Artificial para la educación"],
  "Electiva 1": ["Electiva II"],
  "Práctica pedagógica investigativa III": ["Práctica Pedagógica investigativa IV"],
  "Práctica pedagógica investigativa IV": ["Práctica pedagógica investigativa V"],
  "Practica investigativa V": ["Prácticas profesionales"]
};

const aprobadas = new Set();
const elementos = {};

function crearBoton(nombre) {
  const div = document.createElement("div");
  div.className = "materia";
  div.innerText = nombre;
  div.onclick = () => aprobar(nombre);
  elementos[nombre] = div;
  return div;
}

function cargarMalla() {
  const contenedor = document.getElementById("malla");
  const todas = new Set([...Object.keys(materias), ...Object.values(materias).flat()]);
  todas.forEach(m => contenedor.appendChild(crearBoton(m)));
  actualizarBloqueadas();
}

function aprobar(nombre) {
  if (elementos[nombre].classList.contains("bloqueada")) return;
  if (aprobadas.has(nombre)) return;

  aprobadas.add(nombre);
  elementos[nombre].classList.add("aprobada");
  actualizarBloqueadas();
}

function actualizarBloqueadas() {
  Object.keys(elementos).forEach(nombre => {
    const requisitos = Object.entries(materias)
      .filter(([, desbloquea]) => desbloquea.includes(nombre))
      .map(([req]) => req);
    const habilitada = requisitos.every(req => aprobadas.has(req));

    if (!aprobadas.has(nombre)) {
      elementos[nombre].classList.toggle("bloqueada", requisitos.length > 0 && !habilitada);
    }
  });
}

document.addEventListener("DOMContentLoaded", cargarMalla);

