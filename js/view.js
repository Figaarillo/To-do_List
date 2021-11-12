import Add from './components/add-todo.js';
import Modal from './components/modal.js';
import Filter from './components/filters.js';
// Clase para manejar las funciones de la tabla
export default class View {
	// Traemos las clases para hacer uso de sus funciones
	constructor() {
		this.model = null;
		this.table = document.getElementById('table');
		// Incorporamos el boton de add en la tabla
		this.addToDoForm = new Add();
		this.modal = new Modal();
		this.filters = new Filter();
		/* Con la funcion add this.addToDoForm llamamos a la funcion onClickAdd de la clase Add, donde si se ejecuta el else, se ejecutara un callback que será el this.addToDo de esta clase
		Gracias a que usamos una función flecha es que se puede usar el 'this' para llamar a la funcion addToDo, ya que usando una función normal el this hace referencia a otra cosa. */
		this.addToDoForm.onClickAdd((title, description) =>
			this.addToDo(title, description)
		);
		this.modal.onClickEdit((id, values) => this.editToDo(id, values));
		this.filters.onClickSearch((filters) => this.filter(filters));
	}
	// Se settea el modelo
	setModel(model) {
		this.model = model;
	}
	// Metodo para renderizar la lista al cargar la página
	render() {
		// La variable toDo recibe toda la lista de to dos y recrea todas las filas que sean necesarias
		const toDo = this.model.getToDo();
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
	editToDo(id, values) {
		this.model.editToDo(id, values);
		const row = document.getElementById(id);
		row.children[0].innerText = values.title;
		row.children[1].innerText = values.description;
		row.children[2].children[0].checked = values.completed;
	}
	//
	removeToDo(id) {
		this.model.removeToDo(id);
		document.getElementById(id).remove();
	}
	//
	createRow(toDo) {
		const row = table.insertRow();
		// Añadimos un id para identifacar la fila y hacemos que se incremente cada vez que se ejecuta
		row.setAttribute('id', toDo.id);
		row.innerHTML = `
		<td>${toDo.title}</td>
		<td>${toDo.description}</td>
		<td class="text-center"></td>
		<td class="text-right"></td>
		`;
		// Creamos el input del tipo checkbox
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.checked = toDo.completed;
		checkbox.addEventListener('click', () => this.toggleCompleted(toDo.id));
		row.children[2].appendChild(checkbox);
		// Creacion del modal para editar los to do
		const editBtn = document.createElement('button');
		editBtn.classList.add('btn', 'btn-primary', 'mb-1');
		editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
		editBtn.setAttribute('data-toggle', 'modal');
		editBtn.setAttribute('data-target', '#modal');
		editBtn.addEventListener('click', () =>
			this.modal.setValues({
				id: toDo.id,
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
		removeBtn.addEventListener('click', () => this.removeToDo(toDo.id));
		row.children[3].appendChild(removeBtn);
	}
}
