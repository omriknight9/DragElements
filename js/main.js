
let imgArr = ['camp23.jpg', 'wedding.jpg', 'rafiki.jpg', 'tiger.png', 'ironman2.png', 'spiderman.png', 'dinosaur.png'];

let last_known_scroll_position = 0;
let ticking = false;


$(document).ready(function (event) {

    buildImages();
    test();


    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    window.onscroll = function () {
        console.log('asd');
        $('#test').html($(window).scrollTop());
        scrollBtn();
    }

    window.onclick = function () {
        console.log('asd');
        $('#test').html('asd' + $(window).scrollTop());
    }

    // window.addEventListener('scroll', function(e) {
    //     last_known_scroll_position = window.scrollY;
      
    //     if (!ticking) {
    //         $('#test').html('zxc' + $(window).scrollTop());
    //     //   window.requestAnimationFrame(function() {
    //     //     doSomething(last_known_scroll_position);
            
    //     //     ticking = false;
    //     //   });
      
    //     //   ticking = true;
    //     }
    //   });

});

function test() {
    setTimeout(function() {
        dragElement(document.getElementById("moveBtn0"), $('#secondImg0'));
        dragElement(document.getElementById("moveBtn1"), $('#secondImg1'));
        dragElement(document.getElementById("moveBtn2"), $('#secondImg2'));
        dragElement(document.getElementById("moveBtn3"), $('#secondImg3'));
        dragElement(document.getElementById("moveBtn4"), $('#secondImg4'));
        dragElement(document.getElementById("moveBtn5"), $('#secondImg5'));
        dragElement(document.getElementById("moveBtn6"), $('#secondImg6'));
    }, 500)
}


function dragElement(item, img) {

    let pos1 = 0, pos2 = 0;

    let finalWidth = $(item).parent().parent().css('width');
    let finalHeight = $(item).parent().parent().css('height');
    let widthNum = finalWidth.replace('px', '') - 40;

    var dragItem = item;
    // var container = document.querySelector("#container");

    // var container = $(item).parent().parent().parent()[0];
    // var container = item;
    if ($(window).width() > 765) {
        var container = $(item).parent().parent().parent()[0];
    } else {
        var container = item;
    }
    
    console.log(container);

    var active = false;
    var currentX;
    var currentY;
    var initialX;
    var initialY;

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
