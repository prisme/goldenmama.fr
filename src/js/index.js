import domLoaded from 'dom-loaded';
import { TweenMax, TimelineMax, Eases, CSSPlugin } from 'gsap/TweenMax';
import emailScramble from 'email-scramble';
import FontFaceObserver from 'fontfaceobserver';
import videoSrcset from './video-srcset';
import objectFitPolyfill from 'objectFitPolyfill';
import isTouchDevice from 'is-touch-device';
import innerHeight from 'ios-inner-height';

const font = new FontFaceObserver('AvantGarde-ExtraLight')
const isPortraitQuery = '( max-width: 720px) and ( max-aspect-ratio: 13/9 )'
const clickEvent = isTouchDevice() ? 'touchend' : 'click'
const canplayEvent = 'canplaythrough'
let isPortrait = false
let isMute = false
let isPlaying = false
let contactActive = false
let currentVideo
let currentTl
let H


domLoaded.then(() => {
// Elements
  const root = document.querySelector('.root')
  const guru = root.querySelector('article.guru')
  const mama = root.querySelector('article.mama')

  const guruLogo = guru.querySelector('.logo')
  const mamaLogo = mama.querySelector('.logo')
  const guruLogoTop = root.appendChild(guruLogo.cloneNode(true))
  const mamaLogoTop = root.appendChild(mamaLogo.cloneNode(true))
  guruLogoTop.removeChild(guruLogoTop.querySelector('.baseline'))
  mamaLogoTop.removeChild(mamaLogoTop.querySelector('.baseline'))

  const ctrlGuru = document.querySelector('.controls.guru')
  const ctrlMama = document.querySelector('.controls.mama')
  const ctrlUnmute = document.querySelectorAll('.controls .unmute')
  const ctrlMute = document.querySelectorAll('.controls .mute')
  const ctrlClose = document.querySelectorAll('.controls .close')

  const contact = document.querySelector('.contact')
  const contactToggle = contact.querySelector('.toggle')
  const contactOpen = contactToggle.querySelector('.open')
  const contactClose = contactToggle.querySelector('.close')
  const contactExpand = contact.querySelector('.expand')
  const scrambled = document.querySelectorAll('.scramble')

  const videos = document.querySelectorAll('video')
  const mamaVideo = document.querySelector('video.mama')
  const guruVideo = document.querySelector('video.guru')

// Defaults

  videoSrcset()
  // objectFitPolyfill()

  font.load().then(function () {
    TweenLite.to('.baseline', 1, { autoAlpha: 1, y: 0, delay: 1 })
  })

  // controls
    TweenLite.set(isMute ? ctrlMute : ctrlUnmute, { autoAlpha: 0 })
    TweenLite.set(ctrlGuru, { xPercent: -100 })
    TweenLite.set(ctrlMama, { xPercent: 100 })

  // top logos
    TweenLite.set(guruLogoTop.querySelectorAll('g *'), { fill: '#e5e5e5' })
    TweenLite.set(guruLogoTop, {
      width: guruLogo.offsetWidth * 0.6 +'px',
      height: guruLogo.offsetHeight * 0.6 +'px',
      top: '1.5vh',
      right: 0,
      xPercent: 100
    })

    TweenLite.set(mamaLogoTop.querySelectorAll('g *'), { fill: '#fd386d' })
    TweenLite.set(mamaLogoTop, {
      width: mamaLogo.offsetWidth * 0.6 +'px',
      height: mamaLogo.offsetHeight * 0.6 +'px',
      top: '1vh',
      left: 0,
      xPercent: -100
    })

  scrambled.forEach( (link) => {
    link.href = emailScramble.decode(link.href)
  })

// Animation Guru
  const guruTl = new TimelineMax({
    id: "guru",
    paused: true
  })

  // logos
  guruTl
    .to([guruLogo, mamaLogo, contact], 0.8, { autoAlpha: 0, ease: Power2.easeOut }, 0)
    .addLabel('hideLogos', '-=0.6')

  // backgrounds
  guruTl
    .to(mama, 0.8, {
      backgroundColor: 'rgba(45, 46, 131, 0)',
      xPercent:-100,
      force3D: true,
      ease: Power3.easeIn
    }, 'hideLogos')
    .to(guru, 0.8, {
      backgroundColor: 'rgba(229, 229, 229, 0)',
      xPercent: 100,
      force3D: true,
      ease: Power3.easeIn,
      onComplete : () => {
        TweenLite.set(guru, { xPercent: 0 })
        TweenLite.set([mama, guru], { pointerEvents: 'none', cursor: 'default' })
      },
      onReverseComplete : () => {
        TweenLite.set([mama, guru], { pointerEvents: 'all', cursor: 'pointer' })
      }
    }, 'hideLogos')
    .addLabel('hideBackgrounds')

  // video
  guruTl
    .to(guruVideo, 1, {
      autoAlpha: 1,
      // z: 10
    }, 'hideLogos')

  // top logo
  guruTl
    .to(guruLogoTop, 0.5, {
      xPercent: 0, right: '1vh', ease: Power4.easeOut
    }, 'hideBackgrounds+=0.3')

  // controls
  guruTl
    .to(ctrlGuru, 0.5, {
      xPercent: 0,
      autoAlpha: 1,
      ease: Power4.easeOut
    }, 'hideBackgrounds+=0.3')

  // subtitles
  const guruSubsTl = new TimelineMax({
    id: "guruSubs",
    repeat: -1
  })
  // total 26s
  guruSubsTl.staggerTo('.guru .claim p', 1.6, {
    opacity : 1,
    repeat: 1,
    yoyo: true
  }, 5.2)

  guruTl.add(guruSubsTl, 'hideBackgrounds+=1')

// Animation Mama
  const mamaTl = new TimelineMax({
    id: "mama",
    paused: true
  })

  // logos
  mamaTl
    .to([guruLogo, mamaLogo, contact], 0.8, { autoAlpha: 0, ease: Power2.easeOut }, 0)
    .addLabel('hideLogos', '-=0.6')

  // backgrounds
  mamaTl
    .to(mama, 0.8, {
      backgroundColor: 'rgba(45, 46, 131, 0)',
      xPercent:-100,
      force3D: true,
      ease: Power3.easeIn
    }, 'hideLogos')
    .to(guru, 0.8, {
      backgroundColor: 'rgba(229, 229, 229, 0)',
      xPercent: 100,
      force3D: true,
      ease: Power3.easeIn,
      onComplete : () => {
        TweenLite.set(mama, { xPercent: 0, height: H })
        TweenLite.set([mama, guru], { pointerEvents: 'none', cursor: 'default' })
      },
      onReverseComplete : () => {
        TweenLite.set([mama, guru], { pointerEvents: 'all', cursor: 'pointer' })
      }
    }, 'hideLogos')
    .addLabel('hideBackgrounds')

  // video
  mamaTl
    .to(mamaVideo, 1, {
      autoAlpha: 1,
      // z: 10
    }, 'hideLogos')

  // top logo
  mamaTl
    .to(mamaLogoTop, 0.5, {
      xPercent: 0, left: '1vh', ease: Power4.easeOut
    }, 'hideBackgrounds+=0.3')

  // controls
  mamaTl
    .to(ctrlMama, 0.5, {
      xPercent: 0,
      autoAlpha: 1,
      ease: Power4.easeOut
    }, 'hideBackgrounds+=0.3')

  // subtitles
  const mamaSubsTl = new TimelineMax({
    id: "mamaSubs",
    repeat: -1
  })
  // total : 24s
  mamaSubsTl.staggerTo('.mama .claim p', 1.4, {
    opacity : 1,
    repeat: 1,
    yoyo: true
  }, 4.8)

  mamaTl.add(mamaSubsTl, 'hideBackgrounds+=1')

// Handlers

  // Mute
    const unmuteHandler = () => {
      isMute = false
      currentVideo.muted = false
      TweenLite.to(ctrlMute, 0.3, {autoAlpha: 1})
      TweenLite.to(ctrlUnmute, 0.1, {autoAlpha: 0})
    }

    const muteHandler = () => {
      isMute = true
      currentVideo.muted = true
      TweenLite.to(ctrlUnmute, 0.3, {autoAlpha: 1})
      TweenLite.to(ctrlMute, 0.1, {autoAlpha: 0})
    }

  // VisibilityChange
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
    const visibilityChangeHandler = () => {
      if (isMute) return;
      switch (document.visibilityState) {
        case 'hidden': currentVideo.muted = true; break;
        case 'visible': currentVideo.muted = false; break;
      }
    }

  // Close
    const closeHandler = () => {
      currentVideo.muted = true
      isPlaying = false
      // @TODO: pause video & animation ?

      document.removeEventListener(visibilityChange, visibilityChangeHandler)

      for (var i = 0; i < ctrlUnmute.length; i++) {
        ctrlUnmute[i].removeEventListener(clickEvent, unmuteHandler);
      }
      for (var i = 0; i < ctrlMute.length; i++) {
        ctrlMute[i].removeEventListener(clickEvent, muteHandler);
      }

      if( isPortrait ) {
        TweenLite.set(mama, { height: 'auto' })
      }

      currentTl.reverse('hideBackgrounds')
    }

    for (var i = 0; i < ctrlClose.length; i++) {
      ctrlClose[i].addEventListener(clickEvent, closeHandler)
    }

    document.onkeyup = function(event) {
       if (event.key === 'Escape'){
         closeHandler()
       }
    }

  // Start
    const clickHandler = () => {
      currentVideo.currentTime = 0
      currentVideo.muted = isMute
      isPlaying = true

      document.addEventListener(visibilityChange, visibilityChangeHandler)
      for (var i = 0; i < ctrlUnmute.length; i++) {
        ctrlUnmute[i].addEventListener(clickEvent, unmuteHandler);
      }
      for (var i = 0; i < ctrlMute.length; i++) {
        ctrlMute[i].addEventListener(clickEvent, muteHandler);
      }

      if (contactActive) {
        contactToggle.click()
      }

      // console.log('mama', mamaTl._totalDuration)
      // console.log('guru', guruTl._totalDuration)
    }

    const guruClickHandler = (event) => {
      currentVideo = guruVideo
      currentTl = guruTl

      clickHandler()

      currentVideo.play().then(()=>{
        guruTl.play()
      })
    }

    const mamaClickHandler = (event) => {
      currentVideo = mamaVideo
      currentTl = mamaTl

      clickHandler()

      currentVideo.play().then(()=>{
        mamaTl.play()
      })
    }

  // Videos
    const onCanPlay = (event) => {
      let element = event.target
      let parent = element.classList.contains('guru') ? guru : mama
      let handler = element.classList.contains('guru') ? guruClickHandler : mamaClickHandler

      parent.classList.add('loaded')
      parent.addEventListener(clickEvent, handler)

      element.removeEventListener(canplayEvent, onCanPlay)
    }

    for (let i = 0; i < videos.length; i++) {
      videos[i].load()
      videos[i].addEventListener(canplayEvent, onCanPlay)
    }

  // Resize
    const resizeHandler = () => {
      isPortrait = window.matchMedia(isPortraitQuery).matches
      H = innerHeight()

      TweenLite.set(root, { height : H + 'px' })

      if( isPlaying && isPortrait ) {
        TweenLite.set(mama, { height: H + 'px' })
      } else {
        TweenLite.set(mama, { height: 'auto' })
      }
    }

    window.addEventListener('resize', resizeHandler)
    resizeHandler()

  // Contact
    let contactTL = new TimelineMax({ paused: true })

    contactTL.eventCallback('onComplete', () => { contactActive = !contactActive })
    contactTL.eventCallback('onReverseComplete', () => { contactActive = !contactActive })

    contactTL.to(contactOpen, 0.1, { autoAlpha: 0 })
    contactTL.to(contactClose, 0.2, {
      autoAlpha: 1,
      rotation: -90,
      ease: Power0.easeOut
    })

    contactTL.to(contactExpand, 0.4, {
      autoAlpha: 1,
      xPercent: -10
    }, 0)

    contactTL.staggerFrom(contactExpand.children, 0.1, {
      xPercent: 5,
      ease: Power3.easeOut,
      yoyo: true
    }, 0.1, 0)

    contactToggle.addEventListener(clickEvent, () => {
      if (contactActive)
        contactTL.reverse()
      else
        contactTL.play()
    })

})
