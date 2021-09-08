const starsCanvas = document.getElementById("starsCanvas") as HTMLCanvasElement;

const starsCtx = starsCanvas.getContext("2d");

// 获取当前视图的宽度和高度
const aw = document.documentElement.clientWidth || document.body.clientWidth;
const ah = document.documentElement.clientHeight || document.body.clientHeight;
// 赋值给canvas
starsCanvas.height = ah;
starsCanvas.width = aw;

window.onresize = function () {
  const aw = document.documentElement.clientWidth || document.body.clientWidth;
  const ah =
    document.documentElement.clientHeight || document.body.clientHeight;
  // 赋值给canvas
  starsCanvas.height = ah;
  starsCanvas.width = aw;
  starsCtx.fillStyle = "white";
  starsCtx.strokeStyle = "white";
};

starsCtx.fillStyle = "white";
starsCtx.strokeStyle = "white";

class Star {
  x: number;
  y: number;
  r: number;
  speedX: number;
  speedY: number;
  constructor(x: number, y: number, r: number) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.speedX = Math.random() * 3 * Math.pow(-1, Math.round(Math.random()));
    this.speedY = Math.random() * 3 * Math.pow(-1, Math.round(Math.random()));
  }
  draw() {
    starsCtx.beginPath();
    starsCtx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    starsCtx.fill();
    starsCtx.closePath();
  }
  move() {
    this.x -= this.speedX;
    this.y -= this.speedY;
  }
}
function drawLine(startX: number, startY: number, endX: number, endY: number) {
  starsCtx.beginPath();
  starsCtx.moveTo(startX, startY);
  starsCtx.lineTo(endX, endY);
  starsCtx.stroke();
  starsCtx.closePath();
}

const stars = [];
for (let i = 0; i < 100; i++) {
  stars.push(new Star(Math.random() * aw, Math.random() * ah, 3));
}

const mouseStar = new Star(0, 0, 3);

starsCanvas.onmousemove = function (e) {
  mouseStar.x = e.clientX;
  mouseStar.y = e.clientY;
};

window.onclick = function (e) {
  for (let i = 0; i < 5; i++) {
    stars.push(new Star(e.clientX, e.clientY, 3));
  }
};

setInterval(() => {
  starsCtx.clearRect(0, 0, aw, ah);
  mouseStar.draw();
  stars.forEach((star) => {
    star.move();
    star.draw();
  });
  stars.forEach((star, index) => {
    // 类似于冒泡排序那样，去比较，确保所有星星两两之间都比较到
    for (let i = index + 1; i < stars.length; i++) {
      if (
        Math.abs(star.x - stars[i].x) < 80 &&
        Math.abs(star.y - stars[i].y) < 80
      ) {
        drawLine(star.x, star.y, stars[i].x, stars[i].y);
      }
    }

    if (
      Math.abs(mouseStar.x - star.x) < 80 &&
      Math.abs(mouseStar.y - star.y) < 80
    ) {
      drawLine(mouseStar.x, mouseStar.y, star.x, star.y);
    }
  });
}, 50);
