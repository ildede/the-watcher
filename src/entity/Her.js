import 'phaser'
import Character from "./Character";

export default class Her extends Character {
    constructor(scene, x, y, spriteKey, frame, isStatic, object) {
        super(scene, x, y, spriteKey, frame, isStatic, object)

        this.messageType = 'her'
    }
}
