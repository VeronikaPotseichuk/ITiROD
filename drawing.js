

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let isDrawing = false;
const color = document.getElementById('color');
const brushSize = document.getElementById('penWidth');
const colorPicker = document.getElementById("colorPicker");

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

colorPicker.addEventListener("input", () => {
  context.strokeStyle = colorPicker.value;
});

function startDrawing(event) {
  isDrawing = true;
  context.beginPath();
  context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

function draw(event) {
  if (!isDrawing) return;
  context.strokeStyle = color.value;
  context.lineWidth = brushSize.value;
  context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
  context.stroke();
}

const saveButton = document.getElementById("saveCanvas");
saveButton.addEventListener("click", () => {
  const dataUrl = canvas.toDataURL(); // Получаем строку base64
  const link = document.createElement("a"); // Создаем элемент <a>
  link.download = "canvas.png"; // Устанавливаем имя файла
  link.href = dataUrl; // Устанавливаем источник изображения
  link.click(); // Нажимаем на ссылку
});

function stopDrawing() {
  isDrawing = false;
}
