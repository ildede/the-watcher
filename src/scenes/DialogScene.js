import 'phaser'
import {DIALOG_SCENE, TRANSITION_SCENE, UI_SCENE} from "../TheWatcher";

export default class DialogScene extends Phaser.Scene {
    constructor() {
        super(DIALOG_SCENE)
    }

    create(data) {
        this.levelConfig = data
        this.dialogOpen = false
        console.debug(DIALOG_SCENE, this.levelConfig)

        this.anims.create({key: 'barGif', frames: this.anims.generateFrameNames('barBg'), repeat: -1, frameRate: 12})
        this.add.sprite(450, 300, 'barBg').setScale(0.35, 0.35).play('barGif')
        this.add.image(450, 200, 'himAndHer').setScale(0.35, 0.35).setFlipX(true)

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
        this.events.on('dialogStart', (box) => {
            this.input.keyboard.off('keydown_SPACE');
            this.input.keyboard.on('keydown_SPACE', () => {
                this.events.emit('continueDialog', box)
            });
        })

        console.debug('S: Test startTransition event')
        this.input.keyboard.once("keydown_S", event => {
            uiScene.events.emit('startTransition')
        });

        //-- Start dialog
        this.events.emit('dialogMessages', this.levelConfig.level.messages)

        this.events.on('dialogEnd', () => {
            uiScene.events.emit('startTransition')
        })
    }
}

