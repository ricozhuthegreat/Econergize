

window.snapKitInit = () => {

  snap.loginkit.mountButton("login-button", {
    clientId: "5414d722-7487-4d5b-9a92-221ccf07da6e",
    redirectURI: "http://localhost:5000",
    scopeList: [
      "user.display_name",
      "user.bitmoji.avatar",
    ],
    handleResponseCallback: () => {
      snap.loginkit.fetchUserInfo().then(data => {

        document.getElementById("header-menu").classList.remove("hidden");
        document.getElementById("login-button").classList.add("hidden")
        document.getElementById("profile").classList.remove("hidden")
        document.getElementById("welcome").appendChild(document.createTextNode("Welcome, " + data["data"]["me"]["displayName"] + "!"))
        document.getElementById("picture").src = data["data"]["me"]["bitmoji"]["avatar"]

        SDKManualInit();

      })
    },
  })
}
// Load the SDK asynchronously
(function (d, s, id) {
  var js, sjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://sdk.snapkit.com/js/v1/login.js";
  sjs.parentNode.insertBefore(js, sjs);
}(document, "script", "loginkit-sdk"));
