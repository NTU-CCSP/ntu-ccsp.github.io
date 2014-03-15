var nav_height = 50;

$(function() {
    $(document).foundation();

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

    }else{
        $("nav").sticky({topSpacing:0,wrapperClassName:'nav-wrapper'});
        $.scrollIt({
            easing: 'easeInOutExpo',
            scrollTime: 700,
            topOffset: -nav_height,
            onPageChange: function(idx){
                var url = "#" + $('[data-scroll-index='+idx+']').attr('id');
                ga('send', 'pageview', url);
            }
        });

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

        }else{
            // add sticky nav
            if($('.nav-wrapper').length === 0){
                $("nav").sticky({topSpacing:0,wrapperClassName:'nav-wrapper'});
            }

            $.scrollIt({
                easing: 'easeInOutExpo',
                scrollTime: 700,
                topOffset: -nav_height,
                onPageChange: function(idx){
                    var url = "#" + $('[data-scroll-index='+idx+']').attr('id');
                    ga('send', 'pageview', url);
                }
            });
           
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