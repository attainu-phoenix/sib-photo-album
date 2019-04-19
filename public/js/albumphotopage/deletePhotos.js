'use strict'

$(document).ready(function(){
    $('#editPhotos').click(function(){
        $('#selectPhotos').toggle();
        $('#deletePhotos').toggle();
        $('.form-check-input').attr('type','checkbox');
    })

    $('#selectPhotos').click(function(){
       $('.form-check-input').prop('checked',true);
    })

    $('#deletePhotoForm').on('submit',(function(e){
        e.preventDefault();
        var formData = new FormData(this);

        $.ajax({
            type:'POST',
            url:$(this).attr('action'),
            data:formData,
            cache:false,
            contentType:false,
            processData:false,
            success:function(data){
                console.log(data);
            },
            error:function(data){
                console.log(data);
            }
        })

    }));

    $('#deletePhotos').on("click",function(){
        $('#deletePhotoForm').submit();
    })

})