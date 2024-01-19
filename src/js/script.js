const { data } = require("autoprefixer");

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

  tabsParent.addEventListener("click", (event) => {
    tabs.forEach((tab, i) => {
      if (event.target && event.target.contains(tab)) {
        hideContent();
        showContent(i);
      }
    });
  });

  // Timer
  const deadline = "2024-01-13";

  const getRemainTime = (endtime) => {
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
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((t / (1000 * 60)) % 60);
      seconds = Math.floor((t / 1000) % 60);
    }

    return {
      total: t,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const getWithZero = (num) => {
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

  // Modal;
  const modalTrigger = document.querySelectorAll("[data-modal]");
  const modal = document.querySelector(".modal");
  const modalClose = document.querySelector("[data-close]");

  const openModal = () => {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden"; // Блокируем скролл страницы при открытой модалке
  };

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal); // Открытие модального окна при клике на кнопку
  });

  const modalId = setTimeout(openModal, 3000);

  const closeModal = () => {
    // Закрытие модального окна
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = ""; // Возвращаем скролл при закрытии модалки

    clearInterval(modalId);
  };

  modalClose.addEventListener("click", closeModal); // Закрытие при клике на кнопку

  modal.addEventListener("click", (e) => {
    // Закрытие при клике на область вокруг модалки
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    // Закрытие при клике на клавишу Escape если модалка открыта
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const openModalAfterScroll = () => {
    if (
      window.scrollY + document.documentElement.clientWidth >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      window.removeEventListener("scroll", openModalAfterScroll);
    }
  };

  window.addEventListener("scroll", openModalAfterScroll);

  // Menu Cards
  class MenuCard {
    constructor(src, alt, title, desc, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.desc = desc;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `          
        <img src="${this.src}" alt="${this.alt}" />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.desc}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;

      this.parent.append(element);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    "Меню “Фитнес”",
    "Меню “Фитнес” - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    "229",
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню “Премиум”",
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    "550",
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    "Меню “Постное”",
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    "430",
    ".menu .container"
  ).render();

  const forms = document.querySelectorAll("form");

  const messages = {
    load: "Загрузка...",
    success: "Спасибо! Мы с вами свяжемся!",
    error: "Что-то пошло не так :(",
  };

  const postForm = (form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const message = document.createElement("div");
      message.textContent = messages.load;
      form.append(message);

      const request = new XMLHttpRequest();
      request.open(
        "POST",
        "https://65aa5255081bd82e1d96a6ac.mockapi.io/applications"
      );
      request.setRequestHeader("Content-Type", "application/json");

      const formData = new FormData(form);
      const data = {};

      formData.forEach((value, key) => {
        data[key] = value;
      });

      const json = JSON.stringify(data);

      request.send(json);

      request.addEventListener("load", () => {
        if (request.status === 201) {
          message.textContent = messages.success;

          form.reset();

          setTimeout(() => {
            message.remove();
          }, 3000);
        } else {
          message.textContent = messages.error;
        }
      });
    });
  };

  forms.forEach((item) => {
    postForm(item);
  });
});
