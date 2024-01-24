const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const questions = [
    {
        topic: 1,
        name: 'General Knowledge',
        question: 'What is the capital of France?',
        answer: 'Paris',
    },
    {
        topic: 1,
        name: 'General Knowledge',
        question: 'Which planet is known as the Red Planet?',
        answer: 'Mars',
    },
    {
        topic: 1,
        name: 'General Knowledge',
        question: 'What is the largest ocean on Earth?',
        answer: 'Pacific Ocean',
    },
    {
        topic: 1,
        name: 'General Knowledge',
        question: 'What is the tallest mountain in the world?',
        answer: 'Mount Everest',
    },
    {
        topic: 1,
        name: 'General Knowledge',
        question: 'What is the longest river in the world?',
        answer: 'Nile',
    },
    {
        topic: 2,
        name: 'Capital Cities',
        question: 'What is the capital of Germany?',
        answer: 'Berlin',
    },
    {
        topic: 2,
        name: 'Capital Cities',
        question: 'What is the capital of Italy?',
        answer: 'Rome',
    },
    {
        topic: 2,
        name: 'Capital Cities',
        question: 'What is the capital of Spain?',
        answer: 'Madrid',
    },
    {
        topic: 2,
        name: 'Capital Cities',
        question: 'What is the capital of Portugal?',
        answer: 'Lisbon',
    },
    {
        topic: 2,
        name: 'Capital Cities',
        question: 'What is the capital of Greece?',
        answer: 'Athens',
    },
    {
        topic: 3,
        name: 'Literature',
        question: 'Who wrote "To Kill a Mockingbird"?',
        answer: 'Harper Lee',
    },
    {
        topic: 3,
        name: 'Literature',
        question: 'Who wrote "1984"?',
        answer: 'George Orwell',
    },
    {
        topic: 3,
        name: 'Literature',
        question: 'Who wrote "Moby Dick"?',
        answer: 'Herman Melville',
    },
    {
        topic: 3,
        name: 'Literature',
        question: 'Who wrote "Pride and Prejudice"?',
        answer: 'Jane Austen',
    },
    {
        topic: 3,
        name : 'Literature',
        question: 'Who wrote "The Great Gatsby"?',
        answer: 'F. Scott Fitzgerald',
    },
];
function uniqueTopics(array, key) {
    return [...new Map(array.map(item => [item[key], item])).values()];
}

function printTopics() {
    const topics = uniqueTopics(questions.map(q => ({id: q.topic, name: q.name})), 'id');
    console.log('Available topics:');
    topics.forEach(topic => console.log(`${topic.id} - ${topic.name}`));
}
function chooseTopic() {
    printTopics();
    rl.question('Choose a topic id: ', (topicId) => {
        const selectedQuestions = questions.filter(q => q.topic === parseInt(topicId));
        if (selectedQuestions.length > 0) {
            startQuiz(selectedQuestions);
        } else {
            console.log('Invalid topic id (Must be a number). Please try again.');
            chooseTopic();
        }
    });
}

function startQuiz(selectedQuestions) {
    let score = 0;
    let currentQuestionIndex = 0;

    function askQuestion() {
        const currentQuestion = selectedQuestions[currentQuestionIndex];

        rl.question(currentQuestion.question + '\nYour answer: ', (userAnswer) => {
            if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
                console.log('Correct!\n');
                score++;
            } else {
                console.log(`Incorrect. The correct answer is: ${currentQuestion.answer}\n`);
            }

            currentQuestionIndex++;

            if (currentQuestionIndex < selectedQuestions.length) {
                askQuestion();
            } else {
                endQuiz();
            }
        });
    }

    function endQuiz() {
        console.log(`Quiz complete! Your score: ${score}/${selectedQuestions.length}`);
        rl.close();
    }

    askQuestion();
}

chooseTopic();