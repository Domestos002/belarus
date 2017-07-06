


$(function(){


    function cardSlider(){

        var sync1 = $(".card-slider");
        var sync2 = $(".card-carousel");
        var slidesPerPage = 3; //globaly define number of elements per page
        var syncedSecondary = true;

        sync1.owlCarousel({
            items : 1,
            slideSpeed : 900,
            nav: false,
            autoplay: true,
            dots: false,
            loop: true,
            responsiveRefreshRate : 200,
        }).on('changed.owl.carousel', syncPosition);

        sync2
            .on('initialized.owl.carousel', function () {
                sync2.find(".owl-item").eq(0).addClass("current");
            })
            .owlCarousel({
                items : slidesPerPage,
                dots: true,
                nav: true,
                loop: false,
                margin: 20,
                smartSpeed: 200,
                slideSpeed : 500,
                slideBy: slidesPerPage,
                responsiveRefreshRate : 100
            }).on('changed.owl.carousel', syncPosition2);


        if (sync1.find(".owl-item:not(.cloned)").length == 1) {

            sync2.css({"display" : "none"});
        }

        function syncPosition(el) {
            var count = el.item.count-1;
            var current = Math.round(el.item.index - (el.item.count/2) - .5);

            if(current < 0) {
                current = count;
            }
            if(current > count) {
                current = 0;
            }

            sync2
                .find(".owl-item")
                .removeClass("current")
                .eq(current)
                .addClass("current");
            var onscreen = sync2.find('.owl-item.active').length - 1;
            var start = sync2.find('.owl-item.active').first().index();
            var end = sync2.find('.owl-item.active').last().index();

            if (current > end) {
                sync2.data('owl.carousel').to(current, 100, true);
            }
            if (current < start) {
                sync2.data('owl.carousel').to(current - onscreen, 100, true);
            }
        }

        function syncPosition2(el) {
            if(syncedSecondary) {
                var number = el.item.index;
                sync1.data('owl.carousel').to(number, 100, true);
            }
        }

        sync2.on("click", ".owl-item", function(e){
            e.preventDefault();
            var number = $(this).index();
            sync1.data('owl.carousel').to(number, 300, true);
        });


    }

    function bag() {
        var item = $(".bag-order-item");
        var next = $(".bag-next-btn");
        var change = $(".bag-order__head-title-change");

        // $(".bag-goods__item-count-plus").click(function () {
        //     var input = $(this).siblings("input");
        //     $(this).siblings("input").css({"background-color" : "tomato"});
        //     // console.log(input.attr("value")());
        //
        // });

        (function () {
            var i = 1;
            var j = 0;
            $(".bag_main").find(".bag-num span").each(function () {
                $(this).append(i);
                j++;
                if (j % 2 == 0){
                    i++;
                }
            });
        })();

        next.click(function () {
            var next = $(this).parents(".bag-order-item").next(".bag-order-item-result");
            var parent = $(this).parents(".bag-order-item");

            next.stop().slideDown(300);
            next.removeClass('hidden');
            parent.stop().slideUp(300);
        });

        change.click(function () {
            var parent = $(this).parents(".bag-order-item");
            parent.stop().slideUp(300);
            parent.prev(".bag-order-item").stop().slideDown(300);
        })

    }




    $(".lines-slider.owl-carousel").owlCarousel({
        items: 4,
        nav: true,
        autoplay: false,
        loop: true,
        margin: 120,
        autoheight: true,
        responsive: {
            0: {
                items: 1
            },

            480: {
                items: 2
            },

            650: {
                items: 3
            },

            870: {
                items: 4
            }


        }
    });




    $(".reviews-slider.owl-carousel").owlCarousel({
        items: 5,
        nav: true,
        autoplay: false,
        loop: true,
        margin: 20,
        autoheight: true,
        responsive: {
            0: {
                items: 1
            },

            480: {
                items: 2
            },

            650: {
                items: 3
            },

            870: {
                items: 4
            },

            960: {
                items: 5
            }


        }
    });

    $(".partners-slider.owl-carousel").owlCarousel({
        items: 8,
        nav: true,
        autoplay: false,
        loop: true,
        margin: 10,
        autoheight: true,
        responsive: {
            0: {
                items: 2
            },

            400: {
                items: 3
            },

            550: {
                items: 4
            },

            650: {
                items: 5
            },

            850: {
                items: 6
            },

            1100: {
                items: 7
            },

            1200: {
                items: 8
            }



        }
    });


    $("#page-hero-slider").owlCarousel({
        items: 1,
        nav: true,
        autoplay: false,
        loop: true,
        margin: 10,
        autoheight: true,
        responsive: {
            0: {
                nav: false
            },

            768: {
                nav: true
            }

        }
    });


    function siteDD(){

        var sub = $(".side-dd-sub");
        var main = $(".side-dd");
        var subList = $('.side-dd-sub-list');
        var mainHeight = main.outerHeight();
        var max = mainHeight / 50 - 1;
        console.log(max + "- max");
        $(subList).each(function () {
            var j = 0;
            var list = $(this);
            $(this).find('a').each(function (index) {
                if ( (j % max) == true && !(j === 0) ) {
                    list.find('a').slice(j-1,j+max+1).wrapAll('<div class="side-dd-sub-column"></div>');
                }
                j++;
            });
            list.find(".side-dd-sub-column").appendTo(list);
        });



        sub.css({"height" : main.outerHeight()});

        sub.css({"left" : main.outerWidth()});

        sub.parent("li").mouseenter(function(){
            sub.removeClass("active");
            $(this).find(".side-dd-sub").addClass("active");
        });

        // sub.parent("li").mouseleave(function(){
        //     sub.removeClass("active");
        // });

    }

    function slideMenu(){
        var count = 0;

        $(".uk-offcanvas").find(".uk-parent").each(function () {
            count++;
            $(this).attr('id', 'dd-' + count);
            return count;
        });

        console.log(count);

        for (var i = 1; i <= count; i++) {
            var caption = $(".uk-offcanvas").find(".uk-parent#dd-" + i + " > a").filter( ':first' );
            var body = $(".uk-offcanvas").find(".uk-parent#dd-" + i + "").find("ul").filter( ':first' );
            $(".uk-offcanvas-bar > ul").append( "<div class='dp-panel'" + " id='dp-" + i + "'> </div>");

            caption.clone().appendTo(".dp-panel#dp-" + i);
            body.appendTo(".dp-panel#dp-" + i);
        };

        $(".uk-offcanvas").find(".uk-parent").click(function() {
            var number = $(this).attr('id');
            number = number.split("-")[1];

            $(".dp-panel#dp-" + number).addClass("dp-panel-open");

        });

        $(".dp-panel > a").click(function() {
            var number = $(this).parent().attr('id');
            number = number.split("-")[1];
            $(".dp-panel#dp-" + number).removeClass("dp-panel-open");
            $(".uk-offcanvas-bar .uk-nav .uk-parent").removeClass("uk-open");

        });

    }





    function sliderHeight(){
        $(".page-hero-slider__list-content").css({"height" : $(".page-hero-slider__img").height()});
    }

    function catalogDD(){
        var b = $('body');
        var bWidth = $('body').outerWidth();
        var scrollbar = window.innerWidth - bWidth;
        var catalog = $(".catalog-dd");
        catalog.on('hide.uk.dropdown', function(){

            var hamburger = $(".hamburger-desktop");
            hamburger.removeClass("is-active");
            if (b.height() > $(window).height()) {
                $('html').removeClass("uk-modal-page");
                b.css({paddingRight:'0'});
            }

        });
        if (b.height() > $(window).height()) {
            catalog.on('show.uk.dropdown', function(){


                $('html').addClass("uk-modal-page");
                b.css({paddingRight:scrollbar+'px'});


            });
        }
    }

    function actions() {
        if ($(window).width() <= 500){
            $(".page-header__actions-bar .uk-dropdown").addClass("hidden-imp");
        }
        if ($(window).width() >= 500){
            $(".page-header__actions-bar .uk-dropdown").removeClass("hidden-imp");
        }
    }

    $(document).ready(function () {

        bag();
        actions();
        catalogDD();

        // $(".side-dd-text").click(function () {
        //     $(".hamburger-desktop").toggleClass("is_active");
        // });


        $(".page-header__logo-panel").stick_in_parent({
            parent: $(".site-wrapper")
            .on("sticky_kit:stick", function(e) {
                console.log("has stuck!", e.target);
                logoHeight = $(".page-header__logo-panel").outerHeight();

                $(".bag-result-block").stick_in_parent({
                    offset_top: logoHeight
                });
                console.log("has fuck!", e.target);
            })
        });




        $("#sticky_item").trigger("sticky_kit:detach");

        $(".page-header__logo-panel").on('load', function() {
            sliderHeight();
        });


        $(".hamburger-desktop").on('click', function(e) {
            var hamburger = $(this);

            if (hamburger.hasClass("is-active")) {
                hamburger.removeClass("is-active");

            }

            else{
                hamburger.addClass("is-active");
            }
        });


        siteDD();



        jQuery.fn.extend({
            toggleOwl: function(selector, options, destroy){
                return this.each(function(){
                    $(this).find(selector).filter(function(){
                        return $(this).parent().is(':visible');
                    }).owlCarousel(options);

                    $(this).on('shown.bs.tab', function(event){
                        var target = $(event.target.getAttribute('href')).find(selector);
                        if(!target.data('owlCarousel')){
                            var owl = target.owlCarousel(options).data("owlCarousel");
                        }
                    });
                    if(destroy === true){
                        $(this).on('hide.bs.tab', function(event){
                            var target = $(event.target.getAttribute('href')).find(selector);
                            if(target.data('owl.carousel')){
                                target.data('owl.carousel').destroy();
                            }
                        });
                    }
                });
            }
        });

        $('.toggleOwl').toggleOwl('.owl-carousel', {
            loop: true,
            items: 4,
            margin: 25,
            nav: true,
            touchDrag: false,
            responsive: {
                0: {
                    items: 1
                },

                480: {
                    items: 2
                },

                650: {
                    items: 3
                },

                870: {
                    items: 4
                }


            }
        });

        $('.products-slider').owlCarousel({
            loop: true,
            items: 4,
            margin: 25,
            nav: true,
            touchDrag: false,
            responsive: {
                0: {
                    items: 1
                },

                480: {
                    items: 2
                },

                650: {
                    items: 3
                },

                870: {
                    items: 4
                }


            }
        });



        $(".page-hero-slider__item img").on('load', function() {
            sliderHeight();
        });
        slideMenu();
        cardSlider();

        $(".uk-parent").click(function() {
            $(this).find(".uk-nav").css({"height" : $(".uk-offcanvas-bar").outerHeight()});

        });

        $(".slide-toggle").click(function() {

            if ($(this).hasClass("active")){
                $(this).removeClass("active");

                $(this).parent("div").siblings(".slide-toggle-content").stop().slideDown(400);
            }
            else {
                $(this).addClass("active");

                $(this).parent("div").siblings(".slide-toggle-content").stop().slideUp(400);
            }

        });

        var hmobile = $(".hamburger-mobile");

        $(".uk-parent > a").on('click', function(e) {
            e.preventDefault();
        });

        $("#offcanvas-close").on('click', function(e) {
            $('#offcanvas')[0].click();
        });


        hmobile.on('click', function(e) {
            $(this).addClass('is-active');
        });

        $(".checkbox-btn").on('click', function(e) {

            $(this).find(".jq-checkbox").toggleClass("checked");

        });




        $(".hidden-tabs").on('click', function(e) {
            var count;
            $(this).find(".uk-tab li").each(function () {
                count++;
                $(this).attr('id', 'dd-' + count);
                return count;
            });

        });


        $(window).resize(function () {
            sliderHeight();
            catalogDD();
            actions();
        });

    });

    $(function () {
        $('a.js-scrollScreen[href*="#"]:not([href="#"])').click(function () {

            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[id=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });

});



$(window).on('load', function() {


    $('input, select').styler({


    });

});
