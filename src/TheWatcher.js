import 'phaser'
import BootScene from "./scenes/BootScene";
import TitleScene from "./scenes/TitleScene";
import WorldScene from "./scenes/WorldScene";
import UIScene from "./scenes/UIScene";
import TransitionScene from "./scenes/TransitionScene";
import DialogScene from "./scenes/DialogScene";
import RestaurantScene from "./scenes/RestaurantScene";
import ParkScene from "./scenes/ParkScene";
import EndTitleScene from "./scenes/EndTitleScene";
import Credit1Scene from "./scenes/Credit1Scene";
import Credit2Scene from "./scenes/Credit2Scene";
import Credit3Scene from "./scenes/Credit3Scene";
import Credit4Scene from "./scenes/Credit4Scene";
import Credit5Scene from "./scenes/Credit5Scene";

export const BOOT_SCENE = 'BootScene';
export const TITLE_SCENE = 'TitleScene';
export const END_TITLE_SCENE = 'EndTitleScene';
export const CREDIT_1 = 'Credit1Scene';
export const CREDIT_2 = 'Credit2Scene';
export const CREDIT_3 = 'Credit3Scene';
export const CREDIT_4 = 'Credit4Scene';
export const CREDIT_5 = 'Credit5Scene';
export const WORLD_SCENE = 'WorldScene';
export const DIALOG_SCENE = 'DialogScene';
export const RESTAURANT_SCENE = 'RestaurantScene';
export const PARK_SCENE = 'ParkScene';
export const UI_SCENE = 'UIScene';
export const TRANSITION_SCENE = 'TransitionScene';

class TheWatcher extends Phaser.Game {
    constructor(phaserConfig) {
        super(phaserConfig);

        this.scene.add(BOOT_SCENE, BootScene)
        this.scene.add(TITLE_SCENE, TitleScene)
        this.scene.add(WORLD_SCENE, WorldScene)
        this.scene.add(DIALOG_SCENE, DialogScene)
        this.scene.add(RESTAURANT_SCENE, RestaurantScene)
        this.scene.add(PARK_SCENE, ParkScene)
        this.scene.add(UI_SCENE, UIScene)
        this.scene.add(TRANSITION_SCENE, TransitionScene)

        this.scene.add(END_TITLE_SCENE, EndTitleScene)
        this.scene.add(CREDIT_1, Credit1Scene)
        this.scene.add(CREDIT_2, Credit2Scene)
        this.scene.add(CREDIT_3, Credit3Scene)
        this.scene.add(CREDIT_4, Credit4Scene)
        this.scene.add(CREDIT_5, Credit5Scene)

        this.scene.start(BOOT_SCENE)
    }
}

export default TheWatcher
