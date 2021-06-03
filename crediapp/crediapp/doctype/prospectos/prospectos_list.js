 //in_list(frappe.user_roles, "Employee")
 frappe.listview_settings['Prospectos'] = {
	filters: [["usuario", "=", frappe.session.user]],
	onload: function(listview) {		 
	 
	 let disabled = frappe.user.has_role("Usuario Administrador")
		$('[data-fieldname="usuario"]').attr("disabled",!disabled);
		
	}
};