$(function() {

	var cvs = $("#canvas");
	var newline = "<br/>";
	var util = app.util;
	var sessionID = util.uuid();
	var numberOfCells = $("#number-of-cells");
	var velocity = $("#velocity");
	var cellColor = $("#cell-color");
	var initialRadius = $("#initial-radius");
	var widthModifier = $("#width-modifier");
	var heightModifier = $("#height-modifier");
	var sleep = $("#sleep");

	$("#reset").click(function() {

		numberOfCells.val('25');
		velocity.val('2');
		cellColor.val('red');
		initialRadius.val('5');
		widthModifier.val('1');
		heightModifier.val('1');
		sleep.val('50');
	});

	$("#restart").click(function() {

		blobs = {};
		generateBlobs();
		time = 0;
	});

	function isInteger(text) {

		return /\d+/.test(text);
	}

	function getWidthModifier() {

		var value = isInteger(widthModifier.val()) ? +widthModifier.val():1;

		return value > 1.0 ? value: 1.0;
	}

	function getHeightModifier() {

		var value = isInteger(heightModifier.val()) ? +heightModifier.val():1;

		return value > 1.0 ? value: 1.0;
	}

	function getInitialRadius() {

		return isInteger(initialRadius.val()) ? +initialRadius.val():5;
	}

	function getNumberOfCells() {

		return isInteger(numberOfCells.val()) ? +numberOfCells.val():25;
	}

	function getColor() {

		return cellColor.val();
	}

	function getVelocity() {

		return isInteger(velocity.val()) ? +velocity.val():1;
	}

	function getSleep() {

		return isInteger(sleep.val()) ? +sleep.val():50;
	}

	var canvas = document.getElementById('canvas');
	canvas.width = document.getElementById('canvas-container').clientWidth;
	canvas.height = document.getElementById('canvas-container').clientHeight;

	function setSelectionRange(input, selectionStart, selectionEnd) {

		if (input.setSelectionRange) {

			input.focus();
			input.setSelectionRange(selectionStart, selectionEnd);
		}
		else if (input.createTextRange) {

			var range = input.createTextRange();
			range.collapse(true);
			range.moveEnd('character', selectionEnd);
			range.moveStart('character', selectionStart);
			range.select();
		}
	}

	function setCaret(input, pos) {

		setSelectionRange(input, pos, pos);
	}

	var blobs = {};
	var time = 0;

	function Blob(id, team, x, y) {

		this.id = id;
		this.team = team;
		this.x = x;
		this.y = y;
		this.size = 1;
		this.event = null;
	}

	Blob.prototype.getRadius = function() {

		return Math.sqrt(this.size)*getInitialRadius();
	}

	Blob.prototype.remove = function() {

		delete blobs[this.id];
	}

	Blob.prototype.travel = function(angle) {

		var distance = getVelocity()*this.getSpeed()/(getSleep()/50);
		var newX = this.x + Math.cos(angle)*distance;
		var newY = this.y + Math.sin(angle)*distance;

		if(newX < 0 || newX > canvas.width || newY < 0 || newY > canvas.height) {

			distance = 0;
		}
		else {

			this.x = newX;
			this.y = newY;
		}

		return distance;
	};

	Blob.prototype.getSpeed = function() {

		return 1/Math.pow(this.size, 0.15);
	}

	Blob.prototype.getAllies = function() {

		var allies = [];

		$.each(blobs, function(id, otherBlob) {

			if(otherBlob.tribe == this.tribe && otherBlob.id != blob.id) {

				allies.push({
					blob: otherBlob,
					distance: Math.sqrt(Math.pow(this.x - otherBlob.x, 2) + Math.pow(this.y - otherBlob.y, 2))
				});
			}
		});

		return allies.sort(function(a, b) {

			return a.distance - b.distance;
		});
	}

	function Event() {

	}

	function Wander() {

		Event.call(this);
		this.angle = null;
		this.distanceToMove = null;
		this.distanceMoved = null;
		this.totalDistance = 0;
	}

	util.inherit(Event, Wander);

	Wander.prototype.newPath = function(blob) {

		if(!this.angle) {

			this.angle = Math.random()*2*Math.PI;
		}

		this.angle = this.angle - (Math.random()*2 - 1.0)*Math.PI/4;
		this.distanceToMove = Math.random()*100 + 10;
		this.distanceMoved = 0;
	};

	Wander.prototype.move = function(blob) {

		if(this.distanceToMove == null || this.distanceMoved > this.distanceToMove) {

			this.newPath(blob);
		}

		var distance = blob.getSpeed()*getVelocity();
		var newX = blob.x + Math.cos(this.angle)*distance;
		var newY = blob.y + Math.sin(this.angle)*distance;

		while(newX < 0 || newX > canvas.width || newY < 0 || newY > canvas.height) {

			this.newPath(blob);
			newX = blob.x + Math.cos(this.angle)*distance;
			newY = blob.y + Math.sin(this.angle)*distance;
		}

		distance = blob.travel(this.angle);
		this.distanceMoved += distance;
		this.totalDistance += distance;

		if(this.totalDistance >= 1000) {

			this.event = null;
		}
	};

	function draw() {

		var ctx = canvas.getContext('2d');

		ctx.globalCompositeOperation = 'destination-over';
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.strokeStyle = '#000000';

		$.each(blobs, function(id, blob) {

			ctx.fillStyle = 'red';
			ctx.fillStyle = getColor();
			ctx.lineWidth = (blob.size + 2)/8;
			ctx.beginPath();
			ctx.arc(blob.x, blob.y, blob.getRadius(), 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.stroke();
		});

		ctx.font = "30px Arial";
		ctx.fillText(Math.floor(time/30) + " Hours", 10, 50);

		update();
		time += 1*(50/getSleep());
		window.requestAnimationFrame(draw);
	}

	var events = [
		[1.0, function() { return new Wander();}],
	];

	function init() {

		generateBlobs();
	}

	function start() {

		window.requestAnimationFrame(draw);
	}

	function update() {

		$.each(blobs, function(id, blob) {

			if(blob.event == null) {

				blob.event = events[0][1]();
			}

			blob.event.move(blob);

			checkCollisions(blob);
		});
	}

	function checkCollisions(blob) {

		$.each(blobs, function(id, otherBlob) {

			if(otherBlob.id != blob.id) {

				if(Math.pow(blob.x - otherBlob.x, 2) + Math.pow(blob.y - otherBlob.y, 2) < Math.pow(blob.getRadius() + otherBlob.getRadius(), 2)) {

					var largestBlob = blob.size >= otherBlob.size ? blob:otherBlob;
					var smallestBlob = blob.size > otherBlob.size ? otherBlob:blob;

					if(blob.team == otherBlob.team) {

						var newSize = blob.size + otherBlob.size;
						var b = newBlob(blob.team, largestBlob.x, largestBlob.y);
						b.size = newSize;
						blob.remove();
						otherBlob.remove();
						return;
					}
					else {

						if(blob.size == otherBlob.size) {

							blob.remove();
							otherBlob.remove();
						}
						else {

							smallestBlob.remove();
						}

						return;
					}
				}
			}

		});
	}

	function generateBlobs() {

		for(var i = 0; i < getNumberOfCells(); i++) {

			var blob = newBlob(0, Math.random()*canvas.width/getWidthModifier(), Math.random()*canvas.height/getHeightModifier());
		}
	}

	function newBlob(team, x, y) {

		var id = Object.keys(blobs).length + "";
		var blob = new Blob(id, team, x, y);

		blobs[id] = blob;

		return blob;
	}

	init();
	start();
});