import Add from './components/add-todo.js';
import Modal from './components/modal.js';
import Filter from './components/filters.js';
// Aca se va a manejar la tabla
export default class View {
	// Traemos las clases para hacer uso de sus funciones
	constructor() {
		this.model = null;
		this.table = document.getElementById('table');
		// Incorporamos el boton de add en la tabla
		this.addToDoForm = new Add();
		this.modal = new Modal();
		this.filters = new Filter();
		/* Gracias a que usamos una función flecha es que se puede usar el 'this' para llamar a la funcion addToDo, ya que usando una función normal el this hace referencia a otra cosa. */
		this.addToDoForm.onClick((title, description) =>
			this.addToDo(title, description)
		);
		this.modal.onClick((id, values) => this.editTodo(id, values));
		this.filters.onClick((filters) => this.filter(filters));
	}
	// Se settea el modelo
	setModel(model) {
		this.model = model;
	}
	// Metodo para renderizar la lista al cargar la página
	render() {
		// La variable toDo recibe toda la lista de to dos y recrea todas las filas que sean necesarias
		const toDo = this.model.getTodos();
		// Por cada en el modelo se crea una fila
		toDo.forEach((to_do) => this.createRow(to_do));
	}
	// Metodo para realizar la funcion de busqueda
	filter(filters) {
		const { type, words } = filters;
		// De esa¿ta forma se elimina el primer elemento de la tabla que corresponde a los titulos
		const [, ...rows] = this.table.getElementsByTagName('tr');
		for (const row of rows) {
			const [title, description, completed] = row.children;
			let shouldHide = false;
			if (words) {
				shouldHide =
					!title.innerText.includes(words) &&
					!description.innerText.includes(words);
			}
			const shouldBeCompleted = type === 'completed';
			const isCompleted = completed.children[0].checked;
			if (type !== 'all' && shouldBeCompleted !== isCompleted) {
				shouldHide = true;
			}
			if (shouldHide) {
				row.classList.add('d-none');
			} else {
				row.classList.remove('d-none');
			}
		}
	}
	// Llamada a la funcion para añadir to dos
	addToDo(title, description) {
		const toDo = this.model.addToDo(title, description);
		this.createRow(toDo);
	}
	// Funcion de toggle
	toggleCompleted(id) {
		this.model.toggleCompleted(id);
	}
	//
	editTodo(id, values) {
		this.model.editTodo(id, values);
		const row = document.getElementById(id);
		row.children[0].innerText = values.title;
		row.children[1].innerText = values.description;
		row.children[2].children[0].checked = values.completed;
	}
	//
	removeTodo(id) {
		this.model.removeTodo(id);
		document.getElementById(id).remove();
	}
	//
	createRow(todo) {
		const row = table.insertRow();
		// Añadimos un id para identifacar la fila y hacemos que se incremente cada vez que se ejecuta
		row.setAttribute('id', todo.id);
		row.innerHTML = `
		<td>${todo.title}</td>
		<td>${todo.description}</td>
		<td class="text-center"></td>
		<td class="text-right"></td>
		`;
		// Creamos el input del tipo checkbox
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.checked = todo.completed;
		checkbox.onclick = () => this.toggleCompleted(todo.id);
		row.children[2].appendChild(checkbox);
		// Creacion del modal para editar los to do
		const editBtn = document.createElement('button');
		editBtn.classList.add('btn', 'btn-primary', 'mb-1');
		editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
		editBtn.setAttribute('data-toggle', 'modal');
		editBtn.setAttribute('data-target', '#modal');
		editBtn.addEventListener('click', () =>
			this.modal.setValues({
				id: todo.id,
				title: row.children[0].innerText,
				description: row.children[1].innerText,
				completed: row.children[2].children[0].checked,
			})
		);
		row.children[3].appendChild(editBtn);
		// Creamos el boton de borrar y luego lo agregamos a la fila que se crea
		const removeBtn = document.createElement('button');
		removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
		removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
		removeBtn.onclick = () => this.removeTodo(todo.id);
		row.children[3].appendChild(removeBtn);
	}
}
