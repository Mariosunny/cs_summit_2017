$(function() {

	var code = $(".code");
	var input = $("#input");
	var lessonNumber = $("#lesson-number");
	var prompt = $("#prompt");
	var instructions = $("#instructions");
	var button = $("#next");
	var newline = "<br/>";
	var markBegin = "<mark>";
	var markEnd = "</mark>";
	var space = "&#x2009;";
	var button_fade_time = 300;
	var currentLesson = 1;
	var lessons;
	var util = app.util;
	var done = false;

	button.click(function(event) {

		nextLesson();
	});

	$(document).keypress(function(e) {
		if(e.which == 13) {
			nextLesson();
		}
	});

	function nextLesson() {

		if(done) {

			lessons = createLessons();
			currentLesson = 1;
			getCurrentLesson().load();
			button.html("Next");
			done = false;
		}

		if(getCurrentLesson().isLessonComplete) {

			if(currentLesson == lessons.length) {

				done = true;
				instructions.html("");
				input.val("");
				code.html("");
				prompt.html("Congratulations, you completed all " + lessons.length + " lessons!");
				button.html("Start Over");
			}
			else {
				currentLesson++;
				button.hide();
				prompt.hide();
				instructions.hide();
				getCurrentLesson().load();
			}
		}
	}

	input.keyup(function(event) {

		var string = $(this).val();

		getCurrentLesson().completedLesson(string);

		if(string) {

			try {

				var regex = new RegExp(string, 'g');
				highlight(regex);
			}
			catch(e) {

				highlight();
			}
		}
		else {

			highlight();
		}
	});

	function Lesson(text, prompt, instructions, completedLesson) {

		this.text = text;
		this.prompt = prompt;
		this.instructions = instructions;
		this.completedLesson = completedLesson;
		this.isLessonComplete = false;
	}

	Lesson.prototype.load = function() {

		highlight();
		input.val('');
		input.focus();
		lessonNumber.html(currentLesson);

		var promptString = "";

		for(var i = 0; i < this.prompt.length; i++) {

			promptString += (i == 0 ? "":newline) + this.prompt[i];
		}

		var instructionsString = "";

		for(var i = 0; i < this.instructions.length; i++) {

			instructionsString += (i == 0 ? "":newline) + this.instructions[i];
		}

		prompt.html(promptString);
		instructions.html("> " + instructionsString);
		prompt.fadeIn(800);
		setTimeout(function() {instructions.fadeIn(800)}, 400);
	};

	Lesson.prototype.completeLesson = function() {

		if(!this.isLessonComplete) {

			button.fadeIn(button_fade_time);
			this.isLessonComplete = true;
		}
	};

	function createLessons() {

		var lessons = [];

		var lesson1 = new Lesson(
			["1", "123123", "123231221","111222333"],
			["<b>Regular expressions</b> are patterns used to match sequences of characters, i.e. <i>strings</i>. Programmers use regular expressions to automatically extract useful information from strings."],
			["Try typing in some numbers to highlight some patterns the text above."],
			function(string) {

				this.timesTyped++;

				if(this.timesTyped > 4) {

					this.completeLesson();
				}
			});

		lesson1.timesTyped = 0;

		var lesson2 = new Lesson(
			["applebananaorange", "orangeappleappleraspberry", "raspberrylemonorange", "bananabananaappleraspberry"],
			["Regular expressions can be very complex. Ex. <code>\d+(,\d{1,2})?</code> is used to detect comma-separated numbers. For now, we'll work with simple words."],
			["Find all instances of the word <code>apple</code> in the above text.",
				"Hint: Type in the word <code>apple</code>."],
			function(string) {

				if(string == "apple") {

					this.completeLesson();
				}
			});

		var lesson3 = new Lesson(
			["Mary picked 4 apples on Friday, 3 apples on Saturday, and 12 on Sunday. On 4/28/15, she sold all 19 apples for $2 each."],
			["Special 'metacharacters' are used to search for categories of characters, such as digits.",
				"The <code>\\d</code> character matches any digit (0-9)"],
			["Use <code>\\d</code> to highlight <i>only</i> the digits in the above text."],
			function(string) {

				if(string == "\\d") {

					this.completeLesson();
				}
			});

		var lesson4 = new Lesson(
			["Mary picked 4 apples on Friday, 3 apples on Saturday, and 12 on Sunday. On 4/28/15, she sold all 19 apples for $2 each."],
			["The uppercase version, <code>\\D</code>, matches any <b>non-digit</b> (anything but 0-9)"],
			["Use <code>\\D</code> to highlight every non-digit in the above text."],
			function(string) {

				if(string == "\\D") {

					this.completeLesson();
				}
			});

		var lesson5 = new Lesson(
			["Mary picked 4 apples on Friday, 3 apples on Saturday, and 12 on Sunday. On 4/28/15, she sold all 19 apples for $2 each."],
			["Patterns can be repeated to search for multiple characters in a sequence."],
			["Use <code>\\d</code> to search for all numbers that are <b>exactly two digits</b>.",
			"Hint: Use <code>\\d</code> twice."],
			function(string) {

				if(string == "\\d\\d" || string == "\\d{2}") {

					this.completeLesson();
				}
			});

		var lesson6 = new Lesson(
			["gorge232beads492932dramatic2398harvest99377show12pigeon94872famous9290488023burglary38288convertible"],
			["A pair of braces <code>{}</code> define a number of characters in a sequence."],
			["Find all 5 digit numbers in the above text.",
			"Hint: <code>\\d{3}</code> matches all 3 digit numbers."],
			function(string) {

				if(string == "\\d{5}") {

					this.completeLesson();
				}
			});

		var lesson7 = new Lesson(
			["gorge232beads492932dramatic2398harvest99377show12pigeon94872famous9290488023burglary38288convertible"],
			["Braces can also be used to match a range of number of characters in a sequence."],
			["Find all numbers in the above text between 2-4 digits.",
			"Hint: <code>\\d{4,6}</code> matches all 4-6 digit numbers."],
			function(string) {

				if(string == "\\d{2,4}") {

					this.completeLesson();
				}
			});

		var lesson8 = new Lesson(
			["As little flowers, which the chill of night has bent and huddled, when the white sun strikes, grow straight and open fully on their stems, so did I, too, with my exhausted force"],
			["A pair of brackets <code>[]</code> define a set of characters. <i>Any</i> character within the set will be matched.",
				"Notice: patterns are case sensitive. <code>A</code> is not the same thing as <code>a</code>!"],
			["Match <i>only</i> the vowels in the above text.",
			"Hint: <code>[abc]</code> matches <code>a</code>, <code>b</code>, or <code>c</code>."],
			function(string) {

				if(string.length > 2 && 
					string.substring(1,string.length - 1).split('').sort().join('') == "aeiou" && 
					string[0] == '[' && 
					string[string.length - 1] == ']') {

					this.completeLesson();
				}
			});

		var lesson9 = new Lesson(
			["As little flowers, which the chill of night has bent and huddled, when the white sun strikes, grow straight and open fully on their stems, so did I, too, with my exhausted force"],
			["The special wildcard metacharacter <code>.</code> matches <i>any</i> character."],
			["Match all characters in the above text."],
			function(string) {

				if(string == ".") {

					this.completeLesson();
				}
			});

		var lesson10 = new Lesson(
			["As little flowers, which the chill of night has bent and huddled, when the white sun strikes, grow straight and open fully on their stems, so did I, too, with my exhausted force"],
			["The special metacharacter <code>*</code> matches a pattern <i>zero or more times</i>.",
				"It is equivalent to <code>{0,}</code>"],
			["Combine <code>.</code> with <code>*</code> to match the <b>entire</b> above text."],
			function(string) {

				if(string == ".*") {

					this.completeLesson();
				}
			});

		var lesson11 = new Lesson(
			["As little flowers, which the chill of night has bent and huddled, when the white sun strikes, grow straight and open fully on their stems, so did I, too, with my exhausted force"],
			["Like all patterns, the pattern <code>.*</code> can be combined with other patterns to match a particular sequence of characters.",
				"Ex. <code>.*night</code> matches all characters up to and including the word 'night'."],
			["Match every character up to and including the word 'flowers' in the above text."],
			function(string) {

				if(string.length > 3 &&
					string.substring(0,2) == ".*" &&
					"As little flowers".endsWith(string.substring(2, string.length))) {

					this.completeLesson();
				}
			});

		var lesson12 = new Lesson(
			["gong", "yearlong", "boomerang", "twang"],
			[],
			["Match the first two words in the above text, but not the last two.",
				"Hint: <code>.*tion</code> matches all words that end with -tion."],
			function(string) {

				if(string == ".*ong") {

					this.completeLesson();
				}
			});

		var lesson13 = new Lesson(
			["The free bird leaps","on the back of the wind","and floats downstream","till the current ends","and dips his wings","in the orange sun rays","and dares to claim the sky.","","But a bird that stalks","down his narrow cage","can seldom see through","his bars of rage","his wings are clipped and","his feet are tied","so he opens his throat to sing.","","The caged bird sings","with fearful trill","of the things unknown","but longed for still","and his tune is heard","on the distant hill for the caged bird","sings of freedom","","The free bird thinks of another breeze","and the trade winds soft through the sighing trees","and the fat worms waiting on a dawn-bright lawn","and he names the sky his own.","","But a caged bird stands on the grave of dreams","his shadow shouts on a nightmare scream","his wings are clipped and his feet are tied","so he opens his throat to sing","","The caged bird sings","with a fearful trill","of things unknown","but longed for still","and his tune is heard","on the distant hill","for the caged bird","sings of freedom."],
			["Regular expressions can be used to detect repetition in poems."],
			["Match every instance of 'bird', 'sing', or 'caged' in the above text.",
				"Hint: <code>apple|orange</code> matches 'apple' or 'orange'."],
			function(string) {

				var array = string.split("|");

				if(array.includes("bird") && array.includes("caged") && array.includes("sing")) {

					this.completeLesson();
				}
			});

		var lesson14 = new Lesson(
			["We sat around for a while and he told me more about his amazing life. As far as he knew, which seemed pretty far, he was the only person still alive who had fought in both of the world wars.. He'd been to Australia, and Kenya, and Pakistan, and Panama. I asked him, \"If you had to guess, how many countries would you guess you've been to?\" He said, \"I wouldn't have to guess! One hundred twelve!\""],
			["Regular expressions can be used to detect gramatical errors."],
			["Find the grammatical mistake in the above text by matching two periods '.' in sequence.",
				"Hint: To match literal periods '.' instead of the wildcard <code>.</code> character, you must precede the period with a backslash, like so: <code>\\.</code>"],
			function(string) {

				if(string == "\\.\\.") {

					this.completeLesson();
				}
			});

		var lesson15 = new Lesson(
			["I am Daniel","","I am Sam","Sam I am","","That Sam-I-am","That Sam-I-am!","I do not like","That Sam-I-am","","Do you like","Green eggs and ham","","I do not like them,","Sam-I-am.","I do not like","Green eggs and ham.","","Would you like them","Here or there?","","I would not like them","Here or there.","I would not like them","Anywhere.","I do not like","Green eggs and ham.","I do not like them,","Sam-I-am","","Would you like them","In a house?","Would you like them","With a mouse?","","I do not like them","In a house.","I do not like them","With a mouse.","I do not like them","Here or there.","I do not like them","Anywhere.","I do not like green eggs and ham.","I do not like them, Sam-I-am.","","Would you eat them","In a box?","Would you eat them","With a fox?","","Not in a box.","Not with a fox.","Not in a house.","Not with a mouse.","I would not eat them here or there.","I would not eat them anywhere.","I would not eat green eggs and ham.","I do not like them, Sam-I-am."],
			["Hyphens <code>-</code> define a range of characters.",
				"Ex. <code>[A-Z]</code> matches all uppercase letters."],
			["Match all uppercase letters in the above text."],
			function(string) {

				if(string == "[A-Z]") {

					this.completeLesson();
				}
			});

		var lesson16 = new Lesson(
			["I am Daniel","","I am Sam","Sam I am","","That Sam-I-am","That Sam-I-am!","I do not like","That Sam-I-am","","Do you like","Green eggs and ham","","I do not like them,","Sam-I-am.","I do not like","Green eggs and ham.","","Would you like them","Here or there?","","I would not like them","Here or there.","I would not like them","Anywhere.","I do not like","Green eggs and ham.","I do not like them,","Sam-I-am","","Would you like them","In a house?","Would you like them","With a mouse?","","I do not like them","In a house.","I do not like them","With a mouse.","I do not like them","Here or there.","I do not like them","Anywhere.","I do not like green eggs and ham.","I do not like them, Sam-I-am.","","Would you eat them","In a box?","Would you eat them","With a fox?","","Not in a box.","Not with a fox.","Not in a house.","Not with a mouse.","I would not eat them here or there.","I would not eat them anywhere.","I would not eat green eggs and ham.","I do not like them, Sam-I-am."],
			[],
			["Match all words that begin with a capital letter in the above text."],
			function(string) {

				if(string.startsWith("[A-Z]")) {

					string = string.substring(5, string.length);

					if(string == "[a-z]*" || string == "\\w*") {

						this.completeLesson();
					}
				}
			});

		var lesson17 = new Lesson(
			["I will tell you, Socrates, he said, what my own feeling is. Men of my age flock together; we are birds of a feather, as the old proverb says; and at our meetings the tale of my acquaintance commonly is --I cannot eat, I cannot drink; the pleasures of youth and love are fled away: there was a good time once, but now that is gone, and life is no longer life. Some complain of the slights which are put upon them by relations, and they will tell you sadly of how many evils their old age is the cause. But to me, Socrates, these complainers seem to blame that which is not really in fault. For if old age were the cause, I too being old, and every other old man, would have felt as they do. But this is not my own experience, nor that of others whom I have known. How well I remember the aged poet Sophocles, when in answer to the question, How does love suit with age, Sophocles, --are you still the man you were? Peace, he replied; most gladly have I escaped the thing of which you speak; I feel as if I had escaped from a mad and furious master. His words have often occurred to my mind since, and they seem as good to me now as at the time when he uttered them. For certainly old age has a great sense of calm and freedom; when the passions relax their hold, then, as Sophocles says, we are freed from the grasp not of one mad master only, but of many. The truth is, Socrates, that these regrets, and also the complaints about relations, are to be attributed to the same cause, which is not old age, but men's characters and tempers; for he who is of a calm and happy nature will hardly feel the pressure of age, but to him who is of an opposite disposition youth and age are equally a burden. ","","I listened in admiration, and wanting to draw him out, that he might go on --Yes, Cephalus, I said: but I rather suspect that people in general are not convinced by you when you speak thus; they think that old age sits lightly upon you, not because of your happy disposition, but because you are rich, and wealth is well known to be a great comforter. ","","You are right, he replied; they are not convinced: and there is something in what they say; not, however, so much as they imagine. I might answer them as Themistocles answered the Seriphian who was abusing him and saying that he was famous, not for his own merits but because he was an Athenian: 'If you had been a native of my country or I of yours, neither of us would have been famous.' And to those who are not rich and are impatient of old age, the same reply may be made; for to the good poor man old age cannot be a light burden, nor can a bad rich man ever have peace with himself. ","","May I ask, Cephalus, whether your fortune was for the most part inherited or acquired by you? ","","Acquired! Socrates; do you want to know how much I acquired? In the art of making money I have been midway between my father and grandfather: for my grandfather, whose name I bear, doubled and trebled the value of his patrimony, that which he inherited being much what I possess now; but my father Lysanias reduced the property below what it is at present: and I shall be satisfied if I leave to these my sons not less but a little more than I received. ","","That was why I asked you the question, I replied, because I see that you are indifferent about money, which is a characteristic rather of those who have inherited their fortunes than of those who have acquired them; the makers of fortunes have a second love of money as a creation of their own, resembling the affection of authors for their own poems, or of parents for their children, besides that natural love of it for the sake of use and profit which is common to them and all men. And hence they are very bad company, for they can talk about nothing but the praises of wealth. That is true, he said. ","","Yes, that is very true, but may I ask another question? What do you consider to be the greatest blessing which you have reaped from your wealth? ","","One, he said, of which I could not expect easily to convince others. For let me tell you, Scorates, that when a man thinks himself to be near death, fears and cares enter into his mind which he never had before; the tales of a world below and the punishment which is exacted there of deeds done here were once a laughing matter to him, but now he is tormented with the thought that they may be true: either from the weakness of age, or because he is now drawing nearer to that other place, he has a clearer view of these things; suspicions and alarms crowd thickly upon him, and he begins to reflect and consider what wrongs he has done to others. And when he finds that the sum of his transgressions is great he will many a time like a child start up in his sleep for fear, and he is filled with dark forebodings. But to him who is conscious of no sin, sweet hope, as Pindar charmingly says, is the kind nurse of his age: ","","Hope, he says, cherishes the soul of him who lives in justice and holiness and is the nurse of his age and the companion of his journey; --hope which is mightiest to sway the restless soul of man. ","","How admirable are his words! And the great blessing of riches, I do not say to every man, but to a good man, is, that he has had no occasion to deceive or to defraud others, either intentionally or unintentionally; and when he departs to the world below he is not in any apprehension about offerings due to the gods or debts which he owes to men. Now to this peace of mind the possession of wealth greatly contributes; and therefore I say, that, setting one thing against another, of the many advantages which wealth has to give, to a man of sense this is in my opinion the greatest. ","","Well said, Cephalus, I replied; but as concerning justice, what is it? --to speak the truth and to pay your debts --no more than this? And even to this are there not exceptions? Suppose that a friend when in his right mind has deposited arms with me and he asks for them when he is not in his right mind, ought I to give them back to him? No one would say that I ought or that I should be right in doing so, any more than they would say that I ought always to speak the truth to one who is in his condition."],
			["In the above text, the word 'Socrates' is misspelled somewhere. Either the first two letters were switched, or the second and third letters were switched."],
			["Match the misspelled word in the above text.",
				"Hint: <code>(abc)|(def)</code> matches 'abc' or 'def'."],
			function(string) {

				if(string == "(Osc)|(Sco)rates" || string == "(Sco)|(Osc)rates") {

					this.completeLesson();
				}
			});

		lessons.push(lesson1);
		lessons.push(lesson2);
		lessons.push(lesson3);
		lessons.push(lesson4);
		lessons.push(lesson5);
		lessons.push(lesson6);
		lessons.push(lesson7);
		lessons.push(lesson8);
		lessons.push(lesson9);
		lessons.push(lesson10);
		lessons.push(lesson11);
		lessons.push(lesson12);
		lessons.push(lesson13);
		lessons.push(lesson14);
		lessons.push(lesson15);
		lessons.push(lesson16);
		lessons.push(lesson17);

		return lessons;
	}

	function highlight(regex) {

		var highlightedText = "";
		var match;

		for(var i = 0; i < getCurrentLesson().text.length; i++) {

			var string = getCurrentLesson().text[i];
			var line = [];
			var index = 0;
			var matchLength;

			if(regex) {

				while((match = regex.exec(string)) !== null) {

					matchLength = match[0].length;

					if(matchLength == 0) {

						break;
					}

					if(match.index - index > 0) {

						line = line.concat(string.substring(index, match.index).split(''));
					}

					var temp = string.substring(match.index, match.index + matchLength).split('');
					temp[0] = markBegin + temp[0];
					temp[temp.length - 1] = temp[temp.length - 1] + markEnd;
					line = line.concat(temp);
					index = match.index + matchLength;
				}

				if(index < string.length) {

					line = line.concat(string.substring(index).split(''));
				}

				regex.lastIndex = 0;
				highlightedText += line.join(space) + newline;
			}
			else {

				highlightedText += string.split('').join(space) + newline;
			}
		}

		code.html(highlightedText);
	}

	function getCurrentLesson() {

		return lessons[currentLesson - 1];
	}

	lessons = createLessons();
	getCurrentLesson().load();
});