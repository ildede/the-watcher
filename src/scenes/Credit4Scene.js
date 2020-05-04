import 'phaser'
import {CREDIT_4, CREDIT_5} from "../TheWatcher";
import creditTopBottomPng from "../assets/title/4/4-top-bottom.png";
import imagePng from "../assets/title/4/4-image.png";

export default class Credit4Scene extends Phaser.Scene {
    constructor() {
        super(CREDIT_4)
    }

    preload() {
        this.load.image('topBottom4', creditTopBottomPng)
        this.load.image('image4', imagePng)
    }

    create() {
        this.add.image(450, 300, 'creditsBg')
        this.add.image(240, 300, 'image4')
            .setScale(0.55,0.55)

        this.add.image(685, 300, 'topBottom4')
            .setScale(0.8, 0.8)

        this.input.keyboard.on('keydown-SPACE', () => {
            this.cameras.main.fadeOut(500)
            this.scene.start(CREDIT_5)
        })
    }
}
