// Copyright (c) 2021, orlando and contributors
// For license information, please see license.txt

frappe.ui.form.on('analisis_capital', {
	refresh: function (frm) {

	}
	,
	cajat: function (frm) {
		suma_caja(frm);
	},
	cajac: function (frm) {
		suma_caja(frm);
	},

	onload:function(frm){
 
		if (frm.is_new()) {
				frm.add_child('electrodomesticos', { detalle: 'Televisión ', marca: '', valor: 0  });
				frm.add_child('electrodomesticos', { detalle: 'Equipo de Sonido ', marca: '', valor: 0  });
				frm.add_child('electrodomesticos', { detalle: 'Muebles y Enseres ', marca: '', valor: 0  });
				frm.add_child('electrodomesticos', { detalle: 'Cosina ', marca: '', valor: 0  });
				frm.add_child('electrodomesticos', { detalle: 'Refrigeradora ', marca: '', valor: 0  });
				frm.add_child('electrodomesticos', { detalle: 'Computadora ', marca: '', valor: 0  });
				frm.add_child('electrodomesticos', { detalle: 'Máquina de Coser ', marca: '', valor: 0  });
				 
		}
		
	}
});

frappe.ui.form.on("cuenta_por_cobrar", {
	saldo(frm, cdt, cdn) {
		cuenta_por_cobrar();
	} 
});

frappe.ui.form.on("ht_bancos", {
	saldo(frm, cdt, cdn) {
		ht_bancos();
	} 
});
frappe.ui.form.on("ht_inversiones", {
	saldo(frm, cdt, cdn) {
		ht_inversiones();
	} 
});

frappe.ui.form.on("vivienda", {
	valor(frm, cdt, cdn) {
		vivienda();
	} 
});

frappe.ui.form.on("terreno", {
	valor(frm, cdt, cdn) {
		terreno();
	} 
});
frappe.ui.form.on("vehiculo", {
	avaluo(frm, cdt, cdn) {
		vehiculo();
	} 
});

frappe.ui.form.on("maquinaria_equipo", {
	vunitario(frm, cdt, cdn) {
		maquinaria_equipo();
	} ,
	cantidad(frm, cdt, cdn) {
		maquinaria_equipo();
	} 
});
frappe.ui.form.on("electrodomesticos", {
	valor(frm, cdt, cdn) {
		electrodomesticos();
	}  
});

frappe.ui.form.on("acciones", {
	valor(frm, cdt, cdn) {
		acciones();
	}  
});


frappe.ui.form.on("ganadera", {
	valor(frm, cdt, cdn) {
		ganadera();
	} ,
	cantidad(frm, cdt, cdn) {
		ganadera();
	} 
});

frappe.ui.form.on("deudas_financieras", {
	monto(frm, cdt, cdn) {
		deudas_financieras();
	} ,
	cuota(frm, cdt, cdn) {
		deudas_financieras();
	} 
});

frappe.ui.form.on("deudas_financierasc", {
	monto(frm, cdt, cdn) {
		 
		deudas_financierasc();
	} ,
	cuota(frm, cdt, cdn) {
		deudas_financierasc();
	} 
});

frappe.ui.form.on("otras_cuentas", {
	saldo(frm, cdt, cdn) {
		 
		otras_cuentas();
	}  
});




/* funciones*/ 
function suma_caja(frm){
	let suma = frm.doc.cajac + frm.doc.cajat;
	frm.doc.total_caja = suma;
	frm.refresh_field("total_caja");
	
	
}

function cuenta_por_cobrar() {
	var t_total = 0;
	$.each(cur_frm.doc.cuenta_por_cobrar, function (i, row) {	 
		t_total += row.saldo;
	});
	cur_frm.doc.t_cuenta_por_cobrar = t_total;
	cur_frm.refresh_field('t_cuenta_por_cobrar');
	cur_frm.refresh_field("totales_html");
}
 
 function ht_bancos() {
	var t_total = 0;
	$.each(cur_frm.doc.ht_bancos, function (i, row) {	 
		t_total += row.saldo;
	});
	cur_frm.doc.t_ht_bancos = t_total;
	cur_frm.refresh_field('t_ht_bancos');
	cur_frm.refresh_field("html_ht_bancos");
}


function ht_inversiones() {
	var t_total = 0;
	$.each(cur_frm.doc.ht_inversiones, function (i, row) {	 
		t_total += row.saldo;
	});
	cur_frm.doc.t_ht_inversiones = t_total;
	cur_frm.refresh_field('t_ht_inversiones');
	cur_frm.refresh_field("html_ht_inversiones");
}

function vivienda() {
	var t_total = 0;
	$.each(cur_frm.doc.vivienda, function (i, row) {	 
		t_total += row.valor;
	});
	cur_frm.doc.t_vivienda = t_total;
	cur_frm.refresh_field('t_vivienda');
	cur_frm.refresh_field("html_vivienda");
}
function terreno() {
	var t_total = 0;
	$.each(cur_frm.doc.terreno, function (i, row) {	 
		t_total += row.valor;
	});
	cur_frm.doc.t_terreno = t_total;
	cur_frm.refresh_field('t_terreno');
	cur_frm.refresh_field("html_terreno");
}

function vehiculo() {
	var t_total = 0;
	$.each(cur_frm.doc.vehiculo, function (i, row) {	 
		t_total += row.avaluo;
	});
	cur_frm.doc.t_vehiculo = t_total;
	cur_frm.refresh_field('t_vehiculo');
	cur_frm.refresh_field("html_vehiculo");
}

function maquinaria_equipo() {
	var t_total = 0;
	$.each(cur_frm.doc.maquinaria_equipo, function (i, row) {	 
		let filat = row.cantidad * row.vunitario;		 
		row.total = filat;
		t_total +=  filat;
	});
	cur_frm.doc.t_maquinaria_equipo = t_total;
	cur_frm.refresh_field('t_maquinaria_equipo');
	cur_frm.refresh_field('maquinaria_equipo');
	cur_frm.refresh_field("html_maquinaria_equipo");
}


function electrodomesticos() {
	var t_total = 0;
	$.each(cur_frm.doc.electrodomesticos, function (i, row) {	 
		t_total += row.valor;
	});
	cur_frm.doc.t_electrodomesticos = t_total;
	cur_frm.refresh_field('t_electrodomesticos');
	cur_frm.refresh_field("html_electrodomesticos");
}


function acciones() {
	var t_total = 0;
	$.each(cur_frm.doc.acciones, function (i, row) {	 
		t_total += row.valor;
	});
	cur_frm.doc.t_acciones = t_total;
	cur_frm.refresh_field('t_acciones');
	cur_frm.refresh_field("html_acciones");
}

function ganadera() {
	var t_total = 0;
	$.each(cur_frm.doc.ganadera, function (i, row) {	 
		let filat = row.cantidad * row.valor;		 
		row.total = filat;
		t_total +=  filat;
	});
	cur_frm.doc.t_ganadera= t_total;
	cur_frm.refresh_field('t_ganadera');
	cur_frm.refresh_field('ganadera');
	cur_frm.refresh_field("html_ganadera");
}

function deudas_financieras() {
	var t_totalm = 0;
	var t_totalc = 0;
	$.each(cur_frm.doc.deudas_financieras, function (i, row) {	
		t_totalm+= row.monto;
		t_totalc+= row.cuota; 
	});
	cur_frm.doc.t_monto= t_totalm;
	cur_frm.doc.t_cuota= t_totalc;
	cur_frm.refresh_field('t_monto');
	cur_frm.refresh_field('t_cuota');
	cur_frm.refresh_field('html_total');
	 
}
function deudas_financierasc() {
	var t_totalm = 0;
	var t_totalc = 0;
	$.each(cur_frm.doc.deudas_financierasc, function (i, row) {	
		t_totalm+= row.monto;
		t_totalc+= row.cuota; 
	});
	cur_frm.doc.t_montoc= t_totalm;
	cur_frm.doc.t_cuotac= t_totalc;
	cur_frm.refresh_field('t_montoc');
	cur_frm.refresh_field('t_cuotac');
	cur_frm.refresh_field('html_totalc');
	  
}


function otras_cuentas() {
	var t_total = 0;
	$.each(cur_frm.doc.otras_cuentas, function (i, row) {	 
		t_total += row.saldo;
	});
	cur_frm.doc.t_otras_cuentas = t_total;
	cur_frm.refresh_field('t_otras_cuentas');
	cur_frm.refresh_field("html_otras_cuentas");
}

