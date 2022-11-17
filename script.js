'use strict'; // 문법을 엄격하게 확인 

// 스크롤에 따른 메뉴바 색상처리
const navbar = document.querySelector('#navbar');
const navBarHeight = navbar.getBoundingClientRect().height;
console.log(navBarHeight);
document.addEventListener('scroll', () => {
    // console.log('event strat!')
    // console.log(window.scrollY);
    if(window.scrollY > navBarHeight){
        navbar.classList.add('navbar--bold');
    }else{
        navbar.classList.remove('navbar--bold');
    }
});




// 스크롤에 따른 메뉴바 고정
const navbarMenue = document.querySelector('.navbar__menue');
navbarMenue.addEventListener('click',(e) =>{
    // console.log(e);
    const target = e.target;
    const link = target.dataset.link;
    if(link==null){
        return;
    }
    // console.log(link);
    navbarMenue.classList.remove('open');
    scrollIntoView(link);
})

// 모바일 메뉴 버튼 설정
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn')
navbarToggleBtn.addEventListener('click', ()=>{
    navbarMenue.classList.toggle('open');
})


//contact 버튼
const homeContainer = document.querySelector('.home__contact');
homeContainer.addEventListener('click',() =>{
    scrollIntoView('#contact');
})

const home = document.querySelector('.home__container')
const homeHeight = home.getBoundingClientRect().height;

const arrowUp = document.querySelector('.arrow-up');
   document.addEventListener('scroll',() =>{
        if(window.scrollY > homeHeight /2){
            arrowUp.classList.add('visible');
        }else{
            arrowUp.classList.remove('visible')
        }
        home.style.opacity = 1-window.scrollY /homeHeight;
    });

    arrowUp.addEventListener('click',()=>{
        scrollIntoView('#home')
    });

// 선택한 프로젝트 보이기

const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer,addEventListener('click',(e)=>{
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter==null){
        return;
    }

    const active = document.querySelector('.categort__btn.selected')
    if(active != null){
        active.classList.remove('selected');
    }
    e.target.classList.add('selected');

    projectContainer.classList.add('anim-out');
    setTimeout(() => {
        projects.forEach((project)=>{
            console.log(project.dataset.type)
            if(filter === '*' || filter === project.dataset.type){
                project.classList.remove('invisible');
            }else{
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    },300)
})


function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact'
];

const sections = sectionIds.map((id) => document.querySelector(id));
// console.log(sections)
const navItems = sectionIds.map((id) => document.querySelector(`[data-link="${id}"]`)); 
// console.log(sections)

let selectedNavIndex =0;
let selectedNavItem = navItems[0];

function selectNavItem(selected){
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

const observerOptions = {
    root : null,
    rootMargin:'0px',
    threshold :0.3
}


const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if(!entry.isIntersecting && entry.intersectionRatio >0){
            console.log('y')
            const index = sectionIds.indexOf(`#${entry.target.id}`)
            // console.log(index)
            if(entry.boundingClientRect.y < 0){
                selectedNavIndex =index +1;
            }else{
                selectedNavIndex =index -1;
            }
            console.log(index)
        }
    })
}

const observer = new IntersectionObserver(observerCallback, observerOptions)
sections.forEach((section)=> observer.observe(section))

window.addEventListener('wheel', () => {
    if(window.scrollY ===0){
        selectedNavIndex =0;
    }else if(
        window.scrollY + window.innerHeight === document.body.clientHeight
    ){
        selectedNavIndex = navItems.length -1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});



