$(function() {

	var SPEED = 1;

	function Step(attempts, time) {

		this.attempts =  attempts;
		this.time = time;
		this.currentAttempt = 0;
	}

	Step.prototype.getAverageTime = function() {

		return this.time/this.attempts.length;
	};

	Step.prototype.getCurrentAttempt = function() {

		return this.attempts[this.currentAttempt];
	};

	function Session(steps) {

		this.steps = steps;
		this.currentStep = 0;
	}

	Session.prototype.getCurrentStep = function() {

		return this.steps[this.currentStep];
	};

	Session.prototype.setText = function(text) {

		this.element.find('.text').text(text);
	};

	var sessions = [
		new Session([
			new Step(['1', '14', '141', '1412', '14124'], 7016 )
		]),
		new Session([
			new Step(['0', '01', '012', '0123', '01234'], 14753 ),
			new Step(['d', 'd=', 'd=(', 'd=(', 'd=(,', 'd=(,d', 'd=(,d{', 'd=(,d{', 'd=(,d{1', 'd=(,d{1,', 'd=(,d{1,2', 'd=(,d{1,2}', 'd=(,d{1,2}', 'd=(,d{1,2})', 'd=(,d{1,2})', 'd=(,d{1,2})?', 'd=(,d{1,2})?', '', 'a', 'ap', 'app', 'appl', 'applw', 'appl', 'apple'], 47486 ),
			new Step(['/', '/d', '/', '', '/', '', '\\', '\\d'], 59032 ),
			new Step(['\\', '\\D'], 6330 ),
			new Step(['\\', '\\d', '\\d\\', '\\d\\d'], 8341 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{3', '\\d{3}', '\\d{3}', '\\d{}', '\\d{5}'], 37851 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{4', '\\d{4,', '\\d{4,6', '\\d{4,6}', '\\d{4,6}', '\\d{4,6}', '\\d{4,6}', '\\d{4,6}', '\\d{,6}', '\\d{2,6}', '\\d{2,6}', '\\d{2,6}', '\\d{2,}', '\\d{2,4}'], 22337 ),
			new Step(['[', '[a', '[ae', '[aei', '[aeio', '[aeiou', '[aeiou}', '[aeiou}', '[aeiou', '[aeiou]'], 44739 ),
			new Step(['.'], 6436 ),
			new Step(['*', '*', '', '.', '.*'], 13025 ),
			new Step(['.', '.*', '.*', '.*f', '.*fl', '.*flo', '.*flow', '.*flower', '.*flower', '.*flowers'], 22274 ),
			new Step(['.', '.*', '.*', '.*r', '.*ra', '.*ran', '.*rang', '.*ran', '.*ra', '.*r', '.*', '.*b', '.*bo', '.*boo', '.*boom', '.*boome', '.*boomer', '.*boomera', '.*boomeran', '.*boomerang', '.*boomeran', '.*boomera', '.*boomer', '.*boome', '.*boom', '.*boo', '.*bo', '.*b', '.*', '.*l', '.*lo', '.*lon', '.*long', '.*lon', '.*lo', '.*l', '.*', '.*o', '.*on', '.*ong'], 52643 ),
			new Step(['b', 'bi', 'bir', 'bird', 'bird', 'bird\\', 'bird\\', 'bird', 'bird|', 'bird|', 'bird|s', 'bird|si', 'bird|sin', 'bird|sing', 'bird|sing|', 'bird|sing|', 'bird|sing|c', 'bird|sing|ca', 'bird|sing|cag', 'bird|sing|caged'], 76815 ),
			new Step(['\\', "\\'", "\\'.", "\\'.'", "\\'.", "\\'.,", "\\'.", "\\'.,", "\\'.", "\\'..", '\\\'.."', '\\\'.."', "\\'..", "\\'..'", "\\'..", "\\'.", "\\'", '\\', '\\.', '\\..', '\\.', '\\', '', "'", '', '\\', '\\,', '\\', '\\.', '\\..', '\\..\\', '\\..', '\\.', '\\', '\\[', '\\[.', '\\[..', '\\[..]', '\\[..', '\\[.', '\\[', '\\', '\\{', '\\{', '\\{.', '\\{..', '\\{..}', '\\{..}', '\\{..', '\\{.', '\\{', '\\', '', '\\', '\\.', '\\..', '\\..\\', '\\..', '\\.', '\\..', '\\.', '\\..', '\\.', '\\.\\', '\\.\\.'], 243322 ),
			new Step(['[', '[A', '[A', '[A-', '[A-Z', '[A-Z', '[A-Z]'], 17630 ),
			new Step(['A', 'A', 'A', 'A-', 'A-Z', 'A-Z', 'A-', 'A', '', '/', '/{', '/{', '/', '/[', '/[A', '/[A', '/[A-', '/[A-Z', '/[A-Z', '/[A-Z]', '/[A-Z]', '/[A-Z]', '/[A-Z]', '[A-Z]', '[A-Z]', '[A-Z].', '[A-Z]..', '[A-Z]...', '[A-Z]....', '[A-Z]...', '[A-Z]..', '[A-Z].', '[A-Z]', '[A-Z', '[A-Z]', '[A-Z].', '[A-Z]..', '[A-Z]...', '[A-Z]..', '[A-Z].', '[A-Z]', '[A-Z]/', '[A-Z]', '[A-Z]\\', '[A-Z]\\w', '[A-Z]\\', '[A-Z]', '[A-Z]', '\\[A-Z]', '\\w[A-Z]', '\\[A-Z]', '[A-Z]', '[A-Z]', '[A-Z]', '[A-Z]\\', '[A-Z]\\w', '[A-Z]\\w*'], 193658 ),
			new Step(['(Oscrates)|(Scorates)', '(Oscrates)|(Scorate)', '(Oscrates)|(Scorat)', '(Oscrates)|(Scora)', '(Oscrates)|(Scor)', '(Oscrates)|(Sco)', '(Oscrate)|(Sco)', '(Oscrat)|(Sco)', '(Oscra)|(Sco)', '(Oscr)|(Sco)', '(Osc)|(Sco)', '(Osc)|(Sco)r', '(Osc)|(Sco)ra', '(Osc)|(Sco)rat', '(Osc)|(Sco)rate', '(Osc)|(Sco)rates'], 245819 )
		]),
		new Session([
			new Step(['h', 'h ', 'h', '', '3'], 14461 ),
			new Step(['a', 'ap', 'app', 'appl', 'apple'], 13331 ),
			new Step(['\\', '\\d'], 10314 ),
			new Step(['\\', '\\D'], 10357 ),
			new Step(['\\', '\\d', '\\d\\', '\\d\\d'], 15510 ),
			new Step(['\\', '\\s', '\\', '\\d', '\\d{', '\\d{', '\\d{d', '\\d{', '\\d{3', '\\d{3}', '\\d{3}', '\\d{3}', '\\d{}', '\\d{5}'], 31286 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{2', '\\d{2,', '\\d{2,4', '\\d{2,4}'], 14859 ),
			new Step(['{', '{', '{a', '{a,', '{a,e', '{a,e,', '{a,e,i', '{a,e,i,', '{a,e,i,o', '{a,e,i,o,', '{a,e,i,o,u', '{a,e,i,o,u}', '{a,e,i,o,u}', '{a', '{ae', '{a', '{', '', '', '[', '[a', '[ae', '[aei', '[aeio', '[aeiou', '[aeiou}', '[aeiou}', '[aeiou', '[aeiou]'], 23816 ),
			new Step(['.'], 5893 ),
			new Step(['"{', '"{', '"{', '"', '', '{', '{', '{.', '{.*', '{.*', '{.*}', '{.*}', '{.*', '{.', '{', '', '', '8', '8.', '8', '', '', '.', '.*'], 21372 ),
			new Step(['.', '.*', '.*', '.*f', '.*fl', '.*flo', '.*flow', '.*flower', '.*flower', '.*flowers'], 26861 ),
			new Step(['.', '.*', '.*', '.*ye', '.*yea', '.*yea', '.*year', '.*yearlo', '.*yearlo', '.*yearlon', '.*yearlong', '.*yearlon', '.*yearlo', '.*yearl', '.*year', '.*yea', '.*ye', '.*y', '.*', '.*o', '.*on', '.*ong'], 27939 ),
			new Step(['b', 'bi', 'bir', 'bird', 'bird|', 'bird|', 'bird|s', 'bird|su', 'bird|sub', 'bird|subg', 'bird|sub', 'bird|su', 'bird|s', 'bird|si', 'bird|sin', 'bird|sing', 'bird|sing|', 'bird|sing|', 'bird|sing|c', 'bird|sing|ca', 'bird|sing|cag', 'bird|sing|cage', 'bird|sing|caged'], 21210 ),
			new Step(['\\', '\\.', '\\.\\', '\\.\\.'], 14262 ),
			new Step(['[', '[A', '[A', '[A-', '[A-Z', '[A-Z', '[A-Z', '[A-Z]'], 10736 )
		]),
		new Session([
			new Step(['1', '12', '123', '12', '1'], 64864 ),
			new Step(['a', 'ap', 'app', 'appl', 'apple'], 9968 ),
			new Step(['\\', '\\ds', '\\ds', '\\d'], 26464 ),
			new Step(['\\', '\\D'], 5072 ),
			new Step(['\\', '\\d', '\\d\\', '\\d\\d'], 13181 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{3', '\\d{3}', '\\d{3}', '\\d{3} ', '\\d{3}', '\\d{}', '\\d{54}', '\\d{54}', '\\d{5}'], 63074 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{2', '\\d{2,', '\\d{2,6', '\\d{2,6}', '\\d{2,6}', '\\d{2,6', '\\d{2,', '\\d{2,4', '\\d{2,4}'], 27263 ),
			new Step(['{', '{', '', '[', '[a', '[ab', '[abc', '[abc]', '[abc]', '[abc]', '[abc]', '[ab]', '[a]', '[]', '[a]', '[ae]', '[aeu]', '[ae]', '[aei]', '[aeio]', '[aeiou]'], 50935 ),
			new Step(['A', 'A', 'As', 'As ', 'As l', 'As li', 'As lit', 'As litt', 'As littl', 'As little', 'As little ', 'As little f', 'As little fl', 'As little flo', 'As little flow', 'As little flowe', 'As little flower', 'As little flowers', 'As little flowers,', 'As little flowers, ', 'As little flowers, w', 'As little flowers, wh', 'As little flowers, whi', 'As little flowers, whic', 'As little flowers, which', 'As little flowers, which ', 'As little flowers, which t', 'As little flowers, which th', 'As little flowers, which the', 'As little flowers, which the ', 'As little flowers, which the c', 'As little flowers, which the ch', 'As little flowers, which the chi', 'As little flowers, which the chil', 'As little flowers, which the chill', 'As little flowers, which the chill ', 'As little flowers, which the chill o', 'As little flowers, which the chill of', 'As little flowers, which the chill of ', 'As little flowers, which the chill of n', 'As little flowers, which the chill of ni', 'As little flowers, which the chill of nig', 'As little flowers, which the chill of nigh', 'As little flowers, which the chill of night', 'As little flowers, which the chill of night ', 'As little flowers, which the chill of night ha', 'As little flowers, which the chill of night ha', 'As little flowers, which the chill of night has', 'As little flowers, which the chill of night has ', 'As little flowers, which the chill of night has b', 'As little flowers, which the chill of night has be', 'As little flowers, which the chill of night has ben', 'As little flowers, which the chill of night has bent', 'As little flowers, which the chill of night has bent ', 'As little flowers, which the chill of night has bent a', 'As little flowers, which the chill of night has bent an', 'As little flowers, which the chill of night has bent and', 'As little flowers, which the chill of night has bent and ', 'As little flowers, which the chill of night has bent and h', 'As little flowers, which the chill of night has bent and hu', 'As little flowers, which the chill of night has bent and hud', 'As little flowers, which the chill of night has bent and hudd', 'As little flowers, which the chill of night has bent and huddl', 'As little flowers, which the chill of night has bent and huddle', 'As little flowers, which the chill of night has bent and huddlee', 'As little flowers, which the chill of night has bent and huddleed', 'As little flowers, which the chill of night has bent and huddlee', 'As little flowers, which the chill of night has bent and huddle', 'As little flowers, which the chill of night has bent and huddled', 'As little flowers, which the chill of night has bent and huddled,', 'As little flowers, which the chill of night has bent and huddled, ', 'As little flowers, which the chill of night has bent and huddled, wh', 'As little flowers, which the chill of night has bent and huddled, wh', 'As little flowers, which the chill of night has bent and huddled, whe', 'As little flowers, which the chill of night has bent and huddled, when', 'As little flowers, which the chill of night has bent and huddled, when ', 'As little flowers, which the chill of night has bent and huddled, when t', 'As little flowers, which the chill of night has bent and huddled, when th', 'As little flowers, which the chill of night has bent and huddled, when the', 'As little flowers, which the chill of night has bent and huddled, when the ', 'As little flowers, which the chill of night has bent and huddled, when the w', 'As little flowers, which the chill of night has bent and huddled, when the wh', 'As little flowers, which the chill of night has bent and huddled, when the whi', 'As little flowers, which the chill of night has bent and huddled, when the whit', 'As little flowers, which the chill of night has bent and huddled, when the white', 'As little flowers, which the chill of night has bent and huddled, when the white ', 'As little flowers, which the chill of night has bent and huddled, when the white s', 'As little flowers, which the chill of night has bent and huddled, when the white su', 'As little flowers, which the chill of night has bent and huddled, when the white sun', 'As little flowers, which the chill of night has bent and huddled, when the white sun ', 'As little flowers, which the chill of night has bent and huddled, when the white sun s', 'As little flowers, which the chill of night has bent and huddled, when the white sun st', 'As little flowers, which the chill of night has bent and huddled, when the white sun str', 'As little flowers, which the chill of night has bent and huddled, when the white sun stri', 'As little flowers, which the chill of night has bent and huddled, when the white sun strik', 'As little flowers, which the chill of night has bent and huddled, when the white sun strike', 'As little flowers, which the chill of night has bent and huddled, when the white sun strikes', 'As little flowers, which the chill of night has bent and huddled, when the white sun strikes,', 'As little flowers, which the chill of night has bent and huddled, when the white sun strikes, ', 'As little flowers, which the chill of night has bent and huddled, when the white sun strikes, g', 'As little flowers, which the chill of night has bent and huddled, when the white '], 160612 ),
			new Step(['.', '.*'], 8022 )
		]),
		new Session([
			new Step(['1', '12', '123', '1234', '12345'], 97628 ),
			new Step(['a', 'ap', 'app', 'appl', 'apple'], 7476 ),
			new Step(['\\', '\\d'], 24695 ),
			new Step(['\\', '\\', '\\D'], 3911 ),
			new Step(['\\', '\\d', '\\d ', '\\d  ', '\\d ', '\\d \\', '\\d \\d', '\\d \\', '\\d ', '\\d', '\\d\\', '\\d\\d'], 28545 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{3', '\\d{3}', '\\d{3}', '\\d{}', '\\d{5}'], 33498 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{2', '\\d{2,', '\\d{2,6', '\\d{2,', '\\d{2,4', '\\d{2,4}'], 22981 ),
			new Step(['[', '[', '[A', '[A', '[', '[a', '[ae', '[aei', '[aeio', '[aeiou', '[aeiou]'], 17919 ),
			new Step(['.'], 15322 ),
			new Step(['.', '.*'], 25930 )
		]),
		new Session([
			new Step(['j', 'ju', 'ju8', 'ju87', 'ju876'], 93260 ),
			new Step(['a', 'ap', 'app', 'appl', 'apple'], 50648 ),
			new Step(['\\', '\\d'], 40612 ),
			new Step(['\\', '\\D'], 8183 ),
			new Step(['', '\\', '\\d', '\\d ', '\\d \\', '\\d \\d', '\\d \\', '\\d ', '\\d', '\\d\\', '\\d\\d'], 20088 ),
			new Step(['', '\\', '\\d', '\\d{', '\\d{', '\\d{5', '\\d{5}'], 27333 ),
			new Step(['\\d{2-4}', '\\d{2-4', '\\d{2-', '\\d{2', '\\d{2,', '\\d{2,4', '\\d{2,4}'], 11434 ),
			new Step(['', '[', '[a', '[ae', '[aei', '[aeio', '[aeiou', '[aeiou]'], 37859 ),
			new Step(['', '.'], 8606 ),
			new Step(['', '.', '.*'], 16748 )
		]),
		new Session([
			new Step(['4', '', '5', '', '5'], 138744 ),
			new Step(['a', 'ap', 'app', 'appl', 'apple'], 11694 ),
			new Step(['\\', '\\d'], 12316 ),
			new Step(['\\', '\\', '\\D'], 11499 ),
			new Step(['\\', '\\d', '\\d ', '\\d \\', '\\d \\d', '\\d \\', '\\d ', '\\d', '\\d\\', '\\d\\d'], 15625 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{3', '\\d{3}', '\\d{3}', '\\d{}', '\\d{5}'], 45364 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{2', '\\d{2,', '\\d{2,4', '\\d{2,4}'], 30995 ),
			new Step(['[', '[a', '[ab', '[abc', '[abc}', '[abc}', '[abc', '[ab', '[a', '[', '', '', '', '{', '{', '', '[', '[a', '[ae', '[aei', '[aeio', '[aeiou', '[aeiou', '[aeiou]'], 101819 ),
			new Step(['.'], 22016 ),
			new Step(['.', '.*'], 29594 ),
			new Step(['.', '.*', '.*', '.', '', '.', '.*', '.*', '.*f', '.*fl', '.*flo', '.*flow', '.*flowe', '.*flower', '.*flowers'], 59020 ),
			new Step(['.', '.*', '.*', '.*o', '.*on', '.*ong'], 20656 ),
			new Step(['a', 'ap', 'app', 'appl', 'apple', 'apple\\', 'apple', 'apple|', 'apple|', '|', 'b|', 'bi|', 'bir|', 'bird|', 'bird|s', 'bird|si', 'bird|sin', 'bird|sing', 'bird|sing|', 'bird|sing|', 'bird|sing|c', 'bird|sing|ca', 'bird|sing|cag', 'bird|sing|cage', 'bird|sing|caged'], 61950 ),
			new Step(['\\', '\\.', '\\..', '\\...', '\\....', '\\.....', '\\......', '\\.......', '\\........', '', '\\', '\\.', '\\', '', '\\', '\\\\', '\\\\.', '\\\\', '\\', '', '', '\\', '\\.', '\\..', '\\.', '\\', '', '', '', '\\', '\\.', '\\.\\', '\\.\\.'], 131865 ),
			new Step(['[', '[', '[A', '[A', '[A-', '[A-', '[A-Z', '[A-Z}', '[A-Z}', '[A-Z', '[A-Z]'], 24992 ),
			new Step(['\\', '\\A', '', '', '[', '[', '[A', '[A-', '[A-Z', '[A-Z]', '[A-Z]', '[A-Z]', '[A-Z]', '[A-Z]', '[A-Z][', '[A-Z][A', '[A-Z][A-', '[A-Z][A-Z', '[A-Z][A-Z]', '[A-Z][A-Z', '[A-Z][A-', '[A-Z][A', '[A-Z][', '[A-Z]', '[A-Z', '[A-', '[A', '[', '', '', '', '', '', '[', '[A', '[A-', '[A-Z', '[A-Z]', '[A-Z]', '[A-Z]\\', '[A-Z]\\w', '[A-Z]\\w\\', '[A-Z]\\w\\w', '[A-Z]\\w\\w\\', '[A-Z]\\w\\w\\w', '[A-Z]\\w\\w\\w\\', '[A-Z]\\w\\w\\w\\w', '[A-Z]\\w\\w\\w\\w\\', '[A-Z]\\w\\w\\w\\w\\w', '[A-Z]\\w\\w\\w\\w\\w\\', '[A-Z]\\w\\w\\w\\w\\w\\w', '[A-Z]\\w\\w\\w\\w\\w\\w\\', '[A-Z]\\w\\w\\w\\w\\w\\w\\w', '[A-Z]\\w\\w\\', '[A-Z]\\w\\w', '[A-Z]\\w\\', '[A-Z]\\w', '[A-Z]\\w.', '[A-Z]\\w', '[A-Z]\\w*'], 135411 ),
			new Step(['(', '(', '(a', '(ab', '(abc', '(abc', '(abc)', '(abc)', '(abc)\\', '(abc)', '(abc)|', '(abc)|', '(abc)|(', '(abc)|(', '(abc)|(d', '(abc)|(de', '(abc)|(def', '(abc)|(def)', '(abc)|(def)', '', '', '', '', '', '', '', '', "'", "'a", "'ab", "'abcv", "'abcv", "'abc", "'abc'", "'abc' ", '', '(', '(', '(s', '(so', '(soc', '(socr', '(socrA', '(socrA', '(socrAT', '(socrA', '(socr', '(socr', '(socra', '(socrat', '(socrate', '(socrates', '(socrates', '(socrates', '(socrates)', '(socrates)', '(socrates', '', '\\', '\\d', '\\', '', '', '', '', '(', '(', '(s', '(so', '(so)', '(so)', '(so)|', '(so)|', '(so)|(', '(so)|(', '(so)|(ce', '(so)|(ce', '(so)|(ce0', '(so)|(ce', '(so)|(ce)', '(so)|(ce)', '(so)|(ce', '(so)|(c', '(so)|(', '(so)|', '(so)', '(so', '(sop', '(soph', '(soph)', '(soph)', '(soph)\\', '(soph)\\', '(soph)', '(soph)|', '(soph)|', '(soph)|(', '(soph)|(', '(soph)|(c', '(soph)|(ce', '(soph)|(cep', '(soph)|(ceph', '(soph)|(ceph)', '(soph)|(ceph)', '(s', '(', '', '', '', '(', '(', '(o', '(os', '(os ', '(os', '(o', '(o', '(oO', '(oO', '(oOs', '(oO', '(o', '(', '(', '(O', '(O', '(Os', '(Osc', '(Osc)', '(Osc)', '(Osc)|', '(Osc)|', '(Osc)', '(Osc)\\', '(Osc)', '(Osc)|', '(Osc)|', '(Osc)|9', '(Osc)|9', '(Osc)|', '(Osc)|(', '(Osc)|(', '(Osc)|(R', '(Osc)|(RA', '(Osc)|(RAT', '(Osc)|(RA', '(Osc)|(R', '(Osc)|(', '', '9', '', '(', '(', '(O', '(', '(O', '(OS', '(O', '(O', '(Os', '(Os', '(Os', '(Osc', '(Osc)', '(Osc)', '(Osc)|', '(Osc)|', '(Osc)|(', '(Osc)|(', '(Osc)|(s', '(Osc)|(sc', '(Osc)|(sco', '(Osc)|(sco)', '(Osc)|(sco)', '(Osc)|(sco', '(Osc)|(sc', '(Osc)|(sc', '(Osc)|(sc0', '(Osc)|(sc0', '(Osc)|(sc', '(Osc)|(sc', '(Osc)|(scO', '(Osc)|(scO', '(Osc)|(scO', '(Osc)|(scO', '(Osc)|(scO)', '(Osc)|(scO)', '', '9', '', '(', '(', '(', '(S', '(S', '(Sc', '(Sco', '(Sco)', '(Sco)', '(Sco)|'], 984505 )
		]),
		new Session([
			new Step(['1', '12', '123', '1234', '12345'], 164849 ),
			new Step(['a', 'ap', 'app', 'appl', 'apple'], 9732 ),
			new Step(['d', 'd\\', 'd', '', '\\', '\\d'], 25835 ),
			new Step(['\\', '\\D'], 4672 ),
			new Step(['\\', '\\d', '\\d\\', '\\d\\d'], 7483 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{3', '\\d{3}', '\\d{3}', '\\d{}', '\\d{65}', '\\d{65}', '\\d{65', '\\d{6', '\\d{65', '\\d{6', '\\d{', '\\d{5', '\\d{5}'], 86882 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{2', '\\d{2,', '\\d{2,45', '\\d{2,45', '\\d{2,4', '\\d{2,4}'], 13644 ),
			new Step(['[', '[a', '[ab', '[abc', '[abc]', '[abc', '[ab', '[a', '[ae', '[aei', '[aeio', '[aeiou', '[aeiou}', '[aeiou}', '[aeiou', '[aeio', '[aei', '[ae', '[a', '[ae', '[aei', '[aeio', '[aeiou', '[aeiou]'], 27289 ),
			new Step(['as', 'as', 'a', '', 'A', 'A', 'A', 'AA', 'A', 'A', 'As', 'As ', 'As l', 'As li', 'As lit', 'As litt', 'As littl', 'As little', 'As little ', 'As little f', 'As little fl', 'As little flo', 'As little flow', 'As little flowe', 'As little flower', 'As little flowers', 'As little flowers,', 'As little flowers, ', 'As little flowers, w', 'As little flowers, wh', 'As little flowers, whi', 'As little flowers, whic', 'As little flowers, which', 'As little flowers, which ', 'As little flowers, which t', 'As little flowers, which th', 'As little flowers, which the', 'As little flowers, which the ', 'As little flowers, which the c', 'As little flowers, which the ch', 'As little flowers, which the chi', 'As little flowers, which the chil', 'As little flowers, which the chill', 'As little flowers, which the chill ', 'As little flowers, which the chill o', 'As little flowers, which the chill of', 'As little flowers, which the chill of ', 'As little flowers, which the chill of n', 'As little flowers, which the chill of ni', 'As little flowers, which the chill of nig', 'As little flowers, which the chill of nigh', 'As little flowers, which the chill of night', 'As little flowers, which the chill of night ', 'As little flowers, which the chill of night h', 'As little flowers, which the chill of night ha', 'As little flowers, which the chill of night has', 'As little flowers, which the chill of night has ', 'As little flowers, which the chill of night has b', 'As little flowers, which the chill of night has be', 'As little flowers, which the chill of night has bee', 'As little flowers, which the chill of night has been', 'As little flowers, which the chill of night has bee', 'As little flowers, which the chill of night has be', 'As little flowers, which the chill of night has ben', 'As little flowers, which the chill of night has bent', 'As little flowers, which the chill of night has bent ', 'As little flowers, which the chill of night has bent a', 'As little flowers, which the chill of night has bent an', 'As little flowers, which the chill of night has bent and', 'As little flowers, which the chill of night has bent and ', 'As little flowers, which the chill of night has bent and h', 'As little flowers, which the chill of night has bent and hu', 'As little flowers, which the chill of night has bent and hud', 'As little flowers, which the chill of night has bent and hudd', 'As little flowers, which the chill of night has bent and huddl', 'As little flowers, which the chill of night has bent and huddle', 'As little flowers, which the chill of night has bent and huddled', 'As little flowers, which the chill of night has bent and huddled,', 'As little flowers, which the chill of night has bent and huddled, ', 'As little flowers, which the chill of night has bent and huddled, w', 'As little flowers, which the chill of night has bent and huddled, wh', 'As little flowers, which the chill of night has bent and huddled, whe', 'As little flowers, which the chill of night has bent and huddled, when', 'As little flowers, which the chill of night has bent and huddled, when ', 'As little flowers, which the chill of night has bent and huddled, when t', 'As little flowers, which the chill of night has bent and huddled, when th', 'As little flowers, which the chill of night has bent and huddled, when the', 'As little flowers, which the chill of night has bent and huddled, when the ', 'As little flowers, which the chill of night has bent and huddled, when the w', 'As little flowers, which the chill of night has bent and huddled, when the wh', 'As little flowers, which the chill of night has bent and huddled, when the whi', 'As little flowers, which the chill of night has bent and huddled, when the whit', 'As little flowers, which the chill of night has bent and huddled, when the white', 'As little flowers, which the chill of night has bent and huddled, when the white ', 'As little flowers, which the chill of night has bent and huddled, when the white s', 'As little flowers, which the chill of night has bent and huddled, when the white su', 'As little flowers, which the chill of night has bent and huddled, when the white sun', 'As little flowers, which the chill of night has bent and huddled, when the white sun ', 'As little flowers, which the chill of night has bent and huddled, when the white sun s', 'As little flowers, which the chill of night has bent and huddled, when the white sun st', 'As little flowers, which the chill of night has bent and huddled, when the white sun str', 'As little flowers, which the chill of night has bent and huddled, when the white sun stri', 'As little flowers, which the chill of night has bent and huddled, when the white sun strik', 'As little flowers, which the chill of night has bent and huddled, when the white sun strike', 'As little flowers, which the chill of night has bent and huddled, when the white sun strikes', 'As little flowers, which the chill of night has bent and huddled, when the white sun strikes ', 'As little flowers, which the chill of night has bent and huddled, when the white sun strikes \\', 'As little flowers, which the chill of night has bent and huddled, when the white sun strikes ', 'As little flowers, which the chill of night has bent and huddled, when the white sun strikes', 'As little flowers, which t'], 160434 ),
			new Step(['.', '.*'], 8534 )
		]),
		new Session([
			new Step(['', 'I', 'I', 'It', "It'"], 117412 ),
			new Step(['a', 'ap', 'app', 'appl', 'apple'], 22822 ),
			new Step(['\\', '\\d'], 60926 ),
			new Step(['\\', '\\D'], 23345 ),
			new Step(['\\', '\\d', '\\d\\', '\\d\\d'], 40874 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{3', '\\d{3}', '\\d{3}', '\\d{3', '\\d{', '\\d{5', '\\d{5}'], 56800 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{2', '\\d{2,', '\\d{2,4', '\\d{2,4}'], 31727 ),
			new Step(['{', '{', '', '[', '[a', '[ae', '[aei', '[aeio', '[aeiou', '[aeiouy', '[aeiouy', '[aeiouy]', '[aeiouy', '[aeiou', '[aeiou]'], 57010 ),
			new Step(['.'], 12891 ),
			new Step(['.', '.*'], 22899 )
		]),
		new Session([
			new Step(['1', '12', '123', '1234', '12345'], 32809 ),
			new Step(['a', 'ap', 'app', 'appl', 'apple'], 8381 ),
			new Step(['|', '|', '|df', '|df', '|d', '|', '', '\\', '\\d'], 44789 ),
			new Step(['\\', '\\D'], 6509 ),
			new Step(['\\d', '\\d ', '\\d \\', '\\d \\d', '\\d \\', '\\d ', '\\d', '\\d\\', '\\d\\d'], 15188 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{3', '\\d{3}', '\\d{3}', '\\d {3}', '\\d{3}', '', '', '\\', '\\d', '\\d{', '\\d{', '\\d{3', '\\d{3}', '\\d{3}', '\\d{3} ', '\\d{3}', '\\d{3', '\\d{', '\\d', '\\', '', '', '\\', '\\d', '\\d{', '\\d{', '\\d{5', '\\d{5}'], 102318 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{4', '\\d{', '\\d{2', '\\d{2,', '\\d{2,4', '\\d{2,4}'], 19346 ),
			new Step(['{', '{', '', '[', '[a', '[ae', '[aei', '[aeio', '[aeiou', '[aeiou]'], 78713 ),
			new Step(['.'], 20512 )
		]),
		new Session([
			new Step(['y', '', '0', '', '87'], 26492 ),
			new Step(['a', 'ap', 'app', 'appl', 'apple'], 14838 ),
			new Step(['/', '/d', '/', '', '', '\\', '\\d'], 16576 ),
			new Step(['', '', '', '\\', '\\D'], 9017 ),
			new Step(['\\', '\\d', '\\d\\', '\\d\\d'], 10609 )
		]),
		new Session([
			new Step(['rf', 'rf', 'r', '', ''], 5764 ),
			new Step(['a', 'ap', 'app', 'appl', 'apple'], 5929 ),
			new Step(['', '\\', '\\d'], 5330 ),
			new Step(['D', 'D', '', '\\', '\\D'], 6585 ),
			new Step(['', '', '|', '|', '', '\\', '\\', '\\d', '\\d\\', '\\d\\d'], 12061 )
		]),
		new Session([
			new Step(['9', '90', '905', '9056', '905'], 24034 ),
			new Step(['a', 'ap', 'app', 'appl', 'apple'], 7624 ),
			new Step(['/', '/d', '/', '', '\\', '\\d'], 16048 ),
			new Step(['\\', '\\D'], 6640 ),
			new Step(['\\', '\\d', '\\d\\', '\\d\\d'], 9457 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{3', '\\d{3}', '\\d{3}', '\\d{}', '\\d{5}'], 42915 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{4', '\\d{4,', '\\d{4,6', '\\d{4,6}', '\\d{4,6}', '\\d{4,}', '\\d{4}', '\\d{}', '\\d{2}', '\\d{2,}', '\\d{2,4}'], 26884 ),
			new Step(['{', '{', '', '[', '[a', '[ae', '[aei', '[aeio', '[aeiou', '[aeiou}', '[aeiou}', '[aeiou', '[aeiou]'], 20423 ),
			new Step(['.'], 10354 ),
			new Step(['.', '.*'], 21594 )
		]),
		new Session([
			new Step(['d', 'das', 'das', 'da', 'd'], 5154 ),
			new Step(['a', 'ap', 'a', '', 'q', 'qp', 'q', '', 'a', 'ap', 'app', 'apple'], 5201 ),
			new Step(['\\', '\\d'], 2055 ),
			new Step(['\\', '\\D'], 7776 ),
			new Step(['\\', '\\d', '\\d\\', '\\d\\d'], 5508 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{5', '\\d{5}'], 8111 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{2', '\\d{2,', '\\d{2,4', '\\d{2,4}'], 9927 ),
			new Step(['{', '{', '', '[', '[a', '[ae', '[aei', '[aeio', '[aeiou', '[aeiou]'], 9034 ),
			new Step(['.'], 2855 ),
			new Step(['.', '.', '.8', '.', '.*'], 1894 ),
			new Step(['.', '.*', '.*', '.*fl', '.*fl', '.*flo', '.*flow', '.*flower', '.*flower', '.*flowers'], 9179 ),
			new Step(['', '.', '.*', '.*', '.*o', '.*on', '.*ong'], 7318 ),
			new Step(['b', 'bi', 'bir', 'bird', 'bird|', 'bird|', 'bird|s', 'bird|su', 'bird|sub', 'bird|su', 'bird|s', 'bird|siu', 'bird|siu', 'bird|si', 'bird|sib', 'bird|sibg', 'bird|sib\\', 'bird|sib\\', 'bird|sib', 'bird|si', 'bird|sin', 'bird|sing', 'bird|sing|', 'bird|sing|', 'bird|sing|c', 'bird|sing|ca', 'bird|sing|cag', 'bird|sing|cage', 'bird|sing|caged'], 14129 ),
			new Step(['\\', '\\.', '\\..', '\\.', '\\', '', '.', '..', '.', '', '', '', '\\', '\\.', '\\.\\', '\\.\\.'], 27688 ),
			new Step(['', '', '[', '[a', '[a', '[', '[A', '[A', '[A-', '[A-z', '[A-', '[A-Z', '[A-Z', '[A-Z]'], 11174 ),
			new Step(['-', '-D', '-D', '-', '', '', '\\', '\\D', '\\D', '\\D\\', '\\D\\\\', '\\D\\', '\\D\\', '\\D\\[', '\\D\\[', '\\D\\[', '\\D\\[', '\\D\\[', '\\D\\[', '\\D\\[', '\\D\\[\\', '\\D\\[', '\\D\\', '\\D\\A', '\\D\\A', '\\D\\', '\\D\\a', '\\D\\', '\\D', '\\D{', '\\D{', '\\D', '\\D[', '\\D[A', '\\D[A', '\\D[A-', '\\D[A-Z', '\\D[A-Z', '\\D[A-Z]', '\\D[A-Z]', '.\\D[A-Z]', '\\D[A-Z]', '*\\D[A-Z]', '*\\D[A-Z]', '\\D[A-Z]', '.\\D[A-Z]', '.*\\D[A-Z]', '.*\\D[A-Z]', '.\\D[A-Z]', '\\D[A-Z]', '\\D[A-Z', '\\D[A-', '\\D[A', '\\D[', '\\D', '\\', '', '', '', '.', '.*', '.*', '.*', '.*[', '.*[A', '.*[AB', '.*[ABC', '.*[ABCD', '.*[ABCD', '.*[ABCD]', '.*[ABCD', '.*[ABC', '.*[AB', '.*[A', '.*[', '.*', '.', '', '', '8', '', '*', '*', '*[', '*[D', '*[D', '*[D]', '*[D] ', '*[D]', '*[D', '*[', '*', '', '.', '.D', '.D', '.', '.*', '.*', '.*D', '.*D', '.*D\\', '.*D', '.*', '.', '', '.', '.*', '.*', '.', '', '[', '[A', '[A', '[A-', '[A-Z', '[A-Z', '[A-Z]', '[A-Z].', '[A-Z].*', '[A-Z].*', '[A-Z].', '[A-Z]', '[A-Z]\\w', '[A-Z]\\w', '[A-Z]\\w.', '[A-Z]\\w.*', '[A-Z]\\w.*', '[A-Z]\\w.', '[A-Z]\\w', '[A-Z]\\', '[A-Z]\\w', '[A-Z]\\w*'], 196347 ),
			new Step(['(sc)|(Sco)rates', '(Osc)|(Sco)rates'], 271 )
		]),
		new Session([
			new Step(['b', '', '1', '12', '123'], 246245 ),
			new Step(['a', 'ap', 'appl', 'appl', 'apple'], 10354 ),
			new Step(['/', '/d', '/', '', '7', '', '4', '43', '4', '', '3', '', '|', '|', '', '\\', '\\d'], 97854 ),
			new Step(['\\', '\\', '\\D'], 11218 ),
			new Step(['\\', '\\d', '\\d\\', '\\d\\d'], 18413 ),
			new Step(['\\', '\\d', '\\d[', '\\d', '\\d{', '\\d{', '\\d{3', '\\d{3}', '\\d{3}', '\\d{3', '\\d{', '\\d', '\\', '', '\\', '\\d', '\\d{', '\\d{', '\\d{3', '\\d{3}', '\\d{3}', '', '{', '{', '{}', '{}', '{', '{3', '{3}', '{3}', '', '2', '23', '232', '2324', '23249', '', '4', '49', '492', '4929', '492932', '492932', '', '\\', '\\d', '\\d{', '\\d{', '\\d{5', '\\d{5}'], 104968 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{2', '\\d{2,', '\\d{2,4', '\\d{2,4}'], 26699 ),
			new Step(['', '[', '[a', '[ab', '[abc', '[abc]', '[abc', '[ab', '[a', '[', '[a', '[ad', '[adn', '[ad', '[a', '[ab', '[abc', '[abc', '[abc]', '[abc', '[ab', '[a', '[aei', '[aeio', '[aeiou', '[aeiou', '[aeiou', '[aeiou]'], 125491 ),
			new Step(['.'], 9057 ),
			new Step(['.', '.*'], 43249 )
		]),
		new Session([
			new Step(['1', '12', '123', '12312', '12312'], 18993 ),
			new Step(['a', 'ap', 'app', 'appl', 'apple'], 4254 ),
			new Step(['', '\\', '\\d'], 4010 ),
			new Step(['\\', '\\D'], 5027 ),
			new Step(['\\', '\\', '\\d', '\\d\\', '\\d\\', '\\d\\d'], 11025 ),
			new Step(['', '\\', '\\d', '\\d\\', '\\d\\d', '\\d\\d\\', '\\d\\d\\d', '\\d\\d\\d\\', '\\d\\d\\d\\d', '\\d\\d\\d\\d\\', '\\d\\d\\d\\d\\d', '\\d\\d\\d\\d\\d\\', '\\d\\d\\d\\d\\d\\d', '\\d\\d\\d\\d\\d\\', '\\d\\d\\d\\d\\d', '\\d\\d\\d\\d\\d(', '\\d\\d\\d\\d\\d(', '\\d\\d\\d\\d\\d', '\\d\\d\\d\\d\\d{', '\\d\\d\\d\\d\\d{', '\\d\\d\\d\\d\\d{3', '\\d\\d\\d\\d\\d{3}', '\\d\\d\\d\\d\\d{3}', '\\d\\d\\d\\d\\d{3}', '\\d\\d\\d\\d\\d{3}', '\\d\\d\\d\\d\\d{3}', '\\d\\d\\d\\d\\d{3}', '\\d\\d\\d\\d\\d{3}', '\\d\\d\\d\\d\\d{3}', '\\d\\d\\d\\d\\d{3}', '\\d\\d\\d\\d\\d{3}', '\\d\\d\\d\\d\\d{3}', '\\d\\d\\d\\d\\d{}', '\\d\\d\\d\\d\\d{5}', '\\d{5}'], 69064 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{2', '\\d{2-', '\\d{2-4', '\\d{2-4}', '\\d{2-4}', '\\d{2-4}', '\\d{2-4}', '\\d{2-4}', '\\d{2-4}', '\\d{24}', '\\d{2,4}'], 39632 ),
			new Step(['', 'A', 'A', '', '{', '{', '{[', '{', '', '[', '[a', '[a]', '[a', '[', '[A', '[A', '[A,', '[A,a', '[A,a,', '[A,a,E', '[A,a,E', '[A,a,', '[A,a,e', '[A,a,e,', '[A,a,e,i', '[A,a,e,i,', '[A,a,e,i,o', '[A,a,e,i,o,', '[A,a,e,i,o,u', '[A,a,e,i,o,u,', '[A,a,e,i,o,u,y', '[A,a,e,i,o,u,y', '[A,a,e,i,o,u,y]', '[A,a,e,i,o,u,y]', '[A,a,e,i,o,u,]', '[A,a,e,i,o,u]', '[A,a,e,i,o,u]', '[A,a,e,i,o,u]', '[A,a,e,i,o,u]', '[A,a,e,i,o,u]', '[A,a,e,i,o,u]', '[A,a,e,Ei,o,u]', '[A,a,e,Ei,o,u]', '[A,a,e,i,o,u]', '[A,a,e,i,o,u]', '[A,a,e,i,o,u]', '[A,a,Ee,i,o,u]', '[A,a,Ee,i,o,u]', '[A,a,E,e,i,o,u]', '[A,a,E,e,i,o,u]', '[A,a,E,e,i,o,u]', '[A,a,E,e,i,o,u]', '[A,a,E,e,i,o,u]', '[A,a,E,e,i,o,u]', '[A,a,E,e,i,o,u]', '[A,a,E,e,i,o,u]', '[A,a,E,e,i,o,u]', '[A,a,E,e,i,o,u]', '[A,a,E,e,Ii,o,u]', '[A,a,E,e,Ii,o,u]', '[A,a,E,e,I,i,o,u]', '[A,a,E,e,I,i,o,u]', '[A,a,E,e,I,i,o,u]', '[A,a,E,e,I,i,o,u]', '[A,a,E,e,I,i,o,u]', '[A,a,E,e,I,i,o,u]', '[A,a,E,e,I,i,Oo,u]', '[A,a,E,e,I,i,Oo,u]', '[A,a,E,e,I,i,O,o,u]', '[A,a,E,e,I,i,O,o,u]', '[A,a,E,e,I,i,O,o,u]', '[A,a,E,e,I,i,O,o,uu]', '[A,a,E,e,I,i,O,o,uu]', '[A,a,E,e,I,i,O,o,u<u]', '[A,a,E,e,I,i,O,o,u<u]', '[A,a,E,e,I,i,O,o,uu]', '[A,a,E,e,I,i,O,o,u,u]', '[A,a,E,e,I,i,O,o,u,u]', '[A,a,E,e,I,i,O,o,,u]', '[A,a,E,e,I,i,O,o,U,u]', '[A,a,E,e,I,i,O,o,U,u]', '[A,a,E,e,I,i,O,o,U,u]', '[A,a,E,e,I,i,O,o,U,u]', '[A,a,E,e,I,i,O,o,U,u,]', '[A,a,E,e,I,i,O,o,U,u,U]', '[A,a,E,e,I,i,O,o,U,u,U]', '[A,a,E,e,I,i,O,o,U,u,]', '[A,a,E,e,I,i,O,o,U,u,Y]', '[A,a,E,e,I,i,O,o,U,u,Y]', '[A,a,E,e,I,i,O,o,U,u,Y,]', '[A,a,E,e,I,i,O,o,U,u,Y,Y]', '[A,a,E,e,I,i,O,o,U,u,Y,Y]', '[A,a,E,e,I,i,O,o,U,u,Y,]', '[A,a,E,e,I,i,O,o,U,u,Y,y]', '[A,a,E,e,I,i,O,o,U,u,Y,]', '[A,a,E,e,I,i,O,o,U,u,Y]', '[A,a,E,e,I,i,O,o,U,u,]', '[A,a,E,e,I,i,O,o,U,u]', '[A,a,E,e,I,i,O,o,U,u]', '[A,a,E,e,I,i,O,o,Uu]', '[A,a,E,e,I,i,O,o,Uu]', '[A,a,E,e,I,i,O,o,Uu]', '[A,a,E,e,I,i,O,o,Uu]', '[A,a,E,e,I,i,O,oUu]', '[A,a,E,e,I,i,O,oUu]', '[A,a,E,e,I,i,OoUu]', '[A,a,E,e,I,i,OoUu]', '[A,a,E,e,I,i,\\OoUu]', '[A,a,E,e,I,i,OoUu]', '[A,a,E,e,I,iOoUu]', '[A,a,E,e,I,iOoUu]', '[A,a,E,e,IiOoUu]', '[A,a,E,e,IiOoUu]', '[A,a,E,eIiOoUu]', '[A,a,E,eIiOoUu]', '[A,a,E,eIiOoUu]', '[A,a,E,eIiOoUu]', '[A,a,EeIiOoUu]', '[A,a,EeIiOoUu]', '[A,a,EeIiOoUu]', '[A,a,EeIiOoUu]', '[A,aEeIiOoUu]', '[A,aEeIiOoUu]', '[A,aeIiOoUu]', '[A,aeIiOoUu]', '[A,aeIiOoUu]', '[A,aeIiOoUu]', '[A,aeIiOoUu]', '[A,aeiOoUu]', '[A,aeiOoUu]', '[A,aeiOoUu]', '[A,aeioUu]', '[A,aeioUu]', '[A,aeioUu]', '[A,aeiou]', '[A,aeiou]', '[A,aeiou]', '[A,aeiou]', '[A,aeiou]', '[Aaeiou]', '[aeiou]'], 219587 ),
			new Step(['.'], 7187 ),
			new Step(['.', '.*'], 30840 ),
			new Step(['.', '.*', '.*', '.*n', '.*ni', '.*nig', '.*nigh', '.*nightr', '.*nightr', '.*night', '.*nigh', '.*nig', '.*ni', '.*n', '.*', '.', '.*', '.*', '.*f', '.*fl', '.*flo', '.*flow', '.*flowe', '.*flower', '.*flower ', '.*flower', '.*flower', '.*flower', '.*flowers'], 55428 ),
			new Step(['.', '.*', '.*', '.*t', '.*ti', '.*tio', '.*tion', '.*tion', '.*tion', '.*tion', '.*tion', '.*tion', '.*tion', '.*tion', '.*tion', '.*tion', '.*tion', '.*tion', '.*tio', '.*ti', '.*t', '.*', '.*o', '.*on', '.*onf', '.*on', '.*ong'], 58252 ),
			new Step(['b', 'bi', 'bir', 'bird', 'bird|', 'bird|', 'bird|s', 'bird|si', 'bird|sin', 'bird|sinf', 'bird|sin', 'bird|sing', 'bird|sing\\', 'bird|sing', 'bird|sing|', 'bird|sing|', 'bird|sing|c', 'bird|sing|ca', 'bird|sing|cag', 'bird|sing|cage', 'bird|sing|caged'], 30963 ),
			new Step([',', '', "'", "'.", "'.'", "'.", "'", '', '\\', '\\.', '\\..', '\\.', '\\.\\', '\\.\\.'], 72834 ),
			new Step(['\\', '\\-', '\\-\\', '\\-', '\\', '', '', '', '{', '{', '', '[', '[a', '[a-', '[a-z', '[a-', '[a', '[', '[A', '[A', '[A-', '[A-z', '[A-z)', '[A-z)', '[A-z', '[A-z]', '[A-z', '[A-', '[A-}', '[A-}', '[A-', '[A-Z', '[A-Z', '[A-Z}', '[A-Z}', '[A-Z}', '[A-Z}', '[AZ}', '[A-Z}', '[AZ}', '[A_Z}', '[A_Z}', '[AZ}', '[A-Z}', '[A-Z}', '[A-Z}', '[A-Z', '[A-Z]'], 140450 ),
			new Step(['9', '', '(', '(', '', '[', '[A', '[A', '[A-', '[A-Z', '[A-Z', '[A-Z]', '[A-Z]', '[A-Z]', '[A-Z]\\', '[A-Z]\\w', '[A-Z]\\w*'], 75277 ),
			new Step(['sd', 'sd', 's', '', '', '(', '(', '(s', '(so', '(soc', '(socr', '(socra', '(socrat', '(socrate', '(socrates', '(socrates)', '(socrates)', '(socrates)\\', '(socrates)', '(socrates)|', '(socrates)|', '(socrates)|d', '(socrates)|de', '(socrates)|des', '(socrates)|de', '(socrates)|ded', '(socrates)|de', '(socrates)|def', '(socrates)|def', '(socrates)|def', '(socrates)|def', '(socrates)|def', '(socrates)|(def', '(socrates)|(def', '(socrates)|(def', '(socrates)|(def', '(socrates)|(def', '(socrates)|(def', '(socrates)|(def)', '(socrates)|(def)', '(socrates)|(def)', '(socrates)|(def)', '(socrates)|(def)', '(socrates)|(def)', '(socrates)|(def)', '(socrates)|(def)', '(socrates)|(def)', '(socrates)|(def)', '(socrates)|(def)', '(socrates)|(def)*', '(socrates)|(def)*', '(socrates)|(def)', '(socrates)|(def', '(socrates)|(de', '(socrates)|(d', '(socrates)|(', '(socrates)|', '(socrates)', '(socrates', '(socrate', '(socrat', '(socra', '(socr', '(soc', '(so', '(s', '(', '(0', '(', '(S', '(S', '(So', '(Soc', '(Socr', '(Socra', '(Socrat', '(Socrate', '(Socrates', '(Socrates)', '(Socrates)', '(Socrates)|', '(Socrates)|', '(Socrates)|(', '(Socrates)|(', '(Socrates)|', '(Socrates)|s', '(Socrates)|so', '(Socrates)|s', '(Socrates)|', '(Socrates)|(', '(Socrates)|(', '(Socrates)|(s', '(Socrates)|(so', '(Socrates)|(soc', '(Socrates)|(socr', '(Socrates)|(soc', '(Socrates)|(soc', '(Socrates)|(soc', '(Socrates)|(oc', '(Socrates)|(Soc', '(Socrates)|(Soc', '(Socrates)|(Soc', '(Socrates)|(Socr', '(Socrates)|(Soc', '(Socrates)|(So', '(Socrates)|(S', '(Socrates)|(Sc', '(Socrates)|(Sco', '(Socrates)|(Scor', '(Socrates)|(Scora', '(Socrates)|(Scorat', '(Socrates)|(Scorate', '(Socrates)|(Scorates', '(Socrates)|(Scorates)', '(Socrates)|(Scorates)', '|(Scorates)', '(Scorates)', '(Scorates)|', '(Scorates)|', '(Scorates)|C', '(Scorates)|C', '(Scorates)|C', '(Scorates)|(C', '(Scorates)|(C', '(Scorates)|(C', '(Scorates)|(Cs', '(Scorates)|(Cso', '(Scorates)|(Csor', '(Scorates)|(Csor', '(Scorates)|(Csor', '(Scorates)|(Csor', '(Scorates)|(Cso', '(Scorates)|(Cs', '(Scorates)|(C', '(Scorates)|(', '(Scorates)|(O', '(Scorates)|(O', '(Scorates)|(', '(Scorates)|(O', '(Scorates)|(O', '(Scorates)|(Os', '(Scorates)|(Osc', '(Scorates)|(Oscr', '(Scorates)|(Oscra', '(Scorates)|(Oscrat', '(Scorates)|(Oscrate', '(Scorates)|(Oscrates', '(Scorates)|(Oscrates)', '(Scorates)|(Oscrates)', '(Scorates)|(scrates)', '(Scorates)|(Oscrates)', '(Scorates)|(Oscrates)', '(Scorates)|(scrates)', '(Scorates)|(Oscrates)', '(Scorates)|(Oscrates)', '(Scorates)|(Oscr)', '(Sco)|(Oscr)', '(Sco)|(Oscr)', '(Sco)|(Oscr)', '(Sco)|(Oscr)', '(Sco)|(Oscr)', '(Sco)|(Oscr)', '(Sco)|(Oscr)', '(Sco)|(Oscr)', '(Sco)|(Osc)', '(Sco)|(Osc)', '(Sco)|(Osc)', '(Sco)|(Osc)r', '(Sco)|(Osc)ra', '(Sco)|(Osc)rat', '(Sco)|(Osc)rate', '(Sco)|(Osc)rates'], 716628 )
		]),
		new Session([
			new Step(['1', '12', '123', '1234', '12345'], 52647 ),
			new Step(['pple', '', 'a', 'ap', 'app', 'appl', 'apple'], 3697 ),
			new Step(['|', '|', '', '\\', '', '|', '|', '', '\\', '\\d'], 11951 ),
			new Step(['\\', '\\D'], 18908 ),
			new Step(['\\', '\\d', '\\d\\', '\\d\\d'], 18180 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{5', '\\d{5}'], 9682 ),
			new Step(['\\', '\\d', '\\d[', '\\d', '\\d{', '\\d{', '\\d{2', '\\d{2,', '\\d{2,4', '\\d{2,4}'], 19037 ),
			new Step(['[', '[a', '[ae', '[aei', '[aeio', '[aeiou', '[aeiou', '[aeiou]'], 38813 ),
			new Step(['.'], 9923 ),
			new Step(['.', '.*'], 16049 ),
			new Step(['.', '.', '.8', '.', '.8', '.', '.*', '.*', '.*f', '.*fl', '.*flow', '.*flowe', '.*flowe', '.*flower', '.*flowers'], 16081 ),
			new Step(['go', 'gon', 'gon', 'gong', 'gongti', 'gongtio', 'gongtion', 'gongtion', 'gongtion================', 'gongtion================', '', 'g', 'gon', 'gong', 'gong', 'gong.', 'gong.ti', 'gong.tio', 'gong.tion', 'gong.tion', 'gong.tion ', '', 'go', 'gon', 'gong', 'gong', 'gong ', 'gong', '', 't', '=', '=', '=y', '=', '', 'y', 'ye', 'yea', 'year', 'yearl', 'yearlon', 'yearlong', 'yearlong', 'yearlong ', 'yearlong', '', '', '.', '.*', '.*', '.*on', '.*ong'], 345205 ),
			new Step(['|', '|', '', 'b', 'bi', 'bir', 'bird', 'bird|', 'bird|', 'bird|s', 'bird|sin', 'bird|sin', 'bird|sing', 'bird|sing|', 'bird|sing|', 'bird|sing|c', 'bird|sing|cag', 'bird|sing|cag', 'bird|sing|caged'], 34502 ),
			new Step(['\\', '\\', '\\.', '\\.\\', '\\.\\.'], 1617 ),
			new Step(['[', '[A', '[A', '[A-', '[A-Z', '[A-Z', '[A-Z]'], 19336 ),
			new Step(['', 'A', 'A', '', '', '[', '[A', '[A', '[A-', '[A-Z', '[A-Z', '[A-Z}', '[A-Z}', '[A-Z', '[A-Z]', '[A-Z]|', '[A-Z]|', '[A-Z]|w', '[A-Z]|', '[A-Z]', '[A-Z]\\', '[A-Z]\\w', '[A-Z]\\w*'], 92404 ),
			new Step(['(', '(', '(s', '(so', '(s', '(', '(S', '(So', '(So', '(Soc', '(Socr', '(Socra', '(Socrat', '(Socrate', '(Socrates', '(Socrates|', '(Socrates|', '(Socrates', '(Socrates)', '(Socrates)', '(Socrates)|', '(Socrates)|', '(Socrates)|(', '(Socrates)|(', '(Socrates)|(O', '(Socrates)|(O', '(Socrates)|(Os', '(Socrates)|(Osc', '(Socrates)|(Oscr', '(Socrates)|(Oscra', '(Socrates)|(Oscrate', '(Socrates)|(Oscrate', '(Socrates)|(Oscrates', '(Socrates)|(Oscrates)', '(Socrates)|(Oscrates)', '(Socrates)|(Osc', '(Socrates)|(Os', '(Socrates)|(O', '(Socrates)|(', '(Socrates)|(S', '(Socrates)|(S', '(Socrates)|(So', '(Socrates)|(S', '(Socrates)|(Sc', '(Socrates)|(Sco', '(Socrates)|(Scor', '(Socrates)|(Scora', '(Socrates)|(Scorate', '(Socrates)|(Scorate', '(Socrates)|(Scorates', '(Socrates)|(Scorates)', '(Socrates)|(Scorates)', '(Socrates)|(Sc', '(Socrates)|(S', '(Socrates)|(', '(Soc)|(', '(So)|(', '(S)|(', '()|(', '(o)|(', '(os)|(', '(osc)|(', '(osc)|(s', '(osc)|(sc', '(osc)|(sco', '(osc)|(sco)', '(osc)|(sco)', '(osc)|(sco', '(osc)|(sc', '(osc)|(s', '(osc)|(', '(oscr)|(', '(oscra)|(', '(oscrat)|(', '(oscrate)|(', '(oscrates)|(', '(oscrate)|(', '(oscrat)|(', '(oscra)|(', '(oscr)|(', '(osc)|(', '(osc)|(o', '(osc)|(os', '(osc)|(osc', '(osc)|(osc)', '(osc)|(osc)', '(osc)|(os)', '(osc)|(o)', '(osc)|()', '(osc)|(s)', '(osc)|(sc)', '(osc)|(sco)', '(osc)|(sco', '(osc)|(sc', '(osc)|(s', '(osc)|(', '(os)|(', '(o)|(', '()|(', '()|()', '()|()', '(o)|()', '(os)|()', '(osc)|()', '(osc)|(s)', '(osc)|(sc)', '(osc)|(sco)', '(sc)|(sco)', '(Osc)|(sco)', '(Osc)|(sco)', '(Osc)|(co)', '(Osc)|(Sco)', '(Osc)|(Sco)', '(Osc)|(Sco)r', '(Osc)|(Sco)ra', '(Osc)|(Sco)rat', '(Osc)|(Sco)rate', '(Osc)|(Sco)rates'], 365909 )
		]),
		new Session([
			new Step(['1', '12', '123', '12345', '12345'], 9078 ),
			new Step(['a', 'ap', 'app', 'appl', 'apple'], 4669 ),
			new Step(['', '\\', '\\d'], 7815 ),
			new Step(['', '\\', '\\D'], 4590 ),
			new Step(['', '\\', '\\d', '\\d\\', '\\d\\d'], 5410 ),
			new Step(['', '\\', '\\d', '\\d{', '\\d{', '\\d{5', '\\d{5}'], 9691 ),
			new Step(['', '\\', '\\d', '\\d{', '\\d{', '\\d{2', '\\d{2,', '\\d{2,4', '\\d{2,4}'], 11083 ),
			new Step(['[abc]', '[abc', '[ab', '[a', '[ae', '[aei', '[aeio', '[aeiou', '[aeiou]'], 7773 ),
			new Step(['', '.'], 2347 ),
			new Step(['', '.', '.*'], 6623 ),
			new Step(['', '.', '.', '.8', '.', '.*', '.*', '.*f', '.*fl', '.*flo', '.*flow', '.*flowe', '.*flower', '.*flowers'], 8027 ),
			new Step(['', '.', '.*', '.*', '.*t', '.*ti', '.*tio', '.*tion', '.*tio', '.*ti', '.*t', '.*', '.*g', '.*go', '.*gom', '.*go', '.*gon', '.*gong', '.*gon', '.*go', '.*g', '.*', '.*o', '.*on', '.*ong'], 44267 ),
			new Step(['', 'b', 'bi', 'bir', 'bird', 'birdI', 'birdI', 'bird', 'bird|', 'bird|', 'bird|s', 'bird|si', 'bird|sin', 'bird|sing', 'bird|sing', 'bird|sing\\', 'bird|sing', 'bird|sing|', 'bird|sing|', 'bird|sing|c', 'bird|sing|ca', 'bird|sing|cag', 'bird|sing|cage', 'bird|sing|caged'], 63638 ),
			new Step(['', '.', '.', '..', '.', '', '\\', '\\.', '\\..', '\\.', '\\.\\', '\\.\\.'], 34295 ),
			new Step(['', '[', '[I', '[I', '[IS', '[IS', '[IST', '[IST', '[ISTD', '[ISTDG', '[ISTDG', '[ISTDG', '[ISTDG', '[ISTDGW', '[ISTDGWH', '[ISTDGWH', '[ISTDGW', '[ISTDG', '[ISTD', '[IST', '[IS', '[I', '[', '[DX', '[DX', '[DX', '[DX-', '[DX', '[D', '[D-', '[D-W', '[D-W', '[D-', '[D', '[', '[A', '[A', '[A-', '[A-Z', '[A-Z', '[A-Z', '[A-Z]'], 72604 ),
			new Step(['', 'I', 'I', 'I ', 'I S', 'I Sa', 'I Sa', 'I Sa,', 'I Sa, ', 'I Sa,', 'I Sa', 'I Sam', 'I Sam ', 'I Sam', 'I Sa', 'I S', 'I ', 'I', '', 'I', 'I', '', '', '', '[', '[A', '[A', '[A-', '[A-Z', '[A-Z', '[A-Z]', '[A-Z]\\', '[A-Z]\\w', '[A-Z]\\w*'], 87037 ),
			new Step(['', '9', '9a', '9ab', '9abc', '9abc0', '9abc', '9ab', '9a', '9', '', '', '(', '(', '(a', '(ab', '(abc', '(abc)', '(abc)', '(abc)|', '(abc)|', '(abc)|(', '(abc)|(', '(abc)|(d', '(abc)|(de', '(abc)|(def', '(abc)|(def)', '(abc)|(def)', '(abc)|(def) ', '', '9', '', '(', '(', '(a', '(ab', '(abc', '(abc)', '(abc)', '(abc)|', '(abc)|', '(abc)|(', '(abc)|(', '(abc)|(d', '(abc)|(de', '(abc)|(def', '(abc)|(def)', '(abc)|(def)', '(abc)|(def)', '(abc)|(def)', '(abc)|(def)', '(abc)|(def)', '(abc)|(def)', '(abc)|(def)', '(abc)|(def)', '(abc)|(def)', '(abc)|(def)', '(abc)|(def)', '(abc)|(def)', '(abc)|(def)', '(abc)|(def)', '(abc)|(def)', '(abc)|(def)', '(ab)|(def)', '(a)|(def)', '()|(def)', '(s)|(def)', '(s)|(def)', '(so)|(def)', '(so)|(def)', '(so)|(def)', '(so)|(def)', '(so)|(def)', '(so)|(def)', '(so)|(def)', '(so)|(de)', '(so)|(d)', '(so)|()', '(so)|(r)', '(so)|(ra)', '(so)|(ra)', '(so)|(ra)', '(so)|(ra)', '(so)|(ra)', '(so)|(ra)', '(so)|(ra)', '(so)|(ra)', '(so)|(ra)', '(so)|(ra)', '(so)|(ra)', '(so)|(ra)', '(so)|(ra)', '(so)|(ra)', '(so)|(ra)', '(so)|(ra)', '(so)|(r)', '(so)|()', '(so)|(c)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)', '(so)|(cr)'], 373935 )
		]),
		new Session([
			new Step(['9', '90', '9', '', ''], 17990 ),
			new Step(['a', 'ap', 'app', 'apple'], 3750 ),
			new Step(['\\', '\\d'], 4087 ),
			new Step(['\\', '\\D'], 3547 ),
			new Step(['\\', '\\d', '\\d\\', '\\d\\d'], 11982 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{5', '\\d{5}'], 12657 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{2', '\\d{2,', '\\d{2,4', '\\d{2,4}'], 9030 ),
			new Step(['[', '[a', '[ae', '[aei', '[aeio', '[aeiou', '[aeiou}', '[aeiou}', '[aeiou', '[aeiou]'], 22662 ),
			new Step(['.'], 7197 ),
			new Step(['.', '.*'], 4996 ),
			new Step(['.', '.*', '.*', '.*f', '.*fl', '.*flo', '.*flow', '.*flowe', '.*flower', '.*flowers'], 6265 ),
			new Step(['.', '.*', '.*', '.*t', '.*ti', '.*tio', '.*tion', '.*tio', '.*ti', '.*t', '.*', '.*o', '.*on', '.*ong'], 25891 ),
			new Step(['sing|caged', '|sing|caged', '|sing|caged', 'b|sing|caged', 'bi|sing|caged', 'bir|sing|caged', 'bird|sing|caged'], 10580 ),
			new Step(["'", "'.", "'.'", "'.", "'", "'\\", "'\\.", "'\\.'", "'\\.", "'\\", "'", '', '\\', '\\.', '\\.\\', '\\.', '\\', '', '\\', '\\.', '\\.\\', '\\.\\.'], 63784 ),
			new Step(['{', '{', '{A', '{A', '{', '', '[', '[A', '[A', '[A-', '[A-Z', '[A-Z', '[A-Z]'], 20615 ),
			new Step(['[A-Z]', '[A-Z', '[A-', '[A', '[', '', '{', '{', '', '[', '[A', '[A', '[A-', '[A-Z', '[A-Z', '[A-Z]', '[A-Z]\\', '[A-Z]\\w', '[A-Z]\\w*'], 42399 ),
			new Step(['(', '(', '(S', '(S', '(So', '(Soc', '(Socr', '(Socra', '(Socrat', '(Socrate', '(Socrates', '(Socrates)', '(Socrates)', '(Socrates)|', '(Socrates)|', '(Socrates)|(', '(Socrates)|(', '(Socrates)|(O', '(Socrates)|(O', '(Socrates)|(Os', '(Socrates)|(O', '(Socrates)|(', '(Socrates)|(o', '(Socrates)|(os', '(Socrates)|(o', '(Socrates)|(', '(Socrates)|(O', '(Socrates)|(O', '(Socrates)|(Os', '(Socrates)|(O', '(Socrates)|(Oc', '(Socrates)|(Ocs', '(Socrates)|(Ocsr', '(Socrates)|(Ocsra', '(Socrates)|(Ocsrat', '(Socrates)|(Ocsrate', '(Socrates)|(Ocsrates', '(Socrates)|(Ocsrates)', '(Socrates)|(Ocsrates)', '(Socrates)|(Ocsrates', '(Socrates)|(Ocsrate', '(Socrates)|(Ocsrat', '(Socrates)|(Ocsra', '(Socrates)|(Ocsr', '(Socrates)|(Ocs', '(Socrates)|(Oc', '(Socrates)|(O', '(Socrates)|(', '(Socrates)|(O', '(Socrates)|(O', '(Socrates)|(Os', '(Socrates)|(Osc', '(Socrates)|(Oscr', '(Socrates)|(Oscra', '(Socrates)|(Oscrat', '(Socrates)|(Oscrate', '(Socrates)|(Oscrates', '(Socrates)|(Oscrates)', '(Socrates)|(Oscrates)', '(Socrates)|(Oscrates', '(Socrates)|(Oscrate', '(Socrates)|(Oscrat', '(Socrates)|(Oscra', '(Socrates)|(Oscr', '(Socrates)|(Osc', '(Socrates)|(Os', '(Socrates)|(O', '(Socrates)|(', '(Socrates)|(S', '(Socrates)|(S', '(Socrates)|(So', '(Socrates)|(Sor', '(Socrates)|(Sorc', '(Socrates)|(Sorca', '(Socrates)|(Sorcat', '(Socrates)|(Sorcate', '(Socrates)|(Sorcates', '(Socrates)|(Sorcates)', '(Socrates)|(Sorcates)', '(Socrates)|(Sorcates', '(Socrates)|(Sorcate', '(Socrates)|(Sorcat', '(Socrates)|(Sorca', '(Socrates)|(Sorc', '(Socrates)|(Sor', '(Socrates)|(So', '(Socrates)|(S', '(Socrates)|(', '(Socrates)|', '(Socrates)|(', '(Socrates)|(', '(Socrates)|(O', '(Socrates)|(O', '(Socrates)|(Os', '(Socrates)|(Osc', '(Socrates)|(Oscs', '(Socrates)|(Oscsc', '(Socrates)|(Oscsco', '(Socrates)|(Oscsc', '(Socrates)|(Oscs', '(Socrates)|(Osc', '(Socrates)|(Os', '(Socates)|(Os', '(Soates)|(Os', '(Sates)|(Os', '(Scates)|(Os', '(Scoates)|(Os', '(Scorates)|(Os', '(Scorates)|(Osc', '(Scorates)|(Osco', '(Scorates)|(Oscor', '(Scorates)|(Oscora', '(Scorates)|(Oscorat', '(Scorates)|(Oscorate', '(Scorates)|(Oscorates', '(Scorates)|(Oscorates)', '(Scorates)|(Oscorates)', '(Scorates)|(Oscrates)', '(Scorates)|(Osc)', '(Scorates)|(Osc)r', '(Scorates)|(Osc)ra', '(Scorates)|(Osc)rat', '(Scorates)|(Osc)rate', '(Scorates)|(Osc)rates', '(Sco)|(Osc)rates'], 346741 )
		]),
		new Session([
			new Step(['1', '132', '132', '1324', '13245'], 20278 ),
			new Step(['a', 'ap', 'app', 'appe', 'app', 'appl', 'apple'], 7194 ),
			new Step(['\\', '\\d'], 3389 ),
			new Step(['\\', '\\D'], 4863 ),
			new Step(['', '\\', '\\d', '\\d\\', '\\d\\d'], 4401 ),
			new Step(['', '\\', '\\d', '\\d{', '\\d{', '\\d{5', '\\d{5}'], 5082 ),
			new Step(['', '\\', '\\d', '\\d{', '\\d{', '\\d{2', '\\d{2,', '\\d{2,4', '\\d{2,4}'], 10902 ),
			new Step(['', '', '[', '[a', '[ae', '[aei', '[aeio', '[aeiou', '[aeiou]'], 11676 ),
			new Step(['', '.'], 2897 ),
			new Step(['', '.', '.*'], 9234 ),
			new Step(['', '.', '.*', '.*', '.*f', '.*fl', '.*flo', '.*flow', '.*flowe', '.*flower', '.*flowers'], 6919 ),
			new Step(['', '.', '.*', '.*', '.*t', '.*ti', '.*tio', '.*tion', '.*tio', '.*ti', '.*t', '.*', '.*n', '.*ng', '.*n', '.*', '.*o', '.*om', '.*omg', '.*om', '.*o', '.*on', '.*ong'], 66711 ),
			new Step(['b', 'bi', 'bir', 'bird', 'bird|', 'bird|', 'bird|si', 'bird|si', 'bird|sin', 'bird|sing', 'bird|sing|', 'bird|sing|', 'bird|sing|c', 'bird|sing|ca', 'bird|sing|cag', 'bird|sing|cage', 'bird|sing|caged'], 64967 ),
			new Step(['\\', '\\.', '\\..', '\\.', '\\', '', '', ',', '', '.', '.\\', '.\\.', '.\\.', '.\\.', '.\\', '.', '', '\\', '\\.', '\\.\\', '\\.\\.'], 79039 ),
			new Step(['[', '[A', '[A', '[A-', '[A-Z', '[A-Z', '[A-Z', '[A-Z', '[A-Z]'], 16941 ),
			new Step(['A', 'A', 'A-', 'A', '', '', '[', '[A', '[A', '[A-', '[A-}', '[A-}', '[A-', '[A-Z', '[A-Z', '[A-Z', '[A-Z]', '[A-Z]{', '[A-Z]{', '[A-Z]', '[A-Z][', '[A-Z][a', '[A-Z][a-', '[A-Z][a-z', '[A-Z][a-z', '[A-Z][a-z]', '[A-Z][a-z', '[A-Z][a-', '[A-Z][a', '[A-Z][', '[A-Z]', '[A8-Z]', '[A-Z]', '[A*-Z]', '[A*-Z]', '[A*-Z*]', '[A*-Z*]', '[A*-Z]', '[A*-Z]', '[A*-Z]', '[A*-Z]', '[A*-Z]', '[A-Z]', '[A-Z]\\', '[A-Z]\\w', '[A-Z]\\w*'], 103406 ),
			new Step(['(', '(', '(a', '(ab', '(abc', '(abc', '(abc0', '(abc0|', '(abc0|', '(abc0|(', '(abc0|(', '(abc0|(d', '(abc0|(de', '(abc0|(def', '(abc0|(def)', '(abc0|(def)', '(abc|(def)', '(abc)|(def)', '(abc)|(def)', '(s)|(def)', '(so)|(def)', '(s)|(def)', '()|(def)', '(S)|(def)', '(S)|(def)', '(So)|(def)', '(So)|(o)', '(So)|(oc)', '(So)|(o)', '(So)|()', '(So)|()', '(So)|(c)', '(So)|(co)', '(So)|(c)', '(So)|()', '(S)|()', '(So)|()', '(So)|(c)', '(So)|(co)', '(So)|(c)', '(So)|()', '(So)|(o)', '(So)|(oc)', '(S)|(oc)', '()|(oc)', '(o)|(oc)', '(os)|(oc)', '(o)|(oc)', '(oS)|(oc)', '(oS)|(oc)', '(o)|(oc)', '(os)|(oc)', '(os)|(o)', '(os)|()', '(os)|(c)', '(os)|(co)', '', '(', '(', '()', '()', '()|', '()|', '()|(', '()|()', '()|()', '(O)|()', '(O)|()', '(Os)|()', '(Os)|R()', '(Os)|R()', '(Os)|Rc()', '(Os)|Rc)', '(Os)|(Rc)', '(Os)|(Rc)', '(Os)|(c)', '(Os)|(rc)', '(s)|(rc)', '(os)|(rc)', '(os)|(c)', '(os)|()', '(s)|()', '()|()', '(S)|()', '(S)|()', '(So)|()', '(So)|(o)', '(So)|(oc)', '(S)|(oc)', '()|(oc)', '(o)|(oc)', '(os)|(oc)', '(osc)|(oc)', '(osc)|(o)', '(osc)|()', '(osc)|(s)', '(osc)|(sc)', '(osc)|(sco)', '(osc)|(sco)', '(osc)|(co)', '(osc)|(co)', '(osc)|(sco)', '(osc)|(co)', '(osc)|(Sco)', '(osc)|(Sco)', '(sc)|(Sco)', '(Osc)|(Sco)', '(Osc)|(Sco)', '(sc)|(Sco)', '(osc)|(Sco)', '(oc)|(Sco)', '(oSc)|(Sco)', '(oSc)|(Sco)', '(oc)|(Sco)', '(osc)|(Sco)', '(osc)|(Sco)r', '(osc)|(Sco)ra', '(osc)|(Sco)rat', '(osc)|(Sco)rate', '(osc)|(Sco)rates', '(osc)|(Sco)rate', '(osc)|(Sco)rat', '(osc)|(Sco)ra', '(osc)|(Sco)r', '(osc)|(Sco)', '(osc)|(Scor)', '(osc)|(Scora)', '(osc)|(Scorat)', '(osc)|(Scorate)', '(osc)|(Scorates)', '(oscr)|(Scorates)', '(oscra)|(Scorates)', '(oscrat)|(Scorates)', '(oscrate)|(Scorates)', '(oscrates)|(Scorates)', '(oscrate)|(Scorates)', '(oscrat)|(Scorates)', '(oscra)|(Scorates)', '(oscr)|(Scorates)', '(osc)|(Scorates)', '(osc)|(Scorate)', '(osc)|(Scorat)', '(osc)|(Scora)', '(osc)|(Scor)', '(osc)|(Sco)', '(osc)|(Sco)r', '(osc)|(Sco)ra', '(osc)|(Sco)rat', '(osc)|(Sco)rate', '(osc)|(Sco)rates', '(sc)|(Sco)rates', '(Osc)|(Sco)rates'], 352483 )
		]),
		new Session([
			new Step(['0', '01', '012', '0122', '01223'], 6533 ),
			new Step(['a', 'ap', 'app', 'appl', 'apple'], 4158 ),
			new Step(['', '\\', '\\d'], 5996 ),
			new Step(['\\', '\\', '\\D'], 7538 ),
			new Step(['\\', '\\d', '\\d\\', '\\d\\d'], 4482 ),
			new Step(['\\', '\\d', '\\d', '\\d[', '\\d', '\\d', '\\d[', '\\d', '\\d{', '\\d{', '\\d{5', '\\d{5}'], 15297 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{2', '\\d{2,', '\\d{2,4', '\\d{2,4}'], 13904 ),
			new Step(['[', '[a', '[ae', '[aei', '[aeio', '[aeiou', '[aeiou', '[aeiou]'], 9600 ),
			new Step([',', '', '.'], 39105 ),
			new Step(['.', '.*'], 11613 ),
			new Step(['.', '.*', '.*', '.*n', '.*ni', '.*nig', '.*nigh', '.*night', '.*nigh', '.*nig', '.*ni', '.*n', '.*', '.*f', '.*f;', '.*f', '.*fl', '.*flo', '.*flow', '.*flowe', '.*flower', '.*flowers'], 15328 ),
			new Step(['.', '.*', '.*', '.*a', '.*an', '.*ang', '.*an', '.*a', '.*', '.*o', '.*on', '.*ong'], 15057 ),
			new Step(['b', 'bi', 'bir', 'bird', 'bird|', 'bird|', 'bird|s', 'bird|si', 'bird|sin', 'bird|sing', 'bird|sing|', 'bird|sing|', 'bird|sing|c', 'bird|sing|ca', 'bird|sing|cag', 'bird|sing|cage', 'bird|sing|caged'], 28935 ),
			new Step(['\\..', '', '\\', '\\.', '\\.\\', '\\.\\.'], 4529 ),
			new Step(['[', '[a', '[a-', '[a-z', '[a-z]', '[-z]', '[-z]', '[A-z]', '[A-]', '[A-Z]'], 33678 ),
			new Step(['[', '[', '[A', '[A-', '[A-Z', '[A-Z]', '', '[', '[A', '[A-', '[A-Z', '[A-Z]', '[A-Z]\\', '[A-Z]\\W', '[A-Z]\\', '[A-Z]', '[A-Z]\\', '[A-Z]\\W', '[A-Z]\\W*', '[A-Z]\\W*', '[A-Z]\\W', '[A-Z]\\', '[A-Z]', '[A-Z]*', '[A-Z]*', '[A-Z]', '[A-Z]\\', '[A-Z]\\', '[A-Z]\\w', '[A-Z]\\w*'], 88619 ),
			new Step(['(', '(', '(s', '(sp', '(spc', '(spcr', '(spcra', '(spcrag', '(spcra', '(spcr', '(spc', '(sp', '(s', '(so', '(soc', '(socr', '(socra', '(socrat', '(socrate', '(socrates', '(socrates)', '(socrates)', '', '', 'S', '', '(', '(', '(', '(s', '(', '(', '(S', '(S', '(So', '(Soc', '(Socr', '(Socrat', '(Socrat', '(Socrate', '(Socrates', '(Socrates)', '(Socrates)', '(Socrates)|', '(Socrates)|', '(Socrates)|(', '(Socrates)|(', '(Socrates)|(', '(Socrates)|(S', '(Socrates)|(S', '(Socrates)|(So', '(Socrates)|(Soc', '(Socrates)|(So', '(Socrates)|(S', '(Socrates)|(Sc', '(Socrates)|(Sco', '(Socrates)|(Scor', '(Socrates)|(Scora', '(Socrates)|(Scorat', '(Socrates)|(Scorate', '(Socrates)|(Scorates', '(Socrates)|(Scorates)', '(Socrates)|(Scorates)', '(Socrates)|(', '', '9', '', '(', '(', '(', '(S', '(S', '(So', '(Soc', '(Soc)', '(Soc)', '(Soc)', '(Soc)\\', '(Soc)\\(', '(Soc)\\(', '(Soc)\\(r', '(Soc)\\(ra', '(Soc)\\(rat', '(Soc)\\(rate', '(Soc)\\(rates', '(Soc)\\(rates)', '(Soc)\\(rates)', '(Socr)\\(rates)', '(Socr)\\(ates)', '(Socr)(ates)', '(Socr)(ates)', '(Socr)\\(ates)', '(Socr)(ates)', '(Socr)|(ates)', '(Socr)|(ates)', '(Socr)|()', '(Soc)|()', '(So)|()', '(S)|()', '()|()', '()|()', '(O)|()', '(O)|()', '()|()', '(o)|()', '(os)|()', '(osc)|()', '(osc)|(s)', '(osc)|(sc)', '(osc)|(sco)', '(osc)|(co)', '(osc)|(co)', '(osc)|(Sco)', '(osc)|(Sco)', '(sc)|(Sco)', '(sc)|(Sco)', '(Osc)|(Sco)', '(Osc)|(Sco)', '(sc)|(Sco)', '(sc)|(Sco)', '(Osc)|(Sco)', '(sc)|(Sco)', '(sc)|(Sco)', '(osc)|(Sco)', '(osc)|(Sco)', '(oOsc)|(Sco)', '(osc)|(Sco)', '(sc)|(Sco)', '(Osc)|(Sco)', '(Osc)|(Sco)', '(Osc)|(Sc)', '(Osc)|(Sco)', '(Osc)|(Sc)', '(Osc)|(S)', '(Osc)|()', '(Os)|()', '(O)|()', '()|()', '(s)|()', '()|()', '()|()', '(O)|()', '(O)|()', '(Os)|()', '(Osc)|()', '(Osc)|()', '(OscS)|()', '(OscS)|()', '(OscSc)|()', '(OscSco)|()', '(OscSc)|()', '(OscS)|()', '(Osc)|()', '(Osc)|()', '(Osc)|(S)', '(Osc)|(S)', '(Osc)|(Sc)', '(Osc)|(Sco)', '(Osc)|(Sco)r', '(Osc)|(Sco)ra', '(Osc)|(Sco)rat', '(Osc)|(Sco)rate', '(Osc)|(Sco)rates'], 363141 )
		]),
		new Session([
			new Step(['3246'], 98 ),
			new Step(['a', 'ap', 'app', 'appl', 'apple'], 3479 ),
			new Step(['', '\\', '\\d'], 10173 ),
			new Step(['', '\\', '\\D'], 3093 ),
			new Step(['', '\\', '\\d', '\\d\\', '\\d\\d'], 4000 ),
			new Step(['', '\\', '\\d', '\\d{', '\\d{', '\\d{5', '\\d{5}'], 10530 ),
			new Step(['', '\\', '\\d', '\\d{', '\\d{', '\\d{2', '\\d{2,', '\\d{2,4', '\\d{2,4}'], 12257 ),
			new Step(['', '[', '[a', '[ae', '[aei', '[aeio', '[aeiou', '[aeiou]'], 9410 ),
			new Step(['', '.'], 6739 ),
			new Step(['', '.', '.*'], 7639 ),
			new Step(['', '.', '.*', '.*', '.*f', '.*fl', '.*flo', '.*flow', '.*flowe', '.*flower', '.*flowers'], 7444 ),
			new Step(['', '.', '.*', '.*', '.*o', '.*on', '.*ong'], 25646 ),
			new Step(['', 'b', 'bi', 'bir', 'bird', 'bird|', 'bird|', 'bird|s', 'bird|si', 'bird|sin', 'bird|sing', 'bird|sing|', 'bird|sing|', 'bird|sing|c', 'bird|sing|ca', 'bird|sing|cag', 'bird|sing|cage', 'bird|sing|caged'], 21965 ),
			new Step(['\\.', '\\..', '\\.', '\\.\\', '\\.\\.'], 21242 ),
			new Step(['', '[', '[A', '[A', '[A-', '[A-Z', '[A-Z', '[A-Z]'], 15890 ),
			new Step(['', '[', '[A', '[A', '[A-', '[A-Z', '[A-Z', '[A-Z]', '[A-Z]\\', '[A-Z]', '[A-Z', '[A-', '[A', '[', '', '', '', '', '[', '[A', '[A', '[A-', '[A-Z', '[A-Z', '[A-Z]', '[A-Z]\\', '[A-Z]\\w', '[A-Z]\\w*'], 58897 ),
			new Step(['', '(', '(', '(s', '(so', '(so0', '(so0|', '(so0|', '(so0', '(so', '(so)', '(so)', '(so)|', '(so)|', '(so)|(', '(so)|(', '(so)|(o', '(so)|(oc', '(so)|(oc)', '(so)|(oc)', '(so', '(s', '(', '', '', '', '(', '(', '(S', '(S', '(So', '(Soc', '(Socr', '(Socra', '(Socrat', '(Socrate', '(Socrates', '(Socrates)', '(Socrates)|', '(Socrates)|', '(Socrates)|(', '(Socrates)|(', '(Socrates)|(s', '(Socrates)|(so', '(Socrates)|(s', '(Socrates)|(', '(Socrates)|(S', '(Socrates)|(S', '(Socrates)|(So', '(Socrates)|(So)', '(Socrates)|(So)', '(Socrates)|(So)\\', '(Socrates)|(So)', '(Socrates)|(So)|', '(Socrates)|(So)|', '(Socrates)|(So)|(', '(Socrates)|(So)|(', '(Socrates)|(So)|(s', '(Socrates)|(So)|(sc', '(Socrates)|(So)|(sc)', '(Socrates)|(So)|(sc)', '', 'o', 'os', 'osc', 'os', 'o', '', '(', '(', '(s', '(sc', '(sco', '(sco)', '(sco)', '(sco', '(sc', '(s', '(', '(S', '(S', '(Sc', '(Sco', '(Sco)', '(Sco)', '(Sco)|', '(Sco)|', '(Sco)|(', '(Sco)|(', '(Sco)|(o', '(Sco)|(os', '(Sco)|(osc', '(Sco)|(osc)', '(Sco)|(osc)', '(Sco)|(osc', '(Sco)|(os', '(Sco)|(osc', '(Sco)|(oscr', '(Sco)|(oscra', '(Sco)|(oscrat', '(Sco)|(oscrate', '(Sco)|(oscrates', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Scor)|(oscrates)', '(Scora)|(oscrates)', '(Scorat)|(oscrates)', '(Scorate)|(oscrates)', '(Scorates)|(oscrates)', '(Scorate)|(oscrates)', '(Scorat)|(oscrates)', '(Scora)|(oscrates)', '(Scor)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrates)', '(Sco)|(oscrate)', '(Sco)|(oscrat)', '(Sco)|(oscra)', '(Sco)|(oscr)', '(Sco)|(osc)', '(Sco)|(osc)', '(Sco)|(osc)', '(Sco)|(osc)r', '(Sco)|(osc)ra', '(Sco)|(osc)rat', '(Sco)|(osc)rate', '(Sco)|(osc)rates', '(Sco)|(osc)rates', '(Sco)|(sc)rates', '(Sco)|(Osc)rates'], 363260 )
		]),
		new Session([
			new Step(['2', '24', '242', '2423', '24237'], 7972 ),
			new Step(['a', 'ap', 'app', 'app;', 'app;e', 'app;', 'app', 'appl', 'apple'], 10461 ),
			new Step(['\\', '\\d'], 9180 ),
			new Step(['\\', '\\D'], 5010 ),
			new Step(['\\', '\\d', '\\d\\', '\\d\\d'], 4716 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{5', '\\d{5}'], 12918 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{2', '\\d{2,', '\\d{2,4', '\\d{2,4}'], 18437 ),
			new Step(['[', '[a', '[a,', '[a', '[ae', '[aei', '[aeio', '[aeiou', '[aeiou]'], 20371 ),
			new Step(['.'], 4431 ),
			new Step(['.', '.*'], 4379 ),
			new Step(['', '.', '.*', '.*', '.*f', '.*fl', '.*flo', '.*flow', '.*flowe', '.*flower', '.*flowers'], 18711 ),
			new Step(['.', '.*', '.*', '.*o', '.*on', '.*ong'], 22132 ),
			new Step(['b', 'bi', 'bir', 'bird', 'bird', 'bird|', 'bird|', 'bird|s', 'bird|si', 'bird|sin', 'bird|sing', 'bird|sing|', 'bird|sing|', 'bird|sing|c', 'bird|sing|ca', 'bird|sing|cag', 'bird|sing|cage', 'bird|sing|caged'], 170347 ),
			new Step(['\\', '\\.', '\\.\\', '\\.\\.'], 52964 ),
			new Step(['[', '[A', '[A', '[A-', '[A-Z', '[A-Z', '[A-Z]'], 60409 ),
			new Step(['[', '[A', '[A', '[A-', '[A-Z', '[A-Z', '[A-Z]', '[A-Z', '[A-Z/', '[A-Z//', '[A-Z/', '[A-Z', '[A-Z]', '[A-Z]\\', '[A-Z]\\w', '[A-Z]\\w*'], 210788 ),
			new Step(['o', 'os', 'osc', 'os', 'o', '', 'O', 'O', 'Os', 'Osc', 'Osc|', 'Osc|', 'Osc|', 'Osc|S', 'Osc|S', 'Osc|Sc', 'Osc|Sco', '9Osc|Sco', 'Osc|Sco', '(Osc|Sco', '(Osc|Sco', '(Osc)|Sco', '(Osc)|Sco', '(Osc)|(Sco', '(Osc)|(Sco', '(Osc)|(Sco)', '(Osc)|(Sco)', '(Osc)|(Sco)r', '(Osc)|(Sco)ra', '(Osc)|(Sco)rat', '(Osc)|(Sco)rate', '(Osc)|(Sco)rates'], 260168 )
		]),
		new Session([
			new Step(['5', '54', '543', '5434', '54342'], 174142 )
		]),
		new Session([
			new Step(['1', '12', '122', '1222', '122'], 4588 ),
			new Step(['a', 'ap', 'app', 'apple'], 4191 ),
			new Step(['\\', '\\d'], 1600 ),
			new Step(['\\', '\\D'], 1766 ),
			new Step(['\\', '\\d', '\\d\\', '\\d\\d'], 2189 ),
			new Step(['{}', '{}', '{}', '{', '', '', '\\', '\\', '\\d', '\\d{', '\\d{', '\\d{5', '\\d{5}'], 5377 )
		]),
		new Session([
			new Step(['1', '11', '1', '12', '123'], 243187 )
		]),
		new Session([
			new Step(['1', '12', '123', '1234', '12345'], 34378 ),
			new Step(['a', 'ap', 'app', 'appl', 'apple'], 8964 ),
			new Step(['\\', '\\s', '\\', '\\d'], 30175 ),
			new Step(['\\', '\\D'], 4664 ),
			new Step(['\\', '\\d', '\\d', '\\d ', '\\d \\', '\\d \\d', '\\d \\', '\\d ', '\\d', '\\dd', '\\d', '\\d\\', '\\d\\d'], 22404 ),
			new Step(['\\d{3}', '\\d{}', '\\d{5}'], 11424 ),
			new Step(['\\', '\\d', '\\d{', '\\d{', '\\d{2', '\\d{2,', '\\d{2,4', '\\d{2,4', '\\d{2,4]', '\\d{2,4', '\\d{2,4}'], 24974 ),
			new Step(['[', '[a', '[ae', '[aei', '[aeio', '[aeiou', '[aeiou', '[aeiou]'], 23228 ),
			new Step(['.'], 7627 ),
			new Step(['.', '.*'], 10332 ),
			new Step(['', '.', '.*', '.*', '.*n', '.*ni', '.*nig', '.*nigh', '.*night', '.*nigh', '.*nig', '.*ni', '.*n', '.*', '.*f', '.*fl', '.*flo', '.*flow', '.*flowe', '.*flower', '.*flowers'], 15581 ),
			new Step(['.', '.on', '.ong', '.ong', '.on', '.o', '.', '.*', '.*', '.*o', '.*on', '.*ong'], 16507 ),
			new Step(['b', 'bi', 'bir', 'bird', 'bird', 'bird|', 'bird|', 'bird|s', 'bird|si', 'bird|sin', 'bird|sing', 'bird|sing|', 'bird|sing|', 'bird|sing|ca', 'bird|sing|ca', 'bird|sing|cag', 'bird|sing|cage', 'bird|sing|caged'], 18364 ),
			new Step(['\\..', '\\.', '\\', '', '\\', '\\.', '\\', '', '', '\\', '\\.', '\\..', '\\.', '\\', '', '', '\\', '\\.', '\\. ', '\\. .', '\\. ', '\\.', '\\..', '\\.', '\\', '', '', '', '\\', '\\.', '\\.\\', '\\.\\.'], 84485 ),
			new Step(['', '[', '[A', '[A', '[A-', '[A-Z', '[A-Z', '[A-Z]'], 30520 )
		])
	];

	function next(session) {

		var step = session.getCurrentStep();
		session.setText(step.getCurrentAttempt());

		step.currentAttempt++;

		if(step.currentAttempt == step.attempts.length) {

			session.currentStep++;
			session.element.find('.rect').css('width', session.currentStep*40 + "px");
		}

		if(session.currentStep == session.steps.length) {

			return;
		}

		setTimeout(function() { next(session) }, step.getAverageTime()/SPEED);
	}

	function run() {

		init();

		for(var i = 0; i < sessions.length; i++) {

			next(sessions[i]);
		}
	}

	function init() {

		var sessionElements = $('.session');

		$('.session').each(function(index) {

			sessions[index].element = $(this);
		});
	}

	setTimeout(function() {run();}, 0);
});