import { TweenMax } from 'gsap';

import { fadeInFromVars, fadeInToVars, fadeOutToVarsClassic } from '../../props';


class Projects {
  constructor() {
    // Get elements
    this.wrapper = document.getElementById('projects-part');
    this.items = Array.from(document.querySelectorAll('.Projects .Link:not(._hidden) > .Link-wrapper'));
    this.reversedItems = [...this.items].reverse();

    // Bind
    this.toggleVisibility = this.toggleVisibility.bind(this);

    // Set style for the animations
    this.items.forEach((item) => {
      TweenMax.set(item, { ...fadeInFromVars });

      item.addEventListener('click', () => {
        this._openItem(item.parentNode);
      });
    });
  }

  /**
   * * *******************
   * * INTERACTIONS
   * * *******************
   */
  toggleVisibility() {
    this.wrapper.classList.toggle('_hidden');
  }

  _openItem(linkItem) {
    this.wrapper.classList.add('_itemOpen');

    for (let i = 0; i < this.items.length; i++) {
      this.items[i].parentNode.classList.remove('_open');
    }
    linkItem.classList.add('_open');
  }

  /**
   * * *******************
   * * ANIMATIONS
   * * *******************
   */

  show() {
    return TweenMax.staggerTo(this.items, 1, { ...fadeInToVars }, 0.06);
  }

  hide() {
    return TweenMax.staggerTo(this.reversedItems, 0.3, { ...fadeOutToVarsClassic }, 0.03);
  }
}

const projects = new Projects();
export default projects;