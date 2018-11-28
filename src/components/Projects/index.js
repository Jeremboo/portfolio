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

    this.selectedProject = false;

    // Set style for the animations
    this.items.forEach((item) => {
      TweenMax.set(item, { ...fadeInFromVars });
    });
  }

  /**
   * * *******************
   * * INTERACTIONS
   * * *******************
   */

  // Bind each project
  onClick(callback) {
    this.items.forEach(item => {
      item.parentNode.addEventListener('click', () => {
        callback(item.parentNode);
      });
    });
  }

  // Selection managment
  select(project) {
    this.wrapper.classList.add('_itemOpen');
    this.unselect();
    this.selectedProject = project;
    this.selectedProject.classList.add('_open');
  }

  unselect() {
    if (this.selectedProject) this.selectedProject.classList.remove('_open');
  }

  closeSelection() {
    this.wrapper.classList.remove('_itemOpen');
    this.unselect();
    this.selectedProject = false;
  }

  // Visibility
  toggleVisibility() {
    this.wrapper.classList.toggle('_hidden');
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

export default new Projects();