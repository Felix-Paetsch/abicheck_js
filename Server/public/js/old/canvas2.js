function setvar(grid_size2, x_axis2,y_axis2, functions, canvas, font_tickmark, fonts, pfeillength ,x_axis_name, y_axis_name, adjust_x_updown, adjust_y_lr){
    setvar2(grid_size2, x_axis2,y_axis2, functions, canvas, font_tickmark, fonts, pfeillength ,x_axis_name, y_axis_name, adjust_x_updown, adjust_y_lr);
    //kann nicht ans Ende, da canvas neu definiert wird
    var canvas = document.getElementById(canvas);

    var pflinksright = Math.sqrt(pfeillength) - 1;
    var pflinksdown =  grid_size2*x_axis2 - Math.sqrt(pfeillength*2) +1;
    var str = '<';
    var text = str.concat('div style="box-sizing:border-box;font-size:',fonts,'px;right:',pflinksright,'px; top:',pflinksdown,'px; width: ', pfeillength,'px;height:',pfeillength,'px;position:absolute; border-right: 1px solid black; border-top: 1px solid black; transform: rotateZ(45deg);"></div>')
    canvas.insertAdjacentHTML('beforebegin', text);

    var x_namer = pflinksright + 5;
    var x_namet =  pflinksdown + 5 + adjust_x_updown;
    var str = '<';
    var text = str.concat('div style="font-size:',fonts,'px;right:',x_namer,'px; top:',x_namet,'px;position:absolute;">',x_axis_name,'</div>')
    canvas.insertAdjacentHTML('beforebegin', text);

    var pftoptop = Math.sqrt(pfeillength) - 1;
    var pftopleft =  grid_size2*y_axis2 - Math.sqrt(pfeillength*2) + 1;
    var str = '<';
    var text = str.concat('div style="box-sizing:border-box;font-size:',fonts,'px;top:',pftoptop,'px; left:',pftopleft,'px; width: ', pfeillength,'px;height:',pfeillength,'px;position:absolute; border-right: 1px solid black; border-top: 1px solid black; transform: rotateZ(-45deg);"></div>')
    canvas.insertAdjacentHTML('beforebegin', text);

    var y_namet = pftoptop + 5;
    var y_namel =  pftopleft + adjust_y_lr - 10;
    var str = '<';
    var text = str.concat('div style="font-size:',fonts,'px;top:',y_namet,'px; left:',y_namel,'px;position:absolute;">',y_axis_name,'</div>')
    canvas.insertAdjacentHTML('beforebegin', text);
}

function setpoints(grid_size2, x_axis2, y_axis2, color, radius, font_size, points, canvas){
    var canvas = document.getElementById(canvas);
    for (var i = 0 ; i < points.length ; i++){
        var str = '<';
        var x = (points[i][0] + y_axis2)*grid_size2 +1 - radius/2;
        var y = (-1*points[i][1] + x_axis2)*grid_size2 +1 - radius/2;
        var text = str.concat('div style="position: absolute; border-radius: 20px;top:' , y, 'px; left:' ,x , 'px; height:' , radius , 'px; width:',radius,'px; background-color:', color, ';"></div>');
        canvas.insertAdjacentHTML('beforebegin', text);
    

        var name = points[i][2];
        var Nx = x + 7.5 + points[i][3];
        var Ny = y + 1 - font_size/2 + points[i][4];
        text = str.concat('div style="font-size:',font_size,'px;position: absolute;top:' , Ny, 'px; left:' ,Nx , 'px; color:', color, ';">',name,'</div>');
        canvas.insertAdjacentHTML('beforebegin', text);
    }  
}

function updatepoints(grid_size2, x_axis2, y_axis2, radius, font_size, points, insideof){

    for (var i = 0 ; i < points.length ; i++){
        var point = document.getElementById(insideof).childNodes[3+2*points[i][0]];
        var pointname = document.getElementById(insideof).childNodes[4+2*points[i][0]];
        var x = (points[i][1] + y_axis2)*grid_size2 +1 - radius/2;
        var y = (-1*points[i][2] + x_axis2)*grid_size2 +1 - radius/2;
    

        var name = points[i][3];
        var Nx = x + 7.5 + points[i][4];
        var Ny = y + 1 - font_size/2 + points[i][5];
        point.style.top=y.toString().concat("px");
        point.style.left=x.toString().concat("px");
        
        pointname.style.top=Ny.toString().concat("px");
        pointname.style.left=Nx.toString().concat("px");
        pointname.innerHTML = name;
    }  
}


function setvar2(grid_size2, x_axis2,y_axis2, functions, canvas, font_tickmark, fonts, pfeillength ,x_axis_name, y_axis_name, adjust_x_updown, adjust_y_lr){
    setvar3(grid_size2, x_axis2, 1, y_axis2, 1, functions, canvas, font_tickmark, fonts, pfeillength ,x_axis_name, y_axis_name, adjust_x_updown, adjust_y_lr);
}
    

function setvar3(grid_size2, x_axis2, x_scalar, y_axis2, y_scalar, functions, canvas, font_tickmark, fonts, pfeillength ,x_axis_name, y_axis_name, adjust_x_updown, adjust_y_lr){
    var x_axis_starting_point = { number: x_scalar, suffix: '' };
    var y_axis_starting_point = { number: y_scalar, suffix: '' };

    var grid_size = grid_size2;
    var x_axis_distance_grid_lines = x_axis2;
    var y_axis_distance_grid_lines = y_axis2;

    var canvas = document.getElementById(canvas);
    var ctx = canvas.getContext("2d");

    var canvas_width = canvas.width;
    var canvas_height = canvas.height;

    var num_lines_x = Math.floor(canvas_height/grid_size);
    var num_lines_y = Math.floor(canvas_width/grid_size);

    // Draw grid lines along X-axis
    for(var i=0; i<=num_lines_x; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        
        // If line represents X-axis draw in different color
        if(i == x_axis_distance_grid_lines) 
            ctx.strokeStyle = "#000000";
        else
            ctx.strokeStyle = "#e9e9e9";
        
        if(i == num_lines_x) {
            ctx.moveTo(0, grid_size*i);
            ctx.lineTo(canvas_width, grid_size*i);
        }
        else {
            ctx.moveTo(0, grid_size*i+0.5);
            ctx.lineTo(canvas_width, grid_size*i+0.5);
        }
        ctx.stroke();
    }

    // Draw grid lines along Y-axis
    for(i=0; i<=num_lines_y; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        
        // If line represents X-axis draw in different color
        if(i == y_axis_distance_grid_lines) 
            ctx.strokeStyle = "#000000";
        else
            ctx.strokeStyle = "#e9e9e9";
        
        if(i == num_lines_y) {
            ctx.moveTo(grid_size*i, 0);
            ctx.lineTo(grid_size*i, canvas_height);
        }
        else {
            ctx.moveTo(grid_size*i+0.5, 0);
            ctx.lineTo(grid_size*i+0.5, canvas_height);
        }
        ctx.stroke();
    }

    // Translate to the new origin. Now Y-axis of the canvas is opposite to the Y-axis of the graph. So the y-coordinate of each element will be negative of the actual
    ctx.translate(y_axis_distance_grid_lines*grid_size, x_axis_distance_grid_lines*grid_size);

    // Ticks marks along the positive X-axis
    for(i=1; i<(num_lines_y - y_axis_distance_grid_lines); i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(grid_size*i+0.5, -3);
        ctx.lineTo(grid_size*i+0.5, 3);
        ctx.stroke();

        // Text value at that point
        ctx.font = font_tickmark+'Arial';
        ctx.textAlign = 'start';
        ctx.fillText(x_axis_starting_point.number*i + x_axis_starting_point.suffix, grid_size*i-2, 15);
    }

    // Ticks marks along the negative X-axis
    for(i=1; i<y_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(-grid_size*i+0.5, -3);
        ctx.lineTo(-grid_size*i+0.5, 3);
        ctx.stroke();

        // Text value at that point
        ctx.font = font_tickmark+'Arial';
        ctx.textAlign = 'end';
        ctx.fillText(-x_axis_starting_point.number*i + x_axis_starting_point.suffix, -grid_size*i+3, 15);
    }

    // Ticks marks along the positive Y-axis
    // Positive Y-axis of graph is negative Y-axis of the canvas
    for(i=1; i<(num_lines_x - x_axis_distance_grid_lines); i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(-3, grid_size*i+0.5);
        ctx.lineTo(3, grid_size*i+0.5);
        ctx.stroke();

        // Text value at that point
        ctx.font = font_tickmark+'Arial';
        ctx.textAlign = 'start';
        ctx.fillText(-y_axis_starting_point.number*i + y_axis_starting_point.suffix, 8, grid_size*i+3);
    }

    // Ticks marks along the negative Y-axis
    // Negative Y-axis of graph is positive Y-axis of the canvas
    for(i=1; i<x_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(-3, -grid_size*i+0.5);
        ctx.lineTo(3, -grid_size*i+0.5);
        ctx.stroke();

        // Text value at that point
        ctx.font = font_tickmark+'Arial';
        ctx.textAlign = 'start';
        ctx.fillText(y_axis_starting_point.number*i + y_axis_starting_point.suffix, 8, -grid_size*i+3);
    }

    ctx.translate(-y_axis_distance_grid_lines*grid_size, -x_axis_distance_grid_lines*grid_size);









    // start canvas


    function draw() {
     if (null==canvas || !canvas.getContext) return;

     var axes={}, ctx=canvas.getContext("2d");
     axes.x0 =y_axis2*grid_size2;  // x0 pixels from left to x=0 wo ist x=0
     axes.y0 =x_axis2*grid_size2; // y0 pixels from top to y=0  wo ist y=0
     axes.scale = grid_size2;// 40 pixels from x=0 to x=1
     axes.doNegativeX = true;

     showAxes(ctx,axes);

     for (var j = 0 ; j < functions.length ; j++){
        funGraph(ctx,axes,functions[j][0],functions[j][1],functions[j][2]);
     }
    }

    function funGraph (ctx,axes,func,color,thick) {
     var xx, yy, dx=4, x0=axes.x0, y0=axes.y0, scale=axes.scale;
     var iMax = Math.round((ctx.canvas.width-x0)/dx);
     var iMin = axes.doNegativeX ? Math.round(-x0/dx) : 0;
     ctx.beginPath();
     ctx.lineWidth = thick;
     ctx.strokeStyle = color;

     for (var i=iMin;i<=iMax;i++) {
      xx = dx*i; yy = scale*func(xx/scale);
      if (i==iMin) ctx.moveTo(x0+xx,y0-yy);
      else         ctx.lineTo(x0+xx,y0-yy);
     }
     ctx.stroke();
    }

    function showAxes(ctx,axes) {
     var x0=axes.x0, w=ctx.canvas.width;
     var y0=axes.y0, h=ctx.canvas.height;
     var xmin = axes.doNegativeX ? 0 : x0;
     ctx.beginPath();
     ctx.strokeStyle = "rgb(128,128,128)"; 
     ctx.moveTo(xmin,y0); ctx.lineTo(w,y0);  // X axis
     ctx.moveTo(x0,0);    ctx.lineTo(x0,h);  // Y axis
     ctx.stroke();
    }

    draw();
}