import { TimelineLite } from 'gsap';

import projects from '../Projects';
import about from '../About';
import footer from '../Footer';
import details from '../Details';
import engine from '../Engine';

import { HAS_TOUCH } from '../../props';

class Content {
  constructor() {
    // Vars
    this.toggled = false;
    this.wrapper = document.querySelector('.Content-wrapper');

    // Binding
    this.toggleContent = this.toggleContent.bind(this);
    this.selectProject = this.selectProject.bind(this);
    this.closeProject = this.closeProject.bind(this);

    // Compute animtations
    this.tlToggle = this.toggle();

    // Active toggling
    projects.onClick(this.selectProject);
    footer.addListener(this.toggleContent);
  }

  /**
   * * *******************
   * * TOGGLE CONTENT
   * * *******************
   */
  toggleContent() {
    this.toggled = !this.toggled;
    footer.toggle(this.toggled);
    if (this.toggled) {
      projects.closeSelection();
      details.hideCurrentDetail();
      this.tlToggle.play();
      // Hide cubes
      engine.hideProject();
    } else {
      this.tlToggle.reverse();
    }
  }

  toggleContentVisibility() {
    projects.toggleVisibility();
    about.toggleVisibility();
  }

  /**
   * * *******************
   * * PROJECT HANDLING
   * * *******************
   */

  /**
   * Focus the project on the list
   * If on mobile, create a sub menu (toogle about and hide content wrapper)
   * Show the detail of the project
   * Show cubes
   * @param {DOMNode} project
   */
  selectProject(project) {
    if (project.classList.contains('_open')) return;

    const projectId = project.getAttribute('data-id');

    // Open project
    projects.select(project);

    // Open project only on mobile
    if (HAS_TOUCH) {
      this.openProject(projectId);
    } else {
      // Show details and cubes directly
      details.showDetail(projectId);
      engine.showProject(projectId);
    }
  }

  // Mobile functions
  // TODO clarify that
  openProject(projectId) {
    footer.removeListener();
    footer.toggledTitle = 'Back';
    footer.toggle(true);

    // Create timeline to toggle
    const tl = new TimelineLite();
    tl.add(projects.hide());
    tl.add(() => {
      this.wrapper.classList.add('_hidden');
      // Transform footerButtonToBack
      footer.addListener(this.closeProject);
      return details.showDetail(projectId);
    });
    tl.add(() => {
      engine.showProject(projectId);
    }, '+=0.5');
  }

  closeProject() {
    // Hide cubes
    engine.hideProject();

    // Hide footer
    footer.removeListener();
    footer.toggle(false);

    // Toggle content
    const tl = new TimelineLite();
    tl.add(details.hideCurrentDetail());
    tl.add(() => {
      this.wrapper.classList.remove('_hidden');
      projects.closeSelection();
      return projects.show();
    });
    tl.add(() => {
      footer.toggledTitle = 'Projects';
      footer.addListener(this.toggleContent);
    }, '+=1.2');
  }

  /**
   * * *******************
   * * ANIMATIONS
   * * *******************
   */
  show() {
    const tl = new TimelineLite();
    tl.add(projects.show());
    tl.add(footer.show(), '-=1');
    return tl;
  }

  hide() {
    return projects.hide();
  }

  toggle() {
    const tl = new TimelineLite({ paused: true });
    tl.add(projects.hide());
    tl.add(this.toggleContentVisibility);
    tl.add(about.show());
    return tl;
  }
}

const content = new Content();
export default content;