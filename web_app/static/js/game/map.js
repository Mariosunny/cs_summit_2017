(function() {

	var grassType = new TileType("/static/img/game/grass.png");
	var waterType = new TileType("/static/img/game/water.png");

	function Block(src) {

		this.img = new Image();
		this.img.src = src;
	}

	var tree = new Block("/static/img/game/tree.png");
	var ironOre = new Block("/static/img/game/iron_ore.png");

	function Tile(type, content) {

		this.type = type;
		this.content = content || null;
	}

	Tile.prototype.hasContent = function() {

		return this.content != null;
	}

	function TileType(src) {

		this.img = new Image();
		this.img.src = src;
	}

	function generateMap(width, height) {

		var map = [];

		noise.seed(Math.random());

		for(var y = 0; y < height; y++) {

			var row = [];

			for(var x = 0; x < width; x++) {

				var tile;

				if(Math.abs(noise.simplex2(x/40,y/40)) > 0.7 || Math.abs(noise.simplex2((x+10)/150,(y-10)/150)) < 0.15 || Math.abs(noise.simplex2(x/40,y/40)) < 0.25 && Math.abs(noise.simplex2((x-10)/50,(y+10)/50)) > 0.75) {

					tile = new Tile(waterType);
				}
				else {

					tileType = grassType;
					var content = undefined;

					if(Math.abs(noise.simplex2((x+20)/50,(y+20)/50)) > 0.65) {

						content = tree;
					}
					else if(Math.abs(noise.simplex2((x+150)/90,(y+90)/150)) > 0.90) {

						content = ironOre;
					}

					tile = new Tile(grassType, content);
				}

				row.push(tile);
			}

			map.push(row);
		}

		return map;
	}

	app.map = {
		generateMap: generateMap
	};

}());