
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

function renderQuestionsQuizz(){

    const layoutQuestionsQuizz = `
        <section class="creating-quiz-questions-container banner">
            <h3 class="title">Crie suas perguntas</h3>
            <div class="creating-quiz-question">
                <h3>Pergunta 1</h3>
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
            </div>
            <div class="creating-quiz-question-closed">
                <h3 class="title">Pergunta 2</h3>
                <img src="./images/create-outline.png">
            </div>
            <button type="button" onclick="quizzQuestions();">Prosseguir pra criar níveis</button>
        </section>
    `;
    document.querySelector("main").innerHTML = layoutQuestionsQuizz;
}

function basicInformation(){
    
    const dom = document.querySelector(".creating-quiz-basic-questions");
    const title = dom.children[0].value;
    const url = dom.children[1].value;
    const qttQuestions = dom.children[2].value;
    const qttLevel = dom.children[3].value;

    console.log(checksBasicInformation(title, url, qttQuestions, qttLevel));
    
}

function checksBasicInformation(title, url, qttQuestions, qttLevel){
    if((title.length >= 20 && title.length <= 65) && (validURL(url)) && (qttQuestions >= 3) && (qttLevel >= 2)) return renderQuestionsQuizz();
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
};

function quizzQuestions(){
    checkHex(document.querySelector(".creating-quiz-question-title").children[1].value);
}

function checkHex(string){

    let comparator = /^#[0-9A-F]{6}$/i;
    if(comparator.test(string)) return true;
    else return false;
}