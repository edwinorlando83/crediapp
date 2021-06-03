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