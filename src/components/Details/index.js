
import { fadeInFromVars, fadeInToVars, fadeOutToVarsClassic } from '../../props';

class Details {
  constructor() {
    this.currentWrapper = false;
    this.currentLinesShown = false;

    this.currentTween = false;
  }

  _initDetailToShown() {
    this.currentWrapper.classList.remove('_hidden');
    for (let i = 0; i < this.currentLinesShown.length; i++) {
      TweenMax.set(this.currentLinesShown[i], { ...fadeInFromVars });
    }
  }

  /**
   * * *******************
   * * ANIMATIONS
   * * *******************
   */
  showDetail(projectId) {
    const tl = new TimelineLite();
    const newWrapper = document.getElementById(projectId);
    const newLinesShown = Array.from(newWrapper.querySelectorAll(`.Details-line span, .Link > a`));
    // Hide the current detail shown
    if (this.currentLinesShown) {
      tl.add(this.hideCurrentDetail());
      tl.add(() => {
        this.currentWrapper.classList.add('_hidden');
      });
    }
    // Animate the detail
    tl.add(() => {
      this.currentWrapper = newWrapper;
      this.currentLinesShown = newLinesShown;
      this._initDetailToShown();
    });
    tl.staggerTo(newLinesShown, 1, { ...fadeInToVars }, 0.06);
    this.currentTween = tl;
    return tl;
  }

  hideCurrentDetail() {
    if (!this.currentLinesShown) {
      return f => f;
    }

    // Kill the currentTween if an animation was actually played
    if (typeof this.currentTween.length === 'undefined') this.currentTween.kill();

    const arrayReversed = this.currentLinesShown.reverse();
    this.currentTween = TweenMax.staggerTo(arrayReversed, 0.3, { ...fadeOutToVarsClassic, y: 32 }, 0.03);
    return this.currentTween;
  }
}

const details = new Details();
export default details;