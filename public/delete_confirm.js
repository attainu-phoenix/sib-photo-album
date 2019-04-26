'use strict';
var confirmation = document.getElementById("deletebylink");

confirmation.addEventListener("click", function (event) {

   console.log("Clicked ");    
   
   var check = confirm("Are you sure to delete this Album?");

   if (check == false) {

       event.preventDefault();

       return;

   }

   var request = new XMLHttpRequest();

   request.open("get", "/deleteAlbum");

   request.setRequestHeader("Content-Type", "application/json");

   request.send()

   request.onreadystatechange = function () {

       if (request.readyState == 4 && request.status == 200) {        }

   }

});
