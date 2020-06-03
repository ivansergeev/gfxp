import {App} from './../app.js';

export class Editor extends App{
	
	constructor() {
		super();
		
		this.grid = document.querySelector('table.pattern-grid > tbody');
		this.canvas = document.querySelector('#pattern-canvas');
		this.canvasContext = this.canvas.getContext('2d');
		this.pattern = [];
		this.mouseMove = false;
		this.firstPixelColor = true;
		this.gridItems;
		this.previousGridItem;
	}	
	
	init(app){
		this.emitter.on('set-pattern', data => this.setPattern(data));

		// grid
		let html = '';

		for(let r=1; r<9; r++){

			this.pattern[r] = [];

			for(let c=1; c<9; c++){
				html += '<td id="p-'+ r + '-' + c + '" data-row="' + r + '" data-col="' + c + '" ></td>';
				this.pattern[r][c] = true;
			}
			this.grid.innerHTML += '<tr>' + html + '</tr>';
			html = '';
		}

		// add event listeners
		this.grid.addEventListener('mousedown',  e => this.onMouseDownHandler(e));
		this.grid.addEventListener('mouseup', e => this.onMouseUpHandler(e));
		document.body.addEventListener('mouseup', e => this.onMouseUpHandler(e));
		
		this.gridItems = document.querySelectorAll('table.pattern-grid td');
		
		const observer = new MutationObserver(mutations => {
				mutations.forEach(mutation => {
					// if (mutation.type === 'attributes') {
						this.pattern[mutation.target.dataset.row][mutation.target.dataset.col] = !mutation.target.classList.contains('black');
					// }
				});
				this.update();
			})
		
		this.gridItems.forEach(el => observer.observe(el, {attributes: true}));
		
		document.querySelectorAll('a.js-editor-control-button.fill').forEach(el => el.addEventListener('click', e => this.onClickFillButtonHandler(e.target.dataset.color == 'black')));

		document.querySelector('a.js-editor-control-button.invert').addEventListener('click', e => this.onClickInvertButtonHandler(e));
		
		return {name: 'editor', instance: this};
	}
	
	onClickFillButtonHandler(isBlack) {
	
		if(isBlack) this.gridItems.forEach(item => item.classList.add('black'));
		else this.gridItems.forEach(item => item.classList.remove('black'));
	}
	
	onClickInvertButtonHandler(e) {
		e.preventDefault();
		
		this.gridItems.forEach(el => {
			if(el.classList.contains('black')) el.classList.remove('black');
			else el.classList.add('black');
		});
	}
	
	coloringPixel(e) {
		e.target.classList.toggle('black');
		return e.target.classList.contains('black');
	}
	
	onMouseDownHandler(e) {
		e.preventDefault();
		
		this.mouseMove = true;
		this.firstPixelColor = this.coloringPixel(e);
		this.grid.addEventListener('mousemove', e => this.onMouseMoveHandler(e));
	}
	
	onMouseMoveHandler(e) {
		e.preventDefault();
		let item = e.target;
	
		if(this.mouseMove && item != this.previousGridItem){
			if(this.firstPixelColor) item.classList.add('black');
			else item.classList.remove('black');
		}
		this.previousGridItem = item;
	}
	
	onMouseUpHandler(e) {
		e.preventDefault();
		if (this.mouseMove) this.grid.removeEventListener('mousemove', this.onMouseMoveHandler);
		this.mouseMove = false;
	}

	setPattern(data) {
		
		if(typeof data === 'object' && data.length > 0){
			this.pattern = JSON.parse(JSON.stringify(data));
			
			this.gridItems.forEach(el => {	
				if(!data[el.dataset.row][el.dataset.col]) el.classList.add('black');
				else el.classList.remove('black');
			});
		}
	}

	update() {
		
		let hexArray = [];
		let patternFileId = '';
		
		for(let r=1; r<9; r++){

			let bin = this.pattern[r].map(val => val? 1:0).join(''),
				hex = parseInt(bin, 2).toString(16).toUpperCase();

			hexArray[r] = '0x' + hex;
			patternFileId += hex;

			for(let c=1; c<9; c++){
				this.canvasContext.fillStyle = this.pattern[r][c]? this.playdateBackgroundColor: '#000';
				this.canvasContext.fillRect( c-1, r-1, 1, 1 );
			}
		}

		hexArray.shift();

		this.emitter.emit('update-pattern', this.pattern);
		this.emitter.emit('update-preview', {patternFileId: patternFileId});
		this.emitter.emit('set-code', hexArray.join(', '));
		
		// updatePatternCode(hexArray.join(', '));
		// updateCurrentAnimatePatternSample(patternArray.slice(0));
	}

	getCanvas() {
		return this.canvas;
	}

	getPattern() {
		return this.pattern;
	}

}

