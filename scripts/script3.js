let allQuizArray = [];

function getQuizzes() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes');
    loading();
    promise.then(populateArray);
}

function populateArray(answer) {
    allQuizArray = answer.data;
    displayScreenHome();
}

function displayScreenHome() {
    const main = document.querySelector('main');
    main.innerHTML += `
        <section class="your-quizzes-container hidden">
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
        <section class="all-quizzes hidden">
            <h3 class="title">Todos os Quizzes</h3>
            <div class="quiz-list">
            </div>
        </section>
    `;
    
    renderAllQuizzes();
}

function renderAllQuizzes() {
    const quizList = document.querySelector('.all-quizzes .quiz-list');
    const userQuizz = document.querySelector('.your-quizzes .quiz-list');

    userQuizz.innerHTML = '';
    quizList.innerHTML = '';

    let checksYourQuizz = false;

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
            userQuizz.innerHTML += `
                <div class="quiz" onclick="getQuiz(this);" id="${quiz.id}">
                    <div class="editRemoveBox">
                    <ion-icon name="create-outline"></ion-icon>
                        <ion-icon onclick="deleteQuizz(this);" name="trash-outline"></ion-icon>
                    </div>
                    <img src="${quiz.image}">
                    <div class="quiz-gradient"></div>
                    <p>${quiz.title}</p>
                </div>
            `;
            document.querySelector(".no-quiz").classList.add("hidden");
            checksYourQuizz = true;
        }
        else {
            quizList.innerHTML += quizTemplate;
        }
    }

    if(checksYourQuizz === false) document.querySelector(".your-quizzes").classList.add("hidden");
    showHome();
}

function checksLocalStorage(id){

    const listaSerializada = localStorage.getItem(id);
    const lista = JSON.parse(listaSerializada);
    
    if(lista != null) return true;
    else return false;
}

getQuizzes();


function deleteQuizz(element){
    if(window.confirm("Você realmente deseja excluir esse Quizz?")){
        
        const id = (element.parentNode.parentNode.id);

        const listaSerializada = localStorage.getItem(id);
        const lista = JSON.parse(listaSerializada);
        
        const headers = {
            'Secret-Key': lista.key
        }
        
        const promise = axios.delete(`https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/${id}`,{headers});
        
        promise.then(getQuizzes);
        promise.catch(error);
    } else;
}

function error (msg){
    console.log(msg);
}

function loading() {
    const main = document.querySelector('main');
    main.innerHTML = `
        <section class="loader">
            <div class="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p>Carregando</p>
        </section>
    `
}

function showHome() {
    const loader = document.querySelector('.loader');
    const allQuizzes = document.querySelector('.all-quizzes');
    const yourQuizzesContainer = document.querySelector('.your-quizzes-container');

    loader.classList.add('hidden');
    yourQuizzesContainer.classList.remove('hidden');
    allQuizzes.classList.remove('hidden');
}