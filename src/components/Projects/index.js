import { TweenMax } from 'gsap';

import details from '../Details';

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

      // Add interaction
      item.parentNode.addEventListener('click', () => {
        this.selectProject(item.parentNode);
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

  // Project selection
  selectProject(project) {
    if (project.classList.contains('_open')) return;

    // Animation
    this.wrapper.classList.add('_itemOpen');
    this.unselectedProject();
    this.selectedProject = project;
    this.selectedProject.classList.add('_open');

    // Open project
    const projectId = this.selectedProject.getAttribute('data-id');
    details.showDetail(projectId);
  }

  unselectedProject() {
    if (this.selectedProject) this.selectedProject.classList.remove('_open');
  }

  closeSelection() {
    this.wrapper.classList.remove('_itemOpen');
    this.unselectedProject();
    this.selectedProject = false;
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