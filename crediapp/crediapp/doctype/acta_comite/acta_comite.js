// Copyright (c) 2021, orlando and contributors
// For license information, please see license.txt

frappe.ui.form.on('acta_comite', {
	refresh: function (frm) {
		frm.set_query("hoja_trabajo", function () {
			return {
				filters: {
					socio: frm.doc.socio
				}
			};
		});
	},
	onload(frm) {

		if (frm.is_new()) {

			frappe.db.get_list('tipos_comentarios', {
				fields: ['name', 'detalle'],
				filters: {
					desabilitado: 0
				}
			}).then(records => {

				for (var row of records) {
					console.log(row.name);
					frm.add_child('acta_comite_comentarios', { tipos_comentarios: row.name, comentario: '' });
				}
				frm.refresh_fields();
			});


		}
	},
	monto_aprobado1(frm) {
		frm.doc.monto_aprobado = frm.doc.monto_aprobado1;
		frm.refresh_fields();
	},
	hoja_trabajo(frm) {

		frappe.db.get_list('Garantes', {
			fields: ['name', 'ci_g', 'conyuge', 'ci_conyuge'],
			filters: {
				hoja_trabajo: frm.doc.hoja_trabajo
			}
		}).then(records => {

			for (var row of records) {
				console.log(row.name);
				frm.add_child('acta_comite_garantes', { garante: row.name, conyuge: row.conyuge, ci1: row.ci_g, ci2: row.ci_conyuge });
			}
			frm.refresh_fields();
		});

		frappe.db.get_doc('hoja_trabajo', frm.doc.hoja_trabajo)
			.then(doc => {
				frm.doc.cuota = doc.cuota;
				frm.doc.monto_aprobado1 = doc.monto;
				frm.doc.plazo = doc.plazo;
				frm.refresh_fields();
			})

	}

});
