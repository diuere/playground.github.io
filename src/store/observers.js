export const pageObserver = (page) => { // helps maintaining the page selection if the page is refreshed
  const navLinks = document.querySelectorAll(".route-selector");
  
  const pageObserver = new IntersectionObserver((entries, pageObserver) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        navLinks.forEach(link => {
          const linkClass = link.classList;

          if(linkClass[1] === page.id){
            link.classList.add("route-selected");
          } else {
            link.classList.remove("route-selected");
          }
        })
      }
    })
  }, {})

  pageObserver.observe(page)
}


export const hamburgerIconObserver = ({ toggleMenu }) => { // close the menu overlay based on the .hamburger-menu-wrapper intersection state
  const hamburgerMenuWrapper = document.querySelector(".hamburger-menu-wrapper");

  const hamburgerMenuObserver = new IntersectionObserver((entries, hamburgerMenuObserver) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting){
        toggleMenu(true);
      }
    })
  }, {})

  hamburgerMenuObserver.observe(hamburgerMenuWrapper);
}


export const headerObserver = ({ toggleMenu }) => { //toggle the .rollback element
  const mainHeader = document.querySelector("#mainHeader");
  const rollbackWrapper = document.querySelector("#rollbackWrapper");

  const headerObserver = new IntersectionObserver((entries, headerObserver) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting){
        toggleMenu(true);
        rollbackWrapper.classList.add("rollback");
      } else {
        rollbackWrapper.classList.remove("rollback");
      };
    });
  }, {
    threshold: .5,
  });

  headerObserver.observe(mainHeader);
}

export const footerObserver = () => { // change the backgroundColor of the .rollback element
    const mainFooter = document.querySelector('.main-footer');
    const rollbackIcon = document.querySelector("#rollbackIcon");

    const footerObserver = new IntersectionObserver((entries, footerObserver) => {
        entries.forEach(entry => {
            if(!entry.isIntersecting){
                rollbackIcon.style.cssText = "color: #201d1d;"
            } else {
                rollbackIcon.style.cssText = "color: #e9eaeb;"
            }
        })
    }, {
        threshold: .3,
    })

    footerObserver.observe(mainFooter);
}