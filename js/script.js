window.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // tabs:

    let info = document.querySelector('.info-header'),
        tab = document.querySelectorAll('.info-header-tab'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (event.target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // timer:

    let deadLine = '2025-02-21';

    function getTimeRemaining(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endTime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),

            timeInerval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endTime);
            for (let key in t) {
                if (t[key].toString().length == 1) {
                    t[key] = `0${t[key]}`;
                }
            }
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInerval);
            }
        }
    }

    setClock("timer", deadLine);

    // modal window

    let more = document.querySelector(".more"),
        overlay = document.querySelector(".overlay"),
        popup = document.querySelector(".popup-close");

    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    popup.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    // description modal window

    let descriptionBtn = document.getElementsByTagName('div'),
        infoBtn = document.querySelector('.info');

    infoBtn.addEventListener('click', function (event) {
        if (event.target && event.target.matches('div.description-btn')) {
            more.click();
        }
    });


    // form

    let massage = {
        loading: "Грузится...",
        success: "Спасибо! Мы с вами свяжемся!",
        feilure: "Ошибка!"
    };

    let form = document.querySelector('.main-form'),
        form2 = document.getElementById('form'),
        input = document.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');


    function sendForm(f) {
        f.addEventListener('submit', function (event) {
            event.preventDefault();
            f.appendChild(statusMessage);
            let formData = new FormData(f);

            let obj = {};
            formData.forEach(function (value, key) {
                obj[key] = value;
            });
            let json = JSON.stringify(obj);
    
            function postData(data) {

                return new Promise (function(resolve, reject) {
                    let request = new XMLHttpRequest();

                    request.open('POST', 'server.php');

                    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

                    request.addEventListener('readystatechange', function () {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4 ) {
                            if (request.status == 200 && request.status < 3) {
                                resolve();
                            } else {
                                reject();
                            }
                        }
                    });
                    request.send(data);
                });
            } //end postData

            // clear inputs
            function clearInputs() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }
            postData(json)
                            .then(() => statusMessage.innerHTML = massage.loading)
                            .then(() => statusMessage.innerHTML = massage.success)
                            .catch(() => statusMessage.innerHTML = massage.feilure)
                            .then(clearInputs());
        });
    }

    sendForm(form);
    sendForm(form2);
  
    //slider

    let sliderIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(sliderIndex);

    function showSlides(n) {
        if (n > slides.length) {
            sliderIndex = 1;
        }
        if (n < 1) {
            sliderIndex = slides.length;
        }
        
        slides.forEach((item) => item.style.display = 'none');
        dots .forEach((item) => item.classList.remove('dot-active'));

        slides[sliderIndex - 1].style.display = 'block';
        dots[sliderIndex - 1].classList.add('dot-active');
    }


    function plusSlides(n) {
        showSlides(sliderIndex += n);
    }

    function currentSlide(n) {
        showSlides(sliderIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });
    next.addEventListener('click', function() {
        plusSlides(1);

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });
});
});