(()=>{"use strict";var t={307:(t,e,n)=>{n.r(e)},607:function(t,e,n){var a=this&&this.__createBinding||(Object.create?function(t,e,n,a){void 0===a&&(a=n);var r=Object.getOwnPropertyDescriptor(e,n);r&&!("get"in r?!e.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(t,a,r)}:function(t,e,n,a){void 0===a&&(a=n),t[a]=e[n]}),r=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)"default"!==n&&Object.prototype.hasOwnProperty.call(t,n)&&a(e,t,n);return r(e,t),e};Object.defineProperty(e,"__esModule",{value:!0}),n(307);const i=o(n(394));o(n(346)).init();const s=document.querySelector(".header__nav");function l(t){const e=document.querySelector(".garage"),n=document.querySelector(".winners");e&&n&&("garage"===t&&(e.style.display="block",n.style.display="none"),"winner"===t&&(e.style.display="none",n.style.display="block"))}s&&s.addEventListener("click",(({target:t})=>{t instanceof HTMLButtonElement&&("page-garage"===t.dataset.role&&l("garage"),"page-winners"===t.dataset.role&&(l("winner"),i.init()))}))},346:function(t,e,n){var a=this&&this.__createBinding||(Object.create?function(t,e,n,a){void 0===a&&(a=n);var r=Object.getOwnPropertyDescriptor(e,n);r&&!("get"in r?!e.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(t,a,r)}:function(t,e,n,a){void 0===a&&(a=n),t[a]=e[n]}),r=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)"default"!==n&&Object.prototype.hasOwnProperty.call(t,n)&&a(e,t,n);return r(e,t),e};Object.defineProperty(e,"__esModule",{value:!0}),e.init=void 0;const i=o(n(762)),s=n(201),l=o(n(140)),d=n(356),c=o(n(3)),u={carId:-1,currentPage:1,totalPages:1,totalCars:0};function C(t,e){if(t){const e=document.querySelector(".garage__subtitle");if(!e)return;e.textContent=`Page #${t}`}if(e){const t=document.querySelector(".garage__title");if(!t)return;t.textContent=`Garage (${e})`}}function g(t=!1){const e=document.querySelector(".garage");if(!e)return;const n=e.querySelector("[data-role=button-pagination-prev]"),a=e.querySelector("[data-role=button-pagination-next]");n&&a&&(1===u.currentPage&&(n.disabled=!0,a.disabled=!1),u.currentPage===u.totalPages&&u.totalPages>1&&(n.disabled=!1,a.disabled=!0),u.currentPage===u.totalPages&&1===u.totalPages&&(n.disabled=!0,a.disabled=!0),u.currentPage>1&&u.currentPage<u.totalPages&&(n.disabled=!1,a.disabled=!1),t&&(n.disabled=!0,a.disabled=!0))}function p(t){const e=document.querySelector(".garage");if(!e)return;const n=e.querySelector('[data-role="button-race"]'),a=e.querySelector('[data-role="button-reset"]');n&&a&&("start"===t&&(n.disabled=!0,a.disabled=!1),"reset"===t&&(n.disabled=!1,a.disabled=!0,(0,s.resetFastWinner)()))}async function f(){if(!document.querySelector(".garage"))return;const t=await l.getCars(u.currentPage),e=document.querySelector(".track__line");e&&(e.innerHTML="",t.cars.forEach((t=>{c.draw(i.getRoadTemplate(t),e)})),u.totalCars=t.totalCars,u.totalPages=u.totalCars%7==0?u.totalCars/7:Math.trunc(u.totalCars/7)+1,C(u.currentPage,u.totalCars),g(),p("reset"))}async function m(t,e=!1){const n=document.querySelector(".garage");if(!n)return;const a=n.querySelector(`.road__car-track[data-id="${t}"]`),r=n.querySelector(`[data-role="button-start-engine"][data-id="${t}"`),o=n.querySelector(`[data-role="button-stop-engine"][data-id="${t}"]`),i=n.querySelector(`.road__car[data-id="${t}"]`);if(!(a&&r&&o&&i))return;const d=await l.startEngine(+t);if(200===d.status){r.disabled=!0,o.disabled=!1;const n=d.params.distance/d.params.velocity;if((0,s.animation)("start",i,a,n,+t),500===await l.driveEngine(+t))return void(0,s.animation)("stop",i,a,n,+t);e&&(0,s.setWinner)(t)}}async function b(t){const e=document.querySelector(".garage");if(!e)return;const n=e.querySelector(`[data-role="button-start-engine"][data-id="${t}"`),a=e.querySelector(`[data-role="button-stop-engine"][data-id="${t}"]`),r=e.querySelector(`.road__car[data-id="${t}"]`);n&&a&&r&&200===await l.stopEngine(t)&&((0,s.animation)("reset",r,r,0,t),n.disabled=!1,a.disabled=!0)}function h(){g(),document.querySelector('[data-role="pagination-garage"]')?.addEventListener("click",(async({target:t})=>{t instanceof HTMLButtonElement&&("button-pagination-prev"===t.dataset.role&&(u.currentPage-=1,f()),"button-pagination-next"===t.dataset.role&&(u.currentPage+=1,f()))})),function(){const t=document.querySelector(".garage");t&&t.querySelector('[data-role="button-create-submit"]')?.addEventListener("click",(()=>{!function(){const t=document.querySelector(".garage");if(!t)return;const e=t.querySelector('[data-role="input-create-name"]'),n=t.querySelector('[data-role="input-create-color"]');if(e&&n){if(e.value.trim().length>0)l.createCar({name:e.value,color:n.value});else{const t=(0,d.getRandomCar)();l.createCar({name:t.name,color:n.value})}f()}}()}))}(),function(){const t=document.querySelector(".garage");t&&t.querySelector('[data-role="button-generate-cars"]')?.addEventListener("click",(async()=>{let t=Array(100).fill({});t=t.map((()=>(0,d.getRandomCar)())),await l.create100Cars(t),f()}))}(),function(){const t=document.querySelector(".garage");if(!t)return;const e=t.querySelector(".track__line"),n=t.querySelector('[data-role="input-update-name"]'),a=t.querySelector('[data-role="input-update-color"]'),r=t.querySelector('[data-role="button-update-submit"]');e?.addEventListener("click",(async({target:t})=>{if(t instanceof HTMLButtonElement){if("button-select-road"===t.dataset.role){if(t.dataset.id&&(u.carId=+t.dataset.id),-1===u.carId||!n||!a||!r)return;const e=await l.getCar(u.carId);n.disabled=!1,n.value=e.name,a.disabled=!1,a.value=e.color,r.disabled=!1}if("button-remove-road"===t.dataset.role&&t.dataset.id){const e=+t.dataset.id;await l.deleteCar(e),f()}"button-start-engine"===t.dataset.role&&t.dataset.id&&m(+t.dataset.id),"button-stop-engine"===t.dataset.role&&t.dataset.id&&b(+t.dataset.id)}}))}(),function(){const t=document.querySelector(".garage");if(!t)return;const e=t.querySelector('[data-role="input-update-name"]'),n=t.querySelector('[data-role="input-update-color"]'),a=t.querySelector('[data-role="button-update-submit"]');e&&n&&a&&a.addEventListener("click",(async()=>{0!==e.value.trim().length?(await l.updateCar({id:u.carId,name:e.value,color:n.value}),u.carId=-1,e.value="",n.value="#FFFFFF",e.disabled=!0,n.disabled=!0,a.disabled=!0,f()):alert("Empty car name")}))}(),function(){const t=document.querySelector(".garage");t&&t.querySelector('[data-role="button-race"]')?.addEventListener("click",(async()=>{const t=(await l.getCars(u.currentPage)).cars.map((t=>t.id));p("start"),g(!0),await Promise.all(t.map((async t=>(await m(t,!0),0))))}))}(),function(){const t=document.querySelector(".garage");t&&t.querySelector('[data-role="button-reset"]')?.addEventListener("click",(async()=>{const t=(await l.getCars(u.currentPage)).cars.map((t=>t.id));p("reset"),await Promise.all(t.map((async t=>(await b(t),0)))),g()}))}()}e.init=async function(){const t=document.querySelector(".garage");if(!t)return;c.draw(i.getSettingsTemplate(),t),c.draw(i.getTrackTemplate(),t);const e=document.querySelector(".track__line");if(!e)return;const n=await l.getCars(u.currentPage);u.totalCars=n.totalCars,u.totalPages=u.totalCars%7==0?u.totalCars/7:Math.trunc(u.totalCars/7)+1,C(u.currentPage,u.totalCars),n.cars.forEach((t=>{c.draw(i.getRoadTemplate(t),e)})),c.draw(i.getPaginationTemplate(),t),h()}},394:function(t,e,n){var a=this&&this.__createBinding||(Object.create?function(t,e,n,a){void 0===a&&(a=n);var r=Object.getOwnPropertyDescriptor(e,n);r&&!("get"in r?!e.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(t,a,r)}:function(t,e,n,a){void 0===a&&(a=n),t[a]=e[n]}),r=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)"default"!==n&&Object.prototype.hasOwnProperty.call(t,n)&&a(e,t,n);return r(e,t),e};Object.defineProperty(e,"__esModule",{value:!0}),e.init=void 0;const i=o(n(762)),s=o(n(140)),l=o(n(3)),d={currentPage:1,totalPages:1,totalWinners:0,sort:{field:"time",type:"ASC"}};function c(t){const e=document.querySelector('[data-role="thead-wins"]'),n=document.querySelector('[data-role="thead-time"]');e&&n&&("wins"===t&&("ASC"===d.sort.type?e.textContent="Wins ↑":e.textContent="Wins ↓",n.textContent="Best time (seconds)"),"time"===t&&("ASC"===d.sort.type?n.textContent="Best time (seconds) ↑":n.textContent="Best time (seconds) ↓",e.textContent="Wins"))}function u(){const t=document.querySelector(".winners__table"),e=document.querySelector(".winners__head");t&&e&&e.addEventListener("click",(async({target:e})=>{if(e instanceof HTMLElement){if("thead-wins"===e.dataset.role){d.sort.field="wins",d.sort.type="ASC"===d.sort.type?"DESC":"ASC";const e=await s.getWinners(d.currentPage,d.sort.field,d.sort.type);t.innerHTML="",l.drawUpdate(i.getWinnersTemplate(e.winners),t),c("wins")}if("thead-time"===e.dataset.role){d.sort.field="time",d.sort.type="ASC"===d.sort.type?"DESC":"ASC";const e=await s.getWinners(d.currentPage,d.sort.field,d.sort.type);t.innerHTML="",l.drawUpdate(i.getWinnersTemplate(e.winners),t),c("time")}u()}}))}function C(){const t=document.querySelector(".winners");if(!t)return;const e=t.querySelector('[data-role="pagination-winners"]');if(!e)return;const n=e.querySelector("[data-role=button-pagination-prev]"),a=e.querySelector("[data-role=button-pagination-next]"),r=t.querySelector('[data-role="header-current-page"]');n&&a&&r&&(1===d.currentPage&&(n.disabled=!0,a.disabled=!1),d.currentPage===d.totalPages&&d.totalPages>1&&(n.disabled=!1,a.disabled=!0),d.currentPage===d.totalPages&&1===d.totalPages&&(n.disabled=!0,a.disabled=!0),d.currentPage>1&&d.currentPage<d.totalPages&&(n.disabled=!1,a.disabled=!1),r.textContent=`Page #${d.currentPage}`)}e.init=async function(){const t=document.querySelector(".winners");if(!t)return;t.innerHTML="";const e=await s.getWinners(d.currentPage);d.totalWinners=e.totalWinners,d.totalPages=d.totalWinners%10==0?d.totalWinners/10:Math.trunc(d.totalWinners/10)+1,l.draw(i.getHeadersWinnersTemplate(d.currentPage,d.totalWinners),t),l.draw(i.getWinnersTemplate(e.winners),t),l.draw(i.getPaginationTemplate("pagination-winners"),t),C(),document.querySelector('[data-role="pagination-winners"]')?.addEventListener("click",(async({target:t})=>{if(t instanceof HTMLButtonElement){if("button-pagination-prev"===t.dataset.role){d.currentPage-=1;const t=await s.getWinners(d.currentPage),e=document.querySelector(".winners__table");if(!e)return;e.innerHTML="",l.drawUpdate(i.getWinnersTemplate(t.winners),e),C(),u()}if("button-pagination-next"===t.dataset.role){d.currentPage+=1;const t=await s.getWinners(d.currentPage),e=document.querySelector(".winners__table");if(!e)return;e.innerHTML="",l.drawUpdate(i.getWinnersTemplate(t.winners),e),C(),u()}}})),u()}},604:(t,e)=>{var n;Object.defineProperty(e,"__esModule",{value:!0}),e.RequestMethod=void 0,(n=e.RequestMethod||(e.RequestMethod={})).GET="GET",n.POST="POST",n.PUT="PUT",n.PATCH="PATCH",n.DELETE="DELETE"},762:(t,e)=>{function n(t="#FFFFFF"){return`\n    <svg width="100%" height="100%" viewBox="0 0 1706 572" fill="${t}" xmlns="http://www.w3.org/2000/svg">\n      <path d="M470 1.19996C460.4 3.59996 459.467 4.9333 458 17.3333C457.467 21.3333 456.533 25.6 455.867 26.8C455.333 28 442.933 33.6 428.4 39.3333C325.2 79.8666 248.667 111.333 214.667 127.467C192.933 137.733 185.067 139.6 158.533 141.333C147.2 142 135.867 143.2 133.333 144C119.867 148.267 85.0667 151.733 50.6666 152.4L35.3333 152.667L29.0666 163.333C22.8 173.733 22.8 174 25.2 176.667C29.7333 181.467 29.8666 186.933 25.8666 200.267C21.8666 213.467 21.3333 224 23.3333 249.6C24 258.533 23.8666 261.333 22.5333 261.333C18.6666 261.333 11.4666 268.8 7.86665 276.533C1.19998 290.667 -2.00002 322.267 1.46665 338.8C3.19998 346.533 3.19998 347.067 1.86665 360C1.19998 367.2 3.99998 391.733 5.59998 392.533C5.86665 392.667 9.46665 395.2 13.7333 398C23.4666 404.533 30.1333 411.733 31.3333 417.067C33.6 427.6 53.6 437.733 78.6667 441.2C92.5333 443.2 207.867 454.133 223.6 455.067L227.867 455.333L228.533 434C229.467 403.333 235.2 381.467 248 359.467C285.467 295.6 370.267 269.733 435.333 302.267C477.467 323.467 506 358.8 515.067 401.2C518 415.333 518.933 449.867 516.8 470.4L515.733 481.333H916C1296.67 481.333 1316.27 481.2 1315.33 478.933C1310.93 467.333 1307.87 435.6 1309.33 417.467C1313.07 374.8 1332.93 341.867 1370.53 316.267C1423.73 279.867 1483.47 278.667 1536.27 313.067C1568.13 334 1589.2 365.333 1597.6 404.667C1600 415.867 1599.6 450.133 1596.93 462C1595.87 467.067 1595.07 471.467 1595.33 471.733C1596.27 472.8 1646.8 469.067 1659.07 467.2C1683.07 463.467 1692.8 458.533 1699.6 446.933C1702.8 441.467 1703.33 439.333 1703.33 430C1703.2 424.133 1702.13 414.4 1700.67 408.267C1698.27 397.733 1698.27 396.533 1700.4 382.933C1704.53 356.4 1705.73 342.133 1705.87 316.667C1706 293.2 1705.73 290.667 1702.8 282C1696.67 264 1689.07 256.667 1665.07 245.467C1635.47 231.6 1580.67 216.133 1509.33 201.467C1439.6 187.067 1306.13 173.467 1235.47 173.333H1204.93L1173.47 154.8C1065.07 91.2 961.067 36.9333 926.533 26C860.133 5.06663 713.467 -3.8147e-05 540.933 12.6666L515.867 14.5333L509.6 10.5333C497.333 2.79996 479.867 -1.33337 470 1.19996ZM724.933 42.6666C726.667 48.6666 732.667 83.3333 736.667 111.333C741.067 141.467 746.533 183.2 746.133 183.6C745.2 184.533 523.2 178.267 472.267 175.867C424.667 173.733 410.4 168.4 395.867 147.2C387.6 135.067 384.267 117.2 388 103.733C389.6 98.4 395.467 93.8666 413.6 84C462.8 57.6 520.133 45.4666 629.333 38.6666C662.133 36.6666 668 36.5333 697.333 36.5333L723.2 36.6666L724.933 42.6666ZM811.467 41.3333C862.533 46.1333 907.067 52.8 936 59.8666C964 66.8 996.133 81.6 1032 104.133C1050.8 115.867 1082.53 138.667 1082.67 140.267C1082.67 140.933 1080.8 141.333 1078.4 141.333C1072 141.333 1063.2 146.267 1059.73 151.733C1056.53 156.933 1055.73 166.8 1057.73 176.933L1058.93 182.667H817.867L794.4 110.667L771.067 38.6666H777.333C780.667 38.6666 796.133 39.8666 811.467 41.3333Z" fill="curentColor"/>\n      <path d="M348.933 296.667C291.467 307.6 245.733 355.333 237.2 413.333C234.933 428.933 236.267 452.267 240.4 468C255.467 526.133 306.667 568.133 366.667 571.6C434.267 575.467 494.533 529.867 510.133 463.2C513.867 447.6 513.6 416.8 509.6 400.933C497.067 350.533 458.533 311.6 408.267 298.533C394.267 294.933 363.467 294 348.933 296.667ZM399.333 338C410.533 340.8 427.2 349.333 436.667 356.933C452.133 369.467 464.667 389.2 470.133 409.333C473.2 420.933 473.333 444 470.133 456.667C462.4 488.267 437.867 515.2 407.067 525.867C336.267 550.667 263.867 488.933 277.867 415.467C281.867 395.2 290.4 378.933 305.333 364C320.133 349.333 336.933 340.267 356.667 336.533C367.867 334.4 388 335.067 399.333 338Z" fill="curentColor"/>\n      <path d="M389.067 370.933C389.333 382.933 390 393.2 390.667 393.867C392.933 396.133 405.067 386.133 417.467 371.733L424.267 364.133L417.867 360C410.933 355.6 400.4 351.333 393.2 350L388.667 349.2L389.067 370.933Z" fill="curentColor"/>\n      <path d="M345.467 353.333C337.2 356.267 323.2 364.267 323.6 365.867C324 367.6 355.2 394.667 356.8 394.667C357.733 394.667 358.8 393.733 359.2 392.533C360.267 389.867 360.267 375.6 359.067 361.6C358.133 348.933 358 348.8 345.467 353.333Z" fill="curentColor"/>\n      <path d="M427.867 399.333C420.267 407.867 413.867 415.733 413.6 416.8C412.8 420.133 419.733 421.467 434.533 420.667C442.267 420.267 450.667 419.6 453.067 419.2C457.467 418.533 457.6 418.4 456.667 413.6C455.733 407.733 448.133 391.333 444.4 386.8L441.867 383.6L427.867 399.333Z" fill="curentColor"/>\n      <path d="M301.333 392.133C297.2 398 292.267 409.867 291.067 416.933L290.267 421.333H310.933C332.933 421.333 337.733 420.133 335.067 415.467C333.333 412.267 307.867 386.667 306.533 386.667C305.867 386.667 303.6 389.067 301.333 392.133Z" fill="curentColor"/>\n      <path d="M371.467 399.467C366.667 404.133 371.467 411.067 377.333 408C380.8 406.133 380.8 400.533 377.467 398.667C374.133 396.933 373.867 396.933 371.467 399.467Z" fill="curentColor"/>\n      <path d="M366.8 421.867C359.2 426.133 357.733 436.667 363.867 442.8C369.6 448.4 377.333 448.533 382.933 442.933C388.533 437.333 388.4 429.6 382.8 423.867C378.4 419.6 372.4 418.8 366.8 421.867Z" fill="curentColor"/>\n      <path d="M341.333 428.533C338.8 431.6 340.267 436.667 343.733 437.067C349.6 438 352.667 432.8 348.533 428.8C346 426.133 343.467 426.133 341.333 428.533Z" fill="curentColor"/>\n      <path d="M400.267 430.133C396.667 432.667 396.533 434.933 399.867 437.867C403.2 440.933 408 438.667 408 434C408 429.6 404 427.467 400.267 430.133Z" fill="curentColor"/>\n      <path d="M299.333 447.6C289.067 448.4 289.2 448.267 291.467 456.267C293.6 463.6 299.6 475.733 303.733 481.067L306.133 484.133L319.867 467.867C327.467 458.933 333.733 450.667 333.867 449.467C334 447.6 332 447.333 320 447.2C312.267 447.2 303.067 447.333 299.333 447.6Z" fill="curentColor"/>\n      <path d="M422 449.2C416.133 449.733 413.867 450.533 413.6 452.133C413.2 454.267 441.6 482.667 444 482.667C446.933 482.667 455.467 463.867 458 452.267L458.933 448L444.4 448.267C436.533 448.4 426.4 448.8 422 449.2Z" fill="curentColor"/>\n      <path d="M370.133 458.133C367.6 460.533 367.6 460.8 369.333 464.133C370.133 465.6 372.133 466.667 374 466.667C376.667 466.667 380 463.467 380 460.8C380 459.467 375.733 456 374 456C373.067 456 371.2 456.933 370.133 458.133Z" fill="curentColor"/>\n      <path d="M345.2 480.933C333.733 492.933 326.667 501.067 326.667 502.533C326.667 505.867 350.533 516 358.133 516H361.733L360.8 496.933C359.6 474.8 359.067 472 356.133 472C354.933 472 350 476 345.2 480.933Z" fill="curentColor"/>\n      <path d="M391.467 473.2C390.667 474.533 388.267 495.6 387.6 507.6C387.2 515.6 387.333 516 390.133 516C400.667 516 425.067 506.933 423.2 503.733C422.533 502.8 416.133 495.2 408.8 486.933C396.4 472.933 393.2 470.4 391.467 473.2Z" fill="curentColor"/>\n      <path d="M1429.73 296.667C1387.33 304.4 1350.13 332.133 1330.67 370.667C1300.93 429.467 1317.6 503.467 1369.2 542.4C1384.13 553.6 1394.27 559.067 1410.67 564.533C1447.2 576.667 1483.33 573.867 1517.6 556.4C1591.2 518.8 1615.6 425.333 1569.87 356.4C1539.87 311.2 1483.07 286.933 1429.73 296.667ZM1481.07 338.667C1527.47 351.733 1558.27 397.733 1552 444.8C1543.07 512.533 1472.53 550.933 1411.33 521.333C1379.47 505.867 1358.53 474.4 1356.4 438.667C1353.73 394 1382 353.333 1425.2 339.333C1441.47 334 1463.73 333.733 1481.07 338.667Z" fill="curentColor"/>\n      <path d="M1468.93 370.933C1469.33 382.933 1470.13 393.2 1470.8 393.867C1472.53 395.733 1477.87 391.467 1491.47 377.6L1504.13 364.667L1501.07 362.267C1494.4 356.933 1475.87 349.333 1469.73 349.333C1468.4 349.333 1468.27 353.733 1468.93 370.933Z" fill="curentColor"/>\n      <path d="M1427.33 352.533C1420.67 354.667 1409.6 360.267 1405.6 363.467L1402.53 366L1418.67 380.267C1427.6 388.267 1435.73 394.667 1436.67 394.667C1439.73 394.667 1440.27 389.467 1439.33 369.867C1438.27 348.267 1438.8 348.933 1427.33 352.533Z" fill="curentColor"/>\n      <path d="M1507.6 399.467C1499.73 408.133 1493.33 416.267 1493.33 417.6C1493.33 419.067 1494.8 420 1498.4 420.533C1504.27 421.467 1535.47 419.6 1536.93 418.267C1538.93 416.133 1530.13 393.867 1524.4 386.8L1521.87 383.6L1507.6 399.467Z" fill="curentColor"/>\n      <path d="M1381.6 391.6C1376.4 399.867 1372.27 409.467 1371.2 416.133L1370.27 421.333H1390.53C1402 421.333 1412 420.667 1413.47 420C1415.73 418.667 1415.87 418.267 1414.13 414.933C1413.07 412.933 1406.27 405.467 1398.93 398.267L1385.73 385.067L1381.6 391.6Z" fill="curentColor"/>\n      <path d="M1451.73 398.8C1448.53 400.667 1448.67 406.267 1452 408C1457.87 411.067 1462.67 404.133 1457.87 399.467C1455.47 396.933 1454.8 396.933 1451.73 398.8Z" fill="curentColor"/>\n      <path d="M1446.8 421.733C1440.27 425.6 1438 435.2 1442.13 441.2C1443.33 442.933 1446.4 445.067 1448.8 446.133C1452.67 447.733 1454 447.733 1457.87 446.133C1471.07 440.667 1469.2 422.133 1455.33 420.533C1452.13 420.133 1448.67 420.667 1446.8 421.733Z" fill="curentColor"/>\n      <path d="M1421.33 428.533C1418.8 431.6 1420.27 436.667 1423.73 437.067C1429.6 438 1432.67 432.8 1428.53 428.8C1426 426.133 1423.47 426.133 1421.33 428.533Z" fill="curentColor"/>\n      <path d="M1479.47 430.133C1478.27 431.2 1477.33 433.067 1477.33 434C1477.33 435.733 1480.8 440 1482.13 440C1484.8 440 1488 436.667 1488 434C1488 432.133 1486.93 430.133 1485.47 429.333C1482.13 427.6 1481.87 427.6 1479.47 430.133Z" fill="curentColor"/>\n      <path d="M1378 447.867C1370 448.667 1370 448.667 1370.4 452.667C1371.6 461.867 1384.27 485.733 1386.67 483.2C1394.27 475.067 1414.67 449.867 1414.27 448.8C1413.73 447.2 1390.8 446.533 1378 447.867Z" fill="curentColor"/>\n      <path d="M1502.27 448.933C1493.2 449.6 1491.73 451.467 1496 456.933C1499.07 461.067 1522.67 482.667 1524 482.667C1524.4 482.667 1526.67 479.467 1528.93 475.6C1532.8 469.2 1535.87 460.8 1537.87 451.6L1538.67 448L1524.4 448.267C1516.4 448.4 1506.53 448.667 1502.27 448.933Z" fill="curentColor"/>\n      <path d="M1449.33 458.667C1447.2 462.8 1449.87 466.933 1454.4 466.4C1457.2 466.133 1458.13 465.2 1458.4 462.133C1459.07 456.133 1452.13 453.467 1449.33 458.667Z" fill="curentColor"/>\n      <path d="M1420.13 486.267C1412.67 494.133 1406.67 501.333 1406.67 502.267C1406.67 506 1429.6 516 1438.27 516H1441.73L1440.8 499.6C1439.47 475.733 1438.8 472 1436 472C1434.67 472 1427.6 478.4 1420.13 486.267Z" fill="curentColor"/>\n      <path d="M1471.33 473.2C1470.4 474.8 1468.27 492.4 1467.47 505.6C1466.93 515.867 1466.93 516 1470 516C1476 516 1487.33 513.067 1495.73 509.2L1504.27 505.333L1501.73 502.267C1493.07 491.333 1475.33 472 1473.87 472C1472.93 472 1471.87 472.533 1471.33 473.2Z" fill="curentColor"/>\n    </svg>\n  `}function a(t="#FF0000"){return`\n  <svg width="100%" height="100%" viewBox="0 0 472 451" fill="${t}" xmlns="http://www.w3.org/2000/svg">\n    <path d="M379.133 1.91732C372.56 7.93429 361.689 15.7857 353.059 20.7387C336.165 30.4979 313.617 38.7529 287.322 44.7699C283.576 45.6137 279.903 46.4576 279.169 46.641L277.81 46.9712L278.324 48.7323C278.581 49.6862 279.169 51.7041 279.573 53.2083C286.073 77.4229 295.107 110.81 299.147 125.669C300.543 130.915 301.791 135.318 301.865 135.428C302.012 135.685 307.814 134.474 314.314 132.786C321.219 131.025 337.23 125.669 338.112 124.788C338.259 124.641 336.092 118.258 333.264 110.59C330.473 102.958 325.332 88.9066 321.843 79.4408C318.354 69.9384 314.792 60.1792 313.874 57.6844C312.955 55.1895 312.258 53.1349 312.331 53.0616C312.405 52.9882 314.865 52.2544 317.803 51.4106C336.753 45.8705 354.161 37.6889 370.576 26.6089C373.074 24.9212 375.167 23.6738 375.24 23.7839C375.351 24.004 400.911 87.5124 401.756 89.6403C402.123 90.5942 386.992 101.454 376.93 107.508C367.822 112.974 355.556 118.735 344.979 122.514C342.041 123.541 339.397 124.531 339.067 124.678C338.553 124.898 338.883 126.072 341.491 133.19C343.143 137.739 347.256 149.113 350.672 158.505C362.644 191.672 367.051 203.779 367.161 203.889C367.528 204.256 381.888 197.102 389.416 192.809C404.106 184.481 413.618 177.547 426.985 165.329C428.969 163.532 430.621 162.137 430.695 162.211C430.768 162.284 434 170.429 437.893 180.335C441.786 190.204 447.257 204.073 450.049 211.08L455.08 223.848L452.876 226.673C447.698 233.24 436.497 243.55 425.957 251.438C414.279 260.17 392.391 273.488 391.877 272.167C391.803 271.91 386.221 256.575 379.501 238.12C372.78 219.666 367.234 204.476 367.161 204.403C367.088 204.33 365.068 205.173 362.717 206.311C356.805 209.099 350.929 211.594 343.988 214.199C337.451 216.657 327.205 220.032 325.736 220.216C324.781 220.326 323.973 218.602 277.81 114.846L230.839 9.36515L225.918 9.14502C223.237 8.99826 216.921 8.8882 211.853 8.85151C151.183 8.59469 97.0514 25.2881 53.8999 57.5376C47.0692 62.6007 38.3287 69.9384 38.3287 70.5254C38.3287 70.7823 41.4503 78.8905 45.2696 88.5764C52.3575 106.517 68.4062 147.242 76.5223 167.861C82.5084 183.013 106.71 244.467 113.247 261.051C116.111 268.315 124.815 290.438 132.601 310.214C140.386 329.989 147.695 348.517 148.833 351.415L150.926 356.625L153.901 352.883C163.89 340.152 180.563 323.495 197.163 309.627C243.032 271.36 300.396 239.734 324.414 239.478C330.657 239.404 334.035 240.872 335.872 244.467C336.937 246.595 336.68 251.878 335.321 255.657C332.346 263.949 323.936 276.607 314.498 287.1C310.605 291.392 306.786 295.428 306.786 295.208C306.786 295.098 307.741 293.484 308.916 291.612C317.142 278.514 320.888 268.645 319.639 263.399C318.831 260.023 316.187 258.299 311.78 258.299C300.469 258.299 277.847 270.59 262.826 284.862L258.934 288.567L259.778 290.218C263.598 297.776 270.208 304.123 277.957 307.682C297.164 316.487 327.462 313.919 364.076 300.308C398.634 287.467 434.33 265.6 455.521 244.357C460.662 239.184 465.803 232.984 468.668 228.434L470.614 225.389L463.269 206.898C455.521 187.306 446.266 163.935 433.486 131.722C429.189 120.936 422.432 103.839 418.429 93.7495C414.426 83.6601 407.668 66.563 403.372 55.7765C399.075 44.99 392.464 28.2232 388.608 18.5374C384.789 8.8882 381.557 0.779963 381.41 0.523141C381.227 0.229631 380.455 0.706586 379.133 1.91732ZM235.467 53.832C244.538 73.3872 249.348 84.2471 249.091 84.3938C248.871 84.5406 247.108 84.7607 245.162 84.9075C229.223 86.0081 203.773 90.8144 186.292 95.9875C181.591 97.3817 170.354 101.124 167.269 102.371C166.167 102.775 165.139 102.995 164.992 102.848C164.661 102.481 137.448 34.6071 137.228 33.5064C137.045 32.8093 137.375 32.6259 140.276 31.7453C159.153 25.9852 178.617 23.7105 210.053 23.5637L221.438 23.4904L235.467 53.832ZM166.02 105.563C166.828 107.434 186.072 151.791 198.338 180.115C200.615 185.435 202.378 189.948 202.231 190.094C202.047 190.278 197.897 192.479 192.976 195.011C165.139 209.393 144.353 222.527 124.889 238.047C122.502 239.955 120.445 241.422 120.335 241.312C120.004 240.982 85.3362 150.801 85.3362 150.324C85.373 149.517 97.7491 140.308 107.738 133.667C119.123 126.072 131.279 119.138 144.279 112.791C153.02 108.498 163.89 103.545 164.588 103.509C164.845 103.472 165.506 104.426 166.02 105.563ZM285.779 167.567C286.183 168.558 292.169 181.949 299.074 197.395C305.978 212.841 311.744 225.756 311.817 226.086C311.964 226.563 311.633 226.783 310.385 227.077C306.419 228.067 295.071 232.03 289.709 234.304C274.799 240.615 256.032 250.814 240.167 261.124C236.972 263.215 234.218 264.83 234.034 264.646C233.887 264.499 229.26 253.603 223.788 240.505C218.279 227.37 211.338 210.787 208.327 203.633C205.316 196.478 202.928 190.425 203.002 190.204C203.222 189.654 213.872 185.362 224.523 181.509C243.693 174.575 262.055 169.439 277.406 166.76C280.124 166.32 282.951 165.88 283.686 165.88C284.935 165.843 285.081 165.953 285.779 167.567Z" fill="curentColor"/>\n    <path d="M10.9688 70.3787C5.31325 72.9102 0.649218 75.0015 0.612493 75.0382C0.502319 75.1116 3.66064 84.1003 31.351 163.091C39.0632 185.068 52.2106 222.601 60.5838 246.448C68.957 270.333 82.6553 309.443 91.0653 333.401C99.4752 357.395 112.108 393.497 119.196 413.676C126.247 433.855 132.087 450.402 132.123 450.438C132.234 450.548 166.902 436.717 167.122 436.46C167.232 436.35 165.396 431.434 163.082 425.527C158.088 412.869 129.039 338.978 109.391 288.934C101.789 269.562 90.4409 240.762 84.2345 224.912C68.296 184.371 40.7525 114.332 30.3962 87.9526C25.5852 75.6986 21.5455 65.7192 21.4354 65.7192C21.3252 65.7559 16.6244 67.8472 10.9688 70.3787Z" fill="curentColor"/>\n  </svg>\n  `}function r(t=1,e=0){return`\n    <h3 class="title garage__title" data-role="header-total-winners">Garage (${e})</h3>\n    <h4 class="subtitle garage__subtitle" data-role="header-current-page">Page #${t}</h4>\n  `}Object.defineProperty(e,"__esModule",{value:!0}),e.getWinnerAlert=e.getTrackTemplate=e.getHeadersWinnersTemplate=e.getHeadersGarageTemplate=e.getWinnersTemplate=e.getSettingsTemplate=e.getPaginationTemplate=e.getRoadTemplate=e.getFlagTemplate=e.getCarTemplate=void 0,e.getCarTemplate=n,e.getFlagTemplate=a,e.getRoadTemplate=function({id:t,name:e,color:r}){return`\n    <div class="road">\n      <div class="road__control">\n        <button class="button button_size_md" data-role="button-select-road" data-id="${t}">SELECT</button>\n        <button class="button button_size_md" data-role="button-remove-road" data-id="${t}">REMOVE</button>\n        <h4 class="subtitle" data-role="header-car-name">${e}</h4>\n      </div>\n      <div class="road__wrapper">\n        <div class="road__control-engine">\n          <button class="button road__control-engine-button" data-role="button-start-engine" data-id="${t}">A</button>\n          <button class="button road__control-engine-button" data-role="button-stop-engine" data-id="${t}" disabled>B</button>\n        </div>\n        <div class="road__car-track" data-id="${t}">\n          <div class="road__car" data-id="${t}">\n            ${n(r)}\n          </div>\n          <div class="road__flag">\n            ${a()}\n          </div>\n        </div>\n      </div>\n    </div>\n  `},e.getPaginationTemplate=function(t="pagination-garage"){return`\n    <div class="pagination" data-role="${t}">\n      <button class="button button_size_md" data-role="button-pagination-prev">PREV</button>\n      <button class="button button_size_md" data-role="button-pagination-next">NEXT</button>\n    </div>\n  `},e.getSettingsTemplate=function(){return'\n    <section class="settings">\n      <div class="settings__item">\n        <input type="text" name="car-name" placeholder="Car name" class="input input_type_text" data-role="input-create-name">\n        <input type="color" name="car-color" class="input input_type_color" value="#FFFFFF" data-role="input-create-color">\n        <button class="button button_size_md" data-role="button-create-submit">CREATE</button>\n      </div>\n      <div class="settings__item">\n        <input type="text" name="car-name" class="input input_type_text" data-role="input-update-name" disabled>\n        <input type="color" name="car-color" class="input input_type_color" value="#FFFFFF" data-role="input-update-color" disabled>\n        <button class="button button_size_md" data-role="button-update-submit" disabled>UPDATE</button>\n      </div>\n      <div class="settings__item">\n        <button class="button button_size_md" data-role="button-race">RACE</button>\n        <button class="button button_size_md" data-role="button-reset" disabled>RESET</button>\n        <button class="button button_size_md" data-role="button-generate-cars">GENERATE CARS</button>\n      </div>\n    </section>\n  '},e.getWinnersTemplate=function(t){return`\n    <table class="winners__table">\n      <thead class="winners__head">\n        <tr>\n          <td>ID</td>\n          <td>Car</td>\n          <td>Name</td>\n          <td data-role="thead-wins">Wins</td>\n          <td data-role="thead-time">Best time (seconds)</td>\n        </tr>\n      </thead>\n      <tbody>\n        ${t.map((({id:t,name:e,color:a,wins:r,time:o})=>`\n      <tr>\n        <td>${t}</td>\n        <td>${n(a)}</td>\n        <td>${e}</td>\n        <td>${r}</td>\n        <td>${o}</td>\n      <tr>\n    `)).join("")}\n      </tbody>\n    </table>\n  `},e.getHeadersGarageTemplate=r,e.getHeadersWinnersTemplate=function(t=1,e=0){return`\n    <h3 class="title winners__title" data-role="header-total-winners">WINNERS (${e})</h3>\n    <h4 class="subtitle winners__subtitle" data-role="header-current-page">Page #${t}</h4>\n  `},e.getTrackTemplate=function(){return`\n    <section class="track">\n      ${r()}\n      <div class="track__line">\n    </section>\n  `},e.getWinnerAlert=function(t,e){return`\n    <h1 class="alert">Winner ${t}. Time: ${e}s</h1>\n  `}},201:function(t,e,n){var a=this&&this.__createBinding||(Object.create?function(t,e,n,a){void 0===a&&(a=n);var r=Object.getOwnPropertyDescriptor(e,n);r&&!("get"in r?!e.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(t,a,r)}:function(t,e,n,a){void 0===a&&(a=n),t[a]=e[n]}),r=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)"default"!==n&&Object.prototype.hasOwnProperty.call(t,n)&&a(e,t,n);return r(e,t),e};Object.defineProperty(e,"__esModule",{value:!0}),e.setWinner=e.resetFastWinner=e.getFastWinner=e.animation=void 0;const i=o(n(140)),s=o(n(762)),l=o(n(3)),d={},c={id:-1,time:-1};e.animation=async function(t,e,n,a=1e3,r=0){let o=0;const i=e,s=e.getBoundingClientRect().width,l=n.getBoundingClientRect().width;"start"===t&&(d[r]={animationId:0,time:0},d[r].animationId=requestAnimationFrame((function t(e){o||(o=e);const n=(e-o)/a,c=n*(l-s);i.style.transform=`translateX(${c}px)`,n<1?d[r].animationId=requestAnimationFrame(t):d[r].time=(e-o)/1e3}))),"stop"===t&&cancelAnimationFrame(d[r].animationId),"reset"===t&&(cancelAnimationFrame(d[r].animationId),i.style.transform="translateX(0)")},e.getFastWinner=function(){return c},e.resetFastWinner=function(){c.id=-1,c.time=-1},e.setWinner=async function(t){if(-1===c.id){c.id=t,c.time=+d[t].time.toFixed(2);const e=await i.getCar(t);l.draw(s.getWinnerAlert(e.name,c.time),document.body),await i.updateWinner(c.id,c.time),setTimeout((()=>{const t=document.querySelector(".alert");t&&l.removeElement(t)}),3e3)}}},140:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.deleteCar=e.deleteWinner=e.updateWinner=e.createWinner=e.getWinner=e.getWinners=e.driveEngine=e.stopEngine=e.startEngine=e.updateCar=e.create100Cars=e.createCar=e.getCar=e.getCars=void 0;const a=n(604),r="http://localhost:3000",o=`${r}/garage`,i=`${r}/winners`,s=`${r}/engine`;async function l(t){const e=`${o}/${t}`,n=await fetch(e,{method:a.RequestMethod.GET});return await n.json()}async function d(t){const e=`${r}/garage`,n={method:a.RequestMethod.POST,headers:{"Content-Type":"application/json"},body:JSON.stringify(t)},o=await fetch(e,n);return o.ok?o.status:-1}async function c(t){const e=`${i}/${t}`,n=await fetch(e,{method:a.RequestMethod.GET});return await n.json()||{}}async function u(t){const e=`${i}`,n={method:a.RequestMethod.POST,headers:{"Content-Type":"application/json"},body:JSON.stringify(t)},r=await fetch(e,n);return r.ok?r.status:-1}async function C(t){const e=`${r}/winners/${t}`;return(await fetch(e,{method:a.RequestMethod.DELETE})).status}e.getCars=async function(t=1,e=7){const n=`${o}?_limit=${e}&_page=${t}`,r=await fetch(n,{method:a.RequestMethod.GET});return{totalCars:+(r.headers.get("X-Total-Count")||"0"),cars:await r.json()}},e.getCar=l,e.createCar=d,e.create100Cars=async function(t){await Promise.all(t.map((async t=>d(t))))},e.updateCar=async function({id:t,...e}){const n=`${r}/garage/${t}`,o={method:a.RequestMethod.PUT,headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};return(await fetch(n,o)).status},e.startEngine=async function(t){const e=`${s}?id=${t}&status=started`,n=await fetch(e,{method:a.RequestMethod.PATCH});return{status:n.status,params:await n.json()}},e.stopEngine=async function(t){const e=`${s}?id=${t}&status=stopped`;return(await fetch(e,{method:a.RequestMethod.PATCH})).status},e.driveEngine=async function(t){const e=`${s}?id=${t}&status=drive`;return(await fetch(e,{method:a.RequestMethod.PATCH})).status},e.getWinners=async function(t=1,e="time",n="ASC",r=10){const o=`${i}?_limit=${r}&_page=${t}&_sort=${e}&_order=${n}`,s=await fetch(o,{method:a.RequestMethod.GET}),d=await s.json();return{totalWinners:+(s.headers.get("X-Total-Count")||"0"),winners:await Promise.all(d.map((async t=>({...t,...await l(t.id)}))))}},e.getWinner=c,e.createWinner=u,e.updateWinner=async function(t,e){const n=await c(t);if(0!==Object.keys(n).length){const r=`${i}/${t}`;n.wins+=1,n.time=e;const o={method:a.RequestMethod.PUT,headers:{"Content-Type":"application/json"},body:JSON.stringify(n)};await fetch(r,o)}else u({id:t,wins:1,time:e})},e.deleteWinner=C,e.deleteCar=async function(t){const e=`${r}/garage/${t}`,n=await fetch(e,{method:a.RequestMethod.DELETE});return await C(t),n.status}},356:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.getRandomCar=void 0,e.getRandomCar=function(){const t=["Tesla","BMW","Opel","KIA","Suzuki","Skoda","Hyundai","Audi","Volkswagen","Mazda"],e=[["Model S","Model Y","Model 3","Model X"],["3","7","M6","6 Gran Turismo","M8","M5","1","X2","X1"],["Grandland X","Crossland","Astra"],["K900","Ceranto","Rio","K5"],["Jimny","Vitara","SX4"],["Rapid","Superb","Octavia","Karoq"],["Solaris","Elantra","Sonata"],["A8","A4","A6","S5"],["Polo","Jetta","Passat","Golf"],["CX-30","6","3","CX-9"]],n="0123456789ABCDF".split(""),a=Math.floor(Math.random()*t.length),r=Math.floor(Math.random()*e[a].length);return{name:`${t[a]} ${e[a][r]}`,color:`#${n[Math.floor(Math.random()*n.length)]}${n[Math.floor(Math.random()*n.length)]}${n[Math.floor(Math.random()*n.length)]}${n[Math.floor(Math.random()*n.length)]}${n[Math.floor(Math.random()*n.length)]}${n[Math.floor(Math.random()*n.length)]}`}}},3:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.removeElement=e.drawUpdate=e.draw=void 0,e.draw=function(t,e){const n=document.createElement("template");n.innerHTML=t,e.append(n.content)},e.drawUpdate=function(t,e){const n=document.createElement("template"),a=e;n.innerHTML=t,a.innerHTML="";const r=n.content.firstElementChild?.childNodes;r&&a.append(...r)},e.removeElement=function(t){t.remove()}}},e={};function n(a){var r=e[a];if(void 0!==r)return r.exports;var o=e[a]={exports:{}};return t[a].call(o.exports,o,o.exports,n),o.exports}n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n(607)})();