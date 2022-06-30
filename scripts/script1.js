
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

function renderQuizzCreation(){

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
    if((title.length >= 20 && title.length <= 65) && (validURL(url)) && (qttQuestions >= 3) && (qttLevel >= 2)) return renderQuizzQuestions(qttQuestions);
    else{
        alert("Preencha novamente os dados!");
        renderQuizzCreation();
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

function renderQuizzQuestions(qttQuestions){

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

}

function quizzQuestions(){ 

    let arrayQuestions = document.querySelectorAll(".creating-quiz-question");
    const titleQuestion = document.querySelectorAll(".creating-quiz-question-title");
    const correctAnswer = document.querySelectorAll(".creating-quiz-question-correct");
    const incorrectAnswer = document.querySelectorAll(".creating-quiz-question-incorrect");
    let counterTrue = 0;

    if(arrayQuestions.length === Number(numberQuestions)){
        for(let i=0; i<arrayQuestions.length; i++){
            if((checksTitleQuestion(titleQuestion[i].children[0].value, titleQuestion[i].children[1].value)) && (checksAnswer(correctAnswer[i].children[0].value, correctAnswer[i].children[1].value)) && (filterAnswer(incorrectAnswer, (i+1)*3))) counterTrue++;
        }
        if(counterTrue === 3) renderLevelQuizz();
        else {
            alert("Preencha os dados novamente!");
            renderQuizzQuestions(numberQuestions);
        }
    }
}

function filterAnswer(array, counter){
    let i, arrayAux = [], checkTrue=[];
    if(counter === 3) i = 0;
    else i = counter - 3;
    for(let j=i; j<counter; j++){
        arrayAux.push(array[j]);
    }
    for(let i=0; i<arrayAux.length; i++) {
        if((arrayAux[i].children[0].value) === "" && (arrayAux[i].children[1].value) === "") checkTrue.push(0);
        else {
            if(checksAnswer(arrayAux[i].children[0].value, arrayAux[i].children[1].value)) checkTrue.push(1);
            else checkTrue.push(2);
        }
    }
    
    if(checksArrayAnswer(checkTrue)) return true;
    else return false;
}

function checksArrayAnswer(array){
    let checks = true, counterZero=0, counterOne=0, i=0;

    while(i<array.length){
        if(array[i] === 2){
            checks = false;
            break;
        }else{
            if(array[i] === 0) counterZero++;
            if(array[i] === 1) counterOne++;
        }
        i++;
    }

    if((counterZero!=3 && counterOne > 0 && (counterOne+counterZero) === 3) && checks === true) return true;
    else return false;
}

function checksTitleQuestion(string1, string2){
    if((string1.length >= 20) && (checkHex(string2))) return true;
    else return false;
}

function checksAnswer(string1, string2){
    if((string1.length != 0) && (validURL(string2))) return true;
    else return false;
}

function checkHex(string){

    let comparator = /^#[0-9A-F]{6}$/i;
    if(comparator.test(string)) return true;
    else return false;
}

function renderLevelQuizz(){

    document.querySelector("main").innerHTML = `
        <section class="creating-quiz-level-container banner">
            <h3 class="title">Agora, decida os níveis!</h3>
            <div class="creating-quiz-level">
                <h3>Nível 1</h3>
                <input type="text" placeholder="Título do nível">
                <input type="text" placeholder="% de acerto mínima">
                <input type="text" placeholder="URL da imagem do nível">
                <textarea placeholder="Descrição do nível"></textarea>
            </div>
            <div class="creating-quiz-level-closed">
                <h3 class="title">Nível 2</h3>
                <img src="./images/create-outline.png">
            </div>
            <button type="button">Finalizar Quizz</button>
        </section>
    `;
}