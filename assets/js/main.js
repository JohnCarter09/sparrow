CustomEase.create("CubicBezier", ".77,0,.18,1");


if(puppeteer != null){
	$("html").addClass("puppeteer");
	$("main").css({
		"width": "100vw"
	});
	$(".footer").css({
		"width": "100vw"
	});
	$("body").find("aside").css({
		"display": "none"
	});
}

// Preloader
$.holdReady( true );

$($("main section")[0]).imagesLoaded({ background: ".background-holder" }, function(){
    $('#preloader').removeClass("loading");
    $.holdReady( false );
    setTimeout(function() {
        $('#preloader').remove();
    }, 800);
});

if($("html").attr("dir") == "rtl"){
	var $aside = $("aside");
	$aside.data("zanim-lg").from.x = - $("aside").data("zanim-lg").from.x;
	$aside.find("nav .brand img").data("zanim-lg").from.x = - $aside.find("nav .brand img").data("zanim-lg").from.x;
	$aside.find("nav .menu div").data("zanim-lg").from.x = - $aside.find("nav .menu div").data("zanim-lg").from.x;
	$aside.find("nav .content li").data("zanim-lg").from.x = - $aside.find("nav .content li").data("zanim-lg").from.x;
}

/////////////////////////////////////
//
// Sparrow Navigations
//
/////////////////////////////////////
$(document).ready(function(){
	if($(".side-nav").length){
		var $this = $(".side-nav"),
			$navbar = $this.find(".navbar"),
			$menu = $this.find("nav .menu"),
			$navItems = $navbar.find(".navbar-content > .v-middle >  ul > li > a, .navbar-content > .v-middle >  ul > li > .inner-level"),
			timeline = new TimelineMax().pause(),
			exclusive = $this.data("exclusive"),
			x = "100%";

		($("html").attr("dir") == "rtl") && (x = "-100%");

		if($(".inner-level").length) {
			$(".inner-level").each(function(){
				$(this).siblings("a").addClass("inner-sibling");
			});
		}

		if($(".inner-level").length) {
			$(".inner-level").each(function(){
				var $this = $(this);
				$this.parent("li").height($this.siblings("a").height());
			});
		}

		$(window).resize(function(){
		 	var menuLinks = $(".navbar-content > .v-middle >  ul > li > a");
			 menuLinks.each(function(){
			 	$this = $(this);
			 	if($this.hasClass("inner-level-expand")){
		 			$this.parent("li").height($this.height() + $this.siblings(".inner-level").height() + 30);
				} else {
					$this.parent("li").height($this.height());
				}
			 });
		 });

		timeline
			.fromTo($navbar, 0.6, {x: x}, {x: "0%", ease: "CubicBezier"})
			.staggerFromTo($navItems.toArray(), 0.8, {y: 56, opacity: 0}, {y: 0, opacity: 1, ease: "CubicBezier"}, 0.05, "-=0.4");


		$navItems.css("opacity", 0);
		var $burger = $(".burger");

		var animateMenu = function(){
			$burger.toggleClass("cross");
			$menu.hasClass("collapsed") && timeline.reverse() || timeline.play();
			$menu.toggleClass("collapsed");
			$(".hamburger").toggleClass("is-active");
		};

		$menu.on("click", animateMenu);

		$("main").click("click", function(){
			$menu.hasClass("collapsed") && animateMenu();
		});

		$(".navbar-content a").on("click", function(e){
			// console.log(e);
			// e.preventDefault();
			if(e.ctrlKey || e.metaKey) return;

			var $this = $(this);
			var innerLevelTimeline = new TimelineMax().pause();

			var listOfitems = $this.siblings(".inner-level").find("ul > li > a").toArray();
			innerLevelTimeline.staggerFromTo(listOfitems, 0.3 , {y: 30, opacity: 0}, {y: 0, opacity: 1, ease: "CubicBezier"}, 0.01).delay(0.1);

			if($this.siblings().length){
				if($this.hasClass("inner-sibling inner-level-expand")){
					innerLevelTimeline.reverse();
					$this.parent("li").height($this.height());
				} else if($this.hasClass("inner-sibling")) {
					$this.parent("li").height($this.height() + $this.siblings(".inner-level").height() + 30);

					// Exclusive
					if(exclusive)
						$this.parent("li").siblings("li").height($this.height()).children("a").removeClass("inner-level-expand");
					innerLevelTimeline.play();
				};

				$this.toggleClass("inner-level-expand");
				return;
			}
			animateMenu();
		});
	}
});




/////////////////////////////////////
//
// Sparrow Navigations transparency on scroll on mobile
//
/////////////////////////////////////
if($("aside.side-nav nav").length){

	var $this = $("aside.side-nav nav");
	var sideNavBackgroundColor = $this.css('backgroundColor');
	if(sideNavBackgroundColor.indexOf('a') == -1){
			sideNavBackgroundColor = sideNavBackgroundColor.replace(')', ', 1)').replace('rgb', 'rgba');
	}
	var backgroundColorAlpha = sideNavBackgroundColor.split(', ')[3].split(')')[0];
	if($(window).scrollTop()==0) backgroundColorAlpha = 0;

	$(window).on("load resize", function(){
		var windowHeight = $(window).height();

		if($(window).width() > 991){
			$this.css({"background-color": "rgba(0, 0, 0, 1)"});
		} else {
			$this.css({"background-color": "rgba(0, 0, 0, "+backgroundColorAlpha+")"});
			$(window).scroll(function(){
				var scrollTop = $(window).scrollTop();
				backgroundColorAlpha = (scrollTop/windowHeight)*2;

				(backgroundColorAlpha >= 1) && (backgroundColorAlpha = 1);
				$this.css({"background-color": "rgba(0, 0, 0, "+backgroundColorAlpha+")"});
			});
		}
	});
}


// Naviagation Elements
$(document).ready(function(){
	if($('#navigation-elements').length){
		var $this   = $('#navigation-elements');
			url     = window.location.href.split('/');
			link    = url[url.length - 1];
			hrefs   = $this.children('li').children('a');
		hrefs.each(function(){
			var $this   = $(this);
				href    = $this.attr('href');
			while(href === link){
				$this.addClass('color-primary fw-600');
				break;
			}
		});
	}
})


// Check if the element is in the viewport when scroll
function isScrolledIntoView($this){

	var $elem = $this,
		windowHeight = $(window).height(),
		elemTop = $elem.offset().top,
		elemHeight = $elem.height();
		windowScrollTop = $(window).scrollTop();

		if(elemTop <= (windowScrollTop + windowHeight) && windowScrollTop <= (elemTop + elemHeight)){
			return true;
		}
		return false;
}

$(document).ready(function(){

	// progressbar.js@1.0.0 version is used
	// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

	// Progress Circle
	if($(".progress-circle").length){
		$(".progress-circle").each(function(){
			var $this = $(this),
				options = $this.data("options");

			var bar = new ProgressBar.Circle(this, {
				color: '#aaa',
				// This has to be the same size as the maximum width to
				// prevent clipping
				strokeWidth: 2,
				trailWidth: 2,
				easing: 'easeInOut',
				duration: 3000,
				svgStyle: {"stroke-linecap": "round", display: "block", width: "100%"},
				text: {
					// style: {
			  //           // Text color.
			  //           // Default: same as stroke color (options.color)
			  //           position: 'absolute',
			  //           left: '50%',
			  //           top: '50%',
			  //           padding: 0,
			  //           margin: 0,
			  //           // You can specify styles which will be browser prefixed
			  //           transform: {
			  //               prefix: true,
			  //               value: 'translate(-50%, -50%)'
			  //           }
			  //       },
					autoStyleContainer: false
				},
				from: {
					color: '#aaa',
					width: 2
				},
				to: {
					color: '#333',
					width: 2
				},
				// Set default step function for all animate calls
				step: function(state, circle) {
					circle.path.setAttribute('stroke', state.color);
					circle.path.setAttribute('stroke-width', state.width);

					var value = Math.round(circle.value() * 100);
					 circle.setText("<span class='value'>"+value+"<b>%</b></span> <span>"+options.text+"</span>");

				}
			});
			var playProgressTriggered;
			$(window).scroll(function(){
				if(isScrolledIntoView($this)){
					if(!playProgressTriggered) {
						bar.animate(options.progress/100);
						playProgressTriggered = true;
					}
				}
			});
		});
	}

	// Progress Line
	if($(".progress-line").length){
		$(".progress-line").each(function(){
			var $this = $(this),
				options = $this.data("options");

			var bar = new ProgressBar.Line(this, {
				strokeWidth: 1,
				easing: 'easeInOut',
				duration: 3000,
				color: '#333',
				trailColor: '#eee',
				trailWidth: 1,
				svgStyle: {width: '100%', height: '4px', "stroke-linecap": "round",
					"border-radius": "3px"},
				text: {
					style: {
						transform: null
					},
					autoStyleContainer: false
				},
				from: {color: '#aaa'},
				to: {color: '#111'},
				step: function(state, bar){
					bar.setText("<span class='value'>"+Math.round(bar.value() * 100)+"<b>%</b></span> <span>"+options.text+"</span>");
				}
			});
			var playProgressTriggered;
			$(window).scroll(function(){
				if(isScrolledIntoView($this)){
					if(!playProgressTriggered) {
						bar.animate(options.progress/100);
						playProgressTriggered = true;
					}
				}
			});
		});
	}

	// Count Up
	if($(".counter").length){
		$(".counter").each(function() {
			var $this = $(this),
				countTo = $this.attr('data-count');
			var playCountUpTriggerd;

			$(window).scroll(function(){
				if(isScrolledIntoView($this) && !playCountUpTriggerd){
					if(!playCountUpTriggerd){
						$({ countNum: $this.text()}).animate({
							countNum: countTo
						},

						{
							duration: 2000,
							easing:'linear',
							step: function() {
								$this.text(Math.floor(this.countNum));
							},
							complete: function() {
								$this.text(this.countNum);
							}
						});
						playCountUpTriggerd = true;
					}
				};
			});
		});
	}
});



$(document).ready(function(){
	if($(".znav-sparrow").length) {
		var $this = $(".znav-sparrow"),
			windowHeight = $(window).height();
		$(window).scroll(function(){
			var scrollTop = $(window).scrollTop(),
				alpha = (scrollTop/windowHeight)*2;

			(alpha >= 1) && (alpha = 1);
			$this.css({"background-color": "rgba(0, 0, 0, "+alpha+")"});
		});
	}
});

// Arrow down animation
$(document).ready(function(){
	Stickyfill.add($('.sticky-top'));
});

$(document).ready(function(){
	if($("[data-countdown]").length) {
		$("[data-countdown]").each(function(){
            var element      = $(this),
                date         = element.attr('data-countdown'),
                fallback;

            if(typeof element.attr('data-countdown-fallback') !== typeof undefined){
                fallback = element.attr('data-countdown-fallback');
            }

            element.countdown(date, function(event) {
                if(event.elapsed){
                    element.text(fallback);
                }else{
                    element.text(
                      event.strftime('%D days %H:%M:%S')
                    );
                }
            });
        });
	}
});

/////////////////////////////////////////
//
// Inline Player [plyr]
//
/////////////////////////////////////////
$(document).ready(function(){
    if($('#player').length){
        var player = new Plyr('#player');
    }
});

/////////////////////////////////////////
//
// Sticky
//
/////////////////////////////////////////
$(document).ready(function(){
	if($("#sticky-kit").length){
		$("#sticky-kit").stick_in_parent();
	};
});
