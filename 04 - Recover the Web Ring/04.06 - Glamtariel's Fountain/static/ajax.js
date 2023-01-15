// Ajax request for dropped image
function drop_ajax() {
	var origToken = document.getElementById('csrf').content;
	var reqToken = document.getElementById("ticket").value;
	var origDomain = document.domain;
	var origCookie = "MiniLembanh=" + lunch + ";domain=" + origDomain;
	var req = new XMLHttpRequest();
	document.cookie = "MiniLembanh=" + document.getElementById("snack").value + "." + lunch.substring(37) + ";domain=" + origDomain;
		req.onreadystatechange = function() {
			if(this.readyState == 4) {
				resp=JSON.parse(this.responseText);
				const jStatus = req.status;
				const jContentType =req.getResponseHeader("Content-Type");
					if(((jStatus == 200) || (jStatus == 400)) && jContentType == 'application/json') { 
						jResponse();
					}
					else {
						textP = "Sorry, I didn\'t understand that.";
						textF = "Sorry, I didn\'t understand that.";
						princessBubble(ctx, textP, 12, "black", poetic);
						fountainBubble(ctx, textF, 12, "black", poetic);
					}
				//Reset ticket value in case it was altered
				document.getElementById("ticket").value = origToken;
				document.getElementById("ticket").innerHTML = origToken;
				//Reset cookie value in case it was altered
				document.cookie = origCookie
				document.getElementById("snack").value = lunch.substring(0,36);
				document.getElementById("snack").innerHTML = lunch.substring(0,36);
			}
		  	else {
				//No action for other readyState values
          	}
        }
        req.open('POST', '/dropped', true);
        req.setRequestHeader("Content-Type", "application/json");
		req.setRequestHeader('Accept', 'application/json');
		req.setRequestHeader("X-Grinchum", reqToken);
        req.send(JSON.stringify({imgDrop: draggedImg, who: droppedOn, reqType: 'json'}));
	} 