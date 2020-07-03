(function() {
    function setQuiz() {
        const output = []; //simpan untuk dimasukkan ke html
        //looping question nya
        question.forEach(
            (currQuiz, numQuiz) => {
                const answers = [];
                for (key in currQuiz.answers) {
                    //tiap loop masukkan list ke array untuk di input ke html
                    answers.push(
                        `<label>
                <input type="radio" name="question${numQuiz}" value="${key}">
                ${key} :
                ${currQuiz.answers[key]}
              </label>`
                    );
                }
                // masukkan soalnya

                output.push(
                    `<div class="slide">
              <div class="question"> ${currQuiz.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
                );
            }
        );

        // dijadiin string, masukkan ke innerhtml
        quizContainer.innerHTML = output.join('');
    }

    function showResults() {

        // ambil jawaban dari parent quizcontainer 
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // jawaban bener
        let numCorrect = 0;

        // looping
        question.forEach((currQuiz, numQuiz) => {

            // menemukan jawaban bener
            const answerContainer = answerContainers[numQuiz];
            const selector = `input[name=question${numQuiz}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // kalau benar
            if (userAnswer === currQuiz.correctAnswer) {
                numCorrect++;

                // ubah warna
                answerContainers[numQuiz].style.color = 'lightblue';
            }
            // salah atau kosong 
            else {
                // ubah warna
                answerContainers[numQuiz].style.color = 'rgba(250, 0, 0, .9)';
            }
        });

        // menunjukkan jumlah jawaban benar
        if (numCorrect === question.length) {
            resultsContainer.innerHTML = `WOW! You are 2Cool4School. You got ${numCorrect} correct answers out of ${question.length}!`;
        } else if (numCorrect < question.length && numCorrect > 0) {
            resultsContainer.innerHTML = `Congratulations you got ${numCorrect} correct answers out of ${question.length}`;
        } else {
            resultsContainer.innerHTML = `Try Again! You can do it!`;
        }
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if (currentSlide === 0) {
            previousButton.style.display = 'none';
        } else {
            previousButton.style.display = 'inline-block';
        }
        if (currentSlide === slides.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        } else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }


    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const question = [{
            question: "What is the capital city of New Zealand?",
            answers: {
                a: "Wellington",
                b: "Auckland",
                c: "Christchurch"
            },
            correctAnswer: "a"
        },
        {
            question: "Is 15267 modulus by 3 equal to 0?",
            answers: {
                a: "No",
                b: "Yes"
            },
            correctAnswer: "b"
        },
        {
            question: "2,5,11,23,...,95, what is the next number after 23?",
            answers: {
                a: "46",
                b: "24",
                c: "48",
                d: "47"
            },
            correctAnswer: "d"
        }, {
            question: "WWW stands for?",
            answers: {
                a: "World Wide Web",
                b: "World Wider Win",
                c: "World Wan Web"
            },
            correctAnswer: "a"
        },
        {
            question: "What is the capital city of India?",
            answers: {
                a: "Mumbai",
                b: "Jaipur",
                c: "New Delhi"
            },
            correctAnswer: "c"
        },
        {
            question: "Can you solve this? '9=90, 8=72, 7=56, 6=42, 3=?'",
            answers: {
                a: "12",
                b: "26",
                c: "16"
            },
            correctAnswer: "a"
        },
        {
            question: "What's the capital of Spain?",
            answers: {
                a: "Barcelona",
                b: "Madrid",
                c: "Valencia"
            },
            correctAnswer: "b"
        },
        {
            question: "What is the next number? '100,200,40,80,16,...'",
            answers: {
                a: "27",
                b: "4",
                c: "32"
            },
            correctAnswer: "c"
        },
        {
            question: "What is the next number? '8=72, 2=6, 5=30, 9=?'",
            answers: {
                a: "27",
                b: "90",
                c: "81"
            },
            correctAnswer: "b"
        },
        {
            question: "What is the next number? '11,15,20,...'",
            answers: {
                a: "26",
                b: "25",
                c: "24"
            },
            correctAnswer: "a"
        },
    ];


    setQuiz();


    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;


    showSlide(currentSlide);


    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
})();