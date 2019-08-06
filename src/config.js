// import Phaser from 'phaser'
import {  AUTO } from 'phaser';
import MyScene from './MyScene';

var config = {
    type: AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: MyScene
};

export { config }