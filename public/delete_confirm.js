'use strict';

var confirmation = document.getElementById("deletebylink");
confirmation.addEventListener("click", confirmation.onclick);
 confirmation.onclick = function(event){
    console.log("clicked");


    var check = confirm("Are you sure to delete this Album?");
    if(check == false){
        event.preventDefault();
        return;

        } else {

        var request = new XMLHttpRequest();
        request.open("get","/deleteAlbum");
        request.setRequestHeader("Content-Type","application/json");
        request.send()
        request.onreadystatechange = function(){
           if(request.onreadystatechange == 4 && request.status == 200){
            console.log("delete");
           }
            }
        }
    } 
    
        
    


