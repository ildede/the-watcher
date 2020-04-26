import 'phaser'

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super('TitleScene')
        this.startWorldScene = this.startWorldScene.bind(this)
    }

    create() {
        this.add.text(140, 100, 'THE WATCHER', { fontSize: '70px' })

        const en = this.add.text(225, 300, 'English (default)', { fontSize: '30px' })
        const it = this.add.text(225, 340, 'Italiano', { fontSize: '30px' })
        en.setInteractive({ useHandCursor: true })
        it.setInteractive({ useHandCursor: true })
        en.on('pointerdown', () => this.startWorldScene('en'))
        it.on('pointerdown', () => this.startWorldScene('it'))
        this.input.keyboard.on('keydown-SPACE', () => this.startWorldScene())
    }

    startWorldScene(language) {
        language = language || 'en'
        this.cameras.main.fadeOut(500)
        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.scene.start('WorldScene', { new: true })
                this.scene.launch('UIScene', { language: language })
                this.scene.bringToTop('UIScene')
            }
        })
    }
}
