document.addEventListener('DOMContentLoaded', () => {
	// Funcion para la busqueda por titulos
	const title = document.getElementById('title');
	// Funcionn para la busueda pora la busqueda por descripcion
	const description = document.getElementById('description');
	// Funcion para le boton 'add'
	const btn = document.getElementById('add');
	// Funcion para la tabla
	const table = document.getElementById('table');
	// Funcion para el memsaje de alerta de error
	const alert = document.getElementById('alert');
	// Id para identificar cada fila creada
	let id = 1;
	removeToDo = (id) => {
		document.getElementById(id).remove();
	};
	const addToDo = () => {
		if (title.value === '' || description.value === '') {
			alert.classList.remove('d-none');
			alert.innerText = 'Title and description are required';
			return;
		}
		// Funcionamiento de añadir una nueva tarea
		// Quitantdo mensaje de alerta
		alert.classList.add('d-none');
		// Añadir nueva fila
		const row = table.insertRow();
		// Añadimos un id para identifacar la fila y hacemos que se incremente cada vez que se ejecuta
		row.setAttribute('id', id++);
		row.innerHTML = `
		<td>${title.value}</td>
		<td>${description.value}</td>
		<td class="text-center">
			<input type="checkbox" />
		</td>
		<td class="text-right">
			<button class="btn btn-primary mb-1">
				<i class="fa fa-pencil"></i>
			</button>
		</td>
		`;
		// Creamos el boton de borrar y luego lo agregamos a la fila que se crea
		const removeBtn = document.createElement('button');
		removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
		removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
		removeBtn.addEventListener('click', (e) => {
			removeToDo(row.getAttribute('id'));
		});
		row.children[3].appendChild(removeBtn);
	};
	btn.addEventListener('click', addToDo);
});
