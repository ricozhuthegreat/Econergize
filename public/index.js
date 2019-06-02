
// Html DOM elements

// Main document body div
let main = document.getElementById("main-body");
// Sticky Header Menu div
let header = document.getElementById("header-menu");

let db = firebase.firestore(app);

// Event Listener for DOM intro text append
firebase.auth().onAuthStateChanged(function(user) {
  if (user === null) {

    // Sticky-Header text append with a href to login and signup pages
    let loginHeader = document.createElement("a");
    let signupHeader = document.createElement("a");

    loginHeader.setAttribute("href", "login.html");
    signupHeader.setAttribute("href", "signup.html");

    loginHeader.setAttribute("id", "main-button-login");
    signupHeader.setAttribute("id", "main-button-signup");

    let loginText = document.createTextNode("Log in");
    let signupText = document.createTextNode("Sign up");

    loginHeader.appendChild(loginText);
    signupHeader.appendChild(signupText);

    // Main Body text append

    // If the has not loggedin yet, append message stating that the user must first sign in
    let logPrompt = document.createElement("H1");
    let logPromptText = document.createTextNode("Welcome to Econergize. Please login to continue.");

    logPrompt.id = "left-panel";

    logPrompt.appendChild(logPromptText);

    // Add css
    logPrompt.style.margin = '100px 100px';
    logPrompt.style.align = 'left';

    let infoText = document.createElement("p");
    infoText.appendChild(document.createTextNode("Welcome to the Premier Commercial Sustainability Tracker for Consumers of All Types"));

    infoText.id = "left-panel";

    infoText.style.align = 'center';
    infoText.style.font = 'bold';
    infoText.style.margin = '155px 100px';

    document.getElementById("right-panel").appendChild(loginHeader);
    document.getElementById("right-panel").appendChild(signupHeader);

    main.appendChild(logPrompt);
    main.appendChild(infoText);
  } else if (user !== null) {
    // User has signed in already, append with profile page and stats

    header.classList.remove("hidden");
    body.classList.remove("grad");
    document.getElementById("login-button").classList.add("hidden");

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

    let itemsListDisplay = document.createElement("ul");

    itemsListDisplay.style.margin = '5% 150px';
    itemsListDisplay.style.align = 'left';

    let bodyTitle = document.createElement("h2");

    bodyTitle.style.margin = '150px 150px 20px';
    bodyTitle.appendChild(document.createTextNode("Items and Sustainability Values"));

    main.appendChild(bodyTitle);
    // Get firebase data from users
    let cUserDocument = db.collection("users").doc(email);

    cUserDocument.collection("Items").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // Get the data fields under a user
        let item = doc.data();

        let itemName = item.Name;
        let itemSusVal = item.SusVal;

        console.log(itemName);
        console.log(itemSusVal);

        let itemsListAppend = document.createElement("li");

        itemsListAppend.appendChild(document.createTextNode(itemName + " " + itemSusVal));
        itemsListDisplay.appendChild(itemsListAppend);

      });
    })

    main.appendChild(itemsListDisplay);

  }
});
