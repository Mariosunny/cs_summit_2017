$(function() {

	var code = $("#code");
	var instructions = $("#instructions");
	var cvs = $("#canvas");
	var next = $("#next");
	var textInput = $("#text-input");
	var newline = "<br/>";
	var steps = [];
	var currentStep;
	var timestamp;
	var util = app.util;
	var zoom = 30;
	var clicked;
	var sessionID = util.uuid();
	var city = new Image();
	city.src = "/static/img/shapes/city.png";

	var canvas = document.getElementById('canvas');
	canvas.width = document.getElementById('canvas-container').clientWidth - 30;
	canvas.height = document.getElementById('canvas-container').clientHeight - 20;

	cvs.on('mouseup', function(event) {

		var rect = canvas.getBoundingClientRect();

		clicked = [event.clientX - rect.left, event.clientY - rect.top];

		check();
	});

	code.keyup(function(event) {

		check();
	});

	textInput.keyup(function(event) {

		check();
	});

	function check() {

		var step = getCurrentStep();

		if(!step.isComplete && step.checkComplete(getInput())) {

			util.postResults("shapes", util.currentTime() - timestamp, 3, currentStep - 1, sessionID);
			step.isComplete = true;
			next.fadeIn(500);
		}		
	}

	next.click(function(event) {

		if(getCurrentStep().isComplete) {

			nextStep();
		}
	});

	function getInput() {

		return code.val().replace(/ /g, "").split("\n").clean('');
	}

	function getRawInput() {

		return code.val().replace(/\s+/g, "");
	}

	function Step(instructions, checkComplete, init, draw) {

		this.instructions = "";
		this.checkComplete = checkComplete;
		this.isComplete = false;
		this.init = init || function() {};
		this.draw = draw || function() {};

		for(var i = 0; i < instructions.length; i++) {

			this.instructions += instructions[i] + newline + newline;
		}
	}

	Step.prototype.load = function() {

		code.focus();
		instructions.hide();
		instructions.html(this.instructions);
		instructions.fadeIn(500);
		this.init();

		if(this.isComplete) {

			next.fadeIn(500);
		}
	};

	function nextStep() {

		currentStep++;
		next.hide();
		getCurrentStep().load();
		timestamp = util.currentTime();
	}

	var steps = [
		new Step(["Graphical programming involves the use of graphics to create a visual user interface. Graphics are used to develop websites, video games, and other software applications.",
			"In this exercise, you'll be working with an online <b>canvas</b> to draw shapes, lines, and other geometrical figures on the screen to the left."],
			function(input) { return true; },
			function() {

				this.isComplete = true;
			}
			),
		new Step(["Click anywhere on the panel to the left. A pair of coordinates will indicate the exact location where you clicked on the canvas."
			],
			function(input) { 

				if(clicked) {

					return true;
				} 

				return false;
			}
			),
		new Step(["Let's start by creating a simple rectangle.",
			"Type in <code>fillRect(200,150,50,70)</code> in the box above.",
			"This command will create a filled, black rectangle at (200,150), with a width of 50 and a height of 70."
			],
			function(input) { 

				return input[0] == "fillRect(200,150,50,70)";
			}
			),
		new Step(["You can change the color of the rectangle by setting the fill style.",
			"This must be done before the rectangle is drawn!",
			"Type <code>fillStyle=\"red\"</code> in a different line <i>before</i> you draw the rectangle."
			],
			function(input) { 

				return input[0] == "fillStyle=\"red\"" && 
					input[1] == "fillRect(200,150,50,70)";
			},
			function() {

				code.val("\nfillRect(200,150,50,70)");
				setCaret(code, 0);
			}
			),
		new Step(["Change the color of the rectangle to something other than red.",
			"Try any of these colors: orange, yellow, green, blue, purple, brown, grey, pink"
			],
			function(input) { 

				return /fillStyle="\w+"/.test(input[0]) && input[0] != "fillStyle=\"red\""
					input[1] == "fillRect(200,150,50,70)";
			}
			),
		new Step(["Change the dimensions of the rectangle so that the rectangle is four times as large.",
			"Remember: the last two numbers representate the width and height of the rectangle, respectively."
			],
			function(input) { 

				if(/fillStyle="\w+"/.test(input[0]) &&
					/fillRect\(200\,150\,\d+\,\d+\)/.test(input[1])) {

					var width = +(input[1].split(",")[2]);
					var height = input[1].split(",")[3];
					height = +height.substring(0,height.length-1);

					return width*height == 14000;
				}

				return false;
			}
			),
		new Step(["Create another rectangle of any size. Place it to the right of the original rectangle.",
			"Remember: the first two numbers representate the x and y coordinate of the rectangle, respectively.",
			"Remember: click on the canvas to display coordinates."
			],
			function(input) { 

				if(/fillStyle="\w+"/.test(input[0]) &&
					/fillRect\(200\,150\,\d+\,\d+\)/.test(input[1])) {

					var width1 = +(input[1].split(",")[2]);
					var height1 = input[1].split(",")[3];
					height1 = +height1.substring(0,height1.length-1);

					if(/fillRect\(\d+\,\d+\,\d+\,\d+\)/.test(input[3])) {

						var x = +(input[3].split(",")[0].match(/\d+/)[0]);

						return 200+width1 < x;
					}
				}

				return false;
			},
			function() {

				code.val(code.val() + "\nfillStyle = \"blue\"\n");
				setCaret(code, code.val().length);
			}
			),
		new Step(["Let's move on to drawing lines. Drawing a line is a multi-step process.",
			"First, you must declare that you are beginning a path. Type <code>beginPath()</code>."
			],
			function(input) { 

				return input[0] == "beginPath()";
			},
			function() {

				code.val('');
			}
			),
		new Step(["Next, we'll move our cursor to the first endpoint of the line.",
			"Type <code>moveTo(50,100)</code>, where 50 is the x coordinate of the endpoint, and 100 is the y coordinate."
			],
			function(input) { 

				return input[0] == "beginPath()" &&
						input[1] == "moveTo(50,100)";
			},
			function() {

				code.val(code.val() + "\n");
				setCaret(code, code.val().length);
			}
			),
		new Step(["Next, we'll draw a path from our first endpoint to our final endpoint.",
			"Type <code>lineTo(300,160)</code> to create a path to <i>(300,160)</i>."
			],
			function(input) { 

				return input[0] == "beginPath()" &&
						input[1] == "moveTo(50,100)" &&
						input[2] == "lineTo(300,160)";
			},
			function() {

				code.val(code.val() + "\n");
				setCaret(code, code.val().length);
			}
			),
		new Step(["Finally, we'll create our line.",
			"Type <code>stroke()</code> to fill in the path we just traced out."
			],
			function(input) { 

				return input[0] == "beginPath()" &&
						input[1] == "moveTo(50,100)" &&
						input[2] == "lineTo(300,160)" &&
						input[3] == "stroke()";
			},
			function() {

				code.val(code.val() + "\n");
				setCaret(code, code.val().length);
			}
			),
		new Step(["Using what you just learned, modify the code so that the line is drawn from one city to another.",
			"Hint: click on each city to determine its coordinates."
			],
			function(input) { 

				var rawInput = getRawInput();

				if(input.includes("beginPath()") && input.includes("stroke()")) {

					if(/moveTo\(\d+\,\d+\)/.test(rawInput) && /lineTo\(\d+\,\d+\)/.test(rawInput)) {

						var coords1 = rawInput.match(/moveTo\(\d+\,\d+\)/)[0].split(",");
						var x1 = +coords1[0].match(/\d+/)[0];
						var y1 = +coords1[1].match(/\d+/)[0];
						var coords2 = rawInput.match(/lineTo\(\d+\,\d+\)/)[0].split(",");
						var x2 = +coords2[0].match(/\d+/)[0];
						var y2 = +coords2[1].match(/\d+/)[0];

						return (20 < x1 && x1 < 20 + city.width &&
							200 < y1 && y1 < 200 + city.height &&
							400 < x2 && x2 < 400 + city.width &&
							300 < y2 && y2 < 300 + city.height) ||
							(20 < x2 && x2 < 20 + city.width &&
							200 < y2 && y2 < 200 + city.height &&
							400 < x1 && x1 < 400 + city.width &&
							300 < y1 && y1 < 300 + city.height)
					}
				}

				return false;
			},
			function() {

				code.val(code.val() + "\n");
				setCaret(code, code.val().length);
			},
			function(ctx) {

				ctx.drawImage(city, 20, 200);
				ctx.drawImage(city, 400, 300);
			}
			),
		new Step(["To draw text on the canvas, simply type <code>fillText(\"Hello world\",100,100)</code>.",
			"The first argument is the text, the second is the x coordinate, and the third is the y coordinate."
			],
			function(input) { 

				return input[0] == "fillText(\"Helloworld\",100,100)";
			},
			function() {

				code.val('');
			}
			),
		new Step(["You can set the font face and font size of the text before drawing it.",
			"Type in <code>font = \"50px Arial\"</code> before you draw the text to change the text to 50 pixel Arial font."
			],
			function(input) { 

				return input[1] == "fillText(\"Helloworld\",100,100)" &&
						input[0] == "font=\"50pxArial\"";
			},
			function() {

				code.val("\n" + code.val());
				setCaret(code,0);
			}
			),
		new Step(["Now let's draw a polygon.",
			"We start the same way as we did with drawing the line.",
			"Next, we'll move to our first vertex by typing in <code>moveTo(90,90)</code>",
			],
			function(input) { 

				return input[0] == "beginPath()" &&
						input[1] == "moveTo(90,90)";
			},
			function() {

				code.val("beginPath()\n");
				setCaret(code,code.val().length);
			}
			),
		new Step(["Now we'll define our second vertex by typing <code>lineTo(350, 70)</code>."
			],
			function(input) { 

				return input[0] == "beginPath()" &&
						input[1] == "moveTo(90,90)" &&
						input[2] == "lineTo(350,70)";
			},
			function() {

				code.val(code.val() + "\n");
				setCaret(code,code.val().length);
			}
			),
		new Step(["Add three more vertices using <code>lineTo</code>:",
			"(350,250)","(145,370)","(0,150)"
			],
			function(input) { 

				return input[0] == "beginPath()" &&
						input[1] == "moveTo(90,90)" &&
						input[2] == "lineTo(350,70)" &&
						input[3] == "lineTo(350,250)" &&
						input[4] == "lineTo(145,370)" &&
						input[5] == "lineTo(0,150)";
			},
			function() {

				code.val(code.val() + "\n");
				setCaret(code,code.val().length);
			}
			),
		new Step(["Next, we'll close the path to indicate we are done drawing the polygon.",
			"Type <code>closePath()</code>."
			],
			function(input) { 

				return input[0] == "beginPath()" &&
						input[1] == "moveTo(90,90)" &&
						input[2] == "lineTo(350,70)" &&
						input[3] == "lineTo(350,250)" &&
						input[4] == "lineTo(145,370)" &&
						input[5] == "lineTo(0,150)" &&
						input[6] == "closePath()";
			},
			function() {

				code.val(code.val() + "\n");
				setCaret(code,code.val().length);
			}
			),
		new Step(["Finally, we'll fill in the path we just traced using <code>fill()</code>."
			],
			function(input) { 

				return input[0] == "beginPath()" &&
						input[1] == "moveTo(90,90)" &&
						input[2] == "lineTo(350,70)" &&
						input[3] == "lineTo(350,250)" &&
						input[4] == "lineTo(145,370)" &&
						input[5] == "lineTo(0,150)" &&
						input[6] == "closePath()" &&
						input[7] == "fill()";
			},
			function() {

				code.val(code.val() + "\n");
				setCaret(code,code.val().length);
			}
			),
		new Step(["<b>Congratulations! You've completed this exercise.</b>"
			],
			function(input) { 

				return false;
			}
			)
	];

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

	function getCurrentStep() {

		return steps[currentStep];
	}

	function draw() {
		var ctx = canvas.getContext('2d');

		ctx.globalCompositeOperation = 'destination-over';
		ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
		ctx.font = "24px Arial";

		ctx.restore();

		if(clicked) {

			ctx.fillText("(" + Math.floor(clicked[0]) + "," + Math.floor(clicked[1]) + ")",10,50);
		}

		ctx.save();

		var lines = code.val().split("\n");

		for(var i = 0; i < lines.length; i++) {

			try {
				eval("ctx." + lines[i] + ";");
			}
			catch(e) {}
		}

		getCurrentStep().draw(ctx);

		window.requestAnimationFrame(draw);
	}

	window.requestAnimationFrame(draw);
	currentStep = 0;
	getCurrentStep().load();
	timestamp = util.currentTime();
});