var fbr; // fountain speech bubble width
var fbb; // fountain speech bubble height

function fountainBubble(ctx, textF, fontSize, fontColor, poetic){
   
    /// Calculate bubble width and height from word length, adjust response text for bubble)
    var max_width  = 250;
    var fontSize   =  12;
    var linesF      =  new Array();
	var poeticTextF  =  new Array();
    var widthF      = 0, t, u;
    var resultF;
	var longestF;
    var color      = fontColor || "white";
    var bubbleTextF     = textF

    // Font and size is required for ctx.measureText()
    ctx.font       = fontSize + "px Arial";
    
    // Start calculation
	if (poetic == 'yes') {
		var widF = 0;
		poeticTextF = bubbleTextF.split('\n');
		poeticTextLenF = poeticTextF.length;
		linesF = poeticTextF;
		for (var o = 0; o < linesF.length; o++) {
				if (ctx.measureText(linesF[o]).width > widF) {
					widF = ctx.measureText(linesF[o]).width
					longestF = linesF[o]
					widthF = Math.max(widthF, ctx.measureText(longestF).width);
				}
			}
		} else {
    while ( bubbleTextF.length ) {
    	for( t=bubbleTextF.length; ctx.measureText(bubbleTextF.substr(0,t)).width > max_width; t-- );
        	resultF = bubbleTextF.substr(0,t);
        	if ( t !== bubbleTextF.length )
    		    for( u=0; resultF.indexOf(" ",u) !== -1; u=resultF.indexOf(" ",u)+1 );
    	    	linesF.push( resultF.substr(0, u|| resultF.length) );
    	        widthF = Math.max( widthF, ctx.measureText(linesF[ linesF.length-1 ]).width );
    	        bubbleTextF  = bubbleTextF.substr( linesF[ linesF.length-1 ].length, bubbleTextF.length );
		}
	}
    
    // Figure fountain bubble dimensions
    var twF = 14 + widthF;
	var thF =  8 + ( fontSize + 5 ) * linesF.length;
	var bxF = 530;
	var byF = 260;
	fbr = bxF + twF;
	fbb = byF + thF;
	bradius = 12;
	
   /// Draw Bubble
   ctx.beginPath();
   ctx.fillStyle = "#cfebfc";
   ctx.strokeStyle = "black";
   ctx.lineWidth = "2";
   ctx.moveTo(bxF + bradius, byF);
   ctx.lineTo(fbr - bradius, byF);
   ctx.quadraticCurveTo(fbr, byF, fbr, byF + bradius);
   ctx.lineTo(fbr, byF + thF-bradius);
   ctx.quadraticCurveTo(fbr, fbb, fbr - bradius, fbb);
   ctx.lineTo(bxF + bradius, fbb);
   ctx.quadraticCurveTo(bxF, fbb, bxF, fbb - bradius);
   ctx.lineTo(bxF, byF + bradius);
   ctx.quadraticCurveTo(bxF, byF, bxF + bradius, byF);
   ctx.fill();
   ctx.stroke();
   
   /// Write fountain response
   ctx.fillStyle = color;
	if (poetic == 'yes') {	
		var lineStartF = (byF - 10) + fontSize + (fontSize+5);
		var lineG = 15;
		for (var q = 0; q < poeticTextF.length; ++q) {
			ctx.fillText(poeticTextF[q], (bxF + 8), lineStartF + (q*lineG) );
		}
	} else {
		for ( b=0, c=linesF.length; b<c; ++b ) {
			ctx.fillText( linesF[b], (bxF + 8), (byF + 5) + fontSize + (fontSize+5) * b);
			};
		}
}