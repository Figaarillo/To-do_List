import Alert from './alerts.js';
// Aca se  manejara la funcion de 'add'
export default class Add {
	constructor() {
		this.btn = document.getElementById('add');
		this.title = document.getElementById('title');
		this.description = document.getElementById('description');
		this.alert = new Alert('alert');
	}
	onClickAdd(callback) {
		this.btn.onclick = () => {
			if (title.value === '' || description.value === '') {
				this.alert.show('Title and description are required');
			} else {
				this.alert.hide();
				callback(this.title.value, this.description.value);
			}
		};
	}
}