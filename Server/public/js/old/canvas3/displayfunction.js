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

        var iMax = Math.round((this.to*this.unitWidth)/this.dx);
        var iMin = Math.round(this.from*this.unitWidth/this.dx);

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