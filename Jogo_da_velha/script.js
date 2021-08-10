const informacoes = document.querySelector(".info-turno");
const reinicia = document.querySelector(".info-reinicia");
const quadradinhos = document.querySelectorAll(".jogo-quadrado");

let JogoAtivo = true;
let turnoX = true;
let vencedor = null;
let velha1 = true;

let Xsimbolo = "✘";
let Osimbolo = "o";

const letra = (letrinha) => (letrinha === "X" ? Xsimbolo : Osimbolo);

const nomea = (jogo) => {
  JogoAtivo = false;
  vencedor = jogo;
  if (vencedor === "X") {
    informacoes.innerHTML = letra(vencedor) + " ganhou!!";
  } else {
    informacoes.innerHTML = "<span>" + letra(vencedor) + " ganhou!!</span>";
  }
};

const tornaCor = (i, va) => {
  if (va == "h") {
    jogo[i][0].classList.add("vencedor"),
      jogo[i][1].classList.add("vencedor"),
      jogo[i][2].classList.add("vencedor");
  }
  if (va == "v") {
    jogo[3][i].classList.add("vencedor"),
      jogo[4][i].classList.add("vencedor"),
      jogo[5][i].classList.add("vencedor");
  }
  if (va == "d1") {
    jogo[3][2].classList.add("vencedor"),
      jogo[4][1].classList.add("vencedor"),
      jogo[5][0].classList.add("vencedor");
  }
  if (va == "d2") {
    jogo[3][0].classList.add("vencedor"),
      jogo[4][1].classList.add("vencedor"),
      jogo[5][2].classList.add("vencedor");
  }
  if (va == "vl") {
    for (let d = 0; d < 3; d++) {
      for (let c = 0; c < 3; c++) {
        jogo[d + 3][c].classList.add("velha");
      }
    }
  }
};

const checarVencedor = () => {
  //declara variaveis
  const q1 = quadradinhos[0].classList[1];
  const q2 = quadradinhos[1].classList[1];
  const q3 = quadradinhos[2].classList[1];
  const q4 = quadradinhos[3].classList[1];
  const q5 = quadradinhos[4].classList[1];
  const q6 = quadradinhos[5].classList[1];
  const q7 = quadradinhos[6].classList[1];
  const q8 = quadradinhos[7].classList[1];
  const q9 = quadradinhos[8].classList[1];

  const c1 = quadradinhos[0];
  const c2 = quadradinhos[1];
  const c3 = quadradinhos[2];
  const c4 = quadradinhos[3];
  const c5 = quadradinhos[4];
  const c6 = quadradinhos[5];
  const c7 = quadradinhos[6];
  const c8 = quadradinhos[7];
  const c9 = quadradinhos[8];

  //transforma o jogo em uma lista
  jogo = [
    [q1, q2, q3],
    [q4, q5, q6],
    [q7, q8, q9],
    [c1, c2, c3],
    [c4, c5, c6],
    [c7, c8, c9],
  ];

  let velha1 = true;
  //checa horizontalmente
  for (let i = 0; i < 3; i++) {
    if (jogo[i][0] && jogo[i][0] == jogo[i][1] && jogo[i][2] == jogo[i][0]) {
      nomea(jogo[i][0]);
      i += 3;
      velha1 = false;
      tornaCor(i, "h");
    }
  }
  //checa verticalmente
  for (let i = 0; i < 3; i++) {
    if (jogo[0][i] && jogo[0][i] == jogo[1][i] && jogo[2][i] == jogo[0][i]) {
      nomea(jogo[0][i]);
      velha1 = false;
      tornaCor(i, "v");
    }
  }
  //checa diagonalmente
  if (jogo[0][0] && jogo[0][0] == jogo[1][1] && jogo[2][2] == jogo[0][0]) {
    nomea(jogo[0][0]);
    velha1 = false;
    tornaCor(0, "d2");
  }
  if (jogo[0][2] && jogo[0][2] == jogo[1][1] && jogo[2][0] == jogo[0][2]) {
    nomea(jogo[0][2]);
    velha1 = false;
    tornaCor(0, "d1");
  }

  //CHECA VELHAA
  if (q1 && q2 && q3 && q4 && q5 && q6 && q7 && q8 && q9 && velha1) {
    informacoes.innerHTML = "DEU VELHAAA!!";
    JogoAtivo = false;
    tornaCor(0, "vl");
  }
};

const mudaTurno = () => {
  turnoX = !turnoX;
  if (turnoX) {
    informacoes.innerHTML = Xsimbolo + " está na vez!!";
  } else if (!turnoX) {
    informacoes.innerHTML = "<span>" + Osimbolo + " está na vez!! </span>";
  }
  checarVencedor();
};

const handleReinicia = (e) => {
  turnoX = true;
  informacoes.innerHTML = Xsimbolo + " está na vez!!";
  vencedor = null;
  for (const quadrado1 of quadradinhos) {
    quadrado1.classList.remove("X");
    quadrado1.classList.remove("O");
    quadrado1.classList.remove("vencedor");
    quadrado1.classList.remove("velha");
  }
};

const handleQuadradoClick = (e) => {
  const classes = e.target.classList;

  if (classes[1] == "X" || classes[1] == "O" || vencedor != null) {
    return;
  }

  if (turnoX) {
    e.target.classList.add("X");
    mudaTurno();
  } else {
    e.target.classList.add("O");
    mudaTurno();
  }
};

reinicia.addEventListener("click", handleReinicia);
{
  for (const quadrado of quadradinhos) {
    quadrado.addEventListener("click", handleQuadradoClick);
  }
}
