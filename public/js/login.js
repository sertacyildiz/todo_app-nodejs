function Login(main){

  var events = {};

  this.addEventListener = function (eventName, eventFunction) {
    events[eventName] = eventFunction;
  };

  this.getEvent = function (eventName) {
    return events.hasOwnProperty(eventName) ? events[eventName] : undefined;
  };

  var domObjects =  {};

  var that = this;
  this.dom = "";

  var sendLogin = function(){

    var post = {
      username: domObjects.usernameInput.value,
      password: domObjects.passwordInput.value
    };

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var json = JSON.parse(xhr.responseText);
      console.log("response: ", json);
      if(json.err == 0){

        that.destroy();

        setTimeout(function () {
          console.log(json.username);
          var onLoginSuccess = that.getEvent("loginSuccess");
          if (!!onLoginSuccess) onLoginSuccess(json.username);

        }, 10);
      }else{
        console.log("error");
        setTimeout(function () {
          domObjects.usernameInput.style.borderColor = "red";
          domObjects.passwordInput.style.borderColor = "red";
        }, 10);
      }
    };
    xhr.open("POST", "/api/v1/auth/login", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(post));
  };

  var initEvents = function () {
    console.log(domObjects.loginButton);
    domObjects.loginButton.addEventListener("click", function(){
      console.log(this);
      sendLogin();
    });

    domObjects.usernameInput.addEventListener("keyup", function (evt) {
      var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
      if (keyCode == 13) {
        sendLogin();
      }
    });

    domObjects.passwordInput.addEventListener("keyup", function (evt) {
      var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
      if (keyCode == 13) {
        sendLogin();
      }
    });

    domObjects.registerButton.addEventListener("click", function(){
      //console.log(this);
      var onClickRegister = that.getEvent("clickRegister");
      if (!!onClickRegister) onClickRegister();
    });
  };

  var generatePage = function(){
    var login = document.createElement('div');
    login.setAttribute('id','login');
    login.setAttribute('class','centeruprel');

    that.dom = login;

    var h1 = document.createElement('h1');
    login.appendChild(h1);
    h1.innerHTML = " ";

    var fa = document.createElement('i');
    fa.setAttribute('class','fa fa-tasks');
    h1.appendChild(fa);
    fa.innerHTML = " TO-DO ";

    var loginInputs = document.createElement('div');
    loginInputs.setAttribute('class','loginInputs flexbox flexbox_container_v');
    login.appendChild(loginInputs);

    var fullLine = document.createElement('div');
    fullLine.setAttribute('class','fullLine');
    loginInputs.appendChild(fullLine);

    var flexbox = document.createElement('a');
    flexbox.setAttribute('id','register-btn');
    flexbox.setAttribute('class','flexbox flexbox-end');
    fullLine.appendChild(flexbox);
    flexbox.innerHTML = "Register";
    domObjects.registerButton = flexbox;

    var fa1 = document.createElement('i');
    fa1.setAttribute('class','fa fa-paper-plane-o');
    flexbox.appendChild(fa1);

    var formcontrol = document.createElement('input');
    formcontrol.setAttribute('type','text');
    formcontrol.setAttribute('placeholder','Username');
    formcontrol.setAttribute('class','form-control');
    formcontrol.setAttribute('id','username');
    domObjects.usernameInput = formcontrol;
    loginInputs.appendChild(formcontrol);

    var formcontrol1 = document.createElement('input');
    formcontrol1.setAttribute('type','password');
    formcontrol1.setAttribute('placeholder','Password');
    formcontrol1.setAttribute('class','form-control');
    formcontrol1.setAttribute('id','password');
    domObjects.passwordInput = formcontrol1;
    loginInputs.appendChild(formcontrol1);

    var btn = document.createElement('button');
    btn.setAttribute('class', 'btn btn-danger');
    btn.innerHTML = " LOGIN ";
    loginInputs.appendChild(btn);
    domObjects.loginButton = btn;


    var fullLine1 = document.createElement('div');
    fullLine1.setAttribute('class','fullLine flexbox flexbox_ordered_h');
    loginInputs.appendChild(fullLine1);

    var checkbox = document.createElement('div');
    checkbox.setAttribute('class','checkbox checkbox-danger checkbox-circle');
    fullLine1.appendChild(checkbox);

    var input = document.createElement('input');
    input.setAttribute('id','checkbox6');
    input.setAttribute('type','checkbox');
    input.setAttribute('checked','');
    checkbox.appendChild(input);

    var label = document.createElement('label');
    label.setAttribute('for','checkbox6');
    checkbox.appendChild(label);
    label.innerHTML = "Remember";

    var forgot = document.createElement('a');
    forgot.setAttribute('class','forgot');
    fullLine1.appendChild(forgot);
    forgot.innerHTML = "Forgot Password";

    var fa2 = document.createElement('i');
    fa2.setAttribute('class','fa fa-question-circle');
    forgot.appendChild(fa2);

    main.appendChild(login);
  };

  this.show = function () {
    that.dom.style.display = "block";

  };
  this.hide = function () {
    that.dom.style.display = "none";
  };
  this.destroy = function () {
    that.dom.style.display = "none";
    that.dom.removeFromParent();
  };

  var init = function(){
    console.log("[LOGIN] : init");
    generatePage();
    initEvents();
  };

  init();
}