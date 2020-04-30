import 'phaser'
import {DIALOG_SCENE, TRANSITION_SCENE, UI_SCENE} from "../TheWatcher";

export default class DialogScene extends Phaser.Scene {
    constructor() {
        super(DIALOG_SCENE)
    }

    create(data) {
        this.levelConfig = data
        this.dialogOpen = false
        console.log(DIALOG_SCENE, this.levelConfig)

        //-- Event listener
        const uiScene = this.scene.get(UI_SCENE)
        uiScene.events.once('startTransition', () => {
            this.cameras.main.fadeOut(500)
            this.time.addEvent({
                    delay: 500,
                    callback: () => {
                        this.events.off('update')
                        this.scene.sleep(UI_SCENE)
                        this.scene.start(TRANSITION_SCENE, this.levelConfig)
                    }
                })
        }, this)

        //-- Input rules
        this.input.keyboard.on('keydown_SPACE', this.continueDialog());

        console.debug('S: Test startTransition event')
        this.input.keyboard.once("keydown_S", event => {
            uiScene.events.emit('startTransition')
        });

        //-- Start dialog
        let index = 0
        this.events.emit('dialogMessages', this.levelConfig.level.messages[index])

        this.events.on('dialogEnd', () => {
            index += 1
            this.events.emit('dialogMessages', this.levelConfig.level.messages[index])
        })
    }

    continueDialog() { return () => this.events.emit('continueDialog') }
}

