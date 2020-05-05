import 'phaser'
import Player from "../entity/Player";
import Message from "../entity/Message";
import Character from "../entity/Character";
import {TRANSITION_SCENE, UI_SCENE, WORLD_SCENE} from "../TheWatcher";
import Her from "../entity/Her";
import townMusicMp3 from '../assets/audio/01Mainmap/Pleasant_Creek.mp3';
import townMusicWav from '../assets/audio/01Mainmap/Pleasant_Creek_Loop.wav';
import partyBeginMp3 from '../assets/audio/02PartyBegin/Project_2.mp3';
import afterPartyMp3 from '../assets/audio/03Afterparty/fwid.MP3';
import snowMusicMp3 from '../assets/audio/07SnowMap/Winter_Snow.mp3';
import snowMusicOgg from '../assets/audio/07SnowMap/Winter_Snow.ogg';
import gardenMusicMp3 from '../assets/audio/08Garden/Shake_and_Bake.mp3';
import gardenLastPartyMp3 from '../assets/audio/09Finalparty/Of_Far_Different_Nature_Funky_House.mp3';

export default class WorldScene extends Phaser.Scene {
    constructor() {
        super(WORLD_SCENE)
        this.fillCurrentMap = this.fillCurrentMap.bind(this)
    }

    preload() {
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 420, 50);
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        const assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 400 * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        this.load.audio('townMusic', [townMusicWav, townMusicMp3]);
        this.load.audio('partyBegin', [partyBeginMp3]);
        this.load.audio('afterParty', [afterPartyMp3]);
        this.load.audio('snowMusic', [snowMusicOgg, snowMusicMp3]);
        this.load.audio('gardenMusic', [gardenMusicMp3]);
        this.load.audio('gardenLastParty', [gardenLastPartyMp3]);
    }

    create(data) {
        this.levelConfig = data
        this.dialogOpen = false
        console.debug(WORLD_SCENE, this.levelConfig)

        if (this.levelConfig.level.music) {
            this.music = this.sound.add(this.levelConfig.level.music)
            this.music.play({loop: true})
        }

        //-- Draw map and game objects
        const map = this.make.tilemap({ key: this.levelConfig.level.map })
        const tileset = []
        this.levelConfig.level.tiles.forEach(e => {
            tileset.push(map.addTilesetImage(e, e, this.levelConfig.level.tileSize, this.levelConfig.level.tileSize, 1, 2))
        })

        const bottom = map.createStaticLayer("Bottom", tileset, 0, 0)
        const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0)
        const worldBottom = map.createStaticLayer("World Bottom", tileset, 0, 0)
        const worldMiddle = map.createStaticLayer("World Middle", tileset, 0, 0)
        const worldUp = map.createStaticLayer("World Up", tileset, 0, 0)
        const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0)
        const top = map.createStaticLayer("Top", tileset, 0, 0)
        const levelLayer = map.getObjectLayer(this.levelConfig.level.name)
        const objectLayer = map.getObjectLayer('Objects')
        aboveLayer.setDepth(50)
        top.setDepth(60)

        this.readableSigns = this.physics.add.group()
        this.systemMessage = this.physics.add.group()
        this.npc = this.physics.add.staticGroup()
        this.movablenpc = this.physics.add.group()

        objectLayer.objects.forEach(this.fillCurrentMap())
        levelLayer.objects.forEach(this.fillCurrentMap())


        //-- Collisions
        this.physics.world.bounds.width = map.widthInPixels
        this.physics.world.bounds.height = map.heightInPixels
        worldUp.setCollisionByProperty({ collide: true })
        worldMiddle.setCollisionByProperty({ collide: true })
        worldBottom.setCollisionByProperty({ collide: true })
        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, [worldUp,worldBottom,worldMiddle])
        this.physics.add.collider(this.player, [this.npc],
            (player, item) => {
                if (!this.dialogOpen) {
                    if (item.lastVisit === undefined || (item.lastVisit && (Date.now() - item.lastVisit) / 1000 > item.interval())) {
                        item.lastVisit = Date.now()
                        this.events.emit('talkTo', item)
                    }
                }
            })
        this.physics.add.overlap(this.player, [this.systemMessage, this.movablenpc],
            (player, item) => {
                if (!this.dialogOpen) {
                    if (item.lastVisit === undefined || (item.lastVisit && (Date.now() - item.lastVisit) / 1000 > item.interval())) {
                        item.lastVisit = Date.now()
                        this.events.emit('systemMessage', item)
                    }
                }
            })


        //-- Camera rules
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player)
        this.cameras.main.setZoom(
            Array.isArray(map.properties)
                ? map.properties?.find(e => e.name === 'zoom')?.value || 1.7
                : 1.7
        )


        //-- Event listener
        const uiScene = this.scene.get(UI_SCENE)
        uiScene.events.once('startTransition', () => {
            this.cameras.main.fadeOut(500)
            if (this.music?.isPlaying) {
                this.music.stop()
                this.music.destroy()
            }
            this.time.addEvent({
                    delay: 500,
                    callback: () => {
                        this.events.off('update')
                        this.scene.sleep(UI_SCENE)
                        this.scene.start(TRANSITION_SCENE, this.levelConfig)
                    }
                })
        }, this)


        //-- Input rules
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown_SPACE', this.playerAction());

        // console.debug('D: Turn on physics debugging to show player\'s hitbox')
        // this.input.keyboard.once("keydown_D", event => {
        //     // Turn on physics debugging to show player's hitbox
        //     this.physics.world.createDebugGraphic();
        //
        //     // Create worldLayer collision graphic above the player, but below the help text
        //     const graphics = this.add
        //         .graphics()
        //         .setAlpha(0.75)
        //         .setDepth(20);
        //     worldUp.renderDebug(graphics, {
        //         tileColor: null, // Color of non-colliding tiles
        //         collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //         faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        //     });
        //     worldMiddle.renderDebug(graphics, {
        //         tileColor: null, // Color of non-colliding tiles
        //         collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //         faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        //     });
        //     worldBottom.renderDebug(graphics, {
        //         tileColor: null, // Color of non-colliding tiles
        //         collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //         faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        //     });
        // });

        this.events.on('dialogStart', (box) => {
            this.dialogOpen = true
            this.input.keyboard.off('keydown_SPACE');
            this.input.keyboard.on('keydown_SPACE', this.continueDialog(box));
        })
        this.events.on('dialogEnd', () => {
            this.dialogOpen = false
            this.input.keyboard.off('keydown_SPACE');
            this.input.keyboard.on('keydown_SPACE', this.playerAction());
        })

        this.events.on('npc_delete_her', () => {
            this.npc.getChildren().forEach(npc => {
                if (npc.spriteKey === 'her') {
                    npc.destroy()
                }
            })
        })
        this.events.on('npc_move_her_up', () => {
            this.movablenpc.getChildren().forEach(npc => {
                if (npc.spriteKey === 'her') {
                    npc.up()
                    npc.body.setVelocityY(-175)
                }
            })
        })
        this.events.on('npc_move_her_right', () => {
            this.player.removeFollowers()
            this.movablenpc.getChildren().forEach(npc => {
                if (npc.spriteKey === 'her') {
                    npc.right()
                    npc.body.setVelocityX(175)
                }
            })
        })
        this.events.on('npc_move_her_down_and_close', () => {
            this.movablenpc.getChildren().forEach(npc => {
                if (npc.spriteKey === 'her') {
                    npc.down()
                    npc.body.setVelocityY(175)
                }
                uiScene.events.emit('startTransition')
            })
        })
        this.events.on('npc_follow_me', () => {
            this.movablenpc.getChildren().forEach(npc => {
                if (npc.spriteKey === 'her' || npc.spriteKey === 'orange') {
                    this.player.addFollower(npc)
                }
            })
        })
        this.events.on('npc_come_to_me', () => {
            this.player.left()
            this.her.right()
            this.physics.moveToObject(this.her, this.herTarget, 100)
        })
        this.events.on('her_look_down', () => {
            this.her.down()
            this.her.anims.stop()
        })
        this.events.on('npc_go_to_house', () => {
            this.movablenpc.getChildren().forEach(npc => {
                if (npc.spriteKey === 'her') {
                    this.player.removeFollowers()
                    this.physics.moveToObject(npc, this.herTarget, 175)
                }
            })
        })
    }

    update(time, delta) {
        if (!this.dialogOpen) {
            this.player.update(this.cursors)
        } else {
            this.player.stop()
        }

        if (this.herTarget && this.her) {
            let distance = Phaser.Math.Distance.Between(this.her.x, this.her.y, this.herTarget.x, this.herTarget.y)
            if (this.her?.body.speed > 0) {
                if (distance < 4) {
                    this.her.body.reset(this.herTarget.x, this.herTarget.y)
                    if (this.levelConfig.level.name !== 'b2_party_begin') {
                        this.her.destroy()
                        this.her = null
                    } else {
                        this.her.anims.stop()
                    }
                }
            }
        }
    }

    continueDialog(box) { return () => this.events.emit('continueDialog', box) }
    playerAction() { return () => {
        this.physics.overlap(this.player, this.readableSigns,
            (player, item) => this.events.emit('readSign', item))
    }}
    fillCurrentMap() {
        return (object) => {
            if (object.type === 'sign') {
                this.readableSigns.add(new Message(this, object))
            }
            if (object.type === 'message') {
                this.systemMessage.add(new Message(this, object))
            }
            if (object.type === 'him') {
                this.systemMessage.add(new Message(this, object))
            }
            if (object.type === 'her') {
                this.systemMessage.add(new Message(this, object))
            }
            if (object.type === 'target') {
                this.herTarget = new Phaser.Math.Vector2(object.x, object.y)
            }
            if (object.type === 'npc') {
                if (object.name === 'her') {
                    if (object.properties?.find(e => e.name === 'movable')?.value) {
                        this.her = new Her(this, object.x, object.y, object.name,
                            Array.isArray(object.properties)
                                ? object.properties?.find(e => e.name === 'direction')?.value || "front"
                                : "front"
                            , false, object).setImmovable()
                        this.movablenpc.add(this.her)
                    } else {
                        this.her = new Her(this, object.x, object.y, object.name,
                            Array.isArray(object.properties)
                                ? object.properties?.find(e => e.name === 'direction')?.value || "front"
                                : "front"
                            , true, object)
                        this.npc.add(this.her)
                    }
                } else {
                    if (object.properties?.find(e => e.name === 'movable')?.value) {
                        this.movablenpc.add(new Character(this, object.x, object.y, object.name,
                            Array.isArray(object.properties)
                                ? object.properties?.find(e => e.name === 'direction')?.value || "front"
                                : "front"
                            , false, object))
                    } else {
                        this.npc.add(new Character(this, object.x, object.y, object.name,
                            Array.isArray(object.properties)
                                ? object.properties?.find(e => e.name === 'direction')?.value || "front"
                                : "front"
                            , true, object))
                    }
                }
            }
            if (object.type === 'spawn') {
                const spawnPoint = this.levelConfig.x && this.levelConfig.y
                    ? {x: this.levelConfig.x, y: this.levelConfig.y}
                    : {x: object.x, y: object.y}
                this.player = new Player(this, spawnPoint.x, spawnPoint.y, "him",
                    Array.isArray(object.properties)
                        ? object.properties?.find(e => e.name === 'direction')?.value || "front"
                        : "front")
                this.player.setDepth(5)
            }
        };
    }
}

