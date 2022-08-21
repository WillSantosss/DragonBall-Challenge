var engine = {
    "cores": ['green', 'purple', 'pink', 'red','yellow', 'orange', 'blue', 'black', 'brown', 'white', 'grey'],
    "hexadecimais":{
        'green' : '#008000',
        'purple' : '#800080',
        'pink' : '#F02A7E',
        'red' : '#FF0000',
        'yellow' : '#FFFF00',       
        'orange': '#FFA500',
        'blue': '#0000FF',
        'black': '#141414',
        'brown': '#8B4513',
        'white': '#FFFFFF',
        'grey': '#808080',


    },
    "moedas":0
}

const audioMoeda = new Audio('audio/taiyoken.wav');
const audioErrou = new Audio('audio/explosao.wav');

function sortearCor(){
    var indexcorSorteada = Math.floor(Math.random() * engine.cores.length);
    var legendaCorDaCaixa = document.getElementById('cor-na-caixa');
    var nomeCorSorteada = engine.cores[indexcorSorteada];

    legendaCorDaCaixa.innerText = nomeCorSorteada.toUpperCase();

    return engine.hexadecimais[nomeCorSorteada];

}

function aplicarCorNaCaixa(nomeDaCor){
    var caixaDasCores = document.getElementById('cor-atual');
    caixaDasCores.style.backgroundColor = nomeDaCor;
    caixaDasCores.style.backgroundImage= "url('/img/gokuesfera.png')";
    caixaDasCores.style.backgroundSize = "100%";
}

function atualizaPontuacao(valor){
    var pontuacao = document.getElementById('pontuacao-atual');

    engine.moedas += valor;

    if(valor < 0) {
        audioErrou.play();
    }else {
        audioMoeda.play();
    }

    pontuacao.innerText = engine.moedas;
}

aplicarCorNaCaixa(sortearCor())

//API RECONHECIMENTO DE VOZ
var btnGravador = document.getElementById("btn-responder");
var transcricaoAudio = "";
var respostaCorreta =  "";




if(window.SpeechRecognition || window.webkitSpeechRecognition) {
    var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    var gravador = new SpeechAPI();

    gravador.continuos = false;
    gravador.lang = "en-US";

    gravador.onstart = function(){
        btnGravador.innerText = "Estou ouvindo";
        btnGravador.style.backgroundColor = "white";
        btnGravador.style.color = "black";
    }

    gravador.onend = function () {
        btnGravador.innerText = "Responder";
        btnGravador.style.backgroundColor = "transparent";
        btnGravador.style.color = "white";
    }

    gravador.onresult = function(event) {
    transcricaoAudio = event.results[0][0].transcript.toUpperCase();
    respostaCorreta = document.getElementById('cor-na-caixa').innerText.toUpperCase();

        if(transcricaoAudio === respostaCorreta) {
        atualizaPontuacao(1);
        }else {
        atualizaPontuacao(-1);
        }
        console.log(transcricaoAudio);
        console.log(respostaCorreta);
        aplicarCorNaCaixa(sortearCor());
    }

}else {
    alert('não tem suporte');
}

btnGravador.addEventListener('click', function (e) {
    gravador.start();
});





