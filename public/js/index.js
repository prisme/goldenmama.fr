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
