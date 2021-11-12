import Model from './model.js';
import View from './view.js';
// Clase index
document.addEventListener('DOMContentLoaded', () => {
	const model = new Model();
	const view = new View();
	model.setView(view);
	view.setModel(model);
	// Al iniciar el programa se ejecuta que renderizará las filas
	view.render();
});
