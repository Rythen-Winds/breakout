export type Direction = 'left' | 'right';

export class DirectionInput {
  heldDirections: Direction[];
  map: Record<string, Direction>;
  constructor() {
    this.heldDirections = [];

    this.map = {
      ArrowLeft: 'left',
      ArrowRight: 'right',

      KeyA: 'left',
      KeyD: 'right',
    };
  }

  get direction() {
    return this.heldDirections[0];
  }

  init() {
    document.addEventListener('keydown', (e) => {
      const dir = this.map[e.code];
      if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir);
      }
    });
    document.addEventListener('keyup', (e) => {
      const dir = this.map[e.code];
      const index = this.heldDirections.indexOf(dir);
      if (index > -1) {
        this.heldDirections.splice(index, 1);
      }
    });
  }
}
