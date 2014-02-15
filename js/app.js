$(document).foundation();


$(function() {
    $("nav").sticky({topSpacing:0,wrapperClassName:'nav-wrapper'});
    $.scrollIt({
        easing: 'easeInOutExpo',
        scrollTime: 700,
        topOffset: -50
    });
    $('.chart').easyPieChart({
        lineWidth: 15,
        size:200,
        barColor:'#a9e16e',
        trackColor:'#f2f2f2',
        animate:1200,
        scaleColor: false,
        lineCap: 'square'
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
});