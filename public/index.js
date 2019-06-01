
// Html DOM elements

// Main document body div
let main = document.getElementById("main-body");
// Sticky Header Menu div
let header = document.getElementById("header-menu");

// Event Listener for DOM intro text append
firebase.auth().onAuthStateChanged(function(user) {
  if (user === null) {
    // Sticky-Header text append with a href to login and signup pages
    let loginHeader = document.createElement("a");
    let signupHeader = document.createElement("a");

    loginHeader.setAttribute("href", "login.html");
    signupHeader.setAttribute("href", "signup.html");

    loginHeader.setAttribute("id", "header-button");
    signupHeader.setAttribute("id", "header-button");

    let loginText = document.createTextNode("Log in");
    let signupText = document.createTextNode("Sign up");

    loginHeader.appendChild(loginText);
    signupHeader.appendChild(signupText);

    header.appendChild(loginHeader);
    header.appendChild(signupHeader);

    // Main Body text append

    // If the has not loggedin yet, append message stating that the user must first sign in
    let logPrompt = document.createElement("H1");
    let logPromptText = document.createTextNode("Please Log in to Continue");

    logPrompt.appendChild(logPromptText);

    // Add css
    logPrompt.style.margin = '300px 435px';
    logPrompt.style.align = 'center';

    main.appendChild(logPrompt);
  } else if (user !== null) {
    // User has signed in already, append with profile page and stats

    // Add logout button
    let logoutHeader = document.createElement("a");
    let logoutText = document.createTextNode("Log out");

    logoutHeader.setAttribute("id", "header-button");
    logoutHeader.appendChild(logoutText);

    logoutHeader.addEventListener('click', function() {
      // Add logout button
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location = "index.html";
      }, function(error) {
        // An error happened.
      });
    }, false);

    header.append(logoutHeader);

    // Append Sticky-Header with Profile Stats
    let email = user.email;
    let profileText = document.createTextNode("Welcome back " + email);
    let profileHeader = document.createElement("a");

    profileHeader.setAttribute("href", "profile.html");
    profileHeader.setAttribute("id", "header-button");
    profileHeader.appendChild(profileText);

    header.appendChild(profileHeader);

    // If the has not loggedin yet, append message stating that the user must first sign in
    let logPrompt = document.createElement("H1");
    let logPromptText = document.createTextNode("Hi");

    logPrompt.appendChild(logPromptText);

    // Add css
    logPrompt.style.margin = '300px 435px';
    logPrompt.style.align = 'center';

    main.appendChild(logPrompt);
    console.log("H");
  }
});
