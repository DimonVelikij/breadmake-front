$(function () {
    //раскрывашки для меню
    $(".auth-button").click(function () {
        $('.user-links').slideToggle();
    });
    $(".menu-adaptive_bars").click(function () {
        $(".menu").slideToggle();
    });

    //каруселька
    var owl = $(".carousel");
    owl.owlCarousel({
        items : 1,
        autoHeight: true
    });
    owl.on("mousewheel", ".owl-wrapper", function (e) {
        if (e.deltaY > 0) {
            owl.trigger("owl.prev");
        } else {
            owl.trigger("owl.next");
        }
        e.preventDefault();
    });
    function toSlide() {
        owl.trigger("owl.next");
    }
    var slideTime = 3000;
    // var autoSlider = setInterval(toSlide, slideTime);
    $(".next_button").click(function(){
        // clearInterval(autoSlider);
        owl.trigger("owl.next");
        // autoSlider = setInterval(toSlide, slideTime);
    });
    $(".prev_button").click(function(){
        // clearInterval(autoSlider);
        owl.trigger("owl.prev");
        // autoSlider = setInterval(toSlide, slideTime);
    });

    //галерея
    $("[data-fancybox]").fancybox();
    
    //выдвигашка для корзины

    $('#header-cart').hover(
        function () {
            $(this).stop().animate({
                right: '0'
            }, 700, 'easeInSine');
        },
        function () {
            $(this).stop().animate({
                right: '-230px'
            }, 700, 'easeOutBounce');
        }
    );

});