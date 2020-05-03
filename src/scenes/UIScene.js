import 'phaser'
import i18next from 'i18next';
import {DIALOG_SCENE, PARK_SCENE, RESTAURANT_SCENE, UI_SCENE, WORLD_SCENE} from "../TheWatcher";

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
        const restaurantScene = this.scene.get(RESTAURANT_SCENE)
        const parkScene = this.scene.get(PARK_SCENE)
        this.uiConfig = data
        this.messages = []
        this.messageQueue = []

        i18next
            .init({
                lng: this.uiConfig.language,
                resources: this.cache.json.get('langResource')
            }).then(function (t) {
                console.debug('i18next initialized')
            })

        const signBox = createTextBox.call(this, 0xeeeeee, 0x907748, '#260e04');
        const npcBox = createTextBox.call(this, 0x55aadd, 0x1e2a2d, '#fefefe');
        const herBox = createTextBox.call(this, 0xeeeeee, 0x907748, '#260e04', 'herFace');
        const himBox = createTextBox.call(this, 0xeeeeee, 0x907748, '#260e04', 'himFace');
        const systemBox = createTextBox.call(this, 0x101010, 0xfefefe, '#fefefe');

        let mainCamera = this.cameras.main

        worldScene.events.on('systemMessage', function(item) {
            console.debug('Event systemMessage received')
            if (item.messageType === 'him') {
                manageMessageFor.call(this, item, worldScene, himBox);
            } else if (item.messageType === 'her') {
                manageMessageFor.call(this, item, worldScene, herBox);
            } else {
                manageMessageFor.call(this, item, worldScene, systemBox);
            }
        }, this)
        worldScene.events.on('readSign', function(item) {
            console.debug('Event readSign received')
            manageMessageFor.call(this, item, worldScene, signBox);
        }, this)
        worldScene.events.on('talkTo', function(item) {
            console.debug('Event talkTo received')
            if (item.messageType === 'her') {
                manageMessageFor.call(this, item, worldScene, herBox);
            } else {
                manageMessageFor.call(this, item, worldScene, npcBox);
            }
        }, this)

        dialogScene.events.on('dialogMessages', function(messages) {
            console.debug('Event dialogMessages received')
            fetch(messages)
                .then(response => response.json())
                .then(data => {
                    startMessagesQueue.call(this, data, dialogScene)
                })
        }, this)
        restaurantScene.events.on('dialogMessages', function(messages) {
            console.debug('Event dialogMessages received')
            fetch(messages)
                .then(response => response.json())
                .then(data => {
                    startMessagesQueue.call(this, data, restaurantScene)
                })
        }, this)
        parkScene.events.on('dialogMessages', function(messages) {
            console.debug('Event dialogMessages received')
            fetch(messages)
                .then(response => response.json())
                .then(data => {
                    startMessagesQueue.call(this, data, parkScene)
                })
        }, this)

        worldScene.events.on('continueDialog', function(box) {
            console.debug('Event continueDialog received')
            const icon = box.getElement('action').setVisible(false)
            box.resetChildVisibleState(icon)
            if (box.isTyping) {
                box.stop(true)
            } else if (box.isLastPage) {
                box.setVisible(false)
                if (this.messageQueue.length > 0) {
                    readNextMessageInQueue.call(this, worldScene)
                } else {
                    worldScene.events.emit('dialogEnd')
                }
            } else {
                box.typeNextPage()
            }
        }, this)
        dialogScene.events.on('continueDialog', function(box) {
            console.debug('Event continueDialog received')
            const icon = box.getElement('action').setVisible(false)
            box.resetChildVisibleState(icon)
            if (box.isTyping) {
                box.stop(true)
            } else if (box.isLastPage) {
                box.setVisible(false)
                if (this.messageQueue.length > 0) {
                    readNextMessageInQueue.call(this, dialogScene)
                } else {
                    dialogScene.events.emit('dialogEnd')
                }
            } else {
                box.typeNextPage()
            }
        }, this)
        restaurantScene.events.on('continueDialog', function(box) {
            console.debug('Event continueDialog received')
            const icon = box.getElement('action').setVisible(false)
            box.resetChildVisibleState(icon)
            if (box.isTyping) {
                box.stop(true)
            } else if (box.isLastPage) {
                box.setVisible(false)
                if (this.messageQueue.length > 0) {
                    readNextMessageInQueue.call(this, restaurantScene)
                } else {
                    restaurantScene.events.emit('dialogEnd')
                }
            } else {
                box.typeNextPage()
            }
        }, this)
        parkScene.events.on('continueDialog', function(box) {
            console.debug('Event continueDialog received')
            const icon = box.getElement('action').setVisible(false)
            box.resetChildVisibleState(icon)
            if (box.isTyping) {
                box.stop(true)
            } else if (box.isLastPage) {
                box.setVisible(false)
                if (this.messageQueue.length > 0) {
                    readNextMessageInQueue.call(this, parkScene)
                } else {
                    parkScene.events.emit('dialogEnd')
                }
            } else {
                box.typeNextPage()
            }
        }, this)

        this.events.on('wake', () => {
            this.messages = []
            this.messageQueue = []
            mainCamera.fadeIn(500)
        })

        function startMessagesQueue(messages, currentScene) {
            this.messageQueue = messages
            readNextMessageInQueue.call(this, currentScene)
        }
        function readNextMessageInQueue(currentScene) {
            if (this.messageQueue.length > 0) {
                const currentMessage = this.messageQueue.shift();
                if (currentMessage.who === 'her') {
                    currentScene.events.emit('dialogStart', herBox)
                    herBox.setVisible(true).start(i18next.t(currentMessage.stringId), 50)
                    this.messages.push(currentMessage.stringId)

                } else if (currentMessage.who === 'him') {
                    currentScene.events.emit('dialogStart', himBox)
                    himBox.setVisible(true).start(i18next.t(currentMessage.stringId), 50)
                    this.messages.push(currentMessage.stringId)

                } else if (currentMessage.who === 'npc') {
                    currentScene.events.emit('dialogStart', npcBox)
                    npcBox.setVisible(true).start(i18next.t(currentMessage.stringId), 50)
                    this.messages.push(currentMessage.stringId)

                } else {
                    currentScene.events.emit('dialogStart', systemBox)
                    systemBox.setVisible(true).start(i18next.t(currentMessage.stringId), 50)
                    this.messages.push(currentMessage.stringId)

                }

            }
        }
        function createTextBox(bgColor, bgBorder, textColor, icon) {
            const currentBox = this.rexUI.add.textBox({
                x: 30,
                y: 450,

                background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, bgColor)
                    .setStrokeStyle(3, bgBorder),

                text: getBBcodeText(this, icon ? 674 : 770, icon ? 674 : 770, 96, textColor),

                icon: iconFrom(this, icon),
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
                    icon: 10,
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
        function manageMessageFor(item, currentScene, boxInUse) {
            if ((item.stringIdRequired() && (this.messages.includes(item.stringIdRequired()) === false))
                || (item.stringIdThatDisableThis() && (this.messages.includes(item.stringIdThatDisableThis()) === true))) {
                return
            }

            if (item.endScene()) {
                currentScene.events.emit('dialogStart', boxInUse)
                this.events.emit('startTransition')
            } else if (item.stringId()) {
                if (item.stringId() === 'external') {
                    fetch(item.dialogs())
                        .then(response => response.json())
                        .then(data => {
                            startMessagesQueue.call(this, data, currentScene)
                        })
                    if (item.showOnce()) {
                        item.stringId = () => {}
                    }
                } else {
                    currentScene.events.emit('dialogStart', boxInUse)
                    boxInUse.setVisible(true).start(item.stringId().split(',').map(s => i18next.t(s)), 50)
                    item.stringId().split(',')
                        .forEach(e => {
                            this.messages.push(e)
                        })
                    if (item.showOnce()) {
                        item.stringId = () => {}
                    }
                }
            }

        }
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
const iconFrom = function (scene, icon) {
    if (icon) {
        return scene.add.image(0, 0, icon)
    } else {
        return null
    }
}
