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
		this.gfxpTips = document.querySelector('div.pattern-modes  p.gfxp-tips'),
		this.binaryTips = document.querySelector('div.pattern-modes  p.binary-tips'),
		this.binaryTipsInput = document.querySelector('div.pattern-modes  p.binary-tips input.function-name'),
		this.binaryTipsHiddenText = document.querySelector('div.pattern-modes  p.binary-tips span.function-name');

		this.mode = 'gfxp',
		this.patternCode = '0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF',
		this.animatePatternCode = '',
		this.patternCodeCopiedTimeout,
		this.animatePatterns = [];
	}
	
	init(app){
		this.emitter.on('set-code', data => this.update(data));
		
		document.querySelector('div.pattern-modes > p.code-preview').addEventListener('click', e => this.copyCodeToClipboard(e));

		document.querySelectorAll('div.pattern-modes a.js-mode-button').forEach(el => el.addEventListener('click', e => this.onClickModeButtonHandler(e)));
		
		this.onChangeBinaryFunctionNameHandler();

		['change','keydown','paste','input'].forEach(evt => 
		this.binaryTipsInput.addEventListener(evt, e => this.onChangeBinaryFunctionNameHandler(e)));

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
		
		if(this.mode !== 'gfxp-animate') this.patternCode = val;

		let str, code = '';

		switch (this.mode) {
			case 'gfxp':
				let item = this.searchGFXPItem(this.patternCode);
				
				str = code = 'local gfxp = GFXP\n' + 'gfxp.set(' + 
					((item !== '')? '\'' + item + '\'': '{' + this.patternCode + '}')
				 + ')';
				 str = str.replace(/\n/g,'<br>');
				break;
			
			case 'gfxp-animate':
				
				this.animatePatternCode = 'local gfxp = GFXP\n' + 
					'local patterns = {' +
						(val? '\n':'') +
						val +
					'}\n\n' +
					'local animate = gfxp.animate:new(patterns, ' + this.appComponents.animate.ticks + ')\n\n' +
					'function playdate.update()\n' +
						'\tanimate:draw()\n' +
						'\t-- draw something here, for example\n' +
						'\t-- playdate.graphics.fillCircleAtPoint(200, 120, 100)\n' +
					'end';

				code = this.animatePatternCode;
				str = code.replace(/\n/g,'<br>').replace(/(\},)/g,'},<br>');
				break;

			case 'table':
				str = code = '{' + this.patternCode + '}';
				break;

			case 'pdshort':
				str = code = 'gfx.setPattern({'+ this.patternCode +'})';
				break;

			case 'pdfull':
				str = code = 'playdate.graphics.setPattern({'+ this.patternCode +'})';
				break;
				
			case 'binary':
				
				const funcName = this.binaryTipsInput.value;
				let patternCodeArray = this.patternCode.split(', ');
				
				str = code = 'local pattern = {\n' +
								patternCodeArray.map(val =>
									'\t' + funcName + '(\'' + this.bin2dec(val) + '\')'
								).join(',\n') +
							 ',\n}';

				str = code.replace(/\n/g,'<br>');
				break;

			case 'share':
				let q = this.patternCode.replace(/\s/g,'');
				q = q.replace(/(0x)/g,'');
				q = q.replace(/,/g,'-');
				
				str = code = 'http://ivansergeev.com/gfxp/?p=' + q;
				break;
		}

		this.patternCodePreview.innerHTML = str;
		this.hiddenClipboardCode.value = code;
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
		
		if(this.mode === 'binary') this.binaryTips.classList.remove('hidden');
		else this.binaryTips.classList.add('hidden');
		
		
		if(this.mode === 'gfxp-animate'){
			this.emitter.emit('show-animate', true);
		}else{
			this.emitter.emit('show-animate', false);
		}

		document.querySelectorAll('div.pattern-modes a.js-mode-button').forEach(el => el.parentNode.classList.remove('active'));
			
		e.target.parentNode.classList.add('active');
		
		if(this.mode !== 'gfxp-animate'){
			this.update(this.patternCode);
		}else{
			this.update(this.appComponents.animate.getCode());
		}
		
	}
			
	onChangeBinaryFunctionNameHandler(e) {
		
		let str = this.binaryTipsInput.value;
		
		if(str === '' || str === 'undefined'){
			str = 'bin2num';
			this.binaryTipsInput.value = str;
		}

		this.binaryTipsHiddenText.innerText = str;

		if(this.binaryTipsHiddenText.offsetWidth > 0){
			this.binaryTipsInput.style.width = (this.binaryTipsHiddenText.offsetWidth + 5) + 'px';
			this.update(this.patternCode);
		}
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
	
	getPatternCode() {
		return this.patternCode;
	}
	
	
	
	bin2dec (hex){
		return (parseInt(hex, 16).toString(2)).padStart(8, '0');
	}
}
