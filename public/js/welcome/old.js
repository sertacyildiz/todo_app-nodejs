function Welcome(main, username){
  console.log("console started");
  console.log(username);


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

  var generateTasks = function (tasks, cid) {

    var getTasks = function () {

      var task = document.createElement('li');
      task.setAttribute('class','task');
      tasks.appendChild(task);

      var h5 = document.createElement('h5');
      task.appendChild(h5);
      h5.innerHTML = " Test Task ";

      var p = document.createElement('p');
      task.appendChild(p);
      p.innerHTML = " New Card 6 lorem ipsum cambio dolore sit amet ";
    };

    var addEvent = function () {

    };

    var initTasks = function () {
      getTasks();
      addEvent();
    };

    initTasks();

  };

  var generateCards = function (bid, btitle) {

    var bpost = {
      bid: bid
    };

    document.setCookie("bid", bid);
    document.setCookie("btitle", btitle);

    var createTask = function () {

    };

    var newTaskWindow = function(dom,tasklist,cid){

      var taskWindow = document.createElement('div');
      taskWindow.setAttribute('class', 'taskWindow');
      domObjects.taskWindow = taskWindow;
      //domObjects.welcome.prependChild(taskWindow);
      document.getElementsByTagName('body')[0].prependChild(taskWindow);

      var taskWindowBack = document.createElement('div');
      taskWindowBack.setAttribute('class', 'taskWindowBack');
      domObjects.taskWindowBack = taskWindowBack;
      taskWindow.appendChild(taskWindowBack);

      var taskContent = document.createElement('div');
      taskContent.setAttribute('class', 'taskContent center');
      taskWindow.appendChild(taskContent);

      var input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('class', 'form-control');
      input.setAttribute('placeholder', 'Task Name');
      taskContent.appendChild(input);

      var textarea = document.createElement('textarea');
      textarea.setAttribute('class', 'form-control');
      textarea.setAttribute('placeholder', 'Task Description');
      taskContent.appendChild(textarea);

      var button = document.createElement('button');
      button.setAttribute('class','btn btn-lg btn-success');
      button.innerHTML = " SAVE ";
      domObjects.taskSaveButton = button;
      taskContent.appendChild(button);

      setTimeout(function (){

        domObjects.taskSaveButton.addEventListener('click', function () {
          console.log(domObjects.taskWindow);
          domObjects.taskWindow.destroy();
        });

        domObjects.taskWindow.style.opacity = "1";
        domObjects.taskWindow.style.transform = "scaleX(1)";


        domObjects.taskWindowBack.addEventListener('click', function (){
          domObjects.taskWindow.style.opacity = "0";
          domObjects.taskWindow.style.transform = "scaleX(0)";
        });
      }, 200);

    };

    function assignRemove(dom,cid,ctitle){
      dom.addEventListener('click', function() {

        if( confirm( "Silmek istediğinize emin misiniz? => " + ctitle) ){
          removeCard(cid,dom);
        }
      });
    }

    function assignNewTask(dom,tasklist,cid){
      dom.addEventListener('click', function() {
        console.log("new task : " + cid );
        //generateTasks(tasks, cid);

        newTaskWindow(dom,tasklist,cid);

      });
    }

    var removeCard = function(cid,dom){
      var parent = undefined;
      if (dom.parentNode.classList.contains('card')) {
        parent = dom.parentNode;
      }
      console.log(cid);
      var cpost = {
        cid: cid
      };

      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var json = JSON.parse(xhr.responseText);
        var data = json.data;

        if(json.err == 0){
          if (!!parent) {

            parent.style[parent.transitionSelect()] = "all .3s";
            parent.style.opacity = 0;
            parent.style.width = "0px";

            setTimeout(function () {
              parent.removeFromParent();
            },300);
          }
        }else{
          parent.style.border = "1px solid red";
          console.log("error");
        }
      };
      xhr.open("POST", "/api/v1/cards/remove", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(cpost));

    };

    var createCard = function(){

      var cpost = {
        bid: bid,
        title: domObjects.cardnameInput.value
      };

      var card = document.createElement('td');
      card.setAttribute('class','card');
      domObjects.cardsRow.prependChild(card);

      var tasks = document.createElement('ul');
      tasks.setAttribute('class','tasks');
      card.appendChild(tasks);

      var div = document.createElement('div');
      div.setAttribute('class', 'cardHeader');
      tasks.appendChild(div);

      var a2 = document.createElement('a');
      a2.setAttribute('class', 'cardRemove');
      div.appendChild(a2);

      var icon2 = document.createElement('i');
      icon2.setAttribute('class', 'fa fa-trash');
      a2.appendChild(icon2);

      var a = document.createElement('a');
      a.setAttribute('class', 'newTask');
      div.appendChild(a);

      var icon = document.createElement('i');
      icon.setAttribute('class', 'fa fa-plus');
      a.appendChild(icon);

      var h4 = document.createElement('h4');
      div.appendChild(h4);

      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var json = JSON.parse(xhr.responseText);
        var data = json.data;

        if(json.err == 0){
          h4.innerHTML = data.title;

          domObjects.cardnameInput.style.opacity = "0";
          domObjects.cardnameInput.style.transform = "scaleX(0)";
          domObjects.cardnameInput.value = "";

          assignRemove(a2, data._id, data.title);
          assignNewTask(a, tasks, data._id);

          //setTimeout(function () {
          //
          //  var onCardCreated = that.getEvent("cardCreated");
          //  if (!!onCardCreated) onCardCreated(domObjects.cardnameInput);
          //
          //}, 10);



        }else{
          console.log("error");
        }
      };
      xhr.open("POST", "/api/v1/cards/create", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(cpost));
    };


    var getCards = function () {

      var cards = document.createElement('table');
      cards.setAttribute('class','cards');
      domObjects.cards = cards;
      domObjects.welcome.appendChild(cards);

      that.dom = cards;

      var tbody = document.createElement('tbody');
      cards.appendChild(tbody);

      var tr = document.createElement('tr');
      tbody.appendChild(tr);
      domObjects.cardsRow = tr;

      var cardNew = document.createElement('td');
      cardNew.setAttribute('class','card new');
      domObjects.newcard = cardNew;
      tr.appendChild(cardNew);

      var fa9 = document.createElement('i');
      fa9.setAttribute('class','fa fa-plus-square');
      cardNew.appendChild(fa9);

      var input = document.createElement("input");
      input.setAttribute('type', 'text');
      input.setAttribute('placeholder', 'Card Name');
      input.setAttribute('class', 'form-control');
      domObjects.cardnameInput = input;
      cardNew.appendChild(input);

      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var json = JSON.parse(xhr.responseText);
        var data = json.data;

        console.log(data);
        if(json.err == 0){

          if(data.length > 0){
            for (var i = 0; i < data.length; i++) {

              var card = document.createElement('td');
              card.setAttribute('class','card');
              tr.prependChild(card);

              var tasks = document.createElement('ul');
              tasks.setAttribute('class','tasks');
              card.appendChild(tasks);

              var div = document.createElement('div');
              div.setAttribute('class', 'cardHeader');
              tasks.appendChild(div);

              var a2 = document.createElement('a');
              a2.setAttribute('class', 'cardRemove');
              div.appendChild(a2);

              var icon2 = document.createElement('i');
              icon2.setAttribute('class', 'fa fa-trash');
              a2.appendChild(icon2);

              var a = document.createElement('a');
              a.setAttribute('class', 'newTask');
              div.appendChild(a);

              var icon = document.createElement('i');
              icon.setAttribute('class', 'fa fa-plus');
              a.appendChild(icon);

              var h4 = document.createElement('h4');
              h4.innerHTML = data[i].title;
              div.appendChild(h4);

              assignRemove(a2, data[i]._id, data[i].title);
              assignNewTask(a, tasks, data[i]._id);

            }
          }

          // Edit Button to Menu
          var nav1 = document.createElement('ul');
          nav1.setAttribute('class','nav navbar-nav');
          domObjects.collapse.appendChild(nav1);

          var li1 = document.createElement('li');
          nav1.appendChild(li1);

          var a1 = document.createElement('a');
          a1.setAttribute('href','#');
          li1.appendChild(a1);

          var fa2 = document.createElement('i');
          fa2.setAttribute('class','fa  fa-edit');
          a1.appendChild(fa2);
          fa2.innerHTML = " Edit Board";

          domObjects.editBoardButton = nav1;

        }else{
          console.log("no card");
        }

      };
      xhr.open("POST", "/api/v1/cards/list", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(bpost));

      domObjects.welcome.appendChild(cards);
    };


    var mouseWheelEvt = function (evt) {

      if(domObjects.cards.offsetWidth > document.body.offsetWidth ){

        var newLeft = domObjects.cards.offsetLeft;

        if (document.body.doScroll){
          document.body.doScroll(evt.wheelDelta > 0 ? "left" : "right");
        }else{

          if ( evt.wheelDelta  > 0) {
            newLeft += 80;

          }else{
            newLeft -= 80;

          }

          if(newLeft > 0){
            newLeft = 0
          }

          if( (document.body.offsetWidth - domObjects.cards.offsetWidth) > newLeft - 10) {

            newLeft = (document.body.offsetWidth - domObjects.cards.offsetWidth - 10);

          }

          domObjects.cards.style.left = newLeft + "px";

        }

      }
    };

    var addEvents = function () {
      //domObjects.newcard.addEventListener("click", createCard);
      domObjects.cardnameInput.addEventListener("keyup", function (evt) {
        var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
        if (keyCode == 13 && domObjects.cardnameInput.value != "") {
          createCard();
        }
      });

      domObjects.newcard.addEventListener("click", function () {

        if(domObjects.cardnameInput.style.opacity != "1"){

          domObjects.cardnameInput.style.opacity = "1";
          domObjects.cardnameInput.style.transform = "scaleX(1)";
          domObjects.cardnameInput.focus();
        }else{
          domObjects.cardnameInput.style.opacity = "0";
          domObjects.cardnameInput.style.transform = "scaleX(0)";
          domObjects.cardnameInput.value = "";
        }
      });

      // Mouse Wheel Horizontal
      document.body.addEventListener("mousewheel", function(event){
        mouseWheelEvt(event);
      });

    };

    var initCards = function () {

      generatePageTitle();
      getCards();
      addEvents();

      document.setCookie("area", "Cards");

    };

    initCards();
  };

  var generateBoards = function () {

    var createBoard = function(){
      var board = document.createElement('div');
      board.setAttribute('class','board');
      domObjects.boards.insertBefore(board, domObjects.boards.childNodes[0]);

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

    var getBoards = function () {
      var boards = document.createElement('div');
      boards.setAttribute('class','boards');
      domObjects.boards = boards;
      domObjects.welcome.appendChild(boards);

      that.dom = boards;

      var boardNew = document.createElement('div');
      boardNew.setAttribute('class','board new');
      boards.appendChild(boardNew);

      var fa9 = document.createElement('i');
      fa9.setAttribute('class','fa fa-plus-square centervrel');
      boardNew.appendChild(fa9);
      domObjects.newboard = boardNew;

      function assign(dom,id,title){
        dom.addEventListener("click", function () {
          that.destroy();

          generateCards(id, title);
        });
      }

      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var json = JSON.parse(xhr.responseText);
        var data = json.data;

        if(json.err == 0){

          if(data.length > 0){
            for (var i = 0; i < data.length; i++) {
              var item = data[i];

              var board = document.createElement('div');
              board.setAttribute('class','board');
              boards.insertBefore(board, boards.childNodes[0]);
              //domObjects.board[i] = board[i];

              var h3 = document.createElement('h3');
              h3.innerHTML = item.title;
              board.appendChild(h3);

              assign(board,item._id,item.title);

            }
          }

        }else{
          console.log("no board");
        }

      };
      xhr.open("POST", "/api/v1/boards/list", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send();

      domObjects.welcome.appendChild(boards);
    };

    var addEvents = function () {
      domObjects.newboard.addEventListener("click", createBoard);
    };

    var initBoards = function () {
      getBoards();
      addEvents();

      document.setCookie("area", "Boards");
    };

    initBoards();
  };

  var generatePageTitle = function(){
    // Page Title
    var pagetitle = document.createElement("div");
    pagetitle.setAttribute("class", "pagetitle fullwidth");

    var pageh4 = document.createElement("h4");
    pageh4.innerHTML = document.getCookie("btitle");
    pagetitle.appendChild(pageh4);
    domObjects.pageTitle = pagetitle;

    domObjects.welcome.appendChild(pagetitle);
  };

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
      a.setAttribute('href','#');
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
        generateBoards();
      }
      if( document.getCookie("area") == "Cards" ){
        generateCards(document.getCookie("bid") , document.getCookie("btitle"));
      }
    }else{
      generateBoards();
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