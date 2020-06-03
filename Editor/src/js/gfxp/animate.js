import {App} from './../app.js';
import {Editor} from './editor.js';

export class Animate extends App{
	
	constructor() {
		super();
		
		this.animateContainer = document.querySelector('div.animate-container'),
		this.animateList = document.querySelector('#animate-list'),
		this.playButtonAnimateControl = document.querySelector('#animate-control-play'),
		this.stopButtonAnimateControl = document.querySelector('#animate-control-stop'),
		this.clearButtonAnimateControl = document.querySelector('#animate-control li.clear'),
		this.removeButtonAnimateControl = document.querySelector('#animate-control li.remove'),
		this.patternStorage = document.querySelector('#animate-pattern-storage');
		
		this.animateArray = [],
		this.defaultWhiteArray = [ ,
			[,1,1,1,1,1,1,1,1],
			[,1,1,1,1,1,1,1,1],
			[,1,1,1,1,1,1,1,1],
			[,1,1,1,1,1,1,1,1],
			[,1,1,1,1,1,1,1,1],
			[,1,1,1,1,1,1,1,1],
			[,1,1,1,1,1,1,1,1],
			[,1,1,1,1,1,1,1,1],
		];
		
		this.selectedPatternId = -1,
		this.selectedPatternIndex = -1,
		this.id = 0,
		this.isPlayed = false;
		
		this.playInterval,
		this.editorPatternCanvas,
		this.editor;
	}	
	
	init(app){	
		
		this.editor = app.getInstanceByName('editor');
		
		this.emitter.on('show-animate', data => this.show(data));
		this.emitter.on('update-pattern', data => this.updateSelectedPatternItem(data));
		
		document.querySelectorAll('#animate-list a.pattern-item').forEach(el => el.addEventListener('click', e => this.onClickItemHandler(e)));
		
		document.querySelector('#animate-list a.add-pattern').addEventListener('click', e => this.onClickAddButtonHandler(e));
		
		document.querySelectorAll('#animate-control a.js-animate-control-button').forEach(el => el.addEventListener('click', e => this.onClickControlButtonHandler(e)));
		
		this.playButtonAnimateControl.addEventListener('click', e => this.onClickPlayButtonHandler(e));

		this.stopButtonAnimateControl.addEventListener('click', e => this.onClickStopButtonHandler(e));
		
		this.editorPatternCanvas = this.editor.getCanvas();
		
		return {name: 'animate', instance: this};
	}
	
	show (visible) {
		if(visible){
			this.animateContainer.classList.add('show');
		}else{
			this.animateContainer.classList.remove('show');
		}
	}
	
	onClickItemHandler(e) {
		
		if(e.x) e.preventDefault();
		
		const item = e.target.parentNode,
			id = Number(item.dataset.id);
		
		this.selectedPatternId = id;

		this.animateArray.forEach(el => {
			if(el.id != id) el.target.classList.remove('active');
		});
		
		item.classList.add('active');

		if(this.animateArray[id].data){
			this.emitter.emit('set-pattern', this.animateArray[id].data);
		}
	}
	
	onClickAddButtonHandler(e) {
		// e.preventDefault();
		
		const id = this.id;
		
		e.target.parentNode.insertAdjacentHTML('beforeBegin', '<li><a href="#" class="pattern-item item-' + id + '" data-id="' + id + '" id="animate-pattern-item-'+ id + '"><canvas id="animate-pattern-preview-canvas-'+ id + '"  data-id="' + id + '" width="100px" height="100px"></canvas></a></li>');
		
		this.patternStorage.insertAdjacentHTML('beforeend','<canvas id="animate-pattern-canvas-'+ id + '"  data-id="' + id + '" width="8px" height="8px"></canvas>');
		
		const item = document.querySelector('#animate-pattern-item-' + id),
			preview = document.querySelector('#animate-pattern-preview-canvas-' + id),
			canvas = document.querySelector('#animate-pattern-canvas-' + id);

		item.addEventListener('click', e => this.onClickItemHandler(e));
		
		// animateObserver.observe(item.parentNode, {attributes: true});
		
		this.animateArray[id] = {
			id: id,
			target: item,
			canvas: canvas,
			context: canvas.getContext('2d'),
			preview: preview,
			previewContext: preview.getContext('2d'),
			data: [],
			active: true
		};
		
		if(this.animateArray.length > 1 && this.isPlayed == false){
			this.playButtonAnimateControl.classList.remove('hidden');
		}

		if(this.selectedPatternId == -1){
			this.selectedPatternId = id;
			this.selectedPatternIndex = this.animateArray.indexOf(id);
			this.updateSelectedPatternItem(this.editor.getPattern());
			
			item.classList.add('active');
		}else{
			this.animateArray[id].data = JSON.parse(JSON.stringify(this.defaultWhiteArray));
		}

		this.showItemControls(true);

		this.id++;
		
		return false;
	}

	onClickControlButtonHandler(e) {
		e.preventDefault();
		
		switch (e.target.dataset.mode) {
			case 'clear':
				this.clear();
				break;
			
			case 'remove-selected': 
				this.removeSelected();
				break;
		}
	}
	
	onClickPlayButtonHandler(e) {
		e.preventDefault();
		
		this.isPlayed = true;
		this.playButtonAnimateControl.classList.add('hidden');
		this.stopButtonAnimateControl.classList.remove('hidden');
		
		this.selectedPatternIndex = 0;
		let s = 100;
		
		if(this.playInterval) clearInterval(this.playInterval);
	
		this.playInterval = setInterval( () => this.setSelectedNextAnimatePatternItem(), s);
	}
	
	setSelectedNextAnimatePatternItem (){

		// const index = this.animateArray.indexOf(this.selectedPatternId);
		// this.selectedPatternIndex = (this.selectedPatternIndex + 1) % this.animateArray.length;
		this.selectedPatternIndex = this.getNextActivePatternIndex(this.selectedPatternIndex);

		this.onClickItemHandler({
			target: this.animateArray[this.selectedPatternIndex].preview
		});
	}
	
	getNextActivePatternIndex (index) {
		const nextindex = (index + 1) % this.animateArray.length;

		return 	this.animateArray[nextindex].active? nextindex: this.getNextActivePatternIndex(nextindex);
	}
	
	onClickStopButtonHandler(e) {
		e.preventDefault();
		
		this.isPlayed = false;
		this.stopButtonAnimateControl.classList.add('hidden');
		this.playButtonAnimateControl.classList.remove('hidden');
		clearInterval(this.playInterval);
	}
	
	removeSelected() {
		if(this.selectedPatternId >= 0){
			
			// const index = this.animateArray.indexOf(this.selectedPatternId);
			// this.animateArray.splice(index, 1);

			const item = this.animateArray[this.selectedPatternId].target;
			item.parentNode.classList.add('hidden');
			
			this.animateArray[this.selectedPatternId].active = false;
			
			this.selectedPatternId = -1;
			this.selectedPatternIndex = -1;
			
			// check active
			
			let active = 0;
			
			for(let i in this.animateArray){
				if(this.animateArray[i].active){
					active++;
				}
			}

			if(active == 0){
				this.showPlayControls(false);
				this.showItemControls(false);
			}else if(active == 1){
				this.showPlayControls(false);
			}
		}
	}
	
	clear () {
		clearInterval(this.playInterval);
		
		this.selectedPatternId = -1;
		this.selectedPatternIndex = -1;
		this.id= 0;
		this.isPlayed = false;
		
		this.animateArray.forEach( el => {
			el.target.parentNode.remove();
		});
		
		this.patternStorage.innerHTML = '';
		this.animateArray = [];
		
		this.showPlayControls(false);
		this.showItemControls(false);
	};

	showPlayControls(show) {
		if(show){
			this.stopButtonAnimateControl.classList.remove('hidden');
			this.playButtonAnimateControl.classList.remove('hidden');			
		}else{
			this.stopButtonAnimateControl.classList.add('hidden');
			this.playButtonAnimateControl.classList.add('hidden');	
		}
	}
	
	showItemControls(show){
		if(show){
			this.clearButtonAnimateControl.classList.remove('hidden');
			this.removeButtonAnimateControl.classList.remove('hidden');	
		}else{
			this.clearButtonAnimateControl.classList.add('hidden');
			this.removeButtonAnimateControl.classList.add('hidden');
		}
	}
	
	updateSelectedPatternItem(data) {

		let id = this.selectedPatternId;

		if(id >= 0 && this.animateArray[id]){
			
			this.animateArray[id].data = JSON.parse(JSON.stringify(data));

			let previewContext = this.animateArray[id].previewContext;
			previewContext.rect(0, 0, 100, 100);
			previewContext.fillStyle = previewContext.createPattern(this.editorPatternCanvas, 'repeat');
			previewContext.fill();
			this.animateArray[id].context.drawImage(this.editorPatternCanvas, 0, 0);
		}
	}
}



// const animateObserver = new MutationObserver(function(mutations) {
// 	mutations.forEach(function(mutation) {
// 		if (mutation.type === 'attributes') {
// 			
// 			if(mutation.target.classList.contains('active')){
// 				mutation.target.dataset.id;
// 			}
// 		}
// 	});
// });



