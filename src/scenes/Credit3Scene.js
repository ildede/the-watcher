import 'phaser'
import {CREDIT_3, CREDIT_4} from "../TheWatcher";
import creditTopPng from "../assets/title/3/3-top.png";
import creditBottomPng from "../assets/title/3/3-bottom.png";

export default class Credit3Scene extends Phaser.Scene {
    constructor() {
        super(CREDIT_3)
    }

    preload() {
        this.load.image('top3', creditTopPng)
        this.load.image('bottom3', creditBottomPng)
    }

    create() {
        this.add.image(450, 300, 'creditsBg')
        this.add.image(450, 150, 'top3')
        this.add.text(100, 300, CREDIT_3, { fontSize: '30px' })
        this.add.image(450, 450, 'bottom3')


        this.input.keyboard.on('keydown-SPACE', () => {
            this.cameras.main.fadeOut(500)
            this.scene.start(CREDIT_4)
        })
    }
}
