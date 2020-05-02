import 'phaser'
import Player from "../entity/Player";
import Message from "../entity/Message";
import Character from "../entity/Character";
import {TRANSITION_SCENE, UI_SCENE, WORLD_SCENE} from "../TheWatcher";

export default class WorldScene extends Phaser.Scene {
    constructor() {
        super(WORLD_SCENE)
        this.fillCurrentMap = this.fillCurrentMap.bind(this)
    }

    create(data) {
        this.levelConfig = data
        this.dialogOpen = false

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
        this.physics.add.overlap(this.player, [this.systemMessage],
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
        console.debug('D: Turn on physics debugging to show player\'s hitbox')
        this.input.keyboard.once("keydown_D", event => {
            // Turn on physics debugging to show player's hitbox
            this.physics.world.createDebugGraphic();

            // Create worldLayer collision graphic above the player, but below the help text
            const graphics = this.add
                .graphics()
                .setAlpha(0.75)
                .setDepth(20);
            worldUp.renderDebug(graphics, {
                tileColor: null, // Color of non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });
            worldMiddle.renderDebug(graphics, {
                tileColor: null, // Color of non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });
            worldBottom.renderDebug(graphics, {
                tileColor: null, // Color of non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });
        });

        console.debug('S: Test startTransition event')
        this.input.keyboard.once("keydown_S", event => {
            uiScene.events.emit('startTransition')
        });

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
    }

    update(time, delta) {
        if (!this.dialogOpen) {
            this.player.update(this.cursors)
        } else {
            this.player.stop();
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
            if (object.type === 'npc') {
                this.npc.add(new Character(this, object.x, object.y, object.name,
                    Array.isArray(object.properties)
                        ? object.properties?.find(e => e.name === 'direction')?.value || "front"
                        : "front"
                    , true, object))
            }
            if (object.type === 'spawn') {
                const spawnPoint = this.levelConfig.x && this.levelConfig.y
                    ? {x: this.levelConfig.x, y: this.levelConfig.y}
                    : {x: object.x, y: object.y}
                this.player = new Player(this, spawnPoint.x, spawnPoint.y, "him",
                    Array.isArray(object.properties)
                        ? object.properties?.find(e => e.name === 'direction')?.value || "front"
                        : "front")
            }
        };
    }
}

