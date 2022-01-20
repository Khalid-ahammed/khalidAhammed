const menuItems = [
    { item: `home`, link: `home` },
    { item: `about me`, link: `about` },
    { item: `projects`, link: `projects` },
    { item: `contact me`, link: `contact` },
];
const accentColors = [
    { color: `white`, id: `white` },
    { color: `black`, id: `black` },
    { color: `grey`, id: `grey` },
];
const socialLinks = [
    { linkName: `<i class="fab fa-facebook-square"></i>`, linkTarget: `#` },
    { linkName: `<i class="fab fa-github-square"></i>`, linkTarget: `#` },
    { linkName: `<i class="fab fa-instagram-square"></i>`, linkTarget: `#` },
]

const createAccentColors = (accentColors) => {
    return accentColors.map((accentColor, index) => {
        let defaultClass = `color-palate`;
        if (index === 0)
            defaultClass = `color-palate default`
        return `<span class="${defaultClass}" style="background-color:${accentColor.color};" id=${accentColor.id}"></span>`
    }).join('');
}
const createlinks = (menuItems) => {
    return menuItems.map(menuItem => {
        return `<li class="menu-item"><a href="#${menuItem.link}" class="link">${menuItem.item}</a></li>`
    }).join('');
}
const createSocialLinks = (socialLinks) => {
    return socialLinks.map(link => {
        return `<a target="_blank" href="${link.linkTarget}">${link.linkName}</a>`;
    }).join('');
}
const headerTitle = `Khalid Ahammed`;
const headerTitlePara = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dicta illum. Perferendis accusamus architecto corporis temporibus totam consectetur nisi exercitationem.`;
const headerTag = document.getElementById('header');
const upperArrow = document.getElementById('upper-arrow');
const footer = document.getElementById('footer');
const footerTopOffset = footer.offsetTop - 200;
// sections
const homeSec = document.getElementById('home');
const aboutSec = document.getElementById('about');
const projectSec = document.getElementById('projects');
const contactSec = document.getElementById('contact');

const webLocation = homeSec;
// const webLocation = window.location.href.includes('index');

document.addEventListener('DOMContentLoaded', () => {
    if (!webLocation) {
        headerTag.classList.add('onpage');
        headerTag.onclick = (() => {
            window.open('../index.html');
            window.close(webLocation);
        })
    }
    createHeader();
    createFooter();
    setupTheme();
    setScrollEvents();

})

// scroll related
const setScrollEvents = () => {
        window.addEventListener('scroll', () => {
            const scrollHeight = window.pageYOffset;
            const headerTagHeight = headerTag.getBoundingClientRect().height;

            if (scrollHeight > headerTagHeight) {
                header.classList.add('fixed-header')
            } else {
                header.classList.remove('fixed-header')
            }

            if (webLocation) {
                if (scrollHeight > 300 && scrollHeight < contactSec.offsetTop && window.innerWidth > 800) {
                    upperArrow.style.display = "grid";
                } else if (scrollHeight > 300 && scrollHeight < (contactSec.offsetTop + window.innerWidth * .6) && window.innerWidth < 800) {
                    upperArrow.style.display = "grid";
                } else {
                    upperArrow.style.display = "none";
                }
                const links = document.querySelectorAll('.link');
                links.forEach((link, index) => {
                    const id = link.getAttribute('href').slice(1);
                    const element = document.getElementById(id);
                    let scrollToHeight = element.offsetTop - headerTagHeight * 2;

                    if (scrollHeight >= scrollToHeight && scrollHeight < (scrollToHeight + element.offsetHeight)) {
                        link.style.color = `var(${golden})`;
                    } else {
                        link.style.color = `var(${brown})`;
                    }

                })
            }

        })
    }
    // scroll related ends

// Header related starts
const hcolor = document.querySelector('#hcolors');

const createHeader = () => {
        let themeColors = createAccentColors(accentColors);
        let accColor = `<div class="accent-colors">
        ${themeColors}
    </div>`;
        let imageLink = `images/logo.png`
            // const webLocation = window.location.href.includes('index');
        if (!webLocation) {
            hcolor.innerHTML = `<div class="accent-colors">
            ${themeColors}
        </div>`;
            themeColors = ``;
            accColor = ``;
            imageLink = `../images/logo.png`
        }
        const header = `<nav class="container">
    <div class="nav-center">
        <div class="nav-inst">
            <a href="index.html" class="nav-logo-container"><img src=${imageLink} alt="My logo" class="nav-logo"></a>
            ${accColor}
        </div>
        <button class="nav-toggler">
            <i class="fas fa-bars"></i>
        </button>
    </div>
    <div class="link-container">
        <ul class="nav-menu">
        ${createlinks(menuItems)}
        </ul>
    </div>
</nav>`;
        headerTag.innerHTML = header;

        // header extensions
        const colors = document.querySelectorAll('.color-palate');
        setTheme(colors);

        const navToggler = document.querySelector('.nav-toggler');
        const navMenu = document.querySelector('.nav-menu');
        const linkContainer = document.querySelector('.link-container');
        const links = document.querySelectorAll('.link');
        links[0].style.color = `var(${golden})`;


        links.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                if (!document.body.classList.contains('hidden-overflow') && !e.currentTarget.classList.contains('projectId') && window.innerWidth < 800)
                    document.body.classList.add('hidden-overflow');
                else {
                    document.body.classList.remove('hidden-overflow');
                }

                const overlay = document.getElementById('overlay');
                overlay.classList.remove('active')

                let linkContainerHeight = linkContainer.getBoundingClientRect().height;
                const headerTagHeight = headerTag.getBoundingClientRect().height;
                const id = e.currentTarget.getAttribute('href').slice(1);
                const element = document.getElementById(id);
                const isFixedHeader = headerTag.classList.contains('fixed-header');
                const media = 800;

                let elementPosition = element.offsetTop - headerTagHeight - 10;

                if (!isFixedHeader) {
                    elementPosition = elementPosition - headerTagHeight;
                    if (window.innerWidth > media) {
                        elementPosition = elementPosition + headerTagHeight / 2 + 15;
                        if (window.innerHeight < 550) {
                            elementPosition = elementPosition - headerTagHeight / 2 - 15;
                        }
                    }
                }
                if (headerTagHeight > 82) {
                    elementPosition = elementPosition + linkContainerHeight;
                }
                // console.log(element.offsetTop, elementPosition);
                window.scrollTo({
                    left: 0,
                    top: elementPosition,
                })

                linkContainer.style.height = "0";
            })

        })

        navToggler.addEventListener('click', () => {
            const menuHeight = navMenu.getBoundingClientRect().height;
            let linkContainerHeight = linkContainer.getBoundingClientRect().height;
            const isFixedHeader = headerTag.classList.contains('fixed-header');
            document.body.classList.toggle('hidden-overflow');
            if (isFixedHeader) {
                overlay.classList.add('active');
            } else {
                overlay.classList.remove('active');
            }

            if (linkContainerHeight === 0) {
                linkContainer.style.height = `${menuHeight}px`;

            } else {
                linkContainer.style.height = "0";
                overlay.classList.remove('active')
            }
        })
    }
    // header related ends


// footer related starts
const createFooter = () => {
    const footerInner = `<div class="top-arrow">
    <a onclick="window.scrollTo({top:0,left:0})">
        <i class="fas fa-home"></i>
    </a>
</div>
<hr class="styled-hr">
<div class="footer-content container">
    <div class="social-links">${createSocialLinks(socialLinks)}</div>
</div>

<div class="copy-right">
    <p>&copy; 2021 Khalid Ahammed Uzzal. All rights reserved</p>
</div>`;
    footer.innerHTML = footerInner;
}

// footer related ends

// color theme related;

const setTheme = (colorPalates) => {
    colorPalates.forEach(item => {
        item.addEventListener('click', e => {
            const itembackgroundColor = e.currentTarget.style.backgroundColor;
            localStorage.setItem('colors', itembackgroundColor);
            setupTheme();
        })
    })
}

const mainDark = '--dark';
const lightest = '--lightest';
const bodyColor = '--clr-white';
const golden = '--golden';
const brown = '--brown';
const recColor = '--rec-color';
const lightShadow = '--light-shadow';
const darkShadow = '--dark-shadow';

const white = `white`,
    dark = `black`,
    grey = `grey`;



const setupTheme = () => {
    const getCurrenHour = new Date().getHours();

    const isDay = getCurrenHour > 7 && getCurrenHour < 18;
    const getColor = localStorage.getItem('colors') ? localStorage.getItem('colors') : isDay ? white : dark;


    const accentColor = document.querySelector('.accent-colors');
    const palates = accentColor.querySelectorAll('.color-palate');
    palates.forEach(palate => {
        const palateStyle = palate.style.backgroundColor;
        if (palateStyle === getColor) {
            accentColor.querySelector('.default').classList.remove('default');
            palate.classList.add('default');
        }
    })
    const navToggler = document.querySelector('.nav-toggler');

    let _dark, _lightest, _body, _golden, _brown, _recColor, _lightShadow, _darkShadow;
    if (getColor === white) {
        _dark = '#3E1604';
        _lightest = '#FCF9D3';
        _body = 'rgb(245, 239, 239)';
        _golden = '#CCAF5E';
        _brown = '#764704';
        _recColor = '#c2a65975';
        _lightShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        _darkShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    }
    if (getColor === grey) {
        _dark = '#2f373b';
        _lightest = '#ccc4c4';
        _body = 'grey';
        _golden = 'rgb(155, 179, 128)';
        _brown = '#464600';
        _recColor = '#c2a65975';
        _lightShadow = '0 5px 15px rgba(80, 77, 77, 0.3)';
        _darkShadow = '0 5px 15px rgba(18, 36, 36, 0.4)';

    }
    if (getColor === dark) {
        _dark = '#677381';
        _lightest = '#2e2a2a';
        _body = '#000000';
        _golden = '#045a69';
        _brown = '#7f939b';
        _recColor = '#c2a65975';
        _lightShadow = '0 5px 15px rgba(131, 124, 124, 0.3)';
        _darkShadow = '0 5px 15px rgba(134, 122, 122, 0.6)';

        navToggler.querySelector('i').style.color = `var(${mainDark})`;
        footer.style.backgroundColor = dark;
    } else {
        navToggler.querySelector('i').style.color = "dark";
        footer.style.backgroundColor = `var(${mainDark})`;
    }

    document.documentElement.style.setProperty(mainDark, _dark);
    document.documentElement.style.setProperty(lightest, _lightest);
    document.documentElement.style.setProperty(bodyColor, _body);
    document.documentElement.style.setProperty(golden, _golden);
    document.documentElement.style.setProperty(brown, _brown);
    document.documentElement.style.setProperty(recColor, _recColor);
    document.documentElement.style.setProperty(lightShadow, _lightShadow);
    document.documentElement.style.setProperty(darkShadow, _darkShadow);
}

// Color theme related ends