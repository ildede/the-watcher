import 'phaser'
import watcherBasePng from "../assets/tileset/tileset-extruded.png";
import casinoPng from "../assets/tileset/casino-8x8-extruded.png";
import danceHallPng from "../assets/tileset/cafe-8x8-extruded.png";
import partyPng from "../assets/tileset/wedding-8x8-extruded.png";
import party16Png from "../assets/tileset/wedding-extruded.png";

import blackPng from "../assets/characters/cats/black.png";
import orangePng from "../assets/characters/cats/orange.png";
import whitePng from "../assets/characters/cats/white.png";
import brownPng from "../assets/characters/cats/brown.png";
import himPng from "../assets/characters/him/him.png";
import herPng from "../assets/characters/her/her.png";
import himFacePng from "../assets/characters/him/himFace.png";
import herFacePng from "../assets/characters/her/herFace.png";
import female1Png from "../assets/characters/npcs/female/female1.png";
import female2Png from "../assets/characters/npcs/female/female2.png";
import female3Png from "../assets/characters/npcs/female/female3.png";
import female4Png from "../assets/characters/npcs/female/female4.png";
import female5Png from "../assets/characters/npcs/female/female5.png";
import female6Png from "../assets/characters/npcs/female/female6.png";
import female7Png from "../assets/characters/npcs/female/female7.png";
import female8Png from "../assets/characters/npcs/female/female8.png";
import barPng from "../assets/bar/bar.png";
import himAndHerPng from "../assets/bar/him-and-her.png";
import restaurantBgPng from "../assets/restaurant/restaurant.png";
import restaurantAloneBgPng from "../assets/restaurant/restaurant-alone.png";
import male1Png from "../assets/characters/npcs/male/male1.png";
import male2Png from "../assets/characters/npcs/male/male2.png";
import male3Png from "../assets/characters/npcs/male/male3.png";
import male4Png from "../assets/characters/npcs/male/male4.png";
import male5Png from "../assets/characters/npcs/male/male5.png";
import male6Png from "../assets/characters/npcs/male/male6.png";
import male7Png from "../assets/characters/npcs/male/male7.png";
import male8Png from "../assets/characters/npcs/male/male8.png";
import nextPage from "../assets/UI/arrow-down-left.png";
import menuCreditsPng from "../assets/title/menu-credits.png";
import titleWatcher from "../assets/title/title-watcher.png";
import titleWatcherVr from "../assets/title/title-watcher-vr.png";
import splashBg00 from "../assets/title/splash-background-0.png";
import splashLanguagesPng from "../assets/title/splash-languages.png";

import {BOOT_SCENE, END_TITLE_SCENE, TITLE_SCENE} from "../TheWatcher";
import {
    CASINO_TILES,
    DANCE_HALL_MAP,
    DANCE_HALL_TILES,
    PARTY_TILES,
    TOWN_MAP,
    TOWN_TILES,
    SNOW_MAP,
    GARDEN_MAP,
    GARDEN_TORI_MAP, PARTY_TILES_16
} from "../config/levels";

import * as townJson from '../assets/main-town/town.json';
import * as snowJson from '../assets/main-town/town-snow.json';
import * as gardenJson from '../assets/main-town/garden.json';
import * as gardenToriJson from '../assets/main-town/garden-tori.json';
import * as danceHallJson from '../assets/main-town/dancehall.json';

import * as blackJson from '../assets/characters/cats/black.json';
import * as orangeJson from '../assets/characters/cats/orange.json';
import * as whiteJson from '../assets/characters/cats/white.json';
import * as brownJson from '../assets/characters/cats/brown.json';
import * as himJson from '../assets/characters/him/him.json';
import * as herJson from '../assets/characters/her/her.json';
import * as female1Json from "../assets/characters/npcs/female/female1.json";
import * as female2Json from "../assets/characters/npcs/female/female2.json";
import * as female3Json from "../assets/characters/npcs/female/female3.json";
import * as female4Json from "../assets/characters/npcs/female/female4.json";
import * as female5Json from "../assets/characters/npcs/female/female5.json";
import * as female6Json from "../assets/characters/npcs/female/female6.json";
import * as female7Json from "../assets/characters/npcs/female/female7.json";
import * as female8Json from "../assets/characters/npcs/female/female8.json";
import * as barJson from "../assets/bar/bar.json";
import * as male1Json from "../assets/characters/npcs/male/male1.json";
import * as male2Json from "../assets/characters/npcs/male/male2.json";
import * as male3Json from "../assets/characters/npcs/male/male3.json";
import * as male4Json from "../assets/characters/npcs/male/male4.json";
import * as male5Json from "../assets/characters/npcs/male/male5.json";
import * as male6Json from "../assets/characters/npcs/male/male6.json";
import * as male7Json from "../assets/characters/npcs/male/male7.json";
import * as male8Json from "../assets/characters/npcs/male/male8.json";

import * as splashBgJson from '../assets/title/splash-background.json';
import * as splashLanguagesJson from '../assets/title/splash-languages.json';

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
        this.load.tilemapTiledJSON(SNOW_MAP, snowJson)
        this.load.tilemapTiledJSON(GARDEN_MAP, gardenJson)
        this.load.tilemapTiledJSON(GARDEN_TORI_MAP, gardenToriJson)
        this.load.image(CASINO_TILES, casinoPng)
        this.load.image(DANCE_HALL_TILES, danceHallPng)
        this.load.image(PARTY_TILES, partyPng)
        this.load.image(PARTY_TILES_16, party16Png)
        this.load.tilemapTiledJSON(DANCE_HALL_MAP, danceHallJson)

        this.load.image('titleWatcherVR', titleWatcherVr)
        this.load.image('nextPage', nextPage)
        this.load.image('menuCredits', menuCreditsPng)
        this.load.image('himFace', himFacePng)
        this.load.image('herFace', herFacePng)
        this.load.image('titleWatcher', titleWatcher)
        this.load.image('himAndHer', himAndHerPng)
        this.load.image('restaurantBg', restaurantBgPng)
        this.load.image('restaurantAloneBg', restaurantAloneBgPng)
        this.load.atlas("black", blackPng, blackJson)
        this.load.atlas("orange", orangePng, orangeJson)
        this.load.atlas("white", whitePng, whiteJson)
        this.load.atlas("brown", brownPng, brownJson)
        this.load.atlas("him", himPng, himJson)
        this.load.atlas("her", herPng, herJson)
        this.load.atlas("female1", female1Png, female1Json)
        this.load.atlas("female2", female2Png, female2Json)
        this.load.atlas("female3", female3Png, female3Json)
        this.load.atlas("female4", female4Png, female4Json)
        this.load.atlas("female5", female5Png, female5Json)
        this.load.atlas("female6", female6Png, female6Json)
        this.load.atlas("female7", female7Png, female7Json)
        this.load.atlas("female8", female8Png, female8Json)
        this.load.atlas("barBg", barPng, barJson)
        this.load.atlas("male1", male1Png, male1Json)
        this.load.atlas("male2", male2Png, male2Json)
        this.load.atlas("male3", male3Png, male3Json)
        this.load.atlas("male4", male4Png, male4Json)
        this.load.atlas("male5", male5Png, male5Json)
        this.load.atlas("male6", male6Png, male6Json)
        this.load.atlas("male7", male7Png, male7Json)
        this.load.atlas("male8", male8Png, male8Json)
        this.load.atlas('splashLanguages', splashLanguagesPng, splashLanguagesJson)
        this.load.atlas("splashBg", splashBg00, splashBgJson)

        this.load.json('langResource', langResources)
    }

    create() {
        this.scene.start(END_TITLE_SCENE)
    }
}
