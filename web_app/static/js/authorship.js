$(function() {

	var code = $(".code-input");
	var next = $("#next");
	var instructions = $("#instructions");
	var output = $("#output");
	var highlightClass = "syntax-highlight";
	var newline = "<br/>";
	var currentStep;
	var keywords = [
		"set",
		"print",
		"replace"
	];
	var keywords_regex = new RegExp(keywords.join("|"), 'g');
	var util = app.util;
	var sessionID = util.uuid();
	var timestamp;
	var attempts = [];

	code.keyup(function(event) {

		if(attempts.length < 100) {

			attempts.push(code.text());
		}

		if(!getCurrentStep().isComplete && getCurrentStep().checkComplete(getInput())) {

			if(currentStep >= 1) {

				util.postResults("authorship", util.currentTime() - timestamp, 1, currentStep - 1, sessionID, {"attempts": attempts.join("%")});
			}
			output.html(getCurrentStep().output);
			output.show();
			getCurrentStep().isComplete = true;
			next.fadeIn(500);
		}
	});

	next.click(function(event) {

		if(getCurrentStep().isComplete) {

			nextStep();
		}
	});

	function nextStep() {

		getCurrentStep().cleanup();
		currentStep++;
		next.hide();
		getCurrentStep().load();
		attempts = [];
		timestamp = util.currentTime();
	}

	function getCurrentStep() {

		return steps[currentStep];
	}

	function wipeCode() {

		code.html("");
	}

	function getInput() {

		return code.text().replace(/\s/g, "").split(";");
	}

	function setInstructions(text) {

		instructions.hide();
		instructions.html(text);
		instructions.fadeIn(650);
	}

	function setOutput(text) {

		output.html(text);
	}

	function Step(instructions, checkComplete, cleanup, output) {

		this.instructions = "";
		this.checkComplete = checkComplete;
		this.isComplete = false;
		this.cleanup = cleanup || function() {};
		this.output = output || [];
		this.output = this.output.join(newline);

		for(var i = 0; i < instructions.length; i++) {

			this.instructions += instructions[i] + newline + newline;
		}
	}

	Step.prototype.load = function() {

		code.focus();
		output.hide();
		setInstructions(this.instructions);
	};

	var steps = [

		new Step(["<b>Text similarity programs</b> can be used to detect plagiarism in academic works.",
				"In this tutorial, we'll write a simple program to determine the similarity between a student's essay and the original source (seen above) by comparing word frequencies."],
				function() { 
				
					return true;
				}),
		new Step(["First, we need to know how to create variables. <b>Variables</b> are used to store information in programs.", 
				"To declare a variable and assign a value to it, we use an assignment statement.",
				"Type <code>x = 5;</code> in the box to the left to create a variable named 'x' and assign it a value of 5."],
				function(input) {
					
					return input[0] == "x=5";
				},
				function() { wipeCode();},
				["5"]),
		new Step(["Variables can be named with more than one letter.",
				"Note: Values surrounded in double quotes <code>\"\"</code> are called <i>strings</i>. Strings are sequence of characters.",
				"Type <code>hot_month = \"August\";</code> in the box to the left to create a variable named 'hot_month' and assign it a value of \"August\"."],
				function(input) {
					
					return input[0] == "hot_month=\"August\"";
				},
				function() { wipeCode();},
				["\"August\""]),	
		new Step(["So far, we've just been dealing with numbers. We can also store lists of values using <b>arrays</b>.",
				"Note: All statements must end with semicolons <code>;</code>.",
				"Type <code>fib = [1, 1, 2, 3, 5];</code> create a variable named 'fib' and assign it to a list of numbers."],
				function(input) {
				
					return input[0] == "fib=[1,1,2,3,5]";
				},
				false,
				["[1,1,2,3,5]"]),	
		new Step(["A <b>set</b> is an array with no repeated elements.",
				"Replace the square brackets <code>[]</code> with braces <code>{}</code> to make <code>fib</code> into a set."],
				function(input) {
				
					return input[0] == "fib={1,1,2,3,5}";
				},
				function() { wipeCode();},
				["{1,2,3,5}"]),	
		new Step(["A <b>dictionary</b> is an array of key-value pairs.",
				"Type <code>colors = {\"red\": 5, \"green\": 3, \"blue\": 2}."],
				function(input) {
				
					return input[0] == "colors={\"red\":5,\"green\":3,\"blue\":2}";
				},
				function() { wipeCode();},
				["{\"red\":5, \"green\":3, \"blue\":2}"]),	
		new Step(["The <code>input()</code> function captures input as a value.",
				"Capture the source text from above by typing <code>source = input();</code>."],
				function(input) {
				
					return input[0] == "source=input()";
				},
				false,
				["\"Gothic narratives are frequently termed convoluted or labyrinthine, assessments often enough fairly accurate. This tendency arises chiefly from the concern gothic novels have with the revelation and setting right of hidden wrongs from the past, and the slow way in which these wrongs are exposed over time through coincidence and a providential fatalism.\""]),	
		new Step(["Before we can determine the frequency of words, we have to break up the source text into an array so that it will be easier to work with.",
					"The <code>split()</code> function takes a string and splits it into an array.",
				"After the first line, type <code>source_words = split(source);</code>",
					"Don't forget semicolons at the end of each line <code>;</code>."],
				function(input) {
				
					return input[0] == "source=input()" &&
							input[1] == "source_words=split(source)";
				},
				false,
				["[\"Gothic\", \"narratives\", \"are\", \"frequently\", \"termed\", \"convoluted\", \"or\", \"labyrinthine\", \"assessments\", \"often\", \"enough\", \"fairly\", \"accurate\", \"This\", \"tendency\", \"arises\", \"chiefly\", \"from\", \"the\", \"concern\", \"gothic\", \"novels\", \"have\", \"with\", \"the\", \"revelation\", \"and\", \"setting\", \"right\", \"of\", \"hidden\", \"wrongs\", \"from\", \"the\", \"past\", \"and\", \"the\", \"slow\", \"way\", \"in\", \"which\", \"these\", \"wrongs\", \"are\", \"exposed\", \"over\", \"time\", \"through\", \"coincidence\", \"and\", \"a\", \"providential\", \"fatalism\"]"]),	
		new Step(["We need to do the same thing for our student text.",
				"Copy and paste the current two lines. Change <code>source</code> to <code>essay</code> and <code>source_words</code> to <code>essay_words</code>."],
				function(input) {
				
					return input[0] == "source=input()" &&
							input[1] == "source_words=split(source)" &&
							input[2] == "essay=input()" &&
							input[3] == "essay_words=split(essay)";
				},
				false,
				["[\"Gothic\", \"narratives\", \"are\", \"frequently\", \"termed\", \"convoluted\", \"or\", \"labyrinthine\", \"assessments\", \"often\", \"enough\", \"fairly\", \"accurate\", \"This\", \"tendency\", \"arises\", \"chiefly\", \"from\", \"the\", \"concern\", \"gothic\", \"novels\", \"have\", \"with\", \"the\", \"revelation\", \"and\", \"setting\", \"right\", \"of\", \"hidden\", \"wrongs\", \"from\", \"the\", \"past\", \"and\", \"the\", \"slow\", \"way\", \"in\", \"which\", \"these\", \"wrongs\", \"are\", \"exposed\", \"over\", \"time\", \"through\", \"coincidence\", \"and\", \"a\", \"providential\", \"fatalism\"]<br/>[\"Assessments\", \"concerning\", \"Gothic\", \"narratives\", \"are\", \"usually\", \"fairly\", \"accurate\", \"they\", \"are\", \"frequently\", \"termed\", \"labyrinthine\", \"or\", \"convoluted\", \"This\", \"trend\", \"arises\", \"primarily\", \"from\", \"the\", \"concern\", \"Gothic\", \"Novels\", \"have\", \"with\", \"the\", \"revelation\", \"and\", \"also\", \"setting\", \"right\", \"of\", \"hidden\", \"wrongs\", \"from\", \"the\", \"past\", \"Through\", \"coincidence\", \"and\", \"a\", \"providential\", \"fatalism\", \"these\", \"wrongs\", \"are\", \"exposed\", \"over\", \"time\", \"Overall\", \"Gothic\", \"narratives\", \"can\", \"be\", \"difficult\", \"to\", \"follow\"]"]),
		new Step(["For each unique word in the two texts, we need to find the sum of the absolute differences between the probability of the word occuring in each text.",
				"First, we need to create a set that stores all the unique words from <i>both</i> arrays. This is achieved by taking the union of both arrays.",
				"Type <code>unique_words = union(source_words, essay_words);</code>."],
				function(input) {
				
					return input[0] == "source=input()" &&
							input[1] == "source_words=split(source)" &&
							input[2] == "essay=input()" &&
							input[3] == "essay_words=split(essay)" &&
							input[4] == "unique_words=union(source_words,essay_words)";
				},
				false,
				["[\"hidden\", \"way\", \"fatalism\", \"this\", \"overall\", \"over\", \"with\", \"labyrinthine\", \"concern\", \"be\", \"right\", \"slow\", \"or\", \"narratives\", \"also\", \"coincidence\", \"tendency\", \"gothic\", \"concerning\", \"wrongs\", \"primarily\", \"providential\", \"through\", \"from\", \"setting\", \"the\", \"enough\", \"accurate\", \"assessments\", \"of\", \"and\", \"they\", \"frequently\", \"trend\", \"have\", \"chiefly\", \"these\", \"termed\", \"convoluted\", \"revelation\", \"difficult\", \"past\", \"usually\", \"are\", \"novels\", \"which\", \"a\", \"fairly\", \"can\", \"arises\", \"exposed\", \"often\", \"in\", \"time\", \"follow\", \"to\"]"]),	
		new Step(["We'll also need a variable to hold our sum. Our sum should be initialized to 0.",
				"Type <code>sum = 0;</code>."],
				function(input) {
				
					return input[0] == "source=input()" &&
							input[1] == "source_words=split(source)" &&
							input[2] == "essay=input()" &&
							input[3] == "essay_words=split(essay)" &&
							input[4] == "unique_words=union(source_words,essay_words)" &&
							input[5] == "sum=0";
				},
				false,
				["0"]),
		new Step(["Next, we'll need to use a for loop to traverse each word in each array.",
					"A <b>for loop</b> allows you to travel to each value in an array once.",
				"Type <code>for word in unique_words {</code>. Don't forget the opening brace."],
				function(input) {
				
					return input[0] == "source=input()" &&
							input[1] == "source_words=split(source)" &&
							input[2] == "essay=input()" &&
							input[3] == "essay_words=split(essay)" &&
							input[4] == "unique_words=union(source_words,essay_words)" &&
							input[5] == "sum=0" &&
							input[6] == "forwordinunique_words{";
				},
				false,
				[""]),
		new Step(["Within the loop, type <code>source_freq = freq(word, source_words);</code> to calculate the frequency of each word in the source text."],
				function(input) {
				
					return input[0] == "source=input()" &&
							input[1] == "source_words=split(source)" &&
							input[2] == "essay=input()" &&
							input[3] == "essay_words=split(essay)" &&
							input[4] == "unique_words=union(source_words,essay_words)" &&
							input[5] == "sum=0" &&
							input[6] == "forwordinunique_words{source_freq=freq(word,source_words)";
				},
				false,
				[""]),
		new Step(["Do the same for the essay text, by typing <code>essay_freq = freq(word, essay_words);</code>."],
				function(input) {
				
					return input[0] == "source=input()" &&
							input[1] == "source_words=split(source)" &&
							input[2] == "essay=input()" &&
							input[3] == "essay_words=split(essay)" &&
							input[4] == "unique_words=union(source_words,essay_words)" &&
							input[5] == "sum=0" &&
							input[6] == "forwordinunique_words{source_freq=freq(word,source_words)" &&
							input[7] == "essay_freq=freq(word,essay_words)";
				},
				false,
				[""]),
		new Step(["Take the absolute difference of these two values using the <code>abs()</code> function.",
				"Type <code>diff = abs(source_freq - essay_freq);</code>"],
				function(input) {
				
					return input[0] == "source=input()" &&
							input[1] == "source_words=split(source)" &&
							input[2] == "essay=input()" &&
							input[3] == "essay_words=split(essay)" &&
							input[4] == "unique_words=union(source_words,essay_words)" &&
							input[5] == "sum=0" &&
							input[6] == "forwordinunique_words{source_freq=freq(word,source_words)" &&
							input[7] == "essay_freq=freq(word,essay_words)" &&
							input[8] == "diff=abs(source_freq-essay_freq)";
				},
				false,
				[""]),
		new Step(["Then, add this difference to the total sum.",
				"Type <code>sum = sum + diff;</code>"],
				function(input) {
				
					return input[0] == "source=input()" &&
							input[1] == "source_words=split(source)" &&
							input[2] == "essay=input()" &&
							input[3] == "essay_words=split(essay)" &&
							input[4] == "unique_words=union(source_words,essay_words)" &&
							input[5] == "sum=0" &&
							input[6] == "forwordinunique_words{source_freq=freq(word,source_words)" &&
							input[7] == "essay_freq=freq(word,essay_words)" &&
							input[8] == "diff=abs(source_freq-essay_freq)" &&
							input[9] == "sum=sum+diff";
				},
				false,
				[""]),
		new Step(["Close the for loop with a closing brace <code>}</code>."],
				function(input) {
				
					return input[0] == "source=input()" &&
							input[1] == "source_words=split(source)" &&
							input[2] == "essay=input()" &&
							input[3] == "essay_words=split(essay)" &&
							input[4] == "unique_words=union(source_words,essay_words)" &&
							input[5] == "sum=0" &&
							input[6] == "forwordinunique_words{source_freq=freq(word,source_words)" &&
							input[7] == "essay_freq=freq(word,essay_words)" &&
							input[8] == "diff=abs(source_freq-essay_freq)" &&
							input[9] == "sum=sum+diff" &&
							input[10] == "}";
				},
				false,
				[""]),
		new Step(["Finally, use the <code>print()</code> function to display your final result.",
					"Type <code>print(sum)</code>."],
				function(input) {
				
					return input[0] == "source=input()" &&
							input[1] == "source_words=split(source)" &&
							input[2] == "essay=input()" &&
							input[3] == "essay_words=split(essay)" &&
							input[4] == "unique_words=union(source_words,essay_words)" &&
							input[5] == "sum=0" &&
							input[6] == "forwordinunique_words{source_freq=freq(word,source_words)" &&
							input[7] == "essay_freq=freq(word,essay_words)" &&
							input[8] == "diff=abs(source_freq-essay_freq)" &&
							input[9] == "sum=sum+diff" &&
							input[10] == "}print(sum)";
				},
				false,
				["0.342958"]),
		new Step(["The closer the final sum is to zero, the more similiar the two texts.",
			"You determined that the similarity between the source code and the student's essay was <b>0.342958</b>.",
					"A value between 0.0 and 0.5 indicates extreme similarity, which means that this essay was likely plagiarized!",
					"<b>Well done, you have completed this tutorial!</b>"],
				function(input) {
				
					return true;
				},
				false,
				[""]),
	];

	currentStep = 0;
	getCurrentStep().load();
	getCurrentStep().isComplete = true;
	timestamp = util.currentTime();
});