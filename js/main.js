
let imgArr = ['./images/camp23.jpg', './images/wedding.jpg', './images/rafiki.jpg', './images/tiger.png', './images/ironman2.png', './images/spiderman.png', './images/dinosaur.png'];
let uploadImageCounter = 0;
let last_known_scroll_position = 0;
let ticking = false;
let trueImage = false;

$(document).ready(function (event) {

    $('.Xbtn').click(function () {
        $(this).parent().parent().fadeOut(150);
    })
   
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

    window.addEventListener('load', function() {

        document.querySelector('input[type="file"]').addEventListener('change', function() {
            if (this.files && this.files[0] && trueImage) {
                if (uploadImageCounter > 0) {
                    imgArr.splice(-1,1);
                }
                let img = document.querySelector('img');

                img.src = URL.createObjectURL(this.files[0]);
                imgArr.push(img.src);
                $('.container').remove();
                buildImages();
                $('.container:last-child').insertBefore($('.container')[0]);

                $($('.container')[0]).hide();


                setTimeout(function() {
                    let width = img.width;
                    let height = img.height;

                    $($('.container')[0]).show();

                    if(img.width > $(window).width()) {
                        if (img.height > img.width) {
                            height = $(window).width() * 0.9;
                            width = $(window).width() * 0.5;
                        } else {
                            width = $(window).width() * 0.85;
                            height = $(window).width() * 0.5;
                        }
                    }

                    $('.wrapper7').css({'width': width + 'px', 'height': height + 'px'});
                    $('#firstImg7').css({'width': width + 'px', 'height': height + 'px'});
                    $('#secondImg7').css({'width': width + 'px', 'height': height + 'px', 'clip': 'rect(0, ' + (width - (width/2)) + 'px' + ', ' + height + 'px' + ', 0)'});

                    $('#firstImg7').attr('alt', 'selected img');
                    $('#secondImg7').attr('alt', 'selected img');

                    for (let i = 0; i < imgArr.length; i++) {

                        dragElement(document.getElementById('moveBtn' + i), $('#secondImg' + i));
                    }
                    $('body').css('pointer-events', 'all');
                }, 500);

                uploadImageCounter++;
            } else {
                $('.wrapper7').parent().remove();
                setTimeout(function() {
                    $('#notImagePop').show();
                    removePopup($('#notImagePop'));
                }, 200)
            } 
        });
      });

    $('#input').on("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode > 47 && event.keyCode < 58 || event.keyCode > 95 && event.keyCode < 106 || event.keyCode == 8) {
            let val = $('#input').val();
            if (val > 99) {
                $('#input').val(100);
            }
    
            if (val < 0) {
                $('#input').val(0);
            }
    
            $.each($('.firstImg'), function (key, value) {
                $('#firstImg' + key).css('filter', 'grayscale(' + val + ')');
                $('#firstImg' + key).css('-webkit-filter', 'grayscale(' + val + '%)');
            });
        } else {
            $('#input').val('');
        }
    });
});

function validateAndUpload(input) {
    $('body').css('pointer-events', 'none');
    var URL = window.URL || window.webkitURL;
    var file = input.files[0];

    if (file) {
        if(file.type.includes('image')) {
            trueImage = true;
        } else {
            trueImage = false;
        }

        var image = new Image();
        image.src = URL.createObjectURL(file);
    }
}

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
            src: imgArr[i],
            alt: imgArr[i]
        }).appendTo(overlay);

        let secondImg = $('<img>', {
            id: 'secondImg' + i,
            class: 'secondImg',
            src: imgArr[i],
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

function removePopup(container) {

    $(document).mouseup(function (e) {
        if (container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
            e.stopPropagation();
            $(document).off('mouseup');
        }
    })
}
