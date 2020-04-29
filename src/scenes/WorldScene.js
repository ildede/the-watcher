import 'phaser'
import Player from "../entity/Player";
import Sign from "../entity/Sign";
import Character from "../entity/Character";

export default class WorldScene extends Phaser.Scene {
    constructor() {
        super('WorldScene')
    }

    create(data) {
        this.levelConfig = data
        this.dialogOpen = false

        const map = this.make.tilemap({ key: "map" })
        const tileset = map.addTilesetImage("watcherbase", "tiles")

        const bottom = map.createStaticLayer("Bottom", tileset, 0, 0)
        const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0)
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0)
        const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0)
        const top = map.createStaticLayer("Top", tileset, 0, 0)
        const objectLayer = map.getObjectLayer('Objects')
        aboveLayer.setDepth(50)
        top.setDepth(60)

        this.readableSigns = this.physics.add.group()
        this.systemMessage = this.physics.add.group()
        this.npc = this.physics.add.staticGroup()
        objectLayer.objects.forEach((object) => {
            if (object.type === 'sign') {
                this.readableSigns.add(new Sign(this, object))
            }
            if (object.type === 'message') {
                this.systemMessage.add(new Sign(this, object))
            }
            if (object.type === 'npc') {
                this.npc.add(new Character(this, object.x, object.y, object.name, "front", true, object))
            }
            if (object.type === 'spawn') {
                const spawnPoint = this.levelConfig.x && this.levelConfig.y
                    ? { x: this.levelConfig.x, y: this.levelConfig.y }
                    : { x: object.x, y: object.y }
                this.player = new Player(this, spawnPoint.x, spawnPoint.y, "amilcare", "front")
            }
        })


        this.physics.add.collider(this.player, [this.npc],
            (player, item) => {
                if (!this.dialogOpen) {
                    if (item.lastVisit === undefined || (item.lastVisit && (Date.now() - item.lastVisit) / 1000 > 1)) {
                        item.lastVisit = Date.now()
                        this.events.emit('talkTo', item)
                    }
                }
            })

        this.physics.add.overlap(this.player, [this.systemMessage],
            (player, item) => {
                if (!this.dialogOpen) {
                    if (item.lastVisit === undefined || (item.lastVisit && (Date.now() - item.lastVisit) / 1000 > 1)) {
                        item.lastVisit = Date.now()
                        this.events.emit('systemMessage', item)
                    }
                }
            })

        worldLayer.setCollisionByProperty({ collide: true })

        this.physics.world.bounds.width = map.widthInPixels
        this.physics.world.bounds.height = map.heightInPixels

        this.physics.add.collider(this.player, worldLayer)

        this.player.setCollideWorldBounds(true)

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player)
        this.cameras.main.setZoom(1.3)

        this.cursors = this.input.keyboard.createCursorKeys();

        console.debug('D: Turn on physics debugging to show player\'s hitbox')
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

        console.debug('S: Test startTransition event')
        this.input.keyboard.once("keydown_S", event => {
            uiScene.events.emit('startTransition')
        });

        const uiScene = this.scene.get('UIScene')
        uiScene.events.once('startTransition', () => {
            this.cameras.main.fadeOut(500)
            this.time.addEvent({
                    delay: 500,
                    callback: () => {
                        this.events.off('update')
                        this.scene.sleep('UIScene')
                        this.scene.start('TransitionScene', { x: this.player.x, y: this.player.y, new: this.levelConfig.new })
                    }
                })
        }, this)

        this.events.on('dialogStart', () => {
            this.dialogOpen = true
            this.input.keyboard.off('keydown_SPACE');
            this.input.keyboard.on('keydown_SPACE', this.continueDialog());
        })
        this.events.on('dialogEnd', () => {
            this.dialogOpen = false
            this.input.keyboard.off('keydown_SPACE');
            this.input.keyboard.on('keydown_SPACE', this.playerAction());
        })

        this.input.keyboard.on('keydown_SPACE', this.playerAction());
    }

    update(time, delta) {
        if (!this.dialogOpen) {
            this.player.update(this.cursors)
        } else {
            this.player.stop();
        }
    }

    continueDialog() { return () => this.events.emit('continueDialog') }
    playerAction() { return () => {
        this.physics.overlap(this.player, this.readableSigns,
            (player, item) => this.events.emit('readSign', item))
    }}
}

