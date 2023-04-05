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
      // сохраняем изображение в input с id 'imageData'
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
