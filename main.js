function openPopup() {
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function openCharacter() {
  document.getElementById("special-characters_form").style.display = "block";
}

function closeCharacter() {
  document.getElementById("special-characters_form").style.display = "none";
}

function openImage() {
  document.getElementById("image_form").style.display = "block";
}

function closeImage() {
  document.getElementById("image_form").style.display = "none";
}

function openTable() {
  document.getElementById("table_form").style.display = "block";
}

function closeTable() {
  document.getElementById("table_form").style.display = "none";
}

function openDrawing() {
  try {
    document.getElementById("drawing_form").style.display = "block";
  
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    let isDrawing = false;
    const color = document.getElementById('color');
    const brushSize = document.getElementById('penWidth');
  
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);
  
    function startDrawing(event) {
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      context.beginPath();
      context.moveTo(event.clientX - rect.left, event.clientY - rect.top);
    }
  
    function draw(event) {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      context.strokeStyle = color.value;
      context.lineWidth = brushSize.value;
      context.lineTo(event.clientX - rect.left, event.clientY - rect.top);
      context.stroke();
    }
  
    function stopDrawing() {
      isDrawing = false;
    }
  
    const saveButton = document.getElementById('saveCanvas');
    saveButton.addEventListener('click', function() {
        const canvas = document.getElementById('canvas');
        const imageData = canvas.toDataURL('image/png');
        const img = document.createElement("img");
        img.src = imageData;
        const container = document.getElementById("gdocs-input-content");
        container.appendChild(img);
        img.src = imageData;
        const imageWrapper = document.querySelector('#gdocs-input-content');
        imageWrapper.appendChild(img); // добавление изображения в #image-wrapper
        document.getElementById('gdocs-input-content').value = imageData;
});
  
  } catch (error) {
    console.log(error);
    alert('An error occurred while opening the drawing form. Please try again.');
  }
}
function closeDrawing() {
  document.getElementById("drawing_form").style.display = "none";
}

// 

function addImage() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';

  fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      document.getElementById('gdocs-input-content').appendChild(img);
      const imageDataInput = document.getElementById('imageData');
      imageDataInput.value = e.target.result;
    }

    reader.readAsDataURL(file);
  });

  fileInput.click();
}


// const form = document.querySelector('form');
// form.addEventListener('submit', (event) => {
//   event.preventDefault(); 
//   const formData = new FormData(form);
//   const xhr = new XMLHttpRequest();
//   xhr.open('POST', form.action);
//   xhr.send(formData);
// });


// function createTable() {
//   // Получаем значения полей ввода
//   const rows = parseInt(document.getElementById('rows').value);
//   const columns = parseInt(document.getElementById('columns').value);

//   // Создаем элемент таблицы
//   const table = document.createElement('table');
//   table.style.borderCollapse = 'collapse';

//   // Создаем строки и ячейки таблицы
//   for (let i = 0; i < rows; i++) {
//     const row = table.insertRow();
//     for (let j = 0; j < columns; j++) {
//       const cell = row.insertCell();
//       cell.setAttribute('contenteditable', 'true');
//       const text = document.createTextNode('');
//       cell.appendChild(text);

//       // const input = document.createElement('input');
//       // // input.type = 'text';
//       // cell.appendChild(input);
//     }
//   }

//   const cells = document.querySelectorAll('table td');

//   // Устанавливаем размер ячеек
//   for (let i = 0; i < cells.length; i++) {
//     cells[i].style.width = '10px';
//     cells[i].style.height = '5px';
//   }
//  table.setAttribute('contenteditable', 'true');

//   // Вставляем таблицу на страницу
//   const container = document.getElementById('table-container');
//   container.innerHTML = '';
//   container.appendChild(table);
// }

// 

function createTable() {
  const rows = parseInt(document.getElementById('rows').value);
  const columns = parseInt(document.getElementById('columns').value);

  const table = document.createElement('table');
  table.style.borderCollapse = 'collapse';

  for (let i = 0; i < rows; i++) {
    const row = table.insertRow();
    for (let j = 0; j < columns; j++) {
      const cell = row.insertCell();
      cell.setAttribute('contenteditable', 'true');
      const text = document.createTextNode('');
      cell.appendChild(text);
    }
  }

  const cells = document.querySelectorAll('table td');
  for (let i = 0; i < cells.length; i++) {
    cells[i].style.width = '10px';
    cells[i].style.height = '20px';
  }

  let isDragging = false;
  let lastX = 0;
  let lastY = 0;
  let isResizing = false;
  let tableWidth = table.offsetWidth;
  let tableHeight = table.offsetHeight;
  table.addEventListener('mousedown', function (e) {
    if (e.offsetX > tableWidth - 10 && e.offsetY > tableHeight - 10) {
      isResizing = true;
    } else {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    }
  });

  table.addEventListener('mousemove', function (e) {
    if (isDragging) {
      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;
      table.style.left = `${table.offsetLeft + deltaX}px`;
      table.style.top = `${table.offsetTop + deltaY}px`;
      lastX = e.clientX;
      lastY = e.clientY;
    } else if (isResizing) {
      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;
      table.style.width = `${table.offsetWidth + deltaX}px`;
      table.style.height = `${table.offsetHeight + deltaY}px`;
      lastX = e.clientX;
      lastY = e.clientY;
    }
  });

  table.addEventListener('mouseup', function (e) {
    isResizing = false;
    tableWidth = table.offsetWidth;
    tableHeight = table.offsetHeight;
  });

  const container = document.getElementById('gdocs-input-content');
  container.appendChild(table);
}

// 

function changeSummaryImage(imageName) {
  const summaryImage = document.getElementById("summary-image");
  summaryImage.innerHTML = `<img src="images/${imageName}" class="permission_image" height="41" width="41">`;
}

window.addEventListener('click', function(e) {
  const details = document.getElementsByTagName('details')[0];
  if (!details.contains(e.target)) {
      details.removeAttribute('open');
  }
});

window.addEventListener('click', function(e) {
  const details = document.getElementsByTagName('details')[0];
  if (!details.contains(e.target)) {
      details.removeAttribute('open');
  }
});

function makeBold() {
  var content = document.getElementById("gdocs-input-content");
  if (content.style.fontWeight === "bold") {
    content.style.fontWeight = "normal";
  } else {
    content.style.fontWeight = "bold";
  }
}

function makeItalic() {
  var content = document.getElementById("gdocs-input-content");
  if (content.style.fontStyle === "italic") {
    content.style.fontStyle = "normal";
  } else {
    content.style.fontStyle = "italic";
  }
}

function makeUnderlined() {
  var content = document.getElementById("gdocs-input-content");
  if (content.style.textDecoration === "underline") {
    content.style.textDecoration = "none";
  } else {
    content.style.textDecoration = "underline";
  }
}

function changeFont() {
  var font = document.getElementById("typeFont_list").value;
  document.getElementById("gdocs-input-content").style.fontFamily = font;
}


function changeScale() {
  var scale = document.getElementById("scale_list").value;
  document.getElementById("gdocs-input-content").style.fontSize  = scale;
}


// const colorPicker = document.getElementById('color-picker');
// const gdocsInputContent = document.getElementById('gdocs-input-content');

// function colorWord() {
//   const color = colorPicker.value;
//   gdocsInputContent.style.color = color;
// }

const colorBackground = document.getElementById('background_button');
const gdocsInputFrame = document.document.getElementById('gdocs-input-content');

gdocsInputFrame.contentDocument.body.style.color = 'black'; // по умолчанию черный цвет

colorBackground.addEventListener('input', () => {
  const color = colorBackground.value;
  gdocsInputFrame.contentDocument.body.style.color = color;
});

// const centerAlignBtn = document.getElementById('center-align-btn');
// const gdocsInputContent = document.querySelector('.gdocs-input-content');

// centerAlignBtn.addEventListener('click', () => {
//   gdocsInputContent.style.textAlign = 'center';
// });

function changeAlignmentImage(imageName) {
  const AlignmentImage = document.getElementById("alignment-image_change");
  AlignmentImage.innerHTML = `<img src="images/${imageName}" class="alignment-image" height="41" width="41">`;
}


const alignmentButton = document.getElementById("alignment_button");
const alignmentLeftButton = document.getElementById("alignment-left_button");
const alignmentRightButton = document.getElementById("alignment-right_button");
const content = document.getElementById("gdocs-input-content");

let alignment = content.dataset.alignment;

function changeAlignment(newAlignment) {
  content.style.textAlign = newAlignment;
  alignment = newAlignment;
}

alignmentButton.addEventListener("click", function() {
  if (alignment !== "center") {
    changeAlignment("center");
    alignmentButton.innerHTML = `<img src="images/alignment_center.png" height="41" width="41">`;
    alignmentLeftButton.innerHTML = `<img src="images/alignment_left.png" height="41" width="41">`;
    alignmentRightButton.innerHTML = `<img src="images/alignment_right.png" height="41" width="41">`;
  } else {
    changeAlignment("left");
    alignmentButton.innerHTML = `<img src="images/alignment.png" height="41" width="41">`;
  }
});

alignmentLeftButton.addEventListener("click", function() {
  if (alignment !== "left") {
    changeAlignment("left");
    alignmentButton.innerHTML = `<img src="images/alignment.png" height="41" width="41">`;
    alignmentLeftButton.innerHTML = `<img src="images/alignment_left_active.png" height="41" width="41">`;
    alignmentRightButton.innerHTML = `<img src="images/alignment_right.png" height="41" width="41">`;
  } else {
    changeAlignment("right");
    alignmentButton.innerHTML = `<img src="images/alignment_left.png" height="41" width="41">`;
  }
});

function changeAlignmentImage(imgName) {
  var img = document.getElementById('image_change');
  img.src = 'images/' + imgName;
}

function changeTextAlignment(alignment) {
  var content = document.getElementById("gdocs-input-content");
  content.contentDocument.body.style.textAlign = alignment;
}

document.addEventListener("DOMContentLoaded", function(event) {
  var buttons = document.querySelectorAll('#al button');
  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      var alignment = this.getAttribute('title');
      changeTextAlignment(alignment);
    });
  });
});

function changeFontSize(change) {
  var input = document.getElementById("mySelect_input");
  var value = parseInt(input.value);
  if (!isNaN(value)) {
    var fontSize = value + change;
    if (fontSize >= 8 && fontSize <= 50) {
      document.getElementById("gdocs-input-content").style.fontSize = fontSize + "px";
      input.value = fontSize;
    }
  }
}

function shiftLeft() {
  var content = document.getElementById("gdocs-input-content");
  var currentIndent = parseInt(getComputedStyle(content).textIndent, 10);
  var newIndent = currentIndent - 20;
  var maxIndent = content.offsetWidth - content.clientWidth;
  if (newIndent >= maxIndent && newIndent >= 0) {
    content.style.textIndent = newIndent + "px";
  }
}

function shiftRight() {
  var content = document.getElementById("gdocs-input-content");
  var currentIndent = parseInt(getComputedStyle(content).textIndent, 10);
  var newIndent = currentIndent + 20;
  content.style.textIndent = newIndent + "px";
}

// function changeLineHeight(change) {
//   var content = document.getElementById("gdocs-input-content");
//   var currentLineHeight = parseInt(getComputedStyle(content).lineHeight, 10);
//   var newLineHeight = currentLineHeight + change;
//   content.style.lineHeight = newLineHeight + "px";
// }

function changeLineHeight(value) {
  var content = document.getElementById("gdocs-input-content");
  var currentLineHeight = parseFloat(getComputedStyle(content).lineHeight);
  var newLineHeight = value;
  content.style.lineHeight = newLineHeight;
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Full Name: ' + profile.getName());
  console.log('Email: ' + profile.getEmail());
}

gapi.load('auth2', function() {
  gapi.auth2.init({
    client_id: 'YOUR_CLIENT_ID',
  });
});
