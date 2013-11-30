// Color Clock JS : JavaScript partial reimplementation of http://thecolourclock.co.uk/ (by Jack Hughes)
// 2012, Jean-Karim Bockstael <jkb@jkbockstael.be>
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

	function toggleHexa() {
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
		_dom.display = document.createElement("div");
		_dom.display.id = "display";
		_dom.display.style.position = "relative";
		_dom.display.style.fontFamily = "monospace";
		_dom.display.style.textAlign = "center";
		_dom.display.style.width = window.innerWidth;
		_dom.display.style.margin = "0";
		_dom.display.style.marginLeft = "auto";
		_dom.display.style.marginRight = "auto";
		_dom.display.style.color = "transparent";
		_dom.body.style.position = "absolute";
		_dom.body.style.width = "100%";
		_dom.body.style.height = "100%"
		_dom.body.style.margin = "0";
		_dom.display.innerHTML = "00:00:00";
		_dom.display.onclick = toggleHexa;
		_dom.body.appendChild(_dom.display);
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
