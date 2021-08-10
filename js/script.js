'use strict'

let menuIcon = document.querySelector('.top-menu__icon');
let topMenuList = document.querySelector('.top-menu__list');
let buttonTab1 = document.querySelector('.filter-form__tab-1');
let buttonTab2 = document.querySelector('.filter-form__tab-2');
let select5 = document.querySelector('.filter-form__select-5');
let select7 = document.querySelector('.filter-form__select-7');
let filterListLinks = document.querySelectorAll('.filter__list-link');
let menu = document.querySelector('.menu');
let signInBtn = document.getElementById('sign-in-btn');
let signInForm = document.getElementById('sign-in-form');
let signInCloseBtn = document.querySelector('.sign-in__close-button');
let callbackBtn = document.getElementById('callback-btn');
let callback = document.getElementById('callback');
let callbackCloseBtn = document.querySelector('.callback__close-button');
let signForm = document.getElementById('sign-form');
let successSign = document.querySelector('.successSign');
let successSignButton = document.querySelector('.successSign__btn');
let compareIcon = document.getElementById('info__icon-compare');
let favoriteIcon = document.getElementById('info__icon-favorite');
let basketIcon = document.getElementById('info__icon-basket');

menuIcon.addEventListener('click', function() {
	if (topMenuList.style.display == 'block') {
		topMenuList.style.display = 'none';
	} else {
		topMenuList.style.display = 'block';
	}
});

document.addEventListener('click', function(event) {
	if (topMenuList.style.display == 'block' && event.target != menuIcon) {
		topMenuList.style.display = 'none';
	}
});



buttonTab1.addEventListener('click', function(e) {
	e.preventDefault();
	makeOnclickChanges(this, buttonTab2);
});

buttonTab2.addEventListener('click', function(e) {
	e.preventDefault();
	makeOnclickChanges(this, buttonTab1);
});



filterListLinks.forEach(function(link) {
	link.addEventListener('click', function() {
		filterListLinks.forEach(function(link) {
			if ( link.classList.contains('filter__list-link_active') ) {
				link.classList.remove('filter__list-link_active');
			}
		});

		link.classList.add('filter__list-link_active');
	});
});



menu.addEventListener('click', function() {
	if ( !menu.style.height || menu.style.height == '55px') {
		menu.style.height = 'auto';
		return;
	}

	if ( menu.style.height == 'auto') {
		menu.style.height = '55px';
	}
});



signInBtn.addEventListener('click', function() {
	signInForm.style.display = 'flex';
});
signInCloseBtn.addEventListener('click', function() {
	signInForm.style.display = 'none';
});



callbackBtn.addEventListener('click', function() {
	callback.style.display = 'flex';
});
callbackCloseBtn.addEventListener('click', function() {
	callback.style.display = 'none';
});



signForm.addEventListener('submit', function() {
	sessionStorage.setItem("successSign", true);
});

if ( sessionStorage.getItem("successSign") ) {
	successSign.style.display = 'block';
	successSignButton.addEventListener('click', function() {
	 	successSign.style.display = 'none';
	});
	sessionStorage.removeItem("successSign");
}



updateIconInfo(compareIcon, 'compareItems');
updateIconInfo(favoriteIcon, 'favoriteItems');
updateIconInfo(basketIcon, 'basketItems');

document.querySelectorAll('.item__compare-link').forEach(function(link) {
	link.addEventListener('click', function(e) {
		e.preventDefault();
		
		if (link.innerText == 'Сравнить товар') {
			link.innerText = 'В сравнении';
			link.style.color = '#ff8900';
			increaseItemsQuantity('compareItems');
			updateIconInfo(compareIcon, 'compareItems');
		} else {
			link.innerText = 'Сравнить товар';
			link.style.color = '#3b3b3b';
			decreaseItemsQuantity('compareItems');
			updateIconInfo(compareIcon, 'compareItems');
		}
	});	
});

document.querySelectorAll('.item__favorite-link').forEach(function(link) {
	link.addEventListener('click', function(e) {
		e.preventDefault();

		if (link.innerText == 'В избранное') {
			link.innerText = 'В избранном';
			link.style.color = '#ff8900';
			increaseItemsQuantity('favoriteItems');
			updateIconInfo(favoriteIcon, 'favoriteItems');
		} else {
			link.innerText = 'В избранное';
			link.style.color = '#3b3b3b';
			decreaseItemsQuantity('favoriteItems');
			updateIconInfo(favoriteIcon, 'favoriteItems');
		}
	});	
});

document.querySelectorAll('.item__buy-button').forEach(function(link) {
	link.addEventListener('click', function(e) {
		e.preventDefault();
		increaseItemsQuantity('basketItems');
		updateIconInfo(basketIcon, 'basketItems');
	});	
});



function makeOnclickChanges(button1, button2) {
	if (button1 == buttonTab1) {
		select5.style.display = 'block';
		select7.style.display = 'block';
	} else {
		select5.style.display = 'none';
		select7.style.display = 'none';
	}

	button1.style.color = 'white';
	button1.style.background = 'var(--orange)';
	button2.style.color = 'var(--grey)';
	button2.style.background = '#efefef';
}

function increaseItemsQuantity(iconValueKey) {
	if ( sessionStorage.getItem(iconValueKey) ) {
		let newQuantity = parseInt( sessionStorage.getItem(iconValueKey) ) + 1;
		sessionStorage.setItem(iconValueKey, newQuantity);
	} else {
		sessionStorage.setItem(iconValueKey, 1);
	}
}

function decreaseItemsQuantity(iconValueKey) {
	if ( sessionStorage.getItem(iconValueKey) > 1 ) {
		let newQuantity = parseInt( sessionStorage.getItem(iconValueKey) ) - 1;
		sessionStorage.setItem(iconValueKey, newQuantity);
	} else {
		sessionStorage.removeItem(iconValueKey);
	}
}

function updateIconInfo(icon, iconValueKey) {
	if ( sessionStorage.getItem(iconValueKey) ) {
		icon.style.display = 'block';
		icon.firstElementChild.innerText = sessionStorage.getItem(iconValueKey);
	} else {
		icon.style.display = 'none';
	}
}



$.fn.setCursorPosition = function(pos) {
  	if ($(this).get(0).setSelectionRange) {
    	$(this).get(0).setSelectionRange(pos, pos);
  	} else if ($(this).get(0).createTextRange) {
    	var range = $(this).get(0).createTextRange();
    	range.collapse(true);
    	range.moveEnd('character', pos);
    	range.moveStart('character', pos);
    	range.select();
  	}
};

$("#phone").click(function(){
  	$(this).setCursorPosition(5);
}).mask("+38(099)999-99-99");