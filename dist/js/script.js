/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
document.addEventListener("DOMContentLoaded", () => {
  // Tabs
  const tabsParent = document.querySelector(".tabheader__items");
  const tabs = tabsParent.querySelectorAll(".tabheader__item");
  const tabsContent = document.querySelectorAll(".tabcontent");
  const hideContent = () => {
    tabsContent.forEach((item, i) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
      tabs[i].classList.remove("tabheader__item_active");
    });
  };
  const showContent = (i = 0) => {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  };
  hideContent();
  showContent();
  tabsParent.addEventListener("click", event => {
    tabs.forEach((tab, i) => {
      if (event.target && event.target.contains(tab)) {
        hideContent();
        showContent(i);
      }
    });
  });

  // Timer
  const deadline = "2024-01-13";
  const getRemainTime = endtime => {
    // Функция для получения разницы во времени
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());
    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor(t / (1000 * 60 * 60) % 24);
      minutes = Math.floor(t / (1000 * 60) % 60);
      seconds = Math.floor(t / 1000 % 60);
    }
    return {
      total: t,
      days,
      hours,
      minutes,
      seconds
    };
  };
  const getWithZero = num => {
    // Функция помощник для получения числа с нулем впереди если оно меньше 10
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  };
  const setClock = (selector, endtime) => {
    // Функция устанавливающая данные для таймера на странице
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      interval = setInterval(updateClock, 1000);
    updateClock(); // Обновляем таймер сразу после его инициализации

    function updateClock() {
      // Обновление таймера
      const t = getRemainTime(endtime);
      days.innerHTML = getWithZero(t.days);
      hours.innerHTML = getWithZero(t.hours);
      minutes.innerHTML = getWithZero(t.minutes);
      seconds.innerHTML = getWithZero(t.seconds);
      if (t.total <= 0) {
        clearInterval(interval);
      }
    }
  };
  setClock(".timer", deadline);
});
/******/ })()
;
//# sourceMappingURL=script.js.map