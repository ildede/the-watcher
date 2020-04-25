import 'phaser'

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super('TitleScene')
        this.handleClick = this.handleClick.bind(this)
    }

    create() {
        console.log('Create TitleScene')

        this.add.text(160, 100, 'THE WATCHER', { fontSize: '70px' })

        const text = this.add.text(235, 320, 'start game', { fontSize: '30px' })
        text.setInteractive({ useHandCursor: true })
        text.on('pointerdown', () => this.handleClick())
    }

    handleClick() {
        this.cameras.main.fadeOut(500)

        const startIntroSceneOrResumeLevel = () => {
            this.time.addEvent({
                delay: 500,
                callback: () => {
                    this.scene.start('WorldScene', {})
                    this.scene.launch('UIScene')
                    this.scene.bringToTop('UIScene')
                }
            })
        }

        startIntroSceneOrResumeLevel()
    }
}
