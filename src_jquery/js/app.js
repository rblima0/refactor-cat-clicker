(function () {

    // MENU TOGGLE
    $('.menu-toggle').click(function() {
        $('ul').toggleClass('opening');
        $(this).toggleClass('open');
    });

    // CONTADOR
    var catLike = function(that) {
        $(that).find('img').on('click', function() {
            var elemento = $(that).find('.contador').text();
            var contador = Number(elemento);
            $(that).find('.contador').text(++contador);
        });
    };

    $('.card').each(function() {
        catLike(this);
    });

})();
