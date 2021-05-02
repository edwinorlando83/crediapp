// Copyright (c) 2021, orlando and contributors
// For license information, please see license.txt

frappe.ui.form.on('hoja_trabajo', {

	onload_post_render: function () {
		eventoColapsar();
	},
	refresh: function (frm) {
		cur_frm.fields_dict["frecuencia_compras"].grid.wrapper.find('.grid-add-row').hide();

		cur_frm.fields_dict["auxiliar_ventas"].grid.wrapper.find('.grid-add-row').hide();
		cur_frm.fields_dict["flujo_ingreso_gastos"].grid.wrapper.find('.grid-add-row').hide();
		cur_frm.fields_dict["auxiliar_ventas_sec"].grid.wrapper.find('.grid-add-row').hide();
		//cur_frm.fields_dict["frecuencia_compras"].grid.add_custom_button('Add Time Slots');

		cur_frm.fields_dict["flujo_ingresos_integral"].grid.wrapper.find('.grid-add-row').hide();
		cur_frm.fields_dict["gastos_familiares"].grid.wrapper.find('.grid-add-row').hide();
		initEvents();


		verificarExpandido();
	},
	onload(frm) {

		frm.set_query("asesor", function () {
			return {
				filters: {
					agencias: frm.doc.agencias
				}
			};
		});



		//frm.get_field("frecuencia_compras").grid.only_sortable();
		if (frm.is_new()) {
			frm.add_child('auxiliar_ventas_sec', { frecuencia: 'VENTAS DIARIAS', valor: 0, tiempo: 0, total: 0 });
			frm.add_child('auxiliar_ventas_sec', { frecuencia: 'VENTAS SEMANALES', valor: 0, tiempo: 0, total: 0 });
			frm.add_child('auxiliar_ventas_sec', { frecuencia: 'VENTAS A CREDITO SEMANAL', valor: 0, tiempo: 0, total: 0 });
			frm.add_child('auxiliar_ventas', { frecuencia: 'VENTAS DIARIAS', valor: 0, tiempo: 0, total: 0 });
			frm.add_child('auxiliar_ventas', { frecuencia: 'VENTAS SEMANALES', valor: 0, tiempo: 0, total: 0 });
			frm.add_child('auxiliar_ventas', { frecuencia: 'VENTAS A CREDITO SEMANAL', valor: 0, tiempo: 0, total: 0 });

			frm.add_child('frecuencia_compras', { frecuencia: 'COMPRAS DIARIAS', valor: 0, dias: 0, total: 0 });
			frm.add_child('frecuencia_compras', { frecuencia: 'COMPRAS SEMANALES', valor: 0, dias: 0, total: 0 });
			frm.add_child('frecuencia_compras', { frecuencia: 'COMPRA A CREDITO SEMANAL', valor: 0, dias: 0, total: 0 });

			frm.add_child('frecuencia_compras_sec', { frecuencia: 'COMPRAS DIARIAS', valor: 0, dias: 0, total: 0 });
			frm.add_child('frecuencia_compras_sec', { frecuencia: 'COMPRAS SEMANALES', valor: 0, dias: 0, total: 0 });
			frm.add_child('frecuencia_compras_sec', { frecuencia: 'COMPRA A CREDITO SEMANAL', valor: 0, dias: 0, total: 0 });

			frm.add_child('flujo_ingresos_integral', { detalle: 'Ingreso Negocio', valor: 0 });
			frm.add_child('flujo_ingresos_integral', { detalle: 'Sueldo Mensual', valor: 0 });
			frm.add_child('flujo_ingresos_integral', { detalle: 'Sueldo Conyugue', valor: 0 });
			frm.add_child('flujo_ingresos_integral', { detalle: 'Ingresos Complementarios', valor: 0 });
			frm.add_child('flujo_ingresos_integral', { detalle: 'Otros ingresos', valor: 0 });

			frm.add_child('gastos_familiares', { detalle: 'Alimentación', valor: 0 });
			frm.add_child('gastos_familiares', { detalle: 'Educación', valor: 0 });
			frm.add_child('gastos_familiares', { detalle: 'Arriendo', valor: 0 });
			frm.add_child('gastos_familiares', { detalle: 'Transporte', valor: 0 });
			frm.add_child('gastos_familiares', { detalle: 'Servicios Básicos', valor: 0 });
			frm.add_child('gastos_familiares', { detalle: 'Salud', valor: 0 });
			frm.add_child('gastos_familiares', { detalle: 'Otros', valor: 0 });


			//flujo_ingreso

			frm.add_child('flujo_ingreso_gastos', { descripcion: 'Arriendo', actividad1: 0, actividad2: 0, total: 0 });
			frm.add_child('flujo_ingreso_gastos', { descripcion: 'Servicios Básicos', actividad1: 0, actividad2: 0, total: 0 });
			frm.add_child('flujo_ingreso_gastos', { descripcion: 'Transporte', actividad1: 0, actividad2: 0, total: 0 });
			frm.add_child('flujo_ingreso_gastos', { descripcion: 'Mano de Obra', actividad1: 0, actividad2: 0, total: 0 });
			frm.add_child('flujo_ingreso_gastos', { descripcion: 'Viaticos', actividad1: 0, actividad2: 0, total: 0 });
			frm.add_child('flujo_ingreso_gastos', { descripcion: 'Otros', actividad1: 0, actividad2: 0, total: 0 });

		}
		else {

			sessionStorage.setItem(frm.doc.name, '0');
		}



	},
	sec00act(frm) {
		alert('ddd');
	},
	efectivo: function (frm) {
		calcular_total_disponible(frm);
	},
	bancos: function (frm) {
		calcular_total_disponible(frm);
	},
	inversiones: function (frm) {
		calcular_total_disponible(frm);
	},
	otros: function (frm) {
		calcular_total_disponible(frm);
	}

	, enero() { sumarmeses(); }
	, febrero() { sumarmeses(); }
	, marzo() { sumarmeses(); }
	, abril() { sumarmeses(); }
	, mayo() { sumarmeses(); }
	, junio() { sumarmeses(); }
	, julio() { sumarmeses(); }
	, agosto() { sumarmeses(); }
	, septiembre() { sumarmeses(); }
	, noviembre() { sumarmeses(); }
	, diciembre() { sumarmeses(); }

	, enero_s() { sumarmeses2(); }
	, febrero_s() { sumarmeses2(); }
	, marzo_s() { sumarmeses2(); }
	, abril_s() { sumarmeses2(); }
	, mayo_s() { sumarmeses2(); }
	, junio_s() { sumarmeses2(); }
	, julio_s() { sumarmeses2(); }
	, agosto_s() { sumarmeses2(); }
	, septiembre_s() { sumarmeses2(); }
	, noviembre_s() { sumarmeses2(); }
	, diciembre_s() { sumarmeses2(); }

	, ingventas_act1(frm) {
		calcular_1act(frm);
		calcular_ingresos_del_negocio(frm);
	},


	ingventas_act2(frm) {
		calcular_ingresos_del_negocio2(frm);
		calcular_1act2(frm);

	}
	, compras_act1(frm) {
		calcular_ingresos_del_negocio(frm);
	}


	, compras_act2(frm) {
		calcular_ingresos_del_negocio2(frm);
	},

	gastos_act1(frm) {
		calcular_gastos_total(frm);
	},
	gastos_act2(frm) {
		calcular_gastos_total(frm);
	}
});

function initEvents() {
	$(document).find("[name='bt1']").on("click", function () {
		ocultartodos();

	});
}

function ocultar() {


}
function mostrar_inventario() {
	cur_frm.set_df_property("otros", "hidden", 0);
}
//promedio_costo_s
function calcular_gastos_total(frm) {
	frm.doc.gastos_act3 = frm.doc.gastos_act1 + frm.doc.gastos_act2;
	frm.refresh_field('gastos_act3');

}

function calcular_1act(frm) {
	frm.doc.costo_act1 = frm.doc.promedio_costo * frm.doc.ingventas_act1 / 100;
	frm.refresh_field('costo_act1');

	calculo_costo_act3(frm);

}
function calcular_1act2(frm) {

	frm.doc.costo_act2 = frm.doc.promedio_costo * frm.doc.ingventas_act2 / 100;
	frm.refresh_field('costo_act2');

	calculo_costo_act3(frm);
}
function calcular_ingresos_del_negocio(frm) {
	frm.doc.ingre_act1 = frm.doc.ingventas_act1 - frm.doc.compras_act1;
	frm.doc.ingre_act3 = frm.doc.ingre_act1 + frm.doc.ingre_act2;
	frm.doc.ingventas_act3 = frm.doc.ingventas_act1 + frm.doc.ingventas_act2;
	frm.doc.compras_act3 = frm.doc.compras_act2 + frm.doc.compras_act1;

	frm.refresh_field('ingre_act1');
	frm.refresh_field('ingre_act3');
	frm.refresh_field('ingventas_act3');
	frm.refresh_field('compras_act3');
	calcular_utilida_negocio();

}
function calcular_ingresos_del_negocio2(frm) {
	frm.doc.ingre_act2 = frm.doc.ingventas_act2 - frm.doc.compras_act2;
	frm.doc.ingre_act3 = frm.doc.ingre_act1 + frm.doc.ingre_act2;
	frm.doc.ingventas_act3 = frm.doc.ingventas_act1 + frm.doc.ingventas_act2;
	frm.doc.compras_act3 = frm.doc.compras_act2 + frm.doc.compras_act1;

	frm.refresh_field('ingre_act2');
	frm.refresh_field('ingre_act3');
	frm.refresh_field('ingventas_act3');
	frm.refresh_field('compras_act3');
	calcular_utilida_negocio();

}
function calcular_utilida_negocio() {
	cur_frm.doc.utn_1 = cur_frm.doc.ingre_act1 - cur_frm.doc.gastos_act1;
	cur_frm.doc.utn_2 = cur_frm.doc.ingre_act2 - cur_frm.doc.gastos_act2;
	cur_frm.doc.utn_3 = cur_frm.doc.utn_1 + cur_frm.doc.utn_2;
	cur_frm.refresh_field('utn_1');
	cur_frm.refresh_field('utn_2');
	cur_frm.refresh_field('utn_3');
	cur_frm.refresh_field('html_promedio_flujo');


	cur_frm.get_field("flujo_ingresos_integral").grid.grid_rows[0].doc.valor = cur_frm.doc.utn_3;

	calcular_flujo_ingresos_integral();

	cur_frm.refresh_field('flujo_ingresos_integral');
}
frappe.ui.form.on("flujo_ingresos_integral", {
	valor: function (frm, cdt, cdn) {
		calcular_flujo_ingresos_integral();
	}
});

function calcular_flujo_ingresos_integral() {
	var t_total = 0;
	$.each(cur_frm.doc.flujo_ingresos_integral, function (i, row) {
		t_total += row.valor;
	});

	cur_frm.doc.total_flujo_ingresos_integral = cur_frm.doc.val_ingreso_negocio + t_total;
	cur_frm.refresh_field('total_flujo_ingresos_integral');
	cur_frm.refresh_field('html_flujo_ingresos_integral');

}
frappe.ui.form.on("gastos_familiares", {
	valor: function (frm, cdt, cdn) {
		var t_total = 0;
		$.each(cur_frm.doc.gastos_familiares, function (i, row) {
			t_total += row.valor;
		});
		cur_frm.doc.total_gastos_familiares = t_total;
		cur_frm.refresh_field('gastos_familiares');
		cur_frm.refresh_field('total_gastos_familiares');
		cur_frm.refresh_field('html_gastos_familiares');
	}
});



frappe.ui.form.on("cuenta_por_cobrar", {
	monto_inical: function (frm, cdt, cdn) {
		const doc = frappe.get_doc(cdt, cdn);
		calcular_CUENTASPORCOBRAR(frm);
	},
	saldo: function (frm, cdt, cdn) {
		const doc = frappe.get_doc(cdt, cdn);
		calcular_CUENTASPORCOBRAR(frm);
	},
	cuenta_por_cobrar_remove: function (frm) {
		calcular_CUENTASPORCOBRAR(frm);
	},
});

frappe.ui.form.on("mercaderia", {
	costo: function (frm, cdt, cdn) {
		const doc = frappe.get_doc(cdt, cdn);
		calcular_MERCADERIA(frm);
	},
	cantidad: function (frm, cdt, cdn) {
		const doc = frappe.get_doc(cdt, cdn);
		calcular_MERCADERIA(frm);
	},
	mercaderia_remove: function (frm) {
		calcular_MERCADERIA(frm);
	},
});

frappe.ui.form.on("muebles_enseres", {
	numero: function (frm, cdt, cdn) {
		const doc = frappe.get_doc(cdt, cdn);
		calcular_MUEBLES_ENSERES(frm);
	},
	vunitario: function (frm, cdt, cdn) {
		const doc = frappe.get_doc(cdt, cdn);
		calcular_MUEBLES_ENSERES(frm);
	},
	muebles_enseres_remove: function (frm) {
		calcular_MUEBLES_ENSERES(frm);
	}
});

frappe.ui.form.on("maquinaria_equipo", {
	numero: function (frm, cdt, cdn) {
		calcular_MAQUINARIA(frm);
	},
	vunitario: function (frm, cdt, cdn) {
		calcular_MAQUINARIA(frm);
	},
	maquinaria_equipo_remove: function (frm) {
		calcular_MAQUINARIA(frm);
	}
});

frappe.ui.form.on("terrenos_casas", {
	avaluo: function (frm, cdt, cdn) {
		calcular_TERRENOS(frm);
	},
	terrenos_casas_remove: function (frm) {
		calcular_TERRENOS(frm);
	}
});

frappe.ui.form.on("vehiculo", {
	avaluo: function (frm, cdt, cdn) {
		calcular_vehiculo(frm);
	},
	vehiculo_remove: function (frm) {
		calcular_vehiculo(frm);
	}
});

frappe.ui.form.on("otro_activos", {
	cantidad(frm, cdt, cdn) {
		calcular_otro_activos();
	},
	costo(frm, cdt, cdn) {
		calcular_otro_activos();
	}
	,
	otro_activos_remove: function (frm) {
		calcular_otro_activos(frm);
	}
});

frappe.ui.form.on("activos_familiares", {

	total(frm, cdt, cdn) {
		calcular_activos_familiares();
	}
	,
	activos_familiares_remove: function (frm) {
		calcular_activos_familiares(frm);
	}
});
frappe.ui.form.on("auxiliar_ventas", {
	valor(frm, cdt, cdn) {
		calcular_auxiliar_ventas();
	},
	tiempo(frm, cdt, cdn) {
		calcular_auxiliar_ventas();
	}
});


frappe.ui.form.on("cuentasporcobrar", {
	monto(frm, cdt, cdn) {
		calcular_cuentasporcobrar();
	},
	cuentasporcobrar_remove: function (frm) {
		calcular_cuentasporcobrar();
	}
});

frappe.ui.form.on("prestamos", {
	saldo(frm, cdt, cdn) {
		calcular_prestamos();
	}
	,
	prestamos_remove: function (frm) {
		calcular_prestamos();
	}
});

frappe.ui.form.on("prestamos_largoplazo", {
	saldo(frm, cdt, cdn) {
		calcular_prestamos_largoplazo();
	}
	,
	prestamos_largoplazo_remove: function (frm) {
		calcular_prestamos_largoplazo();
	}
});

frappe.ui.form.on("otros_pasivos", {
	monto(frm, cdt, cdn) {
		calcular_otros_pasivos();
	}
	,
	otros_pasivos_remove: function (frm) {
		calcular_otros_pasivos();
	}
});


frappe.ui.form.on("margen_ganancias", {
	preciocompra(frm, cdt, cdn) {
		calcular_costo_venta();
	},
	precioventa(frm, cdt, cdn) {
		calcular_costo_venta();
	},
 	margen_ganancias_remove: function (frm) {
		calcular_costo_venta(frm);
	}
});

frappe.ui.form.on("margen_ganancias_sec", {
	preciocompra(frm, cdt, cdn) {
		calcular_costo_venta_s();
	},
	precioventa(frm, cdt, cdn) {
		calcular_costo_venta_s();
	}
	, 
	margen_ganancias_sec_remove: function (frm) {
		calcular_costo_venta_s( );
	}
});

frappe.ui.form.on("frecuencia_compras", {
	valor(frm, cdt, cdn) {
		calcular_frecuencia_compras();
	},
	dias(frm, cdt, cdn) {
		calcular_frecuencia_compras();
	}
	, 
	frecuencia_compras_remove: function (frm) {
		calcular_frecuencia_compras( );
	}
});

frappe.ui.form.on("frecuencia_compras_sec", {
	valor(frm, cdt, cdn) {
		calcular_frecuencia_compras_sec();
	},
	dias(frm, cdt, cdn) {
		calcular_frecuencia_compras_sec();
	}
	, 
	frecuencia_compras_sec_remove: function (frm) {
		calcular_frecuencia_compras_sec( );
	}
});


frappe.ui.form.on("productos_aux_compras", {
	valor(frm, cdt, cdn) {
		calcular_productos_aux_compras();
	},
	cantidad(frm, cdt, cdn) {
		calcular_productos_aux_compras();
	}
	, 
	productos_aux_compras_remove: function (frm) {
		calcular_productos_aux_compras( );
	}
});
frappe.ui.form.on("productos_aux_compras_sec", {
	valor(frm, cdt, cdn) {
		calcular_productos_aux_compras_sec();
	},
	cantidad(frm, cdt, cdn) {
		calcular_productos_aux_compras_sec();
	}
	, 
	productos_aux_compras_sec_remove: function (frm) {
		calcular_productos_aux_compras_sec( );
	}
});

frappe.ui.form.on("auxiliar_ventas_sec", {
	valor(frm, cdt, cdn) {
		calcular_auxiliar_ventas_sec();
	},
	tiempo(frm, cdt, cdn) {
		calcular_auxiliar_ventas_sec();
	}, 
	auxiliar_ventas_sec_remove: function (frm) {
		calcular_auxiliar_ventas_sec( );
	}
});

frappe.ui.form.on("flujo_ingreso_gastos", {
	actividad1(frm, cdt, cdn) {
		calcular_flujo_ingreso_gastos();
	},
	actividad2(frm, cdt, cdn) {
		calcular_flujo_ingreso_gastos();
	},
	total(frm, cdt, cdn) {
		calcular_flujo_ingreso_gastos();
	}
	, 
	flujo_ingreso_gastos_remove: function (frm) {
		calcular_flujo_ingreso_gastos( );
	}
});



function calcular_flujo_ingreso_gastos() {
	var t_total1 = 0;
	var t_total2 = 0;
	var t_total3 = 0;
	$.each(cur_frm.doc.flujo_ingreso_gastos, function (i, row) {
		//var s_total = row.valor * row.tiempo;
		//row.total = s_total;
		t_total1 += row.actividad1;
		t_total2 += row.actividad2;
		row.total = row.actividad1 + row.actividad2;
		t_total3 += row.total;
	});
	cur_frm.doc.gastos_act1 = t_total1;
	cur_frm.doc.gastos_act2 = t_total2;
	cur_frm.doc.gastos_act3 = t_total3;
	cur_frm.refresh_field('gastos_act1');
	cur_frm.refresh_field('gastos_act2');
	cur_frm.refresh_field('gastos_act3');
	cur_frm.refresh_field('flujo_ingreso_gastos');

	calcular_utilida_negocio();
}


function calcular_auxiliar_ventas_sec() {
	var t_total = 0;
	$.each(cur_frm.doc.auxiliar_ventas_sec, function (i, row) {
		var s_total = row.valor * row.tiempo;
		row.total = s_total;
		t_total += s_total;
	});
	cur_frm.doc.auxiliar_ventas_sec_total = t_total;
	cur_frm.refresh_field('auxiliar_ventas_sec');
	cur_frm.refresh_field('auxiliar_ventas_sec_total');
	cur_frm.refresh_field('auxiliar_ventas_sec_html');
}


function calcular_productos_aux_compras() {
	var t_total = 0;
	$.each(cur_frm.doc.productos_aux_compras, function (i, row) {
		row.total = row.valor * row.cantidad;
		t_total += row.total;

	});
	cur_frm.doc.total_productos_aux_compras = t_total;
	cur_frm.refresh_field('productos_aux_compras');
	cur_frm.refresh_field('total_productos_aux_compras');
	cur_frm.refresh_field('html_productos_aux_compras');
}


function calcular_productos_aux_compras_sec() {
	var t_total = 0;
	$.each(cur_frm.doc.productos_aux_compras_sec, function (i, row) {
		row.total = row.valor * row.cantidad;
		t_total += row.total;

	});
	cur_frm.doc.total_aux_com_sec = t_total;
	cur_frm.refresh_field('htmltotal_aux_com_sec');
	cur_frm.refresh_field('productos_aux_compras_sec');
	cur_frm.refresh_field('total_aux_com_sec');
}


function calcular_frecuencia_compras() {
	var t_total = 0;
	$.each(cur_frm.doc.frecuencia_compras, function (i, row) {
		row.total = row.valor * row.dias;

		t_total += row.total;

	});

	cur_frm.doc.total_frecuencia_compras = t_total;
	cur_frm.refresh_field('total_frecuencia_compras_html');
	cur_frm.refresh_field('total_frecuencia_compras');
	cur_frm.refresh_field('frecuencia_compras');
}

function calcular_frecuencia_compras_sec() {
	var t_total = 0;
	$.each(cur_frm.doc.frecuencia_compras_sec, function (i, row) {
		row.total = row.valor * row.dias;
		t_total += row.total;
	});

	cur_frm.doc.total_fc_s = t_total;


	cur_frm.refresh_field('htmltotal_fc_s');
	cur_frm.refresh_field('total_fc_s');
	cur_frm.refresh_field('frecuencia_compras_sec');

}


function calcular_costo_venta() {
	var t_total = 0;
	var t_total2 = 0;
	var _count = 0;
	$.each(cur_frm.doc.margen_ganancias, function (i, row) {
		var s_total = (row.preciocompra / row.precioventa) * 100;
		row.costo = roundNumber(s_total, 2);
		row.utilidad = 100 - row.costo;
		t_total += row.utilidad;
		t_total2 += row.costo;
		_count++;
	});

	cur_frm.doc.promedio_utilidad = roundNumber(t_total / _count, 2);
	cur_frm.doc.promedio_costo = roundNumber(t_total2 / _count, 2);


	cur_frm.refresh_field('margen_ganancias');
	cur_frm.refresh_field('promedio_utilidad');
	cur_frm.refresh_field('promedio_costo');
	cur_frm.refresh_field('html_promedio_uticos');

}

function calcular_costo_venta_s() {
	var t_total = 0;
	var t_total2 = 0;
	var _count = 0;
	$.each(cur_frm.doc.margen_ganancias_sec, function (i, row) {
		var s_total = (row.preciocompra / row.precioventa) * 100;
		row.costo = roundNumber(s_total, 2);
		row.utilidad = 100 - row.costo;
		t_total += row.utilidad;
		t_total2 += row.costo;
		_count++;
	});

	if(t_total == 0){
		cur_frm.doc.promedio_utilidad_s = 0;
		cur_frm.doc.promedio_costo_s = 0;
	}
	else{
		cur_frm.doc.promedio_utilidad_s = roundNumber(t_total / _count, 2);
		cur_frm.doc.promedio_costo_s = roundNumber(t_total2 / _count, 2);
	}


	cur_frm.refresh_field('margen_ganancias_sec');
	cur_frm.refresh_field('promedio_utilidad_s');
	cur_frm.refresh_field('promedio_costo_s');
	cur_frm.refresh_field('html_margengan_s');

}

function calcular_otros_pasivos() {
	var t_total = 0;
	$.each(cur_frm.doc.otros_pasivos, function (i, row) {

		t_total += row.monto;
	});
	cur_frm.doc.total_otros_pasivos = t_total;


	cur_frm.refresh_field('total_otros_pasivos');
	cur_frm.refresh_field('total_otros_pasivos_html');
}
function calcular_prestamos_largoplazo() {
	var t_total = 0;
	var t_total_cuotas = 0;
	$.each(cur_frm.doc.prestamos_largoplazo, function (i, row) {

		t_total += row.saldo;

	});
	cur_frm.doc.total_prestamolargo = t_total;
	cur_frm.refresh_field('total_prestamolargo');
	cur_frm.refresh_field('total_prestamolargo_html');
	cur_frm.refresh_field('prestamos_largoplazo');
}
function calcular_prestamos() {
	var t_total = 0;
	$.each(cur_frm.doc.prestamos, function (i, row) {

		t_total += row.saldo;
	});
	cur_frm.doc.total_prestamos = t_total;
	cur_frm.refresh_field('prestamos');
	cur_frm.refresh_field('total_prestamos');
	cur_frm.refresh_field('total_prestamos_html');
}

function calcular_cuentasporcobrar() {
	var t_total = 0;
	$.each(cur_frm.doc.cuentasporcobrar, function (i, row) {
		t_total += row.monto;
	});
	cur_frm.doc.total_cuentasporcobrar = t_total;
 
	cur_frm.refresh_field('total_cuentasporcobrar');
	cur_frm.refresh_field('total_cuentasporcobrar_html');

}


function sumarmeses() {
	var total = cur_frm.doc.enero + cur_frm.doc.febrero + cur_frm.doc.marzo + cur_frm.doc.abril + cur_frm.doc.mayo
		+ cur_frm.doc.junio + cur_frm.doc.julio + cur_frm.doc.agosto + cur_frm.doc.septiembre + cur_frm.doc.octubre + cur_frm.doc.noviembre + cur_frm.doc.diciembre;

	cur_frm.doc.meses_total = total;
	cur_frm.doc.meses_promedio = total / 12;
	cur_frm.refresh_field('meses_total');
	cur_frm.refresh_field('meses_promedio');
}

function sumarmeses2() {
	var total = cur_frm.doc.enero_s + cur_frm.doc.febrero_s + cur_frm.doc.marzo_s + cur_frm.doc.abril_s + cur_frm.doc.mayo_s
		+ cur_frm.doc.junio_s + cur_frm.doc.julio_s + cur_frm.doc.agosto_s + cur_frm.doc.septiembre_s + cur_frm.doc.octubre_s + cur_frm.doc.noviembre_s + cur_frm.doc.diciembre_s;

	console.log("sumarmeses2==" + total);
	cur_frm.doc.total_s = total;
	cur_frm.doc.promedio_s = total / 12;
	cur_frm.refresh_field('total_s');
	cur_frm.refresh_field('promedio_s');
}

function calcular_total_disponible(frm) {
	frm.doc.total_disponible = frm.doc.efectivo + frm.doc.bancos + frm.doc.inversiones + frm.doc.otros;
	frm.refresh_field('total_disponible');
}


function calcular_auxiliar_ventas() {
	var t_total = 0;
	$.each(cur_frm.doc.auxiliar_ventas, function (i, row) {
		var s_total = row.valor * row.tiempo;
		row.total = s_total;
		t_total += s_total;
	});
	cur_frm.doc.total_auxiliar_ventas = t_total;
	cur_frm.refresh_field('auxiliar_ventas');
	cur_frm.refresh_field('total_auxiliar_ventas');
	cur_frm.refresh_field('total_auxiliar_ventas_html');
}

function calcular_activos_familiares() {
	var t_total = 0;
	$.each(cur_frm.doc.activos_familiares, function (i, row) {
		//var s_total = row.cantidad * row.avaluo;
		//row.total = s_total;
		t_total += row.total;
	});
	cur_frm.doc.total_activos_familiares = t_total;
	cur_frm.refresh_field('activos_familiares');
	cur_frm.refresh_field('total_activos_familiares');
	cur_frm.refresh_field('total_activos_familiares_html');
}

function calcular_otro_activos() {
	var t_total = 0;

	$.each(cur_frm.doc.otro_activos, function (i, row) {
		var s_total = row.cantidad * row.costo;
		row.total = s_total;
		t_total += s_total;
	});
	cur_frm.doc.total_otrosactivos = t_total;
	cur_frm.refresh_field('otro_activos');
	cur_frm.refresh_field('total_otrosactivos');
	cur_frm.refresh_field('total_otrosactivos_html');
}

function calcular_vehiculo(frm) {
	var t_total = 0;
	$.each(cur_frm.doc.vehiculo, function (i, row) {
		t_total += row.avaluo;
	});
	cur_frm.doc.total_vehiculo = t_total;
	cur_frm.refresh_field('vehiculo');
	cur_frm.refresh_field('total_vehiculo');
	cur_frm.refresh_field('total_vehiculo_html');
	

}

function calcular_TERRENOS(frm) {
	var t_total = 0;
	$.each(cur_frm.doc.terrenos_casas, function (i, row) {
		t_total += row.avaluo;
	});
	cur_frm.doc.total_terrenos = t_total;
	cur_frm.refresh_field('terrenos_casas');
	cur_frm.refresh_field('total_terrenos');
	cur_frm.refresh_field('total_terrenos_html');
}

function calcular_MAQUINARIA(frm) {
	var t_total = 0;
	$.each(cur_frm.doc.maquinaria_equipo, function (i, row) {
		var s_total = row.numero * row.vunitario;
		row.total = s_total;
		t_total += s_total;
	});
	cur_frm.doc.total_maquinaria = t_total;
	cur_frm.refresh_field('maquinaria_equipo');
	cur_frm.refresh_field('total_maquinaria');
	cur_frm.refresh_field('total_maquinaria_html');
}
function calcular_MUEBLES_ENSERES(frm) {
	var t_total = 0;

	$.each(cur_frm.doc.muebles_enseres, function (i, row) {
		var s_total = row.numero * row.vunitario;
		row.total = s_total;
		t_total += s_total;
	});
	cur_frm.doc.total_mueblesenseres = t_total;
	cur_frm.refresh_field('muebles_enseres');
	cur_frm.refresh_field('total_mueblesenseres');
	cur_frm.refresh_field('total_mueblesensereshtml');

}
function calcular_MERCADERIA(frm) {
	var t_total = 0;
	$.each(cur_frm.doc.mercaderia, function (i, row) {
		var s_total = row.cantidad * row.costo;
		row.total = s_total;
		t_total += s_total;
	});
	cur_frm.doc.total_inventario = t_total;
	cur_frm.refresh_field('mercaderia');
	cur_frm.refresh_field('total_inventario');
	cur_frm.refresh_field('total_inventario_html');

}

function calcular_CUENTASPORCOBRAR(frm) {
	var t_monto_inical = 0;
	var t_saldo = 0;
	$.each(cur_frm.doc.cuenta_por_cobrar, function (i, row) {
		t_monto_inical += row.monto_inical;
		t_saldo += row.saldo;
	});

	cur_frm.doc.total_inicial = t_monto_inical;
	cur_frm.doc.total_saldo = t_saldo;
	cur_frm.refresh_field('cuenta_por_cobrar');
	cur_frm.refresh_field('total_inicial');
	cur_frm.refresh_field('total_saldo');
	cur_frm.refresh_field('totales_html');
}
function calculo_costo_act3(frm) {
	frm.doc.costo_act3 = frm.doc.costo_act1 + frm.doc.costo_act3;
	frm.refresh_field('costo_act3');
}



function eventoColapsar() {

	/*	INVENTARIO sec_inventario    *
	ACTIVOS FIJOS DE NEGOCIO  sec_acfij *
	AUXILIAR DE PASIVOS sec_aux *
	ACTIVOS FIJOS FAMILIARES (CASA TERRENO VEHICULO) sec_actfam *
	ACTIVIDAD PRINCIPAL  sec00act *
	FLUJO DE VENTAS POR MES (ACTIVIDAD PRINCIPAL) sec_flujo *
	MARGEN DE GANANCIA Y COSTO DE VENTAS  sec_ *
	AUXILIAR DE COMPRAS sec_auxcompras *
	ACTIVIDAD SECUNDARIA secact2  *
	FLUJO DE VENTAS POR MES (ACTIVIDAD SECUNDARIA) section_break_115 *
	MARGEN DE GANANCIA Y COSTO DE VENTAS ACT SEC  sec_as  *
	FLUJO DE INGRESOS POR ACTIVIDAD secflujoingreso *
	GASTOS DEL NEGOCIO gastos_act1 *
	FLUJO DE INGRESOS INTEGRAL sec00005
	*/
	var cuentas_por_cobrar_section = $('.section-head').find("a").filter(function () { return $(this).text() == "ACTIVO CORRIENTE - CUENTAS POR COBRAR"; }).parent()
	cuentas_por_cobrar_section.on("click", function () {
		let valor = $(this).hasClass("collapsed");
		sessionStorage.setItem('cuentas_por_cobrar_section', !valor);
	});

	var sec_inventario = $('.section-head').find("a").filter(function () { return $(this).text() == "INVENTARIO"; }).parent()
	sec_inventario.on("click", function () {
		let valor = $(this).hasClass("collapsed");
		sessionStorage.setItem('sec_inventario', !valor);
	});

	var sec_acfij = $('.section-head').find("a").filter(function () { return $(this).text() == "ACTIVOS FIJOS DE NEGOCIO"; }).parent()
	sec_acfij.on("click", function () {
		let valor = $(this).hasClass("collapsed");
		sessionStorage.setItem('sec_acfij', !valor);
		console.log('sec_acfij  ' + valor);
	});

	var sec_aux = $('.section-head').find("a").filter(function () { return $(this).text() == "AUXILIAR DE PASIVOS"; }).parent()
	sec_aux.on("click", function () {
		let valor = $(this).hasClass("collapsed");
		sessionStorage.setItem('sec_aux', !valor);
	});

	var sec_actfam = $('.section-head').find("a").filter(function () { return $(this).text() == "ACTIVOS FIJOS FAMILIARES (CASA TERRENO VEHICULO)"; }).parent()
	sec_actfam.on("click", function () {
		let valor = $(this).hasClass("collapsed");
		sessionStorage.setItem('sec_actfam', !valor);
	});

	var sec00act = $('.section-head').find("a").filter(function () { return $(this).text() == "ACTIVIDAD PRINCIPAL"; }).parent()
	sec00act.on("click", function () {
		let valor = $(this).hasClass("collapsed");
		sessionStorage.setItem('sec00act', !valor);
	});

	var sec_flujo = $('.section-head').find("a").filter(function () { return $(this).text() == "FLUJO DE VENTAS POR MES (ACTIVIDAD PRINCIPAL)"; }).parent()
	sec_flujo.on("click", function () {
		let valor = $(this).hasClass("collapsed");
		sessionStorage.setItem('sec_flujo', !valor);
	});

	var sec_ = $('.section-head').find("a").filter(function () { return $(this).text() == "MARGEN DE GANANCIA Y COSTO DE VENTAS"; }).parent()
	sec_.on("click", function () {
		let valor = $(this).hasClass("collapsed");
		sessionStorage.setItem('sec_', !valor);
	});

	var sec_auxcompras = $('.section-head').find("a").filter(function () { return $(this).text() == "AUXILIAR DE COMPRAS"; }).parent()
	sec_auxcompras.on("click", function () {
		let valor = $(this).hasClass("collapsed");
		sessionStorage.setItem('sec_auxcompras', !valor);
	});

	var secact2 = $('.section-head').find("a").filter(function () { return $(this).text() == "ACTIVIDAD SECUNDARIA"; }).parent()
	secact2.on("click", function () {
		let valor = $(this).hasClass("collapsed");
		sessionStorage.setItem('secact2', !valor);
	});

	var section_break_115 = $('.section-head').find("a").filter(function () { return $(this).text() == "FLUJO DE VENTAS POR MES (ACTIVIDAD SECUNDARIA)"; }).parent()
	section_break_115.on("click", function () {
		let valor = $(this).hasClass("collapsed");
		sessionStorage.setItem('section_break_115', !valor);
	});

	var sec_as = $('.section-head').find("a").filter(function () { return $(this).text() == "MARGEN DE GANANCIA Y COSTO DE VENTAS ACT SEC"; }).parent()
	sec_as.on("click", function () {
		let valor = $(this).hasClass("collapsed");
		sessionStorage.setItem('sec_as', !valor);
	});

	var secflujoingreso = $('.section-head').find("a").filter(function () { return $(this).text() == "FLUJO DE INGRESOS POR ACTIVIDAD"; }).parent()
	secflujoingreso.on("click", function () {
		let valor = $(this).hasClass("collapsed");
		console.log(valor);
		sessionStorage.setItem('secflujoingreso', !valor);
	});

	var section_break_157 = $('.section-head').find("a").filter(function () { return $(this).text() == "GASTOS DEL NEGOCIO"; }).parent()
	section_break_157.on("click", function () {
		let valor = $(this).hasClass("collapsed");
		sessionStorage.setItem('section_break_157', !valor);
	});
	var sec00005 = $('.section-head').find("a").filter(function () { return $(this).text() == "FLUJO DE INGRESOS INTEGRAL"; }).parent()
	sec00005.on("click", function () {
		let valor = $(this).hasClass("collapsed");
		sessionStorage.setItem('sec00005', !valor);
	});

}
function verificarExpandido() {

	if (sessionStorage.getItem('cuentas_por_cobrar_section') == 'true') {
		cur_frm.fields_dict["cuentas_por_cobrar_section"].collapse();
	}

	if (sessionStorage.getItem('sec_inventario') == 'true') {
		cur_frm.fields_dict["sec_inventario"].collapse();
	}

	if (sessionStorage.getItem('sec_acfij') == 'true') {
		cur_frm.fields_dict["sec_acfij"].collapse();
	}
	if (sessionStorage.getItem('sec_aux') == 'true') {
		cur_frm.fields_dict["sec_aux"].collapse();
	}
	if (sessionStorage.getItem('sec_actfam') == 'true') {
		cur_frm.fields_dict["sec_actfam"].collapse();
	}
	if (sessionStorage.getItem('sec00act') == 'true') {
		cur_frm.fields_dict["sec00act"].collapse();
	}
	if (sessionStorage.getItem('sec_flujo') == 'true') {
		cur_frm.fields_dict["sec_flujo"].collapse();
	}
	if (sessionStorage.getItem('sec_') == 'true') {
		cur_frm.fields_dict["sec_"].collapse();
	}

	if (sessionStorage.getItem('sec_auxcompras') == 'true') {
		cur_frm.fields_dict["sec_auxcompras"].collapse();
	}
	if (sessionStorage.getItem('secact2') == 'true') {
		cur_frm.fields_dict["secact2"].collapse();
	}

	if (sessionStorage.getItem('section_break_115') == 'true') {
		cur_frm.fields_dict["section_break_115"].collapse();
	}
	if (sessionStorage.getItem('sec_as') == 'true') {
		cur_frm.fields_dict["sec_as"].collapse();
	}

	if (sessionStorage.getItem('secflujoingreso') == 'true') {
		cur_frm.fields_dict["secflujoingreso"].collapse();
	}
	if (sessionStorage.getItem('section_break_157') == 'true') {
		cur_frm.fields_dict["section_break_157"].collapse();
	}
	if (sessionStorage.getItem('sec00005') == 'true') {
		cur_frm.fields_dict["sec00005"].collapse();
	}
}