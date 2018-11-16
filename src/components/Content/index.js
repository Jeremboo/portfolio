import { TimelineLite } from 'gsap';

import projects from '../Projects';
import about from '../About';
import footer from '../Footer';
import details from '../Details';


class Content {
  constructor() {
    // Vars
    this.toggled = false;

    // Binding
    this.toggleContent = this.toggleContent.bind(this);

    // Compute animtations
    this.tlToggle = this.toggle();

    // Active toggling
    footer.onClick(this.toggleContent);
  }

  /**
   * * *******************
   * * INTERACTIONS
   * * *******************
   */
  toggleContent() {
    this.toggled = !this.toggled;
    footer.toggle(this.toggled);
    if (this.toggled) {
      projects.closeSelection();
      details.hideCurrentDetail();
      this.tlToggle.play();
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
   * * ANIMATIONS
   * * *******************
   */
  show() {
    const tl = new TimelineLite();
    tl.add(projects.show());
    tl.add(footer.show(), '-=0.35');
    return tl;
  }

  hide() {
    return projects.hide();
  }

  toggle() {
    const tl = new TimelineLite({ paused: true });
    tl.add(this.hide());
    tl.add(this.toggleContentVisibility);
    tl.add(about.show());
    return tl;
  }
}

const content = new Content();
export default content;