const clockCanvas = document.getElementById("clockCanvas") as HTMLCanvasElement;
const clockCtx = clockCanvas.getContext("2d");

let clockWidth = clockCtx.canvas.width;
let clockHeight = clockCtx.canvas.height;
let clockRadius = clockWidth / 2;
let clockRem = clockWidth / 200;

function drawBackground() {
  clockCtx.save();
  // 改变原点位置
  clockCtx.translate(clockRadius, clockRadius);
  clockCtx.beginPath()
  clockCtx.lineWidth = 10 * clockRem;
  clockCtx.arc(0, 0, clockRadius - clockCtx.lineWidth / 2, 0, 2 * Math.PI, false);
  clockCtx.stroke();

  const hourNums = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
  clockCtx.font = 18 * clockRem + "px Arial";
  // 用来设置水平方向的中点是 x
  clockCtx.textAlign = "center";
  // 用来设置竖直方向的中点是 y
  clockCtx.textBaseline = "middle";
  hourNums.forEach((number, index) => {
    const rad = ((2 * Math.PI) / 12) * index;
    // 利用余弦和正弦函数求 x、y 的坐标
    const x = Math.cos(rad) * (clockRadius - 30 * clockRem);
    const y = Math.sin(rad) * (clockRadius - 30 * clockRem);
    clockCtx.fillText(String(number), x, y);
  });

  for (let i = 0; i <= 60; i++) {
    const rad = ((2 * Math.PI) / 60) * i;
    const x = Math.cos(rad) * (clockRadius - 18 * clockRem);
    const y = Math.sin(rad) * (clockRadius - 18 * clockRem);

    clockCtx.beginPath();
    if (i % 5 === 0) {
      clockCtx.fillStyle = "#000";
      clockCtx.arc(x, y, 2, 0, 2 * Math.PI, false);
    } else{
      clockCtx.fillStyle = "#ccc";
      clockCtx.arc(x, y, 2, 0, 2 * Math.PI, false);
    }
    clockCtx.fill();
  }
}

function drawHour(hour: number, minute: number){
  // ctx.save() 
  // 可以保存画布的变形如 translate、rotate、scale（）
  // 因此我们可以通过旋转画布模拟指针的旋转
  // 再通过 ctx.restore() 恢复画布的状态
  // ctx.restore() 不会改变在 ctx.save() 后画的图像
  clockCtx.save()
  clockCtx.beginPath()
  const rad = 2 * Math.PI / 12 * hour
  const mrad = 2 * Math.PI / 12 / 60 * minute
  // 画布旋转多少度，下文中画出的时针就会旋转多少度
  clockCtx.rotate(rad + mrad)
  clockCtx.lineWidth = 6 * clockRem
  clockCtx.lineCap = 'round'
  // 向右👉🏻向下👇🏻为正数
  // 向下突出一点
  clockCtx.moveTo(0, 10)
  // 可以理解为默认指向钟表上 12 点方向
  clockCtx.lineTo(0, -clockRadius / 2)
  clockCtx.stroke()
  // 恢复画布的旋转角度，但是画出的时针不会改变位置
  clockCtx.restore()
}

function drawMinute(minute,second){
  clockCtx.save()
  clockCtx.beginPath()
  const rad = 2 * Math.PI / 60 * minute
  const srad = 2 * Math.PI / 60 / 60 * second
  clockCtx.rotate(rad + srad)
  clockCtx.lineWidth = 3 *clockRem
  clockCtx.lineCap = 'round'
  clockCtx.moveTo(0,10)
  clockCtx.lineTo(0,-clockRadius + 30*clockRem )
  clockCtx.stroke()
  clockCtx.restore()
}
function drawSecond(second){
  clockCtx.save()
  clockCtx.beginPath()
  clockCtx.fillStyle = '#c14543'
  const rad = 2 * Math.PI / 60 * second
  clockCtx.rotate(rad)
  clockCtx.moveTo(-2,20)
  clockCtx.lineTo(2,20)
  clockCtx.lineTo(1,-clockRadius+18*clockRem )
  clockCtx.lineTo(-1,-clockRadius+18*clockRem )
  clockCtx.fill()
  clockCtx.restore()
}
function drawDot(){
  clockCtx.beginPath()
  clockCtx.fillStyle = '#fff'
  clockCtx.arc(0,0,3,0,2*Math.PI,false)
  clockCtx.fill()
}

function draw() {
  clockCtx.clearRect(0, 0, clockWidth, clockHeight);
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  drawBackground();
  drawHour(hour,minute)
  drawMinute(minute,second)
  drawSecond(second)
  drawDot()
  clockCtx.restore();
}
setInterval(draw, 0);
