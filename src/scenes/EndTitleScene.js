import 'phaser'
import {CREDIT_1, END_TITLE_SCENE, UI_SCENE} from "../TheWatcher";
import menuItPng from "../assets/title/menu-it.png";
import menuEnPng from "../assets/title/menu-en.png";
import finalMusicWav from "../assets/audio/10EndTitles/Ominous_Approach.wav";

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super(END_TITLE_SCENE)
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

        this.load.audio('finalMusic', [finalMusicWav]);
        this.load.image('it', menuItPng)
        this.load.image('en', menuEnPng)
    }

    create() {
        this.music = this.sound.add('finalMusic');
        this.music.play();

        this.anims.create({key: 'starfield', frames: this.anims.generateFrameNames('splashBg'), repeat: -1, frameRate: 60})
        this.add.sprite(450, 300, 'splashBg').setDisplaySize(900, 600).play('starfield')
        let rect = new Phaser.Geom.Rectangle(0, 0, 900, 300);
        const graphics = this.add.graphics({ fillStyle: { color: 0x000000 }})
        graphics.fillRectShape(rect);

        this.add.image(450, 150, 'titleWatcherVR')

        const language = this.scene.get(UI_SCENE).uiConfig?.language || 'en'
        this.add.image(450, 420, language)

        this.input.keyboard.on('keydown-SPACE', () => {
            this.cameras.main.fadeOut(500)
            this.scene.start(CREDIT_1)
        })
    }
}
