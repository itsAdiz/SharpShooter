let userScore = 0;
let sfx = new Audio('/assets/sounds/btnClick.mp3');
let scoreUpdate = document.querySelector('#score');
let se = document.querySelector('.gameScreen');
let go = document.querySelector('.gameOverMsg');
let btnElement = document.querySelector('#btn');
let soundStatus = document.querySelector(".sound");
let displayTimer = document.querySelector(".timer");
let isPause = true;
let timerCounter = 15;
let levelDifficulty = 1000;
let pauseTime = 0;
let topScore = 0;
let timer;
// topScore
const setToScore = () => {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("topScore", topScore);
    
      } else {
        document.querySelector(".topScore").innerHTML = "Error";
      }
}
const getToScore = () => {
    if (typeof (Storage) !== "undefined") {
        if (localStorage.getItem("topScore") !== null) {
            topScore = localStorage.getItem("topScore");
            document.querySelector(".topScore").innerHTML = `Top Score : ${topScore}`;
        }
    } else {
        document.querySelector(".topScore").innerHTML = "Error";
    }
}
getToScore();

// timeSlection
const getUserTimeChoice = () => {
    
    let ut = document.querySelector("#gameTime");
        timerCounter = ut.value;
    }
// levelDifficulty
const getUserLevelChoice = () => {
    
    let lc = document.querySelector("#gameDif");
       
        levelDifficulty = lc.value;
}
   
    // timerPopaat
const sTimer = () => {
    scoreUpdate.innerHTML = userScore;
    timer = setInterval(() => {
        if (timerCounter > 0) {
            timerCounter--;
            displayTimer.innerHTML = timerCounter;
        } else {
            clearInterval(timer);
            pauseGame()
            go.innerHTML = `Your score is ${userScore} 👀 `;
            if (userScore > topScore) { 
                topScore = userScore;
                document.querySelector(".topScore").innerHTML = `Top Score : ${topScore}`;
                setToScore();
            }
            userScore = 0;
        }
    }, 1000);
}

const adizObjects = () => {

    if (!isPause ) {

        for (let i = 0; i < 1; i++) {
            let adiz = document.createElement('span');
            adiz.setAttribute('id', `b${i}`)
            adiz.innerHTML = "🤪";
            adiz.setAttribute('onclick', 'rmObjects(event)')
            adiz.style.left = `${Math.floor(Math.random() * 85)}%`;
            adiz.style.top = `${Math.floor(Math.random() * 90)}%`;
            se.appendChild(adiz)
            setTimeout(() => {
                if (adiz.parentNode) {
                    adiz.parentNode.removeChild(adiz);
                }
                console.log(spanRate)
                console.log(levelDifficulty)
            },levelDifficulty);
            
            
        }
        setTimeout(adizObjects, levelDifficulty);
        
    }
}

const rmObjects = (event) => {
    sfx.play();
    event.target.remove();
    userScore++;
    scoreUpdate.innerHTML = userScore;
}

const pauseGame = () => {
    
    sfx.play();
    isPause = true;
    btn.innerHTML = 'Start';
    btn.style.backgroundColor = 'green';
    btn.style.color = 'white';
    btn.setAttribute('onclick', 'resumeGame()');
    clearInterval(timer);
    document.querySelector("#gameTime").disabled = false;
    document.querySelector("#gameDif").disabled = false;
} 

    const resumeGame = () => {
    // samj ry o 😁
    if (timerCounter != 0) {
        go.innerHTML = "";
        sfx.play();
        isPause = false;
        btn.innerHTML = 'Pause';
        btn.style.backgroundColor = 'red';
        btn.style.color = 'white';
        btn.setAttribute('onclick', 'pauseGame()')
        sTimer();
        adizObjects();
        document.querySelector("#gameTime").disabled = true;
        document.querySelector("#gameDif").disabled = true;
        
    }
    else {
        timerCounter = 15;
    }
}
