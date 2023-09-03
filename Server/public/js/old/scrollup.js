window.onload = function() {

    // Access the 'scroll-up' button
    var btn = document.getElementById('scroll-up');

    // Check the scroll position
    window.onscroll = function() {
        if (window.pageYOffset > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
        checkIfVisible();
    };

    // Scroll to the top of the page
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    var y, z, x;

    function checkIfVisible() {
        y = document.getElementById("footer").offsetTop;
        z = window.scrollY;
        x = window.innerHeight;

        if ((y - z - x) > 20) {
            removeClass(btn, "scrolled-d");
        } else {
            addClass(btn, "scrolled-d");
        }
    }

    function addClass(element, className) {
        element.classList.add(className);
    }

    function removeClass(element, className) {
        element.classList.remove(className);
    }

    window.onresize = function() {
        checkIfVisible();
    };

    // Initial check
    checkIfVisible();
};
