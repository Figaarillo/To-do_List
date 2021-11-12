export default class Model {
	constructor() {
		this.view = null;
		// Para almacenar los ToDo
		this.todos = JSON.parse(localStorage.getItem('todos'));
		if (!this.todos || this.todos.length < 1) {
			this.todos = [
				{
					id: 0,
					title: 'Learn JS',
					description: 'Watch JS Tutorials',
					completed: false,
				},
			];
			this.currentId = 1;
		} else {
			this.currentId = this.todos[this.todos.length - 1].id + 1;
		}
	}

	setView(view) {
		this.view = view;
	}

	save() {
		localStorage.setItem('todos', JSON.stringify(this.todos));
	}

	getTodos() {
		return this.todos.map((todo) => ({ ...todo }));
	}

	findTodo(id) {
		return this.todos.findIndex((todo) => todo.id === id);
	}

	toggleCompleted(id) {
		const index = this.findTodo(id);
		const todo = this.todos[index];
		todo.completed = !todo.completed;
		this.save();
	}

	editTodo(id, values) {
		const index = this.findTodo(id);
		Object.assign(this.todos[index], values);
		this.save();
	}

	addToDo(title, description) {
		const todo = {
			id: this.currentId++,
			// Al tener el mismo nombre, JS ya le asigna el valor que recibimos por parametro
			title,
			description,
			completed: false,
		};

		this.todos.push(todo);
		// console.log(this.toDo);
		// Con los 3 puntitos extendemos el objeto, es como si crearamos un clon para que el original no pueda ser modificado
		console.log(this.todos);
		this.save();

		return { ...todo };
	}

	removeTodo(id) {
		// vamos a buscar el indice del ToDo
		// Para ello usamos el findIndex donde indicamos que index será true cuando el id del toDo sea  igual al id que reciba como parametro que deberia ser el id de la fila en ese momento
		const index = this.findTodo(id);
		// Con splice vamos a borrar el elemento del array, dado que al borrarlo del model quedaba en el array
		this.todos.splice(index, 1);
		this.save();
	}
}
