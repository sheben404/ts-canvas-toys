const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

let width = ctx.canvas.width;
let height = ctx.canvas.height;
let radius = width / 2;
let rem = width / 200;

function drawBackground() {
  ctx.save();
  // 改变原点位置
  ctx.translate(radius, radius);
  ctx.beginPath()
  ctx.lineWidth = 10 * rem;
  ctx.arc(0, 0, radius - ctx.lineWidth / 2, 0, 2 * Math.PI, false);
  ctx.stroke();

  const hourNums = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
  ctx.font = 18 * rem + "px Arial";
  // 用来设置水平方向的中点是 x
  ctx.textAlign = "center";
  // 用来设置竖直方向的中点是 y
  ctx.textBaseline = "middle";
  hourNums.forEach((number, index) => {
    const rad = ((2 * Math.PI) / 12) * index;
    // 利用余弦和正弦函数求 x、y 的坐标
    const x = Math.cos(rad) * (radius - 30 * rem);
    const y = Math.sin(rad) * (radius - 30 * rem);
    ctx.fillText(String(number), x, y);
  });

  for (let i = 0; i <= 60; i++) {
    const rad = ((2 * Math.PI) / 60) * i;
    const x = Math.cos(rad) * (radius - 18 * rem);
    const y = Math.sin(rad) * (radius - 18 * rem);

    ctx.beginPath();
    if (i % 5 === 0) {
      ctx.fillStyle = "#000";
      ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
    } else{
      ctx.fillStyle = "#ccc";
      ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
    }
    ctx.fill();
  }
}

function drawHour(hour: number, minute: number){
  // ctx.save() 
  // 可以保存画布的变形如 translate、rotate、scale（）
  // 因此我们可以通过旋转画布模拟指针的旋转
  // 再通过 ctx.restore() 恢复画布的状态
  // ctx.restore() 不会改变在 ctx.save() 后画的图像
  ctx.save()
  ctx.beginPath()
  const rad = 2 * Math.PI / 12 * hour
  const mrad = 2 * Math.PI / 12 / 60 * minute
  // 画布旋转多少度，下文中画出的时针就会旋转多少度
  ctx.rotate(rad + mrad)
  ctx.lineWidth = 6 * rem
  ctx.lineCap = 'round'
  // 向右👉🏻向下👇🏻为正数
  // 向下突出一点
  ctx.moveTo(0, 10)
  // 可以理解为默认指向钟表上 12 点方向
  ctx.lineTo(0, -radius / 2)
  ctx.stroke()
  // 恢复画布的旋转角度，但是画出的时针不会改变位置
  ctx.restore()
}

function drawMinute(minute,second){
  ctx.save()
  ctx.beginPath()
  const rad = 2 * Math.PI / 60 * minute
  const srad = 2 * Math.PI / 60 / 60 * second
  ctx.rotate(rad + srad)
  ctx.lineWidth = 3 *rem
  ctx.lineCap = 'round'
  ctx.moveTo(0,10)
  ctx.lineTo(0,-radius + 30*rem )
  ctx.stroke()
  ctx.restore()
}
function drawSecond(second){
  ctx.save()
  ctx.beginPath()
  ctx.fillStyle = '#c14543'
  const rad = 2 * Math.PI / 60 * second
  ctx.rotate(rad)
  ctx.moveTo(-2,20)
  ctx.lineTo(2,20)
  ctx.lineTo(1,-radius+18*rem )
  ctx.lineTo(-1,-radius+18*rem )
  ctx.fill()
  ctx.restore()
}
function drawDot(){
  ctx.beginPath()
  ctx.fillStyle = '#fff'
  ctx.arc(0,0,3,0,2*Math.PI,false)
  ctx.fill()
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  drawBackground();
  drawHour(hour,minute)
  drawMinute(minute,second)
  drawSecond(second)
  drawDot()
  ctx.restore();
}
setInterval(draw, 0);
