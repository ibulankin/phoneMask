	var inputPhone = $("div[data-type=phone] input, div[plp-field=phone] input");
	var namePhone = $("div[data-type=phone] .name, div[plp-field=phone] .name");
	$('[plp-field=phone]').addClass('is-filled');
	namePhone.addClass('is-filled');


	const input = document.querySelector('div[data-type=phone] input, div[plp-field=phone] input');
	input.setAttribute('checked', 'true');
	const input2 = document.querySelector('div[data-type=phone] input, div[plp-field=phone] input');
	input2.setAttribute('id', 'phone_mask');
	const input3 = document.querySelector('div[data-type=phone] .name, div[plp-field=phone] .name');
	input3.setAttribute('for', 'phone_mask');


	        
	var listCountries = $.masksSort($.masksLoad("https://ibulankin.github.io/phoneMask/data/phone-codes.json"), ['#'], /[0-9]|#/, "mask");
            /*var listRU = $.masksSort($.masksLoad("https://ibulankin.github.io/phoneMask/data/phones-ru.json"), ['#'], /[0-9]|#/, "mask");*/
            var maskOpts = {
                inputmask: {
                    definitions: {
                        '#': {
                            validator: "[0-9]",
                            cardinality: 1
                        }
                    },
                    showMaskOnHover: false,
                    autoUnmask: true,
                    clearMaskOnLostFocus: false
                },
                match: /[0-9]/,
                replace: '#',
                listKey: "mask"
            };

            var maskChangeWorld = function(maskObj, determined) {
                if (determined) {
                    var hint = maskObj.name_ru;
                    if (maskObj.desc_ru && maskObj.desc_ru != "") {
                        hint += " (" + maskObj.desc_ru + ")";
                    }
                    $(namePhone).html(hint);
                } else {
                    $(namePhone).html("Введите телефон");
                }
            }

            var maskChangeRU = function(maskObj, determined) {
                if (determined) {
                    if (maskObj.type != "mobile") {
                        $(namePhone).html(maskObj.city.toString() + " (" + maskObj.region.toString() + ")");
                    } else {
                        $(namePhone).html("мобильные");
                    }
                } else {
                    $(namePhone).html("Введите телефон");
                }
            }

            $('#phone_mask, input[name="mode"]').change(function() {
                if ($('#phone_mask').prop('checked', 'true')) {
                    $(inputPhone).inputmask("remove");
                    if ($('#is_world').prop('checked', 'true')) {
                        $(inputPhone).inputmasks($.extend(true, {}, maskOpts, {
                            list: listCountries,
                            onMaskChange: maskChangeWorld
                        }));
                    } else {
                       /* $("div[data-type=phone] input, div[plp-field=phone] input").inputmasks($.extend(true, {}, maskOpts, {
                            list: listRU,
                            onMaskChange: maskChangeRU
                        }));*/
                    }
                } else {
                    $(inputPhone).inputmasks("remove");
                    $(inputPhone).inputmask("+#{*}", maskOpts.inputmask);
                    $(namePhone).html("Введите телефон");
                }
            });

            $('#phone_mask').change();
