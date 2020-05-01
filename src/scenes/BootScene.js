import 'phaser'
import watcherBasePng from "../assets/tileset/tileset-extruded.png";
import casinoPng from "../assets/tileset/casino-8x8-extruded.png";
import danceHallPng from "../assets/tileset/cafe-8x8-extruded.png";
import partyPng from "../assets/tileset/wedding-8x8-extruded.png";
import marioPng from "../assets/characters/mario/mario.png";
import gioiaPng from "../assets/characters/gioia/gioia.png";
import blackPng from "../assets/characters/cats/black.png";
import orangePng from "../assets/characters/cats/orange.png";
import whitePng from "../assets/characters/cats/white.png";
import brownPng from "../assets/characters/cats/brown.png";
import amarantaPng from "../assets/characters/npcs/amaranta.png";
import amilcarePng from "../assets/characters/npcs/amilcare.png";
import carolinaPng from "../assets/characters/npcs/carolina.png";
import debborahPng from "../assets/characters/npcs/debborah.png";
import ezechielePng from "../assets/characters/npcs/ezechiele.png";
import nextPage from "../assets/UI/arrow-down-left.png";
import {BOOT_SCENE, TITLE_SCENE} from "../TheWatcher";
import {CASINO_TILES, DANCE_HALL_MAP, DANCE_HALL_TILES, PARTY_TILES, TOWN_MAP, TOWN_TILES} from "../config/levels";

const townJson = require('../assets/main-town/town.json');
const danceHallJson = require('../assets/main-town/dancehall.json');
const marioJson = require('../assets/characters/mario/mario.json');
const gioiaJson = require('../assets/characters/gioia/gioia.json');
const blackJson = require('../assets/characters/cats/black.json');
const orangeJson = require('../assets/characters/cats/orange.json');
const whiteJson = require('../assets/characters/cats/white.json');
const brownJson = require('../assets/characters/cats/brown.json');
const amarantaJson = require('../assets/characters/npcs/amaranta.json');
const amilcareJson = require('../assets/characters/npcs/amilcare.json');
const carolinaJson = require('../assets/characters/npcs/carolina.json');
const debborahJson = require('../assets/characters/npcs/debborah.json');
const ezechieleJson = require('../assets/characters/npcs/ezechiele.json');
const langResources = require('../locales/lang_resources.json');

export default class BootScene extends Phaser.Scene {
    constructor() {
        super(BOOT_SCENE)
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

        this.load.image(TOWN_TILES, watcherBasePng)
        this.load.tilemapTiledJSON(TOWN_MAP, townJson)
        this.load.image(CASINO_TILES, casinoPng)
        this.load.image(DANCE_HALL_TILES, danceHallPng)
        this.load.image(PARTY_TILES, partyPng)
        this.load.tilemapTiledJSON(DANCE_HALL_MAP, danceHallJson)

        this.load.image('nextPage', nextPage)
        this.load.atlas("mario", marioPng, marioJson)
        this.load.atlas("gioia", gioiaPng, gioiaJson)
        this.load.atlas("black", blackPng, blackJson)
        this.load.atlas("orange", orangePng, orangeJson)
        this.load.atlas("white", whitePng, whiteJson)
        this.load.atlas("brown", brownPng, brownJson)
        this.load.atlas("amaranta", amarantaPng, amarantaJson)
        this.load.atlas("amilcare", amilcarePng, amilcareJson)
        this.load.atlas("carolina", carolinaPng, carolinaJson)
        this.load.atlas("debborah", debborahPng, debborahJson)
        this.load.atlas("ezechiele", ezechielePng, ezechieleJson)

        this.load.json('langResource', langResources)
    }

    create() {
        this.scene.start(TITLE_SCENE)
    }
}
