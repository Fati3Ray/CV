// SCROLLING DELLA PAGINA

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    // CAMBIA LA SEZIONE ACTIVE DURANTE LO SCROLLING
    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  // RIMUOVI LA NAVBAR SE PREMI IL MENU
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// ICONA DEL MENU PER SCHERMI RIDOTTI

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// PAGINA CONTATTI
const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;

  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

// SMTP MAIL CON JAVASCRIPT

const form = document.querySelector("form");

const Emailweb = document.getElementById("Email");
const Username = document.getElementById("Username");
const Telefono = document.getElementById("Telefono");
const Messaggio = document.getElementById("Messaggio");

function sendEmail() {
  const bodyMessage = `Username :${Username.value}<br> Email :${Emailweb.value}<br> 
  Telefono :${Telefono.value}<br> Messaggio :${Messaggio.value}`;

  Email.send({
    SecureToken: "e5267c4d-4455-4411-9217-73843d501080",
    To: "fzr.ray23@gmail.com",
    From: "fzr.ray23@gmail.com",
    Subject: "Soggetto",
    Body: bodyMessage
  })
}

function checkInputs() {
  const items = document.querySelectorAll(".input");
  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }

    if (items[1].value != "") {
      checkEmail();
    }

    items[1].addEventListener("keyup", () => {
      checkEmail();
    });

    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}

function checkEmail() {
  const emailRegex = /^[a-z\d.-]+@[a-z\d.-]+\.[a-z]{2,}$/i;
  const errorTxtEmail = document.querySelector(".error-txt.email");

  if (!Emailweb.value.match(emailRegex)) {
    Emailweb.classList.add("error");
    Emailweb.parentElement.classList.add("error");

    if (emailRegex.value != "") {
      errorTxtEmail.innerText = "*Inserisci una mail valida";
    } else {
      errorTxtEmail.innerText = "*Campo Obbligatorio";
    }
  } else {
    Emailweb.classList.remove("error");
    Emailweb.parentElement.classList.remove("error");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();

  if (
    !Emailweb.classList.contains("error") &&
    !Username.classList.contains("error") &&
    !Messaggio.classList.contains("error")
  ) {
    sendEmail();
    Swal.fire({
            title: "Fatto!",
            text: "Messaggio inviato!",
            icon: "success",
          });

    form.reset();
    return false;
  }
});
