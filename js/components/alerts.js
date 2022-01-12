export default class Alert {
	constructor(alertId) {
		this.alert = document.getElementById(alertId);
	}
	// Mostrar el mensaje de error
	show(message) {
		this.alert.classList.remove('d-none');
		this.alert.innerText = `${message} ;-)`;
	}
	// Ocultar el mensaje de error
	hide() {
		this.alert.classList.add('d-none');
	}
}
