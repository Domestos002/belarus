(function () {
    function siteDD() {
        var par = $(".side-dd-wrapper");
        par.each(function () {
            var par = $(this);
            // console.log(par + "- dwfr,letgprlmefA");
            var sub = par.find(".side-dd-sub");
            var main = par.find(".side-dd");
            var subList = par.find('.side-dd-sub-list');
            var mainHeight = main.outerHeight();
            // console.log(mainHeight + "- mainheight");
            var max = mainHeight / 50 - 1;
            // console.log(max + "- max");

            subList.each(function () {
                var j = 0;
                var last = 0;
                var list = $(this);
                var listLinks = list.find('a');
                // console.log(listLinks.length + "- length");
                if (listLinks.length <= max) {
                    listLinks.wrapAll('<div class="side-dd-sub-column"></div>');
                    // console.log("ne dotyanul");
                }
                else {
                    listLinks.each(function () {
                        // console.log(j + "- j");
                        // console.log(max+ "- max2");

                        if ((j % max) == 0 && !(j === 0)) {
                            listLinks.slice(last, last + max).wrapAll('<div class="side-dd-sub-column"></div>');
                            // console.log("if");
                            // console.log(last + "- last");
                            // console.log(max + "- max2");
                            // console.log(last+max + "- max+last");
                            last = j;

                            if ((listLinks.length - j) <= max) {
                                listLinks.slice(j, j + max).wrapAll('<div class="side-dd-sub-column"></div>');
                            }
                        }
                        j++;
                    });
                    list.find(".side-dd-sub-column").appendTo(list);
                }


            });

            sub.css({"height": mainHeight});

            sub.css({"left": main.outerWidth()});

            sub.parent("li").mouseenter(function () {
                sub.removeClass("active");
                $(this).find(".side-dd-sub").addClass("active");
            });
        });
    }

    function slideMenu() {
        var count = 0;

        $(".uk-offcanvas").find(".uk-parent").each(function () {
            count++;
            $(this).attr('id', 'dd-' + count);
            return count;
        });

        console.log(count);

        for (var i = 1; i <= count; i++) {
            var caption = $(".uk-offcanvas").find(".uk-parent#dd-" + i + " > a").filter(':first');
            var body = $(".uk-offcanvas").find(".uk-parent#dd-" + i + "").find("ul").filter(':first');
            $(".uk-offcanvas-bar > ul").append("<div class='dp-panel'" + " id='dp-" + i + "'> </div>");

            caption.clone().appendTo(".dp-panel#dp-" + i);
            body.appendTo(".dp-panel#dp-" + i);
        }
        ;

        $(".uk-offcanvas").find(".uk-parent").click(function () {
            var number = $(this).attr('id');
            number = number.split("-")[1];

            $(".dp-panel#dp-" + number).addClass("dp-panel-open");

        });

        $(".dp-panel > a").click(function () {
            var number = $(this).parent().attr('id');
            number = number.split("-")[1];
            $(".dp-panel#dp-" + number).removeClass("dp-panel-open");
            $(".uk-offcanvas-bar .uk-nav .uk-parent").removeClass("uk-open");

        });

    }

    function sliderHeight() {
        console.log((".page-hero-slider__img").outerHeight + "height");
        $(".page-hero-slider__item img").on("load", function (e) {
            $(".page-hero-slider__list-content").css({"height": $(".page-hero-slider__img").outerHeight()});
            console.log((".page-hero-slider__img").outerHeight + "height");

        });
    }

    function catalogDD() {
        var b = $('body');
        var bWidth = b.outerWidth();
        var scrollbar = window.innerWidth - bWidth;
        var catalog = $(".catalog-dd");
        var logoP =  $(".page-header__logo-panel");
        catalog.on('hide.uk.dropdown', function () {

            var hamburger = $(".hamburger-desktop");
            hamburger.removeClass("is-active");
            if (b.height() > $(window).height()) {
                $('html').removeClass("uk-modal-page");
                b.css({paddingRight: '0'});
                if (logoP.hasClass("is_stuck")) {
                    logoP.css({paddingRight: '0'});
                }
            }

        });
        if (b.height() > $(window).height()) {
            catalog.on('show.uk.dropdown', function () {


                $('html').addClass("uk-modal-page");
                b.css({paddingRight: scrollbar + 'px'});
                if (logoP.hasClass("is_stuck")) {
                    logoP.css({paddingRight: scrollbar + 'px'});
                }

            });
        }
    }

    function actions() {
        if ($(window).width() <= 500) {
            $(".page-header__actions-bar .uk-dropdown").addClass("hidden-imp");
        }
        if ($(window).width() >= 500) {
            $(".page-header__actions-bar .uk-dropdown").removeClass("hidden-imp");
        }
    }

    function cardSlider() {
        var sync1 = $(".card-slider");
        var sync2 = $(".card-carousel");
        var slidesPerPage = 3;
        var syncedSecondary = true;

        sync1.owlCarousel({
            items: 1,
            slideSpeed: 900,
            nav: false,
            lazyload: true,
            autoplay: true,
            dots: false,
            loop: true,
            responsiveRefreshRate: 200,
        }).on('changed.owl.carousel', syncPosition);

        sync2
            .on('initialized.owl.carousel', function () {
                sync2.find(".owl-item").eq(0).addClass("current");
            })
            .owlCarousel({
                items: slidesPerPage,
                dots: true,
                nav: true,
                loop: false,
                margin: 20,
                smartSpeed: 200,
                slideSpeed: 500,
                slideBy: slidesPerPage,
                responsiveRefreshRate: 200
            }).on('changed.owl.carousel', syncPosition2);


        if (sync1.find(".owl-item:not(.cloned)").length == 1) {

            sync2.css({"display": "none"});
        }

        function syncPosition(el) {
            var count = el.item.count - 1;
            var current = Math.round(el.item.index - (el.item.count / 2) - .5);

            if (current < 0) {
                current = count;
            }
            if (current > count) {
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
            if (syncedSecondary) {
                var number = el.item.index;
                sync1.data('owl.carousel').to(number, 100, true);
            }
        }

        sync2.on("click", ".owl-item", function (e) {
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
                if (j % 2 == 0) {
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


    function YOURAPPNAME(doc) {
        var _self = this;

        _self.doc = doc;
        _self.window = window;
        _self.html = _self.doc.querySelector('html');
        _self.body = _self.doc.body;
        _self.location = location;
        _self.hash = location.hash;
        _self.Object = Object;
        _self.scrollWidth = 0;


        // _self.bootstrap();
    }

    YOURAPPNAME.prototype.bootstrap = function () {
        var _self = this;

        // Initialize window scollBar width
        _self.scrollWidth = _self.scrollBarWidth();
    };


    // Window load types (loading, dom, full)
    YOURAPPNAME.prototype.appLoad = function (type, callback) {
        var _self = this;

        switch (type) {
            case 'loading':
                if (_self.doc.readyState === 'loading') callback();

                break;
            case 'dom':
                _self.doc.onreadystatechange = function () {
                    if (_self.doc.readyState === 'complete') callback();
                };

                break;
            case 'full':
                _self.window.onload = function (e) {
                    callback(e);
                };

                break;
            default:
                callback();
        }
    };
    YOURAPPNAME.prototype.str2json = function (str, notevil) {
        try {
            if (notevil) {
                return JSON.parse(str
                    .replace(/([\$\w]+)\s*:/g, function (_, $1) {
                        return '"' + $1 + '":';
                    })
                    .replace(/'([^']+)'/g, function (_, $1) {
                        return '"' + $1 + '"';
                    })
                );
            } else {
                return (new Function("", "var json = " + str + "; return JSON.parse(JSON.stringify(json));"))();
            }
        } catch (e) {
            return false;
        }
    };

    YOURAPPNAME.prototype.initSwitcher = function () {
        var _self = this;

        var switchers = _self.doc.querySelectorAll('[data-switcher]');

        if (switchers && switchers.length > 0) {
            for (var i = 0; i < switchers.length; i++) {
                var switcher = switchers[i],
                    switcherOptions = _self.options(switcher.dataset.switcher),
                    switcherElems = switcher.children,
                    switcherTargets = _self.doc.querySelector('[data-switcher-target="' + switcherOptions.target + '"]').children;
                console.log(switcherOptions);
                console.log(_self.str2json(switcherOptions.substr(mode)));
                for (var y = 0; y < switcherElems.length; y++) {
                    var switcherElem = switcherElems[y],
                        parentNode = switcher.children,
                        switcherTarget = switcherTargets[y];

                    if (switcherElem.classList.contains('active')) {
                        for (var z = 0; z < parentNode.length; z++) {
                            parentNode[z].classList.remove('active');
                            switcherTargets[z].classList.remove('active');
                        }
                        switcherElem.classList.add('active');
                        switcherTarget.classList.add('active');
                    }

                    switcherElem.children[0].addEventListener('click', function (elem, target, parent, targets) {
                        return function (e) {
                            e.preventDefault();
                            if (!elem.classList.contains('active')) {
                                for (var z = 0; z < parentNode.length; z++) {
                                    parent[z].classList.remove('active');
                                    targets[z].classList.remove('active');
                                }
                                elem.classList.add('active');
                                target.classList.add('active');
                            }
                        };

                    }(switcherElem, switcherTarget, parentNode, switcherTargets));
                }
            }
        }
    };

    YOURAPPNAME.prototype.options = function (string) {
        var _self = this;

        if (typeof string != 'string') return string;

        if (string.indexOf(':') != -1 && string.trim().substr(-1) != '}') {
            string = '{' + string + '}';
        }

        var start = (string ? string.indexOf("{") : -1), options = {};

        if (start != -1) {
            try {
                options = _self.str2json(string.substr(start));
            } catch (e) {
            }
        }

        return options;
    };

    YOURAPPNAME.prototype.sticky = function () {
        var _self = this;
        var stickys = _self.doc.querySelectorAll('[data-sticky]');

        var count = false;
        var mainOffset = 0;

        console.log(count + '-count');

        function init() {
            var length = stickys.length;

            if (count == false) {
                count = true;
                for (var i = 0; i < length; i++) {
                    var sticky = stickys[i];
                    var placeholder = sticky.parentNode;
                    $(sticky).wrap("<div class='sticky-placeholder'></div>");
                    placeholder.style.height = sticky.clientHeight;
                }
            }
            else {
                return false;
            }
        }

        function render() {
            var length = stickys.length;
            for (var i = 0; i < length; i++) {
                var sticky = stickys[i];
                var stickyTop = sticky.offsetTop;
                var placeholder = sticky.parentNode;
                var placeholderTop = placeholder.offsetTop;
                var header = _self.doc.getElementById("page-header");
                var parent = placeholder.parentNode;

                function detach() {
                    sticky.classList.remove("is_stuck");
                    if (sticky.hasAttribute('data-sticky-in-parent')) {
                        sticky.classList.remove("sticky-in-parent");
                    }
                }

                if (sticky.hasAttribute('data-sticky-target')) {
                    if (document.body.scrollTop >= (stickyTop + header.clientHeight)) {

                        if (document.body.scrollTop > sticky.offsetTop && !(sticky.classList.contains('is_stuck'))) {
                            console.log(stickyTop + "stickytopC");
                            console.log(document.body.scrollTop + "docscrolltopC");
                            placeholder.style.height = sticky.clientHeight + "px";
                            sticky.classList.add("is_stuck");
                            if (sticky.hasAttribute('data-sticky-in-parent')) {
                                sticky.classList.add("sticky-in-parent");
                            }
                            // sticky.style.top = mainOffset + "px";
                            // mainOffset = mainOffset + sticky.clientHeight;
                        }

                        else {

                            if (document.body.scrollTop < placeholderTop) {

                                detach();

                            }

                        }
                    }

                    else {
                        detach();
                    }
                }

                else {

                    if (document.body.scrollTop + 60 <= placeholderTop) {

                        detach();

                        console.log("DETACH!!");
                        console.log(placeholderTop + "placeholderTop!!");

                    }


                    if (document.body.scrollTop + 60 > sticky.offsetTop && !(sticky.classList.contains('is_stuck')) && !(sticky.classList.contains('attached'))) {

                        placeholder.style.height = sticky.clientHeight + "px";
                        sticky.classList.add("is_stuck");
                        if (sticky.hasAttribute('data-sticky-in-parent')) {
                            sticky.classList.add("sticky-in-parent");
                        }
                        sticky.style.top = 60 + "px";
                        console.log("init");
                        sticky.style.width = placeholder.clientWidth + "px";

                        // mainOffset = 60 + sticky.clientHeight;

                    }


                    if (document.body.scrollTop + 60 < sticky.offsetTop + sticky.clientHeight && sticky.classList.contains('attached')) {

                        sticky.classList.add("is_stuck");
                        if (sticky.hasAttribute('data-sticky-in-parent')) {
                            sticky.classList.add("sticky-in-parent");
                        }
                        sticky.style.top = 60 + "px";
                        sticky.style.width = placeholder.clientWidth + "px";

                        sticky.classList.remove("attached");
                        console.log("attach");
                        parent.style.position = "static";


                    }


                    if (document.body.scrollTop + 60 + sticky.clientHeight >= parent.offsetTop + parent.clientHeight) {
                        sticky.classList.add("attached");
                        sticky.style.top = "initial";
                        parent.style.position = "relative";
                    }



                }


            }
        }

        window.addEventListener('scroll', function () {

            init();
            render();

        }, true);

        window.addEventListener('resize', function () {

            init();
            render();

        }, true);

        init();
        render();

    };

    var app = new YOURAPPNAME(document);

    app.appLoad('loading', function () {
        console.log('App is loading... Paste your app code here.');
        // App is loading... Paste your app code here. 4example u can run preloader event here and stop it in action appLoad dom or full
    });

    app.appLoad('dom', function () {
        console.log('DOM is loaded! Paste your app code here (Pure JS code).');
        // DOM is loaded! Paste your app code here (Pure JS code).
        // Do not use jQuery here cause external libs do not loads here...

        app.initSwitcher(); // data-switcher="{target='anything'}" , data-switcher-target="anything"
    });

    app.appLoad('full', function (e) {
        $('input, select').styler({});
        $(".page-hero-slider__img").on("load", function (e) {
            console.log((".page-hero-slider__img").outerHeight + "height");
        });
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
        $(".hamburger-desktop").on('click', function (e) {
            var hamburger = $(this);

            if (hamburger.hasClass("is-active")) {
                hamburger.removeClass("is-active");

            }

            else {
                hamburger.addClass("is-active");
            }
        });
        siteDD();
        catalogDD();
        slideMenu();

        actions();
        cardSlider();
        bag();
        sliderHeight();

        // console.log($("#page-header").outerHeight() + "- blyaaaaa11");
        // console.log($(window).scrollTop() + "- blyaaaaa!!");
        // if ($(window).scrollTop() > $("#page-header").outerHeight()) {
        //     $(".page-header__logo-panel").stick_in_parent({
        //         parent: $(".site-wrapper")
        //
        //             .on("sticky_kit:stick", function(e) {
        //                 logoHeight = $(".page-header__logo-panel").outerHeight();
        //                 $(".bag-result-block").stick_in_parent({
        //                     offset_top: logoHeight
        //                 });
        //             })
        //     });
        // }
        // else
        // {
        //     $(".page-header__logo-panel").trigger("sticky_kit:detach");
        // }
        jQuery.fn.extend({
            toggleOwl: function (selector, options, destroy) {
                return this.each(function () {
                    $(this).find(selector).filter(function () {
                        return $(this).parent().is(':visible');
                    }).owlCarousel(options);

                    $(this).on('shown.bs.tab', function (event) {
                        var target = $(event.target.getAttribute('href')).find(selector);
                        if (!target.data('owlCarousel')) {
                            var owl = target.owlCarousel(options).data("owlCarousel");
                        }
                    });
                    if (destroy === true) {
                        $(this).on('hide.bs.tab', function (event) {
                            var target = $(event.target.getAttribute('href')).find(selector);
                            if (target.data('owl.carousel')) {
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

        $(".page-hero-slider__item img").on('load', function () {
            sliderHeight();
        });
        slideMenu();
        cardSlider();

        $(".uk-parent").click(function () {
            $(this).find(".uk-nav").css({"height": $(".uk-offcanvas-bar").outerHeight()});

        });

        $(".slide-toggle").click(function () {

            if ($(this).hasClass("active")) {
                $(this).removeClass("active");

                $(this).parent("div").siblings(".slide-toggle-content").stop().slideDown(400);
            }
            else {
                $(this).addClass("active");

                $(this).parent("div").siblings(".slide-toggle-content").stop().slideUp(400);
            }

        });

        var hmobile = $(".hamburger-mobile");

        $(".uk-parent > a").on('click', function (e) {
            e.preventDefault();
        });

        $("#offcanvas-close").on('click', function (e) {
            $('#offcanvas')[0].click();
        });

        hmobile.on('click', function (e) {
            $(this).addClass('is-active');
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

        $(".checkbox-btn").on('click', function (e) {

            $(this).find(".jq-checkbox").toggleClass("checked");

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
        app.sticky();

        $(window).resize = function () {
            siteDD();
            catalogDD();
            slideMenu();
            sliderHeight();
            actions();
            cardSlider();
            bag();
        };

        $(window).scroll = function () {
            catalogDD();
        }
    });

})();
