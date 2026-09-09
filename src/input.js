export function createInput(target) {
  const keys = new Set();
  const justPressed = new Set();

  function onKeyDown(event) {
    if (!keys.has(event.code)) {
      justPressed.add(event.code);
    }

    keys.add(event.code);
  }

  function onKeyUp(event) {
    keys.delete(event.code);
  }

  target.addEventListener('keydown', onKeyDown);
  target.addEventListener('keyup', onKeyUp);

  return {
    isDown(code) {
      return keys.has(code);
    },

    justPressed(code) {
      return justPressed.has(code);
    },

    endFrame() {
      justPressed.clear();
    }
  };
}