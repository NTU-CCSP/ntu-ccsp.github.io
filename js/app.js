$(document).foundation();

var nav_height = 50;



$(function() {

    var small_screen = !matchMedia(Foundation.media_queries['large']).matches;
    var mobile_screen = matchMedia(Foundation.media_queries['small']).matches;
    if( !small_screen ){
        $("nav").sticky({topSpacing:0,wrapperClassName:'nav-wrapper'});
        
        $.scrollIt({
            easing: 'easeInOutExpo',
            scrollTime: 700,
            topOffset: nav_height
        });

        $('.parallax-wrapper').each(function(){
            var parallax_section = $(this);
            var parallax_speed = parseFloat(parallax_section.attr('data-bgspeed'));
            // if( parallax_speed == 0 || gdlr_touch_device ) return;
            if( parallax_speed == -1 ){
                parallax_section.css('background-attachment', 'fixed');
                parallax_section.css('background-position', 'center center');
                return;
            }

            $(window).scroll(function(){
                // if in area of interest
                if( ( $(window).scrollTop() + $(window).height() > parallax_section.offset().top ) &&
                    ( $(window).scrollTop() < parallax_section.offset().top + parallax_section.outerHeight() ) ){
                    
                    var scroll_pos = 0;
                    if( $(window).height() > parallax_section.offset().top ){
                        scroll_pos = $(window).scrollTop();
                    }else{
                        scroll_pos = $(window).scrollTop() + $(window).height() - parallax_section.offset().top;
                    }
                    parallax_section.css('background-position', 'center ' + (-scroll_pos * parallax_speed) + 'px');
                }
            });
        });
    }

    if( mobile_screen ){
        $(".small-menu").addClass('open');
        $(".menu-icon").click( function(e){
            e.preventDefault();
            $(".sub-nav").toggleClass('open');
        });

        $('.sub-nav').click(function(){
            $(".sub-nav").toggleClass('open');
        });
    }

    var target = $('.chart');
    $(window).scroll(function(){
        if ( $(window).scrollTop() + $(window).height() > target.offset().top + 100) {
            
            $('.chart').easyPieChart({
                lineWidth: 15,
                size:200,
                barColor:'#8bdaa2',
                trackColor:'#f2f2f2',
                animate:1400,
                scaleColor: false,
                lineCap: 'square'
            });
        }
    });

    var target2 = $('.path-icon-list');
    $(window).scroll(function(){
        if ( $(window).scrollTop() + $(window).height() > target2.offset().top + 100) {
            var elements = target2.find('>li');
            elements.each(function (i) {
                var element = $(this);
                setTimeout(function () {
                    element.addClass('animate');
                }, (i * 600));
            });
        }
    });


    $.scrollIt({
        easing: 'easeInOutExpo',
        scrollTime: 700,
        topOffset: 0,
        onPageChange: function(idx){
            var url = "#" + $('[data-scroll-index='+idx+']').attr('id');
            ga('send', 'pageview', url);
        }
    });


    // $('.chart').easyPieChart({
    //     lineWidth: 15,
    //     size:200,
    //     barColor:'#8bdaa2',
    //     trackColor:'#f2f2f2',
    //     animate:1200,
    //     scaleColor: false,
    //     lineCap: 'square'
    // });

    
    
    $( window ).resize(function() {

    });

    // Send ga events when an element with [data-ga] is clicked.
    $('body').on('click', '[data-ga]', function(e){
        // console.log( 'GA', $(this).data('ga') );
        ga('send', 'event', 'button', 'click', $(this).data('ga'));
    });
});




