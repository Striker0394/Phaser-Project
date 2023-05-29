class GameScene extends Phaser.Scene {
	constructor(){
		super({ key: 'GameScene' })
	}

	preload() {
		// Preload sprites and background
		this.load.image('player', 'Sprites/test.png');
		this.load.image('enemy1', 'Sprites/enemy.png');
		this.load.image('backgroundImg', 'Sprites/background.jpg');

	}

	create() {
		// Create background
		gameState.bg = this.add.image(0, 0, 'backgroundImg').setScale(1);
		
		// Create cursor object to take input
		gameState.cursors = this.input.keyboard.createCursorKeys();

		// Create player sprite, affected by physics
		gameState.player = this.physics.add.sprite(250,250, 'player').setScale(.35); 
		gameState.player.setCollideWorldBounds(true);
		
		// Create group of enemies
		const enemies = this.physics.add.group();

		// When player collides with an enemy...
		this.physics.add.collider(gameState.player, enemies, () =>{
			// Destroy methods and pause physics when game ends
			enemyGenLoop.destroy();
			scoreLoop.destroy();
			this.physics.pause();
			
			// Game over messages
			this.add.text(227, 150, ' Game Over :( ', { fontSize: '60px', fill: '#B1D4E0', backgroundColor: '#0C2D48' });
    		this.add.text(327, 225, ' Click to Return ', { fontSize: '28px', fill: '#B1D4E0', backgroundColor: '#0C2D48' });

			// Keeps track of highscore
			if(score>gameState.highScore){
				gameState.highScore = score;
			}

			// Returns back to StartScene on click
			this.input.on('pointerup', () =>{
				this.scene.stop('GameScene');
				this.scene.start('StartScene');
			});
				
		})
		
		// Function to create enemy
		function enemyGen(){
			const yCoord = Math.random()*540;
			enemies.create(1050, yCoord, 'enemy1').setScale(.4).setSize(370,120).setOffset(30,30);
		}

		let delay = 800;
		
		// If hard mode is on, enemies will spawn faster and move faster
		if(gameState.isHard){
			delay = 350;
			gravity: { x: -6000};
		}

		// Loop to generate enemies
		const enemyGenLoop = this.time.addEvent({
			delay: delay,
			callback: enemyGen,
			callbackScope: this,
			loop: true
		});

		// Function to increment and update score
		let score = 0;
		function incScore(){
			score++;
			gameState.scoreText.setText(` Seconds Survived: ${score} `);
		}
		
		// Display highscore
		gameState.scoreText = this.add.text(340, 16, ` Highest Score: ${gameState.highScore} `, { fontSize: '23px', fill: '#000000', backgroundColor: '#0C2D48', fill: '#B1D4E0' })

		// Display current score
		gameState.scoreText = this.add.text(16, 16, ' Seconds Survived: 0 ', { fontSize: '23px', fill: '#000000', backgroundColor: '#0C2D48', fill: '#B1D4E0' });
		
		// Increment score every second
		const scoreLoop = this.time.addEvent({
			delay:1000,
			callback: incScore,
			callbackScope: this,
			loop: true
		});

	}

	update() {
		// Update player sprite based on keyboard input
		if (gameState.cursors.left.isDown){
			gameState.player.setVelocityX(-125);
		} 
		else if (gameState.cursors.right.isDown){
			gameState.player.setVelocityX(70);
			
		} 
		else if(gameState.cursors.down.isDown){
			gameState.player.setVelocityY(200);
			gameState.player.angle = 20;
		}
		 else if(gameState.cursors.up.isDown){
			gameState.player.setVelocityY(-200);
			gameState.player.angle = -20;
		}
		else{
			gameState.player.setVelocityY(0);
			gameState.player.setVelocityX(-35);
		}

		if(!gameState.cursors.down.isDown && !gameState.cursors.up.isDown){
			gameState.player.angle = 0;
		}
		
	}
}