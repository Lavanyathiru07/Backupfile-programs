$(function () {
    $('#draggable').on('mousedown', handleMousedown);
});

function handleMousedown(event) {
    window.dragging = {
        pageX0: event.pageX,
        pageY0: event.pageY,
        elem: this,
        offset0: $(this).offset(),
    };

    function handleDragging(event) {
        var left = dragging.offset0.left + (event.pageX - dragging.pageX0),
            top = dragging.offset0.top + (event.pageY - dragging.pageY0);

        $(dragging.elem).offset({
            top: top,
            left: left,
        });

        detectDrop($(dragging.elem));
    }

    function handleMouseup(event) {
        $('body').off('mousemove', handleDragging).off('mouseup', handleMouseup);
    }

    $('body').on('mouseup', handleMouseup).on('mousemove', handleDragging);
}

function detectDrop($el) {
    var $dropZone = $($el.data('dropzone')),
        dragOffset = $el.offset(),
        dropOffset = $dropZone.offset(),
        dragTop = dragOffset.top,
        dragRight = dragOffset.left + $el.outerWidth(),
        dragBottom = dragOffset.top + $el.outerHeight(),
        dragLeft = dragOffset.left,
        dropTop = dropOffset.top,
        dropRight = dropOffset.left + $dropZone.outerWidth(),
        dropBottom = dropOffset.top + $dropZone.outerHeight(),
        dropLeft = dropOffset.left;

    if (
        dragBottom > dropTop &&
        dragTop < dropBottom &&
        dragRight > dropLeft &&
        dragLeft < dropRight
    ) {
        $dropZone.text('Dropped!');
    } else {
        $dropZone.text('Dropzone');
    }
}
