$(function() {

	var code = $("#code");
	var instructions = $("#instructions");
	var cvs = $("#canvas");
	var next = $("#next");
	var speed = $("#speed");
	var reset = $("#reset");
	var play = $("#play");
	var textInput = $("#text-input");
	var newline = "<br/>";
	var steps = [];
	var currentStep;
	var timestamp;
	var util = app.util;
	var sessionID = util.uuid();
	var base_clef = new Image();
	var sharp = new Image();
	var flat = new Image();
	var hasPlayed = false;
	var isPlaying = false;
	var durations = {
		"1":1.0, 
		"1/2":0.5, 
		"1/4":0.25, 
		"1/8":0.125, 
		"1/16":0.0625
	};
	var pitches = {
		"c#4": new Pitch(12, 554.37, true),
		"c4": new Pitch(12, 523.25),
		"b3": new Pitch(11, 493.88),
		"bb3": new Pitch(11, 466.16, false, true),
		"a#3": new Pitch(10, 466.16, true),
		"a3": new Pitch(10, 440.00),
		"ab3": new Pitch(10, 415.30, false, true),
		"g#3": new Pitch(9, 415.30, true),
		"g3": new Pitch(9, 392.00),
		"gb3": new Pitch(9, 369.99, false, true),
		"f#3": new Pitch(8, 369.99, true),
		"f3": new Pitch(8, 349.23),
		"e3": new Pitch(7, 329.63),
		"eb3": new Pitch(7, 311.13, false, true),
		"d#3": new Pitch(6, 311.13, true),
		"d3": new Pitch(6, 293.66),
		"db3": new Pitch(6, 277.18, false, true),
		"c#3": new Pitch(5, 277.18, true),
		"c3": new Pitch(5, 	261.63),
		"b2": new Pitch(4, 246.94),
		"bb2": new Pitch(4, 233.08, false, true),
		"a#2": new Pitch(3, 233.08, true),
		"a2": new Pitch(3, 220.00),
		"ab2": new Pitch(3, 207.65, false, true),
		"g#2": new Pitch(2, 207.65, true),
		"g2": new Pitch(2, 196.00),
		"gb2": new Pitch(2, 185.00, false, true),
		"f#2": new Pitch(1, 185.00, true),
		"f2": new Pitch(1, 174.61),
		"e2": new Pitch(0, 164.81),
		"eb2": new Pitch(0, 155.56, false, true)
	};
	var noteImages = {
		"1": {
			src: new Image(),
			x: 0,
			y: 0
		},
		"1/2": {
			src: new Image(),
			x: 0,
			y: 49
		},
		"1/4": {
			src: new Image(),
			x: 0,
			y: 50
		},
		"1/8": {
			src: new Image(),
			x: 0,
			y: 50
		},
		"1/16": {
			src: new Image(),
			x: 0,
			y: 50
		}
	};
	noteImages["1"].src.src = "/static/img/music/whole_note.png";
	noteImages["1/2"].src.src = "/static/img/music/half_note.png";
	noteImages["1/4"].src.src = "/static/img/music/quarter_note.png";
	noteImages["1/8"].src.src = "/static/img/music/eighth_note.png";
	noteImages["1/16"].src.src = "/static/img/music/sixteenth_note.png";
	base_clef.src = "/static/img/music/base_clef.png";
	sharp.src = "/static/img/music/sharp.png";
	flat.src = "/static/img/music/flat.png";
	var notes = [];

	function Note(text, pitch, duration, img) {

		this.text = text;
		this.pitch = pitch;
		this.duration = duration;
		this.img = img;
	}

	function Pitch(position, frequency, hasSharp, hasFlat) {

		this.hasSharp = hasSharp || false;
		this.hasFlat = hasFlat || false;
		this.position = position;
		this.frequency = frequency;
	}

	Note.prototype.getImage = function() {

		return noteImages[this.duration];
	}

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

			util.postResults("music", util.currentTime() - timestamp, 5, currentStep - 1, sessionID);
			step.isComplete = true;
			next.fadeIn(500);
		}		
	}

	next.click(function(event) {

		if(getCurrentStep().isComplete) {

			nextStep();
		}
	});

	reset.click(function(event) {

		getCurrentStep().undo();
	});

	play.click(function(event) {

		playNotes();
	});

	function sleep(time) {

		return new Promise(resolve => setTimeout(resolve, time));
	}

	async function playNotes() {

		if(isPlaying) {

			return;
		}

		var pace;

		if(/\d+/.test(speed.val())) {

			pace = Math.floor(1000/(+speed.val()/100.0));
		}
		else {

			pace = 1000;
		}

		var oscillator, context, note, gainNode;

		context = new AudioContext();

		if(notes.length > 0) {

			hasPlayed = true;
		}

		isPlaying = true;

		for(var i = 0; i < notes.length; i++) {

			if(i > 0) {

				oscillator.stop(0);
			}

			note = notes[i];
			oscillator = context.createOscillator();
			oscillator.frequency.value = note.pitch.frequency;
			gainNode = context.createGain();
			oscillator.connect(gainNode);
			oscillator.connect(context.destination);
			oscillator.start();
			await sleep(Math.floor(note.duration*pace));
		}

		oscillator.stop(0);
		context.close();
		isPlaying = false;
		keyTyped();
	}

	cvs.bind('mousewheel DOMMouseScroll', function(event){

		event.preventDefault();
	});

	function parseCode() {

		var match;
		var pitch;
		var duration;
		var line;
		var input = getInput();
		notes = [];

		for(var i = 0; i < input.length; i++) {

			line = input[i];

			if(/play\("[a-gA-G][#b]?\d"\,\d(\/\d+)?\)/.test(line)) {

				pitch = (line.match(/[a-gA-G][#b]?\d/)[0]).toLowerCase();

				if(pitch in pitches) {

					duration = line.match(/\d(\/\d+)?\)/)[0];
					duration = duration.substring(0, duration.length - 1);

					if(duration in durations) {

						notes.push(new Note(pitch, pitches[pitch], durations[duration], noteImages[duration]));
					}
				}
			}
		}
	}

	function getInput() {

		return code.val().replace(/ /g, "").split("\n").clean('');
	}

	function getRawInput() {

		return code.val().replace(/\s+/g, "");
	}

	function Step(instructions, checkComplete, init, reset) {

		this.instructions = "";
		this.checkComplete = checkComplete;
		this.isComplete = false;
		this.init = init || function() {};
		this.reset = reset || function() {};

		for(var i = 0; i < instructions.length; i++) {

			this.instructions += instructions[i] + newline + newline;
		}
	}

	Step.prototype.undo = function() {

		this.reset();
		parseCode();
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
		hasPlayed = false;
	}

	var steps = [
		new Step(["Programs can be developed to produce sound at particular frequencies. By playing a sequence of sounds, one can compose a song electronically.",
			"Musicians use Music Notation Software, such as Sibelius or Finale, to test our their music before it is published.",
			"In this exercise, you will compose a set of simple songs using programming."],
			function(input) { return true; },
			function() {

				this.isComplete = true;
			}
			),
		new Step(["Let's start off by composing a single note.", "In the box to the right, type <code>play(\"C3\",1)</code>. This will place a C whole note on the staff.",
			"After you are done typing, click the blue 'Play' button to the right to hear the note played."],
			function() {

				if(notes.length == 1) {

					var note = notes[0];

					return note.text == "c3" && note.duration == 1.0 && hasPlayed;
				}

				return false;
			}
			),
		new Step(["Let's change the pitch of the note.",
			"Change the note from <code>C3</code> to another note. See <b>Notes</b> for a complete list of notes.",
			"After you are done, play the note."],
			function() {

				if(notes.length == 1) {

					var note = notes[0];

					return note.text != "c3" && note.duration == 1.0 && hasPlayed;
				}

				return false;
			},
			function() {

				reset.show();
			},
			function() {

				code.val("play(\"C3\",1)");
			}
			),
		new Step(["Now, let's change the duration of the note from a whole note to something smaller.",
			"Change the duration of the note from <code>1</code> to <code>1/2</code> (half note), <code>1/4</code> (quarter note), <code>1/8</code> (eighth note), or <code>1/16</code> (sixteenth note).",
			"After you are done, play the note."],
			function() {

				if(notes.length == 1) {

					var note = notes[0];

					return note.duration != 1.0 && hasPlayed;
				}

				return false;
			},
			null,
			function() {

				code.val("play(\"C3\",1)");
			}
			),
		new Step(["On a new line, add another note after the first note. Choose any pitch and duration you wish.",
			"Notice: Notes are always played from top to bottom."],
			function() {

				return notes.length >= 2;
			},
			function() {

				code.val(code.val() + "\nplay(");
				setCaret(code, code.val().length);
				reset.hide();
			}
			),
		new Step(["Change the <b>speed</b> of the song (located below the <b>Play</b> button) to something other than 100. Play the song to hear the change."],
			function() {

				var pace;

				if(/\d+/.test(speed.val())) {

					pace = Math.floor(1000/(+speed.val()/100.0));
				}
				else {

					return false;
				}

				return pace != 1000 && hasPlayed;
			}
			),
		new Step(["Now you know all the basics to compose your own song.",
				"Compose and play a song that is at least 2 seconds in length and contains at least 3 notes, using any notes you wish.",
				"Remember: <code>play(\"C3\",1/4)</code> plays a C3 quarter note."],
			function() {

				if(notes.length >= 3) {

					var sum = 0;

					for(var i = 0; i < notes.length; i++) {

						sum += notes[i].duration;
					}

					return sum >= 2.0 && hasPlayed;
				}

				return false;
			},
			function() {

				code.val('');
				speed.val('100')
			}
			),
		new Step(["A note is missing from this scale. Type in the missing note so that the scale is a complete 8 notes."],
			function() {

				if(notes.length == 8) {

					return notes[0].text == "c3" &&
							notes[1].text == "d3" &&
							notes[2].text == "e3" &&
							notes[3].text == "f3" &&
							notes[4].text == "g3" &&
							notes[5].text == "a3" &&
							notes[6].text == "b3" &&
							notes[7].text == "c4";
				}

				return false;
			},
			function() {

				this.reset();
				reset.show();
				parseCode();
			},
			function() {

				code.val('play(\"C3\",1/2)\nplay(\"D3\",1/2)\nplay(\"F3\",1/2)\nplay(\"G3\",1/2)\nplay(\"A3\",1/2)\nplay(\"B3\",1/2)\nplay(\"C4\",1/2)');
				speed.val('100');
			}
			),
		new Step(["A note is missing from this scale. Type in the missing note so that the scale is a complete 8 notes."],
			function() {

				if(notes.length == 8) {

					return notes[0].text == "g2" &&
							notes[1].text == "a2" &&
							notes[2].text == "bb2" &&
							notes[3].text == "c3" &&
							notes[4].text == "d3" &&
							notes[5].text == "eb3" &&
							notes[6].text == "f3" &&
							notes[7].text == "g3";
				}

				return false;
			},
			function() {

				this.reset();
				parseCode();
			},
			function() {

				code.val('play(\"G2\",1/2)\nplay(\"A2\",1/2)\nplay(\"Bb2\",1/2)\nplay(\"C3\",1/2)\nplay(\"D3\",1/2)\nplay(\"F3\",1/2)\nplay(\"G3\",1/2)');
				speed.val('100');
			}
			),
		new Step(["What is the name of this popular tune?"],
			function() {

				var answer = textInput.val().toLowerCase().replace(/\s*/, '');

				return ["twinkle", "little","star","how","wonder", "world", "diamond", "macdonald", "mcdonald", "farm", "old"].includes(answer);
			},
			function() {

				textInput.show();
				textInput.focus();
				this.reset();
				parseCode();
			},
			function() {

				code.val('play(\"C3\",1/4)\nplay(\"C3\",1/4)\nplay(\"G3\",1/4)\nplay(\"G3\",1/4)\nplay(\"A3\",1/4)\nplay(\"A3\",1/4)\nplay(\"G3\",1/2)\nplay(\"F3\",1/4)\nplay(\"F3\",1/4)\nplay(\"E3\",1/4)\nplay(\"E3\",1/4)\nplay(\"D3\",1/4)\nplay(\"D3\",1/4)\nplay(\"C3\",1/2)');
				speed.val('100');
			}
			),
		new Step(["<b>Congratulations! You have completed this exercise.</b>", "Feel free to play around with the notes."],
			function() {

				return false;
			},
			function() {

				textInput.hide();
				reset.hide();
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

	var notesPerRow = Math.floor((canvas.width - 80)/60);

	function draw() {
		var ctx = canvas.getContext('2d');

		ctx.globalCompositeOperation = 'destination-over';
		ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

		ctx.strokeStyle = "#000000";
		ctx.lineWidth = 1;

		for(var i = 0; i < 3; i++) {

			for(var j = 0; j < 5; j++) {

				ctx.beginPath();
				ctx.moveTo(0, j*15 + i*100 + 55);
				ctx.lineTo(canvas.width, j*15 + i*100 + 55);
				ctx.stroke();
			}

			ctx.drawImage(base_clef, 10, i*100 + 55);
		}

		for(var i = 0; i < notes.length; i++) {

			var note = notes[i];
			var image = note.img;
			var row = Math.floor(i / notesPerRow);
			var position = i % notesPerRow;
			var pitch = note.pitch;

			ctx.drawImage(image.src, 80 + position*60 - image.x, (12-pitch.position)*7.5 + row*100 + 32.5 - image.y);

			if(pitch.hasSharp) {

				ctx.drawImage(sharp, 80 + position*60 - 18, (12-pitch.position)*7.5 + row*100 + 32.5 - 15);
			}
			else if(pitch.hasFlat) {

				ctx.drawImage(flat, 80 + position*60 - 15, (12-pitch.position)*7.5 + row*100 + 32.5 - 20);
			}
		}

		window.requestAnimationFrame(draw);
	}

	window.requestAnimationFrame(draw);
	currentStep = 0;
	getCurrentStep().load();
	timestamp = util.currentTime();
});