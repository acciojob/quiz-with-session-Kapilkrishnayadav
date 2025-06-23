const questions = [
  { question: "What is the capital of France?", choices: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
  { question: "What is the highest mountain in the world?", choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"], answer: "Everest" },
  { question: "What is the largest country by area?", choices: ["Russia", "China", "Canada", "United States"], answer: "Russia" },
  { question: "Which is the largest planet in our solar system?", choices: ["Earth", "Jupiter", "Mars"], answer: "Jupiter" },
  { question: "What is the capital of Canada?", choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"], answer: "Ottawa" },
];

const ans = Array(questions.length).fill(0);
const questionsDiv = document.getElementById("questions");

function renderQuestions() {
  questions.forEach((q, i) => {
    let questionHtml = `<div data-number="${i}" class="question"><div>${i + 1}. ${q.question}</div>`;

    q.choices.forEach((choice, j) => {
      const inputId = `q${i}_${j}`;
      questionHtml += `
        <label for="${inputId}">${String.fromCharCode(97 + j)}:- ${choice}</label>
        <input onclick="handle(event)" type="radio" name="question-${i}" id="${inputId}" value="${choice}" />
      `;
    });

    questionHtml += `</div>`;
    questionsDiv.innerHTML += questionHtml;
  });
}

function handle(event) {
  const parentDiv = event.target.closest(".question");
  const index = Number(parentDiv.dataset.number);
  ans[index] = event.target.value;
  sessionStorage.setItem("progress", JSON.stringify(ans));
}

function restoreProgress() {
  const progress = sessionStorage.getItem("progress");
  if (progress) {
    const storedAns = JSON.parse(progress);
    storedAns.forEach((value, i) => {
      if (value) {
        const radio = Array.from(
          document.querySelectorAll(`[name="question-${i}"]`)
        ).find((input) => input.value === value);
        if (radio) radio.checked = true;
        ans[i] = value;
      }
    });
  }
}

function handleSubmit(event) {
  let score = 0;
  ans.forEach((selected, i) => {
    if (selected === questions[i].answer) score++;
  });

  document.getElementById("score").innerText = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
}

renderQuestions();
restoreProgress();
document.getElementById("score").innerText = `Your score is ${localStorage.getItem("score") || 0} out of 5.`;
