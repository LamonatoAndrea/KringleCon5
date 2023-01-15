var br; // princess speech bubble width
var bb; // princess speech bubble height

function princessBubble(ctx, textP, fontSize, fontColor, poetic){
    
    /// Calculate bubble width and height from word length, adjust response text for bubble)
    var max_width  = 250;
    var fontSize   =  12;
    var lines      =  new Array();
	var poeticText      =  new Array();
    var width      = 0, r, s;
    var result;
	var longest;
    var color      = fontColor || "white";
    var bubbleText     = textP
	
    // Font and size is required for ctx.measureText()
    ctx.font       = fontSize + "px Arial";
    
    // Start calculation
	if (poetic == 'yes') {
		var wid = 0;
		poeticText = bubbleText.split('\n');
		poeticTextLen = poeticText.length;
		lines = poeticText;
		for (var f = 0; f < lines.length; f++) {
				if (ctx.measureText(lines[f]).width > wid) {
					wid = ctx.measureText(lines[f]).width
					longest = lines[f]
					width = Math.max(width, ctx.measureText(longest).width);
				}
			}
		} else {
			while ( bubbleText.length ) {
				for( r=bubbleText.length; ctx.measureText(bubbleText.substr(0,r)).width > max_width; r-- );
					result = bubbleText.substr(0,r);
					if ( r !== bubbleText.length )
						for( s=0; result.indexOf(" ",s) !== -1; s=result.indexOf(" ",s)+1 );
						lines.push( result.substr(0, s|| result.length) );
						width = Math.max( width, ctx.measureText(lines[ lines.length-1 ]).width );
						bubbleText  = bubbleText.substr( lines[ lines.length-1 ].length, bubbleText.length );
			}
		}

    // Figure princess bubble dimensions
    var tw = 14 + width;
	var th =  8 + ( fontSize + 5 ) * lines.length;
	var bx = 200;
	var by = 25;
	br = bx + tw;
	bb = by + th;
	bradius = 12;
	
   /// Draw Bubble
   ctx.beginPath();
   ctx.fillStyle = "#cfebfc";
   ctx.strokeStyle = "black";
   ctx.lineWidth = "2";
   ctx.moveTo(bx + bradius, by);
   ctx.lineTo(br - bradius, by);
   ctx.quadraticCurveTo(br, by, br, by + bradius);
   ctx.lineTo(br, by + th-bradius);
   ctx.quadraticCurveTo(br, bb, br - bradius, bb);
   ctx.lineTo(bx + bradius, bb);
   ctx.quadraticCurveTo(bx, bb, bx, bb - bradius);
   ctx.lineTo(bx, by + bradius);
   ctx.quadraticCurveTo(bx, by, bx + bradius, by);
   ctx.fill();
   ctx.stroke();
   
   /// Write princess response
    ctx.fillStyle = color;
	if (poetic == 'yes') {	
		var lineStart = (by - 10) + fontSize + (fontSize+5);
		var lineH = 15;
		for (var w = 0; w < poeticText.length; ++w) {
			ctx.fillText(poeticText[w], (bx + 8), lineStart + (w*lineH) );
		}
	} else {
		for ( d=0, q=lines.length; d<q; ++d ) {
			ctx.fillText( lines[d], (bx + 8), (by + 5) + fontSize + (fontSize+5) * d);
			};
		}
}