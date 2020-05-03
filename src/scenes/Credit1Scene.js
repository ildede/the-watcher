import 'phaser'
import {CREDIT_1, CREDIT_2} from "../TheWatcher";

export default class Credit1Scene extends Phaser.Scene {
    constructor() {
        super(CREDIT_1)
    }

    create() {
        this.add.text(100, 140, CREDIT_1, { fontSize: '30px' })

        this.input.keyboard.on('keydown-SPACE', () => {
            this.cameras.main.fadeOut(500)
            this.scene.start(CREDIT_2)
        })
    }
}
