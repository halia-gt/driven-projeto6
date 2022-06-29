function basicInformation(){
    
    const dom = document.querySelector(".creating-quiz-basic-questions");
    const title = dom.children[0].value;
    const url = dom.children[1].value;
    const qttQuestions = dom.children[2].value;
    const qttLevel = dom.children[3].value;

    console.log(checksBasicInformation(title, url, qttQuestions, qttLevel));
    
}

function checksBasicInformation(title, url, qttQuestions, qttLevel){
    if((title.length >= 20 && title.length <= 65) && (validURL(url)) && (qttQuestions >= 3) && (qttLevel >= 2)) return true;
    else return false;
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
    teste(document.querySelector(".creating-quiz-question-title").children[1].value);
}

function checkHex(string){
    let comparator = /^#[0-9A-F]{6}$/i;

    if(comparator.test(string) console.log("true");
    else console.log("false");
}