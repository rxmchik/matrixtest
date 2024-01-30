$(function(){
	// Проверка браузера
	if ( !supportsCssVars() ) {
		$('body').addClass('lock')
		$('.supports_error').addClass('show')
	}


	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() +'px')


	// Маска ввода
	$('input[name=birthbay]').inputmask('99.99.9999')

    // Отправка форм
    $('body').on('submit', '.form.ajax_submit', function(e) {

        var thisForm = $(this)

        let fieldTel = thisForm.find('input[name="birthbay"]').val()

        if (thisForm.find('input[name="birthbay"]').length) {
            var unformattedDate = Inputmask.unmask(fieldTel, { alias: "99.99.9999"});

            var lenghtVal = unformattedDate.length;

            if (unformattedDate.length == 0) {
                thisForm.find('input[name="birthbay"]').next('.error_text').text('Введіть дату');
                thisForm.find('input[name="birthbay"]').next('.error_text').slideDown(300);

                return false;
            } else if (unformattedDate.length < 8) {
                thisForm.find('input[name="birthbay"]').next('.error_text').text('Введіть повну дату');
                thisForm.find('input[name="birthbay"]').next('.error_text').slideDown(300);

                return false;
            } else if (!validate_date(fieldTel)) {
                thisForm.find('input[name="birthbay"]').next('.error_text').text('Введіть правильну дату');
                thisForm.find('input[name="birthbay"]').next('.error_text').slideDown(300);

                return false;
            } else{
                thisForm.find('input[name="birthbay"]').next('.error_text').slideUp(300);
                return true;
            }
        }
    })

    $('input[name="birthbay"]').keyup(function(){
        $(this).next('.error_text').slideUp(300);
    });
})

function validate_date(value) {
  var arrD = value.split(".");
  arrD[1] -= 1;
  var d = new Date(arrD[2], arrD[1], arrD[0]);
  if ((d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0])) {
    return true;
  } else {
    return false;
  }
}


// Вспомогательные функции
function widthScroll() {
    let div = document.createElement('div')
    div.style.overflowY = 'scroll'
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.visibility = 'hidden'
    document.body.appendChild(div)

    let scrollWidth = div.offsetWidth - div.clientWidth
    document.body.removeChild(div)

    return scrollWidth
}


var supportsCssVars = function() {
    var s = document.createElement('style'),
        support

    s.innerHTML = ":root { --tmp-var: bold; }"
    document.head.appendChild(s)
    support = !!(window.CSS && window.CSS.supports && window.CSS.supports('font-weight', 'var(--tmp-var)'))
    s.parentNode.removeChild(s)

    return support
}
