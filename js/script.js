window.addEventListener("DOMContentLoaded", function() {
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

    info.addEventListener('click', function(event) {
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
                t[key] = '0' + t[key];
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

});