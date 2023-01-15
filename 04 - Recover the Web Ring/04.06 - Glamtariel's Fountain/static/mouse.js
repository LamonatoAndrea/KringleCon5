// drag-drop related variables
var dragok = false;
var startX; // mouseX
var startY; // mouseY
var draggedImg = 'none'; // set which image was dragged
var droppedOn; // set what image was dropped on
var droppedOnP = false; // image dropped on princess
var droppedOnF = false; // image dropped on fountain

// Mouse event handler
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
canvas.onmousemove = myMove;

//Get Mouse Position
function getMyMouse(canvas, event) {
	var canvasRect = canvas.getBoundingClientRect();
	return {
		mousex: event.clientX - canvasRect.left,
		mousey: event.clientY - canvasRect.top
	}
}

// Mouse Down
function myDown(e) {

    // tell the browser this function is handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
	var mx = getMyMouse(canvas,e).mousex;
    var my = getMyMouse(canvas,e).mousey;

    // test each image to see if mouse is inside
    dragok = false;
    for (var i = 0; i < dimgs.length; i++) {
        var r = dimgs[i];
        if (mx > r.x && mx < r.x + r.width && my > r.y && my < r.y + r.height) {
            // break out if image shouldn't be draggable
			if (r.img.id === 'princess' || r.img.id === 'fountain') {
				break
				}
				else if (myVisit === "inline") {
					dragok = false;
					mouseMoving = 'no';
					break
				}
				else { 
				// if image is draggable set dragok=true, isDragging=true
				dragok = true;
            	r.isDragging = true;
				myName = r.img.id;
        	}
    	}
	}
    
	// save the current mouse position
    startX = mx;
    startY = my;
	if (myVisit === "inline") {
		dragok = false;
		mouseMoving = 'no';
	}
	else {
		mouseMoving = 'yes'
	}
}

// Mouse Up
function myUp(e) {  
    // tell the browser this function is handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // clear dragging flags
    dragok = false;
    for (var i = 0; i < dimgs.length; i++) {
        var r = dimgs[i];
		r.isDragging = false;
    }
	
	// Actions for dropped image
	if (draggedImg != "none") {
		// Check if on princess
		if (startX >= 0 && startX <= 155 && startY >= 0 && startY < 245) {
			droppedOnP = true; // dropped on princess
			droppedNearP = false; // reset the near flag for dropped on
			droppedOn = "princess"
		}

		// Check if on fountain
		if (startX >= 340 && startX <= 432 && startY >= 290 && startY < 490) {
			droppedOnF = true; // dropped on fountain
			droppedNearF = false; // reset the near flag for dropped on
			droppedOn = "fountain"
		}
		
		// Reset image coords so images will be redrawn in starting locations		
		for (var k = 0; k < dimgs.length; k++) {
			var r = dimgs[k];
			r.x = r.resetX;
			r.y = r.resetY;
			}	
		
		if (droppedOnP != true && droppedOnF != true)
			droppedOn = "none"
		
		// redraw scene with dropped image reset to starting position
		drop_ajax();
		mouseMoving = 'no'
		draw();
	}
		
	draggedImg = "none";
	droppedOn = "none";
	droppedOnF = false;
	droppedOnP = false;
}

// Mouse Moves
function myMove(e) {
    // if dragging anything...
    if (dragok) {

        // tell the browser the function is handling this mouse event
        e.preventDefault();
        e.stopPropagation();

        // get current mouse position
		var mx = getMyMouse(canvas,e).mousex;
		var my = getMyMouse(canvas,e).mousey;

        // distance mouse has moved since last mousemove
        var dx = mx - startX;
        var dy = my - startY;

        // move each image that isDragging by distance mouse has moved since last mousemove

		for (var i = 0; i < dimgs.length; i++) {
			var r = dimgs[i];
            if (r.isDragging) {
                r.x += dx;
                r.y += dy;
				draggedImg = r.img.id;
            }
        }

        // redraw new image positions
		if (myVisit === "inline") {
			dragok = false;
			mouseMoving = 'no';
		}
		else {
			poetic = "no";
			mouseMoving = 'yes'
		}
		draw();

        // reset mouse position for next mousemove
        startX = mx;
        startY = my;	
    }
}