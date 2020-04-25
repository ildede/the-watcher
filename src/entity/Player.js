import 'phaser'

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spriteKey, frame) {
        super(scene, x, y, spriteKey, frame)

        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.world.enable(this)

        this.setSize(30, 28)
        this.setOffset(0, 38)
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
            this.anims.play("misa-left-walk", true);
        } else if (cursors.right.isDown) {
            this.anims.play("misa-right-walk", true);
        } else if (cursors.up.isDown) {
            this.anims.play("misa-back-walk", true);
        } else if (cursors.down.isDown) {
            this.anims.play("misa-front-walk", true);
        } else {
            this.anims.stop();

            // If we were moving, pick and idle frame to use
            if (prevVelocity.x < 0) this.setTexture("atlas", "misa-left");
            else if (prevVelocity.x > 0) this.setTexture("atlas", "misa-right");
            else if (prevVelocity.y < 0) this.setTexture("atlas", "misa-back");
            else if (prevVelocity.y > 0) this.setTexture("atlas", "misa-front");
        }
    }
}
