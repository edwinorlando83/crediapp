# -*- coding: utf-8 -*-
# Copyright (c) 2021, orlando and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Prospectos(Document):
	def before_insert(self):
		self.nombrecompleto = self.apellidos + ' ' +self.nombres
		self.usuario = frappe.session.user

def get_permission_query_conditions(user):
	if not user:
		user = frappe.session.user
		
		if user=="Administrator":
			return """select * from tabProspectos tp """
		else:
			return """select * from tabProspectos tp where usuario = '{usuario}'""".format(usuario=frappe.session.user)

def has_permission(doc, user):
	
	if (user != "Administrator") :
    		# dont allow non Administrator user to view / edit Administrator user
		return False
	else:
		return True
