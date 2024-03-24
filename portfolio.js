//Highlight nav section based on where the user has scrolled on the page
const sections = document.getElementsByTagName("section");

window.addEventListener("scroll", navHighlight, false);

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
    createStars();
};


//Create stars for the home background
const minimumStars = 50;
window.addEventListener('resize', createStars, true);

function createStars() {
    const background = document.getElementById("stars");
    const screenWidth = window.screen.width;

    //Clears all the stars
    while (background.firstChild) {
        background.removeChild(background.lastChild);
    }

    //Makes sure there are at least 50 stars or more
    if ((screenWidth / 10) <= minimumStars) {
        for (i = 0; i < minimumStars; i++) {
            const createStar = document.createElement("li");
            createStar.style.cssText = randomStyle();
            background.appendChild(createStar);
        }
    }
    else {
        for (i = 0; i < (screenWidth / 10); i++) {
            const createStar = document.createElement("li");
            createStar.style.cssText = randomStyle();
            background.appendChild(createStar);
        }
    }
}

function randomStyle() {
    const left = randomInteger(0, 100) + "%";
    const size = randomFloat(0.03, 0.07) + "em";
    const delay = randomInteger(-25, 25) + "s";
    const duration = randomInteger(25, 28) + "s";

    return  "left: " + left + 
            "; width: " + size + 
            "; height: " + size + 
            "; animation-delay: "  + delay + ";" +
            "; animation-duration: " + duration + ";";
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max) {
    return (Math.random() * (min - max) + max).toFixed(2);
}