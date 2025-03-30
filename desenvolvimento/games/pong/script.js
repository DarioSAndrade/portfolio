const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleHeight = 100, paddleWidth = 10;
let playerY = canvas.height / 2 - paddleHeight / 2;
let computerY = canvas.height / 2 - paddleHeight / 2;

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 8,
    speedX: 5,
    speedY: 5
};

let playerScore = 0;
let computerScore = 0;

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

function drawText(text, x, y, color) {
    ctx.fillStyle = color;
    ctx.font = "48px sans-serif";
    ctx.fillText(text, x, y);
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = -ball.speedX;
    ball.speedY = 5 * (Math.random() > 0.5 ? 1 : -1);
}

function update() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Rebate no topo e embaixo
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
    }

    // Rebate no jogador
    if (ball.x - ball.radius < paddleWidth && ball.y > playerY && ball.y < playerY + paddleHeight) {
        ball.speedX = -ball.speedX;
    }

    // Rebate no computador
    if (ball.x + ball.radius > canvas.width - paddleWidth &&
        ball.y > computerY && ball.y < computerY + paddleHeight) {
        ball.speedX = -ball.speedX;
    }

    // Pontuação
    if (ball.x - ball.radius < 0) {
        computerScore++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        playerScore++;
        resetBall();
    }

    // IA simples do computador
    const targetY = ball.y - paddleHeight / 2;
    computerY += (targetY - computerY) * 0.05;
}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, "#5f3dc4");

    drawRect(0, playerY, paddleWidth, paddleHeight, "white");
    drawRect(canvas.width - paddleWidth, computerY, paddleWidth, paddleHeight, "white");

    drawCircle(ball.x, ball.y, ball.radius, "white");

    drawText(playerScore, canvas.width / 4, 50, "white");
    drawText(computerScore, 3 * canvas.width / 4, 50, "white");
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    playerY = e.clientY - rect.top - paddleHeight / 2;
});

gameLoop();
