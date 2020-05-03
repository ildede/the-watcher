import 'phaser'
import {CREDIT_4, CREDIT_5} from "../TheWatcher";

export default class Credit4Scene extends Phaser.Scene {
    constructor() {
        super(CREDIT_4)
    }

    create() {
        this.add.text(100, 140, CREDIT_4, { fontSize: '30px' })

        this.input.keyboard.on('keydown-SPACE', () => {
            this.cameras.main.fadeOut(500)
            this.scene.start(CREDIT_5)
        })
    }
}
