import { Direction } from '../DirectionInput';
import Game from '../Game';

export type GameObjectConfig = {
  x: number;
  y: number;
};

export class GameObject {
  x: number;
  y: number;
  gameInstance: Game | null = null;
  constructor(config: { x: number; y: number }) {
    this.x = config.x;
    this.y = config.y;
  }
  mount(gameInstance: Game) {
    this.gameInstance = gameInstance;
  }
  unmount() {
    this.gameInstance = null;
  }
  update(_deltaTime: number, _arrow?: Direction) {}

  render(_ctx: CanvasRenderingContext2D) {}
}
