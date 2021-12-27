function block(x, y) {
    this.x = x;
    this.y = y;
    this.rect = new rect(x, y, 30, 30);

    this.draw = function () {
        game.ctx.drawImage(game.images.getBlock(game.level), this.x, this.y)
    }
}