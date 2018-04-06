var imgSrc = require('./demo.png')
require('./demo.css')

window.onload = function() {
    var el = document.querySelector('#btn'),
        img = document.querySelector('#img'),
        count = 0;

    var handler = function(e) {
        console.log(`hello [name] for ${++count} times`);
    }
    el.addEventListener('click', handler, false)

    img.src = imgSrc
}