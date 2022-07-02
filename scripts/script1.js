
let numberQuestions, numberLevel, imgUrl, quizzTitle, data;
let arrayQuestionsObj = [];
let arrayLevelObj = [];

const creationQuizzLayout = `
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

    document.querySelector("main").innerHTML = layoutBasicInformation
    setTimeout(function(){
        alert("Requisitos:\n-Título do quizz: deve ter no mínimo 20 e no máximo 65 caracteres\n-A URL da Imagem deve ser uma URL válida\n-Mínimo de perguntas: 3\n-Mínimo de níveis: 2");
    }, 300);
}



function basicInformation(){
    
    const dom = document.querySelector(".creating-quiz-basic-questions");
    const title = dom.children[0].value;
    const url = dom.children[1].value;
    const qttQuestions = dom.children[2].value;
    const qttLevel = dom.children[3].value;

    numberQuestions = qttQuestions;
    numberLevel = qttLevel;
    imgUrl = url;
    quizzTitle = title;
    checksBasicInformation(title, url, qttQuestions, qttLevel);
    
}

function checksBasicInformation(title, url, qttQuestions, qttLevel){
    if((title.length >= 20 && title.length <= 65) && (validURL(url)) && (qttQuestions >= 3) && (qttLevel >= 2)) renderQuizzQuestions();
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

function renderQuizzQuestions(){

    const quizzQuestionButton = `<button type="button" onclick="quizzQuestions();">Prosseguir pra criar níveis</button>`;
    
    const quizzQuestionLayout = `
        <section class="creating-quiz-questions-container banner">
            <h3 class="title">Crie suas perguntas</h3>
            <div class="creating-quiz-question">
                <h3>Pergunta 1</h3>
            </div>
        </section>
    `;
    document.querySelector("main").innerHTML = quizzQuestionLayout;

    for(let i=0; i<numberQuestions; i++){
        if(i==0){
            document.querySelector(".creating-quiz-question").innerHTML += creationQuizzLayout;
        }else{
            document.querySelector(".creating-quiz-questions-container").innerHTML += `
                <div class="creating-quiz-question-closed">
                <h3 class="title">Pergunta ${i+1}</h3>
                <img src="./images/create-outline.png" onclick="openingClosedQuestion(this);">
                </div>
            `;
        }
    } 

    document.querySelector(".creating-quiz-questions-container").innerHTML += quizzQuestionButton;

    setTimeout(function(){
        alert("Requisitos:\n-Texto da pergunta: no mínimo 20 caracteres\n-Cor de fundo: deve ser uma cor em hexadecimal (começar com #)\n-Textos das respostas: não pode estar vazio\n-A URL das imagens de resposta deve ser uma URL válida\n-Deve ter no mínimo uma pergunta incorreta, caso não queira mais respostas incorretas não preencher o campo da resposta");
    }, 300);
}

function openingClosedQuestion(elemento){
    elemento.classList.add("hidden");
    elemento.parentNode.classList.add("creating-quiz-question");
    elemento.parentNode.classList.remove("creating-quiz-question-closed");
    elemento.parentNode.innerHTML += creationQuizzLayout;

}

function quizzQuestions(){ 

    arrayQuestionsObj = [];
    let arrayQuestions = document.querySelectorAll(".creating-quiz-question");
    const titleQuestion = document.querySelectorAll(".creating-quiz-question-title");
    const correctAnswer = document.querySelectorAll(".creating-quiz-question-correct");
    const incorrectAnswer = document.querySelectorAll(".creating-quiz-question-incorrect");
    let counterTrue = 0;

    if(arrayQuestions.length === Number(numberQuestions)){
        for(let i=0; i<arrayQuestions.length; i++){
            if((checksTitleQuestion(titleQuestion[i].children[0].value, titleQuestion[i].children[1].value)) && (checksAnswer(correctAnswer[i].children[0].value, correctAnswer[i].children[1].value)) && (filterAnswer(incorrectAnswer, (i+1)*3))) {
                counterTrue++;
                arrayQuestionsObj.push({
                    title: titleQuestion[i].children[0].value,
                    color: titleQuestion[i].children[1].value,
                    answers: createAnswerObjects(createAnswerArray(correctAnswer, incorrectAnswer, i))
                });
            }
        }
        if(counterTrue === Number(numberQuestions)) renderLevelQuizz();
        else {
            alert("Preencha os dados novamente!");
            renderQuizzQuestions(numberQuestions);
        }
    }
}

function createAnswerObjects(array){
    let arrayOfObjects=[], counter=0;

    for(let i=0; i<(array.length)/2; i++){
        if(i==0){
            arrayOfObjects.push({
                text: array[counter],
                image: array[counter+1],
                isCorrectAnswer: true
            });
        }else{
            arrayOfObjects.push({
                text: array[counter],
                image: array[counter+1],
                isCorrectAnswer: false
            });
        }
        counter += 2;
    }
    return arrayOfObjects;
}

function createAnswerArray(arrayCorrect, arrayIncorrect, index){
    let array, newArray, tempArray=[];

    tempArray.push(arrayCorrect[index].children[0].value);
    tempArray.push(arrayCorrect[index].children[1].value);
    array = createIncorrect(arrayIncorrect, (index+1)*3);
    newArray = tempArray.concat(array);
    return newArray;
}

function createIncorrect(array, index){
    let arrayAux, newArray=[], counter=0;
    arrayAux = renderArrayIncorrect(array, index);
    for(let i=0; i<arrayAux.length; i++){
        if(arrayAux[i].children[0].value != "" && arrayAux[i].children[1].value != ""){
            newArray[counter] = arrayAux[i].children[0].value;
            newArray[counter+1] = arrayAux[i].children[1].value;
            counter += 2;
        }
    }
    return newArray;
}

function renderArrayIncorrect(array, index){
    let i, arrayAux=[];
    if(index === 3) i = 0;
    else i = index - 3;
    for(let j=i; j<index; j++){
        arrayAux.push(array[j]);
    }
    return arrayAux;
}

function filterAnswer(array, counter){
    let checkTrue=[], arrayAux;
    arrayAux = renderArrayIncorrect(array, counter);
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
                <input type="number" placeholder="% de acerto mínima">
                <input type="text" placeholder="URL da imagem do nível">
                <textarea placeholder="Descrição do nível"></textarea>
            </div>
        </section>
    `;

    for(let i=1; i<numberLevel; i++){
        document.querySelector(".creating-quiz-level-container").innerHTML += `
            <div class="creating-quiz-level-closed">
            <h3 class="title">Nível ${i+1}</h3>
            <img onclick="openingClosedLevel(this);" src="./images/create-outline.png">
            </div>
        `;
    }

    document.querySelector(".creating-quiz-level-container").innerHTML += `<button onclick="quizzLevel();" type="button">Finalizar Quizz</button>`;

    setTimeout(function(){
        alert("Requisitos:\n-Título do nível: mínimo de 10 caracteres\n-% de acerto mínima: um número entre 0 e 100\n-A URL da imagem do nível deve ser uma URL válida\n-Descrição do nível: mínimo de 30 caracteres\n-É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%");
    }, 300);
}

function openingClosedLevel(elemento){
    elemento.classList.add("hidden");
    elemento.parentNode.classList.add("creating-quiz-level");
    elemento.parentNode.classList.remove("creating-quiz-level-closed");
    elemento.parentNode.innerHTML += `                
        <input type="text" placeholder="Título do nível">
        <input type="number" placeholder="% de acerto mínima">
        <input type="text" placeholder="URL da imagem do nível">
        <textarea placeholder="Descrição do nível"></textarea>
    `;
}

function quizzLevel(){
    arrayLevelObj = [];
    if( Number(numberLevel) === (document.querySelectorAll(".creating-quiz-level").length)){
        const arrayInput = document.querySelectorAll(".creating-quiz-level input");
        const arrayTextArea = document.querySelectorAll(".creating-quiz-level textarea");

        let counter=0, counterTrue=0;
        for(let i=0; i<Number(numberLevel); i++){
            if(checksLevelAnswer(arrayInput[counter].value, arrayInput[counter+1].value, arrayInput[counter+2].value, arrayTextArea[i].value)) {
                counterTrue++;
                arrayLevelObj.push({
                    title: arrayInput[counter].value,
                    image: arrayInput[counter+2].value,
                    text: arrayTextArea[i].value,
                    minValue: Number(arrayInput[counter+1].value)
                });
            }
            counter += 3;
        }

        if(counterTrue === Number(numberLevel)){
            if(checkAmountOfLevelZero(arrayInput)) sendQuizzAPI();
            else {
                alert("Preencha os dados novamente!");
                renderLevelQuizz();
            }
        }else{
            alert("Preencha os dados novamente!");
            renderLevelQuizz();
        }
    }
}

function checksLevelAnswer(string1, string2, string3, string4){

    if(string1.length > 9 && (string2 >= 0 && string2 <= 100) && (validURL(string3)) && string4.length > 29) return true;
    else return false;
}

function checkAmountOfLevelZero(array){
    let counter=1, counterZero=0;
    for(let i=0; i<Number(numberLevel); i++){
        if(Number(array[counter].value) === 0) counterZero++;
        counter += 3;
    }
    if(counterZero > 0) return true;
    else return false;
}

function sendQuizzAPI(){

    const quizObject = {
        title: quizzTitle,
        image: imgUrl,
        questions: arrayQuestionsObj,
        levels: arrayLevelObj
    }
    
    const promise = axios.post('https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes', quizObject);  
    
    promise.then(sendLocalStorage);
    promise.catch(errorSendAPI); 

}

function sendLocalStorage(msg){
    const userQuizz = msg.data;

    const quizObject = {
        id: userQuizz.id,
        title: userQuizz.title,
        image: userQuizz.image,
        questions: userQuizz.questions,
        levels: userQuizz.levels,
        key: userQuizz.key
    }
    
    const dadosSerializados = JSON.stringify(quizObject);
    localStorage.setItem(userQuizz.id, dadosSerializados);
    
    data = msg.data;
    renderSuccessScreen();
}

function errorSendAPI(error){
    console.log(error);
}

function renderYourQuizz(){
    getQuiz(data);
}

function renderSuccessScreen(){

    document.querySelector("main").innerHTML = `
    <section class="created-quiz-container">
    <h3 class="title">Seu quizz está pronto!</h3>
    <div class="quiz">
        <img src="${imgUrl}">
        <div class="quiz-gradient"></div>
        <p>${quizzTitle}</p>
    </div>
    </section>
    <section class="button">
        <button class="acess-quiz" onclick="renderYourQuizz();">Acessar Quizz</button>
        <p onclick="renderStartPage();">Voltar pra home</p>
    </section>
    `;
}