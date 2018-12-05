// https://stackoverflow.com/questions/15464896/get-cpu-gpu-memory-information
export default () => {
  let hasGpu = false;
  const types = ['Intel', 'NVIDIA', 'AMD', 'Adreno', 'Apple'];
  const context = document.createElement('canvas').getContext('experimental-webgl');
  const debugRendererInfo = context.getExtension('WEBGL_debug_renderer_info');
  const unmaskedRenderer = debugRendererInfo ? context.getParameter(debugRendererInfo.UNMASKED_RENDERER_WEBGL) : '';
  let model, series, prefix, generation, tier, revision;
  let i = types.length - 1;
  while (!hasGpu && (i >= 0)) {
    const type = types[i];
    if (unmaskedRenderer.indexOf(type) > -1) {
      hasGpu = true;

      // Compoute informations
      model = unmaskedRenderer.replace(/NVIDIA GeForce |AMD Radeon |Apple | OpenGL Engine/g, '');
      const temp = model.split(' ');

      series = type.match(/NVIDIA|AMD/g) ? temp[temp.length - 1] : model;
      series = series.replace(/\D/g, '');

      prefix = temp.length > 1 ? temp[0] : null;
      generation = series.substring(0, series.length - 2);
      tier = series.slice(-2, -1);
      revision = series.slice(-1);

      if (type === 'Apple') {
        generation = series;
        tier = null;
        revision = null;
      }

//       window.console.log(`-----
// fullName: ${unmaskedRenderer}
// model: ${model}
// series: ${series}
// prefix: ${prefix}
// generation: ${generation}
// tier: ${tier}
// revision: ${revision}
// -----`);

      // Check informations
      switch (type) {
        case 'NVIDIA':
          if (!prefix && !model.match('GTX')) return false;
          // if (prefix.match('GTX') || model.match('GTX')) return 'ultra';
          return true;
        case 'AMD':
          if (series === '580') return true; // hight
          return true;
        case 'Intel':
        // Intel Iris
          if (model.indexOf('Iris Pro') > -1) return true; // hight
          // Intel HD Graphics
          series = series.slice(0, 4);
          if (parseInt(series, 10) < 5300) return false;
          return false;
        default:
          // No check avialable
          return true;
      }
    }
    i--;
  }
  return false;
};