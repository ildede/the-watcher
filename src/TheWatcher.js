import 'phaser'
import BootScene from "./scenes/BootScene";
import TitleScene from "./scenes/TitleScene";
import WorldScene from "./scenes/WorldScene";
import UIScene from "./scenes/UIScene";
import TransitionScene from "./scenes/TransitionScene";

class TheWatcher extends Phaser.Game {
    constructor(phaserConfig) {
        super(phaserConfig);

        this.scene.add('BootScene', BootScene)
        this.scene.add('TitleScene', TitleScene)
        this.scene.add('WorldScene', WorldScene)
        this.scene.add('UIScene', UIScene)
        this.scene.add('TransitionScene', TransitionScene)

        this.scene.start('BootScene')
    }
}

export default TheWatcher
