// gameState data
const gameState = {
	highScore: 0,
	isHard: false
};

// Game config
const config = {
	type: Phaser.AUTO,
	width: 960,
	height: 540,
	backgroundColor: "#2E8BC0",
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
			gravity: { x: -80},
			enableBody: true,
		}
	},
	scene: [StartScene, GameScene],

	scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

// Create new game
const game = new Phaser.Game(config);