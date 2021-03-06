import 'phaser'

export default class Message extends Phaser.GameObjects.Sprite {

    constructor(scene, object) {
        super(scene, object.x, object.y, 'atlas')

        this.setOrigin(0,0)
        this.setDisplaySize(object.width, object.height)

        this.visible = false

        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.world.enable(this)

        this.messageType = object.type
        this.stringId = () => object.properties?.find(e => e.name === 'stringId')?.value
        this.dialogs = () => object.properties?.find(e => e.name === 'dialogs')?.value
        this.showOnce = () => object.properties?.find(e => e.name === 'showOnce')?.value
        this.interval = () => object.properties?.find(e => e.name === 'interval')?.value || 2
        this.endScene = () => object.properties?.find(e => e.name === 'endScene')?.value
        this.stringIdRequired = () => object.properties?.find(e => e.name === 'stringIdRequired')?.value
        this.stringIdThatDisableThis = () => object.properties?.find(e => e.name === 'stringIdThatDisableThis')?.value
    }
}
