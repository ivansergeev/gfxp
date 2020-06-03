import {App} from './app.js';
import {Editor} from './gfxp/editor.js';
import {Preview} from './gfxp/preview.js';
import {Modes} from './gfxp/modes.js';
import {Animate} from './gfxp/animate.js';
import {GFXPLib} from './gfxp/lib.js';

const app = new App();

window.onload = app.init([
							new Editor(),
							new Preview(),
							new Modes(),
							new Animate(),
							new GFXPLib(),
						]);
