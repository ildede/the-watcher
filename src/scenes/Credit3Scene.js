import 'phaser'
import {CREDIT_3, CREDIT_4} from "../TheWatcher";

export default class Credit3Scene extends Phaser.Scene {
    constructor() {
        super(CREDIT_3)
    }

    preload() {
    }

    create() {
        this.add.text(100, 140, CREDIT_3, { fontSize: '30px' })


        this.input.keyboard.on('keydown-SPACE', () => {
            this.cameras.main.fadeOut(500)
            this.scene.start(CREDIT_4)
        })
    }
}
