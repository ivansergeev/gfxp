import {App} from './../app.js';
import {GFXP} from './gfxp.js';

export class GFXPLib extends App{
	
	constructor() {
		super();

		this.gfxpLib = document.querySelector('#gfxp-lib');
		this.updatePattern = true;
	}	
	
	init(app){
		
		this.emitter.on('animate-play', () => this.updatePattern = false);
		this.emitter.on('animate-stop', () => this.updatePattern = true);
		
		let sortedItems = Object.keys(GFXP).map(function(key) {
			return {name: key};
		});
		
		sortedItems.sort((a,b) => (a.name > b.name? 1:-1));
		
		for(let s in sortedItems){
			let name = sortedItems[s].name,
				file = GFXP[name].map(val => val.toString(16)).join('').toUpperCase();
	
			this.gfxpLib.innerHTML += '<li>' + name + '<a href="#" class="pattern-item" data-name="' + name +'" style="background:url(images/patterns/gfx-pattern-' + file + '.png)"></a></li>';
		}
		
		const counter = document.querySelector('div.gfxp-patterns span.counter');
		counter.innerHTML = '(' + sortedItems.length + ')';
		
		let items = document.querySelectorAll('#gfxp-lib a.pattern-item');
		items.forEach(el => el.addEventListener('click', (e) => this.onClickGFXPLibItemHandler(e)));
		
		return {name: 'lib', instance: this};
	}
	
	onClickGFXPLibItemHandler(e) {
		e.preventDefault();
		
		if(!this.updatePattern) return;
		
		window.scrollTo(0, 0);
	
		let rowdata = GFXP[e.target.dataset.name],
			data = [];

		for(let r=0; r < 8; r++){

			let row = (rowdata[r] >>> 0).toString(2).padStart(8, '0').split('');
			data[r+1] = [];
	
			for (let c=0; c < 8; c++){
				data[r+1][c+1] = Number(row[c]);
			}
		};

		this.emitter.emit('set-pattern', data);
	};	
}