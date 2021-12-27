function point(x, y) {
    this.x = x
    this.y = y

    this.draw = function () {
        game.ctx.drawImage(game.images.getPoint(), this.x + 7, this.y + 7)
    }
}