import 'phaser'
import {CREDIT_3, CREDIT_4} from "../TheWatcher";
import creditTopPng from "../assets/title/3/3-top.png";
import creditBottomPng from "../assets/title/3/3-bottom.png";
import imageRoom3Png from "../assets/title/3/room.png";
import * as imageRoom3Json from "../assets/title/3/room.json";
import imageHimPng from "../assets/title/3/him.png";

export default class Credit3Scene extends Phaser.Scene {
    constructor() {
        super(CREDIT_3)
    }

    preload() {
        this.load.image('top3', creditTopPng)
        this.load.image('bottom3', creditBottomPng)
        this.load.atlas('imageRoom3', imageRoom3Png, imageRoom3Json)
        this.load.image('imageHim3', imageHimPng)
    }

    create() {
        this.add.image(450, 300, 'creditsBg')

        this.anims.create({
            key: 'room3',
            frames: this.anims.generateFrameNames('imageRoom3'),
            repeat: -1,
            frameRate: 12
        })
        this.add.sprite(450, 300, 'imageRoom3')
            .play('room3')
            .setCrop(50, 0, 800, 700)
            .setFlipX(true)
            .setScale(0.5, 0.5)

        this.add.image(370, 350, 'imageHim3').setScale(0.45, 0.45)

        this.add.image(450, 60, 'top3').setScale(0.7, 0.7)
        this.add.image(450, 540, 'bottom3').setScale(0.7, 0.7)


        this.input.keyboard.on('keydown-SPACE', () => {
            this.cameras.main.fadeOut(500)
            this.scene.start(CREDIT_4)
        })
    }
}
