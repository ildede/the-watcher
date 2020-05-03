import 'phaser'
import {CREDIT_5, TITLE_SCENE} from "../TheWatcher";
import creditTopBottomPng from "../assets/title/5/5-top-bottom.png";

export default class Credit5Scene extends Phaser.Scene {
    constructor() {
        super(CREDIT_5)
    }

    preload() {
        this.load.image('topBottom5', creditTopBottomPng)
    }

    create() {
        this.add.image(450, 300, 'creditsBg')
        this.add.image(450, 300, 'topBottom5').setScale(0.65,0.65)

        this.input.keyboard.on('keydown-SPACE', () => {
            this.cameras.main.fadeOut(500)
            this.scene.start(TITLE_SCENE, { finished: true })
        })
    }
}
