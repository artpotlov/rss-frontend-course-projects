function e(e){return e&&e.__esModule?e.default:e}var t;t=JSON.parse('[{"name":"Jennifer","img":"pets-jennifer.jpg","type":"Dog","breed":"Labrador","description":"Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won\'t hesitate to play up a storm in the house if she has all of her favorite toys.","age":"2 months","inoculations":["none"],"diseases":["none"],"parasites":["none"]},{"name":"Sophia","img":"pets-sophia.jpg","type":"Dog","breed":"Shih tzu","description":"Sophia here and I\'m looking for my forever home to live out the best years of my life. I am full of energy. Everyday I\'m learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.","age":"1 month","inoculations":["parvovirus"],"diseases":["none"],"parasites":["none"]},{"name":"Woody","img":"pets-woody.jpg","type":"Dog","breed":"Golden Retriever","description":"Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.","age":"3 years 6 months","inoculations":["adenovirus","distemper"],"diseases":["right back leg mobility reduced"],"parasites":["none"]},{"name":"Scarlett","img":"pets-scarlet.jpg","type":"Dog","breed":"Jack Russell Terrier","description":"Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.","age":"3 months","inoculations":["parainfluenza"],"diseases":["none"],"parasites":["none"]},{"name":"Katrine","img":"pets-katrine.jpg","type":"Cat","breed":"British Shorthair","description":"Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.","age":"6 months","inoculations":["panleukopenia"],"diseases":["none"],"parasites":["none"]},{"name":"Timmy","img":"pets-timmy.jpg","type":"Cat","breed":"British Shorthair","description":"Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.","age":"2 years 3 months","inoculations":["calicivirus","viral rhinotracheitis"],"diseases":["kidney stones"],"parasites":["none"]},{"name":"Freddie","img":"pets-freddie.jpg","type":"Cat","breed":"British Shorthair","description":"Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.","age":"2 months","inoculations":["rabies"],"diseases":["none"],"parasites":["none"]},{"name":"Charly","img":"pets-charly.jpg","type":"Dog","breed":"Jack Russell Terrier","description":"This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.","age":"8 years","inoculations":["bordetella bronchiseptica","leptospirosis"],"diseases":["deafness","blindness"],"parasites":["lice","fleas"]}]');const a=document.querySelector(".our-friends__cards"),s=document.querySelector(".our-friends__card-track");let i=[];const n=(a,s)=>{const i=[];for(;i.length<s;){const s=Math.floor(Math.random()*e(t).length);a.includes(s)||i.includes(s)||i.push(s)}return i},o=(e,t)=>{if("left"===t){for(let t=0;t<2*e;t++)i.pop(),s.children[e].remove();const t=i,a=n(t,e),o=n(t,e);i=[...a,...t,...o],a.forEach((e=>r("afterbegin",e))),o.forEach((e=>r("beforeend",e)))}if("right"===t){for(let t=0;t<2*e;t++)i.shift(),s.children[0].remove();const t=i,a=n(t,e),o=n(t,e);i=[...a,...t,...o],a.forEach((e=>r("afterbegin",e))),o.forEach((e=>r("beforeend",e)))}},r=(a,i)=>{const n=e(t)[i].img,o=e(t)[i].name;let r=new Image;r.src=n;const l=`\n        <div class="our-friends__card pet__card" data-pet-number="${i}">\n        <img class="pet__card-image" src="${r.src}" alt="${o}">\n        <h4 class="pet__card-name">${o}</h4>\n        <button class="button button__outline">Learn more</button>\n        </div>\n    `;s.insertAdjacentHTML(a,l)},l=document.querySelector(".header"),d=document.querySelector(".burger"),c=l.querySelector(".container"),h=document.querySelector("body"),p=()=>{c.classList.add("animation__move-right"),h.style.overflow="auto",setTimeout((()=>{c.classList.remove("animation__move-left"),c.classList.remove("animation__move-right"),l.classList.remove("header--active"),d.classList.remove("burger--active")}),300)},m=e=>{const t=e.target.classList;(t.contains("burger")||t.contains("burger__line"))&&(l.classList.contains("header--active")?p():(l.classList.add("header--active"),d.classList.add("burger--active"),c.classList.add("animation__move-left"),h.style.overflow="hidden")),t.contains("header")&&t.contains("header--active")&&p(),t.contains("link")&&l.classList.contains("header--active")&&p()},u=document.querySelector("body"),g=document.querySelector(".pet__cards"),f=()=>{const e=document.querySelector(".popup");e.classList.add("animation__pop-up-close"),setTimeout((()=>{e.remove(),u.style.overflow="auto"}),300)};l.addEventListener("click",(e=>m(e))),document.addEventListener("DOMContentLoaded",(()=>{if(window.matchMedia("(min-width: 1280px)").matches&&(i=[],i.push(...n([],3)),i.push(...n(i.slice(0,3),3)),i.push(...n(i.slice(3,6),3)),i.forEach((e=>r("beforeend",e)))),window.matchMedia("(min-width: 768px) and (max-width: 1279px)").matches){for(i=[];s.children.length>0;)s.lastElementChild.remove();i.push(...n([],2)),i.push(...n(i.slice(0,2),2)),i.push(...n(i.slice(2,4),2)),i.forEach((e=>r("beforeend",e)))}if(window.matchMedia("(min-width: 320px) and (max-width: 767px)").matches){for(i=[];s.children.length>0;)s.lastElementChild.remove();i.push(...n([],1)),i.push(...n(i.slice(0,1),1)),i.push(...n(i.slice(0,2),1)),i.forEach((e=>r("beforeend",e)))}a.addEventListener("click",(e=>(e=>{let t=!1;"left"!==e.target.dataset.sliderButton||t||(t=!0,s.classList.add("animation__slide-to-left"),setTimeout((()=>{window.matchMedia("(min-width: 1280px)").matches&&o(3,"left"),window.matchMedia("(min-width: 768px) and (max-width: 1279px)").matches&&o(2,"left"),window.matchMedia("(min-width: 320px) and (max-width: 767px)").matches&&o(1,"left"),s.classList.remove("animation__slide-to-left"),t=!1}),280)),"right"!==e.target.dataset.sliderButton||t||(t=!0,s.classList.add("animation__slide-to-right"),setTimeout((()=>{window.matchMedia("(min-width: 1280px)").matches&&o(3,"right"),window.matchMedia("(min-width: 768px) and (max-width: 1279px)").matches&&o(2,"right"),window.matchMedia("(min-width: 320px) and (max-width: 767px)").matches&&o(1,"right"),s.classList.remove("animation__slide-to-right"),t=!1}),280))})(e)))})),g.addEventListener("click",(a=>{if(a.target.classList.contains("pet__card")||a.target.parentElement.classList.contains("pet__card")){const s=void 0===a.target.dataset.petNumber?a.target.parentElement.dataset.petNumber:a.target.dataset.petNumber;void 0!==s&&(a=>{const s=new Image;s.src=e(t)[a].img;const i=`\n        <section class="popup">\n        <div class="popup__container">\n            <button class="popup__button button button__outline button__round">×</button>\n            <div class="popup__content">\n                <div class="popup__column">\n                    <img src="${s.src}" alt="${e(t)[a].name}" class="popup__image">\n                </div>\n                <div class="popup__column">\n                    <h3 class="popup__title">${e(t)[a].name}</h3>\n                    <h4 class="popup__subtitle">${e(t)[a].type} - ${e(t)[a].breed}</h4>\n                    <h5 class="popup__description">${e(t)[a].description}</h5>\n                    <ul class="popup__list">\n                        <li class="popup__item">\n                            <strong>Age:</strong> ${e(t)[a].age}\n                        </li>\n                        <li class="popup__item">\n                            <strong>Inoculations:</strong> ${e(t)[a].inoculations}\n                        </li>\n                        <li class="popup__item">\n                            <strong>Diseases:</strong> ${e(t)[a].diseases}\n                        </li>\n                        <li class="popup__item">\n                            <strong>Parasites:</strong> ${e(t)[a].parasites}\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    </section>\n    `;u.style.overflow="hidden",u.insertAdjacentHTML("afterbegin",i);const n=document.querySelector(".popup"),o=n.querySelector(".popup__button");n.classList.add("animation__pop-up-show"),n.addEventListener("click",(e=>{(e.target.classList.contains("popup")||e.target.classList.contains("popup__button"))&&f()})),n.addEventListener("mouseover",(e=>{e.target.classList.contains("popup")||e.target.classList.contains("popup__container")?(o.classList.add("button__fill"),o.classList.remove("button__outline")):(o.classList.add("button__outline"),o.classList.remove("button__fill"))}))})(s)}}));
//# sourceMappingURL=index.67f7c786.js.map
