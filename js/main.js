$(document).ready(function(){

    $('.js-nav-toggle').on('click', function(e){

        $('.js-nav-main').slideToggle();

        e.preventDefault();

    });

});