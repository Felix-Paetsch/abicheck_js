var W = [];
function slider(canvasid, sliderarray, canvascount, slidermovedfunction){
	W.push([]);
	var canvas = document.getElementById(canvasid);
	sliderarray.forEach(function(slider) {
		var rangeslider = document.getElementById(slider[0]);
		if (slider[5] === undefined){
			var slider0 = slider[0];
		}
		else{
			var slider0 = slider[0].concat(slider[5]);
		};
		rangeslider.insertAdjacentHTML('afterbegin', '<input class="range-slider__range" id="'.concat(slider0,'-myRange" type="range" min="',slider[1],'" max=',slider[2],' value=',slider[3],'>'));
		rangeslider.insertAdjacentHTML("beforeend", '<span class="range-slider__value" id="'.concat(slider0,'-value">0</span>'));

		var sliderx = document.getElementById(slider0.concat('-myRange'));
		var slidery = sliderx.value / 100;

		var slidername = document.getElementById(slider[4]);
		var slidernameval = document.getElementById(slider0.concat('-value'));

		slidername.innerHTML = slidery;
		slidernameval.innerHTML = slidery;

		sliderx.oninput = function() {
			canvas.width = canvas.width;
			slidery = sliderx.value/100;
			slidername.innerHTML = slidery;
			slidernameval.innerHTML = slidery;

			W[canvascount][sliderarray.indexOf(slider)] = slidery;
			slidermovedfunction(W);
		}

		
		W[canvascount].push(slidery);
	});

	slidermovedfunction(W);
}

function sliderint(canvasid, sliderarray, canvascount, slidermovedfunction){
	W.push([]);
	var canvas = document.getElementById(canvasid);
	sliderarray.forEach(function(slider) {
		var rangeslider = document.getElementById(slider[0]);
		if (slider[5] === undefined){
			var slider0 = slider[0];
		}
		else{
			var slider0 = slider[0].concat(slider[5]);
		};
		rangeslider.insertAdjacentHTML('afterbegin', '<input class="range-slider__range" id="'.concat(slider0,'-myRange" type="range" min="',slider[1],'" max=',slider[2],' value=',slider[3],'>'));
		rangeslider.insertAdjacentHTML("beforeend", '<span class="range-slider__value" id="'.concat(slider0,'-value">0</span>'));

		var sliderx = document.getElementById(slider0.concat('-myRange'));
		var slidery = sliderx.value;
		if (slider[6] != undefined){
			slidery /= 100;
		}

		var slidername = document.getElementById(slider[4]);
		var slidernameval = document.getElementById(slider0.concat('-value'));

		slidername.innerHTML = slidery;
		slidernameval.innerHTML = slidery;

		sliderx.oninput = function() {
			canvas.width = canvas.width;
			slidery = sliderx.value;
			if (slider[6] != undefined){
				slidery /= 100;
			}
			slidername.innerHTML = slidery;
			slidernameval.innerHTML = slidery;

			W[canvascount][sliderarray.indexOf(slider)] = slidery;
			slidermovedfunction(W);
		}

		
		W[canvascount].push(slidery);
	});

	slidermovedfunction(W);
}