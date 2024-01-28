import Game from './components/Game';
import Ball from './components/gameObjects/Ball';
import Brick from './components/gameObjects/Brick';
import Player from './components/gameObjects/Player';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;

const game = new Game();
game.addGameObject(
  new Player({
    x: 150,
    y: 275,
    width: 100,
    height: 15,
    speed: 200,
  })
);
game.addGameObject(
  new Ball({
    x: 150,
    y: 250,
    radius: 5,
    speed: 100,
  })
);
for (let i = 0; i < 7; i++) {
  for (let j = 0; j < 5; j++) {
    game.addGameObject(
      new Brick({
        x: 50 + i * 50,
        y: 20 + j * 20,
        width: 50,
        height: 20,
        hp: Math.ceil(Math.random() * 2),
      })
    );
  }
}
console.dir(game);
game.init(app);
