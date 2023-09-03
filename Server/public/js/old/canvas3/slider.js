class Slider{
	constructor(createInsideOf, name, range, FunctionGraphObject, stepsize, startval){
        this.parentElement = document.getElementById(createInsideOf);
        this.name = name; 
        this.range = range;
        this.stepsize = .01;
        if (typeof stepsize === 'number') this.stepsize = stepsize;
        this.startval = 1;
        if (typeof startval === 'number') this.startval = startval;

        var id = FunctionGraphObject.sliderCount;
        this.startval = 1;
        this.id = id;
        this.FunctionGraphObject = FunctionGraphObject;
        this.sliderValue = this.startval;

        this.pValueID = "sliderval" + this.id  ;
        this.sliderID = 'range-slider' + this.id + '-slider';
        this.valueID = 'range-slider' + this.id + '-value';

        this.createSlider();
    }

    createSlider(){
        this.parentElement.insertAdjacentHTML("beforeend", this.createNameHtml());
        this.parentElement.insertAdjacentHTML("beforeend", this.createSliderHtml());

        this.setSliderValue();
        this.FunctionGraphObject.sliderCount++;
    }

    createNameHtml(){
        return "<p>" + this.name + " = " + "<span id='" + this.pValueID + "'></span></p>";
    }

    createSliderHtml(){
        var rangesliderinnerA = '<input class="range-slider__range" id="' + this.sliderID + '" type="range" min="' + this.range[0]/this.stepsize + '" max="' + this.range[1]/this.stepsize + '" value="' + this.startval/this.stepsize + '">';
        var rangesliderinnerB = '<span class="range-slider__value" id="' + this.valueID + '">0</span>';
        return "<div class='range-slider' id='range-slider" + this.id + "'>" + rangesliderinnerA + rangesliderinnerB + "</div>";
    }

    updateInternalSliderVal(){
        this.sliderValue = Math.round(document.getElementById(this.sliderID).value * this.stepsize * 1000)/1000;
    }

    setSliderValue(){
        this.updateInternalSliderVal();
        document.getElementById(this.pValueID).innerHTML = this.sliderValue;
        document.getElementById(this.valueID).innerHTML = this.sliderValue;
        this.FunctionGraphObject.sliderValues[this.id] = this.sliderValue;
    }
}

function initSliderInFGO(FunctionGraphObject){
    FunctionGraphObject.sliders.forEach(element => document.getElementById(element.sliderID).oninput = function(){
        element.setSliderValue();
        if (typeof UpdateOnSliderDrag === "function"){UpdateOnSliderDrag()}
        FunctionGraphObject.update();
    });
}