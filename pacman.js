function pacman(x, y) {
    this.centerX = x;
    this.centerY = y;
    this.startingCenterX = x;
    this.startingCenterY = y;
    this.SPEED = 3;
    this.speedX = 0;
    this.speedY = 0;
    this.direction = direction.NO;
    this.changeDirection = direction.NO;
    this.picNumber = 0;
    this.picSwitch = true;
    this.picSwitch2 = true;
    this.wait = false;
    this.rect = new rect(this.x + 9, this.y + 9, 12, 12);
    this.canUp = true;
    this.canLeft = true
    this.canRight = true
    this.canDown = true

    this.update = function () {
        this.centerX += this.speedX;
        this.centerY += this.speedY;

        if (this.centerY + this.speedY >= 451) {
            this.centerY = 450;
            this.stop();
        }

        if (this.centerY + this.speedY <= -1) {
            this.centerY = 0;
            this.stop();
        }

        if (this.centerX + this.speedX <= -1) {
            this.centerX = 0;
            this.stop();
        }

        if (this.centerX + this.speedX >= 691) {
            this.centerX = 690;
            this.stop();
        }

        this.updateRect();

        if (this.picSwitch2) {
            if (this.picSwitch) {
                this.picNumber++
                if (this.picNumber == 4) {
                    this.picSwitch = !this.picSwitch
                }
            } else {
                this.picNumber--
                if (this.picNumber == 0) {
                    this.picSwitch = !this.picSwitch
                }
            }
            if (this.speedX == 0 && this.speedY == 0) {
                this.picNumber = 0
                this.picSwitch = true
            }
        } else {
            this.picSwitch2 = !this.picSwitch2
        }
    }

    this.draw = function () {
        game.ctx.drawImage(game.images.getPacman(), this.centerX, this.centerY)
    }

    this.updateRect = function () {
        this.rect.setPosition(this.centerX + 9, this.centerY + 9);
    }

    this.stop = function () {
        this.speedX = 0;
        this.speedY = 0;
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

    this.setPacmanToStartingPosition = function () {
        this.centerX = this.startingCenterX;
        this.centerY = this.startingCenterY;
        this.stop();
        this.direction = direction.NO
        this.changeDirection = direction.NO
    }

    this.updateDirection = function (blocks) {
        if (this.direction != this.changeDirection) {
            if (this.centerX % 30 == 0 && this.centerY % 30 == 0) {
                // if pacman want to turn and a Block is in his way
                // he has to wait and continue in the direction
                // until the way is clear so he can change into the direction
                // he wants to go
                switch (this.changeDirection) {
                    case direction.UP:
                        wait = false;
                        for (let i = 0; i < blocks.length; i++) {
                            const b = blocks[i]
                            if ((this.centerX == b.x && this.centerY - 30 == b.y) || this.centerY == 0) {
                                wait = true;
                            }
                        }

                        if (!wait) {
                            this.stop();
                            this.direction = direction.UP;
                            this.moveUp();
                        }
                        break;
                    case direction.DOWN:
                        wait = false;
                        for (let i = 0; i < blocks.length; i++) {
                            const b = blocks[i]
                            if ((this.centerX == b.x && this.centerY + 30 == b.y) || this.centerY == 450) {
                                wait = true;
                            }
                        }

                        if (!wait) {
                            this.stop();
                            this.direction = direction.DOWN
                            this.moveDown();
                        }
                        break;
                    case direction.LEFT:
                        wait = false;
                        for (let i = 0; i < blocks.length; i++) {
                            const b = blocks[i]
                            if ((this.centerX - 30 == b.x && this.centerY == b.y) || this.centerX == 0) {
                                wait = true;
                            }
                        }

                        if (!wait) {
                            this.stop();
                            this.direction = direction.LEFT
                            this.moveLeft();
                        }
                        break;
                    case direction.RIGHT:
                        wait = false;
                        for (let i = 0; i < blocks.length; i++) {
                            const b = blocks[i]
                            if ((this.centerX + 30 == b.x && this.centerY == b.y) || this.centerX == 690) {
                                wait = true;
                            }
                        }

                        if (!wait) {
                            this.stop();
                            this.direction = direction.RIGHT
                            this.moveRight();
                        }
                        break;
                }// end switch
            } // end if for x%30 & y%30
        }
    }

    this.blockCollision = function (blocks) {
        switch (this.direction) {
            case direction.UP:
                for (let i = 0; i < blocks.length; i++) {
                    const b = blocks[i]
                    if (this.centerX == b.x && this.centerY - 30 == b.y) {
                        this.stop();
                    }
                }
                break;
            case direction.DOWN:
                for (let i = 0; i < blocks.length; i++) {
                    const b = blocks[i]
                    if (this.centerX == b.x && this.centerY + 30 == b.y) {
                        this.stop();
                    }
                }
                break;
            case direction.LEFT:
                for (let i = 0; i < blocks.length; i++) {
                    const b = blocks[i]
                    if (this.centerX - 30 == b.x && this.centerY == b.y) {
                        this.stop();
                    }
                }
                break;
            case direction.RIGHT:
                for (let i = 0; i < blocks.length; i++) {
                    const b = blocks[i]
                    if (this.centerX + 30 == b.x && this.centerY == b.y) {
                        this.stop();
                    }
                }
                break;
        }// end switch
    }
}
