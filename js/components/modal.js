import Alert from './alerts.js';

export default class Modal {
	constructor() {
		this.title = document.getElementById('modal-title');
		this.description = document.getElementById('modal-description');
		this.btn = document.getElementById('modal-btn');
		this.completed = document.getElementById('modal-completed');
		this.alert = new Alert('modal-alert');
		this.toDo = null;
	}
	//
	setValues(toDo) {
		this.toDo = toDo;
		this.title.value = toDo.title;
		this.description.value = toDo.description;
		this.completed.checked = toDo.completed;
	}

	onClickEdit(callback) {
		this.btn.addEventListener('click', () => {
			// Si el valor del titulo y la descripcion son falsos, es decir, estan vacios, se ejecuta el mensaje
			if (!this.title.value || !this.description.value) {
				this.alert.show('Title and description are required');
				return;
			}
			$('#modal').modal('toggle');
			callback(this.todo.id, {
				title: this.title.value,
				description: this.description.value,
				completed: this.completed.checked,
			});
		});
	}
}
