class FunctionGraphObject {
    constructor(canvas) {
        this.unitWidth = 45;
        this.scaleX = 1;
        this.scaleY = 1;
        this.OriginPositionFrom_X_Y = [4, 3];


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
        var n = this.points.length;
        var count = n;
        for (var i in points){
            this.points.push(new Point("name", [points[i][0], points[i][1]], color, this, count + 1));
            count = n + parseInt(i);

            if(typeof points[i][2] == 'object'){this.points[count].AdjustPoint(points[i][2])};
            this.points[count].setPoint();
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