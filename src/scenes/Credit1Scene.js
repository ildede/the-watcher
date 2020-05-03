import 'phaser'
import {CREDIT_1, CREDIT_2} from "../TheWatcher";
import creditsBgPng from "../assets/title/credits-bg.png";
import creditTopPng from "../assets/title/1/1-top.png";
import creditBottomPng from "../assets/title/1/1-bottom.png";
import imagePng from "../assets/title/1/1-image.png";

export default class Credit1Scene extends Phaser.Scene {
    constructor() {
        super(CREDIT_1)
    }

    preload() {
        this.load.image('creditsBg', creditsBgPng)
        this.load.image('top1', creditTopPng)
        this.load.image('bottom1', creditBottomPng)
        this.load.image('image1', imagePng)
    }

    create() {
        this.add.image(450, 300, 'creditsBg')
        this.add.image(450, 300, 'image1')
            .setScale(0.65, 0.65)

        this.add.image(450, 60, 'top1')
        this.add.image(450, 540, 'bottom1')

        this.input.keyboard.on('keydown-SPACE', () => {
            this.cameras.main.fadeOut(500)
            this.scene.start(CREDIT_2)
        })
    }
}
