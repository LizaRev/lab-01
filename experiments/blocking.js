export function createBlockingExperiment() {
  let renderFrames = 0;

  return function blockEvery60Frames() {
    renderFrames++;

    if (renderFrames % 60 === 0) {
      const t = performance.now();

      while (performance.now() < t + 100) {
        
      }

      console.log('Blocking: 100 ms');
    }
  };
}