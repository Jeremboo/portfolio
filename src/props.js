import { Power3 } from 'gsap';

// Global tween props
// export const elasticEase = Elastic.easeOut.config(0.5, 1);
export const elasticEase = Elastic.easeOut.config(0.3, 0.6);
export const elasticEaseStrong = Elastic.easeOut.config(0.7, 0.6);
export const fadeInFromVars = { opacity: 0, x: 16, y: 78, rotationZ: 15 };
export const fadeInToVars = { opacity: 1, x: 0, y: 0, rotationZ: 0, ease: elasticEase };

export const fadeInToVarsClassic = { opacity: 1, x: 0, y: 0, rotationZ: 0, ease: Power3.easeOut };
export const fadeOutToVarsClassic = { opacity: 0, x: 4, y: 16, rotationZ: 5, ease: Power3.easeIn };