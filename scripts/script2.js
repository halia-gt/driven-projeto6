let quiz = {};
let answeredQuestions = 0;
let rightAnswers = 0;

function getQuiz(element) {
    const id = element.id;
    const promise = axios.get(`https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/${id}`);
    loading();
    promise.then(renderQuizBanner);
}

function renderQuizBanner(answer) {
    const main = document.querySelector('main');
    quiz = answer.data;

    const bannerTemplate = `
        <section class="quiz-header banner hidden">
            <img src="${quiz.image}">
            <div class="quiz-header-opacity"></div>
            <p>${quiz.title}</p>
        </section>
    `
    main.innerHTML += bannerTemplate;
    renderQuizQuestions(main);
}

function renderQuizQuestions(main) {
    const numberQuestions = quiz.questions.length;

    for (let i = 0 ; i < numberQuestions ; i++) {
        const question = quiz.questions[i];
        const questionTemplate = `
            <section class="quiz-question-container banner hidden">
                <div class="quiz-question">
                    <p>${question.title}</p>
                </div>
                <div class="quiz-options">
                </div>
            </section>
        `
        main.innerHTML += questionTemplate;
        const thisQuestion = main.querySelector('.quiz-question-container:last-child');
        thisQuestion.querySelector('.quiz-question').style.backgroundColor = question.color;
        displayQuestionOptions(question.answers, thisQuestion, i);
    }

    showQuiz();

    const banner = document.querySelector('.quiz-header');
    banner.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
    });
}

function displayQuestionOptions(array, question, j) {
    const answers = array;
    const options = question.querySelector('.quiz-options');
    answers.sort(sortArray);
    quiz.questions[j].answers = answers;

    options.innerHTML = '';
    for (let i = 0 ; i < answers.length ; i++) {
        const answer = answers[i];
        const optionTemplate = `
            <div class="quiz-option" onclick="selectOption(this, ${j}, ${i})">
                <img src="${answer.image}">
                <p>${answer.text}</p>
            </div>
        `
        options.innerHTML += optionTemplate;
    }
}

function selectOption(element, questionNumber, answerNumber) {
    const allOptions = element.parentNode.querySelectorAll('.quiz-option');
    const nextQuestion = element.parentNode.parentNode.nextElementSibling;
    answeredQuestions++;

    if (isCorrect(questionNumber, answerNumber) === true) {
        rightAnswers++;
    }
    
    let i = 0;
    allOptions.forEach( function (option) {
        addOpacity(option, element);
        removeClick(option);
        addColorText(option, questionNumber, i);
        i++;
    });

    if (isAllAnswered() === true) {
        calcAnswer();
        answeredQuestions = 0;
    }

    if (nextQuestion !== null) {
        setTimeout( function () {
            nextQuestion.scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            });
        }, 2000);
    }
}

function addOpacity (option, element) {
    if (option !== element) {
        option.classList.add('opacity');
    }
}

function removeClick(option) {
    option.removeAttribute('onclick');
}

function addColorText(option, questionNumber, answerNumber) {
    const p = option.querySelector('p');

    if (isCorrect(questionNumber, answerNumber) === true) {
        p.classList.add('right-choice');
    } else {
        p.classList.add('wrong-choice');
    }
}

function isCorrect(questionNumber, answerNumber) {
    return quiz.questions[questionNumber].answers[answerNumber].isCorrectAnswer;
}

function sortArray() { 
	return Math.random() - 0.5; 
}

function isAllAnswered() {
    if (answeredQuestions === quiz.questions.length) {
        return true;
    }
}

function calcAnswer() {
    const result = Math.round(rightAnswers*100/(quiz.questions.length));
    interval(result);
}

function interval(result) {
    let control = 0;
    let levelIndex = 0;

    for (let i = 0 ; i < quiz.levels.length ; i ++) {
        const level = quiz.levels[i].minValue;
        if (result >= level && level >= control) {
            control = level;
            levelIndex = i;
        }
    }

    displayAnswer(result, levelIndex);
}

function displayAnswer(percentage, i) {
    const level = quiz.levels[i];
    const main = document.querySelector('main');
    main.innerHTML += `
        <section class="quiz-result-container banner">
            <div class="quiz-result-level">
                <p>${percentage}% de acerto: ${level.title}</p>
            </div>
            <div class="quiz-result">
                <img src="${level.image}">
                <p>${level.text}</p>
            </div>
        </section>
        <section class="button">
            <button class="restart-quiz" onclick="restartQuiz();">Reiniciar Quizz</button>
            <p onclick="getQuizzes();">Voltar pra home</p>
        </section>
    `
    setTimeout( function () {
        document.querySelector('.quiz-result-container').scrollIntoView();
    }, 2000);
}

function restartQuiz() {
    answeredQuestions = 0;
    rightAnswers = 0;
    getQuiz(quiz);

    const banner = document.querySelector('.quiz-header');
    banner.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
    });
}

function showQuiz() {
    const banner = document.querySelector('.quiz-header');
    const questions = document.querySelectorAll('.quiz-question-container');
    const loader = document.querySelector('.loader');

    loader.classList.add('hidden');
    banner.classList.remove('hidden');
    questions.forEach( question => question.classList.remove('hidden') );
}
