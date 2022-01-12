import Alert from './alerts.js';
// Funcion que permite añador nuevos to-dos
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
				this.alert.show("Don't forget to add a title and description ;-)");
			} else {
				this.alert.hide();
				callback(this.title.value, this.description.value);
			}
		};
	}
}
