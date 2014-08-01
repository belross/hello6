// touch position relative to document
var touchX, touchY;

// touch position relative to device screen
var screenX, screenY;

// item currently grabbed and being dragged
var grabbedItem = null;

// grabbed item's original X/Y coordinates
var itemOrigX, itemOrigY;

document.addEventListener("deviceready", function(e) {
	initializeApp(e);
});

function initializeApp(e) {
	$(".grabbable").hammer().on("press", function(e) {
		grabThis(this, e);
	});

	document.addEventListener("touchstart", function(e) {
		updateTouchXY(e);
	});

	document.addEventListener("touchmove", function(e) {
		updateTouchXY(e);
		if(grabbedItem != null) {
			updateGrabXY(e);
		}
	});

	document.addEventListener("touchend", function(e) {
		returnGrab(e);
		$("body").off("touchmove");
	});
}

function updateTouchXY(e) {
	// update global touch x/y variables
	touchX = e.touches[0].pageX;
	touchY = e.touches[0].pageY;
	screenX = e.touches[0].screenX;
	screenY = e.touches[0].screenY;
	// if(screenX <= 5 || screenX >= 315 || screenY <= 5 || screenY >= 550) {
	// 	returnGrab(e);
	// }
}

function updateGrabXY(e) {
	grabbedItem.stop();
	grabbedItem.transition({left: touchX - grabbedItem.width()/2, top: touchY - grabbedItem.height()/2});
}

function returnGrab(e) {
	grabbedItem.offset({left: itemOrigX, top: itemOrigY});
	grabbedItem.remove();
	grabbedItem = null;
}

function grabThis(caller, e) {
	$(caller).clone().attr("id", "grabbedItem").insertAfter($(caller));
	grabbedItem = $("#grabbedItem");
	itemOrigX = $(caller).offset().left;
	itemOrigY = $(caller).offset().top;
	$("body").on("touchmove", function(e) {
		e.preventDefault();
	})
	grabAnimation(grabbedItem);
}

// shrink animation for when an item is grabbed
// "element" should be a jQuery object
function grabAnimation(element) {
	element.transition({scale: 0.7, left: screenX, top: screenY});
}