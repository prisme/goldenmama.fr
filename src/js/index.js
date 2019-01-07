import domLoaded from 'dom-loaded';
import { TweenMax, TimelineLite, EasePack, CSSPlugin } from 'gsap/TweenMax';

const canplayEvent = 'canplaythrough';

domLoaded.then(() => {
  // const tl = new TimelineLite({id: "master"});
  const guru = document.querySelector('.root > .guru')
  const mama = document.querySelector('.root > .golden-mama')

  // GURU
  const tlGuru = new TimelineLite({id: "guru"})
  // hide other half
  tlGuru.to([mama, mama.querySelector('.logo')], 1, { opacity: 0 }, 0);
  // background
  tlGuru.to(guru, 1, { backgroundColor: 'rgba(229, 229, 229, 0)'}, 0)
  // logo
  tlGuru.to(guru.querySelectorAll('.logo path'), 1, { fill: '#e5e5e5' }, 0);
  tlGuru.to(guru.querySelectorAll('.logo'), 1, { xPercent: -50, force3D:true }, 0);
  // show video
  tlGuru.to(document.querySelector('video#guru'), 1, { autoAlpha: 1}, 0)

  /*
    // hide other text
    tlGuru.to('.golden-mama .claim', 0.1, {autoAlpha: 0}, 0)
    tlGuru.to('.guru .claim', 0.1, {autoAlpha: 1}, 0)
    // hide logos
    tlGuru.to('.logo', 0.4, {autoAlpha: 0}, 0)
    // show video
    tlGuru.to('.golden-mama video', 1, {autoAlpha: 1}, 0)
    // play text anim
    tlGuru.to('.guru', 0.4, {background: '#343434'}, 0 )
    tlGuru.staggerFrom('.guru .claim p', 1, {
      opacity : 0,
      repeat: 1, yoyo: true
    }, 2, 0)
  */

  // MAMA
  const tlMama = new TimelineLite({paused: true, id: "mama"})

  /*
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
  */

  guru.addEventListener('mouseenter', (event) => {
    // tlGuru.play()
    console.log('guru enter')
  }, false)
  guru.addEventListener('mouseleave', (event) => {
    // tlGuru.stop()
    // tlGuru.seek(0)
    console.log('guru leave')
  }, false)

  mama.addEventListener('mouseenter', (event) => {
    // tlMama.play()
    console.log('mama enter')
  }, false)
  mama.addEventListener('mouseleave', (event) => {
    // tlMama.stop()
    // tlMama.seek(0)
    console.log('mama leave')
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

GSDevTools.create({paused: true, animation: 'guru'});
// GSDevTools.create();
