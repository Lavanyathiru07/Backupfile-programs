$(function () {
    $('body').on('keydown', handleKeydown);
    $.cookie('test', 'yumyum');
    $('#openAlert').on('click', openAlert);
    $('#openConfirm').on('click', openConfirm);
    $('#openPrompt').on('click', openPrompt);
    $('#moveTo').on('mouseenter mouseleave', toggleMoveToElement);
    $('[data-action]').on('click', handleDataAction);
    $('.jsToggleElement').on('click', onClickToggleElement);

    $('#toggleMessage').on('click', displayFirstMessage).on('dblclick', displaySecondMessage);

    function handleKeydown(event) {
        var $target = $('#testKeyResponse');

        $target.text(event.keyCode);
    }

    function displayFirstMessage() {
        $('#message1').removeClass('hidden');
        $('#message2').addClass('hidden');
    }

    function displaySecondMessage() {
        $('#message1').addClass('hidden');
        $('#message2').removeClass('hidden');
    }

    function makeBgRed() {
        $(this).css('background-color', 'red');
    }

    function makeBgBlue() {
        $(this).css('background-color', 'blue');
    }

    function openAlert(event) {
        event.preventDefault();
        window.alert('I am a alert box!');
    }

    function openConfirm(event) {
        var $result = $('#confirmResult'),
            result;
        event.preventDefault();
        result = window.confirm('I am a confirm box!');
        $result.text(result);
    }

    function openPrompt(event) {
        var $result = $('#promptResult'),
            result;
        event.preventDefault();
        result = window.prompt('I am a prompt!');
        $result.text(result);
    }

    function toggleMoveToElement(event) {
        $(this).toggleClass('moveToClass');
    }

    function handleDataAction(event) {
        var $target = $($(this).data('target')),
            data = $(this).data('action'),
            action = Object.keys(data)[0],
            val = data[action],
            state = $(this).data('state') ? !$(this).data('state') : true;

        event.preventDefault();

        setTimeout(function delayedHandle() {
            switch (action) {
                case 'select': {
                    if (state === true) {
                        $target.val(val).change();
                    } else {
                        $target.val('1').change();
                    }

                    break;
                }

                case 'toggleClass': {
                    $target.toggleClass(val);
                    break;
                }

                case 'text': {
                    if (state) {
                        $target.text(val);
                    } else {
                        $target.text('');
                    }
                    break;
                }

                case 'value': {
                    if (state) {
                        $target.val(val);
                    } else {
                        $target.val('');
                    }
                    break;
                }

                case 'create': {
                    if (state) {
                        $(val).appendTo($target);
                    } else {
                        $target.empty();
                    }

                    break;
                }

                default: {
                    if (state) {
                        $target.prop(action, val === 'true');
                    } else {
                        $target.prop(action, val === 'false');
                    }

                    break;
                }
            }
        }, 500);

        $(this).data('state', state);
    }

    function onClickToggleElement() {
        var $el = $(this),
            $showTarget = $($el.data('show')),
            $hideTarget = $($el.data('hide')),
            timeout = $el.data('timeout') || 0;

        setTimeout(function toggleHiddenClass() {
            $showTarget.removeClass('hidden');
            $hideTarget.addClass('hidden');
        }, timeout);
    }
});
