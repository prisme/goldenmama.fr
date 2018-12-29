require('gsap');
const domLoaded = require('dom-loaded');
const canplayEvent = 'canplaythrough';


const master = new TimelineLite();

function Text(selecta){
  const tl = new TimelineLite()
  const text = document.querySelectorAll(selecta)

  tl.staggerFrom(text, 1, {
    opacity : 0,
    repeat: 1, yoyo: true
  }, 2)

  return tl;
}

master
  .add(Text('.golden-mama .claim p'))
  .add(Text('.guru .claim p'))

domLoaded.then(() => {

  const videos = document.querySelectorAll('video');

  for (let i = 0; i < videos.length; i++) {
    videos[i].addEventListener(canplayEvent, onCanPlay, false);
  }
})

const onCanPlay = (event) => {
  event.target.removeEventListener(canplayEvent, onCanPlay, false);
  event.target.parentNode.classList.add('loaded');
}

// GSDevTools.create({paused: true});
GSDevTools.create();
