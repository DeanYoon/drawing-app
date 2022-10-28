const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const color = document.querySelector("#color");
const colorForSelect = document.querySelector(".select-color");
const penBtn = document.querySelector(".pen");
const paintBtn = document.querySelector(".paint");
const eraserBtn = document.querySelector(".eraser");
const trashBtn = document.querySelector(".trash");
const stampBtn = document.querySelector(".stamp");
const textInput = document.querySelector(".stamp-text");
const uploadBtn = document.querySelector("#file");
const downloadBtn = document.querySelector(".download");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = 1;
let font = 30;
let isPainting = false;
let isFilling = false;
let isStamp = false;

function reset() {
  isPainting = false;
  isFilling = false;
  isStamp = false;
}

//when stamp is on, don't paint
function onMouseDown() {
  if (isStamp === false) {
    isPainting = true;
  }
}
function stopDrawing() {
  isPainting = false;
  if (isFilling) {
    ctx.fill();
  }
  ctx.beginPath();
}

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}
function lineSize(event) {
  if (isStamp) {
    //Only when stamp button was clicked
    if (event.deltaY < 0) {
      font += 1;
    } else {
      font -= 1;
    }
  } else {
    if (event.deltaY < 0) {
      ctx.lineWidth += 1;
    } else {
      ctx.lineWidth -= 1;
    }
  }
}
function stampCanvas(event) {
  if (isStamp) {
    ctx.save();
    const stamp = textInput.value;
    ctx.lineWidth = 1;
    ctx.font = `${font}px serif`;
    ctx.fillText(stamp, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

function onPenBtnClick() {
  reset();
  isPainting = true;
}
function onPaintClick() {
  reset();
  isFilling = true;
}
function onEraserBtnClick() {
  reset();
  isPainting = true;
  ctx.strokeStyle = "white";
}
function onTrashBtnClick() {
  ctx.save();
  ctx.fillStyle = "white";
  ctx.fillRect(5, 5, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.restore();
}

function onStampBtnClick() {
  reset();
  isStamp = true;
}

function onUploadChanged(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };
}

function onDownloadBtnClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawingApp.jpg";
  a.click();
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
}
function onColorChange(event) {
  const selectColor = event.target.value;
  ctx.strokeStyle = selectColor;
  ctx.fillStyle = selectColor;
  colorForSelect.style.backgroundColor = selectColor;
}

canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mouseleave", stopDrawing);
canvas.addEventListener("mouseenter", stopDrawing);
canvas.addEventListener("wheel", lineSize);
canvas.addEventListener("click", stampCanvas);

penBtn.addEventListener("click", onPenBtnClick);
paintBtn.addEventListener("click", onPaintClick);
eraserBtn.addEventListener("click", onEraserBtnClick);
trashBtn.addEventListener("click", onTrashBtnClick);
stampBtn.addEventListener("click", onStampBtnClick);
uploadBtn.addEventListener("change", onUploadChanged);
downloadBtn.addEventListener("click", onDownloadBtnClick);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
color.addEventListener("change", onColorChange);
