import 'phaser'

export default class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spriteKey, frame, isStatic, object) {
        super(scene, x, y, spriteKey, frame)

        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this, isStatic)

        this.setSize(this.width/2, this.height)

        this.spriteKey = spriteKey

        this.createAnimations()

        this.stringId = () => object.properties?.find(e => e.name === 'stringId')?.value || '...'
        this.dialogs = () => object.properties?.find(e => e.name === 'dialogs')?.value
        this.showOnce = () => object.properties?.find(e => e.name === 'showOnce')?.value
        this.interval = () => object.properties?.find(e => e.name === 'interval')?.value || 5
        this.endScene = () => object.properties?.find(e => e.name === 'endScene')?.value
        this.stringIdRequired = () => object.properties?.find(e => e.name === 'stringIdRequired')?.value
        this.stringIdThatDisableThis = () => object.properties?.find(e => e.name === 'stringIdThatDisableThis')?.value
    }

    down() { this.anims.play(this.spriteKey+"front-walk", true) }
    up() { this.anims.play(this.spriteKey+"back-walk", true) }
    right() { this.anims.play(this.spriteKey+"right-walk", true) }
    left() { this.anims.play(this.spriteKey+"left-walk", true) }

    createAnimations() {
        const anims = this.scene.anims;
        anims.create({
            key: this.spriteKey+"left-walk",
            frames: anims.generateFrameNames(this.spriteKey, {
                prefix: "left-walk.",
                start: 0,
                end: 2
            }),
            frameRate: 7,
            repeat: -1
        });
        anims.create({
            key: this.spriteKey+"right-walk",
            frames: anims.generateFrameNames(this.spriteKey, {
                prefix: "right-walk.",
                start: 0,
                end: 3
            }),
            frameRate: 7,
            repeat: -1
        });
        anims.create({
            key: this.spriteKey+"front-walk",
            frames: anims.generateFrameNames(this.spriteKey, {
                prefix: "front-walk.",
                start: 0,
                end: 2
            }),
            frameRate: 7,
            repeat: -1
        });
        anims.create({
            key: this.spriteKey+"back-walk",
            frames: anims.generateFrameNames(this.spriteKey, {
                prefix: "back-walk.",
                start: 0,
                end: 2
            }),
            frameRate: 7,
            repeat: -1
        });
    }
}
