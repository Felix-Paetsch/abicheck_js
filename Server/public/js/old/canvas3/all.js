class FunctionGraphObject {
    constructor(canvas) {
        this.unitWidth = 45;
        this.scaleX = 1;
        this.scaleY = 1;
        this.OriginPositionFrom_X_Y = [4, 3];
        this.canvasIdentifier = canvas;
        this.canvas = document.getElementById(canvas);
        this.grid = new Grid(this.canvas, this.unitWidth, this.scaleX, this.scaleY, this.OriginPositionFrom_X_Y);
        this.functions = [];
        this.sliders = [];
        this.sliderValues = [];
        this.points = [];
        this.pointradius = 6;
        this.pointfontsize = 16;
        this.sliderCount = 0;
    }

    update(){
        this.canvas.width = this.canvas.width;
        this.grid.draw();
        for (var i in this.functions){this.functions[i].draw()};
    }

    createFunctions(...functions){
        for (var i in functions){
            this.functions.push(new Function(functions[i][0], functions[i][1], this))
        }
    }

    createSliders(createInsideOf,...sliders){
        for (var i in sliders){
            this.sliders.push(new Slider(createInsideOf, sliders[i][0], sliders[i][1], this, sliders[i][2], sliders[i][3]))
        }
        initSliderInFGO(this);
    }

    createSlidersFromArray(createInsideOf,sliders){
        for (var i in sliders){
            this.sliders.push(new Slider(createInsideOf, sliders[i][0], sliders[i][1], this, sliders[i][2], sliders[i][3]))
        }
        initSliderInFGO(this);
    }

    createPoints(color, ...points){
        for (var i in points){
            this.points.push(new Point(points[i][0], [points[i][1], points[i][2]], color, this, this.points.length + 1));
            this.points[this.points.length - 1].setPoint();
            if(typeof points[i][3] == 'object'){this.points[this.points.length - 1].AdjustPoint(points[i][3])};
        }
    }

    updateOrigin(x, y){
        this.grid.OriginPositionFrom_X_Y = [x, y];
        this.OriginPositionFrom_X_Y = [x, y];
    }

    updateunitWidth(value){
        this.grid.unitWidth = value;
        this.unitWidth = value;
    }

    updateScale(x, y){
        this.grid.scaleX = x;
        this.grid.scaleY = y;
        this.scaleX = x;
        this.scaleY = y;
    }
}

class Grid{
    constructor(canvas, unitWidth, scaleX, scaleY, OriginPositionFrom_X_Y){
        this.unitWidth = unitWidth;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.OriginPositionFrom_X_Y = OriginPositionFrom_X_Y;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.tickmarklenght = 3;
        this.tickmarkfont = 10;
        this.ArrowFont = 15;
        this.Arrowlength = 5;
        this.adjust_x_updown = 0;
        this.adjust_y_lr = 0;
        this.x_axis_name = "x";
        this.y_axis_name = "y";
    }

    createArrows(){
        var text = [];

        var pflinksright = Math.sqrt(this.Arrowlength) - 1;
        var pflinksdown =  this.unitWidth*this.OriginPositionFrom_X_Y[0] - Math.sqrt(this.Arrowlength*2) +1;
        text.push('<'.concat('div style="box-sizing:border-box;font-size:',this.ArrowFont,'px;right:',pflinksright,'px; top:',pflinksdown,'px; width: ', this.Arrowlength,'px;height:',this.Arrowlength,'px;position:absolute; border-right: 1px solid black; border-top: 1px solid black; transform: rotateZ(45deg);"></div>'));

        var x_namer = this.Arrowlength + 5;
        var x_namet =  pflinksdown + 5 + this.adjust_x_updown;
        text.push('<'.concat('div style="font-size:',this.ArrowFont,'px;right:',x_namer,'px; top:',x_namet,'px;position:absolute;">',this.x_axis_name,'</div>'));

        var pftoptop = Math.sqrt(this.Arrowlength) - 1;
        var pftopleft =  this.unitWidth*this.OriginPositionFrom_X_Y[1] - Math.sqrt(this.Arrowlength*2) +1;
        text.push('<'.concat('div style="box-sizing:border-box;font-size:',this.ArrowFont,'px;top:',pftoptop,'px; left:',pftopleft,'px; width: ', this.Arrowlength,'px;height:',this.Arrowlength,'px;position:absolute; border-right: 1px solid black; border-top: 1px solid black; transform: rotateZ(-45deg);"></div>'));

        var y_namet = pftoptop + 5;
        var y_namel =  pftopleft + this.adjust_y_lr - 10;
        text.push('<'.concat('div style="font-size:',this.ArrowFont,'px;top:',y_namet,'px; left:',y_namel,'px;position:absolute;">',this.y_axis_name,'</div>'));
    
        this.insertArrowHtml(text);
    }

    insertArrowHtml(text){
        for (var i in text){
            this.canvas.insertAdjacentHTML('beforebegin', text[i]);
        }
    }

    draw(){
        this.translateToOrigin();
        this.draw_axislines();
        this.drawTickmarks();
        this.translateBack();
    }

    draw_axislines(){
        this.drawXLines();
        this.drawYLines();
    }

    drawTickmarks(){
        this.drawTickmarksXPositiv();
        this.drawTickmarksXNegative();
        this.drawTickmarksYPositiv();
        this.drawTickmarksYNegative();
    }

    drawTickmarksYNegative(){
        for(var i=1; i < this.OriginPositionFrom_X_Y[0]; i++) {
            this.ctx.beginPath();
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = "#000000";

            // Draw a tick mark 6px long (-3 to 3)
            this.ctx.moveTo(-this.tickmarklenght, -this.unitWidth*i+0.5);
            this.ctx.lineTo(this.tickmarklenght, -this.unitWidth*i+0.5);
            this.ctx.stroke();

            // Text value at that point
            this.ctx.font = this.tickmarkfont+'Arial';
            this.ctx.textAlign = 'start';
            this.ctx.fillText(this.scaleY*i, 8, -this.unitWidth*i+3);
        }
    }

    drawTickmarksYPositiv(){
        for(var i=1; i<(this.getNumXLines() - this.OriginPositionFrom_X_Y[0]); i++) {
            this.ctx.beginPath();
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = "#000000";

            // Draw a tick mark 6px long (-3 to 3)
            this.ctx.moveTo(-this.tickmarklenght, this.unitWidth*i+0.5);
            this.ctx.lineTo(this.tickmarklenght, this.unitWidth*i+0.5);
            this.ctx.stroke();

            // Text value at that point
            this.ctx.font = this.tickmarkfont+'Arial';
            this.ctx.textAlign = 'start';
            this.ctx.fillText(-this.scaleY*i, 8, this.unitWidth*i+3);
        }
    }

    drawTickmarksXPositiv(){
        for(var i=1; i<(this.getNumYLines() - this.OriginPositionFrom_X_Y[1]); i++) {
            this.ctx.beginPath();
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = "#000000";

            // Draw a tick mark 6px long (-3 to 3)
            this.ctx.moveTo(this.unitWidth*i+0.5, -this.tickmarklenght);
            this.ctx.lineTo(this.unitWidth*i+0.5, this.tickmarklenght);
            this.ctx.stroke();

            // Text value at that point
            this.ctx.font = this.tickmarkfont+'Arial';
            this.ctx.textAlign = 'start';
            this.ctx.fillText(this.scaleX*i, this.unitWidth*i-2, 15);
        }
    }

    drawTickmarksXNegative(){
        for(var i=1; i < this.OriginPositionFrom_X_Y[1]; i++) {
            this.ctx.beginPath();
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = "#000000";

            this.ctx.moveTo(-this.unitWidth*i+0.5, -this.tickmarklenght);
            this.ctx.lineTo(-this.unitWidth*i+0.5, this.tickmarklenght);
            this.ctx.stroke();

            // Text value at that point
            this.ctx.font = this.tickmarkfont+'Arial';
            this.ctx.textAlign = 'end';
            this.ctx.fillText(-this.scaleX*i, -this.unitWidth*i+3, 15);
        }
    }

    translateToOrigin(){
        this.ctx.translate(this.OriginPositionFrom_X_Y[1]*this.unitWidth, this.OriginPositionFrom_X_Y[0]*this.unitWidth);
    }

    translateBack(){
        this.ctx.translate(-this.OriginPositionFrom_X_Y[1]*this.unitWidth, -this.OriginPositionFrom_X_Y[0]*this.unitWidth);
    }

    drawXLines(){
        for(var i=Math.trunc(-this.OriginPositionFrom_X_Y[0]); i <= this.getNumXLines(); i++) {
            this.ctx.beginPath();
            this.ctx.lineWidth = 1;
            if(i == 0) 
                this.ctx.strokeStyle = "#000000";
            else
                this.ctx.strokeStyle = "#e9e9e9";
            
        
            this.ctx.moveTo(-this.OriginPositionFrom_X_Y[1]*this.unitWidth, this.unitWidth*(i)+0.5);
            this.ctx.lineTo(this.canvas.width-this.OriginPositionFrom_X_Y[1]*this.unitWidth, this.unitWidth*(i)+0.5);
            
            this.ctx.stroke();
        }
    }

    getNumXLines(){
        return Math.floor(this.canvas.height/this.unitWidth);
    }

    drawYLines(){
        for(var i=Math.trunc(-this.OriginPositionFrom_X_Y[1]); i <= this.getNumYLines(); i++) {
            this.ctx.beginPath();
            this.ctx.lineWidth = 1;
            
            // If line represents Y-axis draw in different color
            if(i == 0) 
                this.ctx.strokeStyle = "#000000";
            else
                this.ctx.strokeStyle = "#e9e9e9";
            
            this.ctx.moveTo(this.unitWidth*(i)+0.5, -this.OriginPositionFrom_X_Y[0]*this.unitWidth);
            this.ctx.lineTo(this.unitWidth*(i)+0.5, this.canvas.height-this.OriginPositionFrom_X_Y[0]*this.unitWidth);
            this.ctx.stroke();
        }
    }

    getNumYLines(){
        return Math.floor(this.canvas.width/this.unitWidth);
    }
}

class Function{
    constructor(func, color, FunctionGraphObject){
        this.func = func;
        this.color = color;
        this.thickness;
        this.dx = 4;

        this.scaleX = FunctionGraphObject.scaleX;
        this.scaleY = FunctionGraphObject.scaleY;
        this.canvas = FunctionGraphObject.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.unitWidth = FunctionGraphObject.unitWidth;
        this.OriginPositionFrom_X_Y = FunctionGraphObject.OriginPositionFrom_X_Y;

        this.from = -this.OriginPositionFrom_X_Y[1];
        this.to = this.canvas.width/this.unitWidth;
    }

    draw(){
        this.translateToOrigin();

        var iMin = Math.round(this.from*this.unitWidth/this.dx);
        var iMax = Math.round((this.to*this.unitWidth)/this.dx);

        this.ctx.beginPath();
        this.ctx.lineWidth = this.thickness;
        this.ctx.strokeStyle = this.color;
        
        this.drawloop(iMax,iMin);
        this.ctx.stroke();

        this.translateBack();
    }

    translateToOrigin(){
        this.ctx.translate(this.OriginPositionFrom_X_Y[1]*this.unitWidth, this.OriginPositionFrom_X_Y[0]*this.unitWidth);
    }

    translateBack(){
        this.ctx.translate(-this.OriginPositionFrom_X_Y[1]*this.unitWidth, -this.OriginPositionFrom_X_Y[0]*this.unitWidth);
    }

    drawloop(iMax, iMin){
        this.ctx.moveTo(this.dx*i,-this.getRealFunVal(this.dx*i));
        for (var i=iMin + 1;i<=iMax;i++) {
            this.drawloopmoveto(this.dx*i)
        }
    }

    drawloopmoveto(x){
        this.ctx.lineTo(x,-this.getRealFunVal(x));
    }

    getRealFunVal(x){
        return this.unitWidth*this.func(x/this.unitWidth*this.scaleX)/this.scaleY;
    }
}

class Point {
    constructor(name, positionXY, color, FunctionGraphObject, index){
        FunctionGraphObject.canvas.parentElement.style.position = "relative";
        this.unitWidth = FunctionGraphObject.unitWidth;
        this.scaleX = FunctionGraphObject.scaleX;
        this.scaleY = FunctionGraphObject.scaleY;
        this.OriginPositionFrom_X_Y = FunctionGraphObject.OriginPositionFrom_X_Y;
        this.canvas = FunctionGraphObject.canvas;
        this.radius = FunctionGraphObject.pointradius;
        this.fonzsize = FunctionGraphObject.pointfontsize;

        this.name = name;
        this.positionXY = positionXY;
        this.color = color;
        this.textadjustXY = [0,0];
        this.selfIndex = index;
    }

    setPoint(){
        var x = this.setXval();
        var y = this.setYval();
        this.setPointDot(x, y);
        this.setPointText(x, y);
    }

    setXval(){
        return ((this.positionXY[0] + this.OriginPositionFrom_X_Y[1]))*this.unitWidth +1 - this.radius/2;
    }

    setXfontval(){
        return this.setXval() + 7.5 + this.textadjustXY[0];
    }

    setYfontval(){
        return this.setYval() + 1 - this.fonzsize/2 + this.textadjustXY[1];
    }

    setYval(){
        return ((-1*this.positionXY[1] + this.OriginPositionFrom_X_Y[0]))*this.unitWidth +1 - this.radius/2
    }

    setPointDot(x, y){
        var text = "<".concat('div style="position: absolute; border-radius: 20px;top:' , y, 'px; left:' ,x , 'px; height:' , this.radius , 'px; width:',this.radius,'px; background-color:', this.color, ';"></div>');
        this.canvas.insertAdjacentHTML('beforebegin', text);
    }

    setPointText(x, y){
        var Nx = this.setXfontval();
        var Ny = this.setYfontval();
        var text = "<".concat('div style="font-size:',this.fonzsize,'px;position: absolute;top:' , Ny, 'px; left:' ,Nx , 'px; color:', this.color, ';">',this.name,'</div>');
        this.canvas.insertAdjacentHTML('beforebegin', text); 
    }

    AdjustPoint(array){
        this.textadjustXY = array;
        this.updatePointDomElement()
    }

    updatePoint(x, y){
        this.positionXY = [x, y];
        this.updatePointDomElement();
    }

    updatePointDomElement(){
        var point = this.canvas.parentNode.childNodes[3+2*this.selfIndex];
        var pointname = this.canvas.parentNode.childNodes[4+2*this.selfIndex];

        var x = this.setXval();
        var y = this.setYval();

        var Nx = this.setXfontval();
        var Ny = this.setYfontval();
        point.style.top=y.toString().concat("px");
        point.style.left=x.toString().concat("px");
        
        pointname.style.top=Ny.toString().concat("px");
        pointname.style.left=Nx.toString().concat("px");
        pointname.innerHTML = this.name;
    }
}

class Slider{
    constructor(createInsideOf, name, range, FunctionGraphObject, stepsize, startval){
        this.parentElement = document.getElementById(createInsideOf);
        this.name = name; 
        this.range = range;
        this.stepsize = .01;
        if (typeof stepsize === 'number') this.stepsize = stepsize;
        this.startval = 1;
        if (typeof startval === 'number') this.startval = startval;
        this.FunctionGraphObject = FunctionGraphObject;
        this.id = this.FunctionGraphObject.sliderCount;
        this.htmlId = this.FunctionGraphObject.canvasIdentifier + this.id.toString();
        this.sliderValue = this.startval;

        this.pValueID = "sliderval" + this.htmlId  ;
        this.sliderID = 'range-slider' + this.htmlId + '-slider';
        this.valueID = 'range-slider' + this.htmlId + '-value';
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
        return "<div class='range-slider' id='range-slider" + this.htmlId + "'>" + rangesliderinnerA + rangesliderinnerB + "</div>";
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
        if (typeof FunctionGraphObject.UpdateOnSliderDrag === "function"){FunctionGraphObject.UpdateOnSliderDrag();}
        FunctionGraphObject.update();
    });
}