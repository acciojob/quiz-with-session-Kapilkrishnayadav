 const questions = [
        {
          question: "What is the capital of France?",
          choices: ["Paris", "London", "Berlin", "Madrid"],
          answer: "Paris",
        },
        {
          question: "What is the highest mountain in the world?",
          choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
          answer: "Everest",
        },
        {
          question: "What is the largest country by area?",
          choices: ["Russia", "China", "Canada", "United States"],
          answer: "Russia",
        },
        {
          question: "Which is the largest planet in our solar system?",
          choices: ["Earth", "Jupiter", "Mars"],
          answer: "Jupiter",
        },
        {
          question: "What is the capital of Canada?",
          choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
          answer: "Ottawa",
        },
      ];

      const ans = Array(5).fill(null);

      function renderQuestions() {
        const questionsDiv = document.getElementById("questions");
        questions.forEach((q, i) => {
          let html = `<div data-number="${i}" class="question"><div>${q.question}?</div>`;
          q.choices.forEach((choice, j) => {
            const inputId = `q${i}_${j}`;
            html += `
              <label for="${inputId}">${String.fromCharCode(97 + j)}:- ${choice}</label>
              <input onclick="handle(event)" type="radio" name="question-${i}" id="${inputId}" value="${choice}" />
            `;
          });
          html += "</div>";
          questionsDiv.innerHTML += html;
        });
      }

      function handle(event) {
        const index = Number(event.target.closest(".question").dataset.number);
        ans[index] = event.target.value;
        sessionStorage.setItem("progress", JSON.stringify(ans));
      }

      function restoreProgress() {
        const progress = JSON.parse(sessionStorage.getItem("progress") || "[]");
        progress.forEach((value, i) => {
          if (value) {
            const inputs = document.querySelectorAll(`[name="question-${i}"]`);
            inputs.forEach(input => {
              if (input.value === value) input.checked = true;
            });
            ans[i] = value;
          }
        });
      }

      function handleSubmit(event) {
        let score = 0;
        ans.forEach((selected, i) => {
          if (selected === questions[i].answer) score++;
        });
        const result = `Your score is ${score} out of ${questions.length}.`;
        document.getElementById("score").innerText = result;
        localStorage.setItem("score", score);
      }

      renderQuestions();
      restoreProgress();

      const savedScore = localStorage.getItem("score");
      if (savedScore) {
        document.getElementById("score").innerText = `Your score is ${savedScore} out of ${questions.length}.`;
      }
