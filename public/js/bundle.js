(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

module.exports = new Promise(resolve => {
	if (document.readyState === 'interactive' || document.readyState === 'complete') {
		resolve();
	} else {
		document.addEventListener('DOMContentLoaded', () => {
			resolve();
		}, {
			capture: true,
			once: true,
			passive: true
		});
	}
});

},{}],2:[function(require,module,exports){
const domLoaded = require('dom-loaded');
const canplayEvent = 'canplaythrough';

domLoaded.then(() => {
  const videos = document.querySelectorAll('video');

  for (var i = 0; i < videos.length; i++) {
    videos[i].addEventListener(canplayEvent, onCanPlay, false);
  }
})

const onCanPlay = (event) => {
  event.target.removeEventListener(canplayEvent, onCanPlay, false);
  event.target.parentNode.classList.add('loaded');
}

},{"dom-loaded":1}]},{},[2]);
