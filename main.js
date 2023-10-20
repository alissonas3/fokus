const htmlBgColor = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const bannerTitle = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');
const focusSound = document.getElementById('alternar-musica');
const startAndPauseButtonText = document.querySelector('#start-pause span');
const startAndPauseIcon = document.querySelector('.app__card-primary-button-icon');
const sound = new Audio('/sons/luna-rise-part-one.mp3');
let intervalId = null
sound.loop = true;



focusSound.addEventListener('change', () => {
    if (sound.paused) {
        sound.play();
    } else {
        sound.pause();
    }
})

focoBt.addEventListener('click', () => {
    timeRemaingInSeconds = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
})


curtoBt.addEventListener('click', () => {
    timeRemaingInSeconds = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})


longoBt.addEventListener('click', () => {
    timeRemaingInSeconds = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})


function alterarContexto(novoContexto) {

    showTimer();
    buttons.forEach(function (novoContexto) {
        novoContexto.classList.remove('active');
    })

    htmlBgColor.setAttribute('data-contexto', novoContexto);
    banner.setAttribute('src', `/imagens/${novoContexto}.png`);

    switch (novoContexto) {
        case 'foco': 
            bannerTitle.innerHTML = `
            Otimize sua produtividade, <strong class="app__title-strong">mergulhe no que importa.</strong>`   
            break;
        
        case 'descanso-curto': 
            bannerTitle.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong"> Faça uma pausa curta!</strong>`
            break;

        case 'descanso-longo':
            bannerTitle.innerHTML = `
            Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;

        default:
            break;
    }
}

let timeRemaingInSeconds = 1500;
const startPauseButton = document.querySelector('#start-pause'); 

const timeRemaining = () => {

    if(timeRemaingInSeconds <= 0) {
        beepSound.play();
        alert('Time is over.')
        reset()
        return
    }

    timeRemaingInSeconds -= 1;
    showTimer();
}

startPauseButton.addEventListener('click', startAndPause);

const playSound = new Audio('/sons/play.wav');
const pauseSound = new Audio('/sons/pause.mp3');
const beepSound = new Audio('/sons/beep.mp3');

function startAndPause() {
    if(intervalId) {
        pauseSound.play();
        reset()
        return
    }
    playSound.play();
    intervalId = setInterval(timeRemaining, 1000);
    startAndPauseIcon.setAttribute('src', "/imagens/pause.png");
    startAndPauseButtonText.textContent = "Pausar";
}

function reset() {
    clearInterval(intervalId)
    startAndPauseIcon.setAttribute('src', "/imagens/play_arrow.png");
    startAndPauseButtonText.textContent = "Iniciar";
    intervalId = null;
}

const timer = document.querySelector('#timer');

function showTimer() {
    const timeRemaining = new Date(timeRemaingInSeconds * 1000);
    const timeFortmat = timeRemaining.toLocaleTimeString('pt-br', {minute: "2-digit", second: "2-digit"});
    timer.innerHTML = `${timeFortmat}`
}

showTimer();