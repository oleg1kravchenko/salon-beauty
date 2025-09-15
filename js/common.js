$(document).ready(function () {

	//плавный скролл
	var headerHeight = $('.header').outerHeight();
	var topHead = $('.top-head').outerHeight();

	{
		if ($(window).width() < 1200) {
			$(".nav-page_scroll a").mPageScroll2id({
				offset: headerHeight + topHead + 20
			});

		} else {
			$(".nav-page_scroll a").mPageScroll2id();
		}
	}

	//tabs

  $('.nav-page_tabs a').click(function(event) {
    event.preventDefault();
    $(this).parent().parent().find("li").removeClass('active');
    $(this).parent().addClass('active');
    $(".tab-pane-services").fadeOut(0);
    var selectTab = $(this).attr("href");
    $(selectTab).fadeIn(200);
  });


	//кнопка sandwich
	$(".btn-menu").click(function () {
		if ($(".menu-mobile").is(":hidden")) {
			$(".menu-mobile").slideDown(200);
			$(".btn-menu__text").html("Закрыть");
			$(".sandwich").addClass("active");
			$(".header").addClass("header_menu");
			$("body").addClass("no-scroll");
		} else {
			$(".menu-mobile").slideUp(200);
			$(".btn-menu__text").html("Меню");
			$(".sandwich").removeClass("active");
			$(".header").removeClass("header_menu");
			$("body").removeClass("no-scroll");
		}
	});

	//show text about
	$(".btn-base_about").click(function (e) {
		e.preventDefault();
		if ($(".about__hidden").is(":hidden")) {
			$(".about__hidden").slideDown(200);
			$(this).html("Свернуть");
		} else {
			$(".about__hidden").slideUp(200);
			$(this).html("Читать полностью");
		}
	});

	//open widget contact
	$(".widget-contact__icon, .widget-contact__btn, .open-contact").click(function (e) {
		e.preventDefault();
		if ($(".popup-contact").is(":hidden")) {
			$(".popup-contact").fadeIn(200);
			$(".widget-contact").addClass("active");
			$(".popup-contact").addClass("active");
			$("body").addClass("no-scroll");
		} else {
			$(".popup-contact").fadeOut(200);
			$(".widget-contact").removeClass("active");
			$(".popup-contact").removeClass("active");
			$("body").removeClass("no-scroll");
		}
	});

	$(".popup-contact__overlay").click(function (e) {
		$(".popup-contact").fadeOut(200);
		$(".widget-contact").removeClass("active");
		$(".popup-contact").removeClass("active");
		$("body").removeClass("no-scroll");
	});

	//menu mobile list	
	$(".navigation__haschild > a").click(function (e) {
		e.preventDefault();
		$(this).parent().siblings().find("ul").slideUp(200);
		$(this).parent().siblings().removeClass("active");
		if ($(this).siblings("ul").is(":hidden")) {
			$(this).parent().addClass("active");
			$(this).siblings("ul").slideDown(200);

		} else {
			$(this).parent().removeClass("active");
			$(this).siblings("ul").slideUp(200);
		}
	});

	//amount textarea
	$('.item-form textarea').each(function () {
		updateCharCount($(this));
	});

	$('.item-form textarea').on('input', function () {
		updateCharCount($(this));
	});

	function updateCharCount($textarea) {
		const maxLength = $textarea.attr('maxlength');
		const currentLength = $textarea.val().length;
		const $amountDiv = $textarea.siblings('.item-form__amount');

		if (maxLength) {
			$amountDiv.text(`${currentLength}/${maxLength}`);
		} else {
			$amountDiv.text(`${currentLength} символов`);
		}
	}


	//validation
	$('form button').on('click', function (e) {
		const form = $(this).closest('form');
		var modalHeight = $(this).parents(".modal__wrap").outerHeight();
		let isValid = true;

		form.find('.item-form').each(function () {
			const itemForm = $(this);
			const input = itemForm.find('input[required], textarea[required], select[required]');
			const value = $.trim(input.val());

			itemForm.find('.item-form__alert').remove();

			if (input.length && value === '') {
				itemForm.addClass('item-form_error');
				itemForm.append('<div class="item-form__alert">Заполните поле.</div>');
				isValid = false;
			} else {
				itemForm.removeClass('item-form_error');
			}
		});

		if (!isValid) {


		} else {
			e.preventDefault();

			$(".content-result-modal").height(modalHeight);

			//result popup review
			if ($(this).closest('#modal-add-review').length) {
				$(this).addClass("loading");
				setTimeout(() => {
					$.fancybox.close();
					$.fancybox.open({
						src: '#modal-loading',
						type: 'inline',
					});
					$(this).removeClass("loading");
					setTimeout(() => {
						$.fancybox.close();
						$.fancybox.open({
							src: '#modal-success-review',
							type: 'inline',
						});
					}, 2000);
				}, 1000);
			}

			//result popup cart
			if ($(this).closest('#modal-cart').length) {
				$(this).addClass("loading");
				setTimeout(() => {
					$.fancybox.close();
					$.fancybox.open({
						src: '#modal-loading',
						type: 'inline',
					});
					$(this).removeClass("loading");
					setTimeout(() => {
						$.fancybox.close();
						$.fancybox.open({
							src: '#modal-offsuccess-cart',
							type: 'inline',
						});
					}, 2000);
				}, 1000);
			}

			//result popup callback
			if ($(this).closest('#modal-callback').length) {
				$(this).addClass("loading");
				setTimeout(() => {
					$.fancybox.close();
					$.fancybox.open({
						src: '#modal-loading',
						type: 'inline',
					});
					$(this).removeClass("loading");
					setTimeout(() => {
						$.fancybox.close();
						$.fancybox.open({
							src: '#modal-error-callback',
							type: 'inline',
						});
					}, 2000);
				}, 1000);
			}
		}
	});

	//input change validation
	$('.item-form input, .item-form textarea').on('change', function (e) {
    if ($(this).val()) {
        $(this).parent().removeClass('item-form_error');
        $(this).parent().find(".item-form__alert").remove();
    } else {
		$(this).parent().addClass('item-form_error');
        $(this).parent().append('<div class="item-form__alert">Заполните поле.</div>');
	}
});

	//close fancybox	
	$(".close-fancybox").click(function (e) {
		e.preventDefault();
		$.fancybox.close();
	});

	$(".modal .fancybox").click(function (e) {
		$.fancybox.close();
	});


	//add to basket
	$(".add-to-basket").click(function (e) {
		e.preventDefault();
		$(this).parent().fadeOut(0);
		$(this).parents(".item-sertificat__bottom").find(".item-sertificat__action").fadeIn(200);
		$(this).parents(".item-sertificat__bottom").find(".quantity__input input").val(1);
		$(this).parents(".item-sertificat__bottom").find(".quantity").addClass("quantity__min");
		checkInputValues();
	});


	//dropdown
	$(".unit-dropdown__head").click(function () {
		$(this).parent().toggleClass("active");
		$(this).siblings().slideToggle(200);
		$(this).parent().siblings(".unit-dropdown").removeClass("active");
		$(this).parent().siblings(".unit-dropdown").find(".unit-dropdown__content").slideUp(200);
	});

	//слайдер
	$('.slider-banners').slick({
		arrows: false,
		dots: false,
		infinite: true,
		touchThreshold: 1000,
		mobileFirst: true,
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: true,
		centerMode: true,
		prevArrow: '<div class="slick-prev slick-arrow"><img src="img/prev.svg" alt="alt"><div/>',
		nextArrow: '<div class="slick-next slick-arrow"><img src="img/next.svg" alt="alt"><div/>',
		responsive: [
			{
				breakpoint: 1199,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					variableWidth: false,
					centerMode: false,
					arrows: true,
				}
			},
		]
	});

	$('.slider-services').slick({
		arrows: false,
		dots: false,
		infinite: false,
		mobileFirst: true,
		touchThreshold: 1000,
		slidesToShow: 2,
		slidesToScroll: 1,
		variableWidth: true,
		prevArrow: '<div class="slick-prev slick-arrow"><img src="img/prev.svg" alt="alt"><div/>',
		nextArrow: '<div class="slick-next slick-arrow"><img src="img/next.svg" alt="alt"><div/>',
		responsive: [
			{
				breakpoint: 1199,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 2,
					infinite: false,
					variableWidth: false,
					centerMode: false,
					arrows: true,
				}
			},
		]
	});

	$('.slider-about').each(function () {
		var $slider = $(this);
		$slider.slick({
			arrows: false,
			dots: true,
			infinite: true,
			touchThreshold: 1000,
			mobileFirst: true,
			appendDots: $slider.parents(".slider-wrapper").find('.slider-dots-wrap'),
			slidesToShow: 1,
			slidesToScroll: 1,
			prevArrow: '<div class="slick-prev slick-arrow"><img src="img/prev.svg" alt="alt"><div/>',
			nextArrow: '<div class="slick-next slick-arrow"><img src="img/next.svg" alt="alt"><div/>',
			responsive: [
			{
				breakpoint: 1199,
				settings: {
					arrows: true,
				}
			}
		]
	});

	});
// quantity
jQuery('.quantity').each(function () {
    var spinner = jQuery(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity__up'),
        btnDown = spinner.find('.quantity__down'),
        min = parseFloat(input.attr('min')) || 0,
        max = parseFloat(input.attr('max')) || Infinity;

    btnUp.click(function () {
        var oldValue = parseFloat(input.val()) || 0;
        var newVal = (oldValue >= max) ? oldValue : oldValue + 1;
        input.val(newVal).trigger("change");
        checkInputValues();

        if (newVal !== 1) {
            spinner.removeClass("quantity__min");
        }
    });

    btnDown.click(function () {
        var oldValue = parseFloat(input.val()) || 0;
        var newVal = (oldValue <= min) ? oldValue : oldValue - 1;

		if (newVal === 0) {
            spinner.parents(".col-sertificat").find(".item-sertificat__action").fadeOut(0);
			spinner.parents(".col-sertificat").find(".item-sertificat__add").fadeIn(200);
        }

        input.val(newVal).trigger("change");
        checkInputValues();
        checkCartQuantity();
    });

    if (parseFloat(input.val()) === 1) {
        spinner.addClass("quantity__min");
    } else {
        spinner.removeClass("quantity__min");
    }

    input.on('change input', function () {
        if (parseFloat(input.val()) === 1) {
            spinner.addClass("quantity__min");
        } else {
            spinner.removeClass("quantity__min");
        }
    });
});

// check to show cart widget
function checkInputValues() {
    let showBlock = false;

    $('.item-sertificat .quantity input').each(function() {
        if ($(this).val() > 0) {
            showBlock = true;
            return false;
        }
    });

    if (showBlock) {
        $('.widget-contact__cart').fadeIn(200);
    } else {
        $('.widget-contact__cart').fadeOut(200);
    }
}

$('.item-sertificat .quantity input').on('input', function() {
    checkInputValues();
});

checkInputValues();

// check cart popup
function checkCartQuantity() {
    $('.item-cart .quantity input').each(function() {
        if (parseFloat($(this).val()) < 1) {
           $(this).parents(".item-cart").find(".remove-popup").fadeIn(100); 
        }
    });
}

//popup remove

	$('.remove-popup_remove').on('click', function (e) {
		$(this).parents(".item-cart").remove();
		if ($('.modal__wrap .item-cart').length === 0) {
			$.fancybox.close();
					$.fancybox.open({
						src: '#modal-emty-cart',
						type: 'inline',
					});
  		}
	 });
	 
	 $('.remove-popup__cancel, .remove-popup__overlay').on('click', function (e) {
		$(this).parents(".remove-popup").fadeOut(100);
		$(this).parents(".item-cart").find(".quantity__input input").val(1);
	 });


	$(".input-phone").mask("+7 (999) 999-99-99");


	// стайлер для select
	$('select').styler();

	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox({
		autoFocus: false,
		backFocus: false,
	});

	$(".fancybox-index").fancybox({
		autoFocus: false,
		backFocus: false,
		 baseClass: "fancybox-index"
	});


});

