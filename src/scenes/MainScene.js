import 'phaser'

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene')
    }

    create() {
        console.log('Create MainScene')
        this.scene.start('TitleScene')
    }
}
