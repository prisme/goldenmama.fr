import domLoaded from 'dom-loaded';
import { TweenMax, TimelineMax, Eases, CSSPlugin, ScrollToPlugin } from 'gsap/TweenMax';
import emailScramble from 'email-scramble';

const isTouchDevice = require('is-touch-device')
const clickEvent = isTouchDevice() ? 'touchend' : 'click'
const canplayEvent = 'canplaythrough'
let isMute = false
let currentVideo
let currentTl

domLoaded.then(() => {
// Elements
  const root = document.querySelector('.root')
  const guru = root.querySelector('article.guru')
  const mama = root.querySelector('article.mama')

  const ctrlGuru = document.querySelector('.controls.guru')
  const ctrlMama = document.querySelector('.controls.mama')
  const ctrlUnmute = document.querySelectorAll('.unmute')
  const ctrlMute = document.querySelectorAll('.mute')
  const ctrlClose = document.querySelectorAll('.close')

  const guruLogo = guru.querySelector('.logo')
  const mamaLogo = mama.querySelector('.logo')

  const videos = document.querySelectorAll('video')
  const mamaVideo = document.querySelector('video.mama')
  const guruVideo = document.querySelector('video.guru')

// Defaults
  TweenLite.set(isMute ? ctrlMute : ctrlUnmute, {autoAlpha: 0})
  // TweenLite.to(window, 0, {scrollTo:0}, 0.2)

  const scrambled = document.querySelectorAll('.scramble')

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
    .to(guruLogo, 0.8, { autoAlpha: 0, ease: Power2.easeOut }, 0)
    .to(mamaLogo, 0.8, { autoAlpha: 0, ease: Power2.easeOut }, 0)
    .addLabel('hideLogos', '-=0.6')

  // backgrounds
  guruTl
    .to(mama, 0.8, { backgroundColor: 'rgba(45, 46, 131, 0)', xPercent:-100, force3D: true, ease: Power3.easeIn }, 'hideLogos')
    .to(guru, 0.8, { backgroundColor: 'rgba(229, 229, 229, 0)', xPercent: 100, force3D: true, ease: Power3.easeIn,
      onComplete: () => { TweenLite.set(guru, { xPercent: 0 }) }
    }, 'hideLogos')
    .addLabel('hideBackgrounds')

  // video
  guruTl
    .to(guruVideo, 1, {
      autoAlpha: 1,
      // z: 10
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

  guruTl
    .to(guruLogoTop, 0.5, {
      xPercent: 0, right: '1vh', ease: Power4.easeOut
    }, 'hideBackgrounds+=0.3')

  // controls
  TweenLite.set(ctrlGuru, {
    xPercent: -100
  })

  guruTl
    .to(ctrlGuru, 0.5, {
      xPercent: 0,
      autoAlpha: 1,
      ease: Power4.easeOut
    }, 'hideBackgrounds+=0.3')

  // subtitles
  const guruSubsTl = new TimelineMax({
    id: "guruSubs",
    repeat: -1,
    repeatDelay: 1
  })

  guruSubsTl.staggerTo('.guru .claim p', 1.5, {
    opacity : 1,
    repeat: 1,
    yoyo: true
  }, 5)

  guruTl.add(guruSubsTl, 'hideBackgrounds+=1')

// Animation Mama
  const mamaTl = new TimelineMax({
    id: "mama",
    paused: true
  })

  // logos
  mamaTl
    .to(mamaLogo, 0.8, { autoAlpha: 0, ease: Power2.easeOut }, 0)
    .to(guruLogo, 0.8, { autoAlpha: 0, ease: Power2.easeOut }, 0)
    .addLabel('hideLogos', '-=0.6')

  // backgrounds
  mamaTl
    .to(mama, 0.8, { backgroundColor: 'rgba(45, 46, 131, 0)', xPercent:-100, force3D: true, ease: Power3.easeIn }, 'hideLogos')
    .to(guru, 0.8, { backgroundColor: 'rgba(229, 229, 229, 0)', xPercent: 100, force3D: true, ease: Power3.easeIn,
      onComplete: () => { TweenLite.set(mama, { xPercent: 0 }) }
    }, 'hideLogos')
    .addLabel('hideBackgrounds')

  // video
  mamaTl
    .to(mamaVideo, 1, {
      autoAlpha: 1,
      // z: 10
    }, 'hideLogos')

  // top logo
  const mamaLogoTop = root.appendChild(mamaLogo.cloneNode(true))
  mamaLogoTop.removeChild(mamaLogoTop.querySelector('.baseline'))

  TweenLite.set(mamaLogoTop.querySelectorAll('g *'), { fill: '#fd386d' })
  TweenLite.set(mamaLogoTop, {
    width: mamaLogo.offsetWidth * 0.6 +'px',
    height: mamaLogo.offsetHeight * 0.6 +'px',
    top: '1vh',
    left: 0,
    xPercent: -100
  })

  mamaTl
    .to(mamaLogoTop, 0.5, {
      xPercent: 0, left: '1vh', ease: Power4.easeOut
    }, 'hideBackgrounds+=0.3')

  // controls
  TweenLite.set(ctrlMama, {
    xPercent: 100
  })

  mamaTl
    .to(ctrlMama, 0.5, {
      xPercent: 0,
      autoAlpha: 1,
      ease: Power4.easeOut
    }, 'hideBackgrounds+=0.3')

  // subtitles
  const mamaSubsTl = new TimelineMax({
    id: "mamaSubs",
    repeat: -1,
    repeatDelay: 1
  })

  mamaSubsTl.staggerTo('.mama .claim p', 1.5, {
    opacity : 1,
    repeat: 1,
    yoyo: true
  }, 5)

  mamaTl.add(mamaSubsTl, 'hideBackgrounds+=1')

// Handlers

  // Mute
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
    const handleVisibilityChange = () => {
      if (isMute) return;
      switch (document.visibilityState) {
        case 'hidden': currentVideo.muted = true; break;
        case 'visible': currentVideo.muted = false; break;
      }
    }

  // Close
    for (var i = 0; i < ctrlClose.length; i++) {
      ctrlClose[i].addEventListener(clickEvent, () => {
        currentVideo.muted = true

        document.removeEventListener(visibilityChange, handleVisibilityChange)
        for (var i = 0; i < ctrlUnmute.length; i++) {
          ctrlUnmute[i].removeEventListener(clickEvent, handleUnmute);
        }
        for (var i = 0; i < ctrlMute.length; i++) {
          ctrlMute[i].removeEventListener(clickEvent, handleMute);
        }

        currentTl.reverse('hideBackgrounds')
      })
    }

  // Start
    // @TODO : factorize
    guru.addEventListener(clickEvent, (event) => {
      currentVideo = guruVideo
      currentTl = guruTl

      currentVideo.currentTime = 0
      currentVideo.muted = isMute

      document.addEventListener(visibilityChange, handleVisibilityChange)
      for (var i = 0; i < ctrlUnmute.length; i++) {
        ctrlUnmute[i].addEventListener(clickEvent, handleUnmute);
      }
      for (var i = 0; i < ctrlMute.length; i++) {
        ctrlMute[i].addEventListener(clickEvent, handleMute);
      }

      currentVideo.play().then(()=>{
        guruTl.play()
      })
    })

    mama.addEventListener(clickEvent, (event) => {
      currentVideo = mamaVideo
      currentTl = mamaTl

      currentVideo.currentTime = 0
      currentVideo.muted = isMute

      document.addEventListener(visibilityChange, handleVisibilityChange)
      for (var i = 0; i < ctrlUnmute.length; i++) {
        ctrlUnmute[i].addEventListener(clickEvent, handleUnmute);
      }
      for (var i = 0; i < ctrlMute.length; i++) {
        ctrlMute[i].addEventListener(clickEvent, handleMute);
      }

      currentVideo.play().then(()=>{
        mamaTl.play()
      })
    })

    window.addEventListener('resize', () => {
      // console.log('resize')
    })

  // Videos
    const onCanPlay = (event) => {
      console.log('video canPlay')
      event.target.removeEventListener(canplayEvent, onCanPlay, false);
      // event.target.parentNode.classList.add('loaded'); //TODO
    }

    for (let i = 0; i < videos.length; i++) {
      videos[i].addEventListener(canplayEvent, onCanPlay, false);
      // end loader
      // attach pointer listeners
    }

  // Contact
    const contactToggle = document.querySelector('.contact .toggle')
    const contactExpand = document.querySelector('.contact .expand')

    contactToggle.addEventListener(clickEvent, () => {
      TweenLite.to(contactExpand, 0.3, {
          autoAlpha: contactExpand.classList.contains('active') ? 0 : 1,
          onComplete: () => { contactExpand.classList.toggle('active') }})
    })

})
