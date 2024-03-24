/*Highlight nav section based on where the user has scrolled on the page*/
const sections = document.getElementsByTagName("section");

window.addEventListener("scroll", navHighlight);

function navHighlight() {
  
  let scrollY = window.scrollY;
  
    for (i = 0; i < sections.length; i++) {
        const sectionHeight = sections[i].clientHeight;
        const sectionTop = sections[i].offsetTop - 100;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.getElementsByClassName("navItem")[i].classList.add("activeSection");
        }
        else {
            document.getElementsByClassName("navItem")[i].classList.remove("activeSection");
        }
    }
}

window.onload = function() {
    document.getElementsByClassName("navItem")[0].classList.add("activeSection");
};