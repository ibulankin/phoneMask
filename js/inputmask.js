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
                    $("div[data-type=phone] .name, div[plp-field=phone] .name").html(hint);
                } else {
                    $("div[data-type=phone] .name, div[plp-field=phone] .name").html("Введите телефон");
                }
            }

            var maskChangeRU = function(maskObj, determined) {
                if (determined) {
                    if (maskObj.type != "mobile") {
                        $("div[data-type=phone] .name, div[plp-field=phone] .name").html(maskObj.city.toString() + " (" + maskObj.region.toString() + ")");
                    } else {
                        $("div[data-type=phone] .name, div[plp-field=phone] .name").html("мобильные");
                    }
                } else {
                    $("div[data-type=phone] .name, div[plp-field=phone] .name").html("Введите телефон");
                }
            }

            $('#phone_mask, input[name="mode"]').change(function() {
                if ($('#phone_mask').is(':checked')) {
                    $("div[data-type=phone] input, div[plp-field=phone] input").inputmask("remove");
                    if ($('#is_world').is(':checked')) {
                        $("div[data-type=phone] input, div[plp-field=phone] input").inputmasks($.extend(true, {}, maskOpts, {
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
                    $("div[data-type=phone] input, div[plp-field=phone] input").inputmasks("remove");
                    $("div[data-type=phone] input, div[plp-field=phone] input").inputmask("+#{*}", maskOpts.inputmask);
                    $("div[data-type=phone] .name, div[plp-field=phone] .name").html("Введите телефон");
                }
            });

            $('#phone_mask').change();
