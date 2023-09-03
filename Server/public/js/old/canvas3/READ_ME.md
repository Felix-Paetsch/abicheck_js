```js
//create new Canvas Element
Canvas = new FunctionGraphObject("canvas3");
//main function ->
Canvas.update();

//ChangeSettings
Canvas.updateunitWidth($how_ling_unit_square_sides);

Canvas.updateScale($scaleX_Axis, $scaleY_Axis);

Canvas.updateOrigin($new_origin_x, $new_origin_y);

Canvas.grid.x_axis_name = "x";
		   .y_axis_name = "y";
//When Settings done:
Canvas.grid.createArrows();

//Points
//change values:
Canvas.pointradius = $radius/2;
	  .pointfontsize = $fontsize;

//create points
Canvas.createPoints($color, [$name, $x_val, y_val] , [2. Point] , [3. Point] , ...);

//update Point
AdjustPoint([$change_Text_x_by_amount, $change_Text_y_by_amount]);

updatePoint($new_x, $new_y);


//Functions
Canvas.createFunctions([$function, $color], [next_fun, next_color], [...]);
//set function from - functio to
Canvas.functions[$functionNumber].from = $InUnits e.g 2/3/-1/-3;
								 .to = ________;
								 .thickness = 2;
//is drawn in Canvas.update();


//slider
Canvas.createSliders($Parent_element_id, [$slider_name, [$slider_startValue, $slider_endValue], $stepsize_optional, $startval_optional], [Next Slider]);
//Access with
Canvas.sliderValues[i];

set function UpdateOnSliderDrag() to do so;
