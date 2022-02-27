//function of Dark-Light Mode
var action = document.getElementById("action"); //add action to image
function changeMode() {
  var checkBox = document.getElementById("switch");
  if (checkBox.checked) {
    document.documentElement.style.setProperty("--background-color", "#111");
    document.documentElement.style.setProperty("--main-color", "#fff");
    action.style.opacity = "65%"; //add action to image
  } else {
    document.documentElement.style.setProperty("--background-color", "#fff");
    document.documentElement.style.setProperty("--main-color", "#111");
    action.style.opacity = "1"; //add action to image
  }
}
// add Action On Image
action.style.transition = "1s linear";

action.addEventListener("mouseover", () => {
  action.style.transform = "rotateY(180deg) ";
});

action.addEventListener("mouseout", () => {
  action.style.transform = "rotateY(0) ";
});

//check validation
var userName = document.getElementById("name");
var errorName = document.getElementById("error-name");

var phone = document.getElementById("phone");
var errorPhone = document.getElementById("error-phone");

var email = document.getElementById("email");
var errorEmail = document.getElementById("error-email");

var url = document.getElementById("url");
var errorUrl = document.getElementById("error-url");

var message = document.getElementById("message");
var errorMessage = document.getElementById("error-message");

var submit = document.getElementById("submit");

submit.addEventListener("click", element => {
  element.preventDefault();
  // check name
  if (userName.value == "") {
    errorName.innerHTML = "Your Name Is Not Valid";
    userName.focus();
  } else {
    errorName.innerHTML = "";
  }
  // check email
  if (email.value == "") {
    errorEmail.innerHTML = "Your Email Is Not Valid";
    email.focus();
  } else {
    errorEmail.innerHTML = "";
  }
  if (message.value == "") {
    errorMessage.innerHTML = "Your Message Is Not Valid";
    message.focus();
  } else {
    errorMessage.innerHTML = "";
  }
  // check url
  if (url.value == "") {
    errorUrl.innerHTML = "Your link Is Not Valid";
    url.focus();
  } else {
    errorUrl.innerHTML = "";
  }
  // check phone
  if (phone.value.length != "9") {
    errorPhone.innerHTML = "Your Phone Number Is Not Valid";
    phone.focus();
  } else {
    errorPhone.innerHTML = "";
  }
});
