// import Phaser from 'phaser'
import { AUTO } from 'phaser';
import MyScene from './MyScene';
import PreloadScene from './PreloadScene';

// eslint-disable-next-line import/no-mutable-exports
const config = {
  type: AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
  scene: [PreloadScene, MyScene],
};

export { config };
