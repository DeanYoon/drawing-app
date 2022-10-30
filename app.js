const sizePen = document.querySelector(".size-pen");
const sizeWord = document.querySelector(".size-word");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const navBtns = Array.from(document.getElementsByClassName("button"));
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

const HIDE_CLASS = "hidden";
const CLICKED = "clicked";
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = 1;
let font = 30;
let isPainting = false;
let isFilling = false;
let isStamp = false;
let nowColor = "black";

function reset() {
  isPainting = false;
  isFilling = false;
  isStamp = false;
}

function unBtnAll() {
  navBtns.forEach((button) => button.classList.remove(CLICKED));
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
    } else if (font > 4) {
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
  unBtnAll();
  ctx.strokeStyle = nowColor;
  penBtn.classList.add(CLICKED);
  isPainting = true;
  sizePen.classList.remove(HIDE_CLASS);
  sizeWord.classList.add(HIDE_CLASS);
}
function onPaintClick() {
  reset();
  unBtnAll();
  ctx.strokeStyle = nowColor;
  paintBtn.classList.add(CLICKED);
  isFilling = true;
}
function onEraserBtnClick() {
  reset();
  unBtnAll();
  eraserBtn.classList.add(CLICKED);
  isPainting = true;
  ctx.strokeStyle = "white";
}
function onTrashBtnClick() {
  unBtnAll();
  trashBtn.classList.add(CLICKED);
  ctx.save();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.restore();
}

function onStampBtnClick() {
  unBtnAll();
  stampBtn.classList.add(CLICKED);
  reset();
  isStamp = true;
  sizePen.classList.add(HIDE_CLASS);
  sizeWord.classList.remove(HIDE_CLASS);
}

function onUploadChanged(event) {
  unBtnAll();
  uploadBtn.classList.add(CLICKED);
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };
}

function onDownloadBtnClick() {
  unBtnAll();
  downloadBtn.classList.add(CLICKED);
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
  nowColor = colorValue;
}

function onColorChange(event) {
  const selectColor = event.target.value;
  ctx.strokeStyle = selectColor;
  ctx.fillStyle = selectColor;
  colorForSelect.style.background = selectColor;
}
function getSize() {
  getLineWidth = ctx.lineWidth;
  sizePen.style.width = `${getLineWidth}px`;
  sizePen.style.height = `${getLineWidth}px`;
  sizePen.style.background = nowColor;
  sizeWord.style.fontSize = `${font}px`;
  sizeWord.style.color = nowColor;
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

getSize();
setInterval(getSize, 10);

console.log(navBtns);
