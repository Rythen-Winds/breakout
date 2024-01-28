import { DirectionInput } from './DirectionInput';
import { GameLoop } from './GameLoop';
import Ball from './gameObjects/Ball';
import Brick from './gameObjects/Brick';
import { GameObject } from './gameObjects/GameObject';

export default class Game {
  container: HTMLDivElement | null = null;
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;
  gameLoop: GameLoop | null = null;
  gameObjects: GameObject[] = [];
  directionInput: DirectionInput | null = null;

  constructor() {}

  init(container: HTMLDivElement) {
    this.container = container;
    this.canvas = container.querySelector('canvas');

    if (!this.canvas) {
      console.error('Canvas element not found in the container.');
      return;
    }

    this.ctx = this.canvas.getContext('2d');

    if (!this.ctx) {
      console.error('Failed to get 2D context from canvas.');
      return;
    }

    this.gameLoop = GameLoop.getInstance(this);
    this.directionInput = new DirectionInput();
    this.directionInput.init();
    this.start();
  }

  addGameObject(gameObject: GameObject) {
    this.gameObjects.push(gameObject);
    gameObject.mount(this);
  }

  removeGameObject(gameObject: GameObject): void {
    const index = this.gameObjects.indexOf(gameObject);

    if (index !== -1) {
      this.gameObjects.splice(index, 1);
      gameObject.unmount();
    }
  }

  killBricks() {
    for (const brick of this.gameObjects) {
      if (!(brick instanceof Brick) || !brick.markForRemoval) {
        continue;
      }
      this.removeGameObject(brick);
    }
  }

  private start() {
    if (!this.gameLoop) {
      console.error('Game loop is not initialized.');
      return;
    }

    this.gameLoop.start();
  }
  update(deltaTime: number) {
    this.gameObjects.forEach((obj) =>
      obj.update(deltaTime, this.directionInput?.direction)
    );
    if (!this.gameObjects.some((obj) => obj instanceof Ball)) {
      // Your code when no Ball is found (player loses)
      alert('Player loses!');
    }
    if (!this.gameObjects.some((obj) => obj instanceof Brick)) {
      // Your code when no Ball is found (player loses)
      alert('Player Wins!');
    }
  }
  render() {
    if (!this.canvas || !this.ctx) {
      console.error('Canvas Context is not initialized.');
      return;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const obj of this.gameObjects) {
      obj.render(this.ctx);
    }
  }
}
