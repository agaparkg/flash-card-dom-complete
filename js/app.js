const addQuestionBtn = document.getElementById("show-btn");
const questionCard = document.querySelector(".question-card");
const closeFormBtn = document.querySelector(".close-btn");
const questionForm = document.getElementById("question-form");
const errorMessage = document.querySelector(".feedback");
const questionInput = document.getElementById("question-input");
const answerInput = document.getElementById("answer-input");
const questionList = document.getElementById("questions-list");

function getDataLocalStorage() {
  return JSON.parse(localStorage.getItem("flash-cards")) || [];
}

function updateLocalStorage(data) {
  localStorage.setItem("flash-cards", JSON.stringify(data));
}

addQuestionBtn.addEventListener("click", () => {
  questionCard.classList.add("showItem");
});

closeFormBtn.addEventListener("click", () => {
  questionCard.classList.remove("showItem");
});

let questions = getDataLocalStorage();

questionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const qValue = questionInput.value.trim();
  const aValue = answerInput.value.trim();

  if (qValue !== "" || aValue !== "") {
    const newQuestion = {
      id: questions.length ? questions[questions.length - 1].id + 1 : 1,
      question: qValue,
      answer: aValue,
    };

    questions.push(newQuestion);
    updateLocalStorage(questions);
    generateQuestionList(questions);
    clearFields();
  } else {
    errorMessage.classList.add("showItem", "alert-danger");
    errorMessage.textContent = "cannot add empty values";

    setTimeout(() => {
      errorMessage.classList.remove("showItem", "alert-danger");
    }, 2000);
  }
});

function clearFields() {
  questionInput.value = "";
  answerInput.value = "";
}

function generateQuestionList(questions) {
  questionList.innerHTML = "";

  console.log("questions", questions);

  for (let question of questions) {
    generateQuestionListItem(question);
  }
}

function generateQuestionListItem(questionParam) {
  console.log(questionParam);
  const { question, answer } = questionParam;

  const newQItem = `
        <div class="col-md-4">
          <div class="card card-body flashcard my-3">
            <h4 class="text-capitalize">${question}</h4>
            <a href="#" onclick="toggleShowAnswer(event)" class="text-capitalize my-3 show-answer"
              >show/hide answer</a
            >
            <h5 class="answer mb-3">${answer}</h5>
            <div class="flashcard-btn d-flex justify-content-between">
              <a
                href="#"
                id="edit-flashcard"
                class="btn my-1 edit-flashcard text-uppercase"
                data-id=""
                >edit</a
              >
              <a
                href="#"
                id="delete-flashcard"
                class="btn my-1 delete-flashcard text-uppercase"
                >delete</a
              >
            </div>
          </div>
        </div>
    `;

  questionList.innerHTML += newQItem;
}

generateQuestionListItem(questions);

function toggleShowAnswer(e) {}
