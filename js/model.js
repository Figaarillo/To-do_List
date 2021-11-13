// Clase para llamar a las funciones de la tabla
export default class Model {
	constructor() {
		this.view = null;
		// Para almacenar los ToDo
		this.toDo = JSON.parse(localStorage.getItem('todos'));
		if (!this.toDo || this.toDo.length < 1) {
			this.toDo = [
				{
					id: 0,
					title: 'Learn JS',
					description: 'Watch JS Tutorials',
					completed: false,
				},
			];
			this.currentId = 1;
		} else {
			this.currentId = this.toDo[this.toDo.length - 1].id + 1;
		}
	}
	setView(view) {
		this.view = view;
	}
	// Metodo para almacenar en una lista todos lo to dos que tengamos
	save() {
		localStorage.setItem('todos', JSON.stringify(this.toDo));
	}
	getToDo() {
		return this.toDo.map((todo) => ({ ...todo }));
	}
	findToDo(id) {
		return this.toDo.findIndex((todo) => todo.id === id);
	}
	toggleCompleted(id) {
		const index = this.findToDo(id);
		const toDo = this.toDo[index];
		toDo.completed = !toDo.completed;
		this.save();
	}
	editToDo(id, values) {
		const index = this.findToDo(id);
		Object.assign(this.toDo[index], values);
		this.save();
	}
	addToDo(title, description) {
		const toDo = {
			id: this.currentId++,
			// Al tener el mismo nombre, JS ya le asigna el valor que recibimos por parametro
			title,
			description,
			completed: false,
		};
		this.toDo.push(toDo);
		this.save();
		// Con los 3 puntitos extendemos el objeto, es como si crearamos un clon para que el original no pueda ser modificado
		return { ...toDo };
	}
	removeToDo(id) {
		// vamos a buscar el indice del ToDo
		// Para ello usamos el findIndex donde indicamos que index será true cuando el id del toDo sea  igual al id que reciba como parametro que deberia ser el id de la fila en ese momento
		const index = this.findToDo(id);
		// Con splice vamos a borrar el elemento del array, dado que al borrarlo del model quedaba en el array
		this.toDo.splice(index, 1);
		this.save();
	}
}
