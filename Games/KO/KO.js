const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const bgAudio = new Audio("asset/audio/AncestorSpirit.mp3");
const slashAudio = new Audio("asset/audio/slash.wav");
const sound = document.getElementById('audio').src = "/Games/KO/asset/soundon.png"


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
    x: 250,
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
    x: 210,
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
    takeHit: {
      imageSrc: "/Games/KO/asset/samurai/Take Hit - white silhouette.png",
      frame: 4,
    },
    death: {
      imageSrc: "/Games/KO/asset/samurai/Death.png",
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
    x: 700,
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
    takeHit: {
      imageSrc: "/Games/KO/asset/kenji/Take hit.png",
      frame: 3,
    },
    death: {
      imageSrc: "/Games/KO/asset/kenji/Death.png",
      frame: 7,
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

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  bg.update();
  shop.update();
  c.fillStyle = "rgba(255,255,255,0.15)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  //default velocity
  player.velocity.x = 0;
  enemy.velocity.x = 0;

  /* player movement */
  if (keys.d.pressed && player.lastKey === "d") {
    // console.log(player.position.x);
    // console.log(canvas.width);
    if (player.position.x <= canvas.width - 75) {
      player.velocity.x = 5;
      player.switchSprite("run");
    }
  } else if (keys.a.pressed && player.lastKey === "a") {
    if (player.position.x >= 10) {
      player.velocity.x = -5;
      player.switchSprite("run");
    }
  } else {
    player.switchSprite("idle");
  }
  // player jumping
  if (player.velocity.y < 0) {
    player.isJumping = true;
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.isJumping = true;
    player.switchSprite("fall");
  } else if (player.velocity.y === 0) {
    player.isJumping = false;
  }

  /* enemy movement */
  if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    if (enemy.position.x <= canvas.width - 75) {
      enemy.velocity.x = 5;
      enemy.switchSprite("run");
    }
  } else if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    if (enemy.position.x >= 10) {
      enemy.velocity.x = -5;
      enemy.switchSprite("run");
    }
  } else {
    enemy.switchSprite("idle");
  }
  //enemy jumping
  if (enemy.velocity.y < 0) {
    enemy.isJumping = true;
    enemy.switchSprite("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.isJumping = true;
    enemy.switchSprite("fall");
  } else if (enemy.velocity.y === 0) {
    enemy.isJumping = false;
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
    enemy.takeHit('e');
    player.isAttacking = false;
    gsap.to("#enemyHealth", {
      width: enemy.health + "%",
    });
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
    player.takeHit('p');
    enemy.isAttacking = false;
    gsap.to("#playerHealth", {
      width: player.health + "%",
    });
  }
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false;
  }

  if (player.health <= 0 || enemy.health <= 0) {
    resultsDisplay({ player, enemy, timerId });
  }
}

//controllers
window.addEventListener("keydown", (e) => {
  if (!player.dead) {
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
        if (!player.isJumping) {
          player.velocity.y = -20;
        } else return;
        break;
      case " ":
        player.attack();
        break;
    }
  }
  if (!enemy.dead) {
    switch (e.key) {
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
        if (!enemy.isJumping) {
          enemy.velocity.y = -20;
        } else return;
        break;
      case "0":
        enemy.attack();
        break;
    }
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

function audio() {
  bgAudio.volume = 0.8;
  bgAudio.play();
}

function soundSetting(e) {
  if(e.src.endsWith('soundon.png')){
    e.src = "/Games/KO/asset/soundoff.png"
    bgAudio.muted = true
  }else if(e.src.endsWith('soundoff.png')){
    e.src = "/Games/KO/asset/soundon.png"
    bgAudio.muted = false
  }
}

function start() {
  countDown();
  animate();
  document.querySelector("#txt").textContent = "";
  document.querySelector(".health-bar").style.display = "flex";
  bgAudio.addEventListener("canplaythrough", audio());
  document.querySelector("#wrapper").style.backgroundImage = "none";
  document.body.style.backgroundColor = "#000000";
}
