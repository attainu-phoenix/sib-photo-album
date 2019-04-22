'use strict'
$(document).ready(function (e) {
    $('#photosUploadForm').on('submit', (function (e) {
        e.preventDefault();
        var formData = new FormData(this);

        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener('progress', function (e) {
                    if (e.lengthComputable) {
                        var percent = Math.round((e.loaded / e.total) * 100);
                        console.log(percent)
                        $('#progressbar').attr('aria-valuenow', percent).css('width', percent + '%').text(percent + '%');

                    }
                });

                return xhr;
            },
            type: 'POST',
            url: $(this).attr('action'),
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
                var albumId = $('#albumId').val()
                window.location.replace("/albumPhotos?id=" + albumId);
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
        $("#progerss").show();
    });
});