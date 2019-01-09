import domLoaded from 'dom-loaded';
import { TweenMax, Eases, CSSPlugin, ScrollToPlugin, TimelineLite } from 'gsap/TweenMax';
import SplitText from "./gsap-bonus/SplitText";
const isTouchDevice = require('is-touch-device');

const canplayEvent = 'canplaythrough';

domLoaded.then(() => {

  var clickEvent = isTouchDevice() ? 'touchstart' : 'click'
  // TweenLite.to(window, 0, {scrollTo:0}, 0.2)
  /*
    TweenLite.set('.logo', { x: '50%', y: '-50%', z: 0, right: '50%', top: '50%', force3D: true})
    window.addEventListener('resize', () => {
      TweenLite.set('.logo', { x: '50%', y: '-50%', z: 0, right: '50%', top: '50%', force3D: true})
    })
  */

  // elements
  const root = document.querySelector('.root')
  const guru = root.querySelector('.guru')
  const mama = root.querySelector('.golden-mama')

  // anim
  const gutuTl = new TimelineLite({id: "guru"})
  // const guruSplitText

  // hide logos : color
    // const guruLogo = guru.querySelectorAll('.logo g *')
    // const mamaLogo = mama.querySelectorAll('.logo g *')
    // gutuTl
    //   .to(guruLogo, 0.6, { fill: '#e5e5e5', ease: Power2.easeOut }, 0)
    //   .to(mamaLogo, 0.6, { fill: '#2d2e83', ease: Power2.easeOut }, 0)
    //   .addLabel('hideLogos')
  // hide logos : opacity
  const guruLogo = guru.querySelector('.logo')
  const mamaLogo = mama.querySelector('.logo')
  gutuTl
    .to(guruLogo, 0.8, { autoAlpha: 0, ease: Power2.easeOut })
    .to(mamaLogo, 0.8, { autoAlpha: 0, ease: Power2.easeOut })
    .addLabel('hideLogos', '-=0.6')

  // backgrounds
  gutuTl
    .to(mama, 0.8, { opacity: 0, xPercent:-100, force3D: true, ease: Power3.easeIn }, 'hideLogos')
    .to(guru, 0.8, { opacity: 0, xPercent: 100, force3D: true, ease: Power3.easeIn }, 'hideLogos')
    .addLabel('hideBackgrounds')

  // video
  const guruVideo = document.querySelector('video#guru')
  gutuTl.to(guruVideo, 1, { autoAlpha: 1, onComplete: () => {
    guruVideo.currentTime = 0
    guruVideo.play()
  }}, 'hideLogos')

  // top logo
  const guruLogoTop = root.appendChild(guruLogo.cloneNode(true))
  guruLogoTop.removeChild(guruLogoTop.querySelector('.baseline'))
  TweenLite.set(guruLogoTop.querySelectorAll('g *'), { fill: '#e5e5e5' })
  TweenLite.set(guruLogoTop, {
    width: guruLogo.offsetWidth * 0.6 +'px',
    height: guruLogo.offsetHeight * 0.6 +'px',
    top: '1vh',
    right: 0,
    xPercent: 100
  })
  gutuTl
    .to(guruLogoTop, .5, {xPercent: 0, right: '1vh', ease: Power4.easeOut}, 'hideBackgrounds+=0.3')

  // controls (close, mute)



  // subtitles
  gutuTl.staggerTo('.guru .claim p', 1, {
    opacity : 1,
    repeat: 1,
    yoyo: true
  }, 3, 2)


  // MAMA
  //
  // const tlMama = new TimelineLite({paused: true, id: "mama"})

  // listeners
  guru.addEventListener('mouseenter', (event) => {
    // gutuTl.play()
    // console.log('guru enter')
  }, false)
  guru.addEventListener('mouseleave', (event) => {
    // gutuTl.stop()
    // gutuTl.seek(0)
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
    // end loader
    // attach listeners
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
