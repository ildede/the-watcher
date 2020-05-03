import 'phaser'
import {CREDIT_1, END_TITLE_SCENE, UI_SCENE} from "../TheWatcher";
import menuItPng from "../assets/title/menu-it.png";
import menuEnPng from "../assets/title/menu-en.png";

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super(END_TITLE_SCENE)
    }

    preload() {
        this.load.image('it', menuItPng)
        this.load.image('en', menuEnPng)
    }

    create() {
        this.anims.create({key: 'starfield', frames: this.anims.generateFrameNames('splashBg'), repeat: -1, frameRate: 60})
        this.add.sprite(450, 300, 'splashBg').setDisplaySize(900, 600).play('starfield')
        let rect = new Phaser.Geom.Rectangle(0, 0, 900, 300);
        const graphics = this.add.graphics({ fillStyle: { color: 0x000000 }})
        graphics.fillRectShape(rect);

        this.add.image(450, 150, 'titleWatcherVR')

        const language = this.scene.get(UI_SCENE).uiConfig?.language || 'en'
        this.add.image(450, 420, language)

        this.input.keyboard.on('keydown-SPACE', () => {
            this.cameras.main.fadeOut(500)
            this.scene.start(CREDIT_1)
        })
    }
}
