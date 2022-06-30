//Javascript da LISTAGEM DE QUIZ

let allQuizArray = [];

function getQuizzes() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promise.then(populateArray);
}

function populateArray(answer) {
    allQuizArray = answer.data;
    renderAllQuizzes();
}

// Fazer um if do que vai pro innerHTML baseado se tem ou não Seu Quiz (no momento ta só com um display: hidden)
function displayScreen1() {
    const main = document.querySelector('main');
    main.innerHTML = `
        <section class="your-quizzes-container">
            <div class="no-quiz">
                <p>Você não criou nenhum quizz ainda :(</p>
                <button type="button" onclick="renderCreationQuizz();">Criar Quizz</button>
            </div>
            <div class="your-quizzes hidden">
                <h3 class="title">Seus Quizzes</h3>
                <div class="quiz-list">
                </div>
            </div>
        </section>
        <section class="all-quizzes">
            <h3 class="title">Todos os Quizzes</h3>
            <div class="quiz-list">
            </div>
        </section>
    `;
}

function renderAllQuizzes() {
    const quizList = document.querySelector('.all-quizzes .quiz-list');
    quizList.innerHTML = ``;

    for (let i = 0 ; i < allQuizArray.length ; i++) {
        const quiz = allQuizArray[i];
        let quizTemplate = `
            <div class="quiz" onclick="getQuiz(this);" id="${quiz.id}">
                <img src="${quiz.image}">
                <div class="quiz-gradient"></div>
                <p>${quiz.title}</p>
            </div>
        `;
        quizList.innerHTML += quizTemplate;
    }
}

function getQuiz(element) {
    const id = element.id;
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    promise.then(function (answer) {
        renderQuizBanner(answer, id)
    });
}

function renderQuizBanner(answer, id) {
    const main = document.querySelector('main');
    main.innerHTML = '';
    const quiz = answer.data;

    const bannerTemplate = `
        <section class="quiz-header banner">
            <img src="${quiz.image}">
            <div class="quiz-header-opacity"></div>
            <p>${quiz.title}</p>
        </section>
    `
    main.innerHTML += bannerTemplate;
    renderQuizQuestions(main, quiz);
}

function renderQuizQuestions(main, quiz) {
    const numberQuestions = quiz.questions.length;

    for (let i = 0 ; i < numberQuestions ; i++) {
        const question = quiz.questions[i];
        const questionTemplate = `
            <section class="quiz-question-container banner">
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
        displayQuestionOptions(question.answers, thisQuestion);
    }
}

function displayQuestionOptions(array, question) {
    const answers = array;
    const options = question.querySelector('.quiz-options');
    answers.sort(sortArray);

    options.innerHTML = '';
    for (let i = 0 ; i < answers.length ; i++) {
        const answer = answers[i];
        const optionTemplate = `
            <div class="quiz-option" onclick="selectOption(this, ${answer.isCorrectAnswer})">
                <img src="${answer.image}">
                <p>${answer.text}</p>
            </div>
        `
        options.innerHTML += optionTemplate;
    }
}

function sortArray() { 
	return Math.random() - 0.5; 
}

function selectOption(element, choice) {
// Adicionar efeito na selecionada (element) e nas não-selecionadas (efeito de opacity) e adicionar cor
}

displayScreen1();
getQuizzes();
