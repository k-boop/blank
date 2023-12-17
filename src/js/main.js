import 'virtual:svg-icons-register';

import '../scss/styles.scss';

import jQuery from 'jquery';

window.$ = jQuery;

$(function () {

    $(".block4__services__content__accordion__btn").on("click", function (e) {
        var $this = $(this).closest(".block4__services__accordion");
        var $content = $this.find(".block4__services__content__accordion__content");

        if ($this.hasClass("--active")) {
            $content.slideUp(400);
        } else {
            $content.slideDown(400);
        }
        $this.toggleClass("--active");
    });

    $(".block11__cases__content__accordion__btn").on("click", function (e) {
        var $this = $(this).closest(".block11__cases__accordion");
        var $content = $this.find(".block11__cases__content__accordion__content");

        if ($this.hasClass("--active")) {
            $content.slideUp(400);
        } else {
            $content.slideDown(400);
        }
        $this.toggleClass("--active");
    });

    $("a[href^='#']").on("click", function(e) {
        e.preventDefault();
        $("html").animate({
          scrollTop: $($(this).attr("href")).offset().top
        }, 1000);
      });

});