$(function () {
    "use strict";

    /*-----------------------------------
     * CLOSE NAVBAR ONCLICK
     *-----------------------------------*/
    $('.navbar-nav > li:not(.dropdown) > a').on('click', collapsebar);
    $('.d-links-sm > li:not(.dropdown) > a').on('click', collapsebar);
    $('.nav-sublinks > a.dropdown-item').on('click', collapsebar);

    function collapsebar() {
        $('.navbar-collapse').collapse('hide');
    }


    /*------------------------------------
     * OPEN PLAYSTORE LINK IN ANOTHER TAB FOR 
     *------------------------------------*/

    if (window.innerWidth > 425) {
        $('#playstore').on('click', function () {
            $(this).attr('target', '_blank');
        });
    }






    /*-----------------------------------
     * ONE PAGE SCROLLING
     *-----------------------------------*/
    // Select all links with hashes
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').not('[data-toggle="tab"]').on('click', function (event) {

        // On-page links
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();

                //Change nav bg
                var nav = $('.navbar-expand-lg');
                if (target.selector != '#home') {
                    nav.removeClass('nav-white');
                    nav.addClass('nav-gradient');
                } else {
                    nav.removeClass('nav-gradient');
                    nav.addClass('nav-white');
                }

                $('html, body').animate({
                    scrollTop: target.offset().top - 100
                }, 1000
                    // , function () {
                    // Callback after animation
                    // Must change focus!
                    // var $target = $(target);
                    // $target.focus();
                    // if ($target.is(":focus")) { // Checking if the target was focused
                    // return false;
                    // } else {
                    // $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                    // $target.focus(); // Set focus again
                    // };
                    // }
                );
            }
        }
    });



    /*-----------------------------------
     * OWL CAROUSEL
     *-----------------------------------*/
    var $testimonialsDiv = $('.testimonials');
    if ($testimonialsDiv.length && $.fn.owlCarousel) {
        $testimonialsDiv.owlCarousel({
            items: 1,
            nav: true,
            dots: false,
            navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>']
        });
    }

    var $galleryDiv = $('.img-gallery');
    if ($galleryDiv.length && $.fn.owlCarousel) {
        $galleryDiv.owlCarousel({
            nav: false,
            center: true,
            loop: true,
            autoplay: true,
            dots: true,
            navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                425: {
                    items: 3
                }
            }
        });
    }


    /*-----------------------------------
     * FEEDBACK
     *-----------------------------------*/
    $('#form-feedback').on('submit',
        function sendFeed(e) {
            e.preventDefault();
            var name = $('#name').val();
            var subject = $('#subject').val();
            var email = $('#email').val();
            var feed = $('#message').val();

            $.ajax({
                url: 'http://wottmakplus.com/feedback/index.php',
                method: "POST",
                data: {
                    n: name,
                    s: subject,
                    e: email,
                    f: feed
                },
                success: function (response) {

                    var res = null;
                    try {
                        res = JSON.parse(response);
                    } catch (e) {
                        var i = response.indexOf('{');
                        var e = response.lastIndexOf('}') + 1;
                        res = JSON.parse(response.substring(i, e));
                    }

                    $('#notification').html(res.success ? res.message : res.error);

                    if (res.success) {
                        $('#name').val('');
                        $('#subject').val('');
                        $('#email').val('');
                        $('#message').val('');
                    }

                    setTimeout(() => {
                        $('#notification').html('');
                    }, 3500);

                }, error: function (response) {

                    $('#notification').html("<div class='alert alert-danger' role='alert'>Error sending feedback.Please try again later.</div>");
                    setTimeout(() => {
                        $('#notification').html('');
                    }, 3500);

                }
            });
        }
    );

}); /* End Fn */
