
import {EventEmitter} from './utils/EventEmitter.js';

export class App{
	
	constructor() {
		if(!this._instance) this._instance = this;	
	
		this.emitter = new EventEmitter('singletone');
		this.playdateBackgroundColor = '#b1aea7';
		this.components = {};
		
		return this._instance;
	}	

	init(comp) {
		
		let item;
		
		for(let i in comp){
			 item = comp[i].init(this);
			 this.components[item.name] = item.instance;
		}

		document.querySelector('div.loading').classList.add('hidden');
		
		['div.design-container', 'div.pattern-modes', 'div.gfxp-patterns'].forEach(el => document.querySelector(el).classList.add('show'));
	}
	
	getInstanceByName(name) {
		return this.components[name];
	}
}
