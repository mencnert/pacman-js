function images() {
    this.pacmanRight0 = new Image();
    this.pacmanRight1 = new Image();
    this.pacmanRight2 = new Image();
    this.pacmanRight3 = new Image();
    this.pacmanRight4 = new Image();
    this.pacmanLeft0 = new Image();
    this.pacmanLeft1 = new Image();
    this.pacmanLeft2 = new Image();
    this.pacmanLeft3 = new Image();
    this.pacmanLeft4 = new Image();
    this.pacmanUp0 = new Image();
    this.pacmanUp1 = new Image();
    this.pacmanUp2 = new Image();
    this.pacmanUp3 = new Image();
    this.pacmanUp4 = new Image();
    this.pacmanDown0 = new Image();
    this.pacmanDown1 = new Image();
    this.pacmanDown2 = new Image();
    this.pacmanDown3 = new Image();
    this.pacmanDown4 = new Image();
    this.deadPacman1 = new Image();
    this.deadPacman2 = new Image();
    this.block1 = new Image();
    this.block2 = new Image();
    this.block3 = new Image();
    this.block4 = new Image();
    this.point = new Image();
    this.ghost = new Image();
    this.gameOver = new Image();
    this.paused = new Image();

    this.loadImages = function () {
        this.pacmanRight0.src = "img/rightstop.png";
        this.pacmanRight1.src = "img/right1.png";
        this.pacmanRight2.src = "img/right2.png";
        this.pacmanRight3.src = "img/right3.png";
        this.pacmanRight4.src = "img/right4.png";
        this.pacmanLeft0.src = "img/leftstop.png";
        this.pacmanLeft1.src = "img/left1.png";
        this.pacmanLeft2.src = "img/left2.png";
        this.pacmanLeft3.src = "img/left3.png";
        this.pacmanLeft4.src = "img/left4.png";
        this.pacmanUp0.src = "img/upstop.png";
        this.pacmanUp1.src = "img/up1.png";
        this.pacmanUp2.src = "img/up2.png";
        this.pacmanUp3.src = "img/up3.png";
        this.pacmanUp4.src = "img/up4.png";
        this.pacmanDown0.src = "img/downstop.png";
        this.pacmanDown1.src = "img/down1.png";
        this.pacmanDown2.src = "img/down2.png";
        this.pacmanDown3.src = "img/down3.png";
        this.pacmanDown4.src = "img/down4.png";
        this.deadPacman1.src = "img/deadpacman.png";
        this.deadPacman2.src = "img/deadpacman2.png";
        this.block1.src = "img/block.png";
        this.block2.src = "img/block2.png";
        this.block3.src = "img/block3.png";
        this.block4.src = "img/block4.png";
        this.point.src = "img/point.png";
        this.ghost.src = "img/ghost.png";
        this.gameOver.src = "img/gameover.png";
        this.paused.src = "img/paused.png";
    }

    this.getPacman = function () {
        if (game.lives == 0) {
            return this.deadPacman1
        }
        switch (game.pacman.direction) {
            case direction.NO:
                return this.pacmanRight0
            case direction.UP:
                switch (game.pacman.picNumber) {
                    case 0:
                        return this.pacmanUp0
                    case 1:
                        return this.pacmanUp1
                    case 2:
                        return this.pacmanUp2
                    case 3:
                        return this.pacmanUp3
                    case 4:
                        return this.pacmanUp4
                }
            case direction.DOWN:
                switch (game.pacman.picNumber) {
                    case 0:
                        return this.pacmanDown0
                    case 1:
                        return this.pacmanDown1
                    case 2:
                        return this.pacmanDown2
                    case 3:
                        return this.pacmanDown3
                    case 4:
                        return this.pacmanDown4
                }
            case direction.RIGHT:
                switch (game.pacman.picNumber) {
                    case 0:
                        return this.pacmanRight0
                    case 1:
                        return this.pacmanRight1
                    case 2:
                        return this.pacmanRight2
                    case 3:
                        return this.pacmanRight3
                    case 4:
                        return this.pacmanRight4
                }
            case direction.LEFT:
                switch (game.pacman.picNumber) {
                    case 0:
                        return this.pacmanLeft0
                    case 1:
                        return this.pacmanLeft1
                    case 2:
                        return this.pacmanLeft2
                    case 3:
                        return this.pacmanLeft3
                    case 4:
                        return this.pacmanLeft4
                }
        }
    }

    this.getDeadPacman = function () {
        return this.deadPacman2
    }

    this.getBlock = function (level) {
        switch ((level - 1) % 10) {
            case 0:
            case 1:
            case 2:
                return this.block1
            case 3:
            case 4:
            case 5:
                return this.block2
            case 6:
            case 7:
                return this.block3
            case 8:
            case 9:
                return this.block4
        }
    }

    this.getPoint = function () {
        return this.point
    }

    this.getGhost = function () {
        return this.ghost
    }

    this.getGameOver = function () {
        return this.gameOver
    }

    this.getPaused = function () {
        return this.paused
    }
}
