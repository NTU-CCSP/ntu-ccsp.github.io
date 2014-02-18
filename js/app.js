$(document).foundation();

var nav_height = 50;

$(function() {

    // init
    var scn = detect_screen();

    if( scn.mobile ){
        create_mobile_nav();
    }

    if( scn.small ){
        
        $.scrollIt({
            easing: 'easeInOutExpo',
            scrollTime: 700,
            topOffset: 0,
            onPageChange: function(idx){
                var url = "#" + $('[data-scroll-index='+idx+']').attr('id');
                ga('send', 'pageview', url);
            }
        });

        $('.path-icon-list').find('li').addClass('animate');

    }else{
        $("nav").sticky({topSpacing:0,wrapperClassName:'nav-wrapper'});
        $.scrollIt({
            easing: 'easeInOutExpo',
            scrollTime: 700,
            topOffset: nav_height,
            onPageChange: function(idx){
                var url = "#" + $('[data-scroll-index='+idx+']').attr('id');
                ga('send', 'pageview', url);
            }
        });
        $('.parallax-wrapper').each(function(){
            var parallax_section = $(this);
            var parallax_speed = parseFloat(parallax_section.attr('data-bgspeed'));
            if( parallax_speed == -1 ){
                parallax_section.css('background-attachment', 'fixed');
                parallax_section.css('background-position', 'center center');
                return;
            }
            $(window).scroll({section: parallax_section,speed : parallax_speed}, parallax_calc);
        });
        $(window).scroll({target: $('.chart')},pie_chart);
        $(window).scroll({target: $('.path-icon-list')}, list_animation);

    }

    $( window ).resize(function() {
        tasks();
    });

    // Send ga events when an element with [data-ga] is clicked.
    $('body').on('click', '[data-ga]', function(e){
        ga('send', 'event', 'button', 'click', $(this).data('ga'));
    });
});

var tasks = function(){
    var scn = detect_screen();
        
        if( scn.mobile ){
            create_mobile_nav();
        }else{
            delete_mobile_nav();
        }

        if( scn.small ){
            // remove sticky nav
            if($('.nav-wrapper').length > 0 ){
                $('nav').unstick();
            }

            $.scrollIt({
                easing: 'easeInOutExpo',
                scrollTime: 700,
                topOffset: 0,
                onPageChange: function(idx){
                    var url = "#" + $('[data-scroll-index='+idx+']').attr('id');
                    ga('send', 'pageview', url);
                }
            });

            // stop parallax scroll
            $(window).unbind('scroll', parallax_calc);
            $('.parallax-wrapper').removeAttr('style');

            // preload anitmate
            $('.chart').easyPieChart({
                lineWidth: 15,
                size:200,
                barColor:'#8bdaa2',
                trackColor:'#f2f2f2',
                animate:1400,
                scaleColor: false,
                lineCap: 'square'
            });
            $('.path-icon-list').find('li').addClass('animate');

        }else{
            // add sticky nav
            if($('.nav-wrapper').length === 0){
                $("nav").sticky({topSpacing:0,wrapperClassName:'nav-wrapper'});
            }

            $.scrollIt({
                easing: 'easeInOutExpo',
                scrollTime: 700,
                topOffset: nav_height,
                onPageChange: function(idx){
                    var url = "#" + $('[data-scroll-index='+idx+']').attr('id');
                    ga('send', 'pageview', url);
                }
            });
            // parallax on
            $('.parallax-wrapper').each(function(){
                var parallax_section = $(this);
                var parallax_speed = parseFloat(parallax_section.attr('data-bgspeed'));
                if( parallax_speed == -1 ){
                    parallax_section.css('background-attachment', 'fixed');
                    parallax_section.css('background-position', 'center center');
                    return;
                }
                $(window).scroll({section: parallax_section,speed : parallax_speed}, parallax_calc);
            });
            // bind animation event
            $(window).scroll({target: $('.chart')},pie_chart);
            $(window).scroll({target: $('.path-icon-list')}, list_animation);
        }
};


var create_mobile_nav = function(){
    $(".small-menu").addClass('open');
    $(".menu-icon").click( function(e){
        e.preventDefault();
        $(".sub-nav").toggleClass('open');
    });

    $('.sub-nav').click( function(){
        $(".sub-nav").toggleClass('open');
    });
};

var delete_mobile_nav = function(){
    $('.sub-nav').off('click');
    $(".menu-icon").off('click');
    $(".small-menu").removeClass('open');
};

var detect_screen = function(){
    var small_screen = !matchMedia(Foundation.media_queries['large']).matches;
    var mobile_screen = matchMedia(Foundation.media_queries['small']).matches;
    
    return {
        small: small_screen,
        mobile: mobile_screen
    };
};

var parallax_calc = function( e ){
    var parallax_section = e.data.section;
    var parallax_speed = e.data.speed;
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
};

var pie_chart = function(e){
    var target = e.data.target;
    if ( $(window).scrollTop() + $(window).height() > target.offset().top + 100) {
        target.easyPieChart({
            lineWidth: 15,
            size:200,
            barColor:'#8bdaa2',
            trackColor:'#f2f2f2',
            animate:1400,
            scaleColor: false,
            lineCap: 'square'
        });
    }
};

var list_animation = function(e){
    var target = e.data.target;
    if ( $(window).scrollTop() + $(window).height() > target.offset().top + 250) {
        var elements = target.find('>li');
        elements.each(function (i) {
            var element = $(this);
            setTimeout(function () {
                element.addClass('animate');
            }, (i * 600));
        });
    }
}
