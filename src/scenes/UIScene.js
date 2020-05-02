import 'phaser'
import i18next from 'i18next';
import {DIALOG_SCENE, UI_SCENE, WORLD_SCENE} from "../TheWatcher";

export default class UIScene extends Phaser.Scene {

    constructor() {
        super(UI_SCENE)
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        })
    }

    create(data) {
        const worldScene = this.scene.get(WORLD_SCENE)
        const dialogScene = this.scene.get(DIALOG_SCENE)
        this.uiConfig = data
        this.messages = []

        i18next
            .init({
                lng: this.uiConfig.language,
                resources: this.cache.json.get('langResource')
            }).then(function (t) {
                console.debug('i18next initialized')
            })

        const textBox = this.rexUI.add.textBox({
            x: 30,
            y: 450,

            background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xeeeeee)
                .setStrokeStyle(3, 0x907748),

            text: getBBcodeText(this, 770, 770, 70),

            action: this.add
                .image(0, 0, 'nextPage')
                .setTint(0x4b5e57)
                .setVisible(false)
                .setScale(0.6),

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 2,
                text: 10
            }
        })
        textBox.setDepth(1)
        textBox.setVisible(false)
        textBox.setOrigin(0)
        textBox.layout()
        textBox.setInteractive()

        const systemBox = this.rexUI.add.textBox({
            x: 30,
            y: 450,

            background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xaaaaaa)
                .setStrokeStyle(3, 0x907748),

            text: getBBcodeText(this, 770, 770, 70),

            action: this.add
                .image(0, 0, 'nextPage')
                .setTint(0x4b5e57)
                .setVisible(false)
                .setScale(0.6),

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 2,
                text: 10
            }
        })
        systemBox.setDepth(1)
        systemBox.setVisible(false)
        systemBox.setOrigin(0)
        systemBox.layout()
        systemBox.setInteractive()

        let mainCamera = this.cameras.main

        textBox.on('pageend', function() {
            const icon = textBox.getElement('action').setVisible(true)
            textBox.resetChildVisibleState(icon)
        }, textBox)
        systemBox.on('pageend', function() {
            const icon = systemBox.getElement('action').setVisible(true)
            systemBox.resetChildVisibleState(icon)
        }, systemBox)

        worldScene.events.on('systemMessage', function(item) {
            console.debug('Event systemMessage received')
            this.manageMessageFor(item, worldScene, systemBox);
        }, this)

        worldScene.events.on('readSign', function(item) {
            console.debug('Event readSign received')
            this.manageMessageFor(item, worldScene, textBox);
        }, this)

        worldScene.events.on('talkTo', function(item) {
            console.debug('Event talkTo received')
            this.manageMessageFor(item, worldScene, textBox);
        }, this)

        dialogScene.events.on('dialogMessages', function(messages) {
            console.debug('Event dialogMessages received')
            this.manageDialogMessagesFor(messages, dialogScene, textBox);
        }, this)

        worldScene.events.on('continueDialog', function(box) {
            console.debug('Event continueDialog received')
            console.log('continue on ', box)
            const icon = box.getElement('action').setVisible(false)
            box.resetChildVisibleState(icon)
            if (box.isTyping) {
                box.stop(true)
            } else if (box.isLastPage) {
                box.setVisible(false)
                worldScene.events.emit('dialogEnd')
            } else {
                box.typeNextPage()
            }
        }, this)
        dialogScene.events.on('continueDialog', function() {
            console.debug('Event continueDialog received')
            const icon = textBox.getElement('action').setVisible(false)
            textBox.resetChildVisibleState(icon)
            if (this.isTyping) {
                this.stop(true)
            } else if (this.isLastPage) {
                textBox.setVisible(false)
                dialogScene.events.emit('dialogEnd')
            } else {
                this.typeNextPage()
            }
        }, textBox)

        this.events.on('wake', () => {
            this.messages = []
            mainCamera.fadeIn(500)
        })
    }

    manageMessageFor(item, currentScene, boxInUse) {
        if (this.requiredMessageNotRead(item) || this.blockingMessageIsRead(item)) {
            return
        }

        if (item.endScene()) {
            currentScene.events.emit('dialogStart', boxInUse)
            this.events.emit('startTransition')
        } else if (item.stringId()) {
            currentScene.events.emit('dialogStart', boxInUse)
            boxInUse.setVisible(true).start(item.stringId().split(',').map(s => i18next.t(s)), 50)
            item.stringId().split(',')
                .forEach(e => {
                    if (this.messages.includes(e) === false) this.messages.push(e)
                })
            if (item.showOnce()) {
                item.stringId = () => {}
            }
        }

    }

    requiredMessageNotRead(item) {
        return item.stringIdRequired() && (this.messages.includes(item.stringIdRequired()) === false)
    }
    blockingMessageIsRead(item) {
        return item.stringIdThatDisableThis() && (this.messages.includes(item.stringIdThatDisableThis()) === true)
    }

    manageDialogMessagesFor(messages, currentScene, textBox) {
        currentScene.events.emit('dialogStart')
        textBox.setVisible(true).start(messages.split(',').map(s => i18next.t(s)), 50)
        messages.split(',')
            .forEach(e => {
                if (this.messages.includes(e) === false) this.messages.push(e)
            })
    }
}

const getBBcodeText = function(scene, wrapWidth, fixedWidth, fixedHeight) {
    return scene.rexUI.add.BBCodeText(0, 0, '', {
        fixedWidth: fixedWidth,
        fixedHeight: fixedHeight,

        color: 0x260e04,
        fontSize: '20px',
        wrap: {
            mode: 'word',
            width: wrapWidth
        },
        maxLines: 3,
        stroke: 'red',
        strokeThickness: 4,
        shadow: {
            offsetX: 5,
            offsetY: 5,
            blur: 5,
            color: 'yellow'
        },

        underline: {
            color: '#000',
            thickness: 2,
            offset: 1
        }
    })
}
