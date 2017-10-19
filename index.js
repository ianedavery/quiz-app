'use strict';

const questions = [];
questions[1] = 'Who played keyboards on the song "Get Back"';
questions[2] = 'Who played lead guitar on the song "While My Guitar Gently Weeps"?';
questions[3] = 'Which song was the The Beatles first number 1 hit in the US?';
questions[4] = 'In was year was the album "Sgt. Peppers Lonely Hearts Club Band" released?';
questions[5] = 'In what town did The Beatles first meet?';
questions[6] = 'Who sang lead vocals on the song "Yello Submarine"?';
questions[7] = 'Which famous producer produced the album "Let it Be"?';
questions[8] = 'In 1964 The Beatles starred in what film?';
questions[9] = 'What is the name of The Beatles original drummer?';
questions[10] = 'What is Ringo Starrs real name?';

const choices = [];
choices[1] = ['Ray Charles', 'Billy Preston', 'Paul McCartney', 'John Lennon'];
choices[2] = ['George Harrison', 'Paul McCartney', 'Eric Clapton', 'Jimmy Page'];
choices[3] = ['She Loves You', 'Please Please Me', 'I Saw Her Standing There', 'I Want to Hold Your Hand'];
choices[4] = ['1965', '1966', '1967', '1968'];
choices[5] = ['Liverpool', 'Cambridge', 'London', 'New York City'];
choices[6] = ['Paul McCartney', 'John Lennon', 'George Harrison', 'Ringo Starr'];
choices[7] = ['Berry Gordy', 'Phil Spector', 'George Martin', 'Jimmy Miller'];
choices[8] = ['Help!', 'Yellow Submarine', 'A Hard Days Night', 'How I Won the War'];
choices[9] = ['Ringo Starr', 'Pete Best', 'Keith Moon', 'Stuart Sutcliffe'];
choices[10] = ['Richard Stewart', 'Richard Smith', 'Richard Starkey', 'Ronald Starkey'];

const answers = [];
answers[1] = ['Billy Preston'];
answers[2] = ['Eric Clapton'];
answers[3] = ['I Want to Hold Your Hand'];
answers[4] = ['1967'];
answers[5] = ['Liverpool'];
answers[6] = ['Ringo Starr'];
answers[7] = ['Phil Spector'];
answers[8] = ['A Hard Days Night'];
answers[9] = ['Pete Best'];
answers[10] = ['Richard Starkey'];

function renderTheBeatlesQuiz() {
	console.log('`renderTheBeatlesQuiz` ran');
}
  
let i=1;
let score=0;

function generateQuestion() {
	console.log('question being generated');
	$('.js-generated-questions').remove();
	let question = `<div class='generated-questions js-generated-questions'><div class='radio-label'><label for="question">${questions[i]}</label></div>
			<div class="radio"><input type="radio" id="question" name="question" value="${choices[i][0]}">${choices[i][0]}</input></div>
			<div class="radio"><input type="radio" id="question" name="question" value="${choices[i][1]}">${choices[i][1]}</input></div>
			<div class="radio"><input type="radio" id="question" name="question" value="${choices[i][2]}">${choices[i][2]}</input></div>
			<div class="radio"><input type="radio" id="question" name="question" value="${choices[i][3]}">${choices[i][3]}</input></div>
			</div></div>`;
	$('.js-multiple-choice-question').prepend(question);
	questionTracker();
	scoreTracker();
}

function questionTracker() {
	const questionCount = `<p class='js-question-counter question-counter'>Question ${i} out of 10.</p>`;
	console.log(questionCount);
	$('.js-counter').prepend(questionCount);
}

function scoreTracker() {
	const scoreCount = `<p class='js-score-counter score-counter'>${score} out of 10 correct.</p>`;
	console.log(scoreCount);
	$('.js-counter').append(scoreCount);
}

function renderQuestionPage() {
	console.log('rendering question page');
	$('.js-question-page').removeClass('hidden');
	$('.js-start-page').addClass('hidden');
}

function handleStartButtonClicks() {
	$('.js-start-quiz-button').on('click', event => {
		console.log('Start button clicked');
		event.preventDefault();
		renderQuestionPage();
		generateQuestion();
	});
}

function renderFeedbackPage() {
	console.log('rendering feedback page.');
	$('.js-feedback-page').removeClass('hidden');
	$('.js-question-page').addClass('hidden');
}

function handleAnswerSubmitButtonClicks() {
	$('.js-submit-answer-button').on('click', event => {
		console.log('Answer submit button clicked');
		validateAnswer();
		renderFeedbackPage();
		event.preventDefault();
		
	});
}

function validateAnswer() {
	console.log('validating answer');
	let userAnswer = $('input:checked').val();
	console.log(userAnswer);
	if (userAnswer == answers[i]) {
		console.log('correct');
		const correctMessage = `<div class='js-correct-message'><h2>${answers[i]}</br>is the correct answer!</h2></div>`;
		console.log(correctMessage);
		$('.js-correct-answer-message').prepend(correctMessage);
		score++;
	}
	else {
		console.log('wrong');
		const incorrectMessage = `<div class='js-incorrect-message'><h2>Sorry.</br>The correct answer is</br>${answers[i]}.</h2></div>`;
		console.log(incorrectMessage);
		$('.js-wrong-answer-message').prepend(incorrectMessage);
	}
	i++;
	console.log(i);
	console.log(score);
}

function renderSubsequentQuestionsPage() {
	console.log('subsequent questions page rendering');
	$('.js-feedback-page').addClass('hidden');
	$('.js-incorrect-message').remove();
	$('.js-correct-message').remove();
	$('.js-score-counter').remove();
	$('.js-question-counter').remove();
}

function handleNextButtonClicks() {
	$('.js-next-question-button').on('click', event => {
		console.log('next button has been clicked');
		renderSubsequentQuestionsPage();
		if(i<=10) {
			$('.js-question-page').removeClass('hidden');
			generateQuestion();
		}
		else {
			console.log('all done');
			$('.js-final-page').removeClass('hidden');
			const finalScore = `<h2 class='js-final-score-message'>All done!</br>Your score is ${score} out of 10.</h2>`;
			$('.js-final-page').prepend(finalScore);
		}
	});
}

function renderQuizRestartPage() {
	$('.js-final-score-message').remove();
	$('.js-final-page').addClass('hidden');
	$('.js-question-page').removeClass('hidden');
}

function handleRollUpAgainClicks() {
	$('.js-retake-the-quiz').on('click', event => {
		console.log('roll up again button clicked');
		i=1;
		score=0;
		renderQuizRestartPage();
		generateQuestion();
	});
}

function handleQuizApp() {
	renderTheBeatlesQuiz();
	handleStartButtonClicks();
	handleAnswerSubmitButtonClicks();
	handleNextButtonClicks();
	handleRollUpAgainClicks();
}

$(handleQuizApp);