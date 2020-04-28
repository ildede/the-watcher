import 'phaser'
import nextPage from "../assets/UI/arrow-down-left.png";
import i18next from 'i18next';

const theArrival = require('../locales/the_arrival.json');

export default class UIScene extends Phaser.Scene {

    constructor() {
        super('UIScene')
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        })

        this.load.image('nextPage', nextPage)

        this.load.json('langResource', theArrival)
    }

    create(data) {
        const currentGame = this.scene.get('WorldScene')
        this.uiConfig = data

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

        let mainCamera = this.cameras.main

        textBox.on('pageend', function() {
            const icon = textBox.getElement('action').setVisible(true)
            textBox.resetChildVisibleState(icon)
        }, textBox)

        currentGame.events.on('systemMessage', function(message) {
            console.debug('Event systemMessage received')
            currentGame.events.emit('dialogStart')
            textBox.setVisible(true).start(i18next.t(message.stringId()), 50)
        }, this)

        currentGame.events.on('readSign', function(sign) {
            console.debug('Event readSign received')
            currentGame.events.emit('dialogStart')
            textBox.setVisible(true).start(i18next.t(sign.stringId()), 50)
        }, this)

        currentGame.events.on('talkTo', function(npc) {
            console.debug('Event talkTo received')
            currentGame.events.emit('dialogStart')
            textBox.setVisible(true).start(`Stop touching me! (I'm ${npc.spriteKey})`, 50)
        }, this)

        currentGame.events.on('continueDialog', function() {
            console.debug('Event continueDialog received')
            const icon = textBox.getElement('action').setVisible(false)
            textBox.resetChildVisibleState(icon)
            if (this.isTyping) {
                this.stop(true)
            } else if (this.isLastPage) {
                textBox.setVisible(false)
                currentGame.events.emit('dialogEnd')
            } else {
                this.typeNextPage()
            }
        }, textBox)

        this.events.on('wake', () => {
            mainCamera.fadeIn(500)
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
