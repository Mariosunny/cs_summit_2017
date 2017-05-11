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
	var sessionID = util.uuid();

	var functions = {};
	var function_bodies = {};
	var colors = [
		"#0000cc",
		"#ff6600",
		"#009900",
		"#993399",
		"#99cc00",
		"#cc0066",
		"#000066",
		"#993300"
	];

	var function_regex = /function +[\w_]+ ?\( ?x ?\) ?\{\s*return +.*\s?\}/g;
	var function_return_regex = /return +.*\s?\}/g;
	var function_header_regex = /function +[\w_]+/g;

	var canvas = document.getElementById('canvas');
	canvas.width = document.getElementById('canvas-container').clientWidth - 30;
	canvas.height = document.getElementById('canvas-container').clientHeight - 20;

	code.keyup(function(event) {

		parseCode();
		keyTyped();
	});

	textInput.keyup(function(event) {

		keyTyped();
	});

	function keyTyped() {

		var step = getCurrentStep();

		if(!step.isComplete && step.checkComplete(getInput())) {

			util.postResults("graph", util.currentTime() - timestamp, 2, currentStep - 1, sessionID);
			step.isComplete = true;
			next.fadeIn(500);
		}		
	}

	next.click(function(event) {

		if(getCurrentStep().isComplete) {

			nextStep();
		}
	});

	cvs.bind('mousewheel DOMMouseScroll', function(event){

		event.preventDefault();

		if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
			
			if(zoom < 200) {
				
				zoom*=1.5;
			}
		}
		else {

			if(zoom > 5) {

				zoom/=1.5;
			}
		}
	});

	function parseCode() {

		var match;
		var rawInput = code.val();
		var input = getInput();

		functions = {};

		while((match = function_regex.exec(rawInput)) !== null) {

			try {

				var expression = function_return_regex.exec(match[0])[0].replace(/\s+/g, "").substring("return".length);
				function_return_regex.lastIndex = 0;
				expression = expression.substring(0, expression.length - 1);
				var func = math.parse(expression).compile();

				var function_name = function_header_regex.exec(match[0])[0].replace(/ /g, "").substring("function".length);
				function_header_regex.lastIndex = 0;

				if(new RegExp("plot ?\\(" + function_name + "\\)", 'g').test(rawInput)) {

					functions[function_name] = func;
					function_bodies[function_name] = expression;
				}
			}
			catch(e) {}
		}

		function_regex.lastIndex = 0;
	}

	function getInput() {

		return code.val().replace(/ /g, "").split("\n").clean('');
	}

	function getRawInput() {

		return code.val().replace(/\s+/g, "");
	}

	function Step(instructions, checkComplete, init) {

		this.instructions = "";
		this.checkComplete = checkComplete;
		this.isComplete = false;
		this.init = init || function() {};

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
		new Step(["In Mathematics, a <b>function</b> describes a relationship between a set of inputs <i>x</i> and a set of outputs <i>f(x)</i>.",
			"Ex. <i>f(x) = x * 2</i> doubles the input. <i>2</i> -> <i>4</i> and <i>10</i> -> <i>20</i>.",
			"In Programming, functions operate much the same that they do in Mathematics. Each function takes some input values, and produces a single output value.",
			"In this exercise, you'll implement some mathematical functions as programming functions, plotting them on the graph to the left."],
			function(input) { return true; },
			function() {

				this.isComplete = true;
			}
			),
		new Step(["Let's start by plotting the function <i>f(x) = x + 2</i> on the graph.",
				"In order to do this, we must declare a function in our code.",
				"Type <code>function</code> in the box above to declare a new function."
				],
			function(input) {

				return input[0] == "function";
			}
			),
		new Step(["We need to give our function a name so that we can reference it later.",
				"On the same line, type <code>f</code> after <code>function</code> to name your function."
				],
			function(input) {

				return code.val().includes("function f");
			},
			function() {

				code.val(code.val() + " ");
				setCaret(code.val().length);
			}
			),	
		new Step(["Now we need to define the <b>parameters</b> of the function. Our parameters are all of our indepedent variables. Since we are only working with one indepedent variable, we will have only one parameter. Let's call it <i>x</i>.",
				"On the same line, type <code>(x)</code> after <code>f</code> to declare a parameter <code>x</code>."
				],
			function(input) {

				return input[0] == "functionf(x)";
			}
			),
		new Step(["We're ready to define our function body. In programming, we use a set of braces <code>{}</code> to define our function body.",
			"On the same line, place a pair of braces <code>{}</code> after your parameters."
				],
			function(input) {

				return input[0] == "functionf(x){}";
			}
			),		
		new Step(["Inside our function body, we'll put the function itself.",
			"In programming, we 'return' the result of a function using the <code>return</code> statement.",
			"Anything after the <code>return</code> statement will be evaluated and returned whenever we execute the function.",
			"<i>Within the braces</i>, type <code>return x * 2</code>"
				],
			function(input) {

				return getRawInput() == "functionf(x){returnx*2}";
			},
			function() {

				code.val("function f(x) {\n\n}");
				setCaret(document.getElementById("code"), "function f(x) {\n\n}".length - 2);
			}
			),	
		new Step(["Finally, we're ready to plot the function.",
			"<i>After the braces</i>, type <code>plot(f)</code>. This will tell our program to plot the function named <code>f</code> on the graph to the left."
				],
			function(input) {

				return getRawInput() == "functionf(x){returnx*2}plot(f)";
			},
			function() {

				code.val("function f(x) {\nreturn x * 2\n}\n");
				setCaret(document.getElementById("code"), "function f(x) {\nreturn x * 2\n}\n".length);
			}
			),	
		new Step(["Use the scroll wheel to zoom in and out of the graph while hovered over the graph.",
			"Change the function in the code to plot the function:", 
			"<i>f(x) = x + 3</i>",
				],
			function(input) {

				return getRawInput() == "functionf(x){returnx+3}plot(f)";
			}
			),	
		new Step(["Change the function in the code to plot the following function:",
				'<img src="http://latex.codecogs.com/gif.latex?&space;f(x)&space;=&space;2x^{2}-5x&plus;6" title="\huge f(x) = 2x^{2}-5x+6" />',
				"Hint: Use the carot <code>^</code> for exponentiation."
				],
			function(input) {

				if(Object.keys(functions).length >= 1) {

					var correct = math.parse("2x^2-5x+6").compile();
					var attempt = functions[Object.keys(functions)[0]];

					for(var i = -5; i < 5; i++) {

						if(correct.eval({x:i}) != attempt.eval({x:i})) {

							return false;
						}
					}

					return true;
				}

				return false;
			}
			),
		new Step(["Plot functions <code>f</code> and <code>g</code> on the graph."
				],
			function(input) {

				return /functionf\(x\)\{returnx\}functiong\(x\)\{return\(x-2\)\^2\}(plot\(f\)plot\(g\))|plot\(g\)plot\(f\)/.test(getRawInput());
			},
			function() {

				code.val("function f(x) {\nreturn x\n}\n\nfunction g(x) {\nreturn (x-2)^2\n}\n");
				setCaret(document.getElementById("code"), "function f(x) {\nreturn x\n}\n\nfunction g(x) {\nreturn (x-2)^2\n}\n".length);
				parseCode();
			}
			),	
		new Step(["Looking at the graph, what is the y-intercept of <i>g(x)</i>?"
				],
			function(input) {

				var answer = textInput.val().replace(/\s+/g,'');

				return ["(0,4)", "0,4", "4"].includes(answer);
			},
			function() {

				textInput.val('');
				textInput.show();
				textInput.focus();
				textInput.attr('placeholder', 'ex. (3,5)');
			}
			),
		new Step(["How many times do <i>f(x)</i> and <i>g(x)</i> intersect?"
				],
			function(input) {

				var answer = textInput.val().replace(/\s+/g,'');

				return ["2"].includes(answer);
			},
			function() {

				textInput.val('');
				textInput.focus();
				textInput.attr('placeholder', 'ex. 1');
			}
			),
		new Step(["What is the area of the region enclosed by the following functions?",
				'<img src="http://latex.codecogs.com/gif.latex?f(x)=sqrt(25-x^2)" title="\huge f(x)=x-2" />',
				'<img src="http://latex.codecogs.com/gif.latex?g(x)=-sqrt(25-x^2)" title="\huge g(x)=x" />',
				],
			function(input) {

				var answer = textInput.val().replace(/\s+/g,'');

				try {

					answer = +answer;

					return 75.0 < answer && answer < 80.0;
				}
				catch(e) {}

				return false;
			},
			function() {

				textInput.val('');
				code.val("function f(x) {\n\n}");
				code.focus();
				parseCode();
				setCaret(document.getElementById("code"), "function f(x) {\n".length);
			}
			),

		new Step(["<b>Congratulations! You've completed this exercise.</b>",
			"Feel free to play around with the code."
				],
			function(input) {

				return false;
			},
			function() {

				textInput.val('');
				textInput.hide();
			}
			),
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

	var origin = [canvas.width/2, canvas.height/2];

	var axisWidth = 2;
	var axisColor = "#ff0000";

	var linesColor = "#999999";
	var linesWidth = 1;

	var a = function(x) {
		return Math.pow(x, 4);
	};

	var b = function(x) {
		return Math.pow(x, 3);
	};

	var c = function(x) {
		return Math.pow(x, 2);
	};

	function draw() {
		var ctx = canvas.getContext('2d');

		ctx.globalCompositeOperation = 'destination-over';
		ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

		ctx.save();

		ctx.lineWidth=linesWidth;
		ctx.strokeStyle=linesColor;
		ctx.font = "20px Arial";

		for(var i = 1; i*zoom < (canvas.width-origin[0]); i++) {

			ctx.beginPath();
			ctx.moveTo(origin[0] + i*zoom, 0);
			ctx.lineTo(origin[0] + i*zoom, canvas.height);
			ctx.stroke();
		}

		for(var i = 1; i*zoom < origin[0]; i++) {

			ctx.beginPath();
			ctx.moveTo(origin[0] - i*zoom, 0);
			ctx.lineTo(origin[0] - i*zoom, canvas.height);
			ctx.stroke();
		}

		for(var i = 1; i*zoom < (canvas.height-origin[1]); i++) {

			ctx.beginPath();
			ctx.moveTo(0, origin[1] + i*zoom);
			ctx.lineTo(canvas.width, origin[1] + i*zoom);
			ctx.stroke();
		}

		for(var i = 1; i*zoom < origin[1]; i++) {

			ctx.beginPath();
			ctx.moveTo(0, origin[1] - i*zoom);
			ctx.lineTo(canvas.width, origin[1] - i*zoom);
			ctx.stroke();
		}


		ctx.lineWidth=axisWidth;
		ctx.strokeStyle=axisColor;

		ctx.beginPath();
		ctx.moveTo(0, origin[1]);
		ctx.lineTo(canvas.width, origin[1]);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(origin[0], 0);
		ctx.lineTo(origin[0], canvas.width);
		ctx.stroke();

		var iterations = 100/zoom;
		var j = 0;

		for (var func in functions) {

			if (functions.hasOwnProperty(func)) {

				var color = colors[j%colors.length];

				ctx.fillStyle = color;

				for(var i = -(canvas.width/2)*iterations; i < (canvas.width/2)*iterations; i++) {

					try { 

						var y = functions[func].eval({x: i/(zoom*iterations)});
						ctx.fillRect(origin[0] + (i/iterations) - 2, origin[1] - zoom*y - 2, 5, 5);
					}
					catch(e) {}
				}

				ctx.fillText(func + " = " + function_bodies[func],10,j*30 + 30);
				j++;
			}
		}

		window.requestAnimationFrame(draw);
	}

	window.requestAnimationFrame(draw);
	currentStep = 0;
	getCurrentStep().load();
	timestamp = util.currentTime();
});