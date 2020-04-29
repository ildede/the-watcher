import 'phaser'

export default class Sign extends Phaser.GameObjects.Sprite {

    constructor(scene, object) {
        super(scene, object.x, object.y, 'atlas')

        this.setOrigin(0,0)
        this.width = object.width
        this.height = object.height

        this.visible = false

        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.world.enable(this)

        this.stringId = () => object.properties?.find(e => e.name === 'stringId')?.value
        this.showOnce = () => object.properties?.find(e => e.name === 'showOnce')?.value
        this.stringIdRequired = () => object.properties?.find(e => e.name === 'stringIdRequired')?.value
    }
}
