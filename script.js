const application = document.documentElement;
const main = document.querySelector('main');
const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
const sharpKeys = document.querySelector('keys-sharp');
const lettersBtn = document.querySelector('.btn-letters');
const notesBtn = document.querySelector('.btn-notes');
const fullscreenBtn = document.querySelector('.fullscreen');
const letters = ['D', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'O', 'R', 'T', 'U'];
const button = document.querySelector('.songBtn');
const url =
    'https://zvukipro.com/uploads/files/2017-09/1504526458_zvuki-prirody-penie-solovya.mp3';

const fullScreenOpen = () => {
    if (application.requestFullscreen) {
        application.requestFullscreen();
    } else if (application.mozRequestFullScreen) {
        application.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        application.webkitRequestFullscreen();
    } else if (application.msRequestFullscreen) {
        application.msRequestFullscreen();
    }
};

//===================================================================

const fullScreenClose = () => {
    if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
};

fullscreenBtn.addEventListener('click', fullScreenOpen);
fullscreenBtn.addEventListener('click', fullScreenClose);

//======================================================================

const changeLetters = () => {
    notesBtn.classList.toggle('btn-active');
    lettersBtn.classList.toggle('btn-active');
    pianoKeys.forEach((key) => {
        key.classList.toggle('piano-key-letter');
    });
};

lettersBtn.addEventListener('click', changeLetters);
notesBtn.addEventListener('click', changeLetters);

//======================================================================

button.addEventListener('click', () => playAudio(url));
const playAudio = (src) => {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
};

//=======================================================================

const keyPress = (e) => {
    if (e.target.classList.contains('piano-key')) {
        e.target.classList.add('piano-key-active-pseudo', 'piano-key-active');
        e.target.classList.remove('piano-key-remove-mouse');
        const note = e.target.dataset.note;
        const src = `assets/audio/${note}.mp3`;
        playAudio(src);
    }
};

//=========================================================================

const keyRelease = (e) => {
    if (e.target.classList.contains('piano-key')) {
        e.target.classList.remove(
            'piano-key-active-pseudo',
            'piano-key-active'
        );
        e.target.classList.add('piano-key-remove-mouse');
    }
};
piano.addEventListener('mousedown', keyPress);
piano.addEventListener('mouseup', keyRelease);

//========================================================================

const startMove = () => {
    pianoKeys.forEach((key) => {
        key.addEventListener('mouseover', keyPress);
        key.addEventListener('mouseout', keyRelease);
    });
};

//=========================================================================

const stopMove = () => {
    pianoKeys.forEach((key) => {
        key.removeEventListener('mouseover', keyPress);
        key.removeEventListener('mouseout', keyRelease);
    });
};

piano.addEventListener('mousedown', startMove);
piano.addEventListener('mouseup', stopMove);

//========================================================================

application.addEventListener('mouseup', (e) => {
    if (e.target === main) {
        stopMove();
    }
});

//=========================================================================

window.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    const code = e.code.replace(/[a-zA-Z]{3}/, '');
    letters.forEach((letter) => {
        if (code === letter) {
            const key = document.querySelector(
                `.piano-key[data-letter='${code}']`
            );
            const letterValue = key.getAttribute('data-letter');
            const noteValue = key.getAttribute('data-note');
            if (code === letterValue) {
                key.classList.add(
                    'piano-key-active-pseudo',
                    'piano-key-active'
                );
                playAudio(`assets/audio/${noteValue}.mp3`);
            }
        }
    });
});

//=========================================================================

window.addEventListener('keyup', (e) => {
    const code = e.code.replace(/[a-zA-Z]{3}/, '');
    const key = document.querySelector(`[data-letter='${code}']`);
    letters.forEach((letter) => {
        if (code === letter) {
            key.classList.remove('piano-key-active-pseudo', 'piano-key-active');
        }
    });
});
