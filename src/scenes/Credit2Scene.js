import 'phaser'
import {CREDIT_2, CREDIT_3} from "../TheWatcher";
import creditTopPng from "../assets/title/2/2-top.png";
import creditBottomPng from "../assets/title/2/2-bottom.png";

export default class Credit1Scene extends Phaser.Scene {
    constructor() {
        super(CREDIT_2)
    }

    preload() {
        this.load.image('top2', creditTopPng)
        this.load.image('bottom2', creditBottomPng)
    }

    create() {
        this.add.image(450, 300, 'creditsBg')
        this.add.text(100, 300, CREDIT_2, { fontSize: '30px' })

        this.add.image(450, 60, 'top2')
        this.add.image(450, 540, 'bottom2')

        this.input.keyboard.on('keydown-SPACE', () => {
            this.cameras.main.fadeOut(500)
            this.scene.start(CREDIT_3)
        })
    }
}
