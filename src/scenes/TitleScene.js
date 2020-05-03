import 'phaser'
import {CREDIT_1, END_TITLE_SCENE, TITLE_SCENE, UI_SCENE, WORLD_SCENE} from "../TheWatcher";
import {FIRST_LEVEL} from "../config/levels";

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super(TITLE_SCENE)
        this.startWorldScene = this.startWorldScene.bind(this)
        this.drawOutlineRect = this.drawOutlineRect.bind(this)
    }

    create(data) {
        const isFinished = data?.finished || false
        this.anims.create({key: 'starfield', frames: this.anims.generateFrameNames('splashBg'), repeat: -1, frameRate: 60})
        this.add.sprite(450, 300, 'splashBg').setDisplaySize(900, 600).play('starfield')
        let rect = new Phaser.Geom.Rectangle(0, 0, 900, 300);
        const graphics = this.add.graphics({ fillStyle: { color: 0x000000 }})
        graphics.fillRectShape(rect);

        if (isFinished) {
            this.add.image(450, 150, 'titleWatcherVR')
        } else {
            this.add.image(450, 150, 'titleWatcher')
        }
        const english = this.add.sprite(450, 380, 'splashLanguages', 'english');
        const italian = this.add.sprite(450, 420, 'splashLanguages', 'italian');
        if (isFinished) {
            const credits = this.add.sprite(450, 460, 'splashLanguages', 'italian');
            credits.setInteractive({ useHandCursor: true })
            credits.on('pointerdown', () => this.scene.start(CREDIT_1))
            credits.on('pointerover', () => this.drawOutlineRect(credits))
            credits.on('pointerout', () => this.selection.clear())
        }
        english.setInteractive({ useHandCursor: true })
        italian.setInteractive({ useHandCursor: true })
        english.on('pointerdown', () => this.startWorldScene('en'))
        italian.on('pointerdown', () => this.startWorldScene('it'))
        english.on('pointerover', () => this.drawOutlineRect(english))
        italian.on('pointerover', () => this.drawOutlineRect(italian))
        english.on('pointerout', () => this.selection.clear())
        italian.on('pointerout', () => this.selection.clear())

        this.input.keyboard.on('keydown-SPACE', () => {
            this.drawOutlineRect(english)
            setTimeout(() => this.startWorldScene(), 400)
        })
    }

    drawOutlineRect(sprite) {
        let rect = new Phaser.Geom.Rectangle((sprite.x-sprite.width/2)-5, (sprite.y-sprite.height/2)-5, sprite.width+10, sprite.height+10)
        const graphics = this.add.graphics({ lineStyle: { color: 0x00ffff, width: 2 } })
        graphics.strokeRectShape(rect)
        this.selection = graphics
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
