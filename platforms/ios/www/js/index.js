var touchX;
var touchY;
var grabbedItem = null;
var itemOrigX;
var itemOrigY;

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
	// check for touch moved to edge of screen
	// var screenX = e.touches[0].screenX;
	// var screenY = e.touches[0].screenY;
	// if(screenX <= 5 || screenX >= 315 || screenY <= 5 || screenY >= 550) {
	// 	returnGrab(e);
	// }
}

function updateGrabXY(e) {
	grabbedItem.offset({left: touchX - grabbedItem.width()/2, top: touchY - grabbedItem.height()/2});
}

function returnGrab(e) {
	grabbedItem.offset({left: itemOrigX, top: itemOrigY});
	grabbedItem.remove();
	grabbedItem = null;
}

function grabThis(caller, e) {
	$(caller).clone().attr("id", "grabbedItem").insertAfter($(caller));
	grabbedItem = $("#grabbedItem");
	itemOrigX = grabbedItem.offset().left;
	itemOrigY = grabbedItem.offset().top;
	grabbedItem.offset({left: touchX - grabbedItem.width()/2, top: touchY - grabbedItem.height()/2});
	$("body").on("touchmove", function(e) {
		e.preventDefault();
	})
}