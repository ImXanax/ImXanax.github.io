const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.7;

const bg = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "/Games/KO/asset/background.png",
});

const shop = new Sprite({
  position: {
    x: 600,
    y: 128,
  },
  imageSrc: "/Games/KO/asset/shop.png",
  scale: 2.75,
  frame: 6,
});

const player = new Players({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "purple",
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: "/Games/KO/asset/samurai/Idle.png",
  frame: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157,
  },
  sprites: {
    idle: {
      imageSrc: "/Games/KO/asset/samurai/Idle.png",
      frame: 8,
    },
    run: {
      imageSrc: "/Games/KO/asset/samurai/Run.png",
      frame: 8,
    },
    jump: {
      imageSrc: "/Games/KO/asset/samurai/Jump.png",
      frame: 2,
    },
    fall: {
      imageSrc: "/Games/KO/asset/samurai/Fall.png",
      frame: 2,
    },
    attack1: {
      imageSrc: "/Games/KO/asset/samurai/Attack1.png",
      frame: 6,
    },
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50,
    },
    height: 50,
    width: 150,
  },
});

const enemy = new Players({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "red",
  offset: {
    x: -50,
    y: 0,
  },
  imageSrc: "/Games/KO/asset/kenji/Idle.png",
  frame: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167,
  },
  sprites: {
    idle: {
      imageSrc: "/Games/KO/asset/kenji/Idle.png",
      frame: 4,
    },
    run: {
      imageSrc: "/Games/KO/asset/kenji/Run.png",
      frame: 8,
    },
    jump: {
      imageSrc: "/Games/KO/asset/kenji/Jump.png",
      frame: 2,
    },
    fall: {
      imageSrc: "/Games/KO/asset/kenji/Fall.png",
      frame: 2,
    },
    attack1: {
      imageSrc: "/Games/KO/asset/kenji/Attack1.png",
      frame: 4,
    },
  },
  attackBox: {
    offset: {
      x: -165,
      y: 50,
    },
    height: 50,
    width: 165,
  },
});

const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

countDown();

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  bg.update();
  shop.update();
  player.update();
  enemy.update();

  //default velocity
  player.velocity.x = 0;
  enemy.velocity.x = 0;

  /* player movement */
  if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
    player.switchSprite("run");
  } else if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
    player.switchSprite("run");
  } else {
    player.switchSprite("idle");
  }
  // player jumping
  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  }

  /* enemy movement */
  if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
    enemy.switchSprite("run");
  } else if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
    enemy.switchSprite("run");
  } else {
    enemy.switchSprite("idle");
  }
  //enemy jumping
  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall");
  }

  //collision
  if (
    checkCollision({
      r1: player,
      r2: enemy,
    }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    player.isAttacking = false;
    enemy.health -= 20;
    document.querySelector("#enemyHealth").style.width = enemy.health + "%";
  }
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false;
  }

  if (
    checkCollision({
      r1: enemy,
      r2: player,
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    enemy.isAttacking = false;
    player.health -= 20;
    document.querySelector("#playerHealth").style.width = player.health + "%";
  }
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false;
  }

  if (enemy.health <= 0 || enemy.health <= 0) {
    resultsDisplay({ player, enemy, timerId });
  }
}

animate();

//controllers
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    //player keys
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;
    case "w":
      player.velocity.y = -20;
      break;
    case " ":
      player.attack();
      break;

    //enemy keys
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      enemy.velocity.y = -20;
      break;
    case "0":
      enemy.attack();
      break;
  }
});
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    //player keys
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;

    //enemy keys
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});
