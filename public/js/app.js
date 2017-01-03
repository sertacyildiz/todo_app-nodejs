r(function(){
  var main = document.getElementById("main");
  var login;
  var register;
  var welcome;
  var username;


  var showLogin = function () {
    register.hide();
    if(!!login){
      login.show();
    }else{
      login = new Login(main);
      login.addEventListener("loginSuccess", function () {
        loginSuccess(username);
      });
      login.addEventListener("clickRegister", showRegister);
    }


  };
  var showRegister = function () {
    login.hide();
    if(!!register){
      register.show();
    }else{
      register = new Register(main);
      register.addEventListener("loginClick", showLogin);
      register.addEventListener("")
    }

  };

  var loginSuccess = function (un) {
    username = un;
    welcome = new Welcome(main, username);
    console.log(username);
  };

  var xhr = new XMLHttpRequest();
  xhr.onload = function(){
      var response = JSON.parse(xhr.responseText);
      if(response.err){
        login = new Login(main);
        login.addEventListener("loginSuccess", loginSuccess);
        login.addEventListener("clickRegister", showRegister);
      }else{
        username = response.username;
        welcome = new Welcome(main, username);
      }
  };
  xhr.open("POST", "/api/v1/", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send();
});