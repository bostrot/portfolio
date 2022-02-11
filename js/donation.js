$('#donate').click(function () {
    $('.modal').show();
    $("html, body").animate({
        scrollTop: 0
    }, "slow");
});

$('.modal').bind('click', function (evt) {
    if (evt.target == $('.modal')[0]) {
        $('.modal').hide();
    }
});