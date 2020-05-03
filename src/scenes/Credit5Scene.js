import 'phaser'
import {CREDIT_5, TITLE_SCENE} from "../TheWatcher";

export default class Credit5Scene extends Phaser.Scene {
    constructor() {
        super(CREDIT_5)
    }

    create() {
        this.add.text(100, 140, CREDIT_5, { fontSize: '30px' })

        this.input.keyboard.on('keydown-SPACE', () => {
            this.cameras.main.fadeOut(500)
            this.scene.start(TITLE_SCENE, { finished: true })
        })
    }
}
