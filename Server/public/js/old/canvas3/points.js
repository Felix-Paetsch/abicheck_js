class Point {
    constructor(name, positionXY, color, FunctionGraphObject, index){
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
        return (this.positionXY[0] + this.OriginPositionFrom_X_Y[1])*this.unitWidth +1 - this.radius/2;
    }

    setXfontval(){
        return this.setXval() + 7.5 + this.textadjustXY[0];
    }

    setYfontval(){
        return this.setYval() + 1 - this.fonzsize/2 + this.textadjustXY[1];
    }

    setYval(){
        return (-1*this.positionXY[1] + this.OriginPositionFrom_X_Y[0])*this.unitWidth +1 - this.radius/2
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
        updatePointDomElement()
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