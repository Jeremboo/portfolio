import { TweenMax, TimelineLite } from 'gsap';

export default class LetterAnimation {
  constructor(element, tweenStyle = { opacity: 0 }) {
    this.element = element;
    this.text = this.element.innerText;
    this.element.innerText = '';
    this.letters = [];

    let i;
    for (i = 0; i < this.text.length; i++) {
      const letter = document.createElement('span');
      letter.innerHTML = this.text[i];

      TweenMax.set(letter, tweenStyle);

      this.element.appendChild(letter);
      this.letters.push(letter);
    }
  }

  // Animations
  show(duration = 0.8, tweenStyle = { opacity: 1 }, staggingDuration = 0.05) {
    return TweenMax.staggerTo(
      this.element.querySelectorAll('span'),
      duration,
      tweenStyle,
      staggingDuration
    );
  }
}
