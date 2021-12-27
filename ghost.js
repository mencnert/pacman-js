function ghost(x, y) {
    this.centerX = x
    this.centerY = y
    this.startingCenterX = x
    this.startingCenterY = y
    this.SPEED = 3;
    this.speedX = 0
    this.speedY = 0
    this.direction = direction.NO
    this.rect = new rect(x, y, 30, 30)

    this.update = function (pacmanX, pacmanY) {
        this.centerX += this.speedX;
        this.centerY += this.speedY;

        if (this.centerY + this.speedY >= 451) {
            this.centerY = 450;
            this.chooseDirection(pacmanX, pacmanY);
        } else if (this.centerY + this.speedY <= -1) {
            this.centerY = 0;
            this.chooseDirection(pacmanX, pacmanY);
        } else if (this.centerX + this.speedX <= -1) {
            this.centerX = 0;
            this.chooseDirection(pacmanX, pacmanY);
        } else if (this.centerX + this.speedX >= 691) {
            this.centerX = 690;
            this.chooseDirection(pacmanX, pacmanY);
        }

        this.updateRect();// update position of rectangle
    }

    this.draw = function () {
        game.ctx.drawImage(game.images.getGhost(), this.centerX, this.centerY)
    }

    this.ghostCollision = function (ghosts, blocks, ghostIndex, pacmanX, pacmanY) {
        for (let i = 0; i < ghosts.length; i++) {
            const gh = ghosts[i]
            if (i != ghostIndex) {
                if (this.rect.intersect(gh.rect)) {
                    this.setXYAfterGhostCollision();
                    this.chooseDirection(pacmanX, pacmanY);
                }
            }
        }
        this.blockCollision(blocks, pacmanX, pacmanY);
    }

    this.blockCollision = function (blocks, pacmanX, pacmanY) {
        for (let i = 0; i < blocks.length; i++) {
            const b = blocks[i]
            if (this.rect.intersect(b.rect)) {
                this.chooseDirectionAfterBlockCollision(pacmanX, pacmanY);
            }
        }
    }

    this.setXYAfterGhostCollision = function () {
        switch (this.direction) {
            case direction.UP:
                this.centerY += 3;
                break;
            case direction.DOWN:
                this.centerY -= 3;
                break;
            case direction.LEFT:
                this.centerX += 3;
                break;
            case direction.RIGHT:
                this.centerX -= 3;
                break;
        }
        this.updateRect();
    }

    this.chooseDirection = function (pacmanX, pacmanY) {
        this.stop();

        switch (this.direction) {
            case direction.UP:
            case direction.DOWN:
                if (pacmanX < this.centerX) {
                    this.direction = direction.LEFT
                    this.moveLeft();
                } else {
                    this.direction = direction.RIGHT
                    this.moveRight();
                }
                break;
            case direction.LEFT:
            case direction.RIGHT:
                if (pacmanY < this.centerY) {
                    this.direction = direction.UP
                    this.moveUp();
                } else {
                    this.direction = direction.DOWN
                    this.moveDown();
                }
                break;
        }
    }

    this.chooseDirectionAfterBlockCollision = function (pacmanX, pacmanY) {
        switch (this.direction) {
            case direction.UP:
                this.centerY += 3;
                break;
            case direction.DOWN:
                this.centerY -= 3;
                break;
            case direction.LEFT:
                this.centerX += 3;
                break;
            case direction.RIGHT:
                this.centerX -= 3;
                break;
        }

        this.updateRect();
        this.chooseDirection(pacmanX, pacmanY);
    }

    this.chooseStartingDirection = function (pacmanX, pacmanY) {
        if (pacmanY == this.centerY) {// up
            this.direction = direction.UP
        } else if (pacmanX >= this.centerX) {// right
            this.direction = direction.RIGHT
        } else if (pacmanX < this.centerX) {// left
            this.direction = direction.LEFT
        }
    }

    this.moveRight = function () {
        this.speedX = this.SPEED;
    }

    this.moveLeft = function () {
        this.speedX = -1 * this.SPEED;
    }

    this.moveUp = function () {
        this.speedY = -1 * this.SPEED;
    }

    this.moveDown = function () {
        this.speedY = this.SPEED;
    }

    this.stop = function () {
        this.speedX = 0;
        this.speedY = 0;
    }

    this.updateRect = function () {
        this.rect.setPosition(this.centerX, this.centerY);
    }

    this.setGhostToStartingPosition = function () {
        this.centerX = this.startingCenterX;
        this.centerY = this.startingCenterY;
        this.stop();
        this.direction = direction.NO
    }
}