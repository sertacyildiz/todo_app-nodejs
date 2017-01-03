function Welcome(main, username){
  console.log("console started");
  console.log(username);
  var boards;
  var cards;
  var tasks;

  var events = {};

  this.addEventListener = function (eventName, eventFunction) {
    events[eventName] = eventFunction;
  };

  this.getEvent = function (eventName) {
    return events.hasOwnProperty(eventName) ? events[eventName] : undefined;
  };

  var domObjects = {};

  var that = this;
  this.dom = "";

  var generateMenu = function(){

    var startListeningNotifications = function (dom) {

    };

    //html generate area
    var generateArea = function () {

      var container = document.createElement('div');
      container.setAttribute('class','container');
      domObjects.menu.appendChild(container);

      var navbarheader = document.createElement('div');
      navbarheader.setAttribute('class','navbar-header');
      container.appendChild(navbarheader);

      var navbartoggle = document.createElement('button');
      navbartoggle.setAttribute('type','button');
      navbartoggle.setAttribute('id','navbar');
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
      domObjects.collapse = collapse;
      container.appendChild(collapse);

      var nav2 = document.createElement('ul');
      nav2.setAttribute('class','nav navbar-nav fright');
      collapse.appendChild(nav2);

      var dropdown = document.createElement('li');
      dropdown.setAttribute('class','dropdown');
      nav2.appendChild(dropdown);

      var dropdowntoggle = document.createElement('a');
      dropdowntoggle.setAttribute('class','dropdown-toggle disabled');
      dropdowntoggle.setAttribute('data-toggle','dropdown');
      dropdown.appendChild(dropdowntoggle);

      var fa3 = document.createElement('i');
      fa3.setAttribute('class','fa  fa-user');
      dropdowntoggle.appendChild(fa3);
      fa3.innerHTML = " " + username;

      var caret = document.createElement('b');
      caret.setAttribute('class','caret');
      dropdowntoggle.appendChild(caret);

      var dropdownmenu = document.createElement('ul');
      dropdownmenu.setAttribute('class','dropdown-menu');
      dropdown.appendChild(dropdownmenu);

      var li2 = document.createElement('li');
      dropdownmenu.appendChild(li2);

      var a2 = document.createElement('a');
      li2.appendChild(a2);

      var fa4 = document.createElement('i');
      fa4.setAttribute('class','fa  fa-sign-out');
      a2.appendChild(fa4);
      fa4.innerHTML = " Logout";
      domObjects.logout = li2;

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

      var nav = document.createElement('ul');
      nav.setAttribute('class','nav navbar-nav');
      collapse.appendChild(nav);

      var li = document.createElement('li');
      nav.appendChild(li);

      var a = document.createElement('a');
      li.appendChild(a);

      var fa1 = document.createElement('i');
      fa1.setAttribute('class','fa  fa-eye');
      a.appendChild(fa1);
      fa1.innerHTML = " Show Boards";

      domObjects.returnBoardsButton = nav;


      //var nav1 = document.createElement('ul');
      //nav1.setAttribute('class','nav navbar-nav');
      //collapse.appendChild(nav1);
      //
      //var li1 = document.createElement('li');
      //nav1.appendChild(li1);
      //
      //var a1 = document.createElement('a');
      //a1.setAttribute('href','#');
      //li1.appendChild(a1);
      //
      //var fa2 = document.createElement('i');
      //fa2.setAttribute('class','fa  fa-credit-card');
      //a1.appendChild(fa2);
      //fa2.innerHTML = " Cards";

      if(document.getCookie('btitle')){
        var nav1 = document.createElement('ul');
        nav1.setAttribute('class','nav navbar-nav');
        collapse.appendChild(nav1);

        var li1 = document.createElement('li');
        nav1.appendChild(li1);

        var a1 = document.createElement('a');
        li1.appendChild(a1);

        var fa2 = document.createElement('i');
        fa2.setAttribute('class','fa  fa-arrow-right');
        a1.appendChild(fa2);
        fa2.innerHTML = " " + document.getCookie('btitle');
      }

    };

    //addıng events
    var addEvents = function () {

      domObjects.logout.addEventListener("click", function () {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
          var json = JSON.parse(xhr.responseText);

          if(json.err == 0){
            document.setCookie("area", "");
            document.setCookie("bid", "");
            window.location.reload();
          }else{
            console.log("error");
          }
        };
        xhr.open("POST", "/api/v1/auth/logout", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send();

      });

      domObjects.returnBoardsButton.addEventListener("click", function(){
        changeCookie("area", "Boards");
        domObjects.editBoardButton.destroy();
        domObjects.pageTitle.destroy();
      });

    };


    var initMenu = function () {
      generateArea();
      addEvents();
      startListeningNotifications();
    };

    initMenu();
  };


  var generatePage = function () {

    var welcome = document.createElement('div');
    welcome.setAttribute('id','welcome');
    domObjects.welcome = welcome;

    var navbar = document.createElement('nav');
    navbar.setAttribute('class','navbar navbar-static-top bs-docs-nav');
    navbar.setAttribute('role','navigation');
    domObjects.menu = navbar;
    welcome.appendChild(navbar);

    main.appendChild(welcome);

    if( document.getCookie("area") ){
      if( document.getCookie("area") == "Boards" ){
        document.setCookie("bid", "");
        document.setCookie("btitle", "");
        boards = new Boards(welcome);
      }
      if( document.getCookie("area") == "Cards" ){
        cards = new Cards(welcome, document.getCookie("bid") , document.getCookie("btitle"));
      }
    }else{
      boards = new Boards(welcome);
    }


  };

  var initEvents = function(){

  };

  var changeCookie = function (name,newcookie) {
    document.setCookie(name, newcookie);
    window.location.reload();
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

  var init = function () {
    generatePage();
    generateMenu();
    initEvents();
  };

  init();
}