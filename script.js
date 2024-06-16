const { speechSynthesis } = window;
const voice = document.getElementById('voices');
const rate = document.getElementById('rate');
const pitch = document.getElementById('pitch');
const text = document.getElementById('text');
const pauseBtn = document.getElementById('btn-pause');
const modal = document.querySelector('.modal');
const btnModalClose = document.querySelector('.btnclosed');
const btnModal = document.querySelector('.btnhelp')

let voices = [];
let utterance; 

const generateVoises = () => {
    voices = speechSynthesis.getVoices();

    const voicesList = voices.map((voice, index) => {
          return `<option value=${index}>${voice.name} (${voice.lang})</option>`
    }).join('')

    voice.innerHTML = voicesList;
};

const speak = () => {
    if (speechSynthesis.speaking) {
        console.error('текст уже идет');
        return;
    }

    if (text.value !== '') {
        utterance = new SpeechSynthesisUtterance(text.value);
        
        utterance.addEventListener('end', (event) => console.log('закончился'));
        utterance.addEventListener('error', (event) => console.warn('ошибка'));

        utterance.voice = voices[voice.value];
        utterance.pitch = pitch.value;
        utterance.rate = rate.value;

        speechSynthesis.speak(utterance);
    }
};

const pauseSpeech = () => {
    if (speechSynthesis.speaking) {
        speechSynthesis.pause();
    }
};

const resumeSpeech = () => {
    if (speechSynthesis.paused) {
        speechSynthesis.resume();
    }
};

generateVoises();

document.getElementById('btn-stop').addEventListener('click', () => speechSynthesis.cancel());
document.getElementById('btn-start').addEventListener('click', speak);
pauseBtn.addEventListener('click', pauseSpeech); 

rate.addEventListener('change', () => document.querySelector('.rate-value').textContent = rate.value);
pitch.addEventListener('change', () => document.querySelector('.pitch-value').textContent = pitch.value);

voice.addEventListener('change', speak);

speechSynthesis.addEventListener('voiceschanged', generateVoises);

const resumeBtn = document.getElementById('btn-resume'); 
resumeBtn.addEventListener('click', resumeSpeech); 

//модальное окно

btnModal.addEventListener('click', () => {
    modal.classList.add('active');
});

btnModalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});
