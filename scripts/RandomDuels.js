alert('STARTING GAME: Random Duels');

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 700;

const player = {
  x: canvas.width / 2,
  y: canvas.height - 30 - canvas.height / 28,
  width: canvas.width / 32,
  height: canvas.height / 28,
  color: '#00FF00',
  speed: 2,
  isMovingLeft: false,
  isMovingRight: false,
  maxBullets: 6
};

const enemy = {
  x: canvas.width / 2,
  y: 30,
  width: canvas.width / 32,
  height: canvas.height / 28,
  color: '#FF0000',
  speed: 2,
  maxBullets: 6
};

const playerBullets = [];
const enemyBullets = [];

let isGameOver = false;

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawEnemy() {
  ctx.fillStyle = enemy.color;
  ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

function movePlayer() {
  if (player.isMovingLeft && player.x > 0) {
    player.x -= player.speed;
  }
  if (player.isMovingRight && player.x + player.width < canvas.width) {
    player.x += player.speed;
  }
}

function moveEnemy() {
  if (enemy.x + enemy.width > canvas.width || enemy.x < 0) {
    enemy.speed *= -1;
  }
  if (Math.random() > 0.99) {
    enemy.speed *= -1;
  }
  if (enemy.x >= player.x - 100 && enemy.x <= player.x + player.width + 100 && Math.random() < 0.01) {
    shootEnemy();
  }
  enemy.x += enemy.speed;
}

function drawBullets() {
  playerBullets.forEach(bullet => {
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  });
  enemyBullets.forEach(bullet => {
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  });
}

function moveBullets() {
  playerBullets.forEach(bullet => {
    bullet.y -= bullet.speed;
  });
  playerBullets.filter(bullet => bullet.y > 0);
  enemyBullets.forEach(bullet => {
    bullet.y += bullet.speed;
  });
  enemyBullets.filter(bullet => bullet.y < canvas.height);
}

function shootPlayer() {
  if (playerBullets.length < player.maxBullets) {
    const bullet = {
      x: player.x + player.width / 2 - 2.5,
      y: player.y,
      width: 5,
      height: 10,
      speed: 5
    };
    playerBullets.push(bullet);
  }
}

function shootEnemy() {
  if (enemyBullets.length < enemy.maxBullets) {
    const bullet = {
      x: enemy.x + enemy.width / 2 - 2.5,
      y: enemy.y + enemy.height,
      width: 5,
      height: 10,
      speed: 5
    };
    enemyBullets.push(bullet);
  }
}

function checkCollision() {
  playerBullets.forEach((bullet, index) => {
    if (
      bullet.x + bullet.width < enemy.x + enemy.width &&
      bullet.x > enemy.x &&
      bullet.y + bullet.width < enemy.y + enemy.height &&
      bullet.y > enemy.y
    ) {
      isGameOver = true;
      alert('Congratulations! You Win!');
    }
  });

  enemyBullets.forEach((bullet, index) => {
    if (
      bullet.x + bullet.width < player.x + player.width &&
      bullet.x > player.x &&
      bullet.y + bullet.height < player.y + player.height &&
      bullet.y > player.y
    ) {
      isGameOver = true;
      alert('Game Over - You Lose!');
    }
  });
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawEnemy();
  movePlayer();
  moveEnemy();
  drawBullets();
  moveBullets();
  checkCollision();

  if (playerBullets.length === player.maxBullets && enemyBullets.length === enemy.maxBullets) {
    setTimeout(() => {
      isGameOver = true;
    }, 2000);
  }

  if (isGameOver) {
    document.getElementById('restartButton').style.display = 'block';
  }

  if (!isGameOver) {
    requestAnimationFrame(update);
    document.getElementById('restartButton').style.display = 'none';
  }
}

function keyDownHandler(event) {
  if (event.key === 'ArrowLeft' || event.key === 'a'  || event.key === 'A') {
    player.isMovingLeft = true;
  }
  if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
    player.isMovingRight = true;
  }
  if (event.key === ' ') {
    shootPlayer();
  }
}

function keyUpHandler(event) {
  if (event.key === 'ArrowLeft' || event.key === 'a'  || event.key === 'A') {
    player.isMovingLeft = false;
  }
  if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
    player.isMovingRight = false;
  }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

update();

function restartGame() {
  player.x = canvas.width / 2;
  player.isMovingLeft = false;
  player.isMovingRight = false;
  enemy.x = canvas.width / 2;
  enemy.isShooting = false;
  playerBullets.length = 0;
  enemyBullets.length = 0;
  isGameOver = false;

  update();
}
