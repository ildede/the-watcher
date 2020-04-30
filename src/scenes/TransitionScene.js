import 'phaser'
import {TRANSITION_SCENE, UI_SCENE, WORLD_SCENE} from "../TheWatcher";

export const ARRIVAL =          {name: '01_arrival'}
export const BEFORE_PARTY =     {name: '02_before_party'}
export const PARTY =            {name: '03_party'}
export const APPOINTMENT =      {name: '04_appointment'}
export const BAR =              {name: '05_bar'}
export const DINNER =           {name: '06_dinner'}
export const NIGHT_OUT =        {name: '07_night_out'}
export const WHAT_ARE_WE =      {name: '08_what_are_we'}
export const ANNIVERSARY =      {name: '09_anniversary'}
export const MARRY_ME =         {name: '10_marry_me'}
export const MOVING_TOGETHER =  {name: '11_moving_together'}
export const DOG =              {name: '12_dog'}
export const B_DAY =            {name: '13_b_day'}
export const CREDITS =          {name: '14_credits'}

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
        this.scene.start(WORLD_SCENE, { level: nextLevel });
        this.scene.wake(UI_SCENE)
        this.scene.bringToTop(UI_SCENE)
      }
    })
  }

}
