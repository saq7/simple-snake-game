var game;
var game_window_x_dim = 600
var game_window_y_dim = 450

game = new Phaser.Game(game_window_x_dim, game_window_y_dim, Phaser.AUTO, '');

game.state.add('Menu', Menu);
game.state.start('Menu');

game.state.add('Game', Game);
game.state.start('Menu');

game.state.add('Game_Over', GameOver);
