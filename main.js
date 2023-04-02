function openPopup() {
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
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
      document.getElementById('imageData').value = imageData;
      document.forms[0].submit();
    });

  } catch (error) {
    console.log(error);
    alert('An error occurred while opening the drawing form. Please try again.');
  }
}

function closeDrawing() {
  document.getElementById("drawing_form").style.display = "none";
}

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', form.action);
  xhr.send(formData);
});
