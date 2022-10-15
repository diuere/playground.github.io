const getObserver = (element, activate, deactivate, threshold) => {
  /* 
    receives a DOM element; 
    creates an IntersectionObserver instance; 
    listen to intersecting changes; 
    if the intersecting is true, it runs a function passed as argument; 
    if intersecting is false, it runs a different function passed as argument.
  */
  const options = threshold === null ? {} : { threshold: threshold, };

  const elementObserver = new IntersectionObserver((entries, elementObserver) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        if(activate) activate();
      } else if(!entry.isIntersecting){
        if(deactivate) deactivate();
      }
    })
  }, options);

  elementObserver.observe(element);
}

export const pageObserver = (page) => { // helps maintaining the page selection if the page is refreshed
  const navLinks = document.querySelectorAll(".route-selector");

  const toggleLinkClass = () => {
    navLinks.forEach(link => { // should loop through navLinks apply or remove the .route-selected class depending on the section.page that's currently being seen.
      const linkClass = link.classList;

      if(linkClass[1] === page.id){
        link.classList.add("route-selected");
      } else {
        link.classList.remove("route-selected");
      }
    })
  }
  
  getObserver(page, () => toggleLinkClass(), false, null);
}

export const hamburgerIconObserver = ({ toggleMenu }) => { // close the menu overlay based on the .hamburger-menu-wrapper intersection state
  const hamburgerMenuWrapper = document.querySelector(".hamburger-menu-wrapper");

  getObserver(hamburgerMenuWrapper, () => toggleMenu(true), false, null);
}

export const headerObserver = ({ toggleMenu }) => { // toggle the .rollback element
  const mainHeader = document.querySelector("#mainHeader");
  const rollbackWrapper = document.querySelector("#rollbackWrapper");

  getObserver(mainHeader, () => rollbackWrapper.classList.remove("rollback"), () => { toggleMenu(true); rollbackWrapper.classList.add("rollback"); }, .5);
}

export const footerObserver = () => { // change the backgroundColor of the .rollback element
  const mainFooter = document.querySelector('.main-footer');
  const rollbackIcon = document.querySelector("#rollbackIcon");

  getObserver(mainFooter, () => rollbackIcon.style.cssText = "color: #e9eaeb;", () => rollbackIcon.style.cssText = "color: #201d1d;", .3)
}