// Copyright (c) 2021, orlando and contributors
// For license information, please see license.txt

frappe.ui.form.on('Garantes', {
	  refresh: function(frm) {
		frm.set_query("hoja_trabajo", function () {
			return {
				filters: {
					socio: frm.doc.socio
				}
			};
		});
	 },

	onload: function (frm) {
		frappe.call({
			method: "crediapp.crediapp.doctype.dpa.dpa.get_provincias",
			callback: (r) => {
				frm.set_df_property("provincia", "options", r.message);
				frm.refresh_field("provincia");

				frm.set_df_property("provincia_neg", "options", r.message);
				frm.refresh_field("provincia_neg");
			},
		});



		if (frm.doc.provincia) get_cantones(frm.doc.provincia, frm);
		if (frm.doc.provincia_neg) get_cantones_neg(frm.doc.provincia_neg, frm);
		if (frm.doc.canton_neg) get_parroquias_neg(frm.doc.canton_neg, frm);
		if (frm.doc.canton ) get_parroquias (frm.doc.canton , frm);
		if (frm.is_new()) {
			frm.add_child('garante_bienes', { detalle: 'CASA Y TERRENO', valor: 0 });
			frm.add_child('garante_bienes', { detalle: 'TERRENOS', valor: 0 });
		}
	},
	provincia(frm) {
		get_cantones(frm.doc.provincia, frm);
	},
	canton(frm) {
		get_parroquias(frm.doc.canton, frm);
	},
	provincia_neg(frm) {
		get_cantones_neg(frm.doc.provincia_neg, frm);
	},
	canton_neg(frm) {
		get_parroquias_neg(frm.doc.canton_neg, frm);
	},
	activodis(frm) {
		sumaBalance( );
	}
	,
	activofijo(frm) {
		sumaBalance( );
	}
	,
	pasivo(frm) {
		sumaBalance( );
	}
	,
	ingresos(frm) {
		sumaEstadoResultado( );
	}
	,
	otros_ingresos(frm) {
		sumaEstadoResultado( );
	}
	,
	cuota_de_deudas(frm) {
		sumaEstadoResultado( );
	}
	,
	consumo_familiar(frm) {
		sumaEstadoResultado( );
	}
});

frappe.ui.form.on("garante_bienes", {
	valor: function (frm, cdt, cdn) {
		calcular();
	},
	garante_bienes_remove(frm) {
		calcular();
	}
});
function sumaBalance(){
	cur_frm.doc.patrimonio = cur_frm.doc.activodis  + cur_frm.doc.activofijo  - cur_frm.doc.pasivo  ;
	cur_frm.refresh_fields();	
}
function sumaEstadoResultado(){
	cur_frm.doc.saldo_disponible = cur_frm.doc.ingresos  + cur_frm.doc.otros_ingresos  - cur_frm.doc.cuota_de_deudas - cur_frm.doc.consumo_familiar  ;
	cur_frm.refresh_fields();	
}
function calcular() {
	let suma = 0;
	$.each(cur_frm.doc.garante_bienes, function (i, row) {
		suma += row.valor;
	});

	cur_frm.doc.totalbienes = suma;
	cur_frm.refresh_fields();
}



function get_cantones(incod_prov, frm) {
	frappe.call({
		method: "crediapp.crediapp.doctype.dpa.dpa.get_cantones",
		args: { cod_prov: incod_prov },
		callback: (r) => {
			frm.set_df_property("canton", "options", r.message);
			frm.refresh_field("canton");
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


function get_cantones_neg(incod_prov, frm) {
	frappe.call({
		method: "crediapp.crediapp.doctype.dpa.dpa.get_cantones",
		args: { cod_prov: incod_prov },
		callback: (r) => {
			frm.set_df_property("canton_neg", "options", r.message);
			frm.refresh_field("canton_neg");
		},
	});
}

function get_parroquias_neg(incod_prov, frm) {
	frappe.call({
		method: "crediapp.crediapp.doctype.dpa.dpa.get_parroquia",
		args: { cod_can: incod_prov },
		callback: (r) => {
			frm.set_df_property("parroquia_neg", "options", r.message);
			frm.refresh_field("parroquia_neg");
		},
	});
}
