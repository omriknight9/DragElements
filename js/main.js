
let imgArr = ['camp23.jpg', 'wedding.jpg', 'rafiki.jpg', 'tiger.png', 'ironman2.png', 'spiderman.png', 'dinosaur.png'];

$(document).ready(function (event) {

    buildImages();

    setTimeout(function() {
        if ($(window).width() < 765) {
            // test(document.getElementById("moveBtn0"), $('#secondImg0'));
            dragElement(document.getElementById("moveBtn0"), $('#secondImg0'));
            test(document.getElementById("moveBtn1"), $('#secondImg1'));
            // dragElement(document.getElementById("moveBtn1"), $('#secondImg1'));
            // dragElement(document.getElementById("moveBtn2"), $('#secondImg2'));
            // dragElement(document.getElementById("moveBtn3"), $('#secondImg3'));
            // dragElement(document.getElementById("moveBtn4"), $('#secondImg4'));
            // dragElement(document.getElementById("moveBtn5"), $('#secondImg5'));
            // dragElement(document.getElementById("moveBtn6"), $('#secondImg6'));
        } else {
            dragElementMobile(document.getElementById("moveBtn0"), $('#secondImg0'));
            dragElementMobile(document.getElementById("moveBtn1"), $('#secondImg1'));
            dragElementMobile(document.getElementById("moveBtn2"), $('#secondImg2'));
            dragElementMobile(document.getElementById("moveBtn3"), $('#secondImg3'));
            dragElementMobile(document.getElementById("moveBtn4"), $('#secondImg4'));
            dragElementMobile(document.getElementById("moveBtn5"), $('#secondImg5'));
            dragElementMobile(document.getElementById("moveBtn6"), $('#secondImg6'));
        }

    }, 500)

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    window.onscroll = function () {
        scrollBtn();
    }
});


function test(item, img) {

    let pos1 = 0, pos2 = 0;

    let finalWidth = $(item).parent().parent().css('width');
    let finalHeight = $(item).parent().parent().css('height');
    let widthNum = finalWidth.replace('px', '') - 40;

    var dragItem = item;
    // var container = document.querySelector("#container");

    var container = $(item).parent().parent().parent()[0];
    console.log(container);
    console.log(img);
    var active = false;
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;

    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);

    container.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mousemove", drag, false);

    function dragStart(e) {
        e = e || window.event;
        e.preventDefault();
      if (e.type === "touchstart") {
        pos2 = e.touches[0].clientX;
      } else {
        pos2 = e.clientX;
      }

      if (e.target === dragItem) {
        active = true;
      }
    }

    function dragEnd(e) {
        console.log('------------------------------------');
      initialX = currentX;
      initialY = currentY;

      $(item).css('cursor', 'grab');

      active = false;
    }

    function drag(e) {
      if (active) {
        $(item).css('cursor', 'grabbing');
        e = e || window.event;
        e.preventDefault();
        // pos1 = pos2 - e.clientX;
        // pos2 = e.clientX;
      
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
            pos1 = pos2 - e.touches[0].clientX;
            pos2 = e.touches[0].clientX;
            item.style.left = (item.offsetLeft - pos1) + "px";
            console.log('asd');
            $(img).css('clip', "rect(0," + (item.offsetLeft - pos1 + 20) + 'px' + ',' + finalHeight + ", 0");
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            pos1 = pos2 - e.clientX;
            pos2 = e.clientX;
            console.log(pos1);
            console.log('item.offsetLeft: ' + item.offsetLeft);
            console.log(item.offsetLeft - pos1);
            item.style.left = (item.offsetLeft - pos1) + "px";
            $(img).css('clip', "rect(0," + (item.offsetLeft - pos1 + 20) + 'px' + ',' + finalHeight + ", 0");
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, dragItem);
      }
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + 0 + "px, 0)";
    }

}
    




















function buildImages() {
    
    for (let i = 0; i < imgArr.length; i++) {
        let container = $('<div>', {
            class: 'container'
        }).appendTo('main');

        let wrapper = $('<div>', {
            class: 'wrapper' + i
        }).appendTo(container);

        let overlay = $('<div>', {
            class: 'overlay'
        }).appendTo(wrapper);

        let firstImg = $('<img>', {
            id: 'firstImg' + i,
            src: './images/' + imgArr[i],
            alt: imgArr[i]
        }).appendTo(overlay);

        let secondImg = $('<img>', {
            id: 'secondImg' + i,
            src: './images/' + imgArr[i],
            alt: imgArr[i]
        }).appendTo(overlay);

        let arrowButton = $('<img>', {
            id: 'moveBtn' + i,
            src: './images/arrows.png',
            alt: 'arrowBtn'
        }).appendTo(overlay); 
    }
}

function dragElementMobile(elmnt, img) {
    let pos1 = 0, pos2 = 0

    let container = $(elmnt).parent().parent().parent()[0];
    console.log(container);

    // elmnt.addEventListener("touchstart", dragMouseDown, false);
    // elmnt.addEventListener("touchend", closeDragElement, false);
    // elmnt.addEventListener("touchmove", elementDrag, false);

    elmnt.addEventListener("touchstart", dragMouseDown, false);
    // elmnt.addEventListener("mousedown", dragMouseDown, false);


    let finalWidth = $(elmnt).parent().parent().css('width');
    let finalHeight = $(elmnt).parent().parent().css('height');
    let widthNum = finalWidth.replace('px', '') - 40;

    // elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      
        e = e || window.event;
        e.preventDefault();
        pos2 = e.clientX;

        container.addEventListener("touchend", closeDragElement, false);
        container.addEventListener("touchmove", elementDrag, false);
        
        // document.addEventListener("mouseup", closeDragElement, false);
        // document.addEventListener("mousemove", elementDrag, false);

        // document.onmouseup = closeDragElement;
        // document.onmousemove = elementDrag;

    }
  
    function elementDrag(e) {
        $(elmnt).css('cursor', 'grabbing');
        e = e || window.event;
        e.preventDefault();
        pos1 = pos2 - e.clientX;
        pos2 = e.clientX;
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        $(img).css('clip', "rect(0," + (elmnt.offsetLeft - pos1 + 20) + 'px' + ',' + finalHeight + ", 0");
        if (elmnt.offsetLeft - pos1 < 0) {
            elmnt.style.left = 0 + 'px';
            $(img).css('clip', "rect(0," + 0 + ',' + 0 + ", 0");
        }

      if (elmnt.offsetLeft - pos1 > widthNum) {
        elmnt.style.left = widthNum + 'px';
        $(img).css('clip', "rect(0," + finalWidth + ',' + finalHeight + ", 0");
      }
    }
  
    function closeDragElement() {
        console.log('zxcxzc');
        $(elmnt).css('cursor', 'grab');
        // document.onmouseup = null;
        // document.onmousemove = null;
        // document.removeEventListener("mouseup", closeDragElement, false);
        // document.removeEventListener("mousemove", elementDrag, false);

        container.removeEventListener("touchend", closeDragElement);
        container.removeEventListener("touchmove", elementDrag);

    }
}
    
function dragElement(elmnt, img) {
    let pos1 = 0, pos2 = 0

    let finalWidth = $(elmnt).parent().parent().css('width');
    let finalHeight = $(elmnt).parent().parent().css('height');
    let widthNum = finalWidth.replace('px', '') - 40;

    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos2 = e.clientX;
        
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;

    }
  
    function elementDrag(e) {
        $(elmnt).css('cursor', 'grabbing');
        e = e || window.event;
        e.preventDefault();
        pos1 = pos2 - e.clientX;
        pos2 = e.clientX;

        console.log(pos1);
        console.log('elmnt.offsetLeft: ' + elmnt.offsetLeft);
        console.log(elmnt.offsetLeft - pos1);
        
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        $(img).css('clip', "rect(0," + (elmnt.offsetLeft - pos1 + 20) + 'px' + ',' + finalHeight + ", 0");
        if (elmnt.offsetLeft - pos1 < 0) {
            elmnt.style.left = 0 + 'px';
            $(img).css('clip', "rect(0," + 0 + ',' + 0 + ", 0");
        }

      if (elmnt.offsetLeft - pos1 > widthNum) {
        elmnt.style.left = widthNum + 'px';
        $(img).css('clip', "rect(0," + finalWidth + ',' + finalHeight + ", 0");
      }
    }
  
    function closeDragElement() {
        $(elmnt).css('cursor', 'grab');
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function simulateMouseEvent (event, simulatedType) {

    // Ignore multi-touch events
    if (event.originalEvent.touches.length > 1) {
      return;
    }

    event.preventDefault();

    var touch = event.originalEvent.changedTouches[0],
        simulatedEvent = document.createEvent('MouseEvents');
    
    // Initialize the simulated mouse event using the touch event's coordinates
    simulatedEvent.initMouseEvent(
      simulatedType,    // type
      true,             // bubbles                    
      true,             // cancelable                 
      window,           // view                       
      1,                // detail                     
      touch.screenX,    // screenX                    
      touch.screenY,    // screenY                    
      touch.clientX,    // clientX                    
      touch.clientY,    // clientY                    
      false,            // ctrlKey                    
      false,            // altKey                     
      false,            // shiftKey                   
      false,            // metaKey                    
      0,                // button                     
      null              // relatedTarget              
    );

    // Dispatch the simulated event to the target element
    event.target.dispatchEvent(simulatedEvent);
  }

function goToTop() {
    $('html,body').animate({ scrollTop: 0 }, 'slow');
}

function scrollBtn() {

    if ($(this).scrollTop() > 550) {
        $('.goToTopBtn').fadeIn();
    }
    else {
        $('.goToTopBtn').fadeOut();
    }
}
