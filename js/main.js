
let imgArr = ['camp23.jpg', 'wedding.jpg', 'rafiki.jpg', 'tiger.png', 'ironman2.png', 'spiderman.png', 'dinosaur.png'];

let last_known_scroll_position = 0;
let ticking = false;


$(document).ready(function (event) {

    buildImages();

    setTimeout(function() {
        for (let i = 0; i < imgArr.length; i++) {
            dragElement(document.getElementById('moveBtn' + i), $('#secondImg' + i));
        }
    }, 500);

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    window.onscroll = function () {
        scrollBtn();
    }

});

function dragElement(item, img) {

    let pos1 = 0, pos2 = 0;

    let finalWidth = $(item).parent().parent().css('width');
    let finalHeight = $(item).parent().parent().css('height');
    let widthNum = finalWidth.replace('px', '') - 40;

    let dragItem = item;
    let container;
    if ($(window).width() > 765) {
        container = $(item).parent().parent().parent()[0];
    } else {
        container = item;
    }

    let active = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;

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
      
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
            pos1 = pos2 - e.touches[0].clientX;
            pos2 = e.touches[0].clientX;
            item.style.left = (item.offsetLeft - pos1) + "px";
            $(img).css('clip', "rect(0," + (item.offsetLeft - pos1 + 20) + 'px' + ',' + finalHeight + ", 0");
            if (item.offsetLeft - pos1 > widthNum) {
                item.style.left = widthNum + 'px';
                $(img).css('clip', "rect(0," + finalWidth + ',' + finalHeight + ", 0");
            }

            if (item.offsetLeft - pos1 < 0) {
                item.style.left = 0 + 'px';
                $(img).css('clip', "rect(0," + 0 + ',' + 0 + ", 0");
            }

        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            pos1 = pos2 - e.clientX;
            pos2 = e.clientX;
            item.style.left = (item.offsetLeft - pos1) + "px";
            $(img).css('clip', "rect(0," + (item.offsetLeft - pos1 + 20) + 'px' + ',' + finalHeight + ", 0");

            if (item.offsetLeft - pos1 < 0) {
                item.style.left = 0 + 'px';
                $(img).css('clip', "rect(0," + 0 + ',' + 0 + ", 0");
            }

            if (item.offsetLeft - pos1 > widthNum) {
                item.style.left = widthNum + 'px';
                $(img).css('clip', "rect(0," + finalWidth + ',' + finalHeight + ", 0");
            }
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
            class: 'wrapper wrapper' + i
        }).appendTo(container);

        let overlay = $('<div>', {
            class: 'overlay'
        }).appendTo(wrapper);

        let firstImg = $('<img>', {
            id: 'firstImg' + i,
            class: 'firstImg',
            src: './images/' + imgArr[i],
            alt: imgArr[i]
        }).appendTo(overlay);

        let secondImg = $('<img>', {
            id: 'secondImg' + i,
            class: 'secondImg',
            src: './images/' + imgArr[i],
            alt: imgArr[i]
        }).appendTo(overlay);

        let arrowButton = $('<img>', {
            id: 'moveBtn' + i,
            class: 'moveBtn',
            src: './images/arrows.png',
            alt: 'arrowBtn'
        }).appendTo(overlay); 
    }
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
