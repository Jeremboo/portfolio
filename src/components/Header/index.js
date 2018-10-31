import { TweenLite, TimelineLite, Power3 } from 'gsap';
import LetterAnimation from '../../util/letterAnimation';

import { fadeInFromVars, fadeInToVars, elasticEaseStrong } from '../../props';


// Tween params
const tweenDuration = 1.5;
const tweenFromProps = { x: 15, y: '100%', opacity: 0 };
const tweenToProps = { x: 0, y: '0%', opacity: 1, ease: elasticEaseStrong };

// Get elements
const title = document.querySelector('#title');
const titleName = document.querySelectorAll('#title span');
const titleFirstNameAnim = new LetterAnimation(titleName[0], tweenFromProps);
const titleLastNameAnim = new LetterAnimation(titleName[1], tweenFromProps);
const subtitle = document.querySelector('#subtitle span');
TweenLite.set(subtitle, { ...fadeInFromVars });

// EXPORT
export default {
  show: () => {
    const tm = new TimelineLite();

    // JEREMIE BOULAY anim
    title.classList.add('_animated');
    tm.add(titleFirstNameAnim.show(tweenDuration, tweenToProps));
    tm.add(titleLastNameAnim.show(tweenDuration, tweenToProps), '-=1.5');
    tm.from(title, 1.6, { x: 64, ease: Power3.easeOut }, 0);
    tm.add(() => { title.classList.remove('_animated'); });

    // SUBTITLE anim
    tm.to(subtitle, 1.5, { ...fadeInToVars, ease: elasticEaseStrong }, '-=1.65');
    return tm;
  },
};