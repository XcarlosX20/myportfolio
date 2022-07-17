const firebaseConfig = {
  apiKey: "AIzaSyAwFW7dpgPn520aytj144W8fiXGNwvroHc",
  authDomain: "portfolio-afef5.firebaseapp.com",
  projectId: "portfolio-afef5",
  storageBucket: "portfolio-afef5.appspot.com",
  messagingSenderId: "701171371638",
  appId: "1:701171371638:web:b8cd0791c5cc5bbe61d957",
  measurementId: "G-P2B74DMKFJ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const nav = document.querySelector(".main-navigation");
const links = document.querySelectorAll("nav a");
const main = document.querySelector("#main");
const btnBurguer_Container = document.querySelector("#btn-burguer-container");
const btnBurguer = document.querySelector("#btn-burguer");
const mainItems = document.querySelectorAll("#main-item");
document.addEventListener("DOMContentLoaded", function () {
  getProjects();
  btnBurguerFn();
  scrollNav();
  NavFixed();
  validateForm();
});
mainItems.forEach((item) => {
  item.addEventListener("click", () => {
    main.classList.add("hidden");
    btnBurguer.classList.remove("active");
  });
});

function btnBurguerFn() {
  btnBurguer_Container.addEventListener("click", (e) => {
    btnBurguer.classList.toggle("active");
    main.classList.toggle("hidden");
  });
}
function NavFixed() {
  const span = document.querySelector(".span");
  const header = document.querySelector(".header");
  const arrow = document.querySelector(".scroll-swipe");
  const observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      header.classList.remove("fixed");
      nav.classList.remove("animate__fadeInRight");
      span.classList.add("animate__headShake");
      arrow.classList.add("animate__fadeOutUp");
      arrow.style.visibility = "visible";
    } else {
      header.classList.add("fixed");
      nav.classList.add("animate__fadeInRight");
      span.classList.remove("animate__headShake");
      arrow.classList.remove("animate__fadeOutUp");
      arrow.style.visibility = "hidden";
    }
  });
  //element to view
  const H2 = document.querySelector(".content-video h2");
  observer.observe(H2);
}
function scrollNav() {
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const section = document.querySelector(e.target.attributes.href.value);
      section.scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
const validateForm = () => {
  let contactDB = firebase.database().ref("messages");
  const form = document.querySelector("form");
  const name = document.getElementsByName("name");
  const email = document.getElementsByName("email");
  const message = document.getElementsByName("message");
  const input = document.querySelector("#submit");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let dataUser = {
      name: name[0].value,
      email: email[0].value,
      message: message[0].value,
    };
    let newMsg = contactDB.push();
    if (
      dataUser.name === "" ||
      dataUser.email === "" ||
      dataUser.message === ""
    ) {
      return;
    } else {
      //UPLOAD REQUIRE
      const success = document.createElement("span");
      success.textContent = "Sent successfully";
      success.className = "animate__animated";
      const loading = document.querySelector(".loading");
      const spinner = document.querySelector(".sk-chase");
      loading.style.display = "flex";
      input.disabled = "true";
      await newMsg.set(dataUser);
      loading.appendChild(success);
      success.classList.add("animate__jackInTheBox");
      spinner.style.display = "none";
      setTimeout(() => {
        loading.style.display = "none";
        spinner.style.display = "";
        success.remove();
        input.removeAttribute("disabled");
        form.reset();
      }, 2000);
    }
  });
};
const getProjects = async () => {
  const url = await fetch(
    "https://gist.githubusercontent.com/XcarlosX20/7892306de1603262c4d39ba16c6af544/raw/72e8096cb59e7e905cbe36ef3670e05a64fd3f30/projectslist.json"
  );
  const res = await url.json();
  const projects = await res;
  const listPortafolio = document.querySelector("#list-portafolio");
  projects.forEach((project) => {
    const { imageURL, name, tecnologies, url, urlGitHub } = project;
    const formatTxt = (arr) => {
      let elements = "";
      for (let i = 0; i < arr.length; i++) {
        elements += `${arr[i]}, `;
      }
      let txt = elements.substring(0, elements.length - 2) + ".";
      return txt;
    };
    let card = `<div class="project-card">
            <div class="card-img">
                <div class="buttons" id="buttons">
                    <a href="${url}" target="_blank" class="animate__animated">
                            <i class="bi bi-eye-fill"></i>
                    </a>
                    <a href="${urlGitHub}" target="_blank" class="animate__animated">
                            <i class="bi bi-github"></i>
                    </a>
                </div>
                <img src=${imageURL} alt=${name}>
            </div>
            <div class="card-info">
                <p>${name}</p>
                <p>Technologies: <span>${formatTxt(tecnologies)}</span></p>
            </div>
         </div>`;

    listPortafolio.innerHTML += card;
  });
};
