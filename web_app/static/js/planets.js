$(function() {

	var sun = new Image();
	var earth = new Image();
	var mars = new Image();
	earth.src = "/static/img/planets/earth.png";
	mars.src = "/static/img/planets/mars.png";
	sun.src = "/static/img/planets/sun.png";
	var code = $("#code");
	var instructions = $("#instructions");
	var restoreDefault = $("#restore-default");
	var next = $("#next");
	var newline = "<br/>";
	var steps = [];
	var currentStep;
	var timestamp;
	var util = app.util;

	var a, b, off, t;
	var validSimulation = false;

	var canvas = document.getElementById('canvas');
	canvas.width = document.getElementById('canvas-container').clientWidth;
	canvas.height = document.getElementById('canvas-container').clientHeight;

	code.keyup(function(event) {

		checkSimulation();

		var step = getCurrentStep();

		if(!step.isComplete && step.checkComplete(getInput())) {

			//util.postResults("authorship", util.currentTime() - timestamp, 1, currentStep - 1, sessionID, {"attempts": attempts.join("%")});
			step.isComplete = true;
			next.fadeIn(500);
		}
	});

	next.click(function(event) {

		if(getCurrentStep().isComplete) {

			nextStep();
		}
	});

	restoreDefault.click(function(event) {

		code.val("earth = new Image(\"earth.png\")\noff=20\na=200\nb=100\ntime=0\nwhile True:\nearth.draw(off+a*cos(time),b*sin(time))\ntime=time+1");
		off = 20; a = 200; b = 100; t = 1;
	});

	function getInput() {

		return code.val().replace(/ /g, "").split("\n");
	}

	function Step(instructions, checkComplete, init) {

		this.instructions = "";
		this.checkComplete = checkComplete;
		this.isComplete = false;
		this.init = init || function() {};

		for(var i = 0; i < instructions.length; i++) {

			this.instructions += instructions[i] + newline;
		}
	}

	Step.prototype.load = function() {

		code.focus();
		instructions.html(this.instructions);
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
		new Step(["Kepler's Laws of Planetary Motion</b> describe the motion of planets around the Sun. They state that:", "",
				"1. The orbit of a planet is elliptical in shape, with the Sun at one of the foci.",
				"2. The vector joining a planet to the Sun sweeps out equal areas in equal intervals of time.",
				"3. The square of the orbital period of a planet is proportional to the cube of the semi-major axis of its orbit.","",
				"In this exercise, you'll write a program that implements a simplified version of Kepler's Laws to simulate a planet moving around the Sun."],
			function(input) { return true; }
			),
		new Step(["First, we need to know how to create variables. <b>Variables</b> are used to store information in programs.","",
				"To declare a variable and assign a value to it, we use an assignment statement.","",
				"Type <code>x = 5</code> in the box above to create a variable named 'x' and assign it a value of 5."
				],
			function(input) {

				return input[0] == "x=5";
			}
			),
		new Step(["Variables can be named with more than one letter.",
				"Type <code>month = 10</code> in the box to the left to create a variable named 'month' and assign it a value of 10."
				],
			function(input) {

				return input[0] == "month=10";
			},
			function() {

				code.val('');
			}
			),	
		new Step(["Type <code>month = 5</code> <b>after the first line</b> to re-assign <code>month</code> to a value of 5.","",
				"Code is always executed from top to bottom, like reading a book."
				],
			function(input) {

				return input[0] == "month=10" && input[1] == "month=5";
			}
			),
		new Step(["Type <code>month = month + 10</code> to add 10 to <code>month</code>. Month will now be equal to 15."
				],
			function(input) {

				return input[0] == "month=10" &&
					input[1] == "month=5" &&
					input[2] == "month=month+10";
			}
			),		
		new Step(["The parametric equations for an ellipse are as follows:","",
				'<img src="https://latex.codecogs.com/png.latex?x(t)&space;=&space;x_{0}&space;&plus;&space;acos(t)"/>',
				'<img src="https://latex.codecogs.com/png.latex?y(t)&space;=&space;bcos(t)"/>',"",
				"Where",
				"<i>x0</i> = horizontal offset",
				"<i>a</i> = semi-major axis",
				"<i>b</i> = semi-minor axis",
				"<i>t</i> = time"
				],
			function(input) { return true; },
			function() {

				code.val('');
				this.isComplete = true;
			}
			),	
		new Step(["The variable <code>earth</code> holds our image of earth, which is a png file.","",
					"We'll need to create variables to store our input values, <i>x0</i>, <i>a</i>, and <i>b</i>.","",
					"Type <code>off = 20</code> after the first two lines to create a variable named <code>off</code> and assign it a value of 20."
				],
			function(input) {

				return input.includes('earth=newImage("earth.png")') &&
					input.includes('off=20');
			},
			function() {

				code.val('earth = new Image("earth.png")\n')
			}
			),	
		new Step(["After that, create a variable named <code>a</code> and assign it a value of 200.","",
				"<code>a</code> represents the length of the semi-major axis."
				],
			function(input) {

				return input.includes('earth=newImage("earth.png")') &&
					input.includes('off=20') &&
					input.includes("a=200");
			}
		),
		new Step(["Create a variable named <code>b</code> and assign it a value of 100.","",
				"<code>b</code> represents the length of the semi-minor axis."
				],
			function(input) {

				return input.includes('earth=newImage("earth.png")') &&
					input.includes('off=20') &&
					input.includes("a=200") &&
					input.includes("b=100");
			}
		),
		new Step(["Finally, create a variable named <code>time</code> and assign it a value of 0.","",
			"This variable will keep track of the running time of our simulation."
				],
			function(input) {

				return input.includes('earth=newImage("earth.png")') &&
					input.includes('off=20') &&
					input.includes("a=200") &&
					input.includes("b=100") &&
					input.includes("time=0");
			}
		),
		new Step(["Now, to the body of our program.","",
			"Since our simulation will be continuously running, we'll need to ensure that our calculations of the position of the planet and the drawing of the planet on the canvas are running an infinite loop.","",
			"To create an infinite loop, type <code>while True:</code>.","",
			"Anything typed after the while loop will execute continuously."
				],
			function(input) {

				return input.includes('earth=newImage("earth.png")') &&
					input.includes('off=20') &&
					input.includes("a=200") &&
					input.includes("b=100") &&
					input.includes("time=0") &&
					input.includes("whileTrue:");
			}
		),
		new Step(["Inside the while loop, we'll draw the image of the planet onto the canvas.","",
			"The function to draw the image onto the canvas takes two arguments: the x coordinate of the image, and the y coordinate of the image. Arguments are separated by commas <code>,</code>.","",
			"Type <code>earth.draw(off+a*cos(time), b*sin(time))</code>","",
			"The x and y coordinates are determined by the previously shown formulae:","",
			'<img src="https://latex.codecogs.com/png.latex?x(t)&space;=&space;x_{0}&space;&plus;&space;acos(t)"/>',
			'<img src="https://latex.codecogs.com/png.latex?y(t)&space;=&space;bcos(t)"/>'
				],
			function(input) {

				return input.includes('earth=newImage("earth.png")') &&
					input.includes('off=20') &&
					input.includes("a=200") &&
					input.includes("b=100") &&
					input.includes("time=0") &&
					input.includes("whileTrue:") &&
					input.includes("earth.draw(off+a*cos(time),b*sin(time))");
			}
		),
		new Step(["Finally, we need to increment our time variable, so that the position of the planet actually changes.","",
			"Type <code>time = time + 1</code>"
				],
			function(input) {

				return input.includes('earth=newImage("earth.png")') &&
					input.includes('off=20') &&
					input.includes("a=200") &&
					input.includes("b=100") &&
					input.includes("time=0") &&
					input.includes("whileTrue:") &&
					input.includes("earth.draw(off+a*cos(time),b*sin(time))") &&
					input.includes("time=time+1");
			}
		),
		new Step(["Try changing the values of <code>a</code>, <code>b</code>, and <code>off</code> to see how it affects the movement of the planet.",
				],
			function(input) {

				return true;
			},
			function() {

				restoreDefault.show();
			}
		),
		new Step(["In the last line, try changing the <code>1</code> to a higher value to see how it affects the movement of the planet.","",	
				"<b>Congratulations, you've completed this tutorial!</b>"
				],
			function(input) {

				return false;
			}
		),
	];

	steps[0].isComplete = true;

	function getCurrentStep() {

		return steps[currentStep];
	}

	function checkSimulation() {

		var rawInput = code.val().replace(/ /g, "");
		var input = getInput();

		if(input.includes('earth=newImage("earth.png")') &&
			input.includes("time=0") &&
			input.includes("whileTrue:") &&
			/off=\d+/.test(rawInput) &&
			/a=\d+/.test(rawInput) &&
			/b=\d+/.test(rawInput) &&
			/time=time\+\d+/.test(rawInput)) {

			a = +(/a=\d+/.exec(rawInput)[0].split("=")[1]);
			b = +(/b=\d+/.exec(rawInput)[0].split("=")[1]);
			off = +(/off=\d+/.exec(rawInput)[0].split("=")[1]);
			t = +(/time=time\+\d+/.exec(rawInput)[0].split("+")[1]);
			validSimulation = true;
		}
	}

	function draw() {
		var ctx = canvas.getContext('2d');

		ctx.globalCompositeOperation = 'destination-over';
		ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

		ctx.save();

		ctx.drawImage(sun, canvas.width / 2 - sun.width / 2, canvas.height / 2 - sun.height / 2);

		if(validSimulation) {
			
			var time = t*(+new Date())/1000.0;
			ctx.drawImage(earth, canvas.width / 2 - earth.width / 2 + off + a*Math.cos(time), canvas.height / 2 - earth.height / 2 + b*Math.sin(time));
		}

		window.requestAnimationFrame(draw);
	}

	window.requestAnimationFrame(draw);
	currentStep = 0;
	getCurrentStep().load();
	timestamp = util.currentTime();
});