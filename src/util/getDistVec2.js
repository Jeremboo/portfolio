Math.sqr = (a) => a * a;
export default (x1, y1, x2, y2) => Math.sqrt(Math.sqr(y2 - y1) + Math.sqr(x2 - x1));
