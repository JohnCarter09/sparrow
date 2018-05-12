////////////////////////////////////////
//
// Helpers
//
////////////////////////////////////////
// Mobile detection
////////////////////////////////////////
var isMobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    isMobile = true;
}

////////////////////////////////////////
// OS detector
////////////////////////////////////////
var phone, touch, ltie9, dh, ar, fonts, ieMobile;

var ua = navigator.userAgent;
var winLoc = window.location.toString();

var is_webkit       = ua.match(/webkit/i);
var is_firefox      = ua.match(/gecko/i);
var is_newer_ie     = ua.match(/msie (9|([1-9][0-9]))/i);
var is_older_ie     = ua.match(/msie/i) && !is_newer_ie;
var is_ancient_ie   = ua.match(/msie 6/i);
var is_ie           = is_ancient_ie || is_older_ie || is_newer_ie;
var is_mobile_ie    = navigator.userAgent.indexOf('IEMobile') !== -1;
var is_mobile       = ua.match(/mobile/i);
var is_OSX          = ua.match(/(iPad|iPhone|iPod|Macintosh)/g) ? true : false;
var iOS             = getIOSVersion(ua);
var is_EDGE         = ua.match(/Edge/i);
var puppeteer       = ua.match(/puppeteer/i);

function getIOSVersion(ua) {
    ua = ua || navigator.userAgent;
    return parseFloat(
            ('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(ua) || [0,''])[1])
                .replace('undefined', '3_2').replace('_', '.').replace('_', '')
        ) || false;
}

////////////////////////////////////////
// Browser Ditector
////////////////////////////////////////
$(document).ready(function(){
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    var isEdge = !isIE && !!window.StyleMedia;
    var isChrome = !!window.chrome && !!window.chrome.webstore;
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    if(isOpera) $('html').addClass("opera");
    if(is_OSX) $('html').addClass("osx");
    if(isFirefox) $('html').addClass("firefox");
    if(isSafari) $('html').addClass("safari");
    if(isIE) $('html').addClass("ie");
    if(isEdge) $('html').addClass("edge");
    if(isChrome) $('html').addClass("chrome");
    if(isBlink) $('html').addClass("blink");

})




////////////////////////////////////////
//
// SmoothScroll
//
////////////////////////////////////////
// function smoothScroll(){
//     if(typeof smoothScrollSpeed == "undefined") return;

//     var $window = $(window),
//         smoothScroll = {scrollTime: 1, scrollDistance: 350};

//     if(typeof smoothScrollSpeed == "object"){
//         smoothScrollSpeed.scrollTime && (smoothScroll.scrollTime = smoothScrollSpeed.scrollTime);
//         smoothScrollSpeed.scrollDistance && (smoothScroll.scrollDistance = smoothScrollSpeed.scrollDistance);
//     }


//     $window.on("mousewheel DOMMouseScroll", function(event){

//         console.log(event.currentTarget);
//         event.preventDefault();

//         var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
//         console.log(delta);
//         var scrollTop = $window.scrollTop();
//         var finalScroll = scrollTop - parseInt(delta*smoothScroll.scrollDistance);

//         TweenMax.to($window, smoothScroll.scrollTime, {
//             scrollTo : { y: finalScroll, autoKill:true },
//             ease: Expo.easeOut,
//             autoKill: true,
//             overwrite: 5
//         });
//     });
// };


// $(document).ready(function(){
//     if(! is_EDGE && ! Modernizr.touchevents && ! is_mobile_ie && ! is_OSX){
//         // smoothScroll();
//     }
// });




/////////////////////////////////////////
//
// znav
//
/////////////////////////////////////////
 $(document).ready(function() {
    if($('#znav-container').length){
        var previousScroll = 0,
            navBarOrgOffset = $('#znav-container').offset().top;
            $this = $('#znav-container');

        /////////////////////////////////////
        // Scrollup Fixed Navbar
        /////////////////////////////////////
        // $(window).scroll(function() {
        //     var currentScroll = $(this).scrollTop();

        //     if(currentScroll > navBarOrgOffset) {
        //         if (currentScroll > previousScroll) {
        //             $this.fadeOut();
        //         } else {
        //             $this.fadeIn();
        //             $this.addClass('znav-revealed');
        //         }
        //     } else {
        //          $this.removeClass('znav-revealed');
        //     }
        //     previousScroll = currentScroll;
        // });

        $('#znav-container #navbarNavDropdown ul.navbar-nav .dropdown').each(function(){
            $this = $(this);
            $this.parent('li').addClass('has-dropdown');
        });
        $('#znav-container #navbarNavDropdown ul.navbar-nav .megamenu').each(function(){
            $this = $(this);
            $this.parent('li').addClass('has-megamenu');
        });

         $('.has-dropdown > a, .has-megamenu > a').on('click', function(){
            $this = $(this).parent();
            $this.each(function(){
                $this.toggleClass('z-active');
            });
        });




        // menuAim Started
        if($.fn.menuAim){
            $("ul.dropdown").menuAim({
                activate: function(row){
                    $(row).children('ul.dropdown').addClass("opened");
                },
                deactivate: function(row){
                    $(row).children('ul.dropdown').removeClass("opened");
                },
                exitMenu: function() { return true },
                // tolerance: 150
            });// End of menuAim
        }
    }
});
// Two possibilities exist: either we are alone in the Universe or we are not.
// Both are equally terrifying.
// And this is a strange fix for menu hover on iPad
$(document).ready(function() {
   $('body').bind('touchstart', function() {});
});



////////////////////////////////////////
//
// Hamburger Trigger
//
////////////////////////////////////////
$(document).ready(function(){
    if($('.navbar-toggler').length){
        var $burgermenu = $('.navbar-toggler');
        $burgermenu.on("click", function(e) {
            $burgermenu.find(".hamburger").toggleClass("is-active");

            // Do something else, like open/close menu
            // Click event off .. Doesn't work
            if($('.is-active').is(':animated')){
               $('.navbar-toggler').off('click', function(){
                    return;
               });
            }
        });
    }
});



////////////////////////////////////////
//
// On page scroll for #id targets
//
////////////////////////////////////////
$(document).ready(function($){
    $('a[href*=\\#]:not([href=\\#])').click(function() {
        var $this = $(this);

        if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - ($this.data("offset") || 0))
                }, 400, 'swing', function(){

                });
                return false;
            }
        }
    });
});



////////////////////////////////////////
//
// Tabs
//
////////////////////////////////////////
$(document).ready(function(){
    if($('.tabs, .navs').length){

        // Function for active tab indicator change
        ///////////////////////////////////////////
        function updateIncicator($indicator, $tabs, $tabnavCurrentItem){
            var left = $tabnavCurrentItem.position().left,
                right = $tabs.children('.nav-bar').outerWidth() - (left+$tabnavCurrentItem.outerWidth());

            $indicator.css({
                left: left,
                right: right
            });
            return;
        }

        $('.tabs, .navs').each(function(){
            var $tabs = $(this),
                $tabnavCurrentItem = $tabs.children('.nav-bar').children('.nav-bar-item.active');

            $tabs.children('.nav-bar').append('<div class="indicator"></div>');
            var $indicator = $tabs.children('.nav-bar').children(".indicator"),

                $tabnavCurrentItem = $tabs.children('.nav-bar').children('.nav-bar-item.active');
                $preIndex = $tabnavCurrentItem.index();

            updateIncicator($indicator, $tabs, $tabnavCurrentItem);

            $tabs.children('.nav-bar').children('.nav-bar-item').click(function(){

                var $tabnavCurrentItem = $(this),
                    $currentIndex = $tabnavCurrentItem.index(),
                    $tabContent = $tabs.children('.tab-contents').children().eq($currentIndex);

                $tabnavCurrentItem.siblings().removeClass('active');
                $tabnavCurrentItem.addClass('active');

                $tabContent.siblings().removeClass('active');
                $tabContent.addClass('active');

                // Indicator Transition
                ////////////////////////
                updateIncicator($indicator, $tabs, $tabnavCurrentItem);

                if(($currentIndex - $preIndex) <= 0){
                    $('.indicator').addClass('transition-reverse');
                }else{
                    $('.indicator').removeClass('transition-reverse');
                };
                $preIndex = $currentIndex;

            });


            $(window).on('resize', function(){
                updateIncicator($indicator, $tabs, $tabs.children('.nav-bar').children('.nav-bar-item.active'));
            });

        });
    }
});




////////////////////////////////////////
//
// Parallax Background
//
////////////////////////////////////////

$(document).ready(function(){
    if($('.parallax').length){

        var rellaxObj = {};
        function callRellax(){
            rellaxObj = new Rellax('.parallax', {
                // center: true, /** stupid library **/
                speed: -3
            });
        }

        var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

        if(!is_ie && !isIE11 && !puppeteer){
            callRellax();
        }
    }
});




////////////////////////////////////////
//
// Youtube Background
//
////////////////////////////////////////
$(document).ready(function(){
    if($('.youtube-background').length){
        $('.youtube-background').each(function(){
            var $this = $(this);

            $this.data("property", $.extend($this.data("property"), {
                showControls: false,
                loop: true,
                autoPlay:true,
                mute:true,
                containment: $this.parent(".background-holder")
            }));

            $(this).YTPlayer();
        });
    }
});




////////////////////////////////////////
//
// Flex slider
//
////////////////////////////////////////
$(document).ready(function(){
    if($('.flexslider').length){

        var flexSliderZanim = function(slider, target){
            if($(slider).find('*[data-zanim-timeline]').length == 0) return;
            $(slider).find('*[data-zanim-timeline]').zanimation(function onAnimationInit(animation){
                animation.kill();
            });
            $(target).zanimation(function onAnimationInit(animation){
                animation.play();
            });
        }

        $('.flexslider').each(function(){
            var $this = $(this);

            $this.flexslider($.extend(
                $this.data("zflexslider") || {},
                {
                    start: function(slider){
                        slider.removeClass("loading");
                        flexSliderZanim(slider, slider.find('*[data-zanim-timeline].flex-active-slide'));
                    },
                    before: function(slider){
                        flexSliderZanim(slider, slider.find("ul.slides > li:nth-child("+(slider.getTarget(slider.direction)+1)+")")[0]);
                    }
                }
            ));
        });
    }
});





/////////////////////////////////////////
//
// Owl Carousel
//
/////////////////////////////////////////
$(document).ready(function(){
    if($('.owl-carousel').length){

        var owlZanimPlay = function($el){
            if($el.find('*[data-zanim-timeline]').length == 0) return;

            $el.find(".owl-item.active > *[data-zanim-timeline]").zanimation(function onAnimationInit(animation){
                animation.play();
            });
        }

        var owlZanimKill = function($el){
            if($el.find('*[data-zanim-timeline]').length == 0) return;
            $el.find("*[data-zanim-timeline]").zanimation(function onAnimationInit(animation){
                animation.kill();
            });
        }

        $('.owl-carousel').each(function(){
            var $this = $(this),
                options = $this.data("options") || {};
                ($("html").attr("dir") == "rtl") && (options.rtl = true);
                options.navText || (options.navText = ['<span class="fal fa-angle-left"></span>','<span class="fal fa-angle-right"></span>']);
                options.mouseDrag = false;
                options.touchDrag = true;

            $this.owlCarousel($.extend(options || {}, {
                onInitialized: function(event){
                    owlZanimPlay($(event.target));
                },
                onTranslate: function(event){
                    owlZanimKill($(event.target));
                },
                onTranslated: function(event){
                    owlZanimPlay($(event.target));
                }
            }));
        });
    }
});




///////////////////////////////////////
//
// Forms
//
///////////////////////////////////////
// Choose a file
///////////////////////////////////////
( function ( document, window, index ){
    var inputs = document.querySelectorAll( '.inputfile' );
    Array.prototype.forEach.call( inputs, function( input )
    {
        var label    = input.nextElementSibling,
            labelVal = label.innerHTML;

        input.addEventListener( 'change', function( e )
        {
            var fileName = '';
            if( this.files && this.files.length > 1 )
                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            else
                fileName = e.target.value.split( '\\' ).pop();

            if( fileName )
                label.querySelector( 'span' ).innerHTML = fileName;
            else
                label.innerHTML = labelVal;
        });

        // Firefox bug fix
        input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
        input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
    });
}( document, window, 0 ));

$(document).ready(function(){
    if($('.inputfile').length){
        $('.inputfile + label').prepend('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewbox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>')
    };
});


///////////////////////////////////////
// Checkbox and Radio
///////////////////////////////////////
if( document.createElement('svg').getAttributeNS ) {

    var checkbxsCheckmark = Array.prototype.slice.call( document.querySelectorAll( '.zinput.zcheckbox input[type="checkbox"]' ) );
        pathDefs = {
            checkmark : ['M16.7,62.2c4.3,5.7,21.8,27.9,21.8,27.9L87,16']
        },
        animDefs = {
            checkmark : { speed : .2, easing : 'ease-in-out' }
        };

    function createSVGEl( def ) {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        if( def ) {
            svg.setAttributeNS( null, 'viewBox', def.viewBox );
            svg.setAttributeNS( null, 'preserveAspectRatio', def.preserveAspectRatio );
        }
        else {
            svg.setAttributeNS( null, 'viewBox', '0 0 100 100' );
        }
        svg.setAttribute( 'xmlns', 'http://www.w3.org/2000/svg' );
        return svg;
    }

    function controlCheckbox( el, type, svgDef ) {
        var svg = createSVGEl( svgDef );
        el.parentNode.appendChild( svg );

        if( el.checked ) {
            draw( el, type );
        }

        el.addEventListener( 'change', function() {
            if( el.checked ) {
                draw( el, type );
            }
            else {
                reset( el );
            }
        } );
    }
    checkbxsCheckmark.forEach( function( el, i ) { controlCheckbox( el, 'checkmark' ); } );


    function draw( el, type ) {
        var paths = [], pathDef,
            animDef,
            svg = el.parentNode.querySelector( 'svg' );

        pathDef = pathDefs.checkmark;
        animDef = animDefs.checkmark;


        paths.push( document.createElementNS('http://www.w3.org/2000/svg', 'path' ) );

        for( var i = 0, len = paths.length; i < len; ++i ) {
            var path = paths[i];
            svg.appendChild( path );

            path.setAttributeNS( null, 'd', pathDef[i] );

            var length = path.getTotalLength();
            path.style.strokeDasharray = length + ' ' + length;
            if( i === 0 ) {
                path.style.strokeDashoffset = Math.floor( length ) - 1;
            }
            else path.style.strokeDashoffset = length;
            path.getBoundingClientRect();
            path.style.transition = path.style.WebkitTransition = path.style.MozTransition  = 'stroke-dashoffset ' + animDef.speed + 's ' + animDef.easing + ' ' + i * animDef.speed + 's';
            path.style.strokeDashoffset = '0';
        }
    }

    function reset( el ) {
        Array.prototype.slice.call( el.parentNode.querySelectorAll( 'svg > path' ) ).forEach( function( el ) { el.parentNode.removeChild( el ); } );
    }
}




////////////////////////////////////////
//
// Universal contact form ajax submission
//
////////////////////////////////////////

$(document).ready(function(){

    if($('.zform').length){

        var submitButtonValue = {
          set : function($elm, value){
            if($elm.prop("tagName") == "BUTTON"){
              $elm.html(value);
              return;
            }
            $elm.val(value);
          },
          get: function($elm){
            var value = $elm.val()
            if(value == ""){
              return $elm.html();
            }
            return value;
          }
        }

        $('.zform').each(function(){

            var $form = $(this);

            $form.on('submit', function(e){

                e.preventDefault();

                if($("#g-recaptcha-response").val() == '') {
                    $form.find(".zform-feedback").html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Please, verify you are a human!</div>')
                  return;
                }

                var $submit = $form.find(":submit"),
                    submitText = submitButtonValue.get($submit);
                    submitButtonValue.set($submit, "Sending...");


                $.ajax({
                    type: 'post',
                    url: 'assets/php/form-processor.php',
                    data: $(this).serialize(), // again, keep generic so this applies to any form
                    })
                    .done(function (result) {
                        // if(result.status ==)
                        $form.find(".zform-feedback").html(result);
                        submitButtonValue.set($submit, submitText);
                        grecaptcha.reset();
                        $form.trigger("reset");
                    })
                    .fail(function(xhr, textStatus, errorThrown){
                      $form.find(".zform-feedback").html(xhr.responseText);
                      submitButtonValue.set($submit, submitText);
                    })
                });

        });

    }

});




//////////////////////////////////
//
// Sementic UI
//
//////////////////////////////////
$(document).ready(function(){

    //////////////////////////////////
    // Dropdown
    //////////////////////////////////
    if($('.ui.dropdown').length){
        $('.ui.dropdown').dropdown();
    }
    //////////////////////////////////
    // Accordion
    //////////////////////////////////
    if($('.ui.accordion').length){
        $('.ui.accordion').each(function(){
            var $this = $(this);
            $this.accordion($.extend({
                exclusive: false
            },
            $this.data("options") || {}));
        });
    }
});




////////////////////////////////////////
//
// Lightbox
//
////////////////////////////////////////
$(document).ready(function(){

    if($('[data-lightbox]').length){
        lightbox.option({
            'resizeDuration'    : 400,
            'wrapAround'        : true,
            'fadeDuration'      : 300,
            'imageFadeDuration' : 300
        })
    }

});




////////////////////////////////////////
//
//  Video Lightbox
//
////////////////////////////////////////
$(document).ready(function(){
    if($('.video-modal').length){

        $('body').after('<div id="videoModal" class="remodal remodal-video"> <button data-remodal-action="close" class="remodal-close"></button> <div class="embed-responsive embed-responsive-16by9"><div id="videoModalIframeWrapper"></div> </div></div>');
        var $videoModal = $('#videoModal').remodal();
        var $videoModalIframeWrapper = $("#videoModalIframeWrapper");

        $('.video-modal').each(function(){
            $(this).on('click', function(e){
                e.preventDefault();

                var $this = $(this),
                    ytId = $this.attr('href').split('/'),
                    start = $this.data('start'),
                    end = $this.data('end');

                if(ytId[2] == 'www.youtube.com'){
                    $videoModalIframeWrapper.html('<iframe id="videoModalIframe" src="//www.youtube.com/embed/'+ytId[3].split('?v=')[1]+'?rel=0&amp;autoplay=1&amp;enablejsapi=0&amp;start='+start+'&ampend='+end+'" allowfullscreen="" frameborder="0" class="embed-responsive-item hide"></iframe>');
                } else if (ytId[2] == 'vimeo.com'){
                    $videoModalIframeWrapper.html('<iframe id="videoModalIframe" src="https://player.vimeo.com/video/'+ytId[3]+'?autoplay=1&title=0&byline=0&portrait=0 ?autoplay=1&title=0&byline=0&portrait=0 hide"></iframe>');
                }
                $videoModal.open();
            });
        });

        $(document).on('closed', '.remodal', function (e) {

          var $this = $(this);
          if($this.attr('id') == 'videoModal'){
            $videoModalIframeWrapper.html('');
          }

        });

    }
});




////////////////////////////////////////
//
// Masonry with isotope
//
////////////////////////////////////////

$(window).on('load', function(){
    if($('.sortable').length){
        $('.sortable').each(function(){
            var $this       = $(this),
                $sortable   = $this.find('.sortable-container'),
                $menu       = $this.find('.menu');


            $sortable.isotope($.extend(
                $this.data("options") || {},
                {
                    itemSelector: '.sortable-item',
                    masonry: {
                        columnWidth: '.sortable-item'
                    }
                }));

            // store filter for each group
            var filters = {};

            $($menu).on('click', '.item', function(){
                var $masonryFilter      = $(this),
                    masonryContainer    = $masonryFilter.closest('.sortable').find('.sortable-container');

                    filters[($masonryFilter.parent().data("filter-group") || 0)] = $masonryFilter.attr('data-filter');
                    filterValue         = concatValues(filters);


                $masonryFilter.siblings().removeClass("active");
                $masonryFilter.addClass("active");
                masonryContainer.isotope({ filter: filterValue });
            });
        });


        // flatten object by concatting values
        function concatValues( obj ) {
            var value = '';
            for ( var prop in obj ) {
                value += obj[ prop ];
            }
            return value;
        }
    }
});




////////////////////////////////////////
//
//  Typed Text
//
////////////////////////////////////////
$(document).ready(function(){
    if($('.typed-text').length){
        $(".typed-text").each(function(){
            var typed = new Typed(this, {
                strings: $(this).data('typed-text'),
                typeSpeed: 100,
                loop: true,
                backDelay : 1500
            });
        });
    }
});




////////////////////////////////////////
//
// Colors
//
////////////////////////////////////////
$(document).ready(function(){
    if($('.palette').length){
        $(".palette [class*='background-']").each(function(){
            function rgb2hex(rgb){
                rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
                return (rgb && rgb.length === 4) ? "#" +
                    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
                    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
                    ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
            }
            $(this).append('<span class="text-uppercase fs--1 mb-0">'+rgb2hex($(this).css("background-color"))+'</span>');
        });
    }
});




////////////////////////////////////////
//
// Select menu [bootstrap 4]
//
////////////////////////////////////////
$(document).ready(function(){
    // https://getbootstrap.com/docs/4.0/getting-started/browsers-devices/#select-menu
    // https://github.com/twbs/bootstrap/issues/26183
    $(function () {
        var nua = navigator.userAgent;
        var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1);
        if (isAndroid) {
            $('select.form-control').removeClass('form-control').css('width', '100%');
        }
    });

    // https://getbootstrap.com/docs/4.0/components/tooltips/#example-enable-tooltips-everywhere
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    })
});
