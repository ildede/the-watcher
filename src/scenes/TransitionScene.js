import 'phaser'
import {TRANSITION_SCENE, UI_SCENE, WORLD_SCENE} from "../TheWatcher";

export default class TransitionScene extends Phaser.Scene {
  constructor() {
    super(TRANSITION_SCENE);
  }

  create(data) {
    this.levelConfig = data

    this.add.text(83,100, `Yeah!`, {fontSize: '50px'});
    this.add.text(100,240, `Position x: ${this.levelConfig.x}`, {fontSize: '30px'})
    this.add.text(100,280, `Position y: ${this.levelConfig.y}`, {fontSize: '30px'})
    this.add.text(100,340, 'Wait a moment...', {fontSize: '30px'})

    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.scene.start(WORLD_SCENE, this.levelConfig);
        this.scene.wake(UI_SCENE)
        this.scene.bringToTop(UI_SCENE)
      }
    })
  }

}
