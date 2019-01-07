import domLoaded from 'dom-loaded';
import { TweenMax, Eases, CSSPlugin, ScrollToPlugin, TimelineLite } from 'gsap/TweenMax';
import SplitText from "./gsap-bonus/SplitText";
const isTouchDevice = require('is-touch-device');

const canplayEvent = 'canplaythrough';

domLoaded.then(() => {

  var clickEvent = isTouchDevice() ? 'touchstart' : 'click'
  // TweenLite.to(window, 0, {scrollTo:0}, 0.2)

    TweenLite.set('.logo', { x: '50%', y: '-50%', z: 0, right: '50%', top: '50%', force3D: true})
  window.addEventListener('resize', () => {
    TweenLite.set('.logo', { x: '50%', y: '-50%', z: 0, right: '50%', top: '50%', force3D: true})
  })


  // const tl = new TimelineLite({id: "master"});
  const guru = document.querySelector('.root > .guru')
  const mama = document.querySelector('.root > .golden-mama')

  // GURU
  const tlGuru = new TimelineLite({id: "guru"})
  //const splitGuru =
  // hide other half
  tlGuru.to([mama, mama.querySelector('.logo')], 1, { opacity: 0 }, 0);
  // background
  tlGuru.to(guru, 1, { backgroundColor: 'rgba(229, 229, 229, 0)'}, 0)
  // logo
  tlGuru.to(guru.querySelectorAll('.logo path'), 1, { fill: '#e5e5e5' }, 0);
  tlGuru.to(guru.querySelectorAll('.logo'), 1, {
    top: '5vh',
    right: '5vh',
    x: 0,
    y: 0,
    z: 0, force3D: true
   }, 0);
  // video
  tlGuru.to('video#guru', 1, { autoAlpha: 1}, 0)

  tlGuru.staggerTo('.guru .claim p', 1, {
    opacity : 1,
    repeat: 1,
    yoyo: true
  }, 2, 0)


  // MAMA
  const tlMama = new TimelineLite({paused: true, id: "mama"})

  guru.addEventListener('mouseenter', (event) => {
    // tlGuru.play()
    // console.log('guru enter')
  }, false)
  guru.addEventListener('mouseleave', (event) => {
    // tlGuru.stop()
    // tlGuru.seek(0)
    // console.log('guru leave')
  }, false)

  mama.addEventListener('mouseenter', (event) => {
    // tlMama.play()
    // console.log('mama enter')
  }, false)
  mama.addEventListener('mouseleave', (event) => {
    // tlMama.stop()
    // tlMama.seek(0)
    // console.log('mama leave')
  }, false)


  const videos = document.querySelectorAll('video');
  for (let i = 0; i < videos.length; i++) {
    videos[i].addEventListener(canplayEvent, onCanPlay, false);
  }

})

const onCanPlay = (event) => {
  console.log('video canPlay')
  event.target.removeEventListener(canplayEvent, onCanPlay, false);
  // event.target.parentNode.classList.add('loaded'); //TODO
}

GSDevTools.create({
  animation: 'guru',
  paused: true,
  persist: false,
  inTime: 0
});
