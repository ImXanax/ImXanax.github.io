function checkCollision({ r1, r2 }) {
    return (
      r1.attackBox.position.x + r1.attackBox.width >= r2.position.x &&
      r1.attackBox.position.x <= r2.position.x + r2.width &&
      r1.attackBox.position.y + r1.attackBox.height >= r2.position.y &&
      r1.attackBox.position.y <= r2.position.y + r2.height
    );
  }
  
  function resultsDisplay({ player, enemy, timerId }) {
    clearTimeout(timerId);
    bgAudio.pause()
    document.querySelector("#result").style.display = "flex";
    if (player.health === enemy.health) {
      document.querySelector("#result").textContent = "DRAW";
    } else if (player.health > enemy.health) {
      document.querySelector("#result").textContent = "PLAYER 1 WINS";
    } else if (enemy.health > player.health) {
      document.querySelector("#result").textContent = "PLAYER 2 WINS";
    }
  }
  
  let timer = 70;
  let timerId;
  function countDown() {
    if (timer > 0) {
      timerId = setTimeout(countDown, 1000);
      timer--;
      document.querySelector("#t").textContent = timer;
    }
    if (timer === 0) {
      resultsDisplay({ player, enemy });
    }
  }