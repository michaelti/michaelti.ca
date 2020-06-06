// Display unsupported browser message to Internet Explorer users

(function() {
    var isIE = /MSIE|Trident/.test(window.navigator.userAgent);

    if (isIE) {
        browserPrompt = document.createElement('aside');

        browserPrompt.innerText = 'This website does not support Internet Explorer. ';
        browserPrompt.innerText += 'Please view using a modern web browser such as Edge, Firefox, or Chrome.';

        browserPrompt.style.backgroundColor = '#fff3cd';
        browserPrompt.style.textAlign = 'center';
        browserPrompt.style.padding = '1em';

        document.body.insertBefore(browserPrompt, document.body.firstChild);
    }
})();
