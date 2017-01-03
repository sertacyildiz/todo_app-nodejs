function Drag() {

  var domObjects = {};

  function dateInputFormat(date){
    // dd/mm/yyyy => yyyy-mm-dd
    return date.split("/").reverse().join("-");
  }

  function updateTaskOrder(item){
    //var itemOrder = [].indexOf.call(item.parentNode.children, item);
    //console.log(itemOrder);

    console.log(item.parentNode.children.length);
    for(var i = 0; i < item.parentNode.children.length; i++){
      var current = item.parentNode.children[i];
      var currentOrder = [].indexOf.call(current.parentNode.children, current);

      if(current.nodeName == "LI"){
        //console.log(item.parentNode.children[i]);
        var tpost = {
          cid: current.dataset.cid,
          tid: current.dataset.tid,
          order: i + 1
        };

        current.dataset.order = currentOrder;

        var xhr = new XMLHttpRequest();
        //xhr.onload = function () {
        //  var json = JSON.parse(xhr.responseText);
        //
        //  if(json.err == 0){
        //    console.log("ordered");
        //    //console.log(json.tid);
        //  }else{
        //    console.log("error");
        //  }
        //};
        xhr.open("POST", "/api/v1/tasks/orderupdate", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(tpost));
      }

    }

  }

  function sortable(rootEl, onUpdate){
    var dragEl;

    [].slice.call(rootEl.children).forEach(function (itemEl){
      itemEl.draggable = true;
    });

    function _onDragOver(evt){
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'move';

      var target = evt.target;
      //console.log(target, target.nextSibling);
      //console.log(target.nextSibling || target);
      if( target && target !== dragEl && target.nodeName == 'LI' && dragEl.nodeName == 'LI' ){

        if(rootEl.lastChild === target) {

          rootEl.insertBefore(dragEl, target.nextSibling );

        }
        else{

          rootEl.insertBefore(dragEl, target);

        }

      }
    }

    function _onDragEnd(evt){
      evt.preventDefault();

      dragEl.classList.remove('ghost');
      rootEl.removeEventListener('dragover', _onDragOver, false);
      rootEl.removeEventListener('dragend', _onDragEnd, false);

      onUpdate(dragEl);
    }

    rootEl.addEventListener('dragstart', function (evt){
      dragEl = evt.target;

      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('Text', dragEl.textContent);

      rootEl.addEventListener('dragover', _onDragOver, false);
      rootEl.addEventListener('dragend', _onDragEnd, false);

      setTimeout(function (){
        dragEl.classList.add('ghost');
      }, 0)
    }, false);
  }

  var assignDragEnd = function (droptarget, dragitem) {

    function updateTaskOnDragEnd(cid, tid, tstart, tend, tcontent){

      function removeOld(taskId){
        var tpost = {
          tid: taskId
        };

        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
          var json = JSON.parse(xhr.responseText);

          if(json.err == 0){

            console.log("removed");

          }else{
            console.log("error");
          }
        };
        xhr.open("POST", "/api/v1/tasks/remove", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(tpost));
      }

      function updateNew(newTaskId){

        var tpost = {
          cid: cid,
          tid: newTaskId,
          startDate: tstart,
          endDate: tend,
          content: tcontent

        };

        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
          var json = JSON.parse(xhr.responseText);
          var data = json.data;

          if(json.err == 0){

            //console.log("updated");

          }else{
            console.log("error");
          }
        };
        xhr.open("POST", "/api/v1/tasks/update", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(tpost));
      }

      function createNew(){

        //item.classList.add('ghost');

        var cpost = {
          cid: cid
        };

        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
          var json = JSON.parse(xhr.responseText);
          var data = json.data;

          if(json.err == 0){

            dragitem.dataset.tid = data._id;
            dragitem.dataset.cid = cid;
            dragitem.classList.remove('ghost');

            updateTaskOrder(dragitem);

            updateNew(data._id);
            console.log("created");

            removeOld(tid);

          }else{
            console.log("error");
          }
        };
        xhr.open("POST", "/api/v1/tasks/create", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(cpost));

      }

      createNew();

    }


    //compare cardId -> if different move task to card
    var targetCardId = droptarget.dataset.cardid;
    var itemCardId = dragitem.dataset.cid;
    var itemTaskId = dragitem.dataset.tid;

    var tend = dateInputFormat(dragitem.getElementsByTagName('p')[0].innerHTML.replace('End: ', ''));
    var tstart = dateInputFormat(dragitem.getElementsByTagName('p')[2].innerHTML.replace('Start: ', ''));
    var tcontent = dragitem.getElementsByTagName('p')[3].innerText;

    console.log(tend);

    if(targetCardId == itemCardId){
      console.log("equal");
    }else{

      updateTaskOnDragEnd(targetCardId, itemTaskId, tstart, tend, tcontent)

    }
    ///

  };

  this.makeTarget = function () {

  };

  var initDragTask = function () {


    //exclude older browsers by the features we need them to support
    //and legacy opera explicitly so we don't waste time on a dead browser
    if
    (
      !document.querySelectorAll
      ||
      !('draggable' in document.createElement('span'))
      ||
      window.opera
    )
    { return; }

    var targets = document.querySelectorAll('[data-draggable="target"]');

    //get the collection of draggable targets and add their draggable attribute
    for (var

           len_t = targets.length,
           t = 0; t < len_t; t++) {
      targets[t].setAttribute('aria-dropeffect', 'none');

      sortable( targets[t],function (item){

        updateTaskOrder(item);
      });


    }

    //get the collection of draggable items and add their draggable attributes
    for (var
           items = document.querySelectorAll('[data-draggable="item"]'),
           len_i = items.length,
           i = 0; i < len_i; i++) {
      //console.log(items[i]);
      items[i].setAttribute('draggable', 'true');
      items[i].setAttribute('aria-grabbed', 'false');
      items[i].setAttribute('tabindex', '0');
    }


    //dictionary for storing the selections data
    //comprising an array of the currently selected items
    //a reference to the selected items' owning container
    //and a refernce to the current drop target container
    var selections =
    {
      items: [],
      owner: null,
      droptarget: null
    };

    //function for selecting an item
    function addSelection(item) {
      //if the owner reference is still null, set it to this item's parent
      //so that further selection is only allowed within the same container
      if (!selections.owner) {
        selections.owner = item.parentNode;
      }

      //or if that's already happened then compare it with this item's parent
      //and if they're not the same container, return to prevent selection
      else if (selections.owner != item.parentNode) {
        return;
      }

      //set this item's grabbed state
      item.setAttribute('aria-grabbed', 'true');

      //add it to the items array
      selections.items.push(item);
    }

    //function for unselecting an item
    function removeSelection(item) {
      //reset this item's grabbed state
      item.setAttribute('aria-grabbed', 'false');

      //then find and remove this item from the existing items array
      for (var len = selections.items.length, i = 0; i < len; i++) {
        if (selections.items[i] == item) {
          selections.items.splice(i, 1);
          break;
        }
      }
    }

    //function for resetting all selections
    function clearSelections() {
      //if we have any selected items
      if (selections.items.length) {
        //reset the owner reference
        selections.owner = null;

        //reset the grabbed state on every selected item
        for (var len = selections.items.length, i = 0; i < len; i++) {
          selections.items[i].setAttribute('aria-grabbed', 'false');
        }

        //then reset the items array
        selections.items = [];
      }
    }

    //shorctut function for testing whether a selection modifier is pressed
    function hasModifier(e) {
      return (e.ctrlKey || e.metaKey || e.shiftKey);
    }


    //function for applying dropeffect to the target containers
    function addDropeffects() {
      //apply aria-dropeffect and tabindex to all targets apart from the owner
      for (var len_t = targets.length, t = 0; t < len_t; t++) {
        if
        (
          targets[t] != selections.owner
          &&
          targets[t].getAttribute('aria-dropeffect') == 'none'
        ) {
          targets[t].setAttribute('aria-dropeffect', 'move');
          targets[t].setAttribute('tabindex', '0');
        }
      }

      //remove aria-grabbed and tabindex from all items inside those containers
      for (var len_i = items.length, i = 0; i < len_i; i++) {
        if
        (
          items[i].parentNode != selections.owner
          &&
          items[i].getAttribute('aria-grabbed')
        ) {
          items[i].removeAttribute('aria-grabbed');
          items[i].removeAttribute('tabindex');
        }
      }
    }

    //function for removing dropeffect from the target containers
    function clearDropeffects() {
      //if we have any selected items
      if (selections.items.length) {
        //reset aria-dropeffect and remove tabindex from all targets
        for (var len_t = targets.length, t = 0; t < len_t; t++) {
          if (targets[t].getAttribute('aria-dropeffect') != 'none') {
            targets[t].setAttribute('aria-dropeffect', 'none');
            targets[t].removeAttribute('tabindex');
          }
        }

        //restore aria-grabbed and tabindex to all selectable items
        //without changing the grabbed value of any existing selected items
        for (var len_i = items.length, i = 0; i < len_i; i++) {
          if (!items[i].getAttribute('aria-grabbed')) {
            items[i].setAttribute('aria-grabbed', 'false');
            items[i].setAttribute('tabindex', '0');
          }
          else if (items[i].getAttribute('aria-grabbed') == 'true') {
            items[i].setAttribute('tabindex', '0');
          }
        }
      }
    }

    //shortcut function for identifying an event element's target container
    function getContainer(element) {
      do
      {
        if (element.nodeType == 1 && element.getAttribute('aria-dropeffect')) {
          return element;
        }
      }
      while (element = element.parentNode);

      return null;
    }


    //mousedown event to implement single selection
    document.addEventListener('mousedown', function (e) {

      //if the element is a draggable item
      if (e.target.getAttribute('draggable')) {
        //clear dropeffect from the target containers
        clearDropeffects();

        //if the multiple selection modifier is not pressed
        //and the item's grabbed state is currently false
        if
        (
          !hasModifier(e)
          &&
          e.target.getAttribute('aria-grabbed') == 'false'
        ) {
          //clear all existing selections
          clearSelections();

          //then add this new selection
          addSelection(e.target);
        }
      }

      //else [if the element is anything else]
      //and the selection modifier is not pressed
      else if (!hasModifier(e)) {
        //clear dropeffect from the target containers
        clearDropeffects();

        //clear all existing selections
        clearSelections();
      }

      //else [if the element is anything else and the modifier is pressed]
      else {
        //clear dropeffect from the target containers
        clearDropeffects();
      }

    }, false);

    //mouseup event to implement multiple selection
    document.addEventListener('mouseup', function (e) {
      //if the element is a draggable item
      //and the multipler selection modifier is pressed
      if (e.target.getAttribute('draggable') && hasModifier(e)) {
        //if the item's grabbed state is currently true
        if (e.target.getAttribute('aria-grabbed') == 'true') {
          //unselect this item
          removeSelection(e.target);

          //if that was the only selected item
          //then reset the owner container reference
          if (!selections.items.length) {
            selections.owner = null;
          }
        }

        //else [if the item's grabbed state is false]
        else {
          //add this additional selection
          addSelection(e.target);
        }
      }

    }, false);

    //dragstart event to initiate mouse dragging
    document.addEventListener('dragstart', function (e) {

      //if the element's parent is not the owner, then block this event
      if (selections.owner != e.target.parentNode) {
        e.preventDefault();
        return;
      }

      //[else] if the multiple selection modifier is pressed
      //and the item's grabbed state is currently false
      if
      (
        hasModifier(e)
        &&
        e.target.getAttribute('aria-grabbed') == 'false'
      ) {
        //add this additional selection
        addSelection(e.target);
      }

      //we don't need the transfer data, but we have to define something
      //otherwise the drop action won't work at all in firefox
      //most browsers support the proper mime-type syntax, eg. "text/plain"
      //but we have to use this incorrect syntax for the benefit of IE10+
      e.dataTransfer.setData('text', '');

      //apply dropeffect to the target containers
      addDropeffects();

    }, false);


    //related variable is needed to maintain a reference to the
    //dragleave's relatedTarget, since it doesn't have e.relatedTarget
    var related = null;

    //dragenter event to set that variable
    document.addEventListener('dragenter', function (e) {
      related = e.target;

    }, false);

    //dragleave event to maintain target highlighting using that variable
    document.addEventListener('dragleave', function (e) {
      //get a drop target reference from the relatedTarget
      var droptarget = getContainer(related);

      //if the target is the owner then it's not a valid drop target
      if (droptarget == selections.owner) {
        droptarget = null;
      }

      //if the drop target is different from the last stored reference
      //(or we have one of those references but not the other one)
      if (droptarget != selections.droptarget) {
        //if we have a saved reference, clear its existing dragover class
        if (selections.droptarget) {
          selections.droptarget.className =
            selections.droptarget.className.replace(/ dragover/g, '');
        }

        //apply the dragover class to the new drop target reference
        if (droptarget) {
          droptarget.className += ' dragover';
        }

        //then save that reference for next time
        selections.droptarget = droptarget;
      }

    }, false);

    //dragover event to allow the drag by preventing its default
    document.addEventListener('dragover', function (e) {
      //if we have any selected items, allow them to be dragged
      if (selections.items.length) {
        e.preventDefault();
      }

    }, false);

    //dragend event to implement items being validly dropped into targets,
    //or invalidly dropped elsewhere, and to clean-up the interface either way
    document.addEventListener('dragend', function (e) {


      //if we have a valid drop target reference
      //(which implies that we have some selected items)
      if (selections.droptarget) {
        //append the selected items to the end of the target container
        for (var len = selections.items.length, i = 0; i < len; i++) {
          selections.droptarget.appendChild(selections.items[i]);

          selections.items[i].classList.add('ghost');
          assignDragEnd(selections.droptarget, selections.items[i]);
        }

        //prevent default to allow the action
        e.preventDefault();
      }

      //if we have any selected items
      if (selections.items.length) {
        //clear dropeffect from the target containers
        clearDropeffects();

        //if we have a valid drop target reference
        if (selections.droptarget) {

          //reset the selections array
          clearSelections();

          //reset the target's dragover class
          selections.droptarget.className =
            selections.droptarget.className.replace(/ dragover/g, '');

          //reset the target reference
          selections.droptarget = null;

        }

      }

    }, false);

  };


  initDragTask();
  //initDragCard();

}
