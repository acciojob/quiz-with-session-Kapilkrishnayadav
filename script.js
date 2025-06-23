
      let ans = Array(5).fill(0);
      function handle(event) {
          let allOptions = event.target.parentNode.querySelectorAll("input");
          allOptions.forEach((elem, i) => {
              elem.checked = false;
            });
            // let index=Number(event.target.parentNode.dataset.number);
            // console.log(index)
            // ans[index]="hello";

            ans[Number(event.target.parentNode.dataset.number)]=event.target.value;
            console.log(ans);
        event.target.checked = true;
        sessionStorage.setItem("progress", JSON.stringify(ans));
      }
      // Do not change code below this line
      // This code will just display the questions to the screen
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

      // Display the quiz questions and choices
      let questionsDiv = document.querySelector(".questions");
      function renderQuestions() {
        questions.forEach((elem, i) => {
          questionsDiv.innerHTML += `
     <div data-number=${i} class="question">
        <div  id="questions">${i + 1}. ${questions[i].question}?</div>
        
        ${questions[i].choices
        .map((elem, j) => {
            return `<label for=${questions[i].choices[j]}>${String.fromCharCode(
                "a".charCodeAt(0) + j
            )}:- ${questions[i].choices[j]}</label>
            <input onclick="handle(event)" type="checkbox" name="option1" id=${
                questions[i].choices[j]
                } value=${questions[i].choices[j]} />`;
            })
            .join("")}
            </div>`;
        });
    }
    renderQuestions();
    if (sessionStorage.getItem("progress")) {
        let x = JSON.parse(sessionStorage.getItem("progress"));
        // document.getElementsByClassName("question");
        console.log(x);
        ans = [...x];
        x.forEach((elem, i) => {
          // console.log(elem);
          if (elem) document.getElementById(elem).checked = true;
          console.log(document.getElementById(elem));
          // document.getElementById(elem)
        });
      }
      function handleSubmit(event)
      {
        let score=0;
        ans.forEach((elem,i)=>{
            console.log(elem);
            console.log(questions[i].answer)
            if(elem==questions[i].answer)
            score++;
        })
        // console.log(score);
        document.getElementById("score").innerText=score;
        localStorage.setItem("score",JSON.stringify( score));
      }
document.getElementById("score").innerText=JSON.parse(localStorage.getItem("score"));
      