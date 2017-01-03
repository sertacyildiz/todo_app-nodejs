function Cards(welcome, bid, btitle){

  var tasks;

  var events = {};

  this.addEventListener = function (eventName, eventFunction) {
    events[eventName] = eventFunction;
  };

  this.getEvent = function (eventName) {
    return events.hasOwnProperty(eventName) ? events[eventName] : undefined;
  };

  function nl2br (str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
  }

  function timeToDate (time) {
    var date = new Date(time);
    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!
    var yyyy = date.getFullYear();

    var day = dd < 10 ? "0" + dd : dd;
    var month = mm < 10 ? "0" + mm : mm;

    return day + "/" + month + "/" + yyyy;
  }

  // sort on key values
  function keysort(key,desc) {
    return function(a,b){
      return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
    }
  }

  var domObjects = {};

  var dnd;

  var that = this;
  this.dom = "";

  var bpost = {};

  if(bid){
    bpost = {
      bid: bid
    };

    document.setCookie("bid", bid);
  }else{
    bpost = {
      bid: document.getCookie('bid')
    };

  }


  //document.setCookie("bid", bid);
  //document.setCookie("btitle", btitle);

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

  var removeTask = function(task, tid){

    //console.log(tid);
    var tpost = {
      tid: tid
    };

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var json = JSON.parse(xhr.responseText);
      var data = json.data;

      if(json.err == 0){
        if (!!task) {

          task.style[task.transitionSelect()] = "all .3s";
          task.style.opacity = 0;
          task.style.width = "0px";

          setTimeout(function () {
            task.removeFromParent();
          },300);
        }
      }else{
        task.style.border = "1px solid red";
        console.log("error");
      }
    };
    xhr.open("POST", "/api/v1/tasks/remove", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(tpost));

  };

  function assignRemoveTask(parent,dom,tid){
    dom.addEventListener('click', function() {

      if( confirm( "Silmek istediğinize emin misiniz?") ){
        removeTask(parent,dom,tid);
      }
    });
  }

  var updateTask = function (cid, tid, tstart, tend, tcontent, pStart, pEnd, pContent) {

    var tpost = {
      cid: cid,
      tid: tid,
      startDate: tstart,
      endDate: tend,
      content: tcontent
    };

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var json = JSON.parse(xhr.responseText);
      var data = json.data;

      if(json.err == 0){

        pStart.innerHTML = "Start: " + timeToDate(tstart);
        pEnd.innerHTML = "End: " + timeToDate(tend);
        pContent.innerHTML = nl2br(tcontent);

      }else{
        console.log("error");
      }
    };
    xhr.open("POST", "/api/v1/tasks/update", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(tpost));
  };

  var updateTaskWindow = function ( cid, tid, tstart, tend, tcontent, pStart, pEnd, pContent, taskBody ) {

    var taskUpdateWindow = document.createElement('div');
    taskUpdateWindow.setAttribute('class', 'taskWindow');
    domObjects.taskUpdateWindow = taskUpdateWindow;
    document.getElementsByTagName('body')[0].prependChild(taskUpdateWindow);

    var taskWindowBack = document.createElement('div');
    taskWindowBack.setAttribute('class', 'taskWindowBack');
    domObjects.taskWindowBack = taskWindowBack;
    taskUpdateWindow.appendChild(taskWindowBack);

    var i = document.createElement('i');
    i.setAttribute('class', 'fa fa-times');
    taskWindowBack.appendChild(i);

    var taskContent = document.createElement('div');
    taskContent.setAttribute('class', 'taskContent center');
    taskUpdateWindow.appendChild(taskContent);

    var h3 = document.createElement('h3');
    h3.innerHTML = "Add New Task";
    taskContent.appendChild(h3);

    var inputStartDate = document.createElement('input');
    inputStartDate.setAttribute('type', 'date');
    inputStartDate.setAttribute('class', 'form-control');
    inputStartDate.setAttribute('placeholder', 'Start Date');
    inputStartDate.value = tstart;
    taskContent.appendChild(inputStartDate);

    var inputEndDate = document.createElement('input');
    inputEndDate.setAttribute('type', 'date');
    inputEndDate.setAttribute('class', 'form-control');
    inputEndDate.setAttribute('placeholder', 'End Date');
    inputEndDate.value = tend;
    taskContent.appendChild(inputEndDate);

    var inputAddUser = document.createElement('input');
    inputAddUser.setAttribute('type', 'search');
    inputAddUser.setAttribute('class', 'form-control');
    inputAddUser.setAttribute('placeholder', 'Add User');
    taskContent.appendChild(inputAddUser);

    var textarea = document.createElement('textarea');
    textarea.setAttribute('class', 'form-control');
    textarea.setAttribute('placeholder', 'Task Content');
    textarea.value = pContent.innerText;
    // NOTE: innerHTML for p , innerText for textarea
    domObjects.taskContent = textarea;
    taskContent.appendChild(textarea);

    var button = document.createElement('button');
    button.setAttribute('class','btn btn-success');
    button.innerHTML = " UPDATE ";
    domObjects.taskUpdateButton = button;
    taskContent.appendChild(button);

    var button2 = document.createElement('button');
    button2.setAttribute('class','btn btn-danger');
    button2.innerHTML = " REMOVE ";
    domObjects.taskRemoveButton = button2;
    taskContent.appendChild(button2);

    setTimeout(function (){

      domObjects.taskUpdateWindow.style.opacity = "1";
      domObjects.taskUpdateWindow.style.transform = "scaleX(1)";

    }, 200);


    button.addEventListener('click', function () {
      domObjects.taskUpdateWindow.style.opacity = "0";
      domObjects.taskUpdateWindow.style.transform = "scaleX(0)";

      setTimeout(function () {
        domObjects.taskUpdateWindow.parentNode.removeChild( domObjects.taskUpdateWindow );
        updateTask(cid, tid, inputStartDate.value, inputEndDate.value, textarea.value,  pStart, pEnd, pContent);
      }, 400);

    });

    button2.addEventListener('click', function () {

      domObjects.taskUpdateWindow.style.opacity = "0";
      domObjects.taskUpdateWindow.style.transform = "scaleX(0)";

      setTimeout(function () {
        domObjects.taskUpdateWindow.parentNode.removeChild( domObjects.taskUpdateWindow );
        removeTask(taskBody, tid);
      }, 400);

    });

    taskWindowBack.addEventListener('click', function (){
      if(domObjects.taskUpdateWindow != undefined){
        domObjects.taskUpdateWindow.style.opacity = "0";
        domObjects.taskUpdateWindow.style.transform = "scaleX(0)";

        setTimeout(function () {
          domObjects.taskUpdateWindow.parentNode.removeChild( domObjects.taskUpdateWindow );
        }, 400);
      }
    });

  };

  function assignUpdateTask(dom, cid, tid, tstart, tend, tcontent, pStart, pEnd, pContent, taskBody) {

    dom.addEventListener('click', function () {

      updateTaskWindow(cid, tid, tstart, tend, tcontent, pStart, pEnd, pContent, taskBody);

    });

  }

  function assignNewTask(dom,tasklist,cid){
    dom.addEventListener('click', function() {
      //console.log("new task : " + cid );
      //generateTasks(tasks, cid);

      tasks = new Tasks(tasklist,cid,true);

    });
  }

  function assignDndTask(target,item){


  }

  var removeCard = function(parent,dom,cid){
    //var parent = undefined;
    //if (dom.parentNode.classList.contains('card')) {
    //  parent = dom.parentNode;
    //}
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

  function assignRemoveCard(parent,dom,cid,ctitle){
    dom.addEventListener('click', function() {

      if( confirm( "Silmek istediğinize emin misiniz?") ){
        if( confirm( "Bu işlem geri alınamaz! Devam edilsin mi?") ){
          removeCard(parent,dom,cid);
        }
      }
    });
  }

  var updateCard = function (cid,ctitle) {

    var cpost = {
      bid: bid,
      cid: cid,
      title: ctitle,
      order: 1,
      isActive: true
    };

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var json = JSON.parse(xhr.responseText);
      var data = json.data;

      if(json.err == 0){

      }else{
        console.log("error");
      }
    };
    xhr.open("POST", "/api/v1/cards/update", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(cpost));
  };

  function assignUpdateCard(dom,cid,h4,parent){

    function updateFunction(){

      dom.removeEventListener("click", updateFunction);
      dom.style.color = "red";
      dom.style.textShadow = "0px 0px 1px rgba(0,0,0,.4)";

      var text = h4.innerText;
      h4.style.display = "none";

      var input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('class', 'textEditInput');
      input.setAttribute('value', text);
      parent.appendChild(input);

      var strLength= input.value.length;
      setTimeout(function () {
        input.focus();
        input.setSelectionRange(strLength, strLength);
      }, 100);


      input.addEventListener("keyup", function (evt) {
        var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
        if (keyCode == 13 && input.value != "") {

          dom.setAttribute('style', '');

          input.style.display = "none";
          input.removeFromParent();

          h4.style.display = "block";
          h4.innerText = input.value;

          updateCard(cid, input.value, h4);
          dom.addEventListener("click", updateFunction);

        }
      });

      dom.addEventListener("click", function () {

        input.style.display = "none";
        input.removeFromParent();

        h4.style.display = "block";

        dom.setAttribute('style', '');
        dom.addEventListener("click", updateFunction);

      });
    }

    dom.addEventListener("click", updateFunction);

  }

  var createCard = function(){

    var order = (domObjects.cardsContainer.getElementsByClassName("card").length);
    var cpost = {
      bid: bid,
      order: order,
      title: domObjects.cardnameInput.value
    };

    console.log(order);

    var cards = document.getElementsByClassName('cards');

    var card = document.createElement('td');
    card.setAttribute('class','card');

    domObjects.cardsContainer.insertBefore(card, domObjects.cardsContainer.lastChild );
    //domObjects.cardsContainer.prependChild(card);

    var tasks = document.createElement('ol');
    // DnD
    tasks.setAttribute('data-draggable', 'target');
    tasks.setAttribute('aria-dropeffect', 'none');
    tasks.setAttribute('tabindex', '0');
    //tasks.setAttribute('data-order', item.order);
    // DnD
    tasks.setAttribute('class','tasks');
    card.appendChild(tasks);

    var cardHeader = document.createElement('div');
    cardHeader.setAttribute('class', 'cardHeader');
    cardHeader.setAttribute('draggable', 'false');
    tasks.appendChild(cardHeader);

    var a2 = document.createElement('a');
    a2.setAttribute('class', 'cardRemove');
    cardHeader.appendChild(a2);

    var icon2 = document.createElement('i');
    icon2.setAttribute('class', 'fa fa-trash');
    a2.appendChild(icon2);

    var a = document.createElement('a');
    a.setAttribute('class', 'newTask fright');
    a.setAttribute('title', 'New Task');
    cardHeader.appendChild(a);

    var icon = document.createElement('i');
    icon.setAttribute('class', 'fa fa-plus');
    a.appendChild(icon);

    var a3 = document.createElement('a');
    a3.setAttribute('class', 'cardEdit');
    cardHeader.appendChild(a3);

    var icon3 = document.createElement('i');
    icon3.setAttribute('class', 'fa fa-edit');
    a3.appendChild(icon3);

    var a4 = document.createElement('a');
    a4.setAttribute('class', 'cardMove');
    cardHeader.appendChild(a4);

    var icon4 = document.createElement('i');
    icon4.setAttribute('class', 'fa fa-move');
    a4.appendChild(icon4);

    var h4 = document.createElement('h4');
    cardHeader.appendChild(h4);

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var json = JSON.parse(xhr.responseText);
      var data = json.data;

      if(json.err == 0){
        h4.innerHTML = data.title;

        domObjects.cardnameInput.style.opacity = "0";
        domObjects.cardnameInput.style.transform = "scaleX(0)";
        domObjects.cardnameInput.value = "";

        tasks.setAttribute('data-cardid', data._id);

        assignUpdateCard(a3,data._id,h4,cardHeader);
        assignRemoveCard(card, a2, data._id, data.title);
        assignNewTask(a, tasks, data._id);


      }else{
        console.log("error");
      }
    };
    xhr.open("POST", "/api/v1/cards/create", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(cpost));
  };


  var generateCards = function () {

    var cards = document.createElement('table');
    cards.setAttribute('class','cards');
    domObjects.cards = cards;
    welcome.appendChild(cards);

    that.dom = cards;

    var tbody = document.createElement('tbody');
    cards.appendChild(tbody);

    var cardsContainer = document.createElement('tr');
    cardsContainer.setAttribute('id', 'cardsContainer');
    tbody.appendChild(cardsContainer);
    domObjects.cardsContainer = cardsContainer;

    var cardNew = document.createElement('td');
    cardNew.setAttribute('class','card new');
    domObjects.newcard = cardNew;
    cardsContainer.appendChild(cardNew);

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

      //console.log(data);
      if(json.err == 0){

        if(data.length > 0){

          for (var i = 0; i < data.length; i++) {
            var item = data[i];

            var card = document.createElement('td');
            card.setAttribute('class','card');
            cardsContainer.prependChild(card);

            var tasks = document.createElement('ol');
            // DnD
            tasks.setAttribute('data-draggable', 'target');
            tasks.setAttribute('data-cardid', item._id);
            //tasks.setAttribute('data-order', item.order);
            // DnD
            tasks.setAttribute('class','tasks');
            card.appendChild(tasks);

            var cardHeader = document.createElement('div');
            cardHeader.setAttribute('class', 'cardHeader');
            cardHeader.setAttribute('draggable', 'false');
            tasks.appendChild(cardHeader);

            var a2 = document.createElement('a');
            a2.setAttribute('class', 'cardRemove');
            cardHeader.appendChild(a2);

            var icon2 = document.createElement('i');
            icon2.setAttribute('class', 'fa fa-trash centerhrel');
            a2.appendChild(icon2);

            var a = document.createElement('a');
            a.setAttribute('class', 'newTask fright');
            a.setAttribute('title', 'New Task');
            cardHeader.appendChild(a);

            var icon = document.createElement('i');
            icon.setAttribute('class', 'fa fa-plus centerhrel');
            a.appendChild(icon);

            var a3 = document.createElement('a');
            a3.setAttribute('class', 'cardEdit');
            cardHeader.appendChild(a3);

            var icon3 = document.createElement('i');
            icon3.setAttribute('class', 'fa fa-edit centerhrel');
            a3.appendChild(icon3);

            var h4 = document.createElement('h4');
            h4.innerHTML = item.title;
            cardHeader.appendChild(h4);

            assignUpdateCard(a3,item._id,h4,cardHeader);
            assignRemoveCard(card, a2, item._id, item.title);

            assignNewTask(a, tasks, item._id);

            var allTasks = item.tasks.sort( keysort('order'), true );

            if(allTasks.length > 0){
              for(var ii = 0; ii < allTasks.length; ii++){

                var cardId = item._id;
                var taskOrder = allTasks[ii].order;
                var taskId = allTasks[ii]._id;
                var taskStartDate = allTasks[ii].startDate;
                var taskEndDate = allTasks[ii].endDate;
                var taskContent = allTasks[ii].content;

                var taskBody = document.createElement('li');
                taskBody.setAttribute('class','task');
                // DnD
                taskBody.setAttribute('data-draggable', 'item');
                taskBody.setAttribute('data-cid', cardId);
                taskBody.setAttribute('data-tid', taskId);
                taskBody.setAttribute('data-order', taskOrder);
                ///
                tasks.appendChild(taskBody);

                var head = document.createElement('div');
                head.setAttribute('class', 'taskHead');
                taskBody.appendChild(head);

                var taskEdit = document.createElement('a');
                head.appendChild(taskEdit);

                var x = document.createElement('i');
                x.setAttribute('class', 'fa fa-edit');
                taskEdit.appendChild(x);

                var pEnd = document.createElement('p');
                pEnd.setAttribute('class', 'date');
                pEnd.innerHTML = "End: " + timeToDate(taskEndDate);

                var dash = document.createElement('p');
                dash.setAttribute('class', 'date');
                dash.innerHTML = " - ";

                var pStart = document.createElement('p');
                pStart.setAttribute('class', 'date');
                pStart.innerHTML = "Start: " + timeToDate(taskStartDate);

                //if(taskStartDate !== undefined && taskEndDate !== undefined && taskStartDate <= taskEndDate){

                  taskBody.appendChild(pEnd);
                  taskBody.appendChild(dash);
                  taskBody.appendChild(pStart);
                //}

                var pContent = document.createElement('p');
                taskBody.appendChild(pContent);
                pContent.innerHTML = nl2br(taskContent);

                assignUpdateTask(taskEdit, cardId, taskId, taskStartDate, taskEndDate, taskContent, pStart, pEnd, pContent, taskBody);

              }
            }

          }
        }

        // Edit Button to Menu
        //var currentNavBar = document.getElementById('navbar');
        //
        //var nav1 = document.createElement('ul');
        //nav1.setAttribute('class','nav navbar-nav');
        //currentNavBar.appendChild(nav1);
        //
        //var li1 = document.createElement('li');
        //nav1.appendChild(li1);
        //
        //var a1 = document.createElement('a');
        //li1.appendChild(a1);
        //
        //var fa2 = document.createElement('i');
        //fa2.setAttribute('class','fa  fa-edit');
        //a1.appendChild(fa2);
        //fa2.innerHTML = document.getCookie('btitle');

        // when cards generated
        dnd = new Drag();
        //dnd.makeSortable(item);
      }else{
        console.log("no card");
      }

    };
    xhr.open("POST", "/api/v1/cards/list", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(bpost));

    welcome.appendChild(cards);
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

  var initEvents = function () {
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
    //document.body.addEventListener("mousewheel", function(event){
    //  mouseWheelEvt(event);
    //});

  };


  var generatePageTitle = function(){
    //console.log("title ok");
    //// Page Title
    //var pagetitle = document.createElement("div");
    //pagetitle.setAttribute("class", "pagetitle fullwidth");
    //
    //var pageh4 = document.createElement("h4");
    //pageh4.innerHTML = document.getCookie("btitle");
    //pagetitle.appendChild(pageh4);
    //domObjects.pageTitle = pagetitle;
    //
    //welcome.appendChild(pagetitle);

    // Edit Button to Menu

  };

  var initCards = function () {


    generateCards();
    initEvents();

    document.setCookie("area", "Cards");
    //generatePageTitle();

  };

  initCards();


}