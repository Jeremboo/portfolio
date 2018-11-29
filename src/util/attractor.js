import { Vector3 } from 'three';
/**
 * Update current to attract him to the target using gravity and velocity
 * Elastic effect can be made
 * @param {Vector3 || Euler} current
 * @param {Vector3} target
 * @param {Number} gravity
 * @param {Number} velocity
 */
export default (current, target, gravity, velocity) => {
  const force = new Vector3();
  return () => {
    // const vecForce = current.clone().sub(target);
    // force.sub(vecForce.multiplyScalar(gravity));
    force.x -= ((current.x - target.x) * gravity);
    force.y -= ((current.y - target.y) * gravity);
    force.z -= ((current.z - target.z) * gravity);
    // current.add(force);
    current.x += force.x;
    current.y += force.y;
    current.z += force.z;
    force.multiplyScalar(velocity);
  };
};