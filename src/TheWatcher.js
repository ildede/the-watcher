import 'phaser'
import BootScene from "./scenes/BootScene";
import TitleScene from "./scenes/TitleScene";
import WorldScene from "./scenes/WorldScene";
import UIScene from "./scenes/UIScene";
import TransitionScene from "./scenes/TransitionScene";
import DialogScene from "./scenes/DialogScene";

export const BOOT_SCENE = 'BootScene';
export const TITLE_SCENE = 'TitleScene';
export const WORLD_SCENE = 'WorldScene';
export const DIALOG_SCENE = 'DialogScene';
export const UI_SCENE = 'UIScene';
export const TRANSITION_SCENE = 'TransitionScene';

class TheWatcher extends Phaser.Game {
    constructor(phaserConfig) {
        super(phaserConfig);

        this.scene.add(BOOT_SCENE, BootScene)
        this.scene.add(TITLE_SCENE, TitleScene)
        this.scene.add(WORLD_SCENE, WorldScene)
        this.scene.add(DIALOG_SCENE, DialogScene)
        this.scene.add(UI_SCENE, UIScene)
        this.scene.add(TRANSITION_SCENE, TransitionScene)

        this.scene.start(BOOT_SCENE)
    }
}

export default TheWatcher
