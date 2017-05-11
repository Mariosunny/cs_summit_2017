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
	var sessionID = util.uuid();

	var ball = new Image();
	var cannonball = new Image();
	var cannon = new Image();
	
	ball.src = "/static/img/gravity/ball.png";
	cannonball.src = "/static/img/gravity/cannonball.png";
	cannon.src = "/static/img/gravity/cannon.png";

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

				if(new RegExp("plot\\(" + function_name + "\\)", 'g').test(rawInput)) {

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

	var ax = 3;
	var ay = 3;
	var x0 = 0;
	var y0 = 0;
	var vx0 = 5;
	var vy0 = 5;
	var t = 0;

	function draw() {
		var ctx = canvas.getContext('2d');

		ctx.globalCompositeOperation = 'destination-over';
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.drawImage(ball, x0 + vx0*t + 0.5*ax*Math.pow(t,2), canvas.height - (y0 + vy0*t + 0.5*ay*Math.pow(t,2)));

		t++;

		setTimeout(function() {window.requestAnimationFrame(draw)}, 100);
	}

	window.requestAnimationFrame(draw);
	currentStep = 0;
	getCurrentStep().load();
	timestamp = util.currentTime();
});