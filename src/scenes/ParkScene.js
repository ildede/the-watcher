import 'phaser'
import {PARK_SCENE, TRANSITION_SCENE, UI_SCENE} from "../TheWatcher";
import * as starrySkyJson from "../assets/starry-sky/starry-sky.json";
import starrySkyPng from "../assets/starry-sky/starry-sky.png";

export default class ParkScene extends Phaser.Scene {
    constructor() {
        super(PARK_SCENE)
    }

    preload() {
        this.load.atlas("starrySkyBg", starrySkyPng, starrySkyJson)
    }

    create(data) {
        this.levelConfig = data
        this.dialogOpen = false
        console.debug(PARK_SCENE, this.levelConfig)

        this.anims.create({key: 'starrySkyGif', frames: this.anims.generateFrameNames('starrySkyBg'), repeat: -1, frameRate: 10})
        this.add.sprite(450, 300, 'starrySkyBg').setScale(2, 2).play('starrySkyGif')

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

