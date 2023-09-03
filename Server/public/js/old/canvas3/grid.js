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
        this.draw_axislines();
        this.translateToOrigin();
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
        for(var i=0; i <= this.getNumXLines(); i++) {
            this.ctx.beginPath();
            this.ctx.lineWidth = 1;
            
            // If line represents X-axis draw in different color
            if(i == this.OriginPositionFrom_X_Y[0]) 
                this.ctx.strokeStyle = "#000000";
            else
                this.ctx.strokeStyle = "#e9e9e9";
            
            if(i == this.getNumXLines()) {
                this.ctx.moveTo(0, this.unitWidth*i);
                this.ctx.lineTo(this.canvas.width, this.unitWidth*i);
            }
            else {
                this.ctx.moveTo(0, this.unitWidth*i+0.5);
                this.ctx.lineTo(this.canvas.width, this.unitWidth*i+0.5);
            }
            this.ctx.stroke();
        }
    }

    getNumXLines(){
        return Math.floor(this.canvas.height/this.unitWidth);
    }

    drawYLines(){
        for(var i=0; i <= this.getNumYLines(); i++) {
            this.ctx.beginPath();
            this.ctx.lineWidth = 1;
            
            // If line represents Y-axis draw in different color
            if(i == this.OriginPositionFrom_X_Y[1]) 
                this.ctx.strokeStyle = "#000000";
            else
                this.ctx.strokeStyle = "#e9e9e9";
            
            if(i == this.getNumYLines()) {
                this.ctx.moveTo(this.unitWidth*i, 0);
                this.ctx.lineTo(this.unitWidth*i, this.canvas.height);
            }
            else {
                this.ctx.moveTo(this.unitWidth*i+0.5, 0);
                this.ctx.lineTo(this.unitWidth*i+0.5, this.canvas.height);
            }
            this.ctx.stroke();
        }
    }

    getNumYLines(){
        return Math.floor(this.canvas.width/this.unitWidth);
    }
}