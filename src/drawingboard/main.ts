const allBtns = document.querySelectorAll(".pen");
const drawCanvas = document.getElementById("drawCanvas") as HTMLCanvasElement;
const drawCtx = drawCanvas.getContext("2d");

drawCanvas.setAttribute("width", String(drawCanvas.offsetWidth));
drawCanvas.setAttribute("height", String(drawCanvas.offsetHeight));

let canvasPen = {
  type: "line",
  isDraw: false,
  beginX: 0,
  beginY: 0,
  lineWidth: 6,
  imageData: null,
  color: "#000",
  lineFn: function (e: MouseEvent) {
    const x = e.pageX - drawCanvas.offsetLeft;
    const y = e.pageY - drawCanvas.offsetTop;
    drawCtx.clearRect(0, 0, drawCanvas.offsetWidth, drawCanvas.offsetHeight);
    if (canvasPen.imageData != null) {
      drawCtx.putImageData(
        canvasPen.imageData,
        0,
        0,
        0,
        0,
        drawCanvas.offsetWidth,
        drawCanvas.offsetHeight
      );
    }
    drawCtx.lineTo(x, y);
    drawCtx.strokeStyle = canvasPen.color;
    drawCtx.lineWidth = canvasPen.lineWidth;
    drawCtx.lineCap = "round";
    drawCtx.lineJoin = "round";
    drawCtx.stroke();
  },
  rectFn: function (e: MouseEvent) {
    const x = e.pageX - drawCanvas.offsetLeft;
    const y = e.pageY - drawCanvas.offsetTop;
    drawCtx.clearRect(0, 0, drawCanvas.offsetWidth, drawCanvas.offsetHeight);
    if (canvasPen.imageData != null) {
      drawCtx.putImageData(
        canvasPen.imageData,
        0,
        0,
        0,
        0,
        drawCanvas.offsetWidth,
        drawCanvas.offsetHeight
      );
    }
    drawCtx.beginPath();
    drawCtx.lineWidth = canvasPen.lineWidth;
    drawCtx.rect(
      canvasPen.beginX,
      canvasPen.beginY,
      x - canvasPen.beginX,
      y - canvasPen.beginY
    );
    drawCtx.strokeStyle = canvasPen.color;
    drawCtx.stroke();
    drawCtx.closePath();
  },
  arcFn: function (e: MouseEvent) {
    const x = e.pageX - drawCanvas.offsetLeft;
    const y = e.pageY - drawCanvas.offsetTop;
    drawCtx.clearRect(0, 0, drawCanvas.offsetWidth, drawCanvas.offsetHeight);
    if (canvasPen.imageData != null) {
      drawCtx.putImageData(
        canvasPen.imageData,
        0,
        0,
        0,
        0,
        drawCanvas.offsetWidth,
        drawCanvas.offsetHeight
      );
    }
    drawCtx.beginPath();
    drawCtx.lineWidth = canvasPen.lineWidth;
    drawCtx.arc(
      canvasPen.beginX,
      canvasPen.beginY,
      Math.abs(e.clientX - canvasPen.beginX),
      0,
      2 * Math.PI
    );
    drawCtx.strokeStyle = canvasPen.color;
    drawCtx.stroke();
    drawCtx.closePath();
  },
  eraFn: function (e: MouseEvent) {
    const x = e.pageX - drawCanvas.offsetLeft;
    const y = e.pageY - drawCanvas.offsetTop;
    drawCtx.lineTo(x, y);
    drawCtx.strokeStyle = "#fff";
    drawCtx.lineWidth = canvasPen.lineWidth;
    drawCtx.lineCap = "round";
    drawCtx.lineJoin = "round";
    drawCtx.stroke();
  },
};

const lineBtn = document.querySelector(".line") as HTMLElement;
lineBtn.onclick = function () {
  allBtns.forEach((item) => {
    item.classList.remove("active");
  });
  lineBtn.classList.add("active");
  canvasPen.type = "line";
};

const rectBtn = document.querySelector(".rect") as HTMLElement;
rectBtn.onclick = function () {
  allBtns.forEach((item) => {
    item.classList.remove("active");
  });
  rectBtn.classList.add("active");
  canvasPen.type = "rect";
};

const arcBtn = document.querySelector(".arc") as HTMLElement;
arcBtn.onclick = function () {
  allBtns.forEach((item) => {
    item.classList.remove("active");
  });
  arcBtn.classList.add("active");
  canvasPen.type = "arc";
};

const eraBtn = document.querySelector(".era") as HTMLElement;
eraBtn.onclick = function () {
  allBtns.forEach((item) => {
    item.classList.remove("active");
  });
  eraBtn.classList.add("active");
  canvasPen.type = "era";
};

const lineDivs = document.querySelectorAll(".width") as NodeListOf<HTMLElement>;
lineDivs.forEach((item, index) => {
  item.onclick = () => {
    lineDivs.forEach((lineItem) => {
      lineItem.classList.remove("active");
    });
    item.classList.add("active");
    switch (index) {
      case 0:
        canvasPen.lineWidth = 6;
        break;
      case 1:
        canvasPen.lineWidth = 16;
        break;
      case 2:
        canvasPen.lineWidth = 32;
        break;
    }
  };
});

const colorInput = document.getElementById("color") as HTMLInputElement;
colorInput.onchange = (e) => {
  canvasPen.color = colorInput.value;
};

drawCanvas.onmousedown = function (e) {
  canvasPen.isDraw = true;
  const x = e.pageX - drawCanvas.offsetLeft;
  const y = e.pageY - drawCanvas.offsetTop;
  switch (canvasPen.type) {
    case "rect":
      canvasPen.beginX = x;
      canvasPen.beginY = y;
      break;
    case "arc":
      canvasPen.beginX = x;
      canvasPen.beginY = y;
      break;
    case "line":
      canvasPen.beginX = x;
      canvasPen.beginY = y;
      drawCtx.beginPath();
      drawCtx.moveTo(x, y);
      break;
    case "era":
      canvasPen.beginX = x;
      canvasPen.beginY = y;
      drawCtx.beginPath();
      drawCtx.moveTo(x, y);
      break;
  }
};

drawCanvas.onmouseup = function () {
  canvasPen.imageData = drawCtx.getImageData(
    0,
    0,
    drawCanvas.offsetWidth,
    drawCanvas.offsetHeight
  );
  canvasPen.isDraw = false;
  if (canvasPen.type === "line") {
    drawCtx.closePath();
  }
};

drawCanvas.onmousemove = function (e) {
  if (canvasPen.isDraw) {
    const strFn = canvasPen.type + "Fn";
    canvasPen[strFn](e);
  }
};

const clearBtn = document.querySelector(".clearCanvas") as HTMLElement;
clearBtn.onclick = function () {
  canvasPen.imageData = null
  drawCtx.clearRect(
    0,
    0,
    Number(drawCanvas.getAttribute("width")),
    Number(drawCanvas.getAttribute("height"))
  );
};

const saveBtn = document.querySelector(".saveCanvas") as HTMLElement;
saveBtn.onclick = function () {
  const url = drawCanvas.toDataURL();
  const a = document.createElement("a");
  a.download = "sunshine";
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
