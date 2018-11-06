import { TimelineLite } from 'gsap';

import projects from '../Projects';
import about from '../About';
import footer from '../Footer';

class Content {
  constructor() {
    // Vars
    this.toggled = false;

    // Binding
    this.toggleContent = this.toggleContent.bind(this);

    // Compute animtations
    this.toggleAnim = this.toggle();

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
    if (this.toggled) {
      this.toggleAnim.play();
    } else {
      this.toggleAnim.reverse();
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
    tl.add(footer.show(), '-=0.55');
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