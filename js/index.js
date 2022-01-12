import Model from './model.js';
import View from './view.js';

document.addEventListener('DOMContentLoaded', () => {
	const model = new Model();
	const view = new View();

	model.setView(view); // Permite acceder a la vista desde el model
	view.setModel(model); // Permite acceder al model desde la vista

	view.render(); // Ejecuta la funcion de renderizar cada vez que se inicia
});
