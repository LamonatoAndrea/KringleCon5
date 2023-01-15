//Handle Response from drop_ajax()
function jResponse() {
    var convResp = resp.appResp;
    var convWho = resp.droppedOn;
    var convVisit = resp.visit;
    var convArray = convResp.split("^");
    if((convWho == "princess") || (convWho == "fountain") || (convWho == "none")) {
        poetic = 'no';
    }
    else {
        poetic = 'yes';
    }
    textP = convArray[0];
    textF = convArray[1];
	princessBubble(ctx, textP, 12, "black", poetic);
	fountainBubble(ctx, textF, 12, "black", poetic);
	if (convVisit != 'none') {
        visitA = convVisit.split(",")
		document.querySelector('.visit').style.top = visitA[1];
		document.querySelector('.visit').style.left = visitA[2];
		document.getElementById('visit').src = visitA[0];
        document.getElementById("visit").style.display = "inline";
        myVisit = document.getElementById("visit").style.display;
    }
    //Force Reload of images.js
    var myV = (new Date()).getTime();
    var myScript = document.getElementsByTagName('script')[0];
    var newScript= document.createElement('script');
	if (firstdrop != 0) {
		document.getElementById("updated").remove('updated');
	}
    newScript.src = "/static/js/images-" + myV + ".js";
    myScript.appendChild(newScript);
	newScript.id = "updated";
	firstdrop = firstdrop + 1;
}