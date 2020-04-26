import 'phaser'
import townPng from "../assets/tileset/tileset.png";
import atlasPng from "../assets/characters/mario/mario.png";
import Player from "../entity/Player";
import Sign from "../entity/Sign";

const townJson = require('../assets/main-town/town.json');
const atlasJson = require('../assets/characters/mario/mario.json');

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
        // console.log('Create WorldScene')
        // console.log(data)
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

        this.player = new Player(this, spawnPoint.x, spawnPoint.y, "atlas", "mario-front")

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

        this.physics.add.overlap(
            this.player,
            this.readableSigns,
            this.startDialogue,
            null,
            this
        )

        this.player.setCollideWorldBounds(true)

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player)
        this.cameras.main.setZoom(1.3)

        this.cursors = this.input.keyboard.createCursorKeys();

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

    startDialogue(player, item) {
        this.events.emit('signRead', item)
    }
}
