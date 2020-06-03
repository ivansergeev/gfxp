import {App} from './../app.js';

export class Preview extends App{
	
	constructor() {
		super();
		
		this.canvas = document.querySelector('#pattern-preview-canvas');
		this.canvasContext = this.canvas.getContext('2d');
		this.srcCanvas = document.querySelector('#pattern-canvas');
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.patternFileId = 'FFFFFFFFFFFFFFFF';
		this.minScale = 25;
		this.maxScale = 800;
		this.currentScale = 100;
		this.scrCanvas;
	}

	init(app) {
		this.emitter.on('update-preview', attr => this.updateHandler(attr));
		
		document.querySelectorAll('a.js-preview-download-button').forEach(el => el.addEventListener('click', e => this.downloadPattern(e)));
					
		document.querySelectorAll('a.js-preview-zoom-button').forEach(el => el.addEventListener('click', e => this.onClickZoomButtonHandler(e)));
		
		return {name: 'preview', instance: this};
	}
	
	updateHandler(attr) {
		this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
		this.currentScale = 100;
		this.patternFileId = attr.patternFileId;
		this.update();
	}
	
	update() {
		this.canvasContext.rect(0, 0, this.width, this.height);
		this.canvasContext.fillStyle = this.canvasContext.createPattern(this.srcCanvas, 'repeat');
		this.canvasContext.fill();
	}
	
	onClickZoomButtonHandler(e) {
		e.preventDefault();
		
		let mode = e.target.dataset.mode,
			scale = 0
		
		if (mode === 'restore'){
			this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
			this.currentScale = 100;
			scale = 1;
		}else{
			if(e.target.dataset.mode === 'in' && this.currentScale < this.maxScale){
				 scale = 2;
			}else if(e.target.dataset.mode === 'out' && this.currentScale > this.minScale){
				scale = 0.5;	
			}
			if(scale){
				this.currentScale *= scale;	
				this.canvasContext.scale(scale, scale);
			}
		 }
		 if(scale) this.update();
	}
	
	downloadPattern(e) {
		e.preventDefault();
		
		let link = document.createElement('a'),
			type = e.target.dataset.type;
			
		link.download = 'gfx-pattern-' + this.patternFileId + (type === 'small'? '': '-preview') + '.png';
		link.href = type === 'small'? this.srcCanvas.toDataURL(): this.canvas.toDataURL();
		link.click();
	}
	
}
