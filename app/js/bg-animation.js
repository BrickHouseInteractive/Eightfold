(function(){
	 // create an new instance of a pixi stage
    var stage = new PIXI.Stage(0xFFFFFF, true);
    var height = window.innerHeight;
    var width = window.innerWidth;
    var options = {
    	transparent: true,
    	antialias: true,
    	resolution: 2,
    	view: document.getElementById("background-animation")
    };

    // create a renderer instance.
    var renderer = PIXI.autoDetectRenderer(width, height, options);
    renderer.view.style.width = window.innerWidth+"px";
    // add the renderer view element to the DOM
    requestAnimFrame( animate );

    //Add polygon
	var graphics = new PIXI.Graphics();
	var points = [];
	var peaks = [
		{x:-0.1, y:0.3},
		{x:0.05, y:0.28},
		{x:0.17, y:0.38},
		{x:0.43, y:0.3},
		{x:0.55, y:0.2},
		{x:0.85, y:0.37},
		{x:0.92, y:0.35},
		{x:1.3, y:0.3}
	];
	points.push();
	_.forEach(peaks, function(peak){
		point = {
			x: width*peak.x,
			initY: width/2*peak.y,
			theta: Math.random()*Math.PI*2,
			thetaInc: (Math.random()/2+1)/100,
			amp: width/60
		};
		points.push(point);
	});
	
	stage.addChild(graphics);

	//animate
    function animate() {
        if($(window).scrollTop() < 5){
	        // render the stage   
	        renderer.render(stage);

	        _.forEach(points, function(point){
	        	point.theta += point.thetaInc;
	        	point.y = point.initY + Math.sin(point.theta)*point.amp;
	        });

			graphics.clear(); 
	        graphics.lineStyle(1, 0xFFFFFF, 0.25);
			graphics.beginFill(0xFFFFFF, 0.1);
			graphics.moveTo(-1,-1);
			graphics.lineTo(-1,height/3);
			for(i=0 ; i<_.size(points)-1 ; i++){
				graphics.lineTo(points[i].x, points[i].y);
				if(i!=_.size(points)-1){
					var ray = Math.sin(Math.PI/4)*2000;
					var x1 = points[i].x;
					var y1 = points[i].y;
					var x2 = points[i].x + ray;
					var y2 = points[i].y + ray;
					var x3 = points[i+1].x;
					var y3 = points[i+1].y;
					var x4 = points[i].x - ray;
					var y4 = points[i].y + ray;
					var valley = intersect(x1,y1,x2,y2,x3,y3,x4,y4);
					graphics.lineTo(valley.x, valley.y);
				}
			}
			graphics.lineTo(width+1,height/2); 
			graphics.lineTo(width+1,-1); 
			graphics.endFill();
		}

		requestAnimFrame( animate );
    }

    function intersect(x1, y1, x2, y2, x3, y3, x4, y4){

	  var a1, a2, b1, b2, c1, c2;
	  var r1, r2 , r3, r4;
	  var denom, offset, num;

	  // Compute a1, b1, c1, where line joining points 1 and 2
	  // is "a1 x + b1 y + c1 = 0".
	  a1 = y2 - y1;
	  b1 = x1 - x2;
	  c1 = (x2 * y1) - (x1 * y2);

	  // Compute r3 and r4.
	  r3 = ((a1 * x3) + (b1 * y3) + c1);
	  r4 = ((a1 * x4) + (b1 * y4) + c1);

	  // Check signs of r3 and r4. If both point 3 and point 4 lie on
	  // same side of line 1, the line segments do not intersect.
	  if ((r3 !== 0) && (r4 !== 0) && sameSign(r3, r4)){
	    return "DONT_INTERSECT";
	  }

	  // Compute a2, b2, c2
	  a2 = y4 - y3;
	  b2 = x3 - x4;
	  c2 = (x4 * y3) - (x3 * y4);

	  // Compute r1 and r2
	  r1 = (a2 * x1) + (b2 * y1) + c2;
	  r2 = (a2 * x2) + (b2 * y2) + c2;

	  // Check signs of r1 and r2. If both point 1 and point 2 lie
	  // on same side of second line segment, the line segments do
	  // not intersect.
	  if ((r1 !== 0) && (r2 !== 0) && (sameSign(r1, r2))){
	    return "DONT_INTERSECT";
	  }

	  //Line segments intersect: compute intersection point.
	  denom = (a1 * b2) - (a2 * b1);

	  if (denom === 0) {
	    return "COLLINEAR";
	  }

	  if (denom < 0){ 
	    offset = -denom / 2; 
	  } 
	  else {
	    offset = denom / 2 ;
	  }

	  // The denom/2 is to get rounding instead of truncating. It
	  // is added or subtracted to the numerator, depending upon the
	  // sign of the numerator.
	  num = (b1 * c2) - (b2 * c1);
	  if (num < 0){
	    x = (num - offset) / denom;
	  } 
	  else {
	    x = (num + offset) / denom;
	  }

	  num = (a2 * c1) - (a1 * c2);
	  if (num < 0){
	    y = ( num - offset) / denom;
	  } 
	  else {
	    y = (num + offset) / denom;
	  }

	  // lines_intersect
	  return {x:x,y:y};
	}


	function sameSign(a, b){
	  return (( a * b) >= 0);
	}
})();