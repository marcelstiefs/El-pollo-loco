let canvas;
let world;
let keyboard = new Keyboard();
let endscreenfail = false
let gameIsRunning = false
let backgroundmusic = new Audio('sounds/Background-sound.mp3');
let chickenBackground = new Audio('sounds/chicken-background.mp3')
let notMute = false;
backgroundmusic.volume = 0.1;
chickenBackground.volume = 0.2;
backgroundmusic.loop = true;
chickenBackground.loop = true;


function init() {
    world = null;
    canvas = document.getElementById("canvas");
    if(notMute){
      //  backgroundmusic.play();
    }
   // world = new World(canvas, keyboard);

    //console.l;og('My Character is', world.character);
}

setInterval(() => {
    if (notMute) {
        if (backgroundmusic.paused) {
            backgroundmusic.play().catch((err) => console.error('Fehler beim Abspielen von backgroundmusic:', err));
        }
        if (gameIsRunning) {
            if (chickenBackground.paused) {
                chickenBackground.play().catch((err) => console.error('Fehler beim Abspielen von chickenBackground:', err));
            }
        } else {
            if (!chickenBackground.paused) {
                chickenBackground.pause();
                chickenBackground.currentTime = 0; // Stoppt den Sound beim Beenden des Spiels
            }
        }
    } else {
        if (!backgroundmusic.paused) {
            backgroundmusic.pause();
            backgroundmusic.currentTime = 0; // Startet den Sound beim nächsten Play von vorne
        }
        if (!chickenBackground.paused) {
            chickenBackground.pause();
            chickenBackground.currentTime = 0;
        }
    }
}, 1000);


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

 
 let closeGame = document.getElementById('closeGame');
let legal = document.getElementById('legal')
function startGame(){
   
    let mobileIcons = document.getElementById('mobileIcons');
    let canvasAndIcons = document.getElementById('canvasAndIcons');
   let canvas = document.getElementById('canvas');
    let startMenu = document.getElementById("startMenu");
    initLevel();
    startMenu.classList.add('d-none');
    canvas.classList.remove('d-none');
    closeGame.classList.remove('d-none');

    canvasAndIcons.classList.remove('d-none');
    mobileIcons.classList.remove('d-none');
    legal.classList.add('d-none');
    world = new World(canvas, keyboard);
    gameIsRunning = true;
}
let startMenu = document.getElementById("startMenu");
function backToMenu(){
    endscreenfail = false;
    
    let navbar = document.getElementById("navbar");
    let endscreenWin = document.getElementById("endscreenWin");
    let endscreenLose = document.getElementById("endscreenLose");
    
    endscreenLose.classList.add('d-none');
    endscreenWin.classList.add('d-none');
    legal.classList.remove('d-none');
   
    startMenu.classList.remove('d-none');
    navbar.classList.remove('d-none');
    closeGame.classList.add('d-none');
    gameIsRunning = false;

    world = null;
}



function soundMute() {
    const soundOn = document.getElementById("soundOn");
    const soundOff = document.getElementById("soundOff");

    // Toggle soundsEnabled-Status
  //  world.character.soundsEnabled = !world.character.soundsEnabled;

    // Alle Sounds ein- oder ausschalten
   // for (let sound in character.allsounds) {
      //  character.allsounds[sound].muted = !character.soundsEnabled;
//    }

    // Icon wechseln
    if (notMute) {
       soundOn.classList.add("d-none");
        soundOff.classList.remove("d-none");
        notMute = false
       
        
        
    } else { 
         soundOn.classList.remove("d-none");
        soundOff.classList.add("d-none");
       
        notMute = true
       
      
    }



}
let gamescreen = document.getElementById("gameScreen");
let fullscreenIcon = document.getElementById('fullscreenIcon');
let notFullscreenIcon = document.getElementById('notFullscreenIcon');

// Fullscreen aktivieren
function openFullscreen() {
    if (gamescreen.requestFullscreen) {
        gamescreen.requestFullscreen();
    } else if (gamescreen.webkitRequestFullscreen) {
        gamescreen.webkitRequestFullscreen();
    } else if (gamescreen.msRequestFullscreen) {
        gamescreen.msRequestFullscreen();
    }
    fullscreenIcon.classList.add('d-none');
    notFullscreenIcon.classList.remove('d-none');
    canvas.classList.add('fullscreenclass');
    startMenu.classList.add('fullscreenclass');
}

// Fullscreen beenden
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    canvas.classList.remove('fullscreenclass');
    fullscreenIcon.classList.remove('d-none');
    notFullscreenIcon.classList.add('d-none');
    resetZoom();
}

// Zoom-Anpassung
function adjustZoom() {
    if (document.fullscreenElement) {
        let scaleX = window.innerWidth / gamescreen.offsetWidth;
        let scaleY = window.innerHeight / gamescreen.offsetHeight;
        let scale = Math.min(scaleX, scaleY); // Proportional skalieren
        gamescreen.style.transform = `scale(${scale})`;
        gamescreen.style.width = '100vw';   // Viewport-Width für Fullscreen
        gamescreen.style.height = '100vh';  // Viewport-Height für Fullscreen
    } else {
        resetZoom();
    }
}

// Zoom zurücksetzen
function resetZoom() {
    gamescreen.style.transform = 'scale(1)';
    gamescreen.style.width = '';  // Originalbreite wiederherstellen
    gamescreen.style.height = '';
}

// Events für automatische Zoom-Anpassung
document.addEventListener('fullscreenchange', adjustZoom);
window.addEventListener('resize', adjustZoom);


/*
  
    

   
let gamescreen = document.getElementById("gameScreen");
let fullscreenIcon = document.getElementById('fullscreenIcon');
let notFullscreenIcon = document.getElementById('notFullscreenIcon');

// Fullscreen aktivieren
function openFullscreen() {
    if (gamescreen.requestFullscreen) {
        gamescreen.requestFullscreen();
    } else if (gamescreen.webkitRequestFullscreen) {
        gamescreen.webkitRequestFullscreen();
    } else if (gamescreen.msRequestFullscreen) {
        gamescreen.msRequestFullscreen();
    }
    fullscreenIcon.classList.add('d-none');
    notFullscreenIcon.classList.remove('d-none');
}

// Fullscreen beenden
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    fullscreenIcon.classList.remove('d-none');
    notFullscreenIcon.classList.add('d-none');
}

// Zoom-Anpassung
function adjustZoom() {
    if (document.fullscreenElement) {
        let scaleX = window.innerWidth / gamescreen.offsetWidth;
        let scaleY = window.innerHeight / gamescreen.offsetHeight;
        let scale = Math.min(scaleX, scaleY); // Proportional skalieren
        gamescreen.style.transform = `scale(${scale})`;
        gamescreen.style.transformOrigin = 'center center';
    } else {
        gamescreen.style.transform = 'scale(1)'; // Zurücksetzen
    }
}

// Events für automatische Zoom-Anpassung
document.addEventListener('fullscreenchange', adjustZoom);
window.addEventListener('resize', adjustZoom);

 */
let legalOverlay = document.getElementById('legalOverlay');
    function legalPopUp(){
        let legalText = document.getElementById('legalText');
        legalOverlay.classList.remove('d-none');
        legalText.innerHTML=/*html*/`

         <h1>Impressum</h1>

        <h2>Verantwortliche Instanz</h2>
        <p><strong>Marcel Stiefs</strong><br>
        Königstraße 24<br>
        26835 Holtland<br>
        Deutschland</p>

        <h2>Vertreten durch:</h2>
        <p>Marcel Stiefs</p>

        <div class="contact">
            <h2>Kontakt</h2>
            <p>Telefon: <a href="tel:+491713532701">0171 3532701</a><br>
            E-Mail: <a href="mailto:marcel.stiefs@web.de">marcel.stiefs@web.de</a></p>
        </div>

        <h2>Haftungsausschluss</h2>
        <p>Der Autor übernimmt keine Gewähr für die Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen.</p>
        <p>Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, die aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen.</p>
        <p>Alle Angebote sind freibleibend. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.</p>

        <h2>Haftungsausschluss für Inhalte und Links</h2>
        <p>Verweise und Links auf Webseiten Dritter liegen außerhalb unseres Verantwortungsbereichs. Es wird jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten erfolgen auf eigene Gefahr des jeweiligen Nutzers.</p>

        <h2>Urheberrechtserklärung</h2>
        <p>Die Urheber- und alle a
            License Erwähnungen:
            <a href="https://www.freepik.com<a href=" https://www.freepik.com/icon/screen_8373473 
            href="https://www.freepik.com/icon/screen_8373473#fromView=resource_detail&position=7">Icon by Icon Hubs</a>
            <a href="https://www.flaticon.com/de/kostenlose-icons/impressum" title="impressum Icons">Icons erstellt von Picons - Flaticon</a>


          </span>

         `
    } 
function closeLegalOverlay(){
    legalOverlay.classList.add('d-none');
}