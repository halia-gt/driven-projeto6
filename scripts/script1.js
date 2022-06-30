
let numberQuestions;

const layoutCreationQuizz = `
    <div class="creating-quiz-question-title">
    <input type="text" placeholder="Texto da pergunta">
    <input type="text" placeholder="Cor de fundo da pergunta">
    </div>
    <h3>Resposta correta</h3>
    <div class="creating-quiz-question-correct">
    <input type="text" placeholder="Resposta correta">
    <input type="text" placeholder="URL da imagem">
    </div>
    <h3>Respostas incorretas</h3>
    <div class="creating-quiz-question-incorrect">
    <input type="text" placeholder="Resposta incorreta 1">
    <input type="text" placeholder="URL da imagem 1">
    </div>
    <div class="creating-quiz-question-incorrect">
    <input type="text" placeholder="Resposta incorreta 2">
    <input type="text" placeholder="URL da imagem 2">
    </div>
    <div class="creating-quiz-question-incorrect">
    <input type="text" placeholder="Resposta incorreta 3">
    <input type="text" placeholder="URL da imagem 3">
    </div>
`;

function renderCreationQuizz(){

    const layoutBasicInformation = `
        <section class="creating-quiz-basic-container banner">
            <h3 class="title">Comece pelo começo</h3>
            <div class="creating-quiz-basic-questions">
                <input type="text" placeholder="Título do seu quizz">
                <input type="url" placeholder="URL da imagem do seu quizz">
                <input type="number" placeholder="Quantidade de perguntas do quizz">
                <input type="number" placeholder="Quantidade de níveis do quizz">
            </div>
            <button type="button" onclick="basicInformation();">Prosseguir pra criar perguntas</button>
        </section>
    `;

    document.querySelector("main").innerHTML = layoutBasicInformation;
}

function basicInformation(){
    
    const dom = document.querySelector(".creating-quiz-basic-questions");
    const title = dom.children[0].value;
    const url = dom.children[1].value;
    const qttQuestions = dom.children[2].value;
    const qttLevel = dom.children[3].value;

    numberQuestions = qttQuestions;
    checksBasicInformation(title, url, qttQuestions, qttLevel);
    
}

function checksBasicInformation(title, url, qttQuestions, qttLevel){
    if((title.length >= 20 && title.length <= 65) && (validURL(url)) && (qttQuestions >= 3) && (qttLevel >= 2)) return renderQuestionsQuizz(qttQuestions);
    else{
        alert("Preencha novamente os dados!");
        renderCreationQuizz();
    }
}

function validURL(string){
    try {
        new URL(string);
      } catch (e) {
        return false;
      }
      return true;
}

function renderQuestionsQuizz(qttQuestions){

    const buttonQuestionQuizz = `<button type="button" onclick="quizzQuestions();">Prosseguir pra criar níveis</button>`;
    
    const layoutQuestionsQuizz = `
        <section class="creating-quiz-questions-container banner">
            <h3 class="title">Crie suas perguntas</h3>
            <div class="creating-quiz-question">
                <h3>Pergunta 1</h3>
            </div>
        </section>
    `;
    document.querySelector("main").innerHTML = layoutQuestionsQuizz;

    for(let i=0; i<qttQuestions; i++){
        if(i==0){
            document.querySelector(".creating-quiz-question").innerHTML += layoutCreationQuizz;
        }else{
            document.querySelector(".creating-quiz-questions-container").innerHTML += `
                <div class="creating-quiz-question-closed">
                <h3 class="title">Pergunta ${i+1}</h3>
                <img src="./images/create-outline.png" onclick="openingClosedQuestion(this);">
                </div>
            `;
        }
    } 

    document.querySelector(".creating-quiz-questions-container").innerHTML += buttonQuestionQuizz;
}

function openingClosedQuestion(elemento){
    elemento.classList.add("hidden");
    elemento.parentNode.classList.add("creating-quiz-question");
    elemento.parentNode.classList.remove("creating-quiz-question-closed");
    elemento.parentNode.innerHTML += layoutCreationQuizz;

    //console.log(teste[0].children[1].children[0].value);
}

function quizzQuestions(){ 

    let arrayQuestions = document.querySelectorAll(".creating-quiz-question");
    const titleQuestion = document.querySelectorAll(".creating-quiz-question-title");
    if(arrayQuestions.length === Number(numberQuestions)){
        for(let i=0; i<arrayQuestions.length; i++){
            console.log(checksTitleQuestion(titleQuestion[i].children[0].value, titleQuestion[i].children[1].value));
        }
    }
    //checkHex(document.querySelector(".creating-quiz-question-title").children[1].value);
}

function checksTitleQuestion(string1, string2){
    console.log(string1, string2);
    if((string1.length >= 20) && (checkHex(string2))) return true;
    else return false;
}

function checkHex(string){

    let comparator = /^#[0-9A-F]{6}$/i;
    if(comparator.test(string)) return true;
    else return false;
}