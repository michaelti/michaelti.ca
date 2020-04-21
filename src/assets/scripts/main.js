document.addEventListener("DOMContentLoaded", function() {

    // Apply medium zoom effect to images in portfolio content
    (function() {
        mediumZoom('.portfolio-content img', {
            margin: 0,
            background: 'var(--color-background)',
            scrollOffset: 0
        });
    })();

    // Typewriter effect for home page
    (function() {
        const element = document.getElementById('typewriter');
        if (!element) return;
        
        const text = element.firstElementChild.innerText;

        var spanOne = document.createElement('span');
        var spanTwo = document.createElement('span');

        spanOne.innerText = '';
        spanTwo.innerText = text;
        spanTwo.style.visibility = 'hidden';

        element.removeChild(element.firstElementChild);
        element.appendChild(spanOne);
        element.appendChild(spanTwo);


        var i = 0;
        var speed = 20;
        
        function typeWriter() {
            if (i <= text.length) {
                spanOne.innerText = text.slice(0, i);
                spanTwo.innerText = text.slice(i);
                setTimeout(typeWriter, speed);
                i++;
            } else if (i > text.length) {
                //Done, clean up
                element.removeChild(spanTwo);
            }
        }

        typeWriter();
    })();

});
