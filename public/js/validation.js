'use strict';

var password = document.getElementById("password");
var confirm_password = document.getElementById("confirm_password");

var validatePassword = function(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;