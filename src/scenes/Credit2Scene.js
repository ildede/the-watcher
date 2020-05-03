import 'phaser'
import {CREDIT_2, CREDIT_3} from "../TheWatcher";

export default class Credit1Scene extends Phaser.Scene {
    constructor() {
        super(CREDIT_2)
    }

    create() {
        this.add.text(100, 140, CREDIT_2, { fontSize: '30px' })

        this.input.keyboard.on('keydown-SPACE', () => {
            this.cameras.main.fadeOut(500)
            this.scene.start(CREDIT_3)
        })
    }
}
