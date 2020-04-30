import 'phaser'
import {DIALOG_SCENE, TRANSITION_SCENE, UI_SCENE, WORLD_SCENE} from "../TheWatcher";

export const ARRIVAL =          {name: '01_arrival',          scene: 'WorldScene'  }
export const BEFORE_PARTY =     {name: '02_before_party',     scene: 'WorldScene'  }
export const PARTY =            {name: '03_party',            scene: 'WorldScene'  }
export const APPOINTMENT =      {name: '04_appointment',      scene: 'DialogScene' }
export const BAR =              {name: '05_bar',              scene: 'WorldScene'  }
export const DINNER =           {name: '06_dinner',           scene: 'DialogScene' }
export const NIGHT_OUT =        {name: '07_night_out',        scene: 'DialogScene' }
export const WHAT_ARE_WE =      {name: '08_what_are_we',      scene: 'WorldScene'  }
export const ANNIVERSARY =      {name: '09_anniversary',      scene: 'WorldScene'  }
export const MARRY_ME =         {name: '10_marry_me',         scene: 'WorldScene'  }
export const MOVING_TOGETHER =  {name: '11_moving_together',  scene: 'WorldScene'  }
export const DOG =              {name: '12_dog',              scene: 'WorldScene'  }
export const B_DAY =            {name: '13_b_day',            scene: 'WorldScene'  }
export const CREDITS =          {name: '14_credits',          scene: 'WorldScene'  }

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

    console.log('Transition Scene, before add timedEvent')
    console.log('prev', prevLevel)
    console.log('next', nextLevel)
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
