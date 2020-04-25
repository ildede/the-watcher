import 'phaser'
import townPng from "../assets/tileset/tileset.png";
import atlasPng from "../assets/atlas/atlas.png";
import Player from "../entity/Player";
import Sign from "../entity/Sign";

const townJson = require('../assets/main-town/town.json');
const atlasJson = require('../assets/atlas/atlas.json');

export default class WorldScene extends Phaser.Scene {
    constructor() {
        super('WorldScene')
    }

    preload() {
        this.load.image("tiles", townPng)
        this.load.tilemapTiledJSON("map", townJson)
        this.load.atlas("atlas", atlasPng, atlasJson)
    }

    create(data) {
        console.log('Create WorldScene')
        console.log(data)
        this.levelConfig = data

        this.cameras.main.fadeIn(500)

        const map = this.make.tilemap({ key: "map" })
        const tileset = map.addTilesetImage("watcherbase", "tiles")

        const bottom = map.createStaticLayer("Bottom", tileset, 0, 0)
        const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0)
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0)
        const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0)
        aboveLayer.setDepth(10)

        const spawnPoint = this.levelConfig.x && this.levelConfig.y
            ? { x: this.levelConfig.x, y: this.levelConfig.y }
            : map.findObject("Objects", obj => obj.name === "Spawn Point")

        this.player = new Player(this, spawnPoint.x, spawnPoint.y, "atlas", "misa-front")

        worldLayer.setCollisionByProperty({ collide: true })

        this.physics.world.bounds.width = map.widthInPixels
        this.physics.world.bounds.height = map.heightInPixels

        this.physics.add.collider(this.player, worldLayer)

        this.readableSigns = this.physics.add.group()

        const objectLayer = map.getObjectLayer('Objects')
        objectLayer.objects.forEach((object) => {
            if (object.type === 'sign') {
                this.readableSigns.add(new Sign(this, object))
            }
        })

        this.physics.add.collider(
            this.player,
            this.readableSigns,
            this.startDialogue,
            null,
            this
        )

        this.player.setCollideWorldBounds(true)

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player)

        this.cursors = this.input.keyboard.createCursorKeys();

        this.createAnimations();

        this.input.keyboard.once("keydown_D", event => {
            // Turn on physics debugging to show player's hitbox
            this.physics.world.createDebugGraphic();

            // Create worldLayer collision graphic above the player, but below the help text
            const graphics = this.add
                .graphics()
                .setAlpha(0.75)
                .setDepth(20);
            worldLayer.renderDebug(graphics, {
                tileColor: null, // Color of non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });
        });


        this.input.keyboard.once("keydown_S", event => {
            console.log('S')
            this.cameras.main.fadeOut(0)
            this.time.addEvent({
                delay: 0,
                callback: () => {
                    this.events.off('update')
                    this.scene.sleep('UIScene')
                    this.scene.start('TransitionScene', { x: this.player.x, y: this.player.y, new: this.levelConfig.new })
                }
            })
        });

        const uiScene = this.scene.get('UIScene')
        uiScene.events.once(
            'startTransition',
            function() {
                this.cameras.main.fadeOut(500)
                this.time.addEvent({
                    delay: 500,
                    callback: () => {
                        this.events.off('update')
                        this.scene.sleep('UIScene')
                        this.scene.start('TransitionScene')
                    }
                })
            },
            this
        )

        if (this.levelConfig.new) {
            this.events.emit('newGame')
            this.levelConfig.new = false
        }
    }

    update(time, delta) {
        this.player.update(this.cursors)
    }

    createAnimations() {
        const anims = this.anims;
        anims.create({
            key: "misa-left-walk",
            frames: anims.generateFrameNames("atlas", {
                prefix: "misa-left-walk.",
                start: 0,
                end: 3,
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "misa-right-walk",
            frames: anims.generateFrameNames("atlas", {
                prefix: "misa-right-walk.",
                start: 0,
                end: 3,
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "misa-front-walk",
            frames: anims.generateFrameNames("atlas", {
                prefix: "misa-front-walk.",
                start: 0,
                end: 3,
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "misa-back-walk",
            frames: anims.generateFrameNames("atlas", {
                prefix: "misa-back-walk.",
                start: 0,
                end: 3,
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    startDialogue(player, item) {
        this.events.emit('signRead', item)
    }
}
