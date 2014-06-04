(function() {

    /* ----------- Animation Code---------------*/

    //ie detect
    var ie = (function() {
        var undef, rv = -1; // Return value assumes failure.
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        var trident = ua.indexOf('Trident/');

        if (msie > 0) {
            // IE 10 or older => return version number
            rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        } else if (trident > 0) {
            // IE 11 (or newer) => return version number
            var rvNum = ua.indexOf('rv:');
            rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
        }

        return ((rv > -1) ? rv : undef);
    }());

    // disable/enable scroll
    var keys = [32, 37, 38, 39, 40];

    function keydown(e) {
        for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                e.preventDefault();
                return;
            }
        }
    }

    function touchmove(e) {
        // e.preventDefault();
    }

    function wheel(e) {
        // e.preventDefault();
    }

    function disable_scroll() {
        window.onmousewheel = document.onmousewheel = wheel;
        document.onkeydown = keydown;
        document.body.ontouchmove = touchmove;
    }

    function enable_scroll() {
        window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;
    }


    var docElem = window.document.documentElement,
        scrollVal,
        isRevealed = false, // true: content revealed
        noscroll,
        isAnimating,
        target = $('.push-animation');

    var scrollY = function() {
        return window.pageYOffset || docElem.scrollTop;
    }


    var scrollPage = function() {
        scrollVal = scrollY();

        //fix banner scrolling event
        if (noscroll && !ie) {
            if (scrollVal < 0) return false;
            window.scrollTo(0, 0);
        }

        if (isAnimating) {
            return false;
        }

        if (scrollVal <= 0 && isRevealed) {
            toggle(0);
        } else if (scrollVal > 0 && !isRevealed) {
            toggle(1);
        }
    }

    var toggle = function(reveal) {
        isAnimating = true;

        if (reveal) {
            target.addClass('performing'); // Reveal the content
        } else {
            noscroll = true;
            disable_scroll();
            target.removeClass('performing');
        }

        setTimeout(function() {
            isRevealed = !isRevealed;
            isAnimating = false;
            if (reveal) {
                noscroll = false;
                $("video")[0].pause();
                enable_scroll();
            }
            $("video")[0].play();
        }, 1300);
    }

    var pageScroll = scrollY();
    noscroll = pageScroll === 0;

    disable_scroll();

    if (pageScroll) {
        isRevealed = true;
        target.addClass('performing');
    }

    window.addEventListener('scroll', scrollPage);

    /* Routing */

    // Initialize foundation
    $(document).foundation();

    var currentModal;

    var router = function() {
        var teamName = location.hash && location.hash.slice(1);

        if (teamName) {
            // There is a team

            if(!isRevealed){
                // If content not revealed yet, reveal content.
                toggle(1);
            }
            currentModal = $('#modal-' + teamName);
            currentModal.foundation('reveal', 'open', {});
        } else {
            // Close modal and unset currentModal
            // console.log("unset team");
            if (currentModal) {
                currentModal.foundation('reveal', 'close', {});
            }
            currentModal = null;
        }
    };

    // Remove hash when modal is closed
    // Reference: http://stackoverflow.com/questions/1397329/how-to-remove-the-hash-from-window-location-with-javascript-without-page-refresh
    $(document).on('closed', '[data-reveal]', function() {
        var scrollTop = document.body.scrollTop;

        location.hash = ""; // Triggers router(), but should have no side-effects.

        document.body.scrollTop = scrollTop;
    });

    window.onhashchange = router;
    router();

    // Router invoked, enabme animation now.
    target.removeClass('disable-animation');
}());