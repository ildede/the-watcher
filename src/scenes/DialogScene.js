import 'phaser'
import {DIALOG_SCENE, TRANSITION_SCENE, UI_SCENE} from "../TheWatcher";
import cloudyMorningMp3 from "../assets/audio/04Bar/A_Cloudy_Morning.mp3";

export default class DialogScene extends Phaser.Scene {
    constructor() {
        super(DIALOG_SCENE)
    }

    preload() {
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 420, 50);
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        const assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 400 * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        this.load.audio('cloudyMorning', [cloudyMorningMp3]);
    }


    create(data) {
        this.levelConfig = data
        this.dialogOpen = false
        console.debug(DIALOG_SCENE, this.levelConfig)

        if (this.levelConfig.level.music) {
            this.music = this.sound.add(this.levelConfig.level.music)
            this.music.play({loop: true})
        }

        this.anims.create({key: 'barGif', frames: this.anims.generateFrameNames('barBg'), repeat: -1, frameRate: 12})
        this.add.sprite(450, 300, 'barBg').setScale(0.35, 0.35).play('barGif')
        this.add.image(450, 300, 'himAndHer').setScale(0.35, 0.35)

        //-- Event listener
        const uiScene = this.scene.get(UI_SCENE)
        uiScene.events.once('startTransition', () => {
            this.cameras.main.fadeOut(500)
            if (this.music?.isPlaying) {
                this.music.stop()
                this.music.destroy()
            }
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

