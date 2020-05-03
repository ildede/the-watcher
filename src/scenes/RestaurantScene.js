import 'phaser'
import {RESTAURANT_SCENE, TRANSITION_SCENE, UI_SCENE} from "../TheWatcher";

export default class RestaurantScene extends Phaser.Scene {
    constructor() {
        super(RESTAURANT_SCENE)
    }

    create(data) {
        this.levelConfig = data
        this.dialogOpen = false
        console.debug(RESTAURANT_SCENE, this.levelConfig)

        this.add.image(450, 270, this.levelConfig.level.image.name).setScale(0.55, 0.55).setFlipX(this.levelConfig.level.image.flip)

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

