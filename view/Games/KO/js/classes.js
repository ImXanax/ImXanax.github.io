class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    frame = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.frame = frame;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 6;
    this.offset = offset;
  }

  draw() {
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.frame),
      0,
      this.image.width / this.frame,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.frame) * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.frame - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }
  update() {
    this.draw();
    this.animateFrames();
  }
}

class Players extends Sprite {
  constructor({
    position,
    velocity,
    color,
    imageSrc,
    scale = 1,
    frame = 1,
    offset = { x: 0, y: 0 },
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined },
  }) {
    super({
      position,
      imageSrc,
      scale,
      frame,
      offset,
    });
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      height: attackBox.height,
      width: attackBox.width,
    };
    this.health = 100;
    this.color = color;
    this.isAttacking;
    this.isGrounded;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 6;
    this.sprites = sprites;
    this.dead = false;
    this.isJumping;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  update() {
    this.draw();
    if (!this.dead) {
      this.animateFrames();
    }

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    //hitbox
    //c.fillRect(this.attackBox.position.x , this.attackBox.position.y , this.attackBox.width , this.attackBox.height)

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    //checks if P/E's height is greater than canvas height
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.isGrounded = true;
      this.velocity.y = 0;
      this.position.y = 330;
    } //if not add gravity to the velocity
    else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.switchSprite("attack1");
    this.isAttacking = true;
  }
  takeHit(fighter) {
    //p1 more damage - p2 faster attack
    if (fighter === "p") {
      this.health -= 10;
    } else if (fighter === "e") {
      this.health -= 15;
    }
    console.log(fighter);
    if (this.health <= 0) {
      this.switchSprite("death");
    } else {
      this.switchSprite("takeHit");
    }
  }

  switchSprite(s) {
    //override when dead
    if (this.image === this.sprites.death.image) {
      if (this.framesCurrent === this.sprites.death.frame - 1) this.dead = true;
      return;
    }
    //override animations with attack
    if (
      this.image === this.sprites.attack1.image &&
      this.framesCurrent < this.sprites.attack1.frame - 1
    )
      return;
    //override when takeHit
    if (
      this.image === this.sprites.takeHit.image &&
      this.framesCurrent < this.sprites.takeHit.frame - 1
    )
      return;
    switch (s) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.frame = this.sprites.idle.frame;
          this.framesCurrent = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.frame = this.sprites.run.frame;
          this.framesCurrent = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.frame = this.sprites.jump.frame;
          this.framesCurrent = 0;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.frame = this.sprites.fall.frame;
          this.framesCurrent = 0;
        }
        break;
      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.frame = this.sprites.attack1.frame;
          slashAudio.play();
          this.framesCurrent = 0;
        }
        break;
      case "takeHit":
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image;
          this.frame = this.sprites.takeHit.frame;
          this.framesCurrent = 0;
        }
        break;
      case "death":
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.frame = this.sprites.death.frame;
          this.framesCurrent = 0;
        }
        break;
    }
  }
}