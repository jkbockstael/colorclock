// Color Clock JS : JavaScript partial reimplementation of http://thecolourclock.co.uk/ (by Jack Hughes)
// 2012, Jean-Karim Bockstael <jkb@jkbockstael.be>
window.cc = function cc() {
	var timer = undefined;
	var dom = {};
	var hexaMode = true;
	var lastTime = '';

	function centerDisplay() {
		dom.display.style.fontSize = Math.floor(window.innerHeight / 3.5) + 'px';
		dom.display.style.top = Math.floor((window.innerHeight - dom.display.offsetHeight) / 2) + 'px';
		dom.display.style.width = window.innerWidth;
	}

	function toggleHexa() {
		hexaMode = !hexaMode;
		clearTimeout(timer);
		step();
	}

	function step() {
		var date = new Date();
		if (date.toString() !== lastTime) {
			lastTime = date.toString();
			var hours = date.getHours();
			var minutes = date.getMinutes();
			var seconds = date.getSeconds();
			// Update colors
			var hoursRatio = (hours/23);
			var minutesRatio = (minutes/59);
			var secondsRatio = (seconds/59);

			var bodyRed = Math.floor((hoursRatio - (hoursRatio * 10 / 100)) * 256);
			var bodyGreen = Math.floor((minutesRatio - (minutesRatio * 10 / 100)) * 256);
			var bodyBlue = Math.floor((secondsRatio - (secondsRatio * 10 / 100)) * 256);

			var displayRed = Math.floor((hoursRatio - (hoursRatio * 20 / 100)) * 256);
			var displayGreen = Math.floor((minutesRatio - (minutesRatio * 20 / 100)) * 256);
			var displayBlue = Math.floor((secondsRatio - (secondsRatio * 20 / 100)) * 256);

			var shadowRed = Math.floor((hoursRatio - (hoursRatio * 30 / 100)) * 256);
			var shadowGreen = Math.floor((minutesRatio - (minutesRatio * 30 / 100)) * 256);
			var shadowBlue = Math.floor((secondsRatio - (secondsRatio * 30 / 100)) * 256);

			var highlightRed = Math.floor(hoursRatio * 256);
			var highlightGreen = Math.floor(minutesRatio * 256);
			var highlightBlue = Math.floor(secondsRatio * 256);

			dom.body.style.backgroundColor = 'rgb(' + bodyRed + ',' + bodyGreen + ',' + bodyBlue + ')';
			dom.display.style.color = 'rgb(' + displayRed + ',' + displayGreen + ',' + displayBlue + ')';
			dom.display.style.textShadow = '-1px -2px 2px rgb(' + shadowRed + ',' + shadowGreen + ',' + shadowBlue + ')';
			dom.display.style.textHighlight = '1px 2px 2px rgb(' + highlightRed + ',' + highlightGreen + ',' + highlightBlue + ')';
			// Display time
			if (hexaMode === true) {
				var time = '' + ((hours < 16) ? '0' + hours.toString(16) : hours.toString(16));
				time += ':' + ((minutes < 16) ? '0' + minutes.toString(16) : minutes.toString(16));
				time += ':' + ((seconds < 16) ? '0' + seconds.toString(16) : seconds.toString(16));
			} else {
				var time = '' + ((hours < 10) ? '0' + hours : hours);
				time += ':' + ((minutes < 10) ? '0' + minutes : minutes);
				time += ':' + ((seconds < 10) ? '0' + seconds : seconds);
			}
			dom.display.innerHTML = time;
		}
		timer = setTimeout(step, 200);
	}

	function start() {
		dom.body = document.getElementsByTagName('body')[0];
		dom.display = document.createElement('div');
		dom.display.id = 'display';
		dom.display.style.position = 'relative';
		dom.display.style.fontFamily = 'monospace';
		dom.display.style.textAlign = 'center';
		dom.display.style.width = window.innerWidth;
		dom.display.style.margin = '0';
		dom.display.style.marginLeft = 'auto';
		dom.display.style.marginRight = 'auto';
		dom.display.style.color = 'transparent';
		dom.body.style.position = 'absolute';
		dom.body.style.width = '100%';
		dom.body.style.height = '100%'
		dom.body.style.margin = '0';
		dom.display.innerHTML = '00:00:00';
		dom.display.onclick = toggleHexa;
		dom.body.appendChild(dom.display);
		window.onresize = centerDisplay;
		setTimeout(centerDisplay, 0);
		setTimeout(step, 1);
	}

	return {
		start: function() {
			start();
		}
	}
}();
