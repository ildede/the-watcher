import 'phaser'
import watcherBasePng from "../assets/tileset/tileset-extruded.png";
import casinoPng from "../assets/tileset/casino-8x8-extruded.png";
import danceHallPng from "../assets/tileset/cafe-8x8-extruded.png";
import partyPng from "../assets/tileset/wedding-8x8-extruded.png";

import blackPng from "../assets/characters/cats/black.png";
import orangePng from "../assets/characters/cats/orange.png";
import whitePng from "../assets/characters/cats/white.png";
import brownPng from "../assets/characters/cats/brown.png";
import nextPage from "../assets/UI/arrow-down-left.png";
import titleWatcher from "../assets/title/titleWatcher.png";
import splashBg00 from "../assets/title/splash-background-0.png";

import {BOOT_SCENE, TITLE_SCENE} from "../TheWatcher";
import {CASINO_TILES, DANCE_HALL_MAP, DANCE_HALL_TILES, PARTY_TILES, TOWN_MAP, TOWN_TILES} from "../config/levels";

import * as townJson from '../assets/main-town/town.json';
import * as danceHallJson from '../assets/main-town/dancehall.json';

import * as blackJson from '../assets/characters/cats/black.json';
import * as orangeJson from '../assets/characters/cats/orange.json';
import * as whiteJson from '../assets/characters/cats/white.json';
import * as brownJson from '../assets/characters/cats/brown.json';

import * as splashBgJson from '../assets/title/splash-background.json';

import * as langResources from '../locales/lang_resources.json';

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
        this.load.image('titleWatcher', titleWatcher)
        this.load.atlas("black", blackPng, blackJson)
        this.load.atlas("orange", orangePng, orangeJson)
        this.load.atlas("white", whitePng, whiteJson)
        this.load.atlas("brown", brownPng, brownJson)
        this.load.atlas("splashBg", splashBg00, splashBgJson)

        this.load.json('langResource', langResources)
    }

    create() {
        this.scene.start(TITLE_SCENE)
    }
}
