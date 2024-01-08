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
});
