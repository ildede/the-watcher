import 'phaser'
import {TRANSITION_SCENE, UI_SCENE, WORLD_SCENE} from "../TheWatcher";
import i18next from "i18next";

export default class TransitionScene extends Phaser.Scene {
  constructor() {
    super(TRANSITION_SCENE);
  }

  create(data) {
    const nextLevel = data.level.next()
    console.debug(`Prev level: ${data.level.name}\nNext level: ${nextLevel.name}`)

    i18next
        .init({
          lng: this.scene.get(UI_SCENE).uiConfig.language,
          resources: this.cache.json.get('langResource')
        }).then(function (t) {
          console.debug('i18next initialized')
        })

    this.add.text(100, 140, i18next.t(nextLevel.transition), { fontSize: '30px' })

    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.scene.start(nextLevel.scene, { level: nextLevel });
        this.scene.wake(UI_SCENE)
        this.scene.bringToTop(UI_SCENE)
      }
    })

  }

}
