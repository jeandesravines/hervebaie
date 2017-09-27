import raf from 'raf';

global.requestAnimationFrame = raf;
global.cancelAnimationFrame = raf.cancel;