import 'phaser'
import {TRANSITION_SCENE, UI_SCENE} from "../TheWatcher";
import {
  ANNIVERSARY,
  APPOINTMENT,
  ARRIVAL,
  B_DAY,
  BAR,
  BEFORE_PARTY,
  CREDITS,
  DINNER,
  DOG,
  MARRY_ME,
  MOVING_TOGETHER,
  NIGHT_OUT,
  PARTY,
  WHAT_ARE_WE
} from "../config/levels";

export default class TransitionScene extends Phaser.Scene {
  constructor() {
    super(TRANSITION_SCENE);
  }

  create(data) {
    this.levelConfig = data
    const levels = [ARRIVAL, BEFORE_PARTY, PARTY, APPOINTMENT, BAR, DINNER, NIGHT_OUT, WHAT_ARE_WE, ANNIVERSARY, MARRY_ME, MOVING_TOGETHER, DOG, B_DAY, CREDITS]
    const prevLevel = levels[levels.indexOf(this.levelConfig.level)];
    const nextLevel = levels[levels.indexOf(this.levelConfig.level)+1];

    this.add.text(140, 100, 'THE WATCHER', { fontSize: '70px' })
    this.add.text(225, 300, `Prev level: ${prevLevel.name}`, { fontSize: '30px' })
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
