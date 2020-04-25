/* The following code is from W3 Schools and Stack Overflow, with some slight modifications by me
   https://www.w3schools.com/howto/howto_js_draggable.asp */

   var PADDING = 0;

   var rect;
   var viewport = {
     bottom: 0,
     left: 0,
     right: 0,
     top: 0
   }
   
   //Make the DIV element draggagle:
   dragElement(document.getElementById("draggable_window"));
   
   function dragElement(elmnt) {
     var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
     if (document.getElementById(elmnt.id + "header")) {
       /* if present, the header is where you move the DIV from:*/
       document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
     } else {
       /* otherwise, move the DIV from anywhere inside the DIV:*/
       elmnt.onmousedown = dragMouseDown;
     }
   
     function dragMouseDown(e) {
      if(e.preventDefault) e.preventDefault();
       bringElementToFront(elmnt);
       e = e || window.event;
       // get the mouse cursor position at startup:
       pos3 = e.clientX;
       pos4 = e.clientY;
       
       // store the current viewport and element dimensions when a drag starts
       rect = elmnt.getBoundingClientRect();
       viewport.bottom = window.innerHeight - PADDING;
       viewport.left = PADDING;
       viewport.right = window.innerWidth - PADDING;
       viewport.top = PADDING;
       
       document.onmouseup = closeDragElement;
       // call a function whenever the cursor moves:
       document.onmousemove = elementDrag;
     }
   
     function elementDrag(e) {
       e = e || window.event;
       // calculate the new cursor position:
       pos1 = pos3 - e.clientX;
       pos2 = pos4 - e.clientY;
       pos3 = e.clientX;
       pos4 = e.clientY;
       
       // check to make sure the element will be within our viewport boundary
       var newLeft = elmnt.offsetLeft - pos1;
       var newTop = elmnt.offsetTop - pos2;
   
       if (newLeft - 216 < viewport.left
           || newTop < viewport.top
           || newLeft + (rect.width / 2) > viewport.right
           || newTop + (rect.height / 2) > viewport.bottom
       ) {
         // the element will hit the boundary, do nothing...
       } else {
         // set the element's new position:
         elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
         elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        //  elmnt.style.left = 100 * (elmnt.offsetLeft - pos1) / initialScreenSize + "%";

       }
     }
   
     function closeDragElement() {
       /* stop moving when mouse button is released:*/
      //  var rectAbout = document.getElementById("about").getBoundingClientRect();
      //  var rectCamagatchi = document.getElementById("camagatchi").getBoundingClientRect();
      //  diff = rectCamagatchi.left - rectAbout.right;
      //  var rect = elmnt.getBoundingClientRect();
      //  var percentage = 100 * rect.right / initialScreenSize;
      //  elmnt.style.right = percentage + "%";

       document.onmouseup = null;
       document.onmousemove = null;
     }
   }