const readline = require('readline');

const questions = [
    {
        question: 'What is the capital of France?',
        answer: 'Paris',
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answer: 'Mars',
    },
    {
        question: 'Who is the biggest faggot of the class?',
        answer: 'Paul Guiselin',
    },
];

function startQuiz() {
    let score = 0;
    let currentQuestionIndex = 0;

    function askQuestion() {
        const currentQuestion = questions[currentQuestionIndex];

        rl.question(currentQuestion.question + '\nYour answer: ', (userAnswer) => {
            if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
                console.log('Correct!\n');
                score++;
            } else {
                console.log(`Incorrect. The correct answer is: ${currentQuestion.answer}\n`);
            }

            currentQuestionIndex++;

            if (currentQuestionIndex < questions.length) {
                askQuestion();
            } else {
                endQuiz();
            }
        });
    }

    function endQuiz() {
        console.log(`Quiz complete! Your score: ${score}/${questions.length}`);
        rl.close();
    }

    askQuestion();
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

startQuiz();
