import utils from '../../math/utils';
import Brick from './Brick';
import { GameObject, GameObjectConfig } from './GameObject';
import Player from './Player';

type BallConfig = GameObjectConfig & {
  radius: number;
  speed: number;
};

export default class Ball extends GameObject {
  radius: number;
  speed: number;
  velX: number = 100;
  velY: number = -100; // Set an initial negative velocity for the y-axis
  borderWidth: number;

  constructor(config: BallConfig) {
    super(config);
    this.radius = config.radius;
    this.speed = config.speed;
    this.borderWidth = 2;
  }

  bounceX() {
    this.velX = -this.velX;
  }

  bounceY() {
    this.velY = -this.velY;
  }

  gameOver() {
    alert('Game Over!');
    // You might want to reset the game or perform other actions here
  }

  update(deltaTime: number): void {
    let desiredX = this.x + this.velX * deltaTime;
    let desiredY = this.y + this.velY * deltaTime;

    desiredX = this.checkLeftWall(desiredX);

    desiredX = this.checkRightWall(desiredX);

    desiredY = this.checkCeiling(desiredY);

    ({ desiredX, desiredY } = this.checkForCollision(desiredX, desiredY));

    this.checkFloor(desiredY);

    this.x = desiredX;
    this.y = desiredY;
  }

  checkForCollision(desiredX: number, desiredY: number) {
    for (const obj of this.gameInstance!.gameObjects) {
      if (obj === this || obj instanceof Ball) {
        continue;
      }
      if (obj instanceof Player)
        if (utils.checkCircleRectangleCollision({ ...this }, { ...obj })) {
          this.bounceY();
          desiredY = obj.getTop() - this.radius - 1;
        }
      if (obj instanceof Brick) {
        // Check for circle-rectangle collision with the brick
        if (utils.checkCircleRectangleCollision({ ...this }, { ...obj })) {
          ({ desiredX, desiredY } = obj.handleCollision(
            this,
            desiredX,
            desiredY
          )); // You need to implement the handleCollision method in the Brick class
        }
      }
    }
    return { desiredX, desiredY };
  }

  private checkFloor(desiredY: number) {
    if (desiredY > this.gameInstance!.canvas!.height - this.radius / 2) {
      // The ball hit the floor, trigger game over
      this.gameInstance!.removeGameObject(this);
    }
  }

  private checkCeiling(desiredY: number) {
    if (desiredY < this.radius / 2) {
      desiredY = this.radius / 2;
      this.bounceY();
    }
    return desiredY;
  }

  private checkRightWall(desiredX: number) {
    if (desiredX > this.gameInstance!.canvas!.width - this.radius / 2) {
      desiredX = this.gameInstance!.canvas!.width - this.radius / 2;
      this.bounceX();
    }
    return desiredX;
  }

  private checkLeftWall(desiredX: number) {
    if (desiredX < this.radius / 2) {
      desiredX = this.radius / 2;
      this.bounceX();
    }
    return desiredX;
  }

  render(ctx: CanvasRenderingContext2D): void {
    // Draw the orange border
    ctx.fillStyle = '#F90';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = '#Ff6';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius - this.borderWidth, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
