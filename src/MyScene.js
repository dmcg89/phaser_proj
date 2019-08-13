import { Scene } from 'phaser';
import particleConfig from './particleConfig';
// import { config } from './config';

class MyScene extends Scene {
  constructor() {
    super('game');
    this.score = 0;
    this.gameOver = false;
  }

  // ======================================================
  // preload
  preload() {
    this.load.image('sky', '../assets/sky.png');
    // this.load.image('trees', '../assets/plx-5.png');
    this.load.image('ground', '../assets/platform.png');
    this.load.image('star', '../assets/star.png');
    this.load.image('bomb', '../assets/bomb.png');
    this.load.image('flag', '../assets/flag.png');
    this.load.image('particle', '../assets/Elipse.png');
    this.load.spritesheet('dude',
      '../assets/dude.png',
      { frameWidth: 32, frameHeight: 48 });
  }

  // =========================================================
  // Create
  create() {
    // const sky = this.add.image(0, 0, 'sky');
    // sky.setOrigin(0, 0);
    this.cameras.main.setBounds(0, 0, 720 * 5, 176);
    this.physics.world.setBounds(0, 0, 720 * 5, 800);

    for (let x = 0; x < 5; x += 1) {
      this.add.image(720 * x, 0, 'sky').setOrigin(0);
    }
    this.text = this.add.text(16, 16).setText('Score:' + this.score).setScrollFactor(0);

    this.createPlatforms();
    this.createPlayer();
    this.createCursor();
    this.createStars();
    this.createBombs();
    this.createFlag();

    // this.createParticles();

    // this.scoreText = this.add.text(this.player.x, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.game_over_text = this.add.text(400, 300, 'GAME OVER', { fontSize: '64px', fill: '#000' }).setScrollFactor(0);
    this.game_over_text.visible = false;
    // this.gameOverText.setOrigin(0.5);
    // this.gameOverText.visible = false;

    this.win_text = this.add.text(400, 300, 'You Win!', { fontSize: '64px', fill: '#000' }).setScrollFactor(0);
    // this.gameWinText.setOrigin(0.5);
    this.win_text.visible = false;
  }

  createFlag() {
    this.flag = this.physics.add.group({
      key: 'flag',
      repeat: 1,
      // setXY: { x: 3500, y: 80 },
      setXY: { x: 500, y: 80 },
    });
    this.physics.add.collider(this.flag, this.platforms);
    this.physics.add.collider(this.player, this.flag, this.hitFlag, null, this);
  }

  hitFlag(player) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    this.gameOver = true;
    // shows game over txt
    this.winText.visible = true;
    this.input.on('pointerdown', () => this.scene.start('preload'));
  }

  createParticles() {
    this.particles = this.add.particles('star');
    this.emitter = this.particles.createEmitter(particleConfig);
  }

  // getRandomArbitrary() {
  //   this.xRand = Math.random() * (3600 - 400) + 400;
  //   this.yRand = Math.random() * (400 - 220) + 220;
  // }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    // for (let x = 0; x < 2; x += 1) {
    //   this.plateforms.create(400 * x, 568, 'ground').setScale(2).refreshBody();
    // }
    // ground
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(1200, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(2000, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(2800, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(3200, 568, 'ground').setScale(2).refreshBody();
    // platforms
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(800, 220, 'ground');
    this.platforms.create(1200, 100, 'ground');
    this.platforms.create(1400, 400, 'ground');
    this.platforms.create(2000, 300, 'ground');
    this.platforms.create(2400, 400, 'ground');
    this.platforms.create(2800, 220, 'ground');
    this.platforms.create(3000, 400, 'ground');

    // for (let x = 0; x < 15; x += 1) {
    //   // let randX = Math.random() * (3600 - 400) + 400;
    //   let randY = Math.random() * (400 - 220) + 220;
    //   this.platforms.create((2.5 * x) * 400, randY, 'ground');
    //   this.platforms.create((x) * 400, randY, 'ground');
    // }
  }

  createStars() {
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 100,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    // this.stars.setCircle(15, 2, 16)

    this.stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setCircle(12);
    });
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });

      const x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      const bomb = this.bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCircle(6);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  createBombs() {
    this.bombs = this.physics.add.group({
      key: 'bomb',
      // repeat: 30,
      repeat: 1,
      setXY: { x: 12, y: 0, stepX: 200 },
    });

    this.bombs.children.iterate((child) => {
      child.setBounce(1);
      child.setCircle(6);
      child.setCollideWorldBounds(true);
      child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    });
    // this.bombs.setBounce(1);
    // this.bombs.setCircle(6);
    // this.bombs.setCollideWorldBounds(true);
    // this.bombs.setVelocity(Phaser.Math.Between(-200, 200), 20);

    // this.bombs = this.physics.add.group();
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
  }

  // hit by bomb! ends game
  hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    this.gameOver = true;
    // shows game over txt
    this.gameOverText.visible = true;
    this.input.on('pointerdown', () => this.scene.start('preload'));
  }

  createPlayer() {
    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.body.setSize(21, 31);
    this.player.body.setOffset(5, 16);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  createCursor() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  // ===================================================
  // update
  update() {
    var cam = this.cameras.main;

    // this.scoreText = this.add.text(this.player.x, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.scoreText = this.text.setText(['score: ' + this.score]);
    this.winText = this.win_text.setText('You Win', { fontSize: '64px', fill: '#000' });
    this.gameOverText = this.game_over_text.setText('You DED', { fontSize: '64px', fill: '#000' });


    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
    this.cameras.main.scrollX = this.player.x - 400;
  }
}

export default MyScene;
