//Declaring variables
var modal = document.getElementById("myModal");
var username = "username";
var password = "password";
var authorized = false;
var output;
var vis = 0;
var incorrect = 0;
var message = false;

//Preload images
function preloader() {
	if (document.images) {
		var passHid = new Image();

		passHid.src = "images/hiddenPass.png";
	}
}
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}
addLoadEvent(preloader);

//Runs code when the page loads
$(document).ready(function() {
  modal.style.display = "block"; //Opens the modal
  document.getElementById("user").focus(); //Puts the cursor in the first search bar
});

//Closes the modal
document.getElementById("cancel").onclick = function() {
  output = document.createElement("h1");
  output.innerHTML = "Failed to log in";
  modal.style.display = "none";
  document.getElementById("maincontent").appendChild(output);
}

//Change the visibility on the password input
document.getElementById("visible").onclick = function() {
  if (vis == 0){
    //Below changes the password to visible
    document.getElementById("visible").style.backgroundImage = "url('images/hiddenPass.png')";
    document.getElementById("pass").type = "text";
    vis = 1;
  }
  else if (vis == 1){
    //Below changes the password to hidden
    document.getElementById("visible").style.backgroundImage = "url('images/visiblePass.png')";
    document.getElementById("pass").type = "password";
    vis = 0;
  }
  
}

//Dealing with username and password
document.getElementById("submit").onclick = function() {
  if (username == document.getElementById("user").value){
    if (password == document.getElementById("pass").value) {
      authorized = true;
    }
  }

  if (authorized){
    output = document.createElement("h1");
    output.innerHTML = "Welcome Back";
    modal.style.display = "none";
    document.getElementById("maincontent").appendChild(output);
  }
  else {
    if (!message) {
      output = document.createElement("p");
      output.innerHTML = "Username or password is incorrect";
      document.getElementById("info").getElementsByTagName("p")[0].style.paddingBottom = "10px";
      document.getElementsByClassName("modal-content")[0].style.height = "245px";
      document.getElementById("error").appendChild(output);
      incorrect = 1;
      message = true;
    }
    else {
      incorrect = 1;
    }
  }
}

//Clear text in forms after submit was clicked and information was incorrect
document.getElementById("pass").onclick = function(){
  if (incorrect == 1){
    //document.getElementById("user").value = "";
    document.getElementById("pass").value = "";
    incorrect = 0;
  }
}

document.getElementById("user").onclick = function(){
  if (incorrect == 1){
    document.getElementById("user").value = "";
    document.getElementById("pass").value = "";
    incorrect = 0;
  }
}
