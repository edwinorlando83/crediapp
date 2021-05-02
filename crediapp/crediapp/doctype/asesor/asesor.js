// Copyright (c) 2021, orlando and contributors
// For license information, please see license.txt

frappe.ui.form.on('Asesor', {
	onload: function(frm) {
		frappe.call({
			method: "crediapp.crediapp.doctype.dpa.dpa.get_provincias",
			callback: (r) => {
			  frm.set_df_property("provincia", "options", r.message);
			  frm.refresh_field("provincia");
			},
		  });

		  if (frm.doc.provincia) get_cantones(frm.doc.provincia, frm);
		  if (frm.doc.canton ) get_parroquias (frm.doc.canton , frm);
	  },
	  provincia(frm){
	        get_cantones(frm.doc.provincia, frm); 
	  },
	  canton(frm){
		get_parroquias(frm.doc.canton, frm); 
  }
});



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