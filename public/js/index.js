require('gsap');
const domLoaded = require('dom-loaded');
const canplayEvent = 'canplaythrough';

function Text(element){
  const tl = new TimelineLite()

  tl.staggerFrom(element, 1, {
    opacity : 0,
    repeat: 1, yoyo: true
  }, 2)

  return tl;
}

/*
const master = new TimelineLite();
master
  .add(Text('.golden-mama .claim p'))
  .add(Text('.guru .claim p'))
*/

domLoaded.then(() => {

  const videos = document.querySelectorAll('video');
  for (let i = 0; i < videos.length; i++) {
    videos[i].addEventListener(canplayEvent, onCanPlay, false);
  }


  // GURU
  const guru = document.querySelector('.root > .guru')
  const tlGuru = new TimelineLite({paused: true})
  // hide other text
  tlGuru.to('.golden-mama .claim', 0.1, {autoAlpha: 0}, 0)
  tlGuru.to('.guru .claim', 0.1, {autoAlpha: 1}, 0)
  // hide logos
  tlGuru.to('.g', 0.4, {autoAlpha: 0}, 0)
  // show video
  tlGuru.to('.golden-mama video', 1, {autoAlpha: 1}, 0)
  // play text anim
  tlGuru.to('.guru', 0.4, {background: '#343434'}, 0 )
  tlGuru.staggerFrom('.guru .claim p', 1, {
    opacity : 0,
    repeat: 1, yoyo: true
  }, 2, 0)

  guru.addEventListener('mouseenter', (event) => { tlGuru.play() }, false)
  guru.addEventListener('mouseleave', (event) => { tlGuru.reverse(tlGuru.progress()) }, false)

  // MAMA
  const mama = document.querySelector('.root > .golden-mama')
  const tlMama = new TimelineLite({paused: true})
  // hide other text
  tlMama.to('.guru .claim', 0.1, {autoAlpha: 0}, 0)
  tlMama.to('.golden-mama .claim', 0.1, {autoAlpha: 1}, 0)
  // hide logos
  tlMama.to('.g', 0.4, {autoAlpha: 0}, 0)
  // show video
  tlMama.to('.guru video', 1, {autoAlpha: 1}, 0)
  // play text anim
  tlMama.to('.golden-mama', 0.4, {background: '#fd386d'}, 0 )
  tlMama.staggerFrom('.golden-mama .claim p', 1, {
    opacity : 0,
    repeat: 1, yoyo: true
  }, 2, 0)

  mama.addEventListener('mouseenter', (event) => { tlMama.play() }, false)
  mama.addEventListener('mouseleave', (event) => { tlMama.reverse(tlMama.progress()) }, false)

})

const onCanPlay = (event) => {
  event.target.removeEventListener(canplayEvent, onCanPlay, false);
  event.target.parentNode.classList.add('loaded');
}

// GSDevTools.create({paused: true});
// GSDevTools.create();
