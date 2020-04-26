import 'phaser'

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spriteKey, frame) {
        super(scene, x, y, spriteKey, frame)

        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.world.enable(this)

        this.spriteKey = spriteKey

        this.setScale(1.6, 1.6)
        this.setSize(14, 15)
        this.setOffset(8, 17)
        this.createAnimations()
    }

    update(cursors) {
        this.updateMovement(cursors)
    }

    updateMovement(cursors) {
        const speed = 175;
        const prevVelocity = this.body.velocity.clone();

        // Stop any previous movement from the last frame
        this.body.setVelocity(0);

        // Horizontal movement
        if (cursors.left.isDown) {
            this.body.setVelocityX(-speed);
        } else if (cursors.right.isDown) {
            this.body.setVelocityX(speed);
        }

        // Vertical movement
        if (cursors.up.isDown) {
            this.body.setVelocityY(-speed);
        } else if (cursors.down.isDown) {
            this.body.setVelocityY(speed);
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.body.velocity.normalize().scale(speed);

        // Update the animation last and give left/right animations precedence over up/down animations
        if (cursors.left.isDown) {
            this.anims.play("left-walk", true);
        } else if (cursors.right.isDown) {
            this.anims.play("right-walk", true);
        } else if (cursors.up.isDown) {
            this.anims.play("back-walk", true);
        } else if (cursors.down.isDown) {
            this.anims.play("front-walk", true);
        } else {
            this.anims.stop();

            // If we were moving, pick and idle frame to use
            if (prevVelocity.x < 0) this.setTexture(this.spriteKey, "left");
            else if (prevVelocity.x > 0) this.setTexture(this.spriteKey, "right");
            else if (prevVelocity.y < 0) this.setTexture(this.spriteKey, "back");
            else if (prevVelocity.y > 0) this.setTexture(this.spriteKey, "front");
        }
    }

    createAnimations() {
        const anims = this.scene.anims;
        anims.create({
            key: "left-walk",
            frames: anims.generateFrameNames(this.spriteKey, {
                prefix: "left-walk.",
                start: 0,
                end: 3,
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "right-walk",
            frames: anims.generateFrameNames(this.spriteKey, {
                prefix: "right-walk.",
                start: 0,
                end: 3,
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "front-walk",
            frames: anims.generateFrameNames(this.spriteKey, {
                prefix: "front-walk.",
                start: 0,
                end: 3,
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "back-walk",
            frames: anims.generateFrameNames(this.spriteKey, {
                prefix: "back-walk.",
                start: 0,
                end: 3,
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
    }
}
