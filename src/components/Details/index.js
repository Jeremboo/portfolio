
import { HAS_TOUCH, fadeInFromVars, fadeInToVars, fadeOutToVarsClassic } from '../../props';

class Details {
  constructor() {
    this.currentWrapper = false;
    this.currentLinesShown = false;

    this.currentTween = false;
  }

  /**
   * * *******************
   * * ANIMATIONS
   * * *******************
   */
  showDetail(projectId) {
    const tl = new TimelineLite();
    const newWrapper = document.getElementById(projectId);
    const newLinesShown = Array.from(newWrapper.querySelectorAll(`body:not(.no-touch) .Details-title, .Details-line span, .Link > a`));
    // Hide the current detail shown
    if (this.currentLinesShown && !HAS_TOUCH) {
      tl.add(this.hideCurrentDetail());
      tl.add(() => {
        this.currentWrapper.classList.add('_hidden');
      });
    }
    // Animate the detail
    tl.add(() => {
      this.currentWrapper = newWrapper;
      this.currentLinesShown = newLinesShown;
      this.currentWrapper.classList.remove('_hidden');
    });
    tl.staggerFromTo(newLinesShown, 1, { ...fadeInFromVars, rotationZ: 5 }, { ...fadeInToVars }, 0.06);
    this.currentTween = tl;
    return tl;
  }

  hideCurrentDetail() {
    if (!this.currentLinesShown) {
      return f => f;
    }

    // Kill the currentTween if I was not an array
    if (typeof this.currentTween.length === 'undefined') this.currentTween.kill();

    const arrayReversed = this.currentLinesShown.reverse();
    this.currentTween = TweenMax.staggerTo(arrayReversed, 0.3, { ...fadeOutToVarsClassic, y: 32, rotationZ: 5 }, 0.03, () => {
      this.currentWrapper.classList.add('_hidden');
    });
    return this.currentTween;
  }
}

const details = new Details();
export default details;