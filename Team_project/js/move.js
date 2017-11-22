function getStyle(obj, name) {
	if(obj.currentStyle) {
		return obj.currentStyle[name];
	} else {
		return getComputedStyle(obj, 'false')[name];
	}
};

function move(obj, json, options) {
	options = options || {};
	options.easing = options.easing || 'ease-in';
	options.dur = options.dur || 2000;
	clearInterval(obj.timer);
	var count = Math.floor(options.dur / 30);
	var start = {};
	var dis = {};
	for(var name in json) {
		start[name] = parseFloat(getStyle(obj, name));
		dis[name] = json[name] - start[name];
	}
	var n = 0;
	obj.timer = setInterval(function() {
		n++;
		for(var name in json) {
			switch(options.easing) {
				case 'linear':
					var a = n / count;
					var cur = start[name] + dis[name] * a;
					break;
				case 'ease-in':
					var a = n / count;
					var cur = start[name] + dis[name] * Math.pow(a, 3);
					break;
				case 'ease-out':
					var a = 1 - n / count;
					var cur = start[name] + dis[name] * (1 - Math.pow(a, 3));
					break;
			};
			if(name == 'opacity') {
				obj.style.opacity = cur;
				obj.style.fillStyle = 'alpha(' + cur * 100 + ')';
			} else {
				obj.style[name] = cur + 'px';
			}
		}
		if(n == count) {
			clearInterval(obj.timer);
			options.fn && options.fn();
		}
	}, 30)
}