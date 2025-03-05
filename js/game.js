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

let navbar = document.getElementById('navbar');
let winningScreen = document.getElementById('winningScreen');
let endscreenLose = document.getElementById('endscreenLose');
let infoIcon = document.getElementById('infoIcon')
let closeIcon = document.getElementById('closeIcon');
let legal = document.getElementById('legal')
let startMenu = document.getElementById("startMenu");
let mobileIcons = document.getElementById('mobileIcons');
let canvasAndIcons = document.getElementById('canvasAndIcons');
let soundOn = document.getElementById("soundOn");
let soundOff = document.getElementById("soundOff");
let gamescreen = document.getElementById("gameScreen");
let fullscreenIcon = document.getElementById('fullscreenIcon');
let notFullscreenIcon = document.getElementById('notFullscreenIcon');
let legalOverlay = document.getElementById('legalOverlay');
let mainOverlay = document.getElementById('mainOverlay');
let playInfoOverlay = document.getElementById("playInfoOverlay");

/**
 * Initializes the application by setting the global `world` object to `null`
 * and retrieving the `canvas` element from the DOM.
 */
function init() {
    world = null;
    canvas = document.getElementById("canvas");

}

/**
 * Manages the playback of background music and game sound effects at 1-second intervals.
 * 
 * - Plays or pauses `backgroundmusic` and `chickenBackground` based on the `notMute` and `gameIsRunning` flags.
 * - Resets the audio to the beginning when paused to ensure it starts from the beginning on the next play.
 * - Handles playback errors gracefully by logging them to the console.
 */
setInterval(() => {
    if (notMute) {
        if (backgroundmusic.paused) {
            backgroundmusic.play();
        }
        if (gameIsRunning) {
            if (chickenBackground.paused) {
                chickenBackground.play();
            }
        } else {
            if (!chickenBackground.paused) {
                chickenBackground.pause();
                chickenBackground.currentTime = 0;
            }
        }
    } else {
        if (!backgroundmusic.paused) {
            backgroundmusic.pause();
            backgroundmusic.currentTime = 0;
        }
        if (!chickenBackground.paused) {
            chickenBackground.pause();
            chickenBackground.currentTime = 0;
        }
    }
}, 1000);


window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) keyboard.RIGHT = true;
    if (event.keyCode == 37) keyboard.LEFT = true;
    if (event.keyCode == 38) keyboard.UP = true;
    if (event.keyCode == 40) keyboard.DOWN = true;
    if (event.keyCode == 32) keyboard.SPACE = true;
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) keyboard.RIGHT = false;
    if (event.keyCode == 37) keyboard.LEFT = false;
    if (event.keyCode == 38) keyboard.UP = false;
    if (event.keyCode == 40) keyboard.DOWN = false;
    if (event.keyCode == 32) keyboard.SPACE = false;
});



document.addEventListener("DOMContentLoaded", () => {
    /**
     * Adds touch event listeners to a button.
     * @param {string} buttonId - The ID of the button.
     * @param {string} key - The corresponding key in the keyboard object.
     */
    function addTouchControls(buttonId, key) {
        let button = document.getElementById(buttonId);

        button.addEventListener("touchstart", (e) => {
            e.preventDefault();
            keyboard[key] = true;
        });
        button.addEventListener("touchend", (e) => {
            e.preventDefault();
            keyboard[key] = false;
        });
    }

    /**
     * Initializes all touch controls.
     */
    function initializeTouchControls() {
        let controls = [
            { id: "btnLeft", key: "LEFT" },
            { id: "btnRight", key: "RIGHT" },
            { id: "btnThrow", key: "SPACE" },
            { id: "btnJump", key: "UP" }
        ];
        controls.forEach(control => addTouchControls(control.id, control.key));
    }
    initializeTouchControls();
});

/**
 * Initializes the game, updates UI elements, and starts the game world.
 */
function startGame() {
    initLevel();
    startMenu.classList.add('d-none');
    infoIcon.classList.add('d-none');
    canvas.classList.remove('d-none');
    closeIcon.classList.remove('d-none');
    canvasAndIcons.classList.remove('d-none');
    mobileIcons.classList.remove('d-none');
    legal.classList.add('d-none');
    world = new World(canvas, keyboard);
    gameIsRunning = true;
}

/**
 * Returns to the main menu, resets the game state, and updates UI elements.
 */
function backToMenu() {
    endscreenfail = false;
    endscreenLose.classList.add('d-none');
    winningScreen.classList.add('d-none');
    legal.classList.remove('d-none');
    startMenu.classList.remove('d-none');
    infoIcon.classList.remove('d-none');
    navbar.classList.remove('d-none');
    closeIcon.classList.add('d-none');
    gameIsRunning = false;
    world = null;
}

/**
 * Restarts the game by returning to the menu and starting a new game.
 */
function restartGame() {
    backToMenu();
    startGame();
}

/**
 * Toggles the sound on or off and updates the sound icons accordingly.
 */
function soundMute() {
    if (notMute) {
        soundOn.classList.add("d-none");
        soundOff.classList.remove("d-none");
        notMute = false;
    } else {
        soundOn.classList.remove("d-none");
        soundOff.classList.add("d-none");
        notMute = true;
    }
}

/**
 * Enables fullscreen mode for the game screen and updates UI elements.
 */
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

/**
 * Exits fullscreen mode and restores UI elements.
 */
function closeFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(err => console.warn("Fehler beim Beenden des Vollbildmodus:", err));
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
    canvas.classList.remove('fullscreenclass');
    fullscreenIcon.classList.remove('d-none');
    notFullscreenIcon.classList.add('d-none');
    startMenu.classList.remove('fullscreenclass');
    resetZoom();
}

/**
 * Adjusts the zoom level of the game screen based on the window size in fullscreen mode.
 * Resets the zoom if not in fullscreen.
 */
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

/**
 * Resets the zoom and restores the original size of the game screen.
 */
function resetZoom() {
    gamescreen.style.transform = 'scale(1)';
    gamescreen.style.width = '';  // Originalbreite wiederherstellen
    gamescreen.style.height = '';
}


document.addEventListener('fullscreenchange', adjustZoom);
window.addEventListener('resize', adjustZoom);

/**
 * Displays the legal information pop-up, including contact details, disclaimer, and copyright notice.
 */
function legalPopUp() {
    let legalText = document.getElementById('legalText');
    mainOverlay.classList.remove('d-none');
    legalOverlay.classList.remove('d-none');
    legalText.innerHTML =/*html*/`
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
           <a href="https://www.freepik.com">Freepik</a>
<a href="https://www.freepik.com/icon/screen_8373473#fromView=resource_detail&position=7" title="Screen Icon">Icon by Icon Hubs</a>
<a href="https://www.flaticon.com/de/kostenlose-icons/impressum" title="Impressum Icons">Icons erstellt von Picons - Flaticon</a>
<a href="https://www.flaticon.com/de/kostenlose-icons/information" title="Information Icons">Information Icons erstellt von Freepik - Flaticon</a>
</span>`
}

/**
 * Closes the legal information overlay by hiding it.
 */
function closeLegalOverlay() {
    mainOverlay.classList.add('d-none');
    legalOverlay.classList.add('d-none');
}

function infoPopUp() {
    mainOverlay.classList.remove('d-none')
    playInfoOverlay.classList.remove('d-none')
}

function closePlayInfoOverlay() {
    mainOverlay.classList.add('d-none')
    playInfoOverlay.classList.add('d-none')
}

/**
 * Ends the game and returns to the main menu.
 * Hides UI elements, stops game intervals, and resets the game world.
 */
function closeGame() {
    let endboss = world.level.enemies.find(enemy => enemy instanceof Endboss);
    mobileIcons.classList.add('d-none');
    canvas.classList.add('d-none');
    world.character.stopAllIntervals();
    endboss.stopAllIntervals();
    gameIsRunning = false;
    world = null;
    navbar.classList.add('d-none');
    backToMenu();
}

/**
 * Displays the win screen after defeating the Endboss.
 * Hides the game elements, stops intervals, and shows the win screen.
 */
function endScreenWin() {
    let endboss = world.level.enemies.find(enemy => enemy instanceof Endboss);
    setTimeout(() => {
        mobileIcons.classList.add('d-none');
        canvas.classList.add('d-none');
        closeFullscreen();
        winningScreen.classList.remove('d-none');
        world.character.stopAllIntervals();
        endboss.stopAllIntervals();
    }, 1500);
    gameIsRunning = false;
    navbar.classList.add('d-none');
}
