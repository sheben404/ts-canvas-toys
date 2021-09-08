const snakeCanvas = document.getElementById("snakeCanvas") as HTMLCanvasElement;
const startBtn = document.getElementById("startBtn")
const snakeCtx = snakeCanvas.getContext("2d");
const gridSize = 20;
snakeCtx.strokeRect(
  0,
  0,
  Number(snakeCanvas.getAttribute("width")),
  Number(snakeCanvas.getAttribute("height"))
);

function draw() {
  // 定义一个全局的是否吃到食物的一个变量
  let isEatFood = false;

  // 小方格类
  class Rect {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;

    constructor(
      x: number,
      y: number,
      width: number,
      height: number,
      color: string
    ) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
    }
    draw() {
      snakeCtx.beginPath();
      snakeCtx.fillStyle = this.color;
      snakeCtx.fillRect(this.x, this.y, this.width, this.height);
      snakeCtx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }

  // 蛇的构造函数
  class Snake {
    length: number;
    head: Rect;
    body: Rect[];
    direction: number = 2
    constructor(length = 0) {
      this.length = length;
      // 蛇头
      this.head = new Rect(
        snakeCanvas.width / 2,
        snakeCanvas.width / 2,
        gridSize,
        gridSize,
        "red"
      );

      // 蛇身
      this.body = [];

      let x = this.head.x - gridSize;
      const y = this.head.y;

      for (let i = 0; i < this.length; i++) {
        const rect = new Rect(x, y, gridSize, gridSize, "yellow");
        this.body.push(rect);
        x -= gridSize;
      }
    }
    drawSnake() {
      // 如果碰到了
      if (isHit(this)) {
        clearInterval(timer);
        const con = confirm(
          `共吃了${this.body.length - this.length}个食物，重新开始吗`
        );
        if (con) {
          draw();
        }
        startConfirm = true
        return;
      }
      this.head.draw();
      for (let i = 0; i < this.body.length; i++) {
        this.body[i].draw();
      }
    };

    moveSnake() {
      const rect = new Rect(
        this.head.x,
        this.head.y,
        this.head.width,
        this.head.height,
        "yellow"
      );
      this.body.unshift(rect);
  
      // 判断蛇头是否与食物重叠，重叠就是吃到了，没重叠就是没吃到
      isEatFood = food && this.head.x === food.x && this.head.y === food.y;
  
      if (!isEatFood) {
        // 没吃到就要去尾巴，想到与整条蛇没有变长
        this.body.pop();
      } else {
        // 吃到了就不去尾，相当于整条蛇延长一个方格
        // 并且吃到了，就要重新生成一个随机食物
  
        food = randomFood(this);
        food.draw();
        isEatFood = false;
      }
  
      // 根据方向，控制蛇头的坐标
      switch (this.direction) {
        case 0:
          this.head.x -= this.head.width;
          break;
        case 1:
          this.head.y -= this.head.height;
          break;
        case 2:
          this.head.x += this.head.width;
          break;
        case 3:
          this.head.y += this.head.height;
          break;
      }
    };
  }

  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 37:
        // 三元表达式，防止右移动时按左，下面同理(贪吃蛇可不能直接掉头)
        snake.direction = snake.direction === 2 ? 2 : 0;
        snake.moveSnake();
        break;
      case 38:
        snake.direction = snake.direction === 3 ? 3 : 1;
        snake.moveSnake();
        break;
      case 39:
        snake.direction = snake.direction === 0 ? 0 : 2;
        snake.moveSnake();
        break;
      case 40:
        snake.direction = snake.direction === 1 ? 1 : 3;
        snake.moveSnake();
        break;
    }
  };

  function randomFood(snake: Snake) {
    let isInSnake = true;
    let rect: Rect;
    while (isInSnake) {
      const x =
        Math.round(
          (Math.random() * (snakeCanvas.width - gridSize)) / gridSize
        ) * gridSize;
      const y =
        Math.round(
          (Math.random() * (snakeCanvas.height - gridSize)) / gridSize
        ) * gridSize;
      rect = new Rect(x, y, gridSize, gridSize, "blue");
      if (
        (snake.head.x === x && snake.head.y === y) ||
        snake.body.find((item) => item.x === x && item.y === y)
      ) {
        isInSnake = true;
        continue;
      } else {
        isInSnake = false;
      }
    }
    return rect;
  }

  function isHit(snake: Snake) {
    const head = snake.head;
    const xLimit = head.x < 0 || head.x >= snakeCanvas.width;
    const yLimit = head.y < 0 || head.y >= snakeCanvas.height;

    const hitSelf = snake.body.find(({ x, y }) => head.x === x && head.y === y);
    return xLimit || yLimit || hitSelf;
  }

  const snake = new Snake(1);
  snake.drawSnake();
  let food = randomFood(snake);
  food.draw();

  function animate() {
    snakeCtx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    snakeCtx.strokeRect(
      0,
      0,
      Number(snakeCanvas.getAttribute("width")),
      Number(snakeCanvas.getAttribute("height"))
    );
    snake.moveSnake();
    snake.drawSnake();
    food.draw();
  }

  const timer = setInterval(() => {
    animate();
  }, 100);
}

startBtn.onclick = ()=>{
  startConfirm = true
  draw()
}

let startConfirm = confirm('是否开始游戏?')
if(startConfirm){
  draw();
}

