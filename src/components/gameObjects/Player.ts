import { Direction } from '../DirectionInput';
import { GameObject, GameObjectConfig } from './GameObject';
type PlayerConfig = GameObjectConfig & {
  width: number;
  height: number;
  speed: number;
};

export default class Player extends GameObject {
  width: number;
  height: number;
  borderWidth: number;
  speed: number;
  constructor(config: PlayerConfig) {
    super(config);
    this.width = config.width;
    this.height = config.height;
    this.borderWidth = 2;
    this.speed = config.speed;
  }

  getLeft(): number {
    return this.x - this.width / 2;
  }

  getTop(): number {
    return this.y - this.height / 2;
  }

  update(deltaTime: number, arrow?: Direction): void {
    let desiredX = this.x;
    if (arrow) {
      if (arrow == 'left') {
        desiredX = this.x - this.speed * deltaTime;
      }
      if (arrow == 'right') {
        desiredX = this.x + this.speed * deltaTime;
      }
    }
    if (desiredX < this.width / 2) {
      desiredX = this.width / 2;
    }
    if (desiredX > this.gameInstance!.canvas!.width - this.width / 2) {
      desiredX = this.gameInstance!.canvas!.width - this.width / 2;
    }
    this.x = desiredX;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#000';
    ctx.fillRect(this.getLeft(), this.getTop(), this.width, this.height);

    ctx.fillStyle = '#F09';
    ctx.fillRect(
      this.getLeft() + this.borderWidth,
      this.getTop() + this.borderWidth,
      this.width - 2 * this.borderWidth,
      this.height - 2 * this.borderWidth
    );
  }
}
