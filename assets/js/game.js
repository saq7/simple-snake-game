var snake, apple, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, sccoreTextValue, speedTextValue,
    textStyle_Key, textStyle_Value;

var Game = {
    preload: function () {
      game.load.image('snake', './assets/images/snake.png');
      game.load.image('apple', './assets/images/apple.png');
    },

    create: function() {
      snake = [];
      apple = {};
      squareSize = 15;
      score = 0;
      speed = 0;
      updateDelay = 0;
      direction = 'right';
      new_direction = null;
      addNew = false;


      cursors = game.input.keyboard.createCursorKeys();

      for (var i=0; i<10; i++){
        snake[i] = game.add.sprite(150+i*squareSize, 150, 'snake');
      };//for

      this.generateApple();

      // add text to the top of the game
      textStyle_Key = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" };
      textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center"};

      // Score
      game.add.text(30, 20, "SCORE", textStyle_Key)
      scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_Value);
      // Speed
      game.add.text(500, 20, "SPEED", textStyle_Key)
      speedTextValue = game.add.text(558, 18, speed.toString(), textStyle_Value);
    },

  generateApple: function(){
    // TODO: make sure apple only generates in free cells
    var randomX, randomY
    var collision = false
    while (true) {
      randomX = Math.floor(Math.random() * 40) * squareSize;
      randomY = Math.floor(Math.random() * 30) * squareSize;
      for(var i = 0; i<snake.length; i++){
        if  (snake[i].x == randomX && snake[i].y == randomY) {
          collision = true;
          break;
        };
      };
      if (!collision){
        break;
      }
    };

    // Add new apple
    apple = game.add.sprite(randomX, randomY, 'apple');
  },

  update: function() {
    if (cursors.right.isDown && direction!='left')
    {
      new_direction = 'right';
    }
    else if (cursors.left.isDown && direction!='right')
    {
      new_direction = 'left';
    }
    else if (cursors.up.isDown && direction!='down')
    {
      new_direction = 'up'
    }
    else if (cursors.down.isDown && direction!='up')
    {
      new_direction = 'down'
    }

    speed = Math.min(10, Math.floor(score/5));
    speedTextValue.text = '' + speed;

    updateDelay++;

    if (updateDelay % (10 - speed) == 0) {
      // snake movement
      var firstCell = snake[snake.length - 1],
          lastCell = snake.shift(),
          oldLastCellx = lastCell.x,
          oldLastCelly = lastCell.y;

      // If a new direction has been chosen from the keyboard, respond
      if (new_direction){
        direction = new_direction;
        new_direction = null;
      }


      if (direction == 'right'){
        lastCell.x = firstCell.x + 15;
        lastCell.y = firstCell.y;
      }
      else if (direction == 'left'){
        lastCell.x = firstCell.x - 15;
        lastCell.y = firstCell.y;
      }
      else if (direction == 'up'){
        lastCell.x = firstCell.x;
        lastCell.y = firstCell.y - 15;
      }
      else if (direction == 'down'){
        lastCell.x = firstCell.x;
        lastCell.y = firstCell.y + 15;
      }

      snake.push(lastCell);
      firstCell = lastCell;

      if (addNew) {
        snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
        addNew = false;
      }
      // check for apple collision
      this.appleCollision(firstCell);

      // check for self collision
      this.selfCollision(firstCell);

      // check for collision with wall
      this.wallCollision(firstCell);
    }
  },

  appleCollision: function (head){
    if(head.x == apple.x && head.y == apple.y){
      addNew = true;
      apple.destroy();
      this.generateApple();
      score++
      scoreTextValue.text = score.toString();
    }
  },

  selfCollision: function (head) {
    for (var i=0; i<snake.length-1; i++){
      if (head.x == snake[i].x && head.y == snake[i].y){
        game.state.start('Game_Over');
      }
    }
  },
  wallCollision: function (head) {
    if (head.x >= game_window_x_dim || head.x < 0 || head.y >= game_window_y_dim || head.y <0){
      game.state.start('Game_Over')
    }
  }

}
