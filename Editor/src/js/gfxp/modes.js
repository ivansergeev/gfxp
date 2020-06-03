import {App} from './../app.js';
import {GFXP} from './gfxp.js';
import {Querystring} from './../utils/Querystring.js';

export class Modes extends App{
	
	constructor() {
		super();
		
		this.patternCodePreview = document.querySelector('div.pattern-modes > p.code-preview > span.string'),
		this.hiddenClipboardCode = document.querySelector('div.pattern-modes > textarea.clipboard-code'),
		this.patternCodeCopy = document.querySelector('div.pattern-modes > p.code-preview > span.pattern-code-copy');
		this.patternCodeCopied = document.querySelector('div.pattern-modes > p.code-preview > span.pattern-code-copied'),
		this.gfxpTips = document.querySelector('div.pattern-modes  p.gfxp-tips');

		this.mode = 'gfxp',
		this.patternCode = '0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF',
		this.patternCodeCopiedTimeout,
		this.animatePatterns = [];
	}
	
	init(app){
		this.emitter.on('set-code', data => this.update(data));
	
		document.querySelector('div.pattern-modes > p.code-preview').addEventListener('click', e => this.copyCodeToClipboard(e));

		document.querySelectorAll('div.pattern-modes a.js-mode-button').forEach(el => el.addEventListener('click', e => this.onClickModeButtonHandler(e)));

		this.initShare();
		
		return {name: 'modes', instance: this};
	}

	initShare(){

		let pattern = Querystring['p'],
		rowdata = [];

		if(pattern !== ''){
			
			// hex
			if(/^([\dABCDEFGH]{1,2}-[\dABCDEFGH]{1,2}-[\dABCDEFGH]{1,2}-[\dABCDEFGH]{1,2}-[\dABCDEFGH]{1,2}-[\dABCDEFGH]{1,2}-[\dABCDEFGH]{1,2}-[\dABCDEFGH]{1,2})$/ig.test(pattern)){

				rowdata = pattern.split('-');
				rowdata = rowdata.map(val => parseInt(val, 16).toString(2).padStart(8, '0'));
			
			// decimal
			}else if(/^(\d{1,3}_\d{1,3}_\d{1,3}_\d{1,3}_\d{1,3}_\d{1,3}_\d{1,3}_\d{1,3})$/g.test(pattern)){

				rowdata = pattern.split('_');
				rowdata = rowdata.map(val => (val >>> 0).toString(2).padStart(8, '0'));
			}

			if(rowdata.length == 8){
				
				let data = [];
				
				for(let r=0; r < 8; r++){

					let row = rowdata[r].split('');
					data[r+1] = [];

					for (let c=0; c < 8; c++){
						data[r+1][c+1] = Number(row[c]);
					}
				}

				this.emitter.emit('set-pattern', data);
			}
		}
	}
	
	update(val) {
		
		this.patternCode = val;

		let str = '';

		switch (this.mode) {
			case 'gfxp':
				let item = this.searchGFXPItem(this.patternCode);
				
				str = 'gfxp.set(' + 
					((item !== '')? '\'' + item + '\'': '{' + this.patternCode + '}')
				 + ')';
				break;
			
			case 'gfxp-animate':
				str = 'coming soon';
				break;

			case 'table':
				str = '{' + this.patternCode + '}';
				break;

			case 'pdshort':
				str = 'gfx.setPattern({'+ this.patternCode +'})';
				break;

			case 'pdfull':
				str = 'playdate.graphics.setPattern({'+ this.patternCode +'})';
				break;

			case 'share':
				let q = this.patternCode.replace(/\s/g,'');
				q = q.replace(/(0x)/g,'');
				q = q.replace(/,/g,'-');
				
				str = 'http://ivansergeev.com/gfxp/?p=' + q;
				break;
		}

		this.patternCodePreview.innerHTML =
		this.hiddenClipboardCode.value = str;
	}
			
	searchGFXPItem (val) {

		val = val.split(', ').map(val => parseInt(val, 16)).join('')
		
		for(let i in GFXP){
			if (GFXP[i].join('') === val) return i;
		}

		return '';
	}
			
	onClickModeButtonHandler(e) {
		
		e.preventDefault();
		this.mode = e.target.dataset.mode;
		
		if(this.mode === 'gfxp' || this.mode === 'gfxp-animate') this.gfxpTips.classList.remove('hidden');
		else this.gfxpTips.classList.add('hidden');
		
		if(this.mode === 'gfxp-animate'){
			this.emitter.emit('show-animate', true);
		}else{
			this.emitter.emit('show-animate', false);
		}
		
		// animateContainer.classList.add('show');
		// animateContainer.classList.remove('show');
		
		document.querySelectorAll('div.pattern-modes a.js-mode-button').forEach(el => el.parentNode.classList.remove('active'));
			
		e.target.parentNode.classList.add('active');
		this.update(this.patternCode);
	}
			
	copyCodeToClipboard(e) {
		e.preventDefault();
		
		this.hiddenClipboardCode.select();
		this.hiddenClipboardCode.setSelectionRange(0, 1000);
		document.execCommand('copy');

		// show notification
		this.patternCodeCopied.classList.add('show');
		this.patternCodeCopy.classList.add('hide');
		
		// hide notification
		clearTimeout(this.patternCodeCopiedTimeout);
		this.patternCodeCopiedTimeout = setTimeout( ()=> {
			
			this.patternCodeCopied.classList.remove('show');
			this.patternCodeCopy.classList.remove('hide');
		}, 1000);
	}
}
