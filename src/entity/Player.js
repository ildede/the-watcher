import 'phaser'
import Character from "./Character";

export default class Player extends Character {
    constructor(scene, x, y, spriteKey, frame) {
        super(scene, x, y, spriteKey, frame)

        this.speed = 175
    }

    update(cursors) {
        this.updateMovement(cursors)
    }

    updateMovement(cursors) {
        const prevVelocity = this.body.velocity.clone();

        // Stop any previous movement from the last frame
        this.body.setVelocity(0);

        // Horizontal movement
        if (cursors.left.isDown) {
            this.body.setVelocityX(-this.speed);
        } else if (cursors.right.isDown) {
            this.body.setVelocityX(this.speed);
        }

        // Vertical movement
        if (cursors.up.isDown) {
            this.body.setVelocityY(-this.speed);
        } else if (cursors.down.isDown) {
            this.body.setVelocityY(this.speed);
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.body.velocity.normalize().scale(this.speed);

        // Update the animation last and give left/right animations precedence over up/down animations
        if (cursors.left.isDown) {
            this.left()
        } else if (cursors.right.isDown) {
            this.right()
        } else if (cursors.up.isDown) {
            this.up()
        } else if (cursors.down.isDown) {
            this.down()
        } else {
            this.anims.stop();

            // If we were moving, pick and idle frame to use
            if (prevVelocity.x < 0) this.setTexture(this.spriteKey, "left");
            else if (prevVelocity.x > 0) this.setTexture(this.spriteKey, "right");
            else if (prevVelocity.y < 0) this.setTexture(this.spriteKey, "back");
            else if (prevVelocity.y > 0) this.setTexture(this.spriteKey, "front");
        }
    }
}
