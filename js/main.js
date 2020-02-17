
let imgArr = ['camp23.jpg', 'wedding.jpg', 'rafiki.jpg', 'tiger.png', 'ironman2.png', 'spiderman.png', 'dinosaur.png'];

$(document).ready(function (event) {

    buildImages();

    setTimeout(function(){
        dragElement(document.getElementById("moveBtn0"), $('#secondImg0'));
        dragElement(document.getElementById("moveBtn1"), $('#secondImg1'));
        dragElement(document.getElementById("moveBtn2"), $('#secondImg2'));
        dragElement(document.getElementById("moveBtn3"), $('#secondImg3'));
        dragElement(document.getElementById("moveBtn4"), $('#secondImg4'));
        dragElement(document.getElementById("moveBtn5"), $('#secondImg5'));
        dragElement(document.getElementById("moveBtn6"), $('#secondImg6'));
    }, 500)

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    window.onscroll = function () {
        scrollBtn();
    }
});

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
        // document.onmouseup = closeDragElement;
        // document.onmousemove = elementDrag;

        document.touchend = closeDragElement;
        document.touchmove = elementDrag;
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
        $(elmnt).css('cursor', 'grab');
        // document.onmouseup = null;
        // document.onmousemove = null;

        document.touchend = null;
        document.touchmove = null;
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
