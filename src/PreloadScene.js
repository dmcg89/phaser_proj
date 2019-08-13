import Phaser, { Scene } from 'phaser';


class PreloadScene extends Scene {
  constructor() {
    super('preload');
  }

  preload() {
    this.load.image('logo', '../assets/logo.png');
    this.load.image('particle', '../assets/Ellipse.png');
  }

  create() {
    const logo1 = this.add.image(400, 300, 'logo');
    logo1.setDepth(99);
    this.input.on('pointerdown', () => this.scene.start('game'));

    const p = this.add.particles('particle');
    const e = p.createEmitter();
    e.setPosition(400, 300);
    e.setSpeed(200);
    e.setBlendMode(Phaser.BlendModes.ADD);
  }
}

export default PreloadScene;
