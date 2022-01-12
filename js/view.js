import Add from './components/add-todo.js';
import Modal from './components/modal.js';
import Filter from './components/filters.js';

// Clase para manejar las funciones de la tabla
export default class View {
	constructor() {
		this.model = null;
		this.table = document.getElementById('table');
		this.addToDoForm = new Add(); // Se trae el componenete del boton add
		this.modal = new Modal();
		this.filters = new Filter();

		/* Funcion que permite añadir un nuevo todo al formuladio al hacer click en add */
		this.addToDoForm.onClickAdd((title, description) => this.addToDo(title, description));
		this.modal.onClickEdit((id, values) => this.editToDo(id, values));
		this.filters.onClickSearch(filters => this.filter(filters));
	}
	// Se settea una instancia del model para poder hacer uso del mismo
	setModel(model) {
		this.model = model;
	}
	// Metodo para renderizar la lista al cargar la página
	render() {
		const toDo = this.model.getToDo(); // Recibe toda la lista de toDos y recrea todas las filas que sean necesarias
		// Por cada en el modelo se crea una fila
		toDo.forEach(todo => this.createRow(todo));
	}
	// Metodo para realizar la funcion de busqueda
	filter(filters) {
		const { type, words } = filters; // Obtenemos el tipo y las palabras del componente filtro

		// De esta forma se elimina el primer elemento de la tabla que corresponde a los titulos
		const [, ...rows] = this.table.getElementsByTagName('tr');
		for (const row of rows) {
			const [title, description, completed] = row.children;
			let hideRows = false;

			// Durante la busqueta, si la row contiene palabras pero no las buscadas, se oculta
			if (words) {
				hideRows =
					!title.innerText.includes(words) && !description.innerText.includes(words);
			}

			const shouldBeCompleted = type === 'completed'; // contante que almacena la condicion buscada
			const isCompleted = completed.children[0].checked; // Constatante que verifica el tipo de cada fila

			if (type !== 'all' && shouldBeCompleted !== isCompleted) hideRows = true;

			if (hideRows) row.classList.add('d-none');
			else row.classList.remove('d-none'); // Muestra filas
		}
	}

	addToDo(title, description) {
		const toDo = this.model.addToDo(title, description); // Se crea un objeto toDo
		this.createRow(toDo); // Se pasa este objeto crado, al createRow para que haga la fila
	}
	// Funcion de toggle para marcar si una tarea pasa a completed o uncompleted
	toggleCompleted(id) {
		this.model.toggleCompleted(id);
	}

	editToDo(id, values) {
		this.model.editToDo(id, values);
		const row = document.getElementById(id);
		row.children[0].innerText = values.title;
		row.children[1].innerText = values.description;
		row.children[2].children[0].checked = values.completed;
	}

	removeToDo(id) {
		this.model.removeToDo(id);
		document.getElementById(id).remove();
	}

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

		const checkbox = document.createElement('input'); // Creamos el input del tipo checkbox
		checkbox.type = 'checkbox';
		checkbox.checked = toDo.completed;
		checkbox.addEventListener('click', () => this.toggleCompleted(toDo.id));
		row.children[2].appendChild(checkbox);

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
		const removeBtn = document.createElement('button');
		removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
		removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
		removeBtn.addEventListener('click', () => this.removeToDo(toDo.id));
		row.children[3].appendChild(removeBtn);
	}
}
