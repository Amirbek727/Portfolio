// game.js
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const player = {
        x: 50,
        y: 50,
        width: 30,
        height: 30,
        velocityX: 0,
        velocityY: 0,
        speed: 5,
        color: 'red'
    };

    const coins = [
        { x: 200, y: 200, width: 20, height: 20, color: 'gold' },
        { x: 400, y: 300, width: 20, height: 20, color: 'gold' },
        { x: 600, y: 100, width: 20, height: 20, color: 'gold' }
    ];

    let score = 0;

    function drawRect(x, y, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }

    function updatePlayer() {
        player.x += player.velocityX;
        player.y += player.velocityY;

        // Boundary checking
        if (player.x < 0) player.x = 0;
        if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
        if (player.y < 0) player.y = 0;
        if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;

        drawRect(player.x, player.y, player.width, player.height, player.color);
    }

    function updateCoins() {
        for (let i = 0; i < coins.length; i++) {
            let coin = coins[i];
            drawRect(coin.x, coin.y, coin.width, coin.height, coin.color);

            // Check for collision with player
            if (player.x < coin.x + coin.width &&
                player.x + player.width > coin.x &&
                player.y < coin.y + coin.height &&
                player.y + player.height > coin.y) {
                coins.splice(i, 1); // Remove the coin
                score++;
                i--; // Adjust the index after removing the coin
            }
        }
    }

    function drawScore() {
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, 10, 20);
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updatePlayer();
        updateCoins();
        drawScore();
        requestAnimationFrame(gameLoop);
    }

    function handleKeydown(event) {
        if (event.key === 'ArrowRight') player.velocityX = player.speed;
        if (event.key === 'ArrowLeft') player.velocityX = -player.speed;
        if (event.key === 'ArrowUp') player.velocityY = -player.speed;
        if (event.key === 'ArrowDown') player.velocityY = player.speed;
    }

    function handleKeyup(event) {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') player.velocityX = 0;
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') player.velocityY = 0;
    }

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);

    gameLoop();
});
