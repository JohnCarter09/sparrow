// global variables for using throughout the template
var	smoothScrollSpeed = {
	scrollTime: 1,
	scrollDistance: 350
};

var nua = navigator.userAgent;

// Check if it is OSX and Firefox
var iPad_iPhone_Firefox = (nua.match(/iPod|iPad|iPhone/g) ? true : false) && (nua.match(/Gecko/g) ? true : false)
var mac_Firefox = (nua.match(/Macintosh/g) ? true : false) && (nua.match(/Gecko/g) ? true : false) && (nua.match(/rv:/g) ? true : false)

var filterBlur = function() {
	if(iPad_iPhone_Firefox || mac_Firefox )
		return "blur(0px)";
	else
		return "blur(5px)";
};

var zanimationEffects = {
	"default": {
		from: {
			opacity: 0,
			y: 70
		},
		to:{
			opacity: 1,
			y: 0
		}, 
		ease: "CubicBezier",
		duration: 0.8,
		delay: 0
	},

	"slide-down": {
		from: {
			opacity: 0,
			y: -70
		},
		to:{
			opacity: 1,
			y: 0
		}, 
		ease: "CubicBezier",
		duration: 0.8,
		delay: 0
	},

	"slide-left": {
		from: {
			opacity: 0,
			x: 70
		},
		to:{
			opacity: 1,
			x: 0
		}, 
		ease: "CubicBezier",
		duration: 0.8,
		delay: 0
	},

	"slide-right": {
		from: {
			opacity: 0,
			x: -70
		},
		to:{
			opacity: 1,
			x: 0
		}, 
		ease: "CubicBezier",
		duration: 0.8,
		delay: 0
	},

	"zoom-in": {
		from: {
			scale: 0.9,
			opacity: 0,
			filter: filterBlur()
		},
		to: {
			scale: 1,
			opacity: 1,
			filter: "blur(0px)"
		},
		delay: 0.3,
		ease: "CubicBezier",
		duration: 0.8
	},

	"zoom-out": {
		from: {
			scale: 1.1,
			opacity: 1,
			filter: filterBlur()
		},
		to: {
			scale: 1,
			opacity: 1,
			filter: "blur(0px)"
		},
		delay: 0.3,
		ease: "CubicBezier",
		duration: 0.8
	},

	"zoom-out-slide-right": {
		from: {
			scale: 1.1,
			opacity: 1,
			x: -70,
			filter: filterBlur()
		},
		to: {
			scale: 1,
			opacity: 1,
			x: 0,
			filter: "blur(0px)"
		},
		delay: 0.3,
		ease: "CubicBezier",
		duration: 0.8
	},

	"zoom-out-slide-left": {
		from: {
			scale: 1.1,
			opacity: 1,
			x: 70,
			filter: filterBlur()
		},
		to: {
			scale: 1,
			opacity: 1,
			x: 0,
			filter: "blur(0px)"
		},
		delay: 0.3,
		ease: "CubicBezier",
		duration: 0.8
	},

	"blur-in": {
		from: {
			opacity: 0,
			filter: filterBlur()
		},
		to: {
			opacity: 1,
			filter: "blur(0px)"
		},
		delay: 0.3,
		ease: "CubicBezier",
		duration: 0.8
	}
};

if($("html").attr("dir")){
	for (var key in zanimationEffects){
		if(zanimationEffects[key].from.x){
			zanimationEffects[key].from.x = - zanimationEffects[key].from.x;
		}
	}
}