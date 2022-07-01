let allQuizArray = [];

function getQuizzes() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes');
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
                <button type="button" onclick="renderQuizzCreation();">Criar Quizz</button>
            </div>
            <div class="your-quizzes">
                <div class="your-quizzes-header">
                    <h3 class="title">Seus Quizzes</h3>
                    <ion-icon name="add-circle" onclick="renderQuizzCreation();"></ion-icon>
                </div>
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

function renderStartPage() {
    displayScreen1();
    getQuizzes();
}

renderStartPage();