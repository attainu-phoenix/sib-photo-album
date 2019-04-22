'use strict'
var editButton = document.getElementById('editPhotos');
editButton.addEventListener('click', function () {

    var deleteButton = document.getElementById("delete")
    var selectButton = document.getElementById("selectAll")
    var resetAll = document.getElementById('resetAll');
    if (deleteButton.style.display == "none" && selectButton.style.display == "none" && resetAll.style.display == "none") {
        deleteButton.style.display = "block";
        selectButton.style.display = "block";
        resetAll.style.display = "block";
        var checkBoxes = document.getElementsByClassName('form-check-input');
        for (var i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].type = "checkbox";
        }
    } else {

        deleteButton.style.display = "none";
        selectButton.style.display = "none";
        resetAll.style.display = "none";
        var checkBoxes = document.getElementsByClassName('form-check-input');
        for (var i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].type = "hidden";
        }
    }

})

var resetAll = document.getElementById('resetAll');
resetAll.addEventListener('click', function () {
    var checkBoxes = document.getElementsByClassName('form-check-input');
    for (var i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].checked = false;
    }
})

var selectAll = document.getElementById('selectAll');
selectAll.addEventListener('click', function () {

    var checkBoxes = document.getElementsByClassName('form-check-input');
    for (var i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].checked = true;
    }
})

var deletePhotos = document.getElementById('delete');
deletePhotos.addEventListener("click", function () {

    var photosToBeDeleted = [];
    var checkBoxes = document.getElementsByClassName('form-check-input');
    for (var i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked == true) {
            photosToBeDeleted.push(checkBoxes[i].value);
        }
    }

    var confirmation = confirm("Are you sure");
    if (confirmation == false) {
        return;
    }
    // console.log(photosToBeDeleted);
    var albumId = document.getElementById("albumId").value;
    var data = {
        photosToBeDeleted: photosToBeDeleted,
        albumId: albumId
    };
    var request = new XMLHttpRequest();
    request.open("delete", "/deleteAlbumsPhotos");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));
    request.onreadystatechange = function () {
        console.log("onreadystatechange executed ...")
        if (request.readyState == 4 && request.status == 200) {

            var albumId = document.getElementById("albumId").value;
            window.location.href = '/albumPhotos?id='+albumId;
            var responseFromServer = JSON.parse(request.responseText);
            console.log(responseFromServer);
        }
    }
  

})

