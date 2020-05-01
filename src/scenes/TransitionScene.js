import 'phaser'
import {TRANSITION_SCENE, UI_SCENE} from "../TheWatcher";

export default class TransitionScene extends Phaser.Scene {
  constructor() {
    super(TRANSITION_SCENE);
  }

  create(data) {
    const nextLevel = data.level.next()

    this.add.text(140, 100, 'THE WATCHER', { fontSize: '70px' })
    this.add.text(225, 300, `Prev level: ${data.level.name}`, { fontSize: '30px' })
    this.add.text(225, 340, `Next level: ${nextLevel.name}`, { fontSize: '30px' })

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.start(nextLevel.scene, { level: nextLevel });
        this.scene.wake(UI_SCENE)
        this.scene.bringToTop(UI_SCENE)
      }
    })
  }

}
