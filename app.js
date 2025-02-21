// let titulo = document.querySelector("h1");
// titulo.innerHTML = "Jogo do número Secreto";

// let paragrafo = document.querySelector("p");
// paragrafo.innerHTML = "Escolha um número de 1 a 10";

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function verificarChute() {
  let chute = document.querySelector("input").value;

  if (chute == numSecreto) {
    exibirTextoNatela("h1", "Acertou !");

    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativa = `Parabéns Quiabinha, você acertou o número secreto com ${tentativas} ${palavraTentativa}.`;

    exibirTextoNatela("p", mensagemTentativa);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else if (chute > numSecreto) {
    exibirTextoNatela("p", "O número secreto é menor.");
  } else {
    exibirTextoNatela("p", "O número secreto é maior.");
    tentativas++;
    limparChute();
  }
}

function exibirTextoNatela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;

  if ("speechSynthesis" in window) {
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    utterance.rate = 1.2;
    window.speechSynthesis.speak(utterance);
  } else {
    console.log("Web Speech API não suportada neste navegador");
  }
}

function exibirMensagemInicial() {
  exibirTextoNatela("h1", "Jogo do número secreto");
  exibirTextoNatela("p", "Escolha um número de 1 a 10 !");
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

  if (quantidadeDeElementosNaLista == numeroLimite) {
    listaDeNumerosSorteados = [];
  }
  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
  }
}

function limparChute() {
  chute = document.querySelector("input");
  chute.value = "";
}

function reiniciarJogo() {
  numSecreto = gerarNumeroAleatorio();
  let tentativas = 1;
  exibirMensagemInicial();
  limparChute();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}

exibirMensagemInicial();
