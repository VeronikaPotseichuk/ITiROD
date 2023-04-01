function openPopup() {
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}


// const forme = document.querySelector("#emailForm");

// forme.addEventListener("submit", function(event) {
//   event.preventDefault();

//   const emailInput = document.querySelector("#email");
//   const email = emailInput.value.trim();

//   if (emailInput.checkValidity()) { // проверяем, что данные проходят валидацию
//     const previousDomains = new Set(Array.from(document.querySelectorAll("input[name='email']")).map(input => input.value.split("@")[1]));
//     const domain = email.substring(email.lastIndexOf("@") + 1);
//     if (!previousDomains.has(domain)) {
//       // действия, если email введен корректно и домен не совпадает с предыдущими введенными email-адресами
//       alert("Email-адрес введен корректно и уникален!");
//     } else {
//       // действия, если домен совпадает с предыдущими введенными email-адресами
//       alert("Введите email-адрес с другим доменом!");
//     }
//   } else {
//     // действия, если данные введены некорректно
//     alert("Введите корректный email-адрес!");
//   }
// });


// // функция для создания нового поля ввода email
// function createEmailInput() {
//     const emailContainer = document.querySelector(".email-container");
//     const newEmailInput = document.createElement("input");
//     newEmailInput.type = "email";
//     newEmailInput.name = "email";
//     newEmailInput.placeholder = "Email";
//     newEmailInput.required = true;
//     emailContainer.insertBefore(newEmailInput, document.querySelector(".add-email-field"));
//   }
  
//   // функция для проверки email на валидность
//   function validateEmail(email) {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   }
  
//   // обработчик для кнопки "Добавить еще email"
//   const addEmailButton = document.querySelector(".add-email-field");
//   addEmailButton.addEventListener("click", function() {
//     const emailInputs = document.querySelectorAll("input[type='email']");
//     const lastEmailInput = emailInputs[emailInputs.length - 1];
//     const lastEmailValue = lastEmailInput.value.trim();
  
//     // проверяем, что предыдущий email введен корректно
//     if (!validateEmail(lastEmailValue)) {
//       alert("Введите корректный email-адрес!");
//       return;
//     }
  
//     createEmailInput();
//   });
  
//   // обработчик для отправки формы
//   const form = document.querySelector("form");
//   form.addEventListener("submit", function(event) {
//     const emailInputs = document.querySelectorAll("input[type='email']");
//     for (let i = 0; i < emailInputs.length; i++) {
//       const email = emailInputs[i].value.trim();
  
//       // проверяем, что email введен корректно
//       if (!validateEmail(email)) {
//         alert("Введите корректный email-адрес!");
//         event.preventDefault(); // отменяем отправку формы
//         return;
//       }
//     }
//   });
  