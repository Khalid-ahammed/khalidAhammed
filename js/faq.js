// questions json type data
const questions = [{
        "title": `Do you have any question?`,
        "answer": `Lorem ipsum dolor sit amet, consectetur adipisicing elit. At perspiciatis doloribus architecto voluptate placeat necessitatibus iste numquam possimus debitis quidem.`,
    },
    {
        "title": `Do you want to question?`,
        "answer": `Lorem ipsum dolor sit amet, consectetur adipisicing elit. At perspiciatis doloribus architecto voluptate placeat necessitatibus iste numquam possimus debitis quidem. doloribus architecto voluptate placeat necessitatibus iste numquam possimus debitis quidem.`,
    },
    {
        "title": `Do you support him?`,
        "answer": `Lorem ipsum dolor sit amet, consectetur adipisicing elit. At perspiciatis doloribus architecto voluptate placeat necessitatibus iste numquam possimus debitis quidem. doloribus architecto voluptate placeat necessitatibus iste numquam possimus debitis quidem. doloribus architecto voluptate placeat necessitatibus iste numquam possimus debitis quidem.`,
    },
    {
        "title": `What to do?`,
        "answer": `Lorem ipsum dolor sit amet, consectetur adipisicing elit. At perspiciatis doloribus architecto voluptate placeat necessitatibus iste numquam possimus debitis quidem.`,
    },
    {
        "title": `What should you do?`,
        "answer": `Lorem ipsum dolor sit amet, consectetur adipisicing elit. At perspiciatis doloribus architecto voluptate placeat necessitatibus iste numquam possimus debitis quidem. doloribus architecto voluptate placeat necessitatibus iste numquam possimus debitis quidem.`,
    },
    {
        "title": `Any other question that you want to tell us?`,
        "answer": `Lorem ipsum dolor sit amet, consectetur adipisicing elit. At perspiciatis doloribus architecto voluptate placeat necessitatibus iste numquam possimus debitis quidem. doloribus architecto voluptate placeat necessitatibus iste numquam possimus debitis quidem.`,
    },
]

// selectors
const questionContainer = document.querySelector('.questions-container');

//function
const createItems = (items) => {
    const createdItems = items.map(item => {
        return `<article class="question">
        <div class="question-header">
            <h3>${item.title}</h3>
            <button class="question-btns">
                <i class="fas fa-plus-square plus"></i>
                <i class="fas fa-minus-square minus"></i>
            </button>
        </div>
        <div class="question-body">
            <p class="ques-ans">${item.answer}</p>
        </div>
    </article>`
    }).join('');
    questionContainer.innerHTML = createdItems;
    const questions = document.querySelectorAll('.question');
    questions.forEach(quesitem => {
        quesitem.querySelector('.question-btns').addEventListener('click', e => {
            if (questionContainer.querySelector('.active') && questionContainer.querySelector('.active') !== quesitem)
                questionContainer.querySelector('.active').classList.remove('active');

            quesitem.classList.toggle('active');
        })
    })
}

window.addEventListener('DOMContentLoaded', _ => {
    createItems(questions);
});