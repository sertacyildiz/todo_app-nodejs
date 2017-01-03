function Tasks(tasklist, cid, taskId){
  console.log("tasks ok");
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

  var domObjects = {};

  var that = this;
  this.dom = "";

  var cpost = {
    cid: cid
  };

  var removeTask = function(task, tid){

    console.log(tid);
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
            //console.log("parent: " + task);
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
        removeTask(parent,tid);
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

  var updateTaskWindow = function (cid, tid, tstart, tend, tcontent, pStart, pEnd, pContent, taskBody) {

    var taskWindow = document.createElement('div');
    taskWindow.setAttribute('class', 'taskWindow');
    domObjects.taskUpdateWindow = taskWindow;
    document.getElementsByTagName('body')[0].prependChild(taskWindow);

    var taskWindowBack = document.createElement('div');
    taskWindowBack.setAttribute('class', 'taskWindowBack');
    domObjects.taskWindowBack = taskWindowBack;
    taskWindow.appendChild(taskWindowBack);

    var i = document.createElement('i');
    i.setAttribute('class', 'fa fa-times');
    taskWindowBack.appendChild(i);

    var taskContent = document.createElement('div');
    taskContent.setAttribute('class', 'taskContent center');
    taskWindow.appendChild(taskContent);

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
    textarea.value = tcontent;
    //textarea.value = nl2br(tcontent);
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
        domObjects.taskUpdateWindow.removeFromParent();
        updateTask(cid, tid, inputStartDate.value, inputEndDate.value, textarea.value, pStart, pEnd, pContent);
      }, 300);

    });

    button2.addEventListener('click', function () {

      taskWindow.style.opacity = "0";
      taskWindow.style.transform = "scaleX(0)";

      setTimeout(function () {
        taskWindow.removeFromParent();
        removeTask(taskBody, tid);
      }, 300);

    });

    taskWindowBack.addEventListener('click', function (){

      taskWindow.style.opacity = "0";
      taskWindow.style.transform = "scaleX(0)";

      setTimeout(function (){
        taskWindow.removeFromParent();
      }, 200);

    });

  };

  function assignUpdateTask(dom, cid, tid, tstart, tend, tcontent, pStart, pEnd, pContent, taskBody) {

    dom.addEventListener('click', function () {

      updateTaskWindow(cid, tid, tstart, tend, tcontent, pStart, pEnd, pContent, taskBody);
      //console.log(tstart);
      //console.log(tend);
    });

  }

  var createTask = function (tid, tstart, tend, tcontent) {

    var tpost = {
      cid: cid,
      tid: tid,
      startDate: tstart,
      endDate: tend,
      content: tcontent
    };

    console.log(cid);
    console.log(tid);
    console.log(tstart);
    console.log(tend);
    console.log(tcontent);

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var json = JSON.parse(xhr.responseText);
      var data = json.data;

      if(json.err == 0){

        console.log(json);

        var taskBody = document.createElement('li');
        taskBody.setAttribute('class','task');
        // DnD
        taskBody.setAttribute('data-draggable', 'item');
        taskBody.setAttribute('draggable', 'true');
        taskBody.setAttribute('aria-grabbed', 'false');
        taskBody.setAttribute('tabindex', '0');

        taskBody.setAttribute('data-cid', cid);
        taskBody.setAttribute('data-tid', tid);
        // DnD
        tasklist.appendChild(taskBody);

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
        taskBody.appendChild(pEnd);
        pEnd.innerHTML = "End: " + timeToDate(tend);
        var pEndHidden = document.createElement('input');
        pEndHidden.setAttribute('type', 'hidden');
        pEndHidden.value = tend;

        var dash = document.createElement('p');
        dash.setAttribute('class', 'date');
        dash.innerHTML = " - ";
        taskBody.appendChild(dash);

        var pStart = document.createElement('p');
        pStart.setAttribute('class', 'date');
        taskBody.appendChild(pStart);
        pStart.innerHTML = "Start: " + timeToDate(tstart);
        var pStartHidden = document.createElement('input');
        pStartHidden.setAttribute('type', 'hidden');
        pStartHidden.value = tstart;

        var pContent = document.createElement('p');
        taskBody.appendChild(pContent);
        pContent.innerHTML = nl2br(tcontent);

        assignUpdateTask(taskEdit, cid, tid, pStartHidden.value, pEndHidden.value, pContent.innerText, pStart, pEnd, pContent, taskBody);

        domObjects.taskCreateWindow.style.opacity = "0";
        domObjects.taskCreateWindow.style.transform = "scaleX(0)";
        setTimeout(function () {
          domObjects.taskCreateWindow.removeFromParent();
        }, 200);


      }else{
        console.log("error");
      }
    };
    xhr.open("POST", "/api/v1/tasks/update", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(tpost));
  };

  var newTaskWindow = function(){

    var taskWindow = document.createElement('div');
    taskWindow.setAttribute('class', 'taskWindow');
    domObjects.taskCreateWindow = taskWindow;
    document.getElementsByTagName('body')[0].prependChild(taskWindow);

    var taskWindowBack = document.createElement('div');
    taskWindowBack.setAttribute('class', 'taskWindowBack');
    domObjects.taskWindowBack = taskWindowBack;
    taskWindow.appendChild(taskWindowBack);

    var i = document.createElement('i');
    i.setAttribute('class', 'fa fa-times');
    taskWindowBack.appendChild(i);

    var taskContent = document.createElement('div');
    taskContent.setAttribute('class', 'taskContent center');
    taskWindow.appendChild(taskContent);

    var h3 = document.createElement('h3');
    h3.innerHTML = "Add New Task";
    taskContent.appendChild(h3);

    var inputStartDate = document.createElement('input');
    inputStartDate.setAttribute('type', 'date');
    inputStartDate.setAttribute('class', 'form-control');
    inputStartDate.setAttribute('placeholder', 'Start Date');
    taskContent.appendChild(inputStartDate);

    var inputEndDate = document.createElement('input');
    inputEndDate.setAttribute('type', 'date');
    inputEndDate.setAttribute('class', 'form-control');
    inputEndDate.setAttribute('placeholder', 'End Date');
    taskContent.appendChild(inputEndDate);

    var inputAddUser = document.createElement('input');
    inputAddUser.setAttribute('type', 'search');
    inputAddUser.setAttribute('class', 'form-control');
    inputAddUser.setAttribute('placeholder', 'Add User');
    taskContent.appendChild(inputAddUser);

    var textarea = document.createElement('textarea');
    textarea.setAttribute('class', 'form-control');
    textarea.setAttribute('placeholder', 'Task Content');
    domObjects.taskContent = textarea;
    taskContent.appendChild(textarea);

    var button = document.createElement('button');
    button.setAttribute('class','btn btn-success');
    button.innerHTML = " SAVE ";
    domObjects.taskSaveButton = button;
    taskContent.appendChild(button);

    var cancelButton = document.createElement('button');
    cancelButton.setAttribute('class','btn btn-danger');
    cancelButton.innerHTML = " CANCEL ";
    domObjects.taskCancelButton = cancelButton;
    taskContent.appendChild(cancelButton);

    setTimeout(function (){

      taskWindow.style.opacity = "1";
      taskWindow.style.transform = "scaleX(1)";
    }, 200);

    taskWindowBack.addEventListener('click', function (){

      taskWindow.style.opacity = "0";
      taskWindow.style.transform = "scaleX(0)";

      setTimeout(function (){
        taskWindow.removeFromParent();
      }, 200);

    });

    domObjects.taskCancelButton.addEventListener('click', function () {
      taskWindow.style.opacity = "0";
      taskWindow.style.transform = "scaleX(0)";

      setTimeout(function (){
        taskWindow.removeFromParent();
      }, 200);

    });

    domObjects.taskSaveButton.addEventListener('click', function () {
      console.log(inputStartDate.value);

      if(inputStartDate.value === undefined || inputStartDate.value == "" || inputStartDate.value > inputEndDate.value){
        inputStartDate.style.borderColor = "red";
      }else{
        inputStartDate.style.borderColor = "white";
      }

      if(inputEndDate.value === undefined || inputEndDate.value == "" || inputStartDate.value > inputEndDate.value){
        inputEndDate.style.borderColor = "red";

      }else{
        inputEndDate.style.borderColor = "white";
      }

      if(textarea.value == ""){
        textarea.style.borderColor = "red";
      }
      else{
        textarea.style.borderColor = "white";
      }

      if(inputStartDate.value !== undefined &&
        inputStartDate.value != ""  &&
        inputEndDate.value !== undefined &&
        inputEndDate.value != "" &&
        inputStartDate.value <= inputEndDate.value
        && textarea.value != ""
      )
      {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
          var json = JSON.parse(xhr.responseText);
          var data = json.data;

          if(json.err == 0){

            setTimeout( function(){

              createTask(data._id, inputStartDate.value, inputEndDate.value, textarea.value );
            }, 10)

          }else{
            console.log("error");
          }
        };
        xhr.open("POST", "/api/v1/tasks/create", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(cpost));
      }

    });



  };


  var initEvents = function () {


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

  var initTasks = function () {

    newTaskWindow();
    initEvents();

  };

  initTasks();


}