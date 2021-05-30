let canvas = document.getElementById("canvas");

/*getContext() method comprises of all the necessary properties and functions for game development*/
let ctx = canvas.getContext("2d");
let fire1 = document.getElementById("fire1");
let fire2 = document.getElementById("fire2");
let frames = 0;
//loading the images

//loading sprite image
let sprite = new Image();
sprite.src = "images/sprite.png";

//loading the ball
let cricket = new Image();
cricket.src = "images/cricket.png";

//loading sounds

//loading die sound
let die = new Audio();
die.src = "audio/die.wav";

//loading flap sound
let flap = new Audio();
flap.src = "audio/flap.wav";

//loading hit sound
let hit = new Audio();
hit.src = "audio/hit.wav";

//loading point sound
let point = new Audio();
point.src = "audio/point.wav";

//loading swooshing sound
let swooshing = new Audio();
swooshing.src = "audio/swooshing.wav";


//Game state object

const state = {
    current: 0,
    getReady: 0,
    game: 1,
    gameOver: 2,
}
canvas.addEventListener("click", function (event) {

    switch (state.current) {

        case state.getReady:
            state.current = state.game;
            swooshing.play();
            break;
        case state.game:
            bird.move();
            flap.play();
            break;
        case state.gameOver:
            let cvspos = canvas.getBoundingClientRect();//returns properties related to canvas
            let clickX = event.clientX - cvspos.left; //returns the x axis value where the click has ocurred
            let clickY = event.clientY - cvspos.top; //returns the y axis value where the click has ocurred

            //this condition ensures that the game restarts only if the click has been made over the start button and not anywhere else in the screen
            if (clickX > startbtn.x && clickX < startbtn.x + startbtn.w && clickY > startbtn.y && clickY < startbtn.y + startbtn.h) {
                state.current = state.getReady;
                pipes.reset();
                ball.reset();
                score.reset();
            }
            break;
    }
})

//startBtn object
const startbtn = {
    x: 720,
    y: 373,
    w: 83,
    h: 29,
}
//getReady object
const getReady = {

    sX: 0,
    sY: 228,
    w: 173,
    h: 152,

    /*for the getReady sign to appear at the center of the the canvas we also need to subtract the width of the get ready sign after dividing it by 2 */
    x: canvas.width / 2 - (173 / 2),
    y: 200,
    draw: function () {

        if (state.current == state.getReady) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
            fire1.style.display = "none";
            fire2.style.display = "none";
        }
    }
}

//gameOver object
const gameOver = {

    sX: 175,
    sY: 228,
    w: 225,
    h: 202,

    /*for the getReady sign to appear at the center of the the canvas we also need to subtract the width of the get ready sign after dividing it by 2 */
    x: canvas.width / 2 - (225 / 2),
    y: 200,
    draw: function () {

        if (state.current == state.gameOver) {

            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
            fire1.style.display = "block";
            fire2.style.display = "block";
        }
    }
}

//Cloud object
let cloud = {
    sX: 0,
    sY: 0,
    w: 275,
    h: 220,
    x: 0,
    y: canvas.height - 220,
    draw: function () {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (2 * this.w), this.y, this.w,
            this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (3 * this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (4 * this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (5 * this.w), this.y, this.w, this.h);
    }
}

//ground object
let ground = {
    sX: 276,
    sY: 0,
    w: 224,
    h: 112,
    x: 0,
    y: canvas.height - 112,
    dx: 3,
    draw: function () {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (2 * this.w), this.y, this.w,
            this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (3 * this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (4 * this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (5 * this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (6 * this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (7 * this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + (8 * this.w), this.y, this.w, this.h);
    },
    update: function () {

        if (state.current == state.game) {
            this.x = this.x - this.dx;
            if (this.x % 112 == 0) {
                this.x = 0;
            }
        }
    }

}

//bird object
const bird = {

    /* creating an array that will store the positions of the four birds */
    animation:
        [
            { sX: 276, sY: 112 },
            { sX: 276, sY: 139 },
            { sX: 276, sY: 164 },
            { sX: 276, sY: 139 },
        ],

    //setting the position and height and width of the bird in the canvas
    x: 50,
    y: 150,
    w: 34,
    h: 26,
    frame: 0,
    period: 5,
    speed: 0,
    jump: 4.6,
    gravity: 0.20,
    radius: 13,

    //to draw the bird
    draw: function () {
        let bird = this.animation[this.frame];
        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    },


    update: function () {

        //initially in the get ready state the bird will flap slowly. once the game starts the bird will start flapping rapidly
        //(initially: image changes after every 10 frames)--slower
        //(game state: image changes after every 5 frames)--faster
        this.period = state.current == state.getReady ? 10 : 5;

        //to flap the bird
        this.frame += frames % this.period == 0 ? 1 : 0;

        //resetting the frames
        this.frame = this.frame % this.animation.length;

        if (state.current == state.getReady) {
            this.y = 150;
        }
        else {

            //Gravity
            this.y = this.y + this.speed;
            this.speed = this.speed + this.gravity;
        }
        if (this.y + this.h / 2 >= canvas.height - ground.h) {
            this.speed = 0;
            this.frame = 0;
            if (state.current == state.game) {
                state.current = state.gameOver;
                die.play();
            }
        }

    },
    move: function () {

        //negetive value of this.jump signifies that the bird will move from bottom to top
        this.speed = -this.jump;
    }
}

//pipe object
const pipes = {
    position: [],
    top: {
        sX: 553,
        sY: 0,
    },
    bottom: {
        sX: 502,
        sY: 0,
    },
    w: 53,
    h: 400,
    gap: 130,
    maxYPos: -150,
    dx: 3,
    draw: function () {
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            let topYPos = p.y;
            let bottomYPos = p.y + this.h + this.gap;

            //to draw top pipe
            ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);

            //to draw bottom pipe
            ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);
        }
    },
    update: function () {
        if (state.current !== state.game) {
            return;
        }
        //for every 100 frames push an object into the position[] array
        if (frames % 100 == 0) {
            this.position.push({
                x: canvas.width,
                y: this.maxYPos * (Math.random() + 1),
            });
        }
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            p.x = p.x - this.dx;

            //for removing the pipes from the array so that memory doesn't exceed
            if (p.x + this.w <= 0) {

                this.position.shift();
                point.play();
                //the score will increment when the pipes leave the canvas
                score.value = score.value + 1;
                score.best = Math.max(score.best, score.value);

                //we are storing the best score in the local storage so that even if you play the game at a different time your best score till now remains saved
                localStorage.setItem("best", score.best);
            }
            //for collision with the top pipes
            if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h) {
                hit.play();
                state.current = state.gameOver;

            }
            //for collision with the bottom pipes
            let tobp = p.y + this.h + this.gap;
            let bobp = tobp + this.h;
            if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > tobp && bird.y - bird.radius < bobp) {
                hit.play();
                state.current = state.gameOver;

            }
        }
    },
    reset: function () {
        this.position = [];
    }

}

//ball object
const ball = {
    ball_position: [],
    w: 30,
    h: 30,
    sX: 0,
    sY: 0,
    dx: 4,
    draw: function () {
        for (let i = 0; i < this.ball_position.length; i++) {

            let p = this.ball_position[i];
            ctx.drawImage(cricket, this.sX, this.sY, 2000, 2000, p.x, p.y, this.w, this.h);
        }
    },
    update: function () {

        if (state.current !== state.game) {
            return;
        }
        if (frames % 100 == 0) {
            this.ball_position.push({
                x: canvas.width,
                y: Math.random() * 400,
            });
        }
        for (let i = 0; i < this.ball_position.length; i++) {
            let p = this.ball_position[i];
            p.x = p.x - this.dx;

            if (p.x + this.w <= 0) {
                this.ball_position.shift();
            }
            //for collision with ball
            if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h) {
                hit.play();
                state.current = state.gameOver;

            }
        }
    },
    reset: function () {
        this.ball_position = [];
    }
}

//score object
const score = {

    //fetching the best score(in Integer) from the local storage if not present assign 0
    best: parseInt(localStorage.getItem("best")) || 0,
    value: 0,

    draw: function () {
        ctx.fillStyle = "#000000";
        if (state.current == state.game) {
            ctx.font = "50px ubuntu";
            ctx.fillText(this.value, canvas.width / 2, 100);
        }
        else if (state.current == state.gameOver) {

            //for normal score
            ctx.font = "30px ubuntu";
            ctx.fillText(this.value, canvas.width / 2 + 65, 300);

            //for best score
            ctx.font = "30px ubuntu";
            ctx.fillText(this.best, canvas.width / 2 + 65, 340);
        }
    },
    reset: function () {
        this.value = 0;
    }
}

//for drawing all the images in the canvas
function draw() {
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    cloud.draw();
    pipes.draw();
    ball.draw();
    ground.draw();
    bird.draw();
    getReady.draw();
    gameOver.draw();
    score.draw();
}

//for all the logic of the game
function update() {
    ground.update();//to move the ground 
    bird.update();
    pipes.update();
    ball.update();
}

//loop function to draw the image again and again
function loop() {
    draw();
    update();
    frames++;
    requestAnimationFrame(loop);
}
loop();