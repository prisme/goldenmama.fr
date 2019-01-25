import domLoaded from 'dom-loaded';
import { TweenMax, TimelineMax, Eases, CSSPlugin, ScrollToPlugin } from 'gsap/TweenMax';
import emailScramble from 'email-scramble';
import FontFaceObserver from 'fontfaceobserver';

const font = new FontFaceObserver('AvantGarde-ExtraLight')
const isTouchDevice = require('is-touch-device')
const clickEvent = isTouchDevice() ? 'touchend' : 'click'
const canplayEvent = 'canplay'
let isPortrait = false
let isMute = false
let isPlaying = false
let currentVideo
let currentTl

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
  // TweenLite.to(window, 0, {scrollTo:0}, 0.2)
  isPortrait = window.matchMedia('( max-width: 42em) and ( max-aspect-ratio: 13/9 )').matches
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
      top: '1vh',
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
    .to(mama, 0.8, { opacity: 0, xPercent:-100, force3D: true, ease: Power3.easeIn }, 'hideLogos')
    .to(guru, 0.8, { opacity: 0, xPercent: 100, force3D: true, ease: Power3.easeIn,
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
    .to([guruLogo, mamaLogo, contact], 0.8, { autoAlpha: 0, ease: Power2.easeOut }, 0)
    .addLabel('hideLogos', '-=0.6')

  // backgrounds
  mamaTl
    .to(mama, 0.8, { opacity: 0, xPercent:-100, force3D: true, ease: Power3.easeIn }, 'hideLogos')
    .to(guru, 0.8, { opacity: 0, xPercent: 100, force3D: true, ease: Power3.easeIn,
      onComplete: () => {
        if( isPortrait ) {
          TweenLite.set(mama, { xPercent: 0, height: '100vh' })
        } else {
          TweenLite.set(mama, { xPercent: 0 })
        }
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
    for (var i = 0; i < ctrlClose.length; i++) {
      ctrlClose[i].addEventListener(clickEvent, () => {
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
      })
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

    // guru.addEventListener(clickEvent, guruClickHandler)
    // mama.addEventListener(clickEvent, mamaClickHandler)

  // Videos
    const onCanPlay = (event) => {
      let element = event.target
      let parent = element.classList.contains('guru') ? guru : mama
      let handler = element.classList.contains('guru') ? guruClickHandler : mamaClickHandler

      parent.classList.add('loaded')
      parent.addEventListener(clickEvent, handler)

      // console.log('canplay', element)
      element.removeEventListener(canplayEvent, onCanPlay)
    }

    for (let i = 0; i < videos.length; i++) {
      videos[i].load()

      videos[i].addEventListener(canplayEvent, onCanPlay)
      /*
      videos[i].addEventListener('loadedmetadata', function() {
        if (videos[i].buffered.length === 0) return;

        var bufferedSeconds = videos[i].buffered.end(0) - videos[i].buffered.start(0);
        console.log(bufferedSeconds + ' seconds of video are ready to play!');
      });
      */
    }

  // Resize
    const resizeHandler = () => {
      isPortrait = window.matchMedia('( max-width: 42em) and ( max-aspect-ratio: 13/9 )').matches

      if( isPlaying && isPortrait ) {
        TweenLite.set(mama, { height: '100vh'})
      } else {
        TweenLite.set(mama, { height: 'auto' })
      }
    }

    window.addEventListener('resize', resizeHandler)

  // Contact
    let contactActive = false

    contactToggle.addEventListener(clickEvent, (event) => {
      TweenLite.to(contactOpen, 0.2, { autoAlpha: contactActive ? 1 : 0 })
      TweenLite.to(contactClose, 0.2, {
        autoAlpha: contactActive ? 0 : 1,
        rotation: contactActive ? 0 : -90,
        ease: contactActive ? Power3.easeIn : Power0.easeOut
      })

      TweenLite.to(contactExpand, 0.4, {
          autoAlpha: contactActive ? 0 : 1,
          xPercent: contactActive ? 0 : -10
      })

      contactActive = !contactActive
    })

})
