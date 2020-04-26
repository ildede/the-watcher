import 'phaser'

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super('TitleScene')
        this.startWorldScene = this.startWorldScene.bind(this)
    }

    create() {
        this.add.text(160, 100, 'THE WATCHER', { fontSize: '70px' })

        const text = this.add.text(235, 320, 'start game', { fontSize: '30px' })
        text.setInteractive({ useHandCursor: true })
        text.on('pointerdown', () => this.startWorldScene())
        this.input.keyboard.on('keydown-SPACE', () => this.startWorldScene())
    }

    startWorldScene() {
        this.cameras.main.fadeOut(500)
        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.scene.start('WorldScene', { new: true })
                this.scene.launch('UIScene')
                this.scene.bringToTop('UIScene')
            }
        })
    }
}
