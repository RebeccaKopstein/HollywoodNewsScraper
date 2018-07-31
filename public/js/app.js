$(document).ready(function () {
    $('.delete-button').on('click', function (e) {
        e.preventDefault();
        var qURL = location.href + '/' + $(this).data('note');
        $.ajax({
            method: "DELETE",
            url: qURL
        })
        location.reload();
    })
})