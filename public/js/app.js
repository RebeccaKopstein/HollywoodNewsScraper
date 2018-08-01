$(document).ready(function () {
   
    $(document).on('click', '.delete-button', function (event) {
        event.preventDefault();
        var qURL = location.href + '/' + $(this).data('note');
        $.ajax({
            method: "DELETE",
            url: qURL
        })
        location.reload();
    })
})