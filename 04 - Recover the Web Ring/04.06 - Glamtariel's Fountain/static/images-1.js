// image array
	dimgs = [];
	var myImgNum = (new Date()).getTime();
	var lenP = 0;
	var lenF = 0;

// princess
	princessImg = new Image();
	princessImg.src = 'static/images/2022_glamtariel_2022.png';
	princessImg.setAttribute("name", "princess");
	princessImg.setAttribute("id", "princess");
	princessImg.setAttribute("draggable", false);
	princess = {
		img: princessImg,
		width: 200,
		height: 250,
		x: 0,
		y: 0,
		resetX: 0,
		resetY: 0,
		draggable: false,
		isDragging: false,
	}
	dimgs.push(princess);
	
// fountain
	fountainImg = new Image();
	fountainImg.src = 'static/images/2022_icefountain_2022.png';
	fountainImg.setAttribute("name", "fountain");
	fountainImg.setAttribute("id", "fountain");
	fountainImg.setAttribute("draggable", "false");
	fountain = {
		img: fountainImg,
		width: 250,
		height: 250,
		x: 260,
		y: 240,
		resetX: 260,
		resetY: 240,
		draggable: false,
		isDragging: false
	}
	dimgs.push(fountain);

// img1	
	img1Img = new Image();
	img1Img.src = 'static/images/img1-' + myImgNum + '.png';
	img1Img.setAttribute("name", "img1");
	img1Img.setAttribute("id", "img1");
	img1 = {
		img: img1Img,
		width: 50,
		height: 50,
		x: 725,
		y: 25,
		resetX: 725,
		resetY: 25,
		isDragging: false
	}
	dimgs.push(img1);

// img2
	img2Img = new Image();
	img2Img.src = 'static/images/img2-' + myImgNum + '.png';
	img2Img.setAttribute("name", "img2");
	img2Img.setAttribute("id", "img2");
	img2 = {
		img: img2Img,
		width: 50,
		height: 50,
		x: 650,
		y: 25,
		resetX: 650,
		resetY: 25,
		isDragging: false
	}
	dimgs.push(img2);

// img3
	img3Img = new Image();
	img3Img.src = 'static/images/img3-' + myImgNum + '.png';
	img3Img.setAttribute("name", "img3");
	img3Img.setAttribute("id", "img3");
	img3 = {
		img: img3Img,
		width: 50,
		height: 50,
		x: 725,
		y: 100,
		resetX: 725,
		resetY: 100,
		isDragging: false
	}
	dimgs.push(img3);

//img4
	img4Img = new Image();
	img4Img.src = 'static/images/img4-' + myImgNum + '.png';
	img4Img.setAttribute("name", "img4");
	img4Img.setAttribute("id", "img4");
	img4 = {
		img: img4Img,
		width: 50,
		height: 50,
		x: 650,
		y: 100,
		resetX: 650,
		resetY: 100,
		isDragging: false
	}
	dimgs.push(img4);