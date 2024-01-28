const utils = {
  checkCircleRectangleCollision: (
    circle: { x: number; y: number; radius: number },
    rectangle: { x: number; y: number; width: number; height: number }
  ) => {
    const circleDistance = {
      x: Math.abs(circle.x - rectangle.x),
      y: Math.abs(circle.y - rectangle.y),
    };

    if (circleDistance.x > rectangle.width / 2 + circle.radius) {
      return false;
    }
    if (circleDistance.y > rectangle.height / 2 + circle.radius) {
      return false;
    }

    if (circleDistance.x <= rectangle.width / 2) {
      return true;
    }
    if (circleDistance.y <= rectangle.height / 2) {
      return true;
    }

    const cornerDistanceSq =
      Math.pow(circleDistance.x - rectangle.width / 2, 2) +
      Math.pow(circleDistance.y - rectangle.height / 2, 2);

    return cornerDistanceSq <= Math.pow(circle.radius, 2);
  },
};

export default utils;
