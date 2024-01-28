import Game from './Game';

type GameState = 'initializing' | 'paused' | 'running';

export class GameLoop {
  static instance: GameLoop;
  gameState: GameState;
  private lastTimestamp: number = 0;
  private game: Game; // Reference to the Game class

  private constructor(game: Game) {
    this.gameState = 'initializing';
    this.game = game;
  }

  static getInstance(game: Game): GameLoop {
    if (!GameLoop.instance) {
      GameLoop.instance = new GameLoop(game);
    }
    return GameLoop.instance;
  }

  start() {
    console.log('Game loop started');
    this.lastTimestamp = performance.now();
    this.gameState = 'running';
    this.loop();
  }

  private loop() {
    const step = (timestamp: number) => {
      const deltaTime = (timestamp - this.lastTimestamp) / 1000;

      // Update all game objects
      if ((this.gameState = 'running')) {
        this.game.update(deltaTime);
        this.game.render();
        this.game.killBricks();
      }
      // Store the current timestamp for the next frame
      this.lastTimestamp = timestamp;

      // Request the next frame
      requestAnimationFrame(step);
    };

    // Start the loop
    requestAnimationFrame(step);
  }
}
