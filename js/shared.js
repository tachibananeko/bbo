AOS.init();
$('.routerHref').click(function(){
    $('#toService,#toProtection').removeClass('--active');
    location = $(this).attr('data-href');
    location.reload()
})


$(window).ready(function(){
    setTimeout(function(){
        $('#load').css('display','none')
    },300)
})