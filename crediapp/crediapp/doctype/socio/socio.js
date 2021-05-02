// Copyright (c) 2021, orlando and contributors
// For license information, please see license.txt

frappe.ui.form.on('Socio', {
	refresh: function (frm) {
		calcular(frm);
	},
	onload_post_render: function (frm) {
		controlSoloNumeroEntero(frm.fields_dict.cedula);
		controlSoloNumeroEntero(frm.fields_dict.cedulaconyuge);

	},

	validate: function (frm) {
		if (validarCedula(frm.doc.cedula) == 0) {

			frappe.throw("Cedula incorrecto del socio");
		}
		if (validarCedula(frm.doc.cedulaconyuge) == 0) {

			frappe.throw("Cedula incorrecto del conyuge");
		}
	}
	,
	fecha_nac: function (frm) {

		calcular(frm);
	},


});

function calcular(frm) {
	let edad = getEdad(frm.doc.fecha_nac);
	console.log(edad);
	if (edad > 0) {
		frm.fields_dict.fecha_nac.set_label('Fecha de nacimiento    (' + edad + ' Años)');
	}
	else {
		frm.fields_dict.fecha_nac.set_label('Fecha de nacimiento ');
	}
}
	function getEdad(dateString) {
		let hoy = new Date();
		let fechaNacimiento = new Date(dateString);
		let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
		let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
		if (
			diferenciaMeses < 0 ||
			(diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
		) {
			edad--;
		}
		return edad;
	}
