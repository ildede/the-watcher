import 'phaser'
import {TITLE_SCENE, UI_SCENE, WORLD_SCENE} from "../TheWatcher";
import {FIRST_LEVEL} from "../config/levels";

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super(TITLE_SCENE)
        this.startWorldScene = this.startWorldScene.bind(this)
    }

    create() {
        this.anims.create({key: 'starfield', frames: this.anims.generateFrameNames('splashBg'), repeat: -1, frameRate: 60})
        this.add.sprite(450, 300, 'splashBg').setDisplaySize(900, 600).play('starfield')

        this.add.image(450, 110, 'titleWatcher')

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
                this.scene.start(WORLD_SCENE, { level: FIRST_LEVEL })
                this.scene.launch(UI_SCENE, { language: language })
                this.scene.bringToTop(UI_SCENE)
            }
        })
    }
}
