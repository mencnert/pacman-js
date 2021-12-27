var game = {
  canvas: document.createElement('canvas'),
  ctx: null,
  images: null,
  pacman: null,
  blocks: [],
  ghosts: [],
  points: [],
  level: 0,
  pause: false,
  startLives: 4,
  lives: 0,
  score: 0,

  setup: function () {
    this.lives = this.startLives
    this.images = new images()
    this.images.loadImages()
    //canvas setup
    this.canvas.width = 720;
    this.canvas.height = 510;
    this.canvas.style.backgroundColor = "black";
    this.ctx = this.canvas.getContext('2d');
    document.getElementById('game').appendChild(this.canvas);
    setInterval(this.run, 25);
  },

  run: function () {
    if (game.lives > 0) {
      if (game.points.length == 0) {
        game.levelUp()
      }

      if (!game.pause) {
        game.update()
      }
    }
    game.draw();
  },
  levelUp: function () {
    this.loadMap(this.level % 10)
    this.level++
  },

  clearMap: function () {
    this.ctx.clearRect(0, 0, 720, 510)
  },

  update: function () {
    this.pacman.update()
    for (let i = 0; i < this.ghosts.length; i++) {
      const gh = this.ghosts[i]
      gh.update(this.pacman.centerX, this.pacman.centerY)

      gh.ghostCollision(this.ghosts, this.blocks, i, this.pacman.centerX, this.pacman.centerY);
      // pacman's death
      if (this.pacman.rect.intersect(gh.rect)) {
        this.reloadLevel();
      }
    }
    this.pacmanBlockCollision();
    this.pacmanPointCollision()
  },

  draw: function () {
    this.clearMap();

    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].draw()
    }

    for (let i = 0; i < this.points.length; i++) {
      this.points[i].draw()
    }
    this.pacman.draw()

    for (let i = 0; i < this.ghosts.length; i++) {
      this.ghosts[i].draw()
    }

    this.ctx.fillStyle = "#b3b3b3";
    this.ctx.fillRect(0, 480, 720, 30)
    for (let i = 0; i < this.lives; i++) {
      this.ctx.drawImage(this.images.getDeadPacman(), 600 + (i * 30), 484)
    }

    this.ctx.font = "25px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Level: " + this.level + " Score: " + this.score, 20, 505);

    if (this.lives == 0) {
      pause = false;
      this.ctx.drawImage(this.images.getGameOver(), 0, 0)
    }

    if (this.pause) {
      this.ctx.drawImage(this.images.getPaused(), 0, 0)
    }
  },
  pacmanPointCollision: function () {
    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i]
      if (this.pacman.centerX == p.x && this.pacman.centerY == p.y) {
        this.points.splice(i, 1)
        this.score += 1;
        break
      }
    }
  },
  pacmanBlockCollision: function () {
    game.pacman.updateDirection(this.blocks);
    game.pacman.blockCollision(this.blocks);
  },
  loadMap: function (level) {
    this.points = []
    this.ghosts = []
    this.blocks = []
    this.pacman = null
    let data = maps[level]
    for (var i = 0; i < 16; i++) {
      for (var j = 0; j < 24; j++) {
        switch (data[i][j]) {
          case "P":
            this.pacman = new pacman(j * 30, i * 30)
            break;
          case "G":
            this.points.push(new point(j * 30, i * 30))
            this.ghosts.push(new ghost(j * 30, i * 30))
            break;
          case "B":
            this.blocks.push(new block(j * 30, i * 30))
            break;
          case ".":
            this.points.push(new point(j * 30, i * 30))
            break;
        }
      }
    }

    for (let i = 0; i < this.ghosts.length; i++) {
      const gh = this.ghosts[i]
      gh.chooseStartingDirection(this.pacman.centerX, this.pacman.centerY);
    }

    let pacmanRect = new rect(0, 0, 30, 30);
    // searching direction where pacman can go
    // only for start
    for (let i = 0; i < this.blocks.length; i++) {
      const block = this.blocks[i]
      // up
      pacmanRect.setPosition(this.pacman.centerX, this.pacman.centerY - 30);
      if (pacmanRect.intersect(block.rect)) {
        this.pacman.canUp = false
      }
      // down
      pacmanRect.setPosition(this.pacman.centerX, this.pacman.centerY + 30);
      if (pacmanRect.intersect(block.rect)) {
        this.pacman.canDown = false
      }
      // left
      pacmanRect.setPosition(this.pacman.centerX - 30, this.pacman.centerY);
      if (pacmanRect.intersect(block.rect)) {
        this.pacman.canLeft = false
      }
      // right
      pacmanRect.setPosition(this.pacman.centerX + 30, this.pacman.centerY);
      if (pacmanRect.intersect(block.rect)) {
        this.pacman.canRight = false
      }
    }
  },
  reloadLevel: function () {// when pacman is dead
    this.lives--;
    if (this.lives != 0) {
      this.sleep(500)
      this.pacman.setPacmanToStartingPosition();
      for (let i = 0; i < this.ghosts.length; i++) {
        const gh = this.ghosts[i]
        gh.setGhostToStartingPosition();
        gh.chooseStartingDirection(this.pacman.centerX, this.pacman.centerY);
      }
    }
  },
  restartGame: function () {
    this.level = 0;
    this.score = 0;
    this.lives = this.startLives;
    this.pause = false;
    this.points = []
  },
  sleep: function (milliseconds) {
    var currentTime = new Date().getTime();
    while (currentTime + milliseconds >= new Date().getTime()) { }
  },
}

$(document).keydown(function (e) {
  console.log(e.which)
  if (game.pacman.direction == direction.NO) {// start game
    switch (e.which) {
      case 37: // left
        if (game.pacman.canLeft) {
          game.pacman.direction = direction.LEFT
          game.pacman.moveLeft();
        }
        break;
      case 38: // up
        if (game.pacman.canUp) {
          game.pacman.direction = direction.UP;
          game.pacman.moveUp();
        }
        break;
      case 39: // right
        if (game.pacman.canRight) {
          game.pacman.direction = direction.RIGHT
          game.pacman.moveRight();
        }
        break;
      case 40: // down
        if (game.pacman.canDown) {
          game.pacman.direction = direction.DOWN
          game.pacman.moveDown();
        }
        break;
      case 80: // p
        if (game.lives != 0) {
          game.pause = !game.pause
        }
        break;
      case 82: // r
        game.restartGame()
        break;
      // case 74: // j
      //   game.points = []
      //   break;
      // case 76: // l
      //   game.lives = game.startLives
      //   break;
    }

    for (let i = 0; i < game.ghosts.length; i++) {
      const gh = game.ghosts[i]
      switch (gh.direction) {
        case direction.UP:
          gh.moveUp();
          break;
        case direction.DOWN:
          gh.moveDown();
          break;
        case direction.LEFT:
          gh.moveLeft();
          break;
        case direction.RIGHT:
          gh.moveRight();
          break;
      }
    }
  } else {
    switch (e.which) {
      case 37: // left
        game.pacman.changeDirection = direction.LEFT
        break;
      case 38: // up
        game.pacman.changeDirection = direction.UP
        break;
      case 39: // right
        game.pacman.changeDirection = direction.RIGHT
        break;
      case 40: // down
        game.pacman.changeDirection = direction.DOWN
        break;
      case 80: // p
        if (game.lives != 0) {
          game.pause = !game.pause
        }
        break;
      case 82: // r
        game.restartGame()
        break;
      // case 74: // j
      //   game.points = []
      //   break;
      // case 76: // l
      //   game.lives = game.startLives
      //   break;
    }
  }
});
