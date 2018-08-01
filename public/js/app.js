$(document).ready(function () {
    $(document).on('click','.submit', function (e) {
        e.preventDefault();
        var qURL = location.href + '/';
        console.log(qURL)
        $.ajax({
            method: "GET",
            url: qURL
        })
        location.reload();
    })
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