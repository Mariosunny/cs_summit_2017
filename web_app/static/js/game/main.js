$(function() {

	var util = app.util;
	var cvs = $("#canvas");
	var canvas = document.getElementById('canvas');
	canvas.width = document.body.clientWidth - 50;
	canvas.height = document.body.clientHeight;

	var MAP_WIDTH = 400;
	var MAP_HEIGHT = 400;
	var TILE_LENGTH = 60;
	var ZOOM_SPEED = 1.5;
	var BACKGROUND_COLOR = "black";

	var map = app.map.generateMap(MAP_WIDTH, MAP_HEIGHT);
	var blobs = [];

	var zoom = 1.0;
	var x = (MAP_WIDTH*TILE_LENGTH)/2;
	var y = (MAP_HEIGHT*TILE_LENGTH)/2;
	var mouse = [];

	cvs.bind('mousewheel DOMMouseScroll', function(event){

		event.preventDefault();

		if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
			
			if(zoom > 1/2) {
				
				zoom /= ZOOM_SPEED;
			}
		}
		else {

			if(zoom < 32) {

				zoom *= ZOOM_SPEED;
			}
		}
	});

	cvs.mousemove(function(event){

		mouse = [event.clientX, event.clientY];
	});

	function getAdjustedTileLength() {

		return TILE_LENGTH/zoom;
	}

	function draw() {
		var ctx = canvas.getContext('2d');

		ctx.globalCompositeOperation = 'destination-over';
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		var adjustedTileLength = getAdjustedTileLength();
		var tileOffsetX = Math.floor((x - canvas.width/2)/adjustedTileLength);
		var tileOffsetY = Math.floor((y - canvas.height/2)/adjustedTileLength);
		var offsetX = Math.floor(x - canvas.width/2) - tileOffsetX*adjustedTileLength;
		var offsetY = Math.floor(y - canvas.height/2) - tileOffsetY*adjustedTileLength;

		ctx.lineWidth = 1;
		ctx.strokeStyle = "black";

		for(var tileY = 0; tileY < Math.ceil(canvas.height/adjustedTileLength) + 2; tileY++) {

			for(var tileX = 0; tileX < Math.ceil(canvas.width/adjustedTileLength) + 2; tileX++) {

				if(tileY + tileOffsetY < 0 || tileY + tileOffsetY >= MAP_HEIGHT) {

					continue;
				}

				if(tileX + tileOffsetX < 0 || tileX + tileOffsetX >= MAP_WIDTH) {

					continue;
				}

				var tile = map[tileY + tileOffsetY][tileX + tileOffsetX];

				if(tile.hasContent()) {

					ctx.drawImage(tile.content.img, tileX*adjustedTileLength - offsetX + tile.offsetX, tileY*adjustedTileLength - offsetY + tile.offsetY, adjustedTileLength, adjustedTileLength);
				}

				ctx.drawImage(tile.type.img, tileX*adjustedTileLength - offsetX, tileY*adjustedTileLength - offsetY, adjustedTileLength, adjustedTileLength);

			}
		}

		ctx.fillStyle = BACKGROUND_COLOR;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		update();

		window.requestAnimationFrame(draw);
	}

	function update() {

		updateMousePosition();
		
	}

	function updateMousePosition() {

		var distanceX = canvas.width/2 - mouse[0];
		var distanceY = canvas.height/2 - mouse[1];
	
		if(Math.abs(distanceX) > canvas.width/4) {

			x -= distanceX/10;
		}

		if(Math.abs(distanceY) > canvas.height/4) {

			y -= distanceY/10;
			
		}
	}

	window.requestAnimationFrame(draw);
});