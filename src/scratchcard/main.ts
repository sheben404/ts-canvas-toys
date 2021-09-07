const resultDom = document.getElementById("result");
const cardCanvas = document.getElementById("cardCanvas") as HTMLCanvasElement;
const wordsCanvas = document.getElementById("wordsCanvas") as HTMLCanvasElement;
const cardCtx = cardCanvas.getContext("2d");
const wordsCtx = wordsCanvas.getContext("2d");

wordsCtx.font = '50px 微软雅黑'
wordsCtx.shadowBlur = 20
wordsCtx.shadowColor = "rgb(245,155,155)"
wordsCtx.shadowOffsetX = 10
wordsCtx.shadowOffsetY = 10
wordsCtx.fillStyle = 'red'

cardCtx.fillStyle = 'darkgray'
cardCtx.fillRect(0, 0, 600, 200)
cardCtx.font = '20px 微软雅黑'
cardCtx.fillStyle = '#fff'
cardCtx.fillText('刮刮卡',260, 100)

let isDraw = false
cardCanvas.onmousedown = function(){
  isDraw = true
}
cardCanvas.onmouseup = function(){
  isDraw = false
}
cardCanvas.onmousemove = function(e){
  if(isDraw){
    const resultDomRect = resultDom.getBoundingClientRect()
    const x = e.pageX - resultDomRect.x
    const y = e.pageY - resultDomRect.y
    cardCtx.globalCompositeOperation = 'destination-out'
    cardCtx.beginPath()
    cardCtx.arc(x, y, 20, 0, 2 * Math.PI)
    cardCtx.fill()
    cardCtx.closePath()
  }
}

let wordsX = 600
setInterval(function(){
  wordsCtx.clearRect(0, 0, 600, 200)
  wordsX -= 3
  if(wordsX < -250){
    wordsX = 600
  }
  wordsCtx.fillText('祝你好运喔', wordsX, 100)
}, 25)

const wordsArr = [{ content: "一等奖!!!", p: 0.1 }, { content: "二等奖!!", p: 0.2 }, { content: "三等奖!", p: 0.3 }]
const randomNum = Math.random()
if(randomNum < wordsArr[0].p){
  resultDom.innerHTML = wordsArr[0].content
}else if(randomNum < wordsArr[0].p + wordsArr[1].p){
  resultDom.innerHTML = wordsArr[1].content
}else if(randomNum < wordsArr[0].p + wordsArr[1].p + wordsArr[2].p){
  resultDom.innerHTML = wordsArr[2].content
}