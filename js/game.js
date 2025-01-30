let canvas;
let world;
let keyboard = new Keyboard();
let endscreenfail = false

function init() {
    world = null;
    canvas = document.getElementById("canvas");
   // world = new World(canvas, keyboard);

    //console.log('My Character is', world.character);
}

/* mobileBtnEvent(){
    document.getElementById("btnLeft").addEventListener('touchstart',(e) => {
e.preventDefault();
this.LEFT = true;
    });
}*/

window.addEventListener("keydown", (event) => {
    
   
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
});

window.addEventListener("keyup", (event) => {
    

    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
});



document.addEventListener("DOMContentLoaded", () => {
    // Button: Links
    const btnLeft = document.getElementById("btnLeft");
    if (!btnLeft) {
        console.error("Button with ID 'btnLeft' not found!");
        return;
    }
    btnLeft.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    btnLeft.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    // Button: Rechts
    const btnRight = document.getElementById("btnRight");
    if (!btnRight) {
        console.error("Button with ID 'btnRight' not found!");
        return;
    }
    btnRight.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    btnRight.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    // Button: Werfen (Throw)
    const btnThrow = document.getElementById("btnThrow");
    if (!btnThrow) {
        console.error("Button with ID 'btnThrow' not found!");
        return;
    }
    btnThrow.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    btnThrow.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    // Button: Springen (Jump)
    const btnJump = document.getElementById("btnJump");
    if (!btnJump) {
        console.error("Button with ID 'btnJump' not found!");
        return;
    }
    btnJump.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });
    btnJump.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });
});
/*document.addEventListener("DOMContentLoaded", () => {
    const btnLeft = document.getElementById("btnLeft");
    if (!btnLeft) {
        
        console.error("Button with ID 'btnLeft' not found!");
        return;
    }

    btnLeft.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
        console.log("Touch detected on btnLeft - touchstart");
    });

    btnLeft.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
        console.log("Touch ended on btnLeft - touchend");
    });
});

document.getElementById("btnLeft").addEventListener('touchstart', (e) => {
    e.preventDefault(); // Verhindert das Standardverhalten (z. B. Scrollen)
    console.log("Touch detected on btnLeft - touchstart");
    // Hier kannst du die gewünschte Aktion ausführen
});

document.getElementById("btnLeft").addEventListener('touchend', (e) => {
    e.preventDefault();
    console.log("Touch ended on btnLeft - touchend");
    // Hier kannst du die gewünschte Aktion ausführen
});


 function mobileBtnEvent() {

document.getElementById("btnLeft").addEventListener('touchstart', (e) => {
        e.preventDefault();
    console.log("Touch detected on btnLeft - touchstart");
        keyboard.LEFT = true;
    });

    document.getElementById("btnLeft").addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });


}



function endScreen() {
    let canvas = document.getElementById('canvas');
    let winscreen = document.getElementById('endscreen');
    if (this.endbossIsDead()) {
        canvas.classList.add('d-none');
        winscreen.classList.remove('d-none');
    }
}*/

function startGame(){
    let canvasAndIcons = document.getElementById('canvasAndIcons');
    let canvas = document.getElementById('canvas');
    let startMenu = document.getElementById("startMenu");
    initLevel();
    startMenu.classList.add('d-none');
    canvas.classList.remove('d-none');
    canvasAndIcons.classList.remove('d-none');
    world = new World(canvas, keyboard);

}

function backToMenu(){
    endscreenfail = false;
    let startMenu = document.getElementById("startMenu");
    let endscreenWin = document.getElementById("endscreenWin");
    let endscreenLose = document.getElementById("endscreenLose");

    console.log('startMenu:', startMenu); // Prüfen, ob vorhanden
    console.log('endscreenWin:', endscreenWin); // Prüfen, ob vorhanden
    console.log('endscreenLose:', endscreenLose); // Prüfen, ob vorhanden
    endscreenLose.classList.add('d-none');
    endscreenWin.classList.add('d-none');
   
   // mobileIcons.classList.add('d-none');
    startMenu.classList.remove('d-none');
    

    world = null;
}

function soundMute() {
   // let muteIcon = "img/no_sound_icon.png";
   // let soundOnIcon = "img/sound_icon.png";
    let soundOn = document.getElementById('soundOn');
    let soundOff = document.getElementById('soundOff');
    //let soundIcon = document.getElementById('soundIcon');
    //let audio = document.getElementById('audio');
    if (soundOn.classList.contains('d-none')){
        soundOn.classList.remove('d-none');
        soundOff.classList.add('d-none');
    // Wechsel zwischen den Icons und Ton
   // if (soundIcon.src.includes(soundOnIcon)) {
       // soundIcon.src = muteIcon; // Ändert zu Mute-Icon
       // audio.muted = true; // Ton ausschalten
    } else {
        soundOff.classList.remove('d-none');
        soundOn.classList.add('d-none');
      //  soundIcon.src = soundOnIcon; // Ändert zu Sound-On-Icon
       // audio.muted = false; // Ton einschalten
    }
}