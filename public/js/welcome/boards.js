function Boards(welcome){

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

  var removeBoard = function (bid, board) {
    console.log("remove");
    var bpost = {
      bid: bid
    };

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var json = JSON.parse(xhr.responseText);
      var data = json.data;

      if(json.err == 0){

        board.style.opacity = "0";
        board.style.width = "0";
        board.style.height = "0";

        setTimeout(function () {
          board.removeFromParent();
        }, 410);

      }else{
        console.log("error");
      }
    };
    xhr.open("POST", "/api/v1/boards/remove", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(bpost));
  };

  var updateBoard = function (bid,btitle,h3) {

    var bpost = {
      bid: bid,
      title: btitle,
      order: 1
    };

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var json = JSON.parse(xhr.responseText);
      var data = json.data;

      if(json.err == 0){

        h3.innerText = btitle;

        setTimeout(function () {
          h3.style.display = "block";
        }, 100);

      }else{
        console.log("error");
      }
    };
    xhr.open("POST", "/api/v1/boards/update", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(bpost));
  };

  function assignUpdate(dom,bid,h3,parent,board){

    function updateFunction(){

      dom.style.color = "green";
      dom.style.opacity = "1";
      dom.removeEventListener("click", updateFunction);

      var text = h3.innerText;

      h3.style.display = "none";

      var input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('class', 'textEditInput');
      input.setAttribute('value', text);
      var strLength= input.value.length;

      var div = document.createElement('div');
      div.setAttribute('class', 'boardEdit remove');

      var removeButton = document.createElement('a');
      div.appendChild(removeButton);

      var trash = document.createElement('i');
      trash.setAttribute('class', 'fa fa-trash');
      removeButton.appendChild(trash);

      setTimeout(function () {
        parent.appendChild(input);
        parent.appendChild(div);
        input.focus();
        input.setSelectionRange(strLength, strLength);
      }, 100);

      removeButton.addEventListener('click', function () {
        if( confirm( "Silmek istediğinize emin misiniz?") ){
          if( confirm( "Bu işlem geri alınamaz! Devam edilsin mi?") ){
            removeBoard(bid, board);
          }
        }
      });

      input.addEventListener("keyup", function (evt) {
        var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
        if (keyCode == 13 && input.value != "") {

          dom.style.color = "white";
          dom.setAttribute('style', '');
          dom.addEventListener("click", updateFunction);

          input.style.display = "none";
          input.parentNode.removeChild( input );

          removeButton.setAttribute('style', '');
          removeButton.parentNode.removeChild( removeButton );

          updateBoard(bid, input.value, h3);

        }
      });

      dom.addEventListener("click", function () {

        if( dom.style.color = "green"){

          dom.setAttribute('style', '');
          dom.addEventListener("click", updateFunction);

          removeButton.removeFromParent();
          input.removeFromParent();

          setTimeout(function () {
            h3.setAttribute('style', '');
          }, 100);

        }

      });

      //input.addEventListener("blur",  function(){
      //  input.style.display = "none";
      //  input.parentNode.removeChild( input );
      //
      //  setTimeout(function () {
      //    h4.style.display = "block";
      //  }, 100);
      //}, true);
    }

    dom.addEventListener("click", updateFunction);

  }

  function assign(dom,id,title){
    dom.addEventListener("click", function () {
      that.destroy();

      cards = new Cards(welcome, id, title);
      document.setCookie('btitle', title);
    });
  }

  var createBoard = function(){

    var bpost = {
      title: domObjects.boardnameInput.value
    };

    var board = document.createElement('div');
    board.setAttribute('class','board');
    domObjects.boards.insertBefore(board, domObjects.boards.childNodes[0]);

    var edit = document.createElement('div');
    edit.setAttribute('class', 'boardEdit');
    board.appendChild(edit);

    var editButton = document.createElement('a');
    edit.appendChild(editButton);

    var ico  = document.createElement('i');
    ico.setAttribute('class', 'fa fa-edit');
    editButton.appendChild(ico);

    var boardTitle = document.createElement('div');
    boardTitle.setAttribute('class', 'boardTitle');
    board.appendChild(boardTitle);

    var h3 = document.createElement('h3');
    boardTitle.appendChild(h3);

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var json = JSON.parse(xhr.responseText);
      var data = json.data;

      if(json.err == 0){
        h3.innerHTML = data.title;

        assign(h3,data._id,data.title);

        assignUpdate(editButton,data._id,h3,boardTitle,board);

      }else{
        console.log("error");
      }
    };
    xhr.open("POST", "/api/v1/boards/create", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(bpost));
  };

  var generateBoards = function () {
    var boards = document.createElement('div');
    boards.setAttribute('class','boards');
    domObjects.boards = boards;
    welcome.appendChild(boards);

    that.dom = boards;

    var boardNew = document.createElement('div');
    boardNew.setAttribute('class','board new');
    domObjects.boardNew =  boardNew;
    boards.appendChild(boardNew);

    var newBoardButton = document.createElement('a');
    newBoardButton.setAttribute('class', 'centervrel');
    boardNew.appendChild(newBoardButton);
    domObjects.newboard = newBoardButton;

    var fa9 = document.createElement('i');
    fa9.setAttribute('class','fa fa-plus-square');
    newBoardButton.appendChild(fa9);
    domObjects.newIcon = fa9;

    var input = document.createElement("input");
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Board Name');
    input.setAttribute('class', 'form-control');
    domObjects.boardnameInput = input;

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

            var edit = document.createElement('div');
            edit.setAttribute('class', 'boardEdit');
            board.appendChild(edit);

            var editButton = document.createElement('a');
            edit.appendChild(editButton);

            var ico  = document.createElement('i');
            ico.setAttribute('class', 'fa fa-edit');
            editButton.appendChild(ico);

            var boardTitle = document.createElement('div');
            boardTitle.setAttribute('class', 'boardTitle');
            board.appendChild(boardTitle);

            var h3 = document.createElement('h3');
            h3.innerHTML = item.title;
            boardTitle.appendChild(h3);

            assign(h3,item._id,item.title);

            assignUpdate(editButton,item._id,h3,boardTitle,board);
          }
        }

      }else{
        console.log("no board");
      }

    };
    xhr.open("POST", "/api/v1/boards/list", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();

    welcome.appendChild(boards);
  };

  var initEvents = function () {
    //domObjects.newboard.addEventListener("click", createBoard);

    domObjects.boardnameInput.addEventListener("keyup", function (evt) {
      var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
      if (keyCode == 13 && domObjects.boardnameInput.value != "") {
        createBoard();
      }
    });

    domObjects.newboard.addEventListener("click", function () {

      if(domObjects.boardnameInput.style.opacity != "1"){

        domObjects.boardNew.appendChild(domObjects.boardnameInput);
        domObjects.newIcon.setAttribute('class','fa fa-minus-square');

        setTimeout(function () {
          domObjects.newboard.style.top = "20%";
          domObjects.boardnameInput.style.opacity = "1";
          domObjects.boardnameInput.style.transform = "scaleX(1)";
          domObjects.boardnameInput.focus();
        }, 10);
      }else{
        domObjects.newboard.removeAttribute('style');
        domObjects.boardnameInput.removeAttribute('style');
        domObjects.boardnameInput.value = "";

        setTimeout(function () {
          domObjects.boardnameInput.removeFromParent();
          domObjects.newIcon.setAttribute('class','fa fa-plus-square');
        }, 300);
      }
    });
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

  var initBoards = function () {
    generateBoards();
    initEvents();

    document.setCookie("area", "Boards");
  };

  initBoards();

}