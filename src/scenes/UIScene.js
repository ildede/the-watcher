import 'phaser'
import textBox from "../assets/UI/textbox.png";
import nextPage from "../assets/UI/arrow-down-left.png";

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

        this.load.image('textBox', textBox)
        this.load.image('nextPage', nextPage)
    }

    create() {
        const currentGame = this.scene.get('WorldScene')

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

        this.input.keyboard.on(
            'keydown-' + 'ENTER',
            function() {
                const icon = textBox.getElement('action').setVisible(false)
                textBox.resetChildVisibleState(icon)
                if (this.isTyping) {
                    this.stop(true)
                } else if (this.isLastPage) {
                    textBox.setVisible(false)
                } else {
                    this.typeNextPage()
                }
            },
            textBox
        )

        textBox.on('pageend', function() {
                const icon = textBox.getElement('action').setVisible(true)
                textBox.resetChildVisibleState(icon)
            },
            textBox
        )

        currentGame.events.on('newGame', function() {
            textBox.setVisible(true).start(welcomeMessage(), 50)
        }, this)

        currentGame.events.on('signRead', function(sign) {
            textBox.setVisible(true).start(sign.stringId(), 50)
        }, this)

        this.events.on('wake', () => {
            // mainCamera.fadeIn(0)
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

const welcomeMessage = () => {
    return `[u]text[/u] ut [b]perspiciatis[/b] omnis [stroke]iste[/stroke] natus [shadow]text[/shadow] sit [i]voluptatem[/i] accusantium [color=red]doloremque[/color] laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet.`
}

