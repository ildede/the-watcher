import 'phaser'
import Character from "./Character";

export default class Player extends Character {
    constructor(scene, x, y, spriteKey, frame) {
        super(scene, x, y, spriteKey, frame, false, {})

        this.speed = 175

        this.setSize(this.width/2, this.height/2)
        this.setOffset(this.width/4, this.height/2)

        this.followers = []
        this.path = []
    }

    update(cursors) {
        this.path.push(new Phaser.Geom.Point(this.x,this.y))
        this.updateMovement(cursors)
        this.followers.forEach(follower => {
            if (this.path.length > 20) {
                let newX = this.path[this.path.length-20].x;
                let newY = this.path[this.path.length-20].y;
                follower.scene.physics.moveTo(follower, newX, newY, 175)
            }
        }, this)
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
            // If we were moving, pick and idle frame to use
            this.stopAnimation(prevVelocity);
            this.followers.forEach(follower => {
                follower.body.reset(follower.x, follower.y)
            }, this)
        }
    }

    stopAnimation(prevVelocity) {
        this.anims.stop();
        if (prevVelocity.x < 0) this.setTexture(this.spriteKey, "left");
        else if (prevVelocity.x > 0) this.setTexture(this.spriteKey, "right");
        else if (prevVelocity.y < 0) this.setTexture(this.spriteKey, "back");
        else if (prevVelocity.y > 0) this.setTexture(this.spriteKey, "front");
    }

    stop() {
        const prevVelocity = this.body.velocity.clone();
        this.body.setVelocity(0);
        this.stopAnimation(prevVelocity)
        this.followers.forEach(follower => {
            follower.body.reset(follower.x, follower.y)
        }, this)
    }

    addFollower(character) {
        this.followers.push(character)
    }
    removeFollowers() {
        this.followers = []
    }
}
