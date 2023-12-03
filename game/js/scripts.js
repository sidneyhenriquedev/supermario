const mario = document.getElementById('Supermario')
const bgGame = document.getElementById('bgGame')
const block = document.getElementById('block')
const coin = document.getElementById('coin')
const coinsImg = document.getElementById('coinsImg')
const points = document.getElementById('points')
const life = document.getElementById('life')
const enemy = document.getElementById('enemy')
const menu = document.getElementById('menu')
const time = document.getElementById('time')
const StartGame = document.getElementById('StartGame')
const AudioJump = document.getElementById('AudioJump')
const AudioGetCoin = document.getElementById('AudioGetCoin')
const AudioDeath = document.getElementById('AudioDeath')
const AudioMoreLife = document.getElementById('AudioMoreLife')
const AudiOveringMission = document.getElementById('AudiOveringMission')
const AudiOveringTime = document.getElementById('AudiOveringTime')
const GameOver = document.getElementById('GameOver')
const BtnPlayAgain = document.getElementById('BtnPlayAgain')
const BtnOutGame = document.getElementById('BtnOutGame')
const howPlay = document.getElementById('howPlay')
const programer = document.getElementById('programer')

//Size cenary of the game, the mario cannot walking out of cenary
const widthbgGame = bgGame.offsetWidth
const widthMario = mario.offsetWidth

let position = 0
let direction = 0
let velocity = 10

//points and life coins of the game
let lifeTotal = parseInt(localStorage.getItem("lifeNow")) || 5
life.textContent = lifeTotal
let coinsTotal = parseInt(localStorage.getItem("coinsNow")) || 0
coin.textContent = coinsTotal
let pointsTotal = parseInt(localStorage.getItem("pointsNow")) || 0
points.textContent = pointsTotal


let CountTime = 200
let checkColisionBlock
let checkMove
let checkColisionEnemy
let checkJump
let colision = false
let isPlaying = AudiOveringMission

//move mario when keypress
function pressKey(event) {
    if (event.key === 'ArrowRight') {

        direction = 1
        mario.style.backgroundImage = "url('./img/marioWalkingRight.gif')"
    } else if (event.key === 'ArrowLeft') {
        direction = -1
        mario.style.backgroundImage = "url('./img/marioWalkingLeft.gif')"
    } else if (event.key === ' ' || event.key === 'Space') {
        mario.classList.add("jumpMarioPressKey")
        if (colision) {
            clearTimeout(checkJump)
        } else {
            colision = false
            AudioJump.play()
            checkJump = setTimeout(() => {
                mario.classList.remove("jumpMarioPressKey")
            }, 600)

        }

    }


}

//stop mario when no hold de keys
function nopressKey(event) {
    if (event.key === 'ArrowRight') {
        direction = 0
        mario.style.backgroundImage = "url('./img/marioStopedRight.png')"
    } else if (event.key === 'ArrowLeft') {
        direction = 0
        mario.style.backgroundImage = "url('./img/marioStopedLeft.png')"
    }


}

//refresh positions and directions here the mario cannot out of cenary
function refreshMove() {
    position = position + direction * velocity

    if (position < 0) {
        position = 0
    } else if (position + widthMario > widthbgGame) {
        position = widthbgGame - widthMario
    }

    mario.style.left = position + "px"

}

//here check colosion with block for win coins
function colisionBlock() {
    const checkMario = mario.getBoundingClientRect()
    const checkShockBloc = block.getBoundingClientRect()

    if (checkShockBloc.left < checkMario.right &&
        checkShockBloc.right > checkMario.left &&
        checkShockBloc.top < checkMario.bottom &&
        checkShockBloc.bottom > checkMario.top

    ) {
        // efect of block when mario crash head in the block
        if (!block.classList.contains("moveBlocktoUP")) {
            block.classList.add("moveBlocktoUP");

            setTimeout(() => {
                block.classList.remove("moveBlocktoUP")
            }, 500);

        }

        // efect of coin out of block when mario chock with bloc
        if (!coinsImg.classList.contains("coinUp")) {
            coinsImg.classList.add("coinUp");
            coinsImg.style.display = 'block'
            AudioGetCoin.play()
            setTimeout(() => {
                coinsImg.classList.remove("coinUp")
                coinsImg.style.display = 'none'

            }, 100);

        }

        clearInterval(checkColisionBlock)
        coinsTotal++
        coin.textContent = coinsTotal
        localStorage.setItem('coinsNow', coinsTotal)
        pointsTotal = pointsTotal + 10
        points.textContent = pointsTotal
        localStorage.setItem('pointsNow', pointsTotal)
        checkCoins()
        setTimeout(() => {
            checkColisionBlock = setInterval(() => {
                colisionBlock()
            }, 10)
        }, 500)
    }

}


//here check colosion with enemy 
function colisionEnemy() {
    const checkMario = mario.getBoundingClientRect();
    const CkechEnemy = enemy.getBoundingClientRect();

    if (CkechEnemy.left < checkMario.right &&
        CkechEnemy.right > checkMario.left &&
        CkechEnemy.top < checkMario.bottom &&
        CkechEnemy.bottom > checkMario.top) {

        // Verify if audio finalMission is true case no true stop the audio    
        if (isPlaying) {
            AudiOveringMission.pause()
        }

        clearTimeout(checkJump)
        AudioDeath.play()
        clearInterval(startTime)
        RemoveAllEvents()

        clearInterval(checkColisionEnemy)
        pointsTotal = 0
        lifeTotal--
        life.innerHTML = lifeTotal;
        clearInterval(checkMove);
        localStorage.setItem('lifeNow', lifeTotal)
        mario.style.backgroundImage = "url('./img/marioDead.gif')"
        colision = true

        if (lifeTotal === 0) {

            StartGame.pause()
            startTime.loop = false
            Swal.close();
            setTimeout(() => {
                GameOver.play()
            }, 4000);

            RemoveAllEvents()
            localStorage.removeItem('coinsNow')
            localStorage.removeItem('pointsNow')

            setTimeout(() => {
                document.getElementById('gameOver').style.display = 'block'
            }, 4000)
            programer.style.display = 'none'
            enemy.style.display = 'block'
            enemy.style.zIndex = '1'
            mario.style.zIndex = '2'
            menu.style.display = 'none'
            block.style.display = 'none'
            points.style.display = 'none'
            time.style.display = 'none'
            life.style.display = 'none'
            coin.style.display = 'none'
            CountTime.style.display = 'none'

        } else {
            Swal.fire({
                title: '<div>EITA! O MARIO SE LASCOU!<img style="width:100px; height:80px; position:relative;right:4px; top:8px" src="./img/smiling.png"></img></div>',
                html: `<div style="font-size:0.8rem">REINICIANDO O GAME EM: <br><br><span id="reestartGame" style="font-size:2.0rem"></span></div>`,
                showCancelButton: false,
                didOpen: () => {
                    const reestartGameSpan = document.getElementById('reestartGame');
                    let reestartGame = 5;

                    const intervalReestart = setInterval(() => {
                        reestartGame--;
                        reestartGameSpan.textContent = reestartGame;

                        Swal.update({
                            confirmButtonText: `${reestartGame}`,
                            confirmButtonColor: 'red'
                        });

                        if (reestartGame === 0) {
                            window.location.reload();
                        }
                    }, 1000);
                }
            });
        }


        // TimeOut for Remove the Music StartGame
        setInterval(() => {
            StartGame.loop = false;
            StartGame.pause();
        }, 10);

        setTimeout(() => {
            checkColisionEnemy = setInterval(() => {
                colisionEnemy();
            }, 10);
        }, 1500);
    }


}


function checkCoins() {
    if (coinsTotal === 20) {
        coinsTotal = 0
        coin.innerHTML = coinsTotal
        lifeTotal++
        localStorage.setItem('lifeNow', lifeTotal)
        life.innerHTML = lifeTotal
        AudioMoreLife.play()
    }
}

//verify if time over, if over set time for zero
function verifyEndTime() {
    if (CountTime === 60) {


        AudiOveringTime.play()

    } else if (CountTime === 59) {

        StartGame.pause()
        setTimeout(() => {

            AudiOveringMission.play()
        }, 300)

        let isRed = true;
        changeColorTimer = setInterval(() => {

            if (isRed) {
                time.style.color = 'red';
            } else {
                time.style.color = '#ffdf73';
            }

            isRed = !isRed;

        }, 1000);

    } else if (CountTime === 0) {
        clearInterval(startTime)
        AudioDeath.play()
        mario.style.backgroundImage = "url('./img/marioDead.gif')"
        time.style.display = 'none'
        AudiOveringMission.pause()

        GameOver.play()
        document.getElementById('gameOver').style.display = 'block'
        programer.style.display = 'none'

        RemoveAllEvents()
        clearInterval(checkColisionEnemy)

        enemy.style.display = 'block'
        enemy.style.zIndex = '1'
        mario.style.zIndex = '2'
        menu.style.display = 'none'
        block.style.display = 'none'
        points.style.display = 'none'
        life.style.display = 'none'
        coin.style.display = 'none'
        CountTime.style.display = 'none'
    }
}

function RemoveAllEvents() {
    document.removeEventListener('keydown', pressKey)
    document.removeEventListener('keyup', nopressKey)

}

//reestart the game when click in Button Jogar Novamente
BtnPlayAgain.addEventListener('click', () => {
    window.location.reload()

})

//out of game and return for site of Mario

BtnOutGame.addEventListener('click', () => {
    window.location.href = '../index.html'
})

//call the functions
document.addEventListener("keydown", pressKey)
document.addEventListener("keyup", nopressKey)

checkMove = setInterval(() => {
    refreshMove()
}, 50)

checkColisionEnemy = setInterval(() => {
    colisionEnemy()
}, 10)

checkColisionBlock = setInterval(() => {
    colisionBlock()
}, 10)

//start time
const startTime = setInterval(() => {
    CountTime--
    time.innerHTML = CountTime
    verifyEndTime()
}, 1000)


// here I verify if the game was open for the first time, if no here we save in localstorage
let btnOkInstructions = document.getElementById('btnOkInstructions')

btnOkInstructions.addEventListener('click', function () {
    localStorage.setItem('firstOpen', 'false')
    howPlay.style.display = 'none'
    StartGame.play()
})

setInterval(() => {
    verifyFirstGameOpen()
}, 10)

function verifyFirstGameOpen() {
    let firstOpenGame = localStorage.getItem('firstOpen')
    if (firstOpenGame === 'false') {
        howPlay.style.display = 'none'
        enemy.style.display = 'block'

    } else {

        howPlay.style.display = 'flex'
        CountTime = 200
        time.innerHTML = CountTime
        enemy.style.display = 'none'
        StartGame.pause()

    }
}


function getLinkedin() {

    let urlLinkedin = 'https://www.linkedin.com/in/sidney-henrique'
    let question = 'Voce Será Redirecionado Para o Meu Linkedin'
    if (question) {
        Swal.fire({
            title: '<div style="font-size:28px">Deseja sair do game pra dar uma moral no meu Linkedin?</div>',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Quero Sim",
            denyButtonText: `Daqui a Pouco`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire(({
                    title: '<div style="font-size:32px">VALEU DEMAIS</div>',
                    html: '<div style="font-size:30px">Abrindo Linkedin...</div>',
                    icon: 'success'
                }))

                setTimeout(() => {
                    window.open(urlLinkedin, '_blank')
                    Swal.close()
                }, 2500)
            } else if (result.isDenied) {

            }
        });

    }


}

function onloadGame() {
    StartGame.play()
}
