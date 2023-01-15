// Initial canvas related references
var canvas = document.getElementById("ftncanvas");
var ctx = canvas.getContext("2d");
var BB = canvas.getBoundingClientRect();
var offsetX = BB.left;
var offsetY = BB.top;
var WIDTH = canvas.width;
var HEIGHT = canvas.height;
var myName;
var poeticInit = true;
var fontSize   = 12;
var fontColor   = "black";
var mouseMoving = "no";

 // Set Initial Princess Dialogue
var textP = "Welcome to Glamtariel's Fountain! I see you have your entrance ticket so we've given you a snack, in case you get hungry. I can see there's a lot on your mind. Share these with us and enjoy your stay!";
 // Set Initial Fountain Dialogue
var textF = "I know there is something Glamtariel thinks about a lot but never discusses. Perhaps if you share things with her, she'd share with the both of us. I may be of some help also.";

// draw stuff
function draw() {
	// clear canvas
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	
	// Draw Images
    for (var k = 0; k < dimgs.length; k++) {
		var r = dimgs[k];
		ctx.drawImage(r.img, r.x, r.y, r.width, r.height);
    }
	
	// Prep Conversation Bubbles
	if (poeticInit) {
			poetic = false;
		}
	
	//Change Bubble Text if mouse moves
	if (mouseMoving == 'yes') {
		textP = "I wonder what's next. ";
		textF = "Me too! ";
		poetic = "no";
	}
	else {
	//Dont Change response bubble text
		textP = textP;
		textF = textF;
		poetic = poetic;
	}
	
	//Draw Conversation Bubbles
	princessBubble(ctx, textP, 12, "black", poetic);
	fountainBubble(ctx, textF, 12, "black", poetic);
	poeticInit = false;

	//Cancel AnimationFrame
	window.cancelAnimationFrame(draw);
}