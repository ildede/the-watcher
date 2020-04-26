import 'phaser'

const gameConfig = {
    type: Phaser.CANVAS,
    width: 900,
    height: 600,
    parent: "game-container",
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    }
}

export default gameConfig
