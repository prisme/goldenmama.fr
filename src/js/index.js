import domLoaded from 'dom-loaded';
import { TweenMax, Eases, CSSPlugin, ScrollToPlugin, TimelineLite } from 'gsap/TweenMax';
import SplitText from "./gsap-bonus/SplitText";
const isTouchDevice = require('is-touch-device');

const canplayEvent = 'canplaythrough';

domLoaded.then(() => {

  const clickEvent = isTouchDevice() ? 'touchstart' : 'click'
  let isMute = true
  let currentVideo

  const controls = document.querySelector('.controls')
  const ctrlUnmute = controls.querySelector('.unmute')
  const ctrlMute = controls.querySelector('.mute')
  const ctrlClose = controls.querySelector('.close')

  // TweenLite.to(window, 0, {scrollTo:0}, 0.2)

  //-- Animation
  // const tlMama = new TimelineLite({id: "mama"})
  const gutuTl = new TimelineLite({id: "guru"})
  gutuTl.eventCallback('onStart', () => {
    currentVideo = guruVideo
  })

  // elements
  const root = document.querySelector('.root')
  const guru = root.querySelector('.guru')
  const mama = root.querySelector('.golden-mama')

  // logos
  const guruLogo = guru.querySelector('.logo')
  const mamaLogo = mama.querySelector('.logo')

  gutuTl
    .to(guruLogo, 0.8, { autoAlpha: 0, ease: Power2.easeOut }, 0)
    .to(mamaLogo, 0.8, { autoAlpha: 0, ease: Power2.easeOut }, 0)
    .addLabel('hideLogos', '-=0.6')

  // backgrounds
  gutuTl
    .to(mama, 0.8, { backgroundColor: 'rgba(45, 46, 131, 0)', xPercent:-100, force3D: true, ease: Power3.easeIn }, 'hideLogos')
    .to(guru, 0.8, { backgroundColor: 'rgba(229, 229, 229, 0)', xPercent: 100, force3D: true, ease: Power3.easeIn, onComplete: () => {
      TweenLite.set(guru, { xPercent: 0 })
    }}, 'hideLogos')
    .addLabel('hideBackgrounds')

  // video
  const mamaVideo = document.querySelector('video#mama')
  const guruVideo = document.querySelector('video#guru')

  gutuTl
    .to(guruVideo, 1, {
      autoAlpha: 1,
      onStart: () => {
        guruVideo.currentTime = 0
        guruVideo.play()
      }
    }, 'hideLogos')

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
    .to(guruLogoTop, 0.5, {
      xPercent: 0, right: '1vh', ease: Power4.easeOut
    }, 'hideBackgrounds+=0.3')

  // controls
  TweenLite.set(controls, {
    xPercent: -100,
    opacity: 1
  })

  gutuTl
    .to(controls, 0.5, {
      xPercent: 0, ease: Power4.easeOut
    }, 'hideBackgrounds+=0.3')

  // subtitles
  // const guruSplitText
  gutuTl.staggerTo('.guru .claim p', 1.5, {
    opacity : 1,
    repeat: 1,
    yoyo: true
  }, 5, 'hideBackgrounds+=1')


  //-- Listeners
  const handleClose = () => {}
  ctrlClose.addEventListener(clickEvent, handleClose)

  // Mute State
    const handleUnmute = () => {
      isMute = false
      currentVideo.muted = false
      TweenLite.to(ctrlMute, 0.3, {autoAlpha: 1})
      TweenLite.to(ctrlUnmute, 0.1, {autoAlpha: 0})
    }
    const handleMute = () => {
      isMute = true
      currentVideo.muted = true
      TweenLite.to(ctrlUnmute, 0.3, {autoAlpha: 1})
      TweenLite.to(ctrlMute, 0.1, {autoAlpha: 0})
    }

    ctrlUnmute.addEventListener(clickEvent, handleUnmute);
    ctrlMute.addEventListener(clickEvent, handleMute);

    let hidden, visibilityChange
    if (typeof document.hidden !== "undefined") {
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }
    document.addEventListener(visibilityChange, () => {
      // todo? pause/resume video & animation?
      if (isMute) return;
      switch (document.visibilityState) {
        case 'hidden': currentVideo.muted = true; break;
        case 'visible': currentVideo.muted = false; break;
      }
    })

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

  window.addEventListener('resize', () => {
    console.log('resize')
  })

  const videos = document.querySelectorAll('video');
  for (let i = 0; i < videos.length; i++) {
    videos[i].addEventListener(canplayEvent, onCanPlay, false);
    // end loader
    // attach pointer listeners
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
