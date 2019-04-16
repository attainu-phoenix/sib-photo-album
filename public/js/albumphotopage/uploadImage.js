'use strict'

$(document).ready(function (e) {
    $('#photosUploadForm').on('submit', (function (e) {
        e.preventDefault();
        var formData = new FormData(this);

        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
               //window.location.replace("/albumPhotos?success=true");
               console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        });
    }));

    $('#photoBrowse').on('change', function () {
        //get the file name
        var fileName = $(this).val();
        //replace the "Choose a file" label
        $(this).next('.custom-file-label').html(fileName);
    })

    $("#uploadButton").on("click", function () {
        $("#photosUploadForm").submit();
    });
});