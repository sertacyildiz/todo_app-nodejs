
var main = document.getElementById("main");

var displayList = function(anchor, list){
    anchor.addEventListener("click", function(){
        if(list.style.display == "none") {
            list.style.display = "block";
        }else{
            list.style.display = "none";
        }

    });
};

var createBoard = function(parent){
    var board = document.createElement('div');
    board.setAttribute('class','board');
    parent.insertBefore(board, parent.childNodes[0]);

    var h3 = document.createElement('h3');
    board.appendChild(h3);

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var json = JSON.parse(xhr.responseText);
        var data = json.data;

        if(json.err == 0){
            h3.innerHTML = data.title;
        }else{
            console.log("error");
        }
    };
    xhr.open("POST", "/api/v1/boards/create", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();
};

var welcome = function(username){

    // Nav Bar

    var welcome = document.createElement('div');
    welcome.setAttribute('id','welcome');

    var navbar = document.createElement('nav');
    navbar.setAttribute('class','navbar navbar-static-top bs-docs-nav');
    navbar.setAttribute('role','navigation');
    welcome.appendChild(navbar);

    var container = document.createElement('div');
    container.setAttribute('class','container');
    navbar.appendChild(container);

    var navbarheader = document.createElement('div');
    navbarheader.setAttribute('class','navbar-header');
    container.appendChild(navbarheader);

    var navbartoggle = document.createElement('button');
    navbartoggle.setAttribute('type','button');
    navbartoggle.setAttribute('class','navbar-toggle');
    navbartoggle.setAttribute('data-toggle','collapse');
    navbartoggle.setAttribute('data-target','.navbar-ex1-collapse');
    navbarheader.appendChild(navbartoggle);

    var sronly = document.createElement('span');
    sronly.setAttribute('class','sr-only');
    navbartoggle.appendChild(sronly);
    sronly.innerHTML = "...";

    var iconbar = document.createElement('span');
    iconbar.setAttribute('class','icon-bar');
    navbartoggle.appendChild(iconbar);

    var iconbar1 = document.createElement('span');
    iconbar1.setAttribute('class','icon-bar');
    navbartoggle.appendChild(iconbar1);

    var iconbar2 = document.createElement('span');
    iconbar2.setAttribute('class','icon-bar');
    navbartoggle.appendChild(iconbar2);

    var navbarbrand = document.createElement('a');
    navbarbrand.setAttribute('class','navbar-brand');
    navbarbrand.setAttribute('href','/');
    navbarheader.appendChild(navbarbrand);

    var fa = document.createElement('i');
    fa.setAttribute('class','fa fa-tasks');
    navbarbrand.appendChild(fa);
    fa.innerHTML = " TO-DO ";

    var collapse = document.createElement('div');
    collapse.setAttribute('class','collapse navbar-collapse navbar-ex1-collapse');
    container.appendChild(collapse);

    var nav = document.createElement('ul');
    nav.setAttribute('class','nav navbar-nav');
    collapse.appendChild(nav);

    var li = document.createElement('li');
    nav.appendChild(li);

    var a = document.createElement('a');
    a.setAttribute('href','#');
    li.appendChild(a);

    var fa1 = document.createElement('i');
    fa1.setAttribute('class','fa  fa-edit');
    a.appendChild(fa1);
    fa1.innerHTML = " Boards";

    var nav1 = document.createElement('ul');
    nav1.setAttribute('class','nav navbar-nav');
    collapse.appendChild(nav1);

    var li1 = document.createElement('li');
    nav1.appendChild(li1);

    var a1 = document.createElement('a');
    a1.setAttribute('href','#');
    li1.appendChild(a1);

    var fa2 = document.createElement('i');
    fa2.setAttribute('class','fa  fa-credit-card');
    a1.appendChild(fa2);
    fa2.innerHTML = " Cards";

    var nav2 = document.createElement('ul');
    nav2.setAttribute('class','nav navbar-nav');
    collapse.appendChild(nav2);

    var dropdown = document.createElement('li');
    dropdown.setAttribute('class','dropdown');
    nav2.appendChild(dropdown);

    var dropdowntoggle = document.createElement('a');
    dropdowntoggle.setAttribute('class','dropdown-toggle');
    dropdowntoggle.setAttribute('data-toggle','dropdown');
    dropdown.appendChild(dropdowntoggle);

    var fa3 = document.createElement('i');
    fa3.setAttribute('class','fa  fa-user');
    dropdowntoggle.appendChild(fa3);
    fa3.innerHTML = username;

    var caret = document.createElement('b');
    caret.setAttribute('class','caret');
    dropdowntoggle.appendChild(caret);

    var dropdownmenu = document.createElement('ul');
    dropdownmenu.setAttribute('class','dropdown-menu');
    dropdown.appendChild(dropdownmenu);
    displayList(dropdown, dropdownmenu);

    var li2 = document.createElement('li');
    dropdownmenu.appendChild(li2);

    var a2 = document.createElement('a');
    li2.appendChild(a2);

    var fa4 = document.createElement('i');
    fa4.setAttribute('class','fa  fa-sign-out');
    a2.appendChild(fa4);
    fa4.innerHTML = " Logout";

    li2.addEventListener("click", function () {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var json = JSON.parse(xhr.responseText);

            if(json.err == 0){
                window.location.reload();
            }else{
                console.log("error");
            }
        };
        xhr.open("POST", "/api/v1/auth/logout", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send();
    });

    var li3 = document.createElement('li');
    dropdownmenu.appendChild(li3);

    var a3 = document.createElement('a');
    a3.setAttribute('href','');
    li3.appendChild(a3);

    var fa5 = document.createElement('i');
    fa5.setAttribute('class','fa  fa-asterisk');
    a3.appendChild(fa5);
    fa5.innerHTML = " Change password";

    var navdivider = document.createElement('li');
    navdivider.setAttribute('class','nav-divider');
    dropdownmenu.appendChild(navdivider);

    var li4 = document.createElement('li');
    dropdownmenu.appendChild(li4);

    var a4 = document.createElement('a');
    a4.setAttribute('href','');
    li4.appendChild(a4);

    var fa6 = document.createElement('i');
    fa6.setAttribute('class','fa  fa-user');
    a4.appendChild(fa6);
    fa6.innerHTML = " Add user";

    var li5 = document.createElement('li');
    dropdownmenu.appendChild(li5);

    var a5 = document.createElement('a');
    a5.setAttribute('href','');
    li5.appendChild(a5);

    var fa7 = document.createElement('i');
    fa7.setAttribute('class','fa  fa-users');
    a5.appendChild(fa7);
    fa7.innerHTML = " List users";

    var navdivider1 = document.createElement('li');
    navdivider1.setAttribute('class','nav-divider');
    dropdownmenu.appendChild(navdivider1);

    var li6 = document.createElement('li');
    dropdownmenu.appendChild(li6);

    var a6 = document.createElement('a');
    a6.setAttribute('href','');
    li6.appendChild(a6);

    var fa8 = document.createElement('i');
    fa8.setAttribute('class','fa  fa-area-chart');
    a6.appendChild(fa8);
    fa8.innerHTML = " Stats";

    // Boards

    var boards = document.createElement('div');
    boards.setAttribute('class','boards');
    welcome.appendChild(boards);

    var boardNew = document.createElement('div');
    boardNew.setAttribute('class','board new');
    boards.appendChild(boardNew);

    var fa9 = document.createElement('i');
    fa9.setAttribute('class','fa fa-plus-square centervrel');
    boardNew.appendChild(fa9);
    boardNew.addEventListener("click", function (){
        createBoard(boards, "");

    });

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var json = JSON.parse(xhr.responseText);
        var data = json.data;

        if(json.err == 0){

            for (i = 0; i < data.length; i++) {
                var board = document.createElement('div');
                board.setAttribute('class','board');
                boards.insertBefore(board, boards.childNodes[0]);

                var h3 = document.createElement('h3');
                h3.innerHTML = data[i].title;
                board.appendChild(h3);
            }

        }else{
            console.log("no board");
        }

    };
    xhr.open("POST", "/api/v1/boards/list", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();

    main.appendChild(welcome);
};

var sendLogin = function(){
    var un = document.getElementById("username");
    var ps = document.getElementById("password");

    console.log(un.value);
    console.log(ps.value);

    var post = {
        username: un.value,
        password: ps.value
    };

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var json = JSON.parse(xhr.responseText);
        console.log("response: ", json);
        if(json.err == 0){
            main.innerHTML = "";
            setTimeout(function () {
                welcome(json.username);
            }, 10);
        }else{
            console.log("error");
            setTimeout(function () {
                un.style.borderColor = "red";
                ps.style.borderColor = "red";
            }, 10);
        }
    };
    xhr.open("POST", "/api/v1/auth/login", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(post));
};

var sendRegister = function(){
    var un = document.getElementById("username").value;
    var ps = document.getElementById("password").value;

    var post = {
        username: un,
        password: ps
    };

    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        var response = JSON.parse(xhr.responseText);
        console.log(response);

        if(response.err == false){
            main.innerHTML = "";
            setTimeout( function(){
                login();
            },10);
        }else{
            console.log("already exist");
        }
    };
    xhr.open("POST", "/api/v1/auth/register", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(post));


};

var register = function(){
    console.log("register");

    var register = document.createElement('div');
    register.setAttribute('id','login');
    register.setAttribute('class','centeruprel');
    //register.style.opacity = 1;

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
    loginInputs.appendChild(formcontrol);

    var formcontrol1 = document.createElement('input');
    formcontrol1.setAttribute('type','password');
    formcontrol1.setAttribute('placeholder','Password');
    formcontrol1.setAttribute('class','form-control');
    formcontrol1.setAttribute('id','password');
    loginInputs.appendChild(formcontrol1);

    var formcontrol2 = document.createElement('input');
    formcontrol2.setAttribute('type','email');
    formcontrol2.setAttribute('placeholder','E-Mail');
    formcontrol2.setAttribute('class','form-control');
    loginInputs.appendChild(formcontrol2);

    var btn = document.createElement('button');
    btn.setAttribute('class','btn btn-lg btn-danger');
    loginInputs.appendChild(btn);
    btn.innerHTML = " REGISTER ";
    btn.addEventListener("click", function(){
        sendRegister();
    });

    var fullLine1 = document.createElement('div');
    fullLine1.setAttribute('class','fullLine');
    loginInputs.appendChild(fullLine1);

    var flexbox = document.createElement('a');
    flexbox.setAttribute('class','flexbox flexbox-end');
    fullLine1.appendChild(flexbox);
    flexbox.innerHTML = "Login";

    flexbox.addEventListener("click", function(){

        main.innerHTML = "";
        setTimeout(login, 10);
    });

    var fa1 = document.createElement('i');
    fa1.setAttribute('class','fa fa-arrow-right');
    flexbox.appendChild(fa1);

    main.appendChild(register);

};

var login = function () {
    console.log("login");

    var login = document.createElement('div');
    login.setAttribute('id','login');
    login.setAttribute('class','centeruprel');
    //login.style.opacity = 1;

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

    flexbox.addEventListener("click", function(){

        main.innerHTML = "";
        setTimeout(register, 10);
    });

    var fa1 = document.createElement('i');
    fa1.setAttribute('class','fa fa-paper-plane-o');
    flexbox.appendChild(fa1);

    var formcontrol = document.createElement('input');
    formcontrol.setAttribute('type','text');
    formcontrol.setAttribute('placeholder','Username');
    formcontrol.setAttribute('class','form-control');
    formcontrol.setAttribute('id','username');
    loginInputs.appendChild(formcontrol);

    var formcontrol1 = document.createElement('input');
    formcontrol1.setAttribute('type','password');
    formcontrol1.setAttribute('placeholder','Password');
    formcontrol1.setAttribute('class','form-control');
    formcontrol1.setAttribute('id','password');
    loginInputs.appendChild(formcontrol1);

    var btn = document.createElement('button');
    btn.setAttribute('class','btn btn-lg btn-danger');
    loginInputs.appendChild(btn);
    btn.innerHTML = " LOGIN ";
    btn.addEventListener("click", function(){
        sendLogin();
    });

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


(function () {
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        var response = JSON.parse(xhr.responseText);
        //console.log(response.err);
        //console.log(response);

        if(response.err){

            login();

        }else{

            welcome(response.username);
        }


    };
    xhr.open("POST", "/api/v1/", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();
}());