class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;



    mobileBtnEvent() {
        document.getElementById("btnLeft").addEventListener('touchstart', (e) => {
            e.preventDefault();
            console.log("Touch detected on btnLeft - touchstart");
            this.keyboard.LEFT = true;
        });

        document.getElementById("btnLeft").addEventListener('touchend', (e) => {
            e.preventDefault();
            this.keyboard.LEFT = false;
        });



    }  
}