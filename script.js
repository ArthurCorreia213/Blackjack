function reset(){
    baralho = [
  ["A", 2, 3, 4, 5, 6, 7, 8, 9, 0, "J", "Q", "K"],
  ["A", 2, 3, 4, 5, 6, 7, 8, 9, 0, "J", "Q", "K"],
  ["A", 2, 3, 4, 5, 6, 7, 8, 9, 0, "J", "Q", "K"],
  ["A", 2, 3, 4, 5, 6, 7, 8, 9, 0, "J", "Q", "K"] 
]

fimDeJogo = 0
doubleDownEstado = 0

maoArray = []
cartasNaMao = []

maoDealerArray = []
cartasNaMaoDealer = []
cartasNaMaoDealerVisiveis = []
    
maoJogador.valor = 0;
maoDealer.valor = 0 ;
maoDealerVisivel.valor = 0 ;

visivel = false
    teste()
  }

  baralho = [
  ["A", 2, 3, 4, 5, 6, 7, 8, 9, 0, "J", "Q", "K"],
  ["A", 2, 3, 4, 5, 6, 7, 8, 9, 0, "J", "Q", "K"],
  ["A", 2, 3, 4, 5, 6, 7, 8, 9, 0, "J", "Q", "K"],
  ["A", 2, 3, 4, 5, 6, 7, 8, 9, 0, "J", "Q", "K"] 
]

function rndNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function ace(arr, mao){
  if(arr.includes("A11") && mao > 21){
    mao.valor -=10
    for(i = 0; i<= arr.length; i++){
      if(arr[i] == "A11"){
        arr[i] = "A1"
      }
    }
  }
}

fimDeJogo = 0
doubleDownEstado = 0

let dinheiro = { valor: 1000 };
let aposta = { valor: 0 };

maoArray = []
cartasNaMao = []

maoDealerArray = []
cartasNaMaoDealer = []
  
cartasNaMaoDealerVisiveis = []

let maoJogador = { valor: 0 };
let maoDealer = { valor: 0 };
let maoDealerVisivel = { valor: 0 };
let visivel = false

function comprarCarta(arr, cartas, mao, isDealer=false) {
if(fimDeJogo == 1) return
  let naipe = rndNum(0, 4);
  let carta = rndNum(0, 13);
  let simbolos = ["♣️", "♠️", "♥️", "♦️"];
  let cartaComprada = baralho[naipe].splice(carta, 1);
  let adicionarValor = 0

  if (cartaComprada == "A") {
    if (mao.valor + 11 > 21) {
      adicionarValor += 1;
      arr.push("A1");
    } else {
      adicionarValor += 11;
      arr.push("A11");
    }
  } else if (cartaComprada == 0) {
    adicionarValor += 10;
    arr.push(10);
    cartaComprada = 10;
  } else if (cartaComprada == "J") {
    adicionarValor += 10;
    arr.push("J");
  } else if (cartaComprada == "Q") {
    adicionarValor += 10;
    arr.push("Q");
  } else if (cartaComprada == "K") {
    adicionarValor += 10;
    arr.push("K");
  } else {
    adicionarValor += parseInt(cartaComprada);
    arr.push(cartaComprada);
  }
  
  mao.valor += adicionarValor
  if(visivel == false && isDealer == true){
    visivel = true
  }
  else if(visivel == true && isDealer == true){
    maoDealerVisivel.valor += adicionarValor
  }
  
  let simboloCarta = simbolos[naipe];
  cartas.push(cartaComprada + simboloCarta);
  
  ace(arr, mao);
  
  mostrar()
  
  if(mao.valor > 21){
    fimDeJogo = 1
    checarEstadoDeJogo()
  }
}

function dealerIA(){
  while(maoDealer.valor < 18 && maoDealer.valor <= maoJogador.valor && maoJogador.valor < 22){
    comprarCarta(maoDealerArray, cartasNaMaoDealer, maoDealer, true);
  }
  fimDeJogo = 1
  checarEstadoDeJogo()
}

function inicioDeJogo(){
  comprarCarta(maoArray, cartasNaMao, maoJogador);
  comprarCarta(maoArray, cartasNaMao, maoJogador);

  comprarCarta(maoDealerArray, cartasNaMaoDealer, maoDealer, true);
  comprarCarta(maoDealerArray, cartasNaMaoDealer, maoDealer, true);
  if(maoJogador.valor == 21) {
    fimDeJogo = 1
    checarEstadoDeJogo()
    return
  }
  else if(maoDealer.valor == 21) {
    fimDeJogo = 1
    checarEstadoDeJogo();
    return
  }
  cartasNaMaoDealer.forEach(i => {cartasNaMaoDealerVisiveis.push(i)})
  cartasNaMaoDealerVisiveis[0] = "?"
  mostrar()
}
  
function mostrar(){
  document.getElementById('p0').innerHTML = `Você possui R$${dinheiro.valor}`
  document.getElementById('p00').innerHTML = `Valor da aposta R$${aposta.valor}`
  document.getElementById('p000').innerHTML = "O dealer para em 18"
  document.getElementById('p').innerHTML = `Sua mão: ${cartasNaMao}`
  document.getElementById('p1').innerHTML = `Valor da sua mão: ${maoJogador.valor}`
  
  document.getElementById('p2').innerHTML = `Cartas na mão do Dealer: ${cartasNaMaoDealerVisiveis}`
  document.getElementById('p3').innerHTML = `Valor da mão do Dealer: ${maoDealerVisivel.valor}`
  document.getElementById('p4').innerHTML = '<button id="btn" onclick="comprarCarta(maoArray, cartasNaMao, maoJogador)">Comprar</button>' + '<button id="btn" style="margin-left: 10%; margin-right: 10%;" onclick="doubleDown()">Dobrar aposta</button>' + '<button id="btn" onclick="parar()">Parar</button>'
  document.getElementById('p5').innerHTML = ""
  document.getElementById('p6').innerHTML = ""
  
}
function doubleDown(){
  doubleDownEstado = 1
  dinheiro.valor -= aposta.valor
  aposta.valor += aposta.valor
  comprarCarta(maoArray, cartasNaMao, maoJogador);
  dealerIA()
}

function parar() {
  dealerIA()
}

function checarEstadoDeJogo() {
  if (fimDeJogo == 1){  
    document.getElementById('p3').innerHTML = `Valor da mão do Dealer: ${maoDealer.valor}`
    document.getElementById('p2').innerHTML = `Cartas na mão do Dealer: ${cartasNaMaoDealer}`
    switch(true){
        case(maoJogador.valor == maoDealer.valor):
          document.getElementById('p6').innerHTML = "Empate\nSua dinheiro foi devolvida"
          dinheiro.valor += aposta.valor
          break;
        
        case(cartasNaMao.length == 2 && cartasNaMaoDealer.length == 2 && maoJogador.valor == 21):
          document.getElementById('p6').innerHTML = `Blackjack!\nVocê ganhou. + ${aposta.valor*1.5}`
          dinheiro.valor += aposta.valor*1.5
          break;
        
        case(cartasNaMao.length == 2 && cartasNaMaoDealer.length == 2 && maoDealer.valor == 21):
          document.getElementById('p6').innerHTML = `Blackjack\nVocê perdeu. - ${aposta.valor}`
          break;
        
        case(doubleDownEstado == 1 && maoJogador.valor > 21):
          document.getElementById('p6').innerHTML = `Você perdeu. - ${aposta.valor}`
          break;

        case(maoJogador.valor > 21):
          document.getElementById('p6').innerHTML = `Você perdeu. - ${aposta.valor}`
          break;

        case(doubleDownEstado == 1 && maoJogador.valor <= 21 && maoDealer.valor > 21):
          document.getElementById('p6').innerHTML = `Você ganhou. + ${aposta.valor}`
          dinheiro.valor += aposta.valor
          break;

        case(maoJogador.valor <= 21 && maoDealer.valor > 21):
          document.getElementById('p6').innerHTML = `Você ganhou. + ${aposta.valor}`
          dinheiro.valor += aposta.valor
          break;
        
        case(doubleDownEstado == 1 && maoJogador.valor <= 21 && maoJogador.valor > maoDealer.valor):
          document.getElementById('p6').innerHTML = `Você ganhou. + ${aposta.valor}`
          dinheiro.valor += aposta.valor
          break;
        
        case(doubleDownEstado == 1 && maoJogador.valor <= 21 && maoJogador.valor < maoDealer.valor):
          document.getElementById('p6').innerHTML = `Você perdeu. - ${aposta.valor}`
          break;
        
        case(maoJogador.valor <= 21 && maoDealer.valor < maoJogador.valor):
          document.getElementById('p6').innerHTML = `Você ganhou. + ${aposta.valor}`
          dinheiro.valor += aposta.valor
          break;
        
        case(maoJogador.valor < 22 && maoJogador.valor < maoDealer.valor):
          document.getElementById('p6').innerHTML = `Você perdeu. - ${aposta.valor}`
          break;
    }
    document.getElementById('p5').innerHTML = '<button id="btn" onclick="teste()">Reset</button>'
    document.getElementById('p4').innerHTML = ""
    if (dinheiro.valor < 1){
        location.reload()
    }
    }  
}
  
  function teste(){
    document.getElementById('p1').innerHTML = '<h2 style="text-align:center;">Quanto gostaria de apostar?</h2>'
    document.getElementById('p2').innerHTML = `<h3 style="text-align:center;">Você possui R$ ${dinheiro.valor}</h3>`
    document.getElementById('p3').innerHTML = '<p ><button id="btn" onclick="apostar(50)">R$50</button>' + '<button id="btn" style="margin-left: 10%; margin-right: 10%;" onclick="apostar(100)">R$100</button>' + '<button id="btn" onclick="apostar(200)">R$200</button></p>'
    document.getElementById('p4').innerHTML = ""
    document.getElementById('p5').innerHTML = ""
    document.getElementById('p6').innerHTML = ""
    document.getElementById('p7').innerHTML = ""
    document.getElementById('p').innerHTML = ""
    document.getElementById('p0').innerHTML = ""
    document.getElementById('p00').innerHTML = ""
    document.getElementById('p000').innerHTML = ""
  }
  
  function apostar(valorDeAposta){
    dinheiro.valor -= valorDeAposta
    aposta.valor = valorDeAposta
    reset()
    inicioDeJogo()
  }
  
  function telaInicial(){
      document.getElementById('p6').innerHTML = `<h1 style="text-align: center;">Blackjack</h1>`
      document.getElementById('p7').innerHTML =`<h1 style="text-align: center;"><button id="btn" onclick="teste()" style="text-align: center;">Iniciar</button></h1>`
  }