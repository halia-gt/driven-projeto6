let allQuizArray = [];

function getQuizzes() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes');
    promise.then(populateArray);
}

function populateArray(answer) {
    allQuizArray = answer.data;
    renderAllQuizzes();
}

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
    const userQuizz = document.querySelector(".your-quizzes .quiz-list");

    userQuizz.innerHTML = "";
    quizList.innerHTML = ``;

    const checksYourQuizz = false;

    for (let i = 0 ; i < allQuizArray.length ; i++) {
        const quiz = allQuizArray[i];
        let quizTemplate = `
            <div class="quiz" onclick="getQuiz(this);" id="${quiz.id}">
                <img src="${quiz.image}">
                <div class="quiz-gradient"></div>
                <p>${quiz.title}</p>
            </div>
        `;

        if(checksLocalStorage(quiz.id)) {
            userQuizz.innerHTML += quizTemplate;
            document.querySelector(".no-quiz").classList.add("hidden");
            checksYourQuizz = true;
        }
        else {
            quizList.innerHTML += quizTemplate;
        }
    }
    if(checksYourQuizz === false) document.querySelector(".your-quizzes-header").classList.add("hidden");
}

function checksLocalStorage(id){

    const listaSerializada = localStorage.getItem(id);
    const lista = JSON.parse(listaSerializada);
    
    if(lista != null) return true;
    else return false;
}

function renderStartPage() {
    displayScreen1();
    getQuizzes();
}

renderStartPage();