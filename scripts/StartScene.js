class StartScene extends Phaser.Scene {
	constructor() {
		super({ key: 'StartScene' })
	}

	preload() {
		// Preload sprites and background
		this.load.image('player', 'Sprites/test.png');
		this.load.image('enemy1', 'Sprites/enemy.png');
		this.load.image('backgroundImg', 'Sprites/background.jpg');
	}

	create() {
		
		// Create background and sprites
		gameState.bg = this.add.image(0, 0, 'backgroundImg');
		gameState.fish = this.add.image(270, 195, 'player').setScale(.35);
		gameState.shark = this.add.image(425, 190, 'enemy1').setScale(.35);

		// Start Scene text
		this.add.text( 90, 100, ' How long can you survive? ', {fontSize: '34px', fill: '#B1D4E0', backgroundColor: '#0C2D48' });
		this.add.text( 75, 260, ' Select Difficulty: ', {fill: '#000000', fontSize: '26px'});


		// Create Easy difficulty button; When clicked, gameState.isHard set to false
		this.add.text( 90, 300, ' EASY:) ', {fontSize: '40px', fill: '#B1D4E0', backgroundColor: '#0C2D48' })
		.setInteractive({ useHandCursor: true })
		.on('pointerdown', () =>{
			gameState.isHard = false;
			this.scene.stop('StartScene');
			this.scene.start('GameScene');
		});

		// Create Hard difficulty button; When clicked, gameState.isHard set to true
		this.add.text( 300, 300, ' HARD:/ ', {fontSize: '40px', fill: '#B1D4E0', backgroundColor: '#0C2D48' })
		.setInteractive({ useHandCursor: true })
		.on('pointerdown', () =>{
			gameState.isHard = true;
			this.scene.stop('StartScene');
			this.scene.start('GameScene');
		});

		// Create name text
		this.add.text( 5, 520, ' Made by Brandon Stropas ', {fill: '#000000', fontSize: '12px'});

	}
}