$(function() {

	var cvs = $("#canvas");
	var canvas = document.getElementById('canvas');
	canvas.width = document.body.clientWidth - 50;
	canvas.height = document.body.clientHeight + 500;

	cvs.bind('mousewheel DOMMouseScroll', function(event){

		event.preventDefault();

		if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
			
			if(zoom > 1/8) {
				
				zoom /= 1.8;
			}
		}
		else {

			if(zoom < 64) {

				zoom *= 1.8;
			}
		}
	});

	cvs.mousemove(function(event){

		mouse = [event.clientX, event.clientY];
	});

	var MAP_WIDTH = 60;
	var MAP_HEIGHT = 60;
	var TILE_LENGTH = 60;

	var GRASS_COLOR = "#00bb00";
	var GRASS_BORDER_COLOR = "#006600";

	var zoom = 0.25;
	var x = MAP_WIDTH/2;
	var y = MAP_HEIGHT/2;
	var mouse = [];

	function draw() {
		var ctx = canvas.getContext('2d');

		ctx.globalCompositeOperation = 'destination-over';
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		var adjustedTileLength = TILE_LENGTH/zoom;
		var tileOffsetX = Math.floor((x - canvas.width/2)/adjustedTileLength);
		var tileOffsetY = Math.floor((y - canvas.height/2)/adjustedTileLength);
		var offsetX = adjustedTileLength - x % adjustedTileLength;
		var offsetY = adjustedTileLength - y % adjustedTileLength;

		ctx.fillStyle = GRASS_COLOR;
		ctx.strokeStyle = GRASS_BORDER_COLOR;

		for(var tileY = 0; tileY < Math.ceil(canvas.height/adjustedTileLength) + 2; tileY++) {

			for(var tileX = 0; tileX < Math.ceil(canvas.width/adjustedTileLength) + 2; tileX++) {

				ctx.fillRect(tileX*adjustedTileLength - offsetX, tileY*adjustedTileLength - offsetY, adjustedTileLength, adjustedTileLength);
				ctx.beginPath();
				ctx.moveTo(tileX*adjustedTileLength - offsetX, tileY*adjustedTileLength - offsetY);
				ctx.lineTo(tileX*adjustedTileLength - offsetX + adjustedTileLength, tileY*adjustedTileLength - offsetY);
				ctx.lineTo(tileX*adjustedTileLength - offsetX + adjustedTileLength, tileY*adjustedTileLength - offsetY + adjustedTileLength);
				ctx.lineTo(tileX*adjustedTileLength - offsetX, tileY*adjustedTileLength - offsetY + adjustedTileLength);
				ctx.stroke();
			}
		}

		update();

		window.requestAnimationFrame(draw);
	}

	function update() {

		var distanceX = canvas.width/2 - mouse[0];
		var distanceY = canvas.height/2 - mouse[1];

		if(Math.abs(distanceX) > canvas.width/4) {

			x += distanceX/50;
		}

		if(Math.abs(distanceY) > canvas.height/4) {

			y += distanceY/50;
		}
		
	}

	window.requestAnimationFrame(draw);
});