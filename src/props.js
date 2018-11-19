import { Power3 } from 'gsap';

import _hasTouch from './util/hasTouch';

// GLOBALS
export const HAS_TOUCH = _hasTouch();

// GSAP TWEEN VARS
// export const elasticEase = Elastic.easeOut.config(0.5, 1);
export const elasticEase = Elastic.easeOut.config(0.3, 0.6);
export const elasticEaseStrong = Elastic.easeOut.config(0.7, 0.6);
export const fadeInFromVars = { opacity: 0, x: 16, y: 78, rotationZ: 15 };
export const fadeInToVars = { opacity: 1, x: 0, y: 0, rotationZ: 0, ease: elasticEase };

export const fadeInFromVarsClassic = { opacity: 0, x: 4, y: 16, rotationZ: 5 };
export const fadeInToVarsClassic = { opacity: 1, x: 0, y: 0, rotationZ: 0, ease: Power3.easeOut };
export const fadeOutToVarsClassic = { ...fadeInFromVarsClassic, ease: Power3.easeIn };

// PHYSICS
export const BOX_OVERFLOWN_FRICTION = 0.1;
export const BOX_TOUCHED_FRICTION = 0.9;

// CUBE
export const FLOATING_ATTRACTION = 0.004;
export const FLOATING_VELOCITY = 0.92;
export const ROTATION_ATTRACTION = 0.008;
export const ROTATION_VELOCITY = 0.945;
export const INITIAL_POSITION_ATTRACTION = 0.05;
export const FRICTION = 0.5;
export const MASS = 5;

// CUBE WAVE
export const CUBE_SCALE_MAX = 4;
export const MARGIN = 0.15;
export const RECURCIVE_RANDOM = 0.3;
export const SCALE_REDUCER = 0.35;