(function($, cornerstone, cornerstoneTools) {

    'use strict';

    function mouseUpCallback(e, eventData) {
        $(eventData.element).off('CornerstoneToolsMouseDrag', dragCallback);
        $(eventData.element).off('CornerstoneToolsMouseUp', mouseUpCallback);
        $(eventData.element).off('CornerstoneToolsMouseClick', mouseUpCallback);
    }

    function mouseDownCallback(e, eventData) {
        if (cornerstoneTools.isMouseButtonEnabled(eventData.which, e.data.mouseButtonMask)) {
            $(eventData.element).on('CornerstoneToolsMouseDrag', dragCallback);
            $(eventData.element).on('CornerstoneToolsMouseUp', mouseUpCallback);
            $(eventData.element).on('CornerstoneToolsMouseClick', mouseUpCallback);
            return false; // false = causes jquery to preventDefault() and stopPropagation() this event
        }
    }

    function dragCallback(e, eventData) {

        // FIXME: Copied from Cornerstone src/internal/calculateTransform.js, should be exposed from there.
        var widthScale = eventData.viewport.scale;
        var heightScale = eventData.viewport.scale;
        if (eventData.image.rowPixelSpacing < eventData.image.columnPixelSpacing) {
            widthScale = widthScale * (eventData.image.columnPixelSpacing / eventData.image.rowPixelSpacing);
        } else if (eventData.image.columnPixelSpacing < eventData.image.rowPixelSpacing) {
            heightScale = heightScale * (eventData.image.rowPixelSpacing / eventData.image.columnPixelSpacing);
        }

        eventData.viewport.translation.x += (eventData.deltaPoints.page.x / widthScale);
        eventData.viewport.translation.y += (eventData.deltaPoints.page.y / heightScale);
        cornerstone.setViewport(eventData.element, eventData.viewport);
        return false; // false = causes jquery to preventDefault() and stopPropagation() this event
    }

    cornerstoneTools.pan = cornerstoneTools.simpleMouseButtonTool(mouseDownCallback);
    cornerstoneTools.panTouchDrag = cornerstoneTools.touchDragTool(dragCallback);

})($, cornerstone, cornerstoneTools);
