import 'phaser'

export default class TransitionScene extends Phaser.Scene {
  constructor() {
    super('TransitionScene');
  }

  create(data) {
    console.log('Create TransitionScene')
    console.log(data);
    this.levelConfig = data

    this.add.text(83,100, `Yeah!`, {fontSize: '50px'});
    this.add.text(100,240, `Position x: ${this.levelConfig.x}`, {fontSize: '30px'})
    this.add.text(100,280, `Position y: ${this.levelConfig.y}`, {fontSize: '30px'})
    this.add.text(100,340, 'Wait a moment...', {fontSize: '30px'})

    this.time.addEvent({
      delay: 0,
      callback: () => {
        this.scene.start('WorldScene', this.levelConfig);
        this.scene.wake('UIScene')
        this.scene.bringToTop('UIScene')
      }
    })
  }

}
