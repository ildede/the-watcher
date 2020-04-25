import 'phaser'

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene')
    }

    create() {
        console.log('Create BootScene')
        this.scene.start('TitleScene')
    }
}
