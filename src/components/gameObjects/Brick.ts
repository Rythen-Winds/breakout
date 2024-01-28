import Ball from './Ball';
import { GameObject, GameObjectConfig } from './GameObject';

const hpColorMap: Record<number, string> = {
  1: '#54478cff', // Ultra Violet
  2: '#2c699aff', // Lapis Lazuli
  3: '#048ba8ff', // Blue Munsell
  4: '#0db39eff', // Keppel
  5: '#16db93ff', // Emerald
  6: '#83e377ff', // Light Green
  7: '#b9e769ff', // Mindaro
  8: '#efea5aff', // Maize
  9: '#f1c453ff', // Saffron
  10: '#f29e4cff', // Sandy Brown
};

type BrickConfig = GameObjectConfig & {
  width: number;
  height: number;
  hp: number;
};

export default class Brick extends GameObject {
  width: number;
  height: number;
  hp: number;
  markForRemoval: boolean = false;
  borderWidth: number;
  fillColor: string;
  constructor(config: BrickConfig) {
    super(config);
    this.width = config.width;
    this.height = config.height;
    this.borderWidth = 2;
    this.fillColor = hpColorMap[config.hp];
    this.hp = config.hp;
  }

  get left(): number {
    return this.x - this.width / 2;
  }

  get top(): number {
    return this.y - this.height / 2;
  }

  get right(): number {
    return this.x + this.width / 2;
  }

  get bottom(): number {
    return this.y + this.height / 2;
  }
  private setColor() {
    this.fillColor = hpColorMap[this.hp];
  }

  handleCollision(ball: Ball, desiredX: number, desiredY: number) {
    this.hp--;
    this.setColor();
    if (this.hp < 1) {
      this.hp = 0;
      this.markForRemoval = true;
    }

    // Check if the ball is coming from the top
    if (ball.y < this.top && this.top < desiredY + ball.radius) {
      ball.bounceY(); // Reverse the Y direction of the ball
      desiredY = this.top - ball.radius - 1; // Adjust the desired position
    }
    // Check if the ball is coming from the bottom
    else if (ball.y > this.bottom && this.bottom > desiredY - ball.radius) {
      ball.bounceY(); // Reverse the Y direction of the ball
      desiredY = this.bottom + ball.radius + 1; // Adjust the desired position
    }
    // Check if the ball is coming from the left
    else if (ball.x < this.left && this.left < desiredX + ball.radius) {
      ball.bounceX(); // Reverse the X direction of the ball
      desiredX = this.left - ball.radius - 1; // Adjust the desired position
    }
    // Check if the ball is coming from the right
    else if (ball.x > this.right && this.right > desiredX - ball.radius) {
      ball.bounceX(); // Reverse the X direction of the ball
      desiredX = this.right + ball.radius + 1; // Adjust the desired position
    }

    return { desiredX, desiredY };
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#000';
    ctx.fillRect(this.left, this.top, this.width, this.height);

    ctx.fillStyle = this.fillColor;
    ctx.fillRect(
      this.left + this.borderWidth,
      this.top + this.borderWidth,
      this.width - 2 * this.borderWidth,
      this.height - 2 * this.borderWidth
    );
  }
}
