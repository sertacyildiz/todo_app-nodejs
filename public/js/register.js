function Register(main){

  //<editor-fold desc="Event Manager">
  var events = {};

  this.addEventListener = function (eventName, eventFunction) {
    events[eventName] = eventFunction;
  };

  this.getEvent = function (eventName) {
    return events.hasOwnProperty(eventName) ? events[eventName] : undefined;
  };
  //</editor-fold>

  var domObjects = {};

  var that = this;
  this.dom = "";

  var sendRegister = function(){

    var post = {
      username: domObjects.usernameInput.value,
      password: domObjects.passwordInput.value
    };

    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
      var response = JSON.parse(xhr.responseText);
      console.log(response);

      if(response.err == false){

        that.destroy();

        setTimeout( function(){
          var login = new Login(main);
          login.show();
        },10);
      }else{
        console.log("already exist");
      }
    };
    xhr.open("POST", "/api/v1/auth/register", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(post));


  };

  var generatePage = function(){
    var register = document.createElement('div');
    register.setAttribute('id','login');
    register.setAttribute('class','centeruprel');

    that.dom = register;

    var h1 = document.createElement('h1');
    register.appendChild(h1);
    h1.innerHTML = " ";

    var fa = document.createElement('i');
    fa.setAttribute('class','fa fa-tasks');
    h1.appendChild(fa);
    fa.innerHTML = " TO-DO ";

    var loginInputs = document.createElement('div');
    loginInputs.setAttribute('class','loginInputs flexbox flexbox_container_v');
    register.appendChild(loginInputs);

    var fullLine = document.createElement('div');
    fullLine.setAttribute('class','fullLine');
    loginInputs.appendChild(fullLine);
    fullLine.innerHTML = " &nbsp ";

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

    var formcontrol2 = document.createElement('input');
    formcontrol2.setAttribute('type','email');
    formcontrol2.setAttribute('placeholder','E-Mail');
    formcontrol2.setAttribute('class','form-control');
    loginInputs.appendChild(formcontrol2);

    var btn = document.createElement('button');
    btn.setAttribute('class','btn btn-danger');
    loginInputs.appendChild(btn);
    btn.innerHTML = " REGISTER ";
    domObjects.registerButton = btn;

    var fullLine1 = document.createElement('div');
    fullLine1.setAttribute('class','fullLine');
    loginInputs.appendChild(fullLine1);

    var flexbox = document.createElement('a');
    flexbox.setAttribute('class','flexbox flexbox-end');
    fullLine1.appendChild(flexbox);
    flexbox.innerHTML = "Login";
    flexbox.addEventListener("click", function(){
      var loginClick = that.getEvent("loginClick");
      if (!!loginClick) loginClick();
    });

    var fa1 = document.createElement('i');
    fa1.setAttribute('class','fa fa-arrow-right');
    flexbox.appendChild(fa1);

    main.appendChild(register);
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

  var initEvents = function(){
    domObjects.registerButton.addEventListener("click", function () {
      sendRegister();
    });

    domObjects.usernameInput.addEventListener("keyup", function (evt) {
      var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
      if (keyCode == 13) {
        sendRegister();
      }
    });

    domObjects.passwordInput.addEventListener("keyup", function (evt) {
      var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
      if (keyCode == 13) {
        sendRegister();
      }
    });


  };

  var init = function () {

    generatePage();
    initEvents();

  };

  init();
}