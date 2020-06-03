export class EventEmitter{
	
	constructor(mode = '') {

		this._events = {};
		this._id = Date.now();
		this._mode = mode;

		if(mode === 'singletone'){
			if(!EventEmitter._instance) EventEmitter._instance = this;
			return EventEmitter._instance;
		}
	}

	on(type, listener){
		this._events[type] = this._events[type] || [];
		this._events[type].push(listener);
	}

	emit(type, attr){
		if(this._events[type]){
			this._events[type].forEach(listener => listener(attr));
		}
	}
}