//projects data json format
const projects = [{
        "title": `to-do app`,
        "image": `https://images.pexels.com/photos/7150986/pexels-photo-7150986.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
        "para": `Lorem adipisicing elit. optio reprehenderit.`,
        "link": `html/todo.html`,
        "category": `web app`,
        "id": 1,
    },
    {
        "title": `tic tac`,
        "image": `https://images.pexels.com/photos/3400795/pexels-photo-3400795.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
        "para": `Lorem ipsum dolor reprehenderit. here is all anything`,
        "link": `html/todo.html`,
        "category": `game`,
        "id": 2,
    },
    {
        "title": `portfolio`,
        "image": `https://images.pexels.com/photos/8134266/pexels-photo-8134266.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
        "para": `Lorem ipsum dolor adipisicing elit. optio reprehenderit.`,
        "link": `html/todo.html`,
        "category": `website`,
        "id": 3,
    },
    {
        "title": `count down`,
        "image": `https://images.pexels.com/photos/5985274/pexels-photo-5985274.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
        "para": `Lorem ipsum dolor consectetur adipisicing elit. optio reprehenderit.`,
        "link": `html/todo.html`,
        "category": `web app`,
        "id": 4,
    },
    {
        "title": `weather app`,
        "image": `https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
        "para": `Lorem reprehenderit. any kind any`,
        "link": `html/todo.html`,
        "category": `web app`,
        "id": 5,
    },
    {
        "title": `candy crush`,
        "image": `https://images.pexels.com/photos/228963/pexels-photo-228963.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
        "para": `Lorem ipsum dolor sit.`,
        "link": `html/todo.html`,
        "category": `game`,
        "id": 6,
    },
    {
        "title": `Restaurant Website`,
        "image": `https://images.pexels.com/photos/9882300/pexels-photo-9882300.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
        "para": `Lorem ipsum optio reprehenderit.`,
        "link": `html/todo.html`,
        "category": `website`,
        "id": 7,
    },
    {
        "title": `shopping cart`,
        "image": `https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
        "para": `Lorem ipsum dolor adipisicing elit. optio reprehenderit.`,
        "link": `html/todo.html`,
        "category": `web app`,
        "id": 8,
    },
    {
        "title": `e-commerce website`,
        "image": `https://images.pexels.com/photos/38519/macbook-laptop-ipad-apple-38519.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
        "para": `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
        "link": `html/todo.html`,
        "category": `website`,
        "id": 9,
    },
    {
        "title": `calculator`,
        "image": `https://images.pexels.com/photos/5915147/pexels-photo-5915147.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
        "para": `Lorem ipsum dolor calculating elit.`,
        "link": `html/todo.html`,
        "category": `apps`,
        "id": 10,
    },
    {
        "title": `instagram`,
        "image": `https://images.pexels.com/photos/238480/pexels-photo-238480.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
        "para": `Lorem ipsum dolor calculating elit. instagram.`,
        "link": `html/todo.html`,
        "category": `clones`,
        "id": 11,
    },
    {
        "title": `facebook`,
        "image": `https://images.pexels.com/photos/927629/pexels-photo-927629.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
        "para": `Lorem ipsum dolor calculating elit. facebook regain`,
        "link": `html/todo.html`,
        "category": `clones`,
        "id": 12,
    },

]


// about section
const aboutDesc = document.querySelector('.about-desc');

aboutDesc.addEventListener('click', e => {
    if (e.target.dataset.id) {
        const targetContent = document.querySelector("#" + e.target.dataset.id);
        const contentContainer = targetContent.parentElement;
        const btnContainer = e.target.parentElement;

        btnContainer.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
        contentContainer.querySelector('.active').classList.remove('active');
        targetContent.classList.add('active');
    }
})

// about section related ends

window.addEventListener('DOMContentLoaded', _ => {
    createBtns();
    setupBoxes(projects);
})


//projects section starts

const btnContainer = document.querySelector('.filter-btns');
//creating btns
const createBtns = _ => {

    const btnsCategory = projects.reduce((filtered, btn) => {
        if (!filtered.includes(btn.category)) {
            filtered.push(btn.category)
        }
        return filtered;
    }, [`all`])

    const btns = btnsCategory.map((btn) => {
        let btnClass = ``;
        if (btn === `all`) btnClass = ` active`;
        return `<button class="btn filter${btnClass}" data-id="${btn}">${btn}</button>`
    }).join('');
    btnContainer.innerHTML = btns;

    const filterBtns = document.querySelectorAll('.filter');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            const id = e.currentTarget.dataset.id;
            const targetContents = filterContents(id);
            btnContainer.querySelector('.active').classList.remove('active');
            e.currentTarget.classList.add('active');

            if (id === `all`)
                setupBoxes(projects);
            else
                setupBoxes(targetContents);
        })
    })
}


const filterContents = (id) => {
        return projects.filter(item => {
            return item.category === id;
        })
    }
    // creating boxes
const projectsContainer = document.querySelector('.project-list');
const setupBoxes = (contents) => {
        const finalTargetContents = contents.map(content => {
            return `<article class="project-content" style="background-image:url(${content.image})" onclick="window.open('${content.link}')">
        <i class="fas fa-expand-alt"></i>
        <div class="project-content-desc">
            <h3>${content.title}</h3>
            <p>${content.para}</p>
        </div>
    </article>`
        }).join('');

        projectsContainer.innerHTML = finalTargetContents;
    }
    // project section ends