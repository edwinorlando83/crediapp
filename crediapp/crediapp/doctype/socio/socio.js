// Copyright (c) 2021, orlando and contributors
// For license information, please see license.txt

frappe.ui.form.on('Socio', {
	refresh: function (frm) {
		calcular(frm);
	},
	onload:function(frm){

		get_provincia(frm);
		if (frm.doc.provincia) get_cantones(frm.doc.provincia, frm, "canton");
		if (frm.doc.canton ) get_parroquias (frm.doc.canton , frm);
	},
	provincia:function(frm){
		get_cantones(frm.doc.provincia, frm, "canton");
	},
	onload_post_render: function (frm) {
		controlSoloNumeroEntero(frm.fields_dict.cedula);
		controlSoloNumeroEntero(frm.fields_dict.cedulaconyuge);

	},

	validate: function (frm) {
		if (validarCedula(frm.doc.cedula) == 0) {

			frappe.throw("Cedula incorrecto del socio");
		}


		if (frm.doc.cedulaconyuge && validarCedula(frm.doc.cedulaconyuge) == 0) {

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



function get_provincia(  frm) {
	frappe.call({
		 
		method: "crediapp.crediapp.doctype.dpa.dpa.get_provincias",
		callback: (r) => {
		  frm.set_df_property("provincia", "options", r.message);
		  frm.set_df_property("emp_provincia", "options", r.message);
		  frm.set_df_property("cony_provincia", "options", r.message);
		  frm.set_df_property("prov_emp_cony", "options", r.message);
		  frm.refresh_field("provincia");
		  frm.refresh_field("emp_provincia");
		  frm.refresh_field("cony_provincia");
		  frm.refresh_field("prov_emp_cony");

		},
	  });
  }

function get_cantones(incod_prov, frm, control) {
	frappe.call({
	  method: "crediapp.crediapp.doctype.dpa.dpa.get_cantones",
	  args: { cod_prov: incod_prov },
	  callback: (r) => {
		frm.set_df_property(control, "options", r.message);
		frm.refresh_field(control);
	  },
	});
  }

  function get_parroquias(incod_prov, frm) {
	frappe.call({
	  method: "crediapp.crediapp.doctype.dpa.dpa.get_parroquia",
	  args: { cod_can: incod_prov },
	  callback: (r) => {
		frm.set_df_property("parroquia", "options", r.message);
		frm.refresh_field("parroquia");
	  },
	});
  }
