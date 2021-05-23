// Copyright (c) 2021, orlando and contributors
// For license information, please see license.txt

frappe.ui.form.on('solicitud_credito', {
	refresh: function (frm) {
		cur_frm.fields_dict["solicitud_credito_activo"].grid.wrapper.find('.grid-add-row').hide();
		cur_frm.fields_dict["solicitud_credito_pasivo"].grid.wrapper.find('.grid-add-row').hide();
		cur_frm.fields_dict["solicitud_credito_ingresos"].grid.wrapper.find('.grid-add-row').hide();
		cur_frm.fields_dict["solicitud_credito_gastos"].grid.wrapper.find('.grid-add-row').hide();

	},
	onload: function (frm) {
		if (frm.is_new()) {
			frm.add_child('solicitud_credito_activo', { detalle: 'Caja', deudor: 0, conyuge: 0 });
			frm.add_child('solicitud_credito_activo', { detalle: 'Banco', deudor: 0, conyuge: 0 });
			frm.add_child('solicitud_credito_activo', { detalle: 'Cuentas/doc por cobrar', deudor: 0, conyuge: 0 });
			frm.add_child('solicitud_credito_activo', { detalle: 'Inversión plazo fijo', deudor: 0, conyuge: 0 });
			frm.add_child('solicitud_credito_activo', { detalle: 'Vivienda', deudor: 0, conyuge: 0 });
			frm.add_child('solicitud_credito_activo', { detalle: 'Terreno', deudor: 0, conyuge: 0 });
			frm.add_child('solicitud_credito_activo', { detalle: 'Vehiculo', deudor: 0, conyuge: 0 });
			frm.add_child('solicitud_credito_activo', { detalle: 'Maquinaria Pesada', deudor: 0, conyuge: 0 });
			frm.add_child('solicitud_credito_activo', { detalle: 'Muebles y enseres', deudor: 0, conyuge: 0 });
			frm.add_child('solicitud_credito_activo', { detalle: 'Acciones', deudor: 0, conyuge: 0 });
			frm.add_child('solicitud_credito_activo', { detalle: 'Ganaderia u Otros', deudor: 0, conyuge: 0 });
			frm.add_child('solicitud_credito_activo', { detalle: 'Otros Bienes', deudor: 0, conyuge: 0 });

			frm.add_child('solicitud_credito_pasivo', { detalle: 'Deudas financieras a corto plazo (Saldo en nuestra institución)', valores: 0, tipo: 'CORTO PLAZO' });
			frm.add_child('solicitud_credito_pasivo', { detalle: 'Doc. o cuentas por pagar a corto plazo', valores: 0, tipo: 'CORTO PLAZO' });
			frm.add_child('solicitud_credito_pasivo', { detalle: 'Deudas financieras a largo plazo', valores: 0, tipo: 'LARGO PLAZO' });
			frm.add_child('solicitud_credito_pasivo', { detalle: 'Doc. o cuentas por pagar a largo plazo', valores: 0, tipo: 'LARGO PLAZO' });


			frm.add_child('solicitud_credito_ingresos', { detalle: 'Utilidad del Negocio', deudor: 0, conyuge: 0 });
			frm.add_child('solicitud_credito_ingresos', { detalle: 'Otros ingresos por Negocio', deudor: 0, conyuge: 0 });
			frm.add_child('solicitud_credito_ingresos', { detalle: 'Sueldo mensual por empleo', deudor: 0, conyuge: 0 });
			frm.add_child('solicitud_credito_ingresos', { detalle: 'Otros ingresos por empleo', deudor: 0, conyuge: 0 });
			frm.add_child('solicitud_credito_ingresos', { detalle: 'Arriendo', deudor: 0, conyuge: 0 });
			frm.add_child('solicitud_credito_ingresos', { detalle: 'Pensiones o jubiliaciones', deudor: 0, conyuge: 0 });
			frm.add_child('solicitud_credito_ingresos', { detalle: 'Intereses x inversiones', deudor: 0, conyuge: 0 });
			frm.add_child('solicitud_credito_ingresos', { detalle: 'Otros', deudor: 0, conyuge: 0 });

			frm.add_child('solicitud_credito_gastos', { detalle: 'Deudas financieras', valor: 0 });
			frm.add_child('solicitud_credito_gastos', { detalle: 'Alimentación', valor: 0 });
			frm.add_child('solicitud_credito_gastos', { detalle: 'Luz y Agua', valor: 0 });
			frm.add_child('solicitud_credito_gastos', { detalle: 'Teléfono Convencional + Internet ', valor: 0 });
			frm.add_child('solicitud_credito_gastos', { detalle: 'Planes mensuales de celulares', valor: 0 });
			frm.add_child('solicitud_credito_gastos', { detalle: 'Educación', valor: 0 });
			frm.add_child('solicitud_credito_gastos', { detalle: 'Combustible para Vehículos', valor: 0 });
			frm.add_child('solicitud_credito_gastos', { detalle: 'Transporte (Pasajes)', valor: 0 });
			frm.add_child('solicitud_credito_gastos', { detalle: 'Salud', valor: 0 });
			frm.add_child('solicitud_credito_gastos', { detalle: 'Vestimenta', valor: 0 });
			frm.add_child('solicitud_credito_gastos', { detalle: 'Gastos fines de semana', valor: 0 });
			frm.add_child('solicitud_credito_gastos', { detalle: 'Gastos Varios', valor: 0 });
			frm.add_child('solicitud_credito_gastos', { detalle: 'Otros', valor: 0 });


		}
	}
});
frappe.ui.form.on("solicitud_credito_activo", {
	deudor: function (frm, cdt, cdn) {
		sumaActivos();
	},
	conyuge: function (frm, cdt, cdn) {
		sumaActivos();
	},
});
frappe.ui.form.on("solicitud_credito_pasivo", {
	valores: function (frm, cdt, cdn) {
		sumaPasivos();
	} 
});

frappe.ui.form.on("solicitud_credito_ingresos", {
	deudor: function (frm, cdt, cdn) {
		sumaIngresos();
	},
	conyuge: function (frm, cdt, cdn) {
		sumaIngresos();
	},
});
frappe.ui.form.on("solicitud_credito_gastos", {
	valor: function (frm, cdt, cdn) {
		sumaGastos();
	} 
});
function sumaActivos() {
	let t_total1 = 0;
	let t_total2 = 0;
	$.each(cur_frm.doc.solicitud_credito_activo, function (i, row) {
		t_total1 += row.deudor;
		t_total2 += row.conyuge;
	});
	cur_frm.doc.total_activos_deudor = t_total1;
	cur_frm.doc.total_activos_conyuge = t_total2;
	cur_frm.refresh_field('total_activos_html');
}
function sumaIngresos() {
	let t_total1 = 0;
	let t_total2 = 0;
	$.each(cur_frm.doc.solicitud_credito_ingresos, function (i, row) {
		t_total1 += row.deudor;
		t_total2 += row.conyuge;
	});
	cur_frm.doc.total_ingresos_d = t_total1;
	cur_frm.doc.total_ingresos_c = t_total2;
	cur_frm.refresh_field('html_ingresos');
}

function sumaPasivos() {
	let t_total1 = 0;
	let t_total2 = 0;
	$.each(cur_frm.doc.solicitud_credito_pasivo, function (i, row) {

		if( row.tipo == 'CORTO PLAZO' )
		t_total1 += row.valores;
		else
		t_total2 += row.valores;
	});
	cur_frm.doc.tot_pas_lar = t_total2;
	cur_frm.doc.tot_pas_cor = t_total1;
	cur_frm.refresh_field('html_totalpasivo');
}

function sumaGastos() {
	let t_total1 = 0;
 
	$.each(cur_frm.doc.solicitud_credito_gastos, function (i, row) {

		 
		t_total1 += row.valor;
	 
	});
	cur_frm.doc.total_gastos = t_total1;
 
	cur_frm.refresh_field('html_total_gastos');
}