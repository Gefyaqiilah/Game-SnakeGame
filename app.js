document.addEventListener("DOMContentLoaded", () => {
    const allBox = document.querySelectorAll('.board div');
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('.btn');
    const width = 20;

    let currentSnake = [2, 1, 0];
    let appleIndex = 0; // berisi perhitungan random lokasi apple

    let xDirection = 1;
    let score = 0;
    let interval = 0; //variabel untuk menampung setInterval
    let speed = 0.9;
    let intervalTime = 0;


    function startGame() {
        //fungsi restart game
        currentSnake.forEach((index) => allBox[index].classList.remove('snake'));
        allBox[appleIndex].classList.remove('apple');
        clearInterval(interval)
        score = 0;
        scoreDisplay.innerHTML = `Your Score : ${score}`;

        //fungsi start game
        randomApple();
        xDirection = 1;
        intervalTime = 300;
        currentSnake = [2, 1, 0]
        currentSnake.forEach(value => allBox[value].classList.add('snake'));
        interval = setInterval(snakeMove, intervalTime); // setiap waktu 300 si cacing akan terus dipaksa bergerak

    }

    const snakeMove = () => {
        //if touch the wall 
        if ((currentSnake[0] % width === width - 1 && xDirection === 1) || //rightwall
            (currentSnake[0] % width === 0 && xDirection === -1) || //leftwall
            (currentSnake[0] + width >= (width * width) && xDirection === +width) || //bottomwall
            (currentSnake[0] - width < 0 && xDirection === -width) ||
            allBox[currentSnake[0] + xDirection].classList.contains('snake')) {
            alert(`Your HighScore : ${score}`);
            scoreDisplay.innerHTML = "Game Over &#x1F61F;"
            return clearInterval(interval);
        }

        //delete tail, unshift new array element
        const tail = currentSnake.pop();
        allBox[tail].classList.remove('snake');
        currentSnake.unshift(currentSnake[0] + xDirection);

        //snake eating apple
        if (allBox[currentSnake[0]].classList.contains('apple')) {
            allBox[currentSnake[0]].classList.remove('apple');
            allBox[tail].classList.add('snake');
            currentSnake.push(tail);

            randomApple()
            score++
            scoreDisplay.innerHTML = `Your Score : ${score}`;
            clearInterval(interval)
            intervalTime *= speed;
            interval = setInterval(snakeMove, intervalTime);
        }
        allBox[currentSnake[0]].classList.add('snake');

    }

    const randomApple = () => {
        do {
            appleIndex = Math.floor(Math.random() * allBox.length);
        } while (allBox[appleIndex].classList.contains('snake')) {
            allBox[appleIndex].classList.add('apple');
        }
    }

    const control = (code) => {
        if (code.keyCode === 39) { //kanan
            xDirection = 1;
        } else if (code.keyCode === 40) { //bawah
            xDirection = +width; //+width = 10;
        } else if (code.keyCode === 37) { //kiri
            xDirection = -1;
        } else if (code.keyCode === 38) { //atas
            xDirection = -width; //-width = -10;
        }
    }
    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame);
})