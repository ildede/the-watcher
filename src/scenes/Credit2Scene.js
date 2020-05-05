import 'phaser'
import {CREDIT_2, CREDIT_3} from "../TheWatcher";
import creditTopPng from "../assets/title/2/2-top.png";
import creditBottomPng from "../assets/title/2/2-bottom.png";
import imageHimPng from "../assets/title/2/him.png";
import imageAnim2Png from "../assets/title/2/star.png";
import * as imageAnim2Json from "../assets/title/2/star.json";

export default class Credit1Scene extends Phaser.Scene {
    constructor() {
        super(CREDIT_2)
    }

    preload() {
        this.load.image('top2', creditTopPng)
        this.load.image('bottom2', creditBottomPng)
        this.load.atlas('imageAnim2', imageAnim2Png, imageAnim2Json)
        this.load.image('imageHim2', imageHimPng)
    }

    create() {
        this.add.image(450, 300, 'creditsBg')

        this.anims.create({key: 'starAnim', frames: this.anims.generateFrameNames('imageAnim2'), repeat: -1, frameRate: 12, yoyo: true});
        this.add.sprite(450, 300, 'imageAnim2').play('starAnim')
        this.add.image(450, 300, 'imageHim2')

        this.add.image(450, 85, 'top2')
        this.add.image(450, 515, 'bottom2')

        this.input.keyboard.on('keydown-SPACE', () => {
            this.cameras.main.fadeOut(500)
            this.scene.start(CREDIT_3)
        })
    }
}
