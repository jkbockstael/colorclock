// Color Clock JS : JavaScript partial reimplementation of http://thecolourclock.co.uk/ (by Jack Hughes)
// 2012-2014, Jean-Karim Bockstael <jkb@jkbockstael.be>
window.cc = (function cc() {
	var _timer = undefined;
	var _dom = {};
	var _hexaMode = true;
	var _lastTime = "";

	function _centerDisplay() {
		_dom.display.style.fontSize = Math.floor(window.innerHeight / 3.5) + "px";
		_dom.display.style.top = Math.floor((window.innerHeight - _dom.display.offsetHeight) / 2) + "px";
		_dom.display.style.width = window.innerWidth;
	}

	function _toggleHexa() {
		_hexaMode = !_hexaMode;
		clearTimeout(_timer);
		_step();
	}

	function _step() {
		var date = new Date();
		if (date.toString() !== _lastTime) {
			_lastTime = date.toString();
			var hours = date.getHours();
			var minutes = date.getMinutes();
			var seconds = date.getSeconds();

			// Update colors
			var hoursRatio = (hours/23);
			var minutesRatio = (minutes/59);
			var secondsRatio = (seconds/59);

			var highlightRed = Math.floor(hoursRatio * 256);
			var highlightGreen = Math.floor(minutesRatio * 256);
			var highlightBlue = Math.floor(secondsRatio * 256);

			var bodyRed = Math.floor(highlightRed * 0.9);
			var bodyGreen = Math.floor(highlightGreen * 0.9);
			var bodyBlue = Math.floor(highlightBlue * 0.9);

			var displayRed = Math.floor(highlightRed * 0.8);
			var displayGreen = Math.floor(highlightGreen * 0.8);
			var displayBlue = Math.floor(highlightBlue * 0.8);

			var shadowRed = Math.floor(highlightRed * 0.7);
			var shadowGreen = Math.floor(highlightGreen * 0.7);
			var shadowBlue = Math.floor(highlightBlue * 0.7);

			_dom.body.style.backgroundColor = "rgb(" + bodyRed + "," + bodyGreen + "," + bodyBlue + ")";
			_dom.display.style.color = "rgb(" + displayRed + "," + displayGreen + "," + displayBlue + ")";
			_dom.display.style.textShadow = "-1px -2px 2px rgb(" + shadowRed + "," + shadowGreen + "," + shadowBlue + ")";
			_dom.display.style.textHighlight = "1px 2px 2px rgb(" + highlightRed + "," + highlightGreen + "," + highlightBlue + ")";

			// Display time
			if (_hexaMode === true) {
				var time = "" + ((hours < 16) ? "0" + hours.toString(16) : hours.toString(16));
				time += ":" + ((minutes < 16) ? "0" + minutes.toString(16) : minutes.toString(16));
				time += ":" + ((seconds < 16) ? "0" + seconds.toString(16) : seconds.toString(16));
			}
			else {
				var time = "" + ((hours < 10) ? "0" + hours : hours);
				time += ":" + ((minutes < 10) ? "0" + minutes : minutes);
				time += ":" + ((seconds < 10) ? "0" + seconds : seconds);
			}
			_dom.display.innerHTML = time;
		}
		_timer = setTimeout(_step, 200);
	}

	function _start() {
		_dom.body = document.getElementsByTagName("body")[0];
		_dom.display = document.getElementById("display");
		_dom.display.style.width = window.innerWidth;
		_dom.display.onclick = _toggleHexa;
		window.onresize = _centerDisplay;
		setTimeout(_centerDisplay, 0);
		setTimeout(_step, 1);
	}

	return {
		start: function() {
			_start();
		}
	}
}());
