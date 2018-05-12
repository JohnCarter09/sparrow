////////////////////////////////
// Global Functions
////////////////////////////////
var breakpoints = {
	xl	: 1400,
	lg	: 1200,
	md	: 992,
	sm	: 768,
	xs	: 576
};

var getCurrentScreanBreakpoint = function(){
	var currentScrean;

	$.each(breakpoints, function(index, value){
		if($(window).width() < value){
			currentScrean = index;
		}
		else if($(window).width() >= breakpoints.xl){
			currentScrean = 'xl';
		}
	});

	return {
		currentScrean: currentScrean,
		currentBreakpoint: breakpoints[currentScrean]
	};
}

var breakPointConst = getCurrentScreanBreakpoint();

function getKeyByValue(object, value) {

	var returnKey = "xs";
	$.each(Object.keys(object), function(i, v){
		if(breakpoints[v] == value ){
			returnKey = v;
			return false;
		}
	});
	
	return returnKey;

	// return Object.keys(object).find( function(key){
	// 	return object[key] == value;
	// });
};




////////////////////////////////
// Zanimation
////////////////////////////////
(function($) {
	"use strict";

	var controllerZanim;

	// console.log("Current breakpoint : " + breakPointConst.currentScrean + " [" + breakPointConst.currentBreakpoint + "]");

	function getController(el){
		var $this 	= $(el);
		var options = {};
		var controller = {};
		// console.log("initial controller", controller);

		$.each($this, function(index, value){
			var temp = [breakPointConst.currentBreakpoint];
			// console.log(value);
			$.each(value.attributes, function(i, v){
				if(v.name.indexOf("data-zanim") >= 0){
					for(var index in breakpoints){
						if(v.name == "data-zanim-"+index){
							if(breakPointConst.currentScrean == index){
								controllerZanim = "zanim-"+index;
								return false;
							}
							else {
								temp.push(breakpoints[v.name.split("data-zanim-")[1]]);
								temp.sort(function(a, b){return a - b});

								if($.inArray(breakPointConst.currentBreakpoint, temp) == 0){
									controllerZanim = undefined;
								}
								else if($.inArray(breakPointConst.currentBreakpoint, temp) > 0){
									controllerZanim = "zanim-"+ getKeyByValue(breakpoints, temp[$.inArray(breakPointConst.currentBreakpoint, temp) - 1]);
								}
							}
						}
					}
				}
			});
		});

		// console.log("Final controller : " + controllerZanim);
		controller = $.extend(true, {}, options, $this.data(controllerZanim));
		// console.log(controller)
		if(!(controllerZanim === undefined)) {
			if($this.data(controllerZanim).animation){
				options = zanimationEffects[$this.data(controllerZanim).animation];
			} else {
				options = zanimationEffects["default"];
			}
		}

		if(controllerZanim === undefined){
			options = {delay: 0, duration: 0, ease: 'Expo.easeOut', from:{}, to:{}}; 
		}

		// console.log("controller", controller);

		//populating the controller
		controller.delay || (controller.delay = options.delay);
		controller.duration || (controller.duration = options.duration);
		controller.from || (controller.from = options.from);
		controller.to || (controller.to = options.to);
		controller.ease && (controller.to.ease = controller.ease) && controller.to.ease || (controller.to.ease = options.ease);

		
		// console.log("controller", controller);

	    
		return controller;
	}



	$.fn.zanimation = function(callback) {
		
		var $this = $(this);

		//for Timeline
		if($this.data("zanim-timeline")) {

			var timeline = new TimelineMax($this.data("zanim-timeline"));

			var timelineElements = $this.find('[data-zanim-xs], [data-zanim-sm], [data-zanim-md], [data-zanim-lg], [data-zanim-xl]');

			timelineElements.each(function(){

	        	var controller = getController(this);
	        	timeline.fromTo($(this), controller.duration, controller.from, controller.to, controller.delay).pause();

	        });

			$this.imagesLoaded( function( instance ) {
				callback(timeline)
			})
		}

		//for single elements outside timeline
		else if(!$this.parents("[data-zanim-timeline]").length){
		

			var controller = getController(this);

			callback(TweenMax.fromTo($this, controller.duration, controller.from, controller.to).delay(controller.delay).pause());
		}

		callback(new TimelineMax());

	}

}(jQuery));




// triggering zanimation when the element enters in the view
(function($) {

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

	function triggerZanimation($this){
		if(isScrolledIntoView($this) && $this.attr('data-zanim-trigger') == 'scroll') {

			$this.zanimation(function onAnimationInit(animation){
				animation.play();
			});
			
			if(!$this.data("zanim-repeat")) $this.removeAttr('data-zanim-trigger');

			return;
		}
	}


	$(document).ready(function() { 
	//playing zanimation for scroll triggers
		$("*[data-zanim-trigger='scroll']").each(function(){
			var $this = $(this);

			triggerZanimation($this);
			$(window).on('scroll', function(){triggerZanimation($this)});
		});
	});

}(jQuery));



////////////////////////////////
// Draw SVG
////////////////////////////////
(function($){
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

	// svg animation
	if($("[data-zanim-svg]").length){
		$("[data-zanim-svg]").each(function(){

			var $this = $(this);
			var path = $this.find("path");
			var controller = $this.data("zanim-svg");

			controller.delay || (controller.delay = 0);
			controller.duration || (controller.duration = 2);
			controller.ease || (controller.ease = "Expo.easeOut");

			var tl = new TimelineMax();
			var DrawSvgInit = tl.from(path, controller.duration, {drawSVG:0, delay: controller.delay, ease: controller.ease}).pause();
			
			function svgTrigger(){
				// console.log("in viewport : ", isScrolledIntoView($this), ", trigger : ", (controller.trigger == "scroll"));
				if(isScrolledIntoView($this) && (controller.trigger == "scroll")){
					DrawSvgInit.play();
					TweenMax.set(path, {visibility: "visible"});
					controller.trigger = false;
				}
			};

			$(document).ready(function(){
				svgTrigger();
				$(window).on('scroll', function(){svgTrigger()});
			});
		})
	}
}(jQuery));
