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

        const signBox = createTextBox.call(this, 0xeeeeee, 0x907748, '#260e04');
        const npcBox = createTextBox.call(this, 0x55aadd, 0x1e2a2d, '#fefefe');
        const herBox = createTextBox.call(this, 0xeeeeee, 0x907748, '#260e04');
        const himBox = createTextBox.call(this, 0xeeeeee, 0x907748, '#260e04');
        const systemBox = createTextBox.call(this, 0x101010, 0xfefefe, '#fefefe');

        let mainCamera = this.cameras.main

        worldScene.events.on('systemMessage', function(item) {
            console.debug('Event systemMessage received')
            console.log(item.messageType)
            if (item.messageType === 'him') {
                this.manageMessageFor(item, worldScene, himBox);
            } else {
                this.manageMessageFor(item, worldScene, systemBox);
            }
        }, this)

        worldScene.events.on('readSign', function(item) {
            console.debug('Event readSign received')
            this.manageMessageFor(item, worldScene, signBox);
        }, this)

        worldScene.events.on('talkTo', function(item) {
            console.debug('Event talkTo received')
            if (item.messageType === 'her') {
                this.manageMessageFor(item, worldScene, herBox);
            } else {
                this.manageMessageFor(item, worldScene, npcBox);
            }
        }, this)

        dialogScene.events.on('dialogMessages', function(messages) {
            console.debug('Event dialogMessages received')
            this.manageDialogMessagesFor(messages, dialogScene, signBox);
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
            const icon = signBox.getElement('action').setVisible(false)
            signBox.resetChildVisibleState(icon)
            if (this.isTyping) {
                this.stop(true)
            } else if (this.isLastPage) {
                signBox.setVisible(false)
                dialogScene.events.emit('dialogEnd')
            } else {
                this.typeNextPage()
            }
        }, signBox)

        this.events.on('wake', () => {
            this.messages = []
            mainCamera.fadeIn(500)
        })

        function createTextBox(bgColor, bgBorder, textColor) {
            const currentBox = this.rexUI.add.textBox({
                x: 30,
                y: 450,

                background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, bgColor)
                    .setStrokeStyle(3, bgBorder),

                text: getBBcodeText(this, 770, 770, 70, textColor),

                action: this.add
                    .image(0, 0, 'nextPage')
                    .setTint(textColor)
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
            currentBox.setDepth(1)
            currentBox.setVisible(false)
            currentBox.setOrigin(0)
            currentBox.layout()
            currentBox.setInteractive()
            currentBox.on('pageend', function () {
                const icon = currentBox.getElement('action').setVisible(true)
                currentBox.resetChildVisibleState(icon)
            }, currentBox)
            return currentBox;
        }
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

const getBBcodeText = function (scene, wrapWidth, fixedWidth, fixedHeight, textColor) {
    return scene.rexUI.add.BBCodeText(0, 0, '', {
        fixedWidth: fixedWidth,
        fixedHeight: fixedHeight,

        color: textColor,
        fontSize: '20px',
        wrap: {
            mode: 'word',
            width: wrapWidth
        },
        maxLines: 3
        // stroke: 'red',
        // strokeThickness: 4,
        // shadow: {
        //     offsetX: 5,
        //     offsetY: 5,
        //     blur: 5,
        //     color: 'yellow'
        // },
        //
        // underline: {
        //     color: '#000',
        //     thickness: 2,
        //     offset: 1
        // }
    })
}
